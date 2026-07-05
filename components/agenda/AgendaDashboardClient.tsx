"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Copy,
  MoreHorizontal,
  Search,
  Settings,
  SlidersHorizontal,
  Stethoscope,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";

type AppointmentStatus =
  | "Pendiente"
  | "Confirmada"
  | "En consulta"
  | "Cancelada"
  | "Finalizada";

type Appointment = {
  id: string;
  time: string;
  patient: string;
  reason: string;
  site: "Zarate" | "Vidal" | "Doxey" | "Adoy";
  status?: AppointmentStatus;
  isOpenSlot?: boolean;
};

const sites = ["Todas", "Zarate", "Vidal", "Doxey", "Adoy"] as const;
const views = ["Dia", "Semana", "Por sede"] as const;

const navItems = [
  { label: "Agenda", icon: CalendarDays },
  { label: "Pacientes", icon: UsersRound },
  { label: "Disponibilidad", icon: SlidersHorizontal },
  { label: "Configuración", icon: Settings },
];

const appointments: Appointment[] = [
  {
    id: "maria-0800",
    time: "08:00",
    patient: "María Fernanda López",
    reason: "Rodilla derecha",
    site: "Adoy",
    status: "Confirmada",
  },
  {
    id: "jose-0900",
    time: "09:00",
    patient: "José Antonio Martínez",
    reason: "Hombro",
    site: "Adoy",
    status: "En consulta",
  },
  {
    id: "bloqueo-1000",
    time: "10:00",
    patient: "Bloqueo de tiempo",
    reason: "Procedimiento menor",
    site: "Zarate",
    status: "Finalizada",
  },
  {
    id: "ana-1100",
    time: "11:00",
    patient: "Ana Gabriela Sánchez",
    reason: "Columna",
    site: "Vidal",
    status: "Pendiente",
  },
  {
    id: "carlos-1200",
    time: "12:00",
    patient: "Carlos Alberto Pérez",
    reason: "Postoperatorio",
    site: "Doxey",
    status: "Confirmada",
  },
  {
    id: "espacio-1300",
    time: "13:00",
    patient: "Espacio disponible",
    reason: "+ Agendar aquí",
    site: "Adoy",
    isOpenSlot: true,
  },
];

const statusStyles: Record<AppointmentStatus, string> = {
  Pendiente: "border-amber-200 bg-amber-50 text-amber-700",
  Confirmada: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "En consulta": "border-sky-200 bg-sky-50 text-sky-700",
  Cancelada: "border-rose-200 bg-rose-50 text-rose-700",
  Finalizada: "border-slate-200 bg-slate-50 text-slate-600",
};

function displaySite(site: string) {
  return site === "Zarate" ? "Zárate" : site;
}

function displayView(view: string) {
  return view === "Dia" ? "Día" : view;
}

function AppointmentActions() {
  const actions = [
    { label: "Confirmar", icon: Check },
    { label: "Reprogramar", icon: Clock3 },
    { label: "Cancelar", icon: X },
    { label: "Ver paciente", icon: UserRound },
    { label: "Copiar mensaje", icon: Copy },
  ];

  return (
    <details className="group relative">
      <summary
        className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-500 shadow-sm transition hover:border-slate-300 hover:text-slate-800 [&::-webkit-details-marker]:hidden"
        aria-label="Acciones de cita"
      >
        <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
      </summary>
      <div className="absolute right-0 top-11 z-20 w-48 rounded-2xl border border-white/70 bg-white/95 p-2 shadow-[0_24px_60px_rgba(15,23,42,0.16)] backdrop-blur-xl">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              type="button"
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {action.label}
            </button>
          );
        })}
      </div>
    </details>
  );
}

export default function AgendaDashboardClient() {
  const [activeSite, setActiveSite] = useState<(typeof sites)[number]>("Todas");
  const [activeView, setActiveView] = useState<(typeof views)[number]>("Dia");
  const [isCreating, setIsCreating] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(
    null,
  );

  const filteredAppointments = useMemo(() => {
    if (activeSite === "Todas") {
      return appointments;
    }

    return appointments.filter((appointment) => appointment.site === activeSite);
  }, [activeSite]);

  const selectedAppointment = appointments.find(
    (appointment) => appointment.id === selectedAppointmentId,
  );

  function openNewAppointment() {
    setIsCreating(true);
    setSelectedAppointmentId(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsCreating(false);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#EAF1F6] text-slate-950">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.92),transparent_34%),linear-gradient(135deg,#F8FBFD_0%,#E7F0F6_46%,#DCE9F1_100%)]" />
      <div className="relative z-10 flex min-h-screen pb-24 md:pb-0">
        <aside className="hidden w-[232px] shrink-0 border-r border-white/70 bg-white/42 px-5 py-6 backdrop-blur-2xl md:flex md:flex-col">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0B3558] text-white shadow-[0_16px_38px_rgba(11,53,88,0.22)]">
              <Stethoscope className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-950">Alexis García</p>
              <p className="text-xs text-slate-500">Ortopedia</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1.5" aria-label="Navegación interna">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.label === "Agenda";

              return (
                <button
                  key={item.label}
                  type="button"
                  className={[
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition",
                    isActive
                      ? "bg-[#0B3558] text-white shadow-[0_16px_34px_rgba(11,53,88,0.18)]"
                      : "text-slate-500 hover:bg-white/70 hover:text-slate-900",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="hidden border-b border-white/70 bg-white/35 px-6 py-4 backdrop-blur-2xl md:block">
            <div className="flex items-center gap-4">
              <div className="min-w-[210px]">
                <p className="text-base font-semibold text-slate-950">
                  Alexis García Ortopedia
                </p>
              </div>

              <label className="relative min-w-[260px] flex-1">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  placeholder="Buscar paciente, cita o teléfono..."
                  className="h-11 w-full rounded-2xl border border-white/75 bg-white/68 pl-11 pr-4 text-sm text-slate-800 outline-none shadow-sm placeholder:text-slate-400 focus:border-[#8AB8CF] focus:ring-4 focus:ring-[#8AB8CF]/18"
                />
              </label>

              <button
                type="button"
                className="h-11 rounded-2xl border border-white/75 bg-white/68 px-4 text-sm font-semibold text-slate-700 shadow-sm"
              >
                Hoy
              </button>

              <div className="flex rounded-2xl border border-white/75 bg-white/62 p-1 shadow-sm">
                {views.map((view) => (
                  <button
                    key={view}
                    type="button"
                    onClick={() => setActiveView(view)}
                    className={[
                      "rounded-xl px-3 py-2 text-sm font-medium transition",
                      activeView === view
                        ? "bg-[#0B3558] text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-900",
                    ].join(" ")}
                  >
                    {displayView(view)}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={openNewAppointment}
                className="h-11 rounded-2xl bg-[#0B3558] px-5 text-sm font-semibold text-white shadow-[0_18px_38px_rgba(11,53,88,0.22)] transition hover:-translate-y-0.5 hover:bg-[#092D4A]"
              >
                + Nueva cita
              </button>
            </div>
          </header>

          <header className="px-4 pb-3 pt-5 md:hidden">
            <div>
              <div>
                <p className="text-base font-semibold text-slate-950">
                  Alexis García Ortopedia
                </p>
                <p className="text-sm text-slate-500">Agenda del día</p>
              </div>
            </div>
          </header>

          <div className="grid flex-1 gap-5 px-4 pb-5 md:grid-cols-[minmax(0,1fr)_340px] md:px-6 md:py-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <section className="flex min-w-0 flex-col gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {sites.map((site) => (
                  <button
                    key={site}
                    type="button"
                    onClick={() => setActiveSite(site)}
                    className={[
                      "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition",
                      activeSite === site
                        ? "border-[#0B3558] bg-[#0B3558] text-white shadow-[0_14px_28px_rgba(11,53,88,0.16)]"
                        : "border-white/80 bg-white/58 text-slate-600 backdrop-blur-xl hover:bg-white/82 hover:text-slate-950",
                    ].join(" ")}
                  >
                    {displaySite(site)}
                  </button>
                ))}
              </div>

              <div className="flex min-h-[calc(100vh-168px)] flex-col rounded-[28px] border border-white/75 bg-white/52 p-4 shadow-[0_28px_80px_rgba(15,44,71,0.10)] backdrop-blur-2xl md:p-5">
                <div className="mb-4 flex flex-col gap-3 border-b border-slate-200/70 pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Hoy</p>
                    <h1 className="text-2xl font-semibold text-slate-950 md:text-3xl">
                      Agenda médica interna
                    </h1>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Disponibilidad actualizada
                  </div>
                </div>

                <div className="grid gap-3">
                  {filteredAppointments.map((appointment) => {
                    const isSelected = selectedAppointmentId === appointment.id;
                    const isOpenSlot = appointment.isOpenSlot;

                    return (
                      <article
                        key={appointment.id}
                        className={[
                          "group grid gap-3 rounded-[22px] border bg-white/70 p-4 text-left shadow-sm transition md:grid-cols-[92px_minmax(0,1fr)_auto]",
                          isOpenSlot
                            ? "border-dashed border-cyan-200 bg-cyan-50/45 hover:border-cyan-300 hover:bg-cyan-50/70"
                            : isSelected
                            ? "border-[#8AB8CF] ring-4 ring-[#8AB8CF]/18"
                            : "border-white/78 hover:border-[#B7D4E2]",
                        ].join(" ")}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            if (isOpenSlot) {
                              openNewAppointment();
                              return;
                            }

                            setSelectedAppointmentId(appointment.id);
                            setIsCreating(false);
                          }}
                          className="contents text-left"
                        >
                          <div className="flex items-center gap-3 md:block">
                            <p className="text-xl font-semibold text-[#0B3558] md:text-2xl">
                              {appointment.time}
                            </p>
                            <p className="text-xs font-medium uppercase text-slate-400 md:mt-1">
                              {isOpenSlot
                                ? "Libre"
                                : activeView === "Por sede"
                                ? displaySite(appointment.site)
                                : "Consulta"}
                            </p>
                          </div>

                          <div className="min-w-0">
                            <h2 className="truncate text-base font-semibold text-slate-950 md:text-lg">
                              {appointment.patient}
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                              {appointment.reason}
                            </p>
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-500">
                                {displaySite(appointment.site)}
                              </span>
                              {appointment.status ? (
                                <span
                                  className={[
                                    "rounded-full border px-3 py-1 text-xs font-semibold",
                                    statusStyles[appointment.status],
                                  ].join(" ")}
                                >
                                  {appointment.status}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </button>

                        <div className="flex items-start justify-end">
                          {!isOpenSlot && isSelected ? <AppointmentActions /> : null}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>

            <aside className="hidden md:block">
              <div className="sticky top-6 rounded-[28px] border border-white/75 bg-white/50 p-5 shadow-[0_28px_80px_rgba(15,44,71,0.10)] backdrop-blur-2xl">
                {isCreating ? (
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-slate-500">Nueva cita</p>
                        <h2 className="text-xl font-semibold text-slate-950">
                          Datos básicos
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsCreating(false)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-500"
                        aria-label="Cerrar formulario"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    {["Paciente", "Teléfono", "Motivo"].map((field) => (
                      <label key={field} className="flex flex-col gap-1.5 text-sm">
                        <span className="font-medium text-slate-600">{field}</span>
                        <input
                          type={field === "Teléfono" ? "tel" : "text"}
                          className="h-11 rounded-2xl border border-white/80 bg-white/72 px-4 text-slate-800 outline-none focus:border-[#8AB8CF] focus:ring-4 focus:ring-[#8AB8CF]/18"
                        />
                      </label>
                    ))}

                    <label className="flex flex-col gap-1.5 text-sm">
                      <span className="font-medium text-slate-600">Sede</span>
                      <select className="h-11 rounded-2xl border border-white/80 bg-white/72 px-4 text-slate-800 outline-none focus:border-[#8AB8CF] focus:ring-4 focus:ring-[#8AB8CF]/18">
                        {sites.slice(1).map((site) => (
                          <option key={site}>{displaySite(site)}</option>
                        ))}
                      </select>
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex flex-col gap-1.5 text-sm">
                        <span className="font-medium text-slate-600">Fecha</span>
                        <input
                          type="date"
                          className="h-11 rounded-2xl border border-white/80 bg-white/72 px-3 text-slate-800 outline-none focus:border-[#8AB8CF] focus:ring-4 focus:ring-[#8AB8CF]/18"
                        />
                      </label>
                      <label className="flex flex-col gap-1.5 text-sm">
                        <span className="font-medium text-slate-600">Hora</span>
                        <input
                          type="time"
                          className="h-11 rounded-2xl border border-white/80 bg-white/72 px-3 text-slate-800 outline-none focus:border-[#8AB8CF] focus:ring-4 focus:ring-[#8AB8CF]/18"
                        />
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="mt-1 h-12 rounded-2xl bg-[#0B3558] text-sm font-semibold text-white shadow-[0_18px_38px_rgba(11,53,88,0.22)] transition hover:-translate-y-0.5 hover:bg-[#092D4A]"
                    >
                      Confirmar cita
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        Próxima cita
                      </p>
                      <h2 className="mt-1 text-xl font-semibold text-slate-950">
                        {selectedAppointment?.time ?? "09:00"} ·{" "}
                        {selectedAppointment?.patient ?? "José Antonio Martínez"}
                      </h2>
                      <p className="mt-2 text-sm text-slate-500">
                        {selectedAppointment?.reason ?? "Hombro"} ·{" "}
                        {displaySite(selectedAppointment?.site ?? "Adoy")}
                      </p>
                    </div>

                    <div className="grid gap-3">
                      <div className="rounded-2xl border border-white/70 bg-white/62 p-4">
                        <p className="text-sm font-medium text-slate-500">
                          Pendientes por confirmar
                        </p>
                        <p className="mt-2 text-2xl font-semibold text-slate-950">1</p>
                      </div>
                      <div className="rounded-2xl border border-white/70 bg-white/62 p-4">
                        <p className="text-sm font-medium text-slate-500">
                          Espacios disponibles
                        </p>
                        <p className="mt-2 text-2xl font-semibold text-slate-950">1</p>
                      </div>
                      <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
                        Disponibilidad actualizada
                        <Check className="h-4 w-4" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {isCreating ? (
              <section className="order-first rounded-[24px] border border-white/75 bg-white/62 p-4 shadow-[0_22px_60px_rgba(15,44,71,0.10)] backdrop-blur-2xl md:hidden">
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Nueva cita</p>
                      <h2 className="text-lg font-semibold text-slate-950">
                        Datos básicos
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCreating(false)}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-500"
                      aria-label="Cerrar formulario"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  {["Paciente", "Teléfono", "Motivo"].map((field) => (
                    <input
                      key={field}
                      type={field === "Teléfono" ? "tel" : "text"}
                      placeholder={field}
                      className="h-11 rounded-2xl border border-white/80 bg-white/78 px-4 text-sm text-slate-800 outline-none"
                    />
                  ))}
                  <div className="grid grid-cols-2 gap-2">
                    <select className="h-11 rounded-2xl border border-white/80 bg-white/78 px-3 text-sm text-slate-800 outline-none">
                      {sites.slice(1).map((site) => (
                        <option key={site}>{displaySite(site)}</option>
                      ))}
                    </select>
                    <input
                      type="time"
                      className="h-11 rounded-2xl border border-white/80 bg-white/78 px-3 text-sm text-slate-800 outline-none"
                    />
                  </div>
                  <input
                    type="date"
                    className="h-11 rounded-2xl border border-white/80 bg-white/78 px-3 text-sm text-slate-800 outline-none"
                  />
                  <button
                    type="submit"
                    className="h-11 rounded-2xl bg-[#0B3558] text-sm font-semibold text-white"
                  >
                    Confirmar cita
                  </button>
                </form>
              </section>
            ) : null}
          </div>
        </section>
      </div>

      {!isCreating ? (
        <button
          type="button"
          onClick={openNewAppointment}
          className="fixed bottom-20 right-4 z-30 rounded-full bg-[#0B3558] px-5 py-3 text-sm font-semibold text-white shadow-[0_22px_45px_rgba(11,53,88,0.30)] md:hidden"
        >
          + Nueva cita
        </button>
      ) : null}

      <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-3 border-t border-white/75 bg-white/84 px-3 py-2 shadow-[0_-18px_40px_rgba(15,44,71,0.10)] backdrop-blur-2xl md:hidden">
        {[
          { label: "Agenda", icon: CalendarDays },
          { label: "Pacientes", icon: UsersRound },
          { label: "Más", icon: ChevronDown },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = item.label === "Agenda";

          return (
            <button
              key={item.label}
              type="button"
              className={[
                "flex flex-col items-center gap-1 rounded-2xl py-2 text-xs font-medium",
                isActive ? "text-[#0B3558]" : "text-slate-500",
              ].join(" ")}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </main>
  );
}
