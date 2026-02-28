"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import GlassPanel from "@/components/GlassPanel";
import Header from "@/components/Header";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { SCHEDULES, Sede } from "@/lib/appointmentsSchedule";
import { formatCurrency, PRICES, VisitType } from "@/lib/appointmentsPricing";
type Tipo = VisitType;

export const dynamic = "force-dynamic";

const SEDE_LABELS: Record<Sede, string> = {
  tula: "Tula — Presencial",
  pachuca: "Pachuca — Presencial",
  telemedicina: "Telemedicina — Videoconsulta",
};

const TIPO_LABELS: Record<Tipo, string> = {
  programada: "Consulta programada",
  prioritaria: "Atención prioritaria",
};

const TIPO_DESCRIPTIONS: Record<Tipo, string> = {
  programada: "Valoración integral y plan estructurado.",
  prioritaria:
    "Valoración en menor tiempo ante dolor incapacitante o traumatismo reciente.",
};

const LOCATION_PARAM_MAP: Record<string, Sede> = {
  tula: "tula",
  pachuca: "pachuca",
  telemedicina: "telemedicina",
};

const VISIT_TYPE_PARAM_MAP: Record<string, Tipo> = {
  programada: "programada",
  prioritaria: "prioritaria",
};

function getUpcomingDates(days: number[], count = 14) {
  const result: Date[] = [];
  const today = new Date();
  let cursor = new Date(today);
  while (result.length < count) {
    if (days.includes(cursor.getDay())) {
      result.push(new Date(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return result;
}

function EmbeddedCardPayment({ onConfirm }: { onConfirm: () => void }) {
  return (
    <div className="flex flex-col gap-4 rounded-[18px] border border-white/10 bg-white/5 p-4 text-sm text-[#B9C0CC]">
      <p>Pago embebido con tarjeta (Stripe/MercadoPago).</p>
      <p className="text-xs text-[#8C95A3]">
        {/* TODO: Conectar proveedor de pago embebido aquí. */}
        Integración pendiente.
      </p>
      <button
        type="button"
        onClick={onConfirm}
        className="inline-flex items-center justify-center rounded-lg bg-[#0A2540] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105"
      >
        Simular pago confirmado
      </button>
    </div>
  );
}

function AgendarContent() {
  const searchParams = useSearchParams();
  const initialSedeParam =
    searchParams.get("sede") || searchParams.get("location") || "";
  const initialSede =
    LOCATION_PARAM_MAP[initialSedeParam.toLowerCase()] ?? "";
  const initialMotivo = searchParams.get("motivo") || "";
  const initialTipoParam =
    searchParams.get("tipo") || searchParams.get("visitType") || "";
  const initialTipo =
    VISIT_TYPE_PARAM_MAP[initialTipoParam.toLowerCase()] ?? "";

  const [sede, setSede] = useState<"" | "tula" | "pachuca" | "telemedicina">(
    initialSede
  );
  const [tipo, setTipo] = useState<Tipo | "">(initialTipo);
  const [pago, setPago] = useState<"anticipo" | "total">("total");
  const [fecha, setFecha] = useState<string>("");
  const [hora, setHora] = useState<string>("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nombreTouched, setNombreTouched] = useState(false);
  const [telefonoTouched, setTelefonoTouched] = useState(false);
  const [motivo, setMotivo] = useState(initialMotivo);
  const [telemedNombre, setTelemedNombre] = useState("");
  const [telemedWhatsapp, setTelemedWhatsapp] = useState("");
  const [telemedMotivo, setTelemedMotivo] = useState("");
  const [telemedSubmitted, setTelemedSubmitted] = useState(false);
  const [telemedicinaAceptada, setTelemedicinaAceptada] = useState(false);
  const [pagoConfirmado, setPagoConfirmado] = useState(false);
  const [showAllSlots, setShowAllSlots] = useState(false);
  const [occupiedSlots, setOccupiedSlots] = useState<string[]>([]);
  const [weeklyAvailability, setWeeklyAvailability] = useState<{
    totalSlots: number;
    occupiedSlots: number;
    availableSlots: number;
  } | null>(null);
  const [appointmentId, setAppointmentId] = useState<string | null>(null);

  useEffect(() => {
    if (!sede) return;
    setPago("total");
  }, [sede]);

  useEffect(() => {
    setOccupiedSlots([]);
    setWeeklyAvailability(null);
    setAppointmentId(null);
    if (!sede) return;
    const from = new Date().toISOString().slice(0, 10);
    fetch(`/api/appointments/weekly-availability?sede=${sede}&from=${from}`)
      .then((res) => res.json())
      .then((data) => setWeeklyAvailability(data))
      .catch(() => setWeeklyAvailability(null));
  }, [sede]);

  useEffect(() => {
    setOccupiedSlots([]);
    if (!sede || !fecha) return;
    fetch(`/api/appointments/availability?sede=${sede}&date=${fecha}`)
      .then((res) => res.json())
      .then((data) => setOccupiedSlots(data.occupied || []))
      .catch(() => setOccupiedSlots([]));
  }, [sede, fecha]);

  useEffect(() => {
    setAppointmentId(null);
  }, [sede, tipo, fecha, hora, nombre, telefono, motivo, pago]);

  const availableDates = useMemo(() => {
    if (!sede) return [];
    return getUpcomingDates(SCHEDULES[sede].days);
  }, [sede]);

  const availableHours = useMemo(() => {
    if (!sede) return [];
    return SCHEDULES[sede].slots;
  }, [sede]);

  const visibleHours = useMemo(() => {
    if (showAllSlots) return availableHours;
    return availableHours.slice(0, 3);
  }, [availableHours, showAllSlots]);

  const total = sede && tipo ? PRICES[sede][tipo] : 0;
  const anticipo = total ? Math.round(total * 0.3) : 0;
  const totalToPay = sede === "telemedicina" ? total : pago === "total" ? total : anticipo;

  const isStep2Enabled = Boolean(sede);
  const isStep3Enabled = Boolean(sede);
  const isStep4Enabled = Boolean(sede && tipo);
  const cleanedPhone = telefono.replace(/\D/g, "");
  const phoneIsValid =
    cleanedPhone.length === 10 ||
    (cleanedPhone.length === 12 && cleanedPhone.startsWith("52"));
  const nameIsValid = Boolean(nombre.trim());

  const isStep5Enabled =
    Boolean(sede && tipo && fecha && hora && nameIsValid && phoneIsValid) &&
    (sede !== "telemedicina" || telemedicinaAceptada);

  const telemedFormValid =
    Boolean(telemedNombre.trim()) &&
    Boolean(telemedWhatsapp.trim()) &&
    Boolean(telemedMotivo.trim());

  const handleTelemedRequest = () => {
    if (!telemedFormValid) return;
    const ref = `WEB-TELEMED-${Date.now().toString(36)}`;
    const message = [
      "Solicitud de videoconsulta (WEB)",
      `Nombre: ${telemedNombre.trim()}`,
      `WhatsApp: ${telemedWhatsapp.trim()}`,
      `Motivo: ${telemedMotivo.trim()}`,
      `Ref: ${ref}`,
    ].join("\n");
    const url = `https://wa.me/527713344634?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setTelemedSubmitted(true);
  };

  useEffect(() => {
    if (sede === "telemedicina") return;
    if (!isStep5Enabled || appointmentId) return;
    const [h, m] = hora.split(":").map(Number);
    const endMinutes = h * 60 + m + 30;
    const endH = String(Math.floor(endMinutes / 60)).padStart(2, "0");
    const endM = String(endMinutes % 60).padStart(2, "0");
    const horaFin = `${endH}:${endM}`;

    fetch("/api/appointments/create-hold", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sede,
        tipo,
        fecha,
        hora_inicio: hora,
        hora_fin: horaFin,
        nombre,
        telefono,
        motivo,
        pago_tipo: pago,
        pago_monto: totalToPay,
        ref_source: "WEB-2026",
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 409) {
            setHora("");
            setOccupiedSlots((prev) => [...prev, hora]);
          }
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.appointmentId) {
          setAppointmentId(data.appointmentId);
        }
      })
      .catch(() => null);
  }, [
    isStep5Enabled,
    appointmentId,
    sede,
    tipo,
    fecha,
    hora,
    nombre,
    telefono,
    motivo,
    pago,
    totalToPay,
  ]);

  const whatsappMessage = useMemo(() => {
    const lines = [
      "Hola, deseo confirmar mi cita.",
      `Sede: ${sede ? SEDE_LABELS[sede] : ""}`,
      `Tipo: ${tipo ? TIPO_LABELS[tipo] : ""}`,
      `Fecha: ${fecha}`,
      `Hora: ${hora}`,
      `Pago: ${sede === "telemedicina" ? "Total" : pago === "total" ? "Total" : "Anticipo"}`,
      `Monto: ${formatCurrency(totalToPay)}`,
      `Nombre: ${nombre}`,
      `Tel: ${telefono}`,
      motivo ? `Motivo: ${motivo}` : "",
    ].filter(Boolean);
    return encodeURIComponent(lines.join("\n"));
  }, [sede, tipo, fecha, hora, pago, totalToPay, nombre, telefono, motivo]);

  const scarcityMessage = useMemo(() => {
    if (!weeklyAvailability) return "";
    if (weeklyAvailability.availableSlots <= 6) {
      return "Quedan pocos horarios esta semana";
    }
    if (weeklyAvailability.availableSlots <= 12) {
      return "Disponibilidad limitada esta semana";
    }
    return "";
  }, [weeklyAvailability]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050608]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050608_0%,#0B0F17_50%,#050608_100%)]" />
      <div className="pointer-events-none absolute -left-28 top-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(148,156,170,0.18),transparent_70%)] blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-20" />

      <Header />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-8 pb-24 pt-12 sm:px-10 lg:pt-16">
        <section className="text-center">
          <h1 className="font-serif text-[clamp(2.2rem,4vw,3.2rem)] text-white">
            Agendar
          </h1>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between text-xs text-[#8C95A3]">
            <span>Paso 1</span>
            <span>Selecciona sede / modalidad</span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {(["tula", "pachuca", "telemedicina"] as Sede[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setSede(option);
                  setTipo("");
                  setFecha("");
                  setHora("");
                  setPagoConfirmado(false);
                }}
                className={`rounded-[20px] border px-5 py-4 text-left transition-all duration-200 ${
                  sede === option
                    ? "border-white bg-white/10 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                    : "border-white/10 bg-white/5 text-[#B9C0CC]"
                }`}
              >
                <p className="font-serif text-base">{SEDE_LABELS[option]}</p>
              </button>
            ))}
          </div>
        </section>

        <section className={`flex flex-col gap-6 ${isStep2Enabled ? "" : "opacity-40 pointer-events-none"}`}>
          <div className="flex items-center justify-between text-xs text-[#8C95A3]">
            <span>Paso 2</span>
            <span>Selecciona tipo de atención</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {(["programada", "prioritaria"] as Tipo[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setTipo(option);
                  setFecha("");
                  setHora("");
                  setPagoConfirmado(false);
                }}
                className={`rounded-[20px] border px-5 py-4 text-left transition-all duration-200 ${
                  tipo === option
                    ? "border-white bg-white/10 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                    : "border-white/10 bg-white/5 text-[#B9C0CC]"
                }`}
              >
                <p className="font-serif text-base">{TIPO_LABELS[option]}</p>
                <p className="mt-2 text-sm text-[#B9C0CC]">
                  {TIPO_DESCRIPTIONS[option]}
                </p>
              </button>
            ))}
          </div>
        </section>

        <section className={`flex flex-col gap-6 ${isStep3Enabled ? "" : "opacity-40 pointer-events-none"}`}>
          <div className="flex items-center justify-between text-xs text-[#8C95A3]">
            <span>Paso 3</span>
            <span>Precio y pago</span>
          </div>
          <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
            <GlassPanel className="flex flex-col gap-4 px-6 py-6">
              <div className="flex flex-col gap-2 text-sm text-[#B9C0CC]">
                <p>
                  <span className="text-white">Sede:</span>{" "}
                  {sede ? SEDE_LABELS[sede] : "—"}
                </p>
                <p>
                  <span className="text-white">Tipo:</span>{" "}
                  {tipo ? TIPO_LABELS[tipo] : "—"}
                </p>
                <p>
                  <span className="text-white">Precio total:</span>{" "}
                  {total ? formatCurrency(total) : "—"}
                </p>
              </div>

              {sede && sede !== "telemedicina" && (
                <div className="flex flex-col gap-3 text-sm text-[#B9C0CC]">
                  <p className="text-white">Para asegurar tu horario</p>
                  <label className="flex items-start gap-2">
                    <input
                      type="radio"
                      name="pago"
                      checked={pago === "anticipo"}
                      onChange={() => setPago("anticipo")}
                    />
                    <span>
                      Pagar anticipo (30%) — {formatCurrency(anticipo)}
                    </span>
                  </label>
                  <label className="flex items-start gap-2">
                    <input
                      type="radio"
                      name="pago"
                      checked={pago === "total"}
                      onChange={() => setPago("total")}
                    />
                    <span>Pagar total — {formatCurrency(total)}</span>
                  </label>
                  <p className="text-xs text-[#8C95A3]">
                    El resto se liquida el día de tu consulta (efectivo).
                  </p>
                </div>
              )}

              {sede === "telemedicina" && (
                <div className="flex flex-col gap-3 text-sm text-[#B9C0CC]">
                  <p className="text-white">Telemedicina</p>
                  <p>Pagar total — {formatCurrency(total)}</p>
                  <label className="flex items-start gap-2 text-xs text-[#8C95A3]">
                    <input
                      type="checkbox"
                      checked={telemedicinaAceptada}
                      onChange={(event) =>
                        setTelemedicinaAceptada(event.target.checked)
                      }
                    />
                    <span>
                      He leído y acepto las condiciones de telemedicina.
                    </span>
                  </label>
                  <ul className="text-xs text-[#8C95A3]">
                    <li>
                      La videconsulta no sustituye valoración física cuando sea
                      necesaria.
                    </li>
                    <li>
                      Puede recomendarse consulta presencial si se requiere
                      exploración.
                    </li>
                    <li>Cancelaciones/reprogramaciones: mismas reglas (12h).</li>
                    <li>
                      El enlace de videollamada se envía solo tras confirmación
                      de pago.
                    </li>
                  </ul>
                </div>
              )}
            </GlassPanel>

            <GlassPanel className="flex flex-col gap-4 px-6 py-6">
              <p className="text-sm text-white">Datos para la consulta</p>
              <div className="flex flex-col gap-3 text-sm text-[#B9C0CC]">
                <input
                  className="rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
                  placeholder="Nombre completo"
                  value={nombre}
                  required
                  onBlur={() => setNombreTouched(true)}
                  onChange={(event) => setNombre(event.target.value)}
                />
                {!nameIsValid && nombreTouched && (
                  <span className="text-xs text-[#8C95A3]">
                    Ingresa tu nombre completo.
                  </span>
                )}
                <input
                  className="rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
                  placeholder="Teléfono"
                  value={telefono}
                  required
                  onBlur={() => setTelefonoTouched(true)}
                  onChange={(event) => setTelefono(event.target.value)}
                />
                {!phoneIsValid && telefonoTouched && (
                  <span className="text-xs text-[#8C95A3]">
                    Ingresa un teléfono válido (10 dígitos o +52 con 10 dígitos).
                  </span>
                )}
                <input
                  className="rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
                  placeholder="Motivo (opcional)"
                  value={motivo}
                  onChange={(event) => setMotivo(event.target.value)}
                />
              </div>
            </GlassPanel>
          </div>
        </section>

        <section className={`flex flex-col gap-6 ${isStep4Enabled ? "" : "opacity-40 pointer-events-none"}`}>
          <div className="flex items-center justify-between text-xs text-[#8C95A3]">
            <span>Paso 4</span>
            <span>Fecha y hora</span>
          </div>
          {scarcityMessage && (
            <p className="text-xs text-[#8C95A3]">{scarcityMessage}</p>
          )}
          {sede === "telemedicina" ? (
            <GlassPanel className="px-6 py-6">
              <div className="flex flex-col gap-4 text-sm text-[#B9C0CC]">
                <p className="text-white">Solicitar videoconsulta</p>
                <div className="flex flex-col gap-3">
                  <input
                    className="rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
                    placeholder="Nombre"
                    value={telemedNombre}
                    required
                    onChange={(event) => setTelemedNombre(event.target.value)}
                  />
                  <input
                    className="rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
                    placeholder="WhatsApp"
                    value={telemedWhatsapp}
                    required
                    onChange={(event) => setTelemedWhatsapp(event.target.value)}
                  />
                  <input
                    className="rounded-lg border border-white/10 bg-transparent px-3 py-2 text-white"
                    placeholder="Motivo (corto)"
                    value={telemedMotivo}
                    required
                    onChange={(event) => setTelemedMotivo(event.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleTelemedRequest}
                  disabled={!telemedFormValid}
                  className="inline-flex items-center justify-center rounded-lg bg-[#0A2540] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Solicitar videoconsulta
                </button>
                <p className="text-xs text-[#8C95A3]">
                  Confirmación en menos de 30 minutos.
                </p>
                {telemedSubmitted && (
                  <p className="text-xs text-[#8C95A3]">
                    Solicitud recibida. Confirmaremos disponibilidad en menos de
                    30 minutos.
                  </p>
                )}
              </div>
            </GlassPanel>
          ) : (
            <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
              <GlassPanel className="px-6 py-6">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {availableDates.map((date) => {
                    const label = date.toLocaleDateString("es-MX", {
                      weekday: "short",
                      day: "2-digit",
                      month: "short",
                    });
                    const value = date.toISOString().slice(0, 10);
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setFecha(value)}
                        className={`rounded-lg border px-3 py-2 text-left text-sm transition-all ${
                          fecha === value
                            ? "border-white bg-white/10 text-white"
                            : "border-white/10 text-[#B9C0CC]"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </GlassPanel>
              <GlassPanel className="px-6 py-6">
                <div className="grid gap-3">
                  {visibleHours.map((slot) => {
                    const isOccupied = occupiedSlots.includes(slot) && slot !== hora;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setHora(slot)}
                        disabled={isOccupied}
                        className={`rounded-lg border px-3 py-2 text-left text-sm transition-all ${
                          isOccupied
                            ? "border-white/5 text-white/40"
                            : hora === slot
                              ? "border-white bg-white/10 text-white"
                              : "border-white/10 text-[#B9C0CC]"
                        }`}
                        aria-disabled={isOccupied}
                        title={isOccupied ? "No disponible" : slot}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                {availableHours.length > 3 && (
                  <button
                    type="button"
                    onClick={() => setShowAllSlots((prev) => !prev)}
                    className="mt-4 text-left text-xs text-[#B9C0CC] transition-colors hover:text-white"
                  >
                    {showAllSlots ? "Ver menos" : "Ver más horarios"}
                  </button>
                )}
              </GlassPanel>
            </div>
          )}
        </section>

        {sede !== "telemedicina" && (
          <section className={`flex flex-col gap-6 ${isStep5Enabled ? "" : "opacity-40 pointer-events-none"}`}>
          <div className="flex items-center justify-between text-xs text-[#8C95A3]">
            <span>Paso 5</span>
            <span>Confirmación y pago</span>
          </div>
          <GlassPanel className="flex flex-col gap-6 px-6 py-6">
            <div className="flex flex-col gap-2 text-sm text-[#B9C0CC]">
              <p>
                <span className="text-white">Sede:</span>{" "}
                {sede ? SEDE_LABELS[sede] : "—"}
              </p>
              <p>
                <span className="text-white">Tipo:</span>{" "}
                {tipo ? TIPO_LABELS[tipo] : "—"}
              </p>
              <p>
                <span className="text-white">Fecha:</span> {fecha || "—"}
              </p>
              <p>
                <span className="text-white">Hora:</span> {hora || "—"}
              </p>
              <p>
                <span className="text-white">Monto:</span>{" "}
                {totalToPay ? formatCurrency(totalToPay) : "—"}
              </p>
            </div>

            {!pagoConfirmado && (
              <EmbeddedCardPayment
                onConfirm={async () => {
                  setPagoConfirmado(true);
                  if (!appointmentId) return;
                  await fetch("/api/appointments/confirm", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      appointment_id: appointmentId,
                      payment_result: {
                        provider: "stripe",
                        status: "paid",
                        amount: totalToPay,
                      },
                    }),
                  });
                }}
              />
            )}

            {pagoConfirmado && (
              <div className="flex flex-col gap-4 rounded-[18px] border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">
                  Cita confirmada
                </p>
                <Link
                  href={`https://wa.me/527713344634?text=${whatsappMessage}`}
                  target="_blank"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-[#0A2540] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 sm:w-fit"
                >
                  Confirmar por WhatsApp
                </Link>
              </div>
            )}
          </GlassPanel>
          </section>
        )}

        <section className="text-xs text-[#8C95A3]">
          <p>
            Reprogramación automática: 1 reprogramación sin costo si se realiza
            con al menos 12 horas de anticipación. Menos de 12 horas: el anticipo
            no es reembolsable y se requiere nuevo anticipo para nuevo horario.
          </p>
          <p>
            Cancelación: más de 12 horas permite crédito para reprogramación (1
            vez). No hay reembolso automático.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`/cita?appointment_id=${appointmentId || "XXXX"}&action=reprogramar`}
              className="inline-flex items-center justify-center rounded-lg bg-[#0A2540] px-4 py-2 text-xs font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105"
            >
              Reprogramar cita
            </Link>
            <Link
              href={`/cita?appointment_id=${appointmentId || "XXXX"}&action=cancelar`}
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2 text-xs font-semibold text-white"
            >
              Cancelar cita
            </Link>
          </div>
        </section>
      </main>

      <WhatsAppFloating />
    </div>
  );
}

export default function AgendarPage() {
  return (
    <Suspense fallback={null}>
      <AgendarContent />
    </Suspense>
  );
}
