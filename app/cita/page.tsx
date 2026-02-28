"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { SCHEDULES, Sede } from "@/lib/appointmentsSchedule";

type Appointment = {
  id: string;
  sede: Sede;
  tipo: "programada" | "prioritaria";
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  nombre: string;
  telefono: string;
  motivo: string | null;
  reprogram_count?: number;
  current_start_at?: string | null;
  ref_source?: string | null;
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

function CitaContent() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("appointment_id") || "XXXX";
  const action = searchParams.get("action");
  const [reprogramar, setReprogramar] = useState(action === "reprogramar");
  const [cancelar, setCancelar] = useState(action === "cancelar");
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [occupiedSlots, setOccupiedSlots] = useState<string[]>([]);

  useEffect(() => {
    if (!appointmentId || appointmentId === "XXXX") return;
    setLoading(true);
    fetch(`/api/appointments/get?appointment_id=${appointmentId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.appointment) {
          setAppointment(data.appointment);
          setFecha(data.appointment.fecha);
          setHora(data.appointment.hora_inicio);
        }
      })
      .finally(() => setLoading(false));
  }, [appointmentId]);

  useEffect(() => {
    if (!appointment?.sede || !fecha) return;
    fetch(`/api/appointments/availability?sede=${appointment.sede}&date=${fecha}`)
      .then((res) => res.json())
      .then((data) => setOccupiedSlots(data.occupied || []))
      .catch(() => setOccupiedSlots([]));
  }, [appointment?.sede, fecha]);

  const hoursUntil = useMemo(() => {
    if (!appointment?.current_start_at) return null;
    const now = new Date();
    const start = new Date(appointment.current_start_at);
    return (start.getTime() - now.getTime()) / (1000 * 60 * 60);
  }, [appointment?.current_start_at]);

  const reprogramCount = Number(appointment?.reprogram_count || 0);
  const canReprogramFree = hoursUntil !== null && hoursUntil >= 12 && reprogramCount < 1;
  const reprogramNotice =
    reprogramCount >= 1
      ? "Ya utilizaste tu reprogramación sin costo. Para cambiar nuevamente se requiere nuevo anticipo."
      : hoursUntil !== null && hoursUntil < 12
        ? "Con menos de 12 horas, el anticipo no es reembolsable y se requiere nuevo anticipo para un nuevo horario."
        : "Tienes 1 reprogramación sin costo con al menos 12 horas de anticipación.";

  const availableDates = useMemo(() => {
    if (!appointment?.sede) return [];
    return getUpcomingDates(SCHEDULES[appointment.sede].days);
  }, [appointment?.sede]);

  const availableHours = useMemo(() => {
    if (!appointment?.sede) return [];
    return SCHEDULES[appointment.sede].slots;
  }, [appointment?.sede]);

  const handleReschedule = async () => {
    if (!appointment || !fecha || !hora) return;
    setStatusMessage("");
    const [h, m] = hora.split(":").map(Number);
    const endMinutes = h * 60 + m + 30;
    const endH = String(Math.floor(endMinutes / 60)).padStart(2, "0");
    const endM = String(endMinutes % 60).padStart(2, "0");
    const horaFin = `${endH}:${endM}`;
    const response = await fetch("/api/appointments/reschedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        appointment_id: appointment.id,
        fecha,
        hora_inicio: hora,
        hora_fin: horaFin,
      }),
    });
    if (!response.ok) {
      setStatusMessage("No fue posible reprogramar. Verifica disponibilidad.");
      return;
    }
    setStatusMessage("Cita reprogramada correctamente.");
  };

  const handleCancel = async () => {
    if (!appointment) return;
    setStatusMessage("");
    const response = await fetch("/api/appointments/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appointment_id: appointment.id }),
    });
    if (!response.ok) {
      setStatusMessage("No fue posible cancelar la cita.");
      return;
    }
    setStatusMessage("Cita cancelada correctamente.");
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050608]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050608_0%,#0B0F17_50%,#050608_100%)]" />
      <div className="pointer-events-none absolute -right-28 top-16 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(148,156,170,0.18),transparent_70%)] blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-20" />

      <Header />

      <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-10 px-8 pb-24 pt-12 sm:px-10 lg:pt-16">
        <section className="flex flex-col gap-3">
          <h1 className="font-serif text-3xl text-white sm:text-4xl">
            Gestión de cita
          </h1>
          <p className="text-sm text-[#B9C0CC] sm:text-base">
            ID de cita: {appointmentId}
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setReprogramar(true);
                setCancelar(false);
              }}
              className="inline-flex items-center justify-center rounded-lg bg-[#0A2540] px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105"
            >
              Reprogramar
            </button>
            <button
              type="button"
              onClick={() => {
                setCancelar(true);
                setReprogramar(false);
              }}
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-5 py-2 text-sm font-semibold text-white"
            >
              Cancelar
            </button>
          </div>

          {(reprogramar || cancelar) && (
            <div className="flex flex-col gap-4 rounded-[20px] border border-white/10 bg-white/5 p-6 text-sm text-[#B9C0CC]">
              {loading && <p>Consultando tu cita…</p>}
              {!loading && !appointment && (
                <p>No encontramos la cita. Verifica el ID.</p>
              )}
              {appointment && (
                <>
                  <p className="text-xs text-[#8C95A3]">
                    {reprogramNotice}
                  </p>
                  {reprogramar && (
                    <>
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
                              className={`rounded-lg border px-3 py-2 text-left text-xs transition-all ${
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
                      <div className="flex flex-wrap gap-2">
                        {availableHours.map((slot) => {
                          const isOccupied =
                            occupiedSlots.includes(slot) &&
                            !(fecha === appointment.fecha && slot === appointment.hora_inicio);
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setHora(slot)}
                              disabled={isOccupied}
                              className={`rounded-lg border px-3 py-1 text-xs transition-all ${
                                hora === slot
                                  ? "border-white bg-white/10 text-white"
                                  : "border-white/10 text-[#B9C0CC]"
                              } ${isOccupied ? "cursor-not-allowed opacity-40" : ""}`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                      <button
                        type="button"
                        onClick={handleReschedule}
                        disabled={!canReprogramFree || !fecha || !hora}
                        className="inline-flex items-center justify-center rounded-lg bg-[#0A2540] px-4 py-2 text-xs font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Confirmar reprogramación
                      </button>
                    </>
                  )}
                  {cancelar && (
                    <>
                      <p>
                        La cancelación genera crédito para reprogramación (1
                        vez). No hay reembolso automático.
                      </p>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2 text-xs font-semibold text-white"
                      >
                        Confirmar cancelación
                      </button>
                    </>
                  )}
                  {statusMessage && (
                    <p className="text-xs text-[#8C95A3]">{statusMessage}</p>
                  )}
                </>
              )}
            </div>
          )}
        </section>
      </main>

      <WhatsAppFloating />
    </div>
  );
}

export default function CitaPage() {
  return (
    <Suspense fallback={null}>
      <CitaContent />
    </Suspense>
  );
}
