import initSqlJs from "sql.js";
import path from "path";
import fs from "fs";

export type AppointmentStatus = "pending" | "paid" | "failed";
export type AppointmentPayment = "total" | "anticipo";
export type Sede = "tula" | "pachuca" | "telemedicina";
export type Tipo = "programada" | "prioritaria";

type AppointmentRecord = {
  id: string;
  created_at: string;
  expires_at: string | null;
  status?: "active" | "cancelled";
  reprogram_count?: number;
  original_start_at?: string | null;
  current_start_at?: string | null;
  updated_at?: string | null;
  sede: Sede;
  tipo: Tipo;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  nombre: string;
  telefono: string;
  motivo: string | null;
  pago_tipo: AppointmentPayment;
  pago_monto: number;
  pago_status: AppointmentStatus;
  pago_provider: string;
  pago_intent_id: string | null;
  ref_source: string | null;
};

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const dbPath = path.join(dataDir, "appointments.sqlite");

const SQL = await initSqlJs({
  locateFile: (file) =>
    path.join(process.cwd(), "node_modules", "sql.js", "dist", file),
});

const db = (() => {
  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    return new SQL.Database(fileBuffer);
  }
  return new SQL.Database();
})();

db.exec(`
  CREATE TABLE IF NOT EXISTS appointments (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL,
    expires_at TEXT,
    status TEXT DEFAULT 'active',
    reprogram_count INTEGER DEFAULT 0,
    original_start_at TEXT,
    current_start_at TEXT,
    updated_at TEXT,
    sede TEXT NOT NULL,
    tipo TEXT NOT NULL,
    fecha TEXT NOT NULL,
    hora_inicio TEXT NOT NULL,
    hora_fin TEXT NOT NULL,
    nombre TEXT NOT NULL,
    telefono TEXT NOT NULL,
    motivo TEXT,
    pago_tipo TEXT NOT NULL,
    pago_monto INTEGER NOT NULL,
    pago_status TEXT NOT NULL,
    pago_provider TEXT NOT NULL,
    pago_intent_id TEXT,
    ref_source TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_appointments_sede_fecha
    ON appointments (sede, fecha);
`);

function ensureColumn(name: string, definition: string) {
  const stmt = db.prepare("PRAGMA table_info(appointments)");
  const columns: string[] = [];
  while (stmt.step()) {
    const row = stmt.getAsObject() as { name: string };
    columns.push(row.name);
  }
  stmt.free();
  if (!columns.includes(name)) {
    db.exec(`ALTER TABLE appointments ADD COLUMN ${definition}`);
    persistDb();
  }
}

ensureColumn("status", "status TEXT DEFAULT 'active'");
ensureColumn("reprogram_count", "reprogram_count INTEGER DEFAULT 0");
ensureColumn("original_start_at", "original_start_at TEXT");
ensureColumn("current_start_at", "current_start_at TEXT");
ensureColumn("updated_at", "updated_at TEXT");

function persistDb() {
  const data = db.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
}

function nowIso() {
  return new Date().toISOString();
}

export function cleanupExpiredHolds() {
  db.exec("BEGIN");
  db.run(
    "DELETE FROM appointments WHERE pago_status = 'pending' AND expires_at IS NOT NULL AND expires_at <= ?",
    [nowIso()]
  );
  db.exec("COMMIT");
  persistDb();
}

export function createHold(
  input: Omit<
    AppointmentRecord,
    "created_at" | "pago_status" | "pago_provider" | "pago_intent_id"
  >
) {
  cleanupExpiredHolds();
  db.exec("BEGIN");
  db.run(
    `INSERT INTO appointments (
      id, created_at, expires_at, status, reprogram_count, original_start_at, current_start_at, updated_at,
      sede, tipo, fecha, hora_inicio, hora_fin,
      nombre, telefono, motivo, pago_tipo, pago_monto, pago_status,
      pago_provider, pago_intent_id, ref_source
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.id,
      nowIso(),
      input.expires_at,
      "active",
      input.reprogram_count ?? 0,
      input.original_start_at ?? null,
      input.current_start_at ?? null,
      nowIso(),
      input.sede,
      input.tipo,
      input.fecha,
      input.hora_inicio,
      input.hora_fin,
      input.nombre,
      input.telefono,
      input.motivo,
      input.pago_tipo,
      input.pago_monto,
      "pending",
      "none",
      null,
      input.ref_source,
    ]
  );
  db.exec("COMMIT");
  persistDb();
}

export function confirmAppointment({
  id,
  provider,
  intentId,
  status,
}: {
  id: string;
  provider: string;
  intentId?: string | null;
  status: AppointmentStatus;
}) {
  db.exec("BEGIN");
  db.run(
    `UPDATE appointments
     SET pago_status = ?, pago_provider = ?, pago_intent_id = ?, expires_at = NULL, updated_at = ?
     WHERE id = ?`,
    [status, provider, intentId || null, nowIso(), id]
  );
  db.exec("COMMIT");
  persistDb();
}

export function getAppointment(id: string) {
  const stmt = db.prepare("SELECT * FROM appointments WHERE id = ?");
  stmt.bind([id]);
  const row = stmt.step() ? stmt.getAsObject() : undefined;
  stmt.free();
  return row as AppointmentRecord | undefined;
}

export function getOccupiedSlots(sede: Sede, fecha: string) {
  cleanupExpiredHolds();
  const stmt = db.prepare(
    `SELECT hora_inicio
     FROM appointments
     WHERE sede = ? AND fecha = ?
     AND (status IS NULL OR status != 'cancelled')
     AND (
       pago_status = 'paid'
       OR (pago_status = 'pending' AND expires_at IS NOT NULL AND expires_at > ?)
     )`
  );
  stmt.bind([sede, fecha, nowIso()]);
  const results: string[] = [];
  while (stmt.step()) {
    const row = stmt.getAsObject() as { hora_inicio: string };
    results.push(row.hora_inicio);
  }
  stmt.free();
  return results;
}

export function getWeeklyAvailability({
  sede,
  fromDate,
  toDate,
}: {
  sede: Sede;
  fromDate: string;
  toDate: string;
}) {
  cleanupExpiredHolds();
  const stmt = db.prepare(
    `SELECT fecha, hora_inicio
     FROM appointments
     WHERE sede = ?
     AND fecha >= ? AND fecha <= ?
     AND (status IS NULL OR status != 'cancelled')
     AND (
       pago_status = 'paid'
       OR (pago_status = 'pending' AND expires_at IS NOT NULL AND expires_at > ?)
     )`
  );
  stmt.bind([sede, fromDate, toDate, nowIso()]);
  const results: { fecha: string; hora_inicio: string }[] = [];
  while (stmt.step()) {
    const row = stmt.getAsObject() as { fecha: string; hora_inicio: string };
    results.push({ fecha: row.fecha, hora_inicio: row.hora_inicio });
  }
  stmt.free();
  return results;
}

export function isSlotAvailable({
  sede,
  fecha,
  hora_inicio,
  excludeId,
}: {
  sede: Sede;
  fecha: string;
  hora_inicio: string;
  excludeId?: string;
}) {
  cleanupExpiredHolds();
  const stmt = db.prepare(
    `SELECT id FROM appointments
     WHERE sede = ? AND fecha = ? AND hora_inicio = ?
     AND (status IS NULL OR status != 'cancelled')
     AND (
       pago_status = 'paid'
       OR (pago_status = 'pending' AND expires_at IS NOT NULL AND expires_at > ?)
     )`
  );
  stmt.bind([sede, fecha, hora_inicio, nowIso()]);
  const rows: string[] = [];
  while (stmt.step()) {
    const row = stmt.getAsObject() as { id: string };
    rows.push(row.id);
  }
  stmt.free();
  if (!rows.length) return true;
  if (excludeId) {
    return rows.every((id) => id === excludeId);
  }
  return false;
}

export function rescheduleAppointment({
  id,
  fecha,
  hora_inicio,
  hora_fin,
}: {
  id: string;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
}) {
  db.exec("BEGIN");
  db.run(
    `UPDATE appointments
     SET fecha = ?, hora_inicio = ?, hora_fin = ?,
         current_start_at = ?, updated_at = ?,
         reprogram_count = COALESCE(reprogram_count, 0) + 1
     WHERE id = ?`,
    [
      fecha,
      hora_inicio,
      hora_fin,
      `${fecha}T${hora_inicio}:00`,
      nowIso(),
      id,
    ]
  );
  db.exec("COMMIT");
  persistDb();
}

export function cancelAppointment(id: string) {
  db.exec("BEGIN");
  db.run(
    `UPDATE appointments
     SET status = 'cancelled', updated_at = ?
     WHERE id = ?`,
    [nowIso(), id]
  );
  db.exec("COMMIT");
  persistDb();
}
