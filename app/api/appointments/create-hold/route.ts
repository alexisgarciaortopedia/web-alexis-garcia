import { NextResponse } from "next/server";
import { createHold, getOccupiedSlots } from "@/lib/appointmentsDb";

export async function POST(request: Request) {
  const body = await request.json();

  const {
    sede,
    tipo,
    fecha,
    hora_inicio,
    hora_fin,
    nombre,
    telefono,
    motivo,
    pago_tipo,
    pago_monto,
    ref_source,
  } = body;

  if (!sede || !tipo || !fecha || !hora_inicio || !hora_fin || !nombre || !telefono || !pago_tipo) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const occupied = getOccupiedSlots(sede as any, fecha);
  if (occupied.includes(hora_inicio)) {
    return NextResponse.json({ error: "Slot not available" }, { status: 409 });
  }

  const now = new Date();
  const expires = new Date(now.getTime() + 15 * 60 * 1000).toISOString();
  const id = crypto.randomUUID();
  const startAt = `${fecha}T${hora_inicio}:00`;

  createHold({
    id,
    expires_at: expires,
    original_start_at: startAt,
    current_start_at: startAt,
    sede,
    tipo,
    fecha,
    hora_inicio,
    hora_fin,
    nombre,
    telefono,
    motivo: motivo || null,
    pago_tipo,
    pago_monto: Number(pago_monto || 0),
    ref_source: ref_source || null,
  });

  return NextResponse.json({ appointmentId: id, expiresAt: expires });
}
