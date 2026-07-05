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
  Pendiente:
    "border-amber-300/25 bg-amber-300/10 text-amber-100 shadow-[0_0_22px_rgba(251,191,36,0.08)]",
  Confirmada:
    "border-emerald-300/25 bg-emerald-300/10 text-emerald-100 shadow-[0_0_22px_rgba(52,211,153,0.08)]",
  "En consulta":
    "border-sky-300/30 bg-sky-300/12 text-sky-100 shadow-[0_0_24px_rgba(56,189,248,0.12)]",
  Cancelada:
    "border-rose-300/25 bg-rose-300/10 text-rose-100 shadow-[0_0_22px_rgba(251,113,133,0.08)]",
  Finalizada:
    "border-slate-300/20 bg-slate-300/10 text-slate-200 shadow-[0_0_18px_rgba(148,163,184,0.06)]",
};

const statusRailStyles: Record<AppointmentStatus, string> = {
  Pendiente: "from-amber-300/70 to-amber-300/10",
  Confirmada: "from-emerald-300/70 to-emerald-300/10",
  "En consulta": "from-sky-300/80 to-cyan-300/10",
  Cancelada: "from-rose-300/70 to-rose-300/10",
  Finalizada: "from-slate-300/50 to-slate-300/10",
};

const inputClass =
  "h-11 rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-slate-100 outline-none shadow-inner shadow-black/10 transition-all duration-200 placeholder:text-slate-500 focus:border-sky-300/45 focus:ring-4 focus:ring-sky-400/10";

function displaySite(site: string) {
  return site === "Zarate" ? "Zárate" : site;
}

function displayView(view: string) {
  return view === "Dia" ? "Día" : view;
}

function getSiteCount(site: (typeof sites)[number]) {
  if (site === "Todas") {
    return appointments.length;
  }

  return appointments.filter((appointment) => appointment.site === site).length;
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
        className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-slate-300 shadow-[0_12px_28px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-200 hover:border-sky-300/35 hover:bg-sky-300/10 hover:text-white focus:outline-none focus:ring-4 focus:ring-sky-400/15 [&::-webkit-details-marker]:hidden"
        aria-label="Acciones de cita"
      >
        <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
      </summary>
      <div className="absolute right-0 top-11 z-20 w-48 rounded-2xl border border-white/10 bg-slate-950/90 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              type="button"
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-slate-300 transition-all duration-200 hover:bg-white/[0.07] hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-400/20"
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
    <main className="min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(14,165,233,0.22),transparent_28%),radial-gradient(circle_at_84%_14%,rgba(45,212,191,0.14),transparent_26%),radial-gradient(circle_at_50%_86%,rgba(56,189,248,0.10),transparent_34%),linear-gradient(135deg,#020617_0%,#07111f_42%,#082f49_100%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-48 bg-gradient-to-b from-sky-400/10 to-transparent" />

      <div className="relative z-10 flex min-h-screen pb-28 md:pb-0">
        <aside className="hidden w-[232px] shrink-0 p-4 xl:flex xl:flex-col">
          <div className="flex h-full flex-col rounded-[28px] border border-white/10 bg-slate-950/52 px-4 py-5 shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
            <div className="mb-9 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-400/12 text-sky-100 shadow-[0_0_36px_rgba(56,189,248,0.20)]">
                <Stethoscope className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  Alexis García
                </p>
                <p className="text-xs text-slate-400">Ortopedia</p>
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
                      "group flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-sky-400/12",
                      isActive
                        ? "border-sky-300/28 bg-sky-300/12 text-white shadow-[0_0_34px_rgba(56,189,248,0.13)]"
                        : "border-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.06] hover:text-slate-100",
                    ].join(" ")}
                  >
                    <Icon
                      className={[
                        "h-4 w-4 transition-colors duration-200",
                        isActive ? "text-sky-200" : "text-slate-500 group-hover:text-slate-200",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="hidden px-4 py-4 xl:block">
            <div className="flex items-center gap-4 rounded-[28px] border border-white/10 bg-slate-950/48 px-4 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
              <div className="min-w-[210px]">
                <p className="text-base font-semibold text-white">
                  Alexis García Ortopedia
                </p>
              </div>

              <label className="relative min-w-[260px] flex-1">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-200/65"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  placeholder="Buscar paciente, cita o teléfono..."
                  className="h-11 w-full rounded-2xl border border-white/10 bg-white/[0.06] pl-11 pr-4 text-sm text-slate-100 outline-none shadow-inner shadow-black/10 transition-all duration-200 placeholder:text-slate-500 focus:border-sky-300/45 focus:ring-4 focus:ring-sky-400/10"
                />
              </label>

              <button
                type="button"
                className="h-11 rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-slate-200 shadow-sm transition-all duration-200 hover:border-sky-300/25 hover:bg-white/[0.09] focus:outline-none focus:ring-4 focus:ring-sky-400/10"
              >
                Hoy
              </button>

              <div className="flex rounded-2xl border border-white/10 bg-white/[0.05] p-1 shadow-inner shadow-black/10">
                {views.map((view) => (
                  <button
                    key={view}
                    type="button"
                    onClick={() => setActiveView(view)}
                    className={[
                      "rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-sky-400/10",
                      activeView === view
                        ? "bg-sky-400/16 text-white shadow-[0_0_24px_rgba(56,189,248,0.13)]"
                        : "text-slate-400 hover:bg-white/[0.06] hover:text-slate-100",
                    ].join(" ")}
                  >
                    {displayView(view)}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={openNewAppointment}
                className="h-11 rounded-2xl border border-sky-200/25 bg-gradient-to-r from-sky-500 to-cyan-400 px-5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(56,189,248,0.28),0_18px_46px_rgba(8,47,73,0.32)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(56,189,248,0.34),0_20px_50px_rgba(8,47,73,0.36)] focus:outline-none focus:ring-4 focus:ring-sky-300/25"
              >
                + Nueva cita
              </button>
            </div>
          </header>

          <header className="px-4 pb-3 pt-5 sm:px-6 md:px-8 xl:hidden">
            <div className="flex flex-col gap-4 rounded-[26px] border border-white/10 bg-slate-950/42 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold text-white">
                    Alexis García Ortopedia
                  </p>
                  <p className="text-sm text-slate-400">Agenda del día</p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    className="hidden h-10 rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-slate-200 shadow-sm transition-all duration-200 hover:bg-white/[0.09] sm:block"
                  >
                    Hoy
                  </button>
                  <button
                    type="button"
                    onClick={openNewAppointment}
                    className="hidden h-10 rounded-2xl border border-sky-200/25 bg-gradient-to-r from-sky-500 to-cyan-400 px-4 text-sm font-semibold text-white shadow-[0_0_26px_rgba(56,189,248,0.24)] transition-all duration-200 hover:-translate-y-0.5 sm:block"
                  >
                    + Nueva cita
                  </button>
                </div>
              </div>

              <div className="hidden grid-cols-[minmax(0,1fr)_auto] gap-3 sm:grid">
                <label className="relative min-w-0">
                  <Search
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-200/65"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    placeholder="Buscar paciente, cita o teléfono..."
                    className="h-11 w-full rounded-2xl border border-white/10 bg-white/[0.06] pl-11 pr-4 text-sm text-slate-100 outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-sky-300/45 focus:ring-4 focus:ring-sky-400/10"
                  />
                </label>

                <div className="flex rounded-2xl border border-white/10 bg-white/[0.05] p-1">
                  {views.map((view) => (
                    <button
                      key={view}
                      type="button"
                      onClick={() => setActiveView(view)}
                      className={[
                        "rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-sky-400/10",
                        activeView === view
                          ? "bg-sky-400/16 text-white shadow-[0_0_24px_rgba(56,189,248,0.13)]"
                          : "text-slate-400 hover:bg-white/[0.06] hover:text-slate-100",
                      ].join(" ")}
                    >
                      {displayView(view)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </header>

          <div className="grid flex-1 gap-5 px-4 pb-5 sm:px-6 md:px-8 md:py-6 xl:grid-cols-[minmax(0,1fr)_360px] xl:px-4 xl:pt-1">
            <section className="flex min-w-0 flex-col gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {sites.map((site) => {
                  const isActive = activeSite === site;

                  return (
                    <button
                      key={site}
                      type="button"
                      onClick={() => setActiveSite(site)}
                      className={[
                        "flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium backdrop-blur-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-sky-400/12",
                        isActive
                          ? "border-sky-300/35 bg-sky-300/13 text-white shadow-[0_0_26px_rgba(56,189,248,0.15)]"
                          : "border-white/10 bg-white/[0.05] text-slate-400 hover:-translate-y-0.5 hover:border-sky-300/20 hover:bg-white/[0.08] hover:text-slate-100",
                      ].join(" ")}
                    >
                      <span>{displaySite(site)}</span>
                      <span
                        className={[
                          "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                          isActive
                            ? "bg-sky-200/18 text-sky-50"
                            : "bg-white/[0.07] text-slate-500",
                        ].join(" ")}
                      >
                        {getSiteCount(site)}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="relative flex min-h-[calc(100vh-188px)] flex-col overflow-hidden rounded-[30px] border border-white/10 bg-slate-950/50 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.42)] backdrop-blur-2xl before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-sky-200/35 before:to-transparent md:min-h-0 md:p-5 xl:min-h-[calc(100vh-184px)]">
                <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-sky-400/12 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 left-12 h-56 w-56 rounded-full bg-cyan-300/8 blur-3xl" />

                <div className="relative mb-4 flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-sky-200/75">Hoy</p>
                    <h1 className="text-2xl font-semibold text-white md:text-3xl">
                      Agenda médica interna
                    </h1>
                  </div>
                  <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-sm font-medium text-emerald-100 shadow-[0_0_24px_rgba(52,211,153,0.08)]">
                    <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]" />
                    Disponibilidad actualizada
                  </div>
                </div>

                <div className="relative grid gap-3">
                  {filteredAppointments.map((appointment) => {
                    const isSelected = selectedAppointmentId === appointment.id;
                    const isOpenSlot = appointment.isOpenSlot;
                    const railStyle = appointment.status
                      ? statusRailStyles[appointment.status]
                      : "from-cyan-300/70 to-cyan-300/10";

                    return (
                      <article
                        key={appointment.id}
                        className={[
                          "group relative grid gap-3 overflow-hidden rounded-[22px] border bg-white/[0.055] p-4 text-left shadow-[0_18px_50px_rgba(0,0,0,0.20)] backdrop-blur-xl transition-all duration-200 md:grid-cols-[92px_minmax(0,1fr)_auto]",
                          "before:absolute before:inset-y-3 before:left-0 before:w-1 before:rounded-r-full before:bg-gradient-to-b",
                          railStyle,
                          isOpenSlot
                            ? "border-dashed border-cyan-300/25 hover:border-cyan-300/45 hover:bg-cyan-300/[0.075]"
                            : isSelected
                            ? "border-sky-300/40 bg-sky-300/[0.075] ring-4 ring-sky-400/10"
                            : "border-white/10 hover:-translate-y-0.5 hover:border-sky-300/24 hover:bg-white/[0.075]",
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
                            <p className="text-xl font-semibold text-sky-100 md:text-2xl">
                              {appointment.time}
                            </p>
                            <p className="text-xs font-medium uppercase text-slate-500 md:mt-1">
                              {isOpenSlot
                                ? "Libre"
                                : activeView === "Por sede"
                                ? displaySite(appointment.site)
                                : "Consulta"}
                            </p>
                          </div>

                          <div className="min-w-0">
                            <h2 className="truncate text-base font-semibold text-white md:text-lg">
                              {appointment.patient}
                            </h2>
                            <p className="mt-1 text-sm text-slate-400">
                              {appointment.reason}
                            </p>
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-medium text-slate-300">
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

            <aside className="hidden xl:block">
              <div className="sticky top-5 overflow-hidden rounded-[30px] border border-white/10 bg-slate-950/48 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.38)] backdrop-blur-2xl">
                <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-sky-400/12 blur-3xl" />
                {isCreating ? (
                  <form className="relative flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-sky-200/75">
                          Nueva cita
                        </p>
                        <h2 className="text-xl font-semibold text-white">
                          Datos básicos
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsCreating(false)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-300 transition-all duration-200 hover:border-sky-300/30 hover:text-white focus:outline-none focus:ring-4 focus:ring-sky-400/12"
                        aria-label="Cerrar formulario"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    {["Paciente", "Teléfono", "Motivo"].map((field) => (
                      <label key={field} className="flex flex-col gap-1.5 text-sm">
                        <span className="font-medium text-slate-300">{field}</span>
                        <input
                          type={field === "Teléfono" ? "tel" : "text"}
                          className={inputClass}
                        />
                      </label>
                    ))}

                    <label className="flex flex-col gap-1.5 text-sm">
                      <span className="font-medium text-slate-300">Sede</span>
                      <select className={`${inputClass} [color-scheme:dark]`}>
                        {sites.slice(1).map((site) => (
                          <option key={site} className="bg-slate-950">
                            {displaySite(site)}
                          </option>
                        ))}
                      </select>
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex flex-col gap-1.5 text-sm">
                        <span className="font-medium text-slate-300">Fecha</span>
                        <input
                          type="date"
                          className={`${inputClass} px-3 [color-scheme:dark]`}
                        />
                      </label>
                      <label className="flex flex-col gap-1.5 text-sm">
                        <span className="font-medium text-slate-300">Hora</span>
                        <input
                          type="time"
                          className={`${inputClass} px-3 [color-scheme:dark]`}
                        />
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="mt-1 h-12 rounded-2xl border border-sky-200/25 bg-gradient-to-r from-sky-500 to-cyan-400 text-sm font-semibold text-white shadow-[0_0_28px_rgba(56,189,248,0.26),0_18px_46px_rgba(8,47,73,0.32)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(56,189,248,0.34),0_20px_50px_rgba(8,47,73,0.36)] focus:outline-none focus:ring-4 focus:ring-sky-300/25"
                    >
                      Confirmar cita
                    </button>
                  </form>
                ) : (
                  <div className="relative flex flex-col gap-4">
                    <div>
                      <p className="text-sm font-medium text-sky-200/75">
                        Próxima cita
                      </p>
                      <h2 className="mt-1 text-xl font-semibold text-white">
                        {selectedAppointment?.time ?? "09:00"} ·{" "}
                        {selectedAppointment?.patient ?? "José Antonio Martínez"}
                      </h2>
                      <p className="mt-2 text-sm text-slate-400">
                        {selectedAppointment?.reason ?? "Hombro"} ·{" "}
                        {displaySite(selectedAppointment?.site ?? "Adoy")}
                      </p>
                    </div>

                    <div className="grid gap-3">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-inner shadow-white/[0.02]">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-medium text-slate-400">
                            Pendientes por confirmar
                          </p>
                          <Clock3 className="h-4 w-4 text-amber-200/75" aria-hidden="true" />
                        </div>
                        <p className="mt-2 text-2xl font-semibold text-white">1</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-inner shadow-white/[0.02]">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-medium text-slate-400">
                            Espacios disponibles
                          </p>
                          <CalendarDays
                            className="h-4 w-4 text-cyan-200/75"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="mt-2 text-2xl font-semibold text-white">1</p>
                      </div>
                      <div className="flex items-center justify-between rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm font-semibold text-emerald-100 shadow-[0_0_24px_rgba(52,211,153,0.08)]">
                        Disponibilidad actualizada
                        <Check className="h-4 w-4" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {isCreating ? (
              <section className="order-first rounded-[26px] border border-white/10 bg-slate-950/50 p-4 shadow-[0_22px_70px_rgba(0,0,0,0.34)] backdrop-blur-2xl xl:hidden">
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-sky-200/75">
                        Nueva cita
                      </p>
                      <h2 className="text-lg font-semibold text-white">
                        Datos básicos
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCreating(false)}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-300 transition-all duration-200 hover:text-white"
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
                      className={inputClass}
                    />
                  ))}
                  <div className="grid grid-cols-2 gap-2">
                    <select className={`${inputClass} [color-scheme:dark]`}>
                      {sites.slice(1).map((site) => (
                        <option key={site} className="bg-slate-950">
                          {displaySite(site)}
                        </option>
                      ))}
                    </select>
                    <input
                      type="time"
                      className={`${inputClass} px-3 [color-scheme:dark]`}
                    />
                  </div>
                  <input
                    type="date"
                    className={`${inputClass} px-3 [color-scheme:dark]`}
                  />
                  <button
                    type="submit"
                    className="h-11 rounded-2xl border border-sky-200/25 bg-gradient-to-r from-sky-500 to-cyan-400 text-sm font-semibold text-white shadow-[0_0_26px_rgba(56,189,248,0.24)] transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Confirmar cita
                  </button>
                </form>
              </section>
            ) : null}

            {!isCreating ? (
              <section className="hidden rounded-[26px] border border-white/10 bg-slate-950/46 p-4 shadow-[0_22px_70px_rgba(0,0,0,0.30)] backdrop-blur-2xl md:block xl:hidden">
                <div className="grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(180px,0.8fr)_minmax(180px,0.8fr)]">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                    <p className="text-sm font-medium text-sky-200/75">
                      Próxima cita
                    </p>
                    <h2 className="mt-1 truncate text-lg font-semibold text-white">
                      {selectedAppointment?.time ?? "09:00"}
                      {" · "}
                      {selectedAppointment?.patient ?? "José Antonio Martínez"}
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                      {selectedAppointment?.reason ?? "Hombro"}
                      {" · "}
                      {displaySite(selectedAppointment?.site ?? "Adoy")}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                    <p className="text-sm font-medium text-slate-400">
                      Pendientes por confirmar
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">1</p>
                  </div>

                  <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-emerald-100">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">
                        Disponibilidad actualizada
                      </p>
                      <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </div>
                    <p className="mt-2 text-sm font-medium text-emerald-100/80">
                      1 espacio disponible
                    </p>
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        </section>
      </div>

      {!isCreating ? (
        <button
          type="button"
          onClick={openNewAppointment}
          className="fixed bottom-24 right-4 z-30 rounded-full border border-sky-200/30 bg-gradient-to-r from-sky-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(56,189,248,0.35),0_18px_45px_rgba(8,47,73,0.45)] transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-sky-300/25 md:hidden"
        >
          + Nueva cita
        </button>
      ) : null}

      <nav className="fixed bottom-4 left-4 right-4 z-30 grid grid-cols-3 rounded-[28px] border border-white/10 bg-slate-950/72 px-3 py-2 shadow-[0_22px_70px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:hidden">
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
                "flex flex-col items-center gap-1 rounded-2xl py-2 text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-sky-400/12",
                isActive
                  ? "bg-sky-300/12 text-sky-50 shadow-[0_0_22px_rgba(56,189,248,0.13)]"
                  : "text-slate-500 hover:bg-white/[0.06] hover:text-slate-200",
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
