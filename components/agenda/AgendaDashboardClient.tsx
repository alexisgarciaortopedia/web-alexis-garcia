"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Copy,
  MoreHorizontal,
  RefreshCcw,
  Search,
  Settings,
  SlidersHorizontal,
  Stethoscope,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";

import {
  AGENDA_STORAGE_KEY,
  appointmentViews,
  clinicSites,
  dayLabels,
  siteFilters,
  siteSchedule,
} from "./agendaSchedule";
import type {
  Appointment,
  AppointmentFormState,
  AppointmentStatus,
  AppointmentView,
  AvailableSlot,
  ClinicSite,
  DashboardSection,
  SiteFilter,
} from "./agendaTypes";
import {
  appointmentMatchesSearch,
  createInitialAppointments,
  displaySite,
  displayView,
  formatLongDate,
  formatShortDate,
  getAvailableSlots,
  getDayName,
  getNextAppointment,
  getPatientsFromAppointments,
  getSitesForFilter,
  getWeekDates,
  isSlotOccupied,
  isSiteWorkingOnDate,
  isTimeWithinSchedule,
  sortAppointments,
  toDateKey,
} from "./agendaUtils";

type FormErrors = Partial<Record<keyof AppointmentFormState | "form", string>>;
type AppointmentRow =
  | { kind: "appointment"; appointment: Appointment }
  | { kind: "slot"; slot: AvailableSlot };

const sectionLabels: Record<DashboardSection, string> = {
  Agenda: "Agenda",
  Pacientes: "Pacientes",
  Disponibilidad: "Disponibilidad",
  Configuracion: "Configuración",
  Mas: "Más",
};

const navItems: Array<{
  label: Exclude<DashboardSection, "Mas">;
  icon: typeof CalendarDays;
}> = [
  { label: "Agenda", icon: CalendarDays },
  { label: "Pacientes", icon: UsersRound },
  { label: "Disponibilidad", icon: SlidersHorizontal },
  { label: "Configuracion", icon: Settings },
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

function sectionLabel(section: DashboardSection) {
  return sectionLabels[section];
}

function getDefaultSite(activeSite: SiteFilter, dateKey: string): ClinicSite {
  if (activeSite !== "Todas") {
    return activeSite;
  }

  return clinicSites.find((site) => isSiteWorkingOnDate(site, dateKey)) ?? "Adoy";
}

function createEmptyForm(date: string, site: ClinicSite): AppointmentFormState {
  return {
    patient: "",
    phone: "",
    reason: "",
    site,
    date,
    time: "",
  };
}

function safeReadStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(AGENDA_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as {
      appointments?: Appointment[];
      surgicalBlock?: boolean;
    };

    if (!Array.isArray(parsed.appointments)) {
      return null;
    }

    return {
      appointments: parsed.appointments,
      surgicalBlock: Boolean(parsed.surgicalBlock),
    };
  } catch {
    return null;
  }
}

function buildAppointmentMessage(appointment: Appointment) {
  return `Hola ${appointment.patient}. Tu cita en Alexis García Ortopedia está programada para el ${formatLongDate(
    appointment.date,
  )} a las ${appointment.time} en sede ${displaySite(appointment.site)}. Motivo: ${
    appointment.reason
  }.`;
}

function AppointmentActions({
  appointment,
  onStatusChange,
  onReprogram,
  onCopy,
  onViewPatient,
}: {
  appointment: Appointment;
  onStatusChange: (status: AppointmentStatus) => void;
  onReprogram: () => void;
  onCopy: () => void;
  onViewPatient: () => void;
}) {
  const locked = appointment.status === "Cancelada" || appointment.status === "Finalizada";
  const actions: Array<{
    label: string;
    icon: typeof Check;
    onClick: () => void;
    disabled?: boolean;
  }> = [
    {
      label: "Confirmar",
      icon: Check,
      onClick: () => onStatusChange("Confirmada"),
      disabled: appointment.status === "Confirmada" || locked,
    },
    {
      label: "En consulta",
      icon: Stethoscope,
      onClick: () => onStatusChange("En consulta"),
      disabled: locked,
    },
    {
      label: "Finalizada",
      icon: Check,
      onClick: () => onStatusChange("Finalizada"),
      disabled: appointment.status === "Cancelada" || appointment.status === "Finalizada",
    },
    {
      label: "Reprogramar",
      icon: Clock3,
      onClick: onReprogram,
    },
    {
      label: "Cancelar",
      icon: X,
      onClick: () => onStatusChange("Cancelada"),
      disabled: appointment.status === "Cancelada" || appointment.status === "Finalizada",
    },
    {
      label: "Ver paciente",
      icon: UserRound,
      onClick: onViewPatient,
    },
    {
      label: "Copiar mensaje",
      icon: Copy,
      onClick: onCopy,
    },
  ];

  return (
    <details className="group relative">
      <summary
        className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-slate-300 shadow-[0_12px_28px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-200 hover:border-sky-300/35 hover:bg-sky-300/10 hover:text-white focus:outline-none focus:ring-4 focus:ring-sky-400/15 [&::-webkit-details-marker]:hidden"
        aria-label="Acciones de cita"
      >
        <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
      </summary>
      <div className="absolute right-0 top-11 z-20 w-52 rounded-2xl border border-white/10 bg-slate-950/92 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              type="button"
              disabled={action.disabled}
              onClick={action.onClick}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-slate-300 transition-all duration-200 hover:bg-white/[0.07] hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-400/20 disabled:cursor-not-allowed disabled:text-slate-600 disabled:hover:bg-transparent"
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
  const [todayKey, setTodayKey] = useState(() => toDateKey());
  const [activeDate, setActiveDate] = useState(() => toDateKey());
  const [activeSite, setActiveSite] = useState<SiteFilter>("Todas");
  const [activeView, setActiveView] = useState<AppointmentView>("Dia");
  const [activeSection, setActiveSection] = useState<DashboardSection>("Agenda");
  const [appointments, setAppointments] = useState<Appointment[]>(() =>
    createInitialAppointments(toDateKey()),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingAppointmentId, setEditingAppointmentId] = useState<string | null>(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const [viewedPatientName, setViewedPatientName] = useState<string | null>(null);
  const [formState, setFormState] = useState<AppointmentFormState>(() =>
    createEmptyForm(toDateKey(), "Adoy"),
  );
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [notice, setNotice] = useState("");
  const [storageReady, setStorageReady] = useState(false);
  const [surgicalBlock, setSurgicalBlock] = useState(false);

  useEffect(() => {
    setTodayKey(toDateKey());
    const stored = safeReadStorage();

    if (stored) {
      setAppointments(stored.appointments);
      setSurgicalBlock(stored.surgicalBlock);
    }

    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady || typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(
        AGENDA_STORAGE_KEY,
        JSON.stringify({ appointments, surgicalBlock }),
      );
    } catch {
      setNotice("No se pudo guardar en localStorage. La demo sigue funcionando en memoria.");
    }
  }, [appointments, storageReady, surgicalBlock]);

  const selectedAppointment = appointments.find(
    (appointment) => appointment.id === selectedAppointmentId,
  );

  const dayAppointments = useMemo(() => {
    return sortAppointments(
      appointments.filter(
        (appointment) =>
          appointment.date === activeDate &&
          (activeSite === "Todas" || appointment.site === activeSite) &&
          appointmentMatchesSearch(appointment, searchQuery),
      ),
    );
  }, [activeDate, activeSite, appointments, searchQuery]);

  const availableSlots = useMemo(() => {
    if (searchQuery.trim()) {
      return [];
    }

    return getAvailableSlots(appointments, activeDate, activeSite);
  }, [activeDate, activeSite, appointments, searchQuery]);

  const dayRows = useMemo<AppointmentRow[]>(() => {
    return [
      ...dayAppointments.map((appointment) => ({ kind: "appointment" as const, appointment })),
      ...availableSlots.map((slot) => ({ kind: "slot" as const, slot })),
    ].sort((a, b) => {
      const firstTime = a.kind === "appointment" ? a.appointment.time : a.slot.time;
      const secondTime = b.kind === "appointment" ? b.appointment.time : b.slot.time;
      const timeSort = firstTime.localeCompare(secondTime);

      if (timeSort !== 0) {
        return timeSort;
      }

      const firstSite = a.kind === "appointment" ? a.appointment.site : a.slot.site;
      const secondSite = b.kind === "appointment" ? b.appointment.site : b.slot.site;

      return firstSite.localeCompare(secondSite);
    });
  }, [availableSlots, dayAppointments]);

  const weekDates = useMemo(() => getWeekDates(activeDate), [activeDate]);
  const visibleAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) =>
        (activeSite === "Todas" || appointment.site === activeSite) &&
        appointmentMatchesSearch(appointment, searchQuery),
    );
  }, [activeSite, appointments, searchQuery]);
  const patients = useMemo(() => getPatientsFromAppointments(appointments), [appointments]);
  const filteredPatients = useMemo(() => {
    const query = searchQuery.trim();
    if (!query) {
      return patients;
    }

    return patients.filter((patient) =>
      appointmentMatchesSearch(
        {
          id: patient.name,
          date: patient.latestAppointment?.date ?? activeDate,
          time: patient.latestAppointment?.time ?? "00:00",
          patient: patient.name,
          phone: patient.phone,
          reason: patient.recentReason,
          site: patient.site,
          status: "Pendiente",
        },
        query,
      ),
    );
  }, [activeDate, patients, searchQuery]);

  const nextAppointment = useMemo(
    () => getNextAppointment(appointments, activeDate),
    [activeDate, appointments],
  );
  const pendingCount = useMemo(
    () =>
      appointments.filter(
        (appointment) => appointment.date === activeDate && appointment.status === "Pendiente",
      ).length,
    [activeDate, appointments],
  );

  function showNotice(message: string) {
    setNotice(message);
  }

  function getSiteCount(site: SiteFilter) {
    return appointments.filter(
      (appointment) =>
        appointment.date === activeDate && (site === "Todas" || appointment.site === site),
    ).length;
  }

  function resetToToday() {
    const currentToday = toDateKey();
    setTodayKey(currentToday);
    setActiveDate(currentToday);
    setActiveView("Dia");
    setSearchQuery("");
    setActiveSection("Agenda");
    setViewedPatientName(null);
    showNotice("Agenda del día restablecida a hoy.");
  }

  function openNewAppointment(prefill?: Partial<AppointmentFormState>) {
    if (surgicalBlock) {
      showNotice("El bloqueo quirúrgico global está activo. Desactívalo para crear citas.");
      return;
    }

    setFormState({
      ...createEmptyForm(activeDate, getDefaultSite(activeSite, activeDate)),
      ...prefill,
    });
    setEditingAppointmentId(null);
    setFormErrors({});
    setIsCreating(true);
    setSelectedAppointmentId(null);
    setActiveSection("Agenda");
  }

  function openReprogramAppointment(appointment: Appointment) {
    setFormState({
      patient: appointment.patient,
      phone: appointment.phone,
      reason: appointment.reason,
      site: appointment.site,
      date: appointment.date,
      time: appointment.time,
    });
    setEditingAppointmentId(appointment.id);
    setFormErrors({});
    setIsCreating(true);
    setSelectedAppointmentId(appointment.id);
    setActiveSection("Agenda");
  }

  function validateForm() {
    const errors: FormErrors = {};

    if (!formState.patient.trim()) {
      errors.patient = "Agrega el nombre del paciente.";
    }
    if (!formState.phone.trim()) {
      errors.phone = "Agrega un teléfono de contacto.";
    }
    if (!formState.reason.trim()) {
      errors.reason = "Agrega el motivo de la cita.";
    }
    if (!formState.date) {
      errors.date = "Selecciona una fecha.";
    }
    if (!formState.time) {
      errors.time = "Selecciona una hora.";
    }
    if (!formState.site) {
      errors.site = "Selecciona una sede.";
    }

    if (!Object.keys(errors).length) {
      if (surgicalBlock && !editingAppointmentId) {
        errors.form = "El bloqueo quirúrgico global impide crear nuevas citas.";
      } else if (!isSiteWorkingOnDate(formState.site, formState.date)) {
        errors.form = `${displaySite(formState.site)} no tiene horario configurado para ese día.`;
      } else if (!isTimeWithinSchedule(formState.site, formState.date, formState.time)) {
        const schedule = siteSchedule[formState.site];
        errors.form = `La hora debe estar entre ${schedule.start} y ${schedule.end} para ${displaySite(
          formState.site,
        )}.`;
      } else if (
        isSlotOccupied(
          appointments,
          formState.date,
          formState.time,
          formState.site,
          editingAppointmentId ?? undefined,
        )
      ) {
        errors.form = "Ya existe una cita ocupando esa fecha, hora y sede.";
      }
    }

    return errors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length) {
      return;
    }

    if (editingAppointmentId) {
      setAppointments((current) =>
        current.map((appointment) =>
          appointment.id === editingAppointmentId
            ? {
                ...appointment,
                ...formState,
                patient: formState.patient.trim(),
                phone: formState.phone.trim(),
                reason: formState.reason.trim(),
              }
            : appointment,
        ),
      );
      setSelectedAppointmentId(editingAppointmentId);
      showNotice("Cita reprogramada en la agenda local.");
    } else {
      const newAppointment: Appointment = {
        id: `local-${Date.now()}`,
        ...formState,
        patient: formState.patient.trim(),
        phone: formState.phone.trim(),
        reason: formState.reason.trim(),
        status: "Pendiente",
      };

      setAppointments((current) => sortAppointments([...current, newAppointment]));
      setSelectedAppointmentId(newAppointment.id);
      showNotice("Cita creada en demo local.");
    }

    setActiveDate(formState.date);
    setActiveSite(formState.site);
    setActiveView("Dia");
    setFormState(createEmptyForm(formState.date, formState.site));
    setFormErrors({});
    setEditingAppointmentId(null);
    setIsCreating(false);
  }

  function updateAppointmentStatus(appointmentId: string, status: AppointmentStatus) {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === appointmentId ? { ...appointment, status } : appointment,
      ),
    );
    showNotice(`Estado actualizado a ${status}.`);
  }

  async function copyAppointmentMessage(appointment: Appointment) {
    const message = buildAppointmentMessage(appointment);

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText(message);
      showNotice("Mensaje copiado al portapapeles.");
    } catch {
      showNotice(`No se pudo copiar automaticamente. Mensaje: ${message}`);
    }
  }

  function viewPatient(appointment: Appointment) {
    setViewedPatientName(appointment.patient);
    setActiveSection("Pacientes");
    setIsCreating(false);
    showNotice("Detalle local del paciente abierto.");
  }

  function resetDemoLocal() {
    const currentToday = toDateKey();
    const nextAppointments = createInitialAppointments(currentToday);

    setAppointments(nextAppointments);
    setActiveDate(currentToday);
    setTodayKey(currentToday);
    setActiveSite("Todas");
    setActiveView("Dia");
    setSearchQuery("");
    setSelectedAppointmentId(null);
    setViewedPatientName(null);
    setSurgicalBlock(false);
    setIsCreating(false);

    try {
      window.localStorage.removeItem(AGENDA_STORAGE_KEY);
    } catch {
      // La demo local puede seguir en memoria aunque el navegador bloquee localStorage.
    }

    showNotice("Demo local restablecida.");
  }

  function updateForm<K extends keyof AppointmentFormState>(
    key: K,
    value: AppointmentFormState[K],
  ) {
    setFormState((current) => ({ ...current, [key]: value }));
    setFormErrors((current) => ({ ...current, [key]: undefined, form: undefined }));
  }

  const renderAppointmentForm = () => (
    <form className="relative flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-sky-200/75">
            {editingAppointmentId ? "Reprogramar cita" : "Nueva cita"}
          </p>
          <h2 className="text-xl font-semibold text-white">Datos básicos</h2>
        </div>
        <button
          type="button"
          onClick={() => {
            setIsCreating(false);
            setEditingAppointmentId(null);
            setFormErrors({});
          }}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-300 transition-all duration-200 hover:border-sky-300/30 hover:text-white focus:outline-none focus:ring-4 focus:ring-sky-400/12"
          aria-label="Cerrar formulario"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {formErrors.form ? (
        <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
          {formErrors.form}
        </div>
      ) : null}

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-slate-300">Paciente</span>
        <input
          type="text"
          value={formState.patient}
          onChange={(event) => updateForm("patient", event.target.value)}
          className={inputClass}
          aria-invalid={Boolean(formErrors.patient)}
        />
        {formErrors.patient ? <span className="text-xs text-amber-100">{formErrors.patient}</span> : null}
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-slate-300">Teléfono</span>
        <input
          type="tel"
          value={formState.phone}
          onChange={(event) => updateForm("phone", event.target.value)}
          className={inputClass}
          aria-invalid={Boolean(formErrors.phone)}
        />
        {formErrors.phone ? <span className="text-xs text-amber-100">{formErrors.phone}</span> : null}
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-slate-300">Motivo</span>
        <input
          type="text"
          value={formState.reason}
          onChange={(event) => updateForm("reason", event.target.value)}
          className={inputClass}
          aria-invalid={Boolean(formErrors.reason)}
        />
        {formErrors.reason ? <span className="text-xs text-amber-100">{formErrors.reason}</span> : null}
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-slate-300">Sede</span>
        <select
          value={formState.site}
          onChange={(event) => updateForm("site", event.target.value as ClinicSite)}
          className={`${inputClass} [color-scheme:dark]`}
          aria-invalid={Boolean(formErrors.site)}
        >
          {clinicSites.map((site) => (
            <option key={site} value={site} className="bg-slate-950">
              {displaySite(site)}
            </option>
          ))}
        </select>
        {formErrors.site ? <span className="text-xs text-amber-100">{formErrors.site}</span> : null}
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-slate-300">Fecha</span>
          <input
            type="date"
            value={formState.date}
            onChange={(event) => updateForm("date", event.target.value)}
            className={`${inputClass} px-3 [color-scheme:dark]`}
            aria-invalid={Boolean(formErrors.date)}
          />
          {formErrors.date ? <span className="text-xs text-amber-100">{formErrors.date}</span> : null}
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-slate-300">Hora</span>
          <input
            type="time"
            value={formState.time}
            onChange={(event) => updateForm("time", event.target.value)}
            className={`${inputClass} px-3 [color-scheme:dark]`}
            aria-invalid={Boolean(formErrors.time)}
          />
          {formErrors.time ? <span className="text-xs text-amber-100">{formErrors.time}</span> : null}
        </label>
      </div>

      <button
        type="submit"
        className="mt-1 h-12 rounded-2xl border border-sky-200/25 bg-gradient-to-r from-sky-500 to-cyan-400 text-sm font-semibold text-white shadow-[0_0_28px_rgba(56,189,248,0.26),0_18px_46px_rgba(8,47,73,0.32)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(56,189,248,0.34),0_20px_50px_rgba(8,47,73,0.36)] focus:outline-none focus:ring-4 focus:ring-sky-300/25"
      >
        Confirmar cita
      </button>
    </form>
  );

  const renderAppointmentCard = (appointment: Appointment) => {
    const isSelected = selectedAppointmentId === appointment.id;

    return (
      <article
        key={appointment.id}
        className={[
          "group relative grid gap-3 overflow-visible rounded-[22px] border bg-white/[0.055] p-4 text-left shadow-[0_18px_50px_rgba(0,0,0,0.20)] backdrop-blur-xl transition-all duration-200 focus-within:ring-4 focus-within:ring-sky-400/10 md:grid-cols-[92px_minmax(0,1fr)_auto]",
          "before:absolute before:inset-y-3 before:left-0 before:w-1 before:rounded-r-full before:bg-gradient-to-b",
          statusRailStyles[appointment.status],
          isSelected
            ? "border-sky-300/40 bg-sky-300/[0.075] ring-4 ring-sky-400/10"
            : "border-white/10 hover:-translate-y-0.5 hover:border-sky-300/24 hover:bg-white/[0.075]",
        ].join(" ")}
      >
        <button
          type="button"
          onClick={() => {
            setSelectedAppointmentId(appointment.id);
            setViewedPatientName(null);
            setIsCreating(false);
          }}
          className="contents text-left focus:outline-none"
          aria-label={`Seleccionar cita de ${appointment.patient}`}
        >
          <div className="flex items-center gap-3 md:block">
            <p className="text-xl font-semibold text-sky-100 md:text-2xl">{appointment.time}</p>
            <p className="text-xs font-medium uppercase text-slate-500 md:mt-1">
              {displaySite(appointment.site)}
            </p>
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold text-white md:text-lg">
              {appointment.patient}
            </h2>
            <p className="mt-1 text-sm text-slate-400">{appointment.reason}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-medium text-slate-300">
                {appointment.phone || "Sin teléfono"}
              </span>
              <span
                className={[
                  "rounded-full border px-3 py-1 text-xs font-semibold",
                  statusStyles[appointment.status],
                ].join(" ")}
              >
                {appointment.status}
              </span>
            </div>
          </div>
        </button>

        <div className="flex items-start justify-end">
          {isSelected ? (
            <AppointmentActions
              appointment={appointment}
              onStatusChange={(status) => updateAppointmentStatus(appointment.id, status)}
              onReprogram={() => openReprogramAppointment(appointment)}
              onCopy={() => void copyAppointmentMessage(appointment)}
              onViewPatient={() => viewPatient(appointment)}
            />
          ) : null}
        </div>
      </article>
    );
  };

  const renderSlotCard = (slot: AvailableSlot) => (
    <article
      key={slot.id}
      className="group relative grid gap-3 overflow-hidden rounded-[22px] border border-dashed border-cyan-300/25 bg-white/[0.045] p-4 text-left shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-all duration-200 before:absolute before:inset-y-3 before:left-0 before:w-1 before:rounded-r-full before:bg-gradient-to-b before:from-cyan-300/70 before:to-cyan-300/10 hover:-translate-y-0.5 hover:border-cyan-300/45 hover:bg-cyan-300/[0.075] focus-within:ring-4 focus-within:ring-sky-400/10 md:grid-cols-[92px_minmax(0,1fr)_auto]"
    >
      <button
        type="button"
        onClick={() =>
          openNewAppointment({
            date: slot.date,
            time: slot.time,
            site: slot.site,
          })
        }
        className="contents text-left focus:outline-none"
        aria-label={`Agendar espacio disponible ${slot.time} ${displaySite(slot.site)}`}
      >
        <div className="flex items-center gap-3 md:block">
          <p className="text-xl font-semibold text-cyan-100 md:text-2xl">{slot.time}</p>
          <p className="text-xs font-medium uppercase text-slate-500 md:mt-1">Libre</p>
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold text-white md:text-lg">
            Espacio disponible
          </h2>
          <p className="mt-1 text-sm text-slate-400">+ Agendar aquí</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-medium text-slate-300">
              {displaySite(slot.site)}
            </span>
            <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
              Disponible
            </span>
          </div>
        </div>
      </button>
    </article>
  );

  const renderDayView = () => (
    <div className="relative grid gap-3">
      {dayRows.map((row) =>
        row.kind === "appointment"
          ? renderAppointmentCard(row.appointment)
          : renderSlotCard(row.slot),
      )}
      {!dayRows.length ? (
        <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-8 text-center shadow-inner shadow-white/[0.02]">
          <p className="text-lg font-semibold text-white">Sin resultados para esta vista</p>
          <p className="mt-2 text-sm text-slate-400">
            Ajusta la busqueda, cambia la sede o crea una nueva cita local.
          </p>
        </div>
      ) : null}
    </div>
  );

  const renderWeekView = () => (
    <div className="relative grid gap-3">
      {weekDates.map((dateKey) => {
        const appointmentsForDay = visibleAppointments.filter(
          (appointment) => appointment.date === dateKey,
        );
        const slotsForDay = searchQuery.trim()
          ? []
          : getAvailableSlots(appointments, dateKey, activeSite);

        return (
          <article
            key={dateKey}
            className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={() => {
                setActiveDate(dateKey);
                setActiveView("Dia");
              }}
              className="flex w-full items-center justify-between gap-3 rounded-2xl text-left focus:outline-none focus:ring-4 focus:ring-sky-400/12"
            >
              <div>
                <p className="text-sm font-semibold text-sky-100">
                  {getDayName(dateKey)} · {formatShortDate(dateKey)}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  {appointmentsForDay.length} citas · {slotsForDay.length} espacios
                </p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-medium text-slate-300">
                Ver día
              </span>
            </button>
            <div className="mt-3 grid gap-2">
              {appointmentsForDay.slice(0, 3).map((appointment) => (
                <button
                  key={appointment.id}
                  type="button"
                  onClick={() => {
                    setActiveDate(appointment.date);
                    setActiveView("Dia");
                    setSelectedAppointmentId(appointment.id);
                  }}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-sm transition-all hover:bg-white/[0.07] focus:outline-none focus:ring-4 focus:ring-sky-400/12"
                >
                  <span className="min-w-0 truncate text-slate-200">
                    {appointment.time} · {appointment.patient}
                  </span>
                  <span className="shrink-0 text-xs text-slate-500">{displaySite(appointment.site)}</span>
                </button>
              ))}
              {!appointmentsForDay.length ? (
                <p className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-slate-500">
                  Sin citas registradas.
                </p>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );

  const renderSiteView = () => (
    <div className="relative grid gap-3">
      {getSitesForFilter(activeSite).map((site) => {
        const siteAppointments = sortAppointments(
          visibleAppointments.filter(
            (appointment) => appointment.site === site && appointment.date === activeDate,
          ),
        );
        const siteSlots = searchQuery.trim()
          ? []
          : getAvailableSlots(appointments, activeDate, site);

        return (
          <article
            key={site}
            className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-white">{displaySite(site)}</h2>
                <p className="mt-1 text-sm text-slate-400">
                  {siteAppointments.length} citas · {siteSlots.length} espacios disponibles
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveSite(site);
                  setActiveView("Dia");
                }}
                className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:border-sky-300/25 hover:text-white focus:outline-none focus:ring-4 focus:ring-sky-400/12"
              >
                Ver sede
              </button>
            </div>
            <div className="mt-4 grid gap-2">
              {siteAppointments.map((appointment) => (
                <button
                  key={appointment.id}
                  type="button"
                  onClick={() => {
                    setSelectedAppointmentId(appointment.id);
                    setActiveView("Dia");
                  }}
                  className="grid gap-1 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-sm transition-all hover:bg-white/[0.07] focus:outline-none focus:ring-4 focus:ring-sky-400/12 sm:grid-cols-[74px_minmax(0,1fr)_auto]"
                >
                  <span className="font-semibold text-sky-100">{appointment.time}</span>
                  <span className="min-w-0 truncate text-slate-200">{appointment.patient}</span>
                  <span className="text-xs text-slate-500">{appointment.status}</span>
                </button>
              ))}
              {!siteAppointments.length ? (
                <p className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-slate-500">
                  Sin citas para esta fecha.
                </p>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );

  const renderAgendaContent = () => {
    if (activeView === "Semana") {
      return renderWeekView();
    }

    if (activeView === "Por sede") {
      return renderSiteView();
    }

    return renderDayView();
  };

  const renderPatientsView = () => {
    const selectedPatient = filteredPatients.find((patient) => patient.name === viewedPatientName);

    return (
      <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid gap-3">
          {filteredPatients.map((patient) => (
            <button
              key={`${patient.name}-${patient.phone}`}
              type="button"
              onClick={() => setViewedPatientName(patient.name)}
              className={[
                "rounded-[22px] border bg-white/[0.05] p-4 text-left shadow-[0_16px_46px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-0.5 hover:border-sky-300/24 hover:bg-white/[0.075] focus:outline-none focus:ring-4 focus:ring-sky-400/12",
                viewedPatientName === patient.name ? "border-sky-300/35" : "border-white/10",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="truncate text-base font-semibold text-white">{patient.name}</h2>
                <p className="mt-1 text-sm text-slate-400">{patient.phone || "Sin teléfono"}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-slate-300">
                  {displaySite(patient.site)}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-300">{patient.recentReason}</p>
              <p className="mt-1 text-xs text-slate-500">
                {patient.nextAppointment
                  ? `Próxima: ${formatShortDate(patient.nextAppointment.date)} ${patient.nextAppointment.time}`
                  : patient.latestAppointment
                    ? `Última: ${formatShortDate(patient.latestAppointment.date)} ${patient.latestAppointment.time}`
                    : "Sin citas"}
              </p>
            </button>
          ))}
          {!filteredPatients.length ? (
            <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-8 text-center">
              <p className="text-lg font-semibold text-white">Sin pacientes en la demo local</p>
              <p className="mt-2 text-sm text-slate-400">Los pacientes se derivan de las citas locales.</p>
            </div>
          ) : null}
        </div>

        <aside className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4">
          <p className="text-sm font-medium text-sky-200/75">Detalle local</p>
          {selectedPatient ? (
            <div className="mt-3">
              <h2 className="text-xl font-semibold text-white">{selectedPatient.name}</h2>
              <p className="mt-2 text-sm text-slate-400">{selectedPatient.phone || "Sin teléfono"}</p>
              <p className="mt-4 text-sm font-medium text-slate-300">Motivo reciente</p>
              <p className="mt-1 text-sm text-slate-400">{selectedPatient.recentReason}</p>
              <p className="mt-4 text-sm font-medium text-slate-300">Sede</p>
              <p className="mt-1 text-sm text-slate-400">{displaySite(selectedPatient.site)}</p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-slate-400">Selecciona un paciente para ver su detalle.</p>
          )}
        </aside>
      </div>
    );
  };

  const renderAvailabilityView = () => (
    <div className="relative grid gap-3 lg:grid-cols-2">
      {clinicSites.map((site) => {
        const schedule = siteSchedule[site];
        const slots = getAvailableSlots(appointments, activeDate, site);

        return (
          <article
            key={site}
            className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-white">{displaySite(site)}</h2>
                <p className="mt-1 text-sm text-slate-400">Configuración local de demostración</p>
              </div>
              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                {slots.length} libres hoy
              </span>
            </div>
            <div className="mt-4 grid gap-2 text-sm">
              <p className="text-slate-300">
                Días:{" "}
                <span className="text-slate-400">{schedule.workingDays.map((day) => dayLabels[day]).join(", ")}</span>
              </p>
              <p className="text-slate-300">
                Horario: <span className="text-slate-400">{schedule.start} a {schedule.end}</span>
              </p>
              {schedule.note ? <p className="text-xs text-amber-100/80">{schedule.note}</p> : null}
              <div className="mt-2 flex flex-wrap gap-2">
                {slots.slice(0, 6).map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => openNewAppointment({ site, date: activeDate, time: slot.time })}
                    className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100 transition-all hover:border-cyan-300/35 focus:outline-none focus:ring-4 focus:ring-sky-400/12"
                  >
                    {slot.time}
                  </button>
                ))}
                {!slots.length ? <span className="text-xs text-slate-500">Sin espacios disponibles.</span> : null}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );

  const renderSettingsView = () => (
    <div className="relative grid gap-4 lg:grid-cols-2">
      <article className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
        <p className="text-sm font-medium text-sky-200/75">Demo local</p>
        <h2 className="mt-1 text-xl font-semibold text-white">Sin backend ni datos reales</h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Esta agenda guarda datos de demostración en el navegador con la key{" "}
          <span className="text-slate-200">{AGENDA_STORAGE_KEY}</span>. No debe usarse con informacion real de pacientes.
        </p>
        <button
          type="button"
          onClick={resetDemoLocal}
          className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-slate-200 transition-all hover:border-sky-300/25 hover:text-white focus:outline-none focus:ring-4 focus:ring-sky-400/12"
        >
          <RefreshCcw className="h-4 w-4" aria-hidden="true" />
          Resetear demo local
        </button>
      </article>

      <article className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
        <p className="text-sm font-medium text-sky-200/75">Bloqueo quirúrgico global</p>
        <h2 className="mt-1 text-xl font-semibold text-white">
          {surgicalBlock ? "Creacion bloqueada" : "Creacion disponible"}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Placeholder funcional local para impedir nuevas citas durante un bloqueo global. Se puede desactivar aquí.
        </p>
        <button
          type="button"
          onClick={() => {
            setSurgicalBlock((current) => !current);
            showNotice(!surgicalBlock ? "Bloqueo quirúrgico activado." : "Bloqueo quirúrgico desactivado.");
          }}
          className={[
            "mt-4 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-4 focus:ring-sky-400/12",
            surgicalBlock
              ? "border-rose-300/25 bg-rose-300/10 text-rose-100 hover:border-rose-300/35"
              : "border-emerald-300/20 bg-emerald-300/10 text-emerald-100 hover:border-emerald-300/35",
          ].join(" ")}
        >
          {surgicalBlock ? "Desactivar bloqueo" : "Activar bloqueo"}
        </button>
      </article>
    </div>
  );

  const renderMoreView = () => (
    <div className="grid gap-3">
      {[
        { label: "Disponibilidad", section: "Disponibilidad" as const, icon: SlidersHorizontal },
        { label: "Configuración", section: "Configuracion" as const, icon: Settings },
      ].map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.label}
            type="button"
            onClick={() => setActiveSection(item.section)}
            className="flex items-center justify-between rounded-[22px] border border-white/10 bg-white/[0.05] p-4 text-left text-slate-200 transition-all hover:border-sky-300/24 hover:bg-white/[0.075] focus:outline-none focus:ring-4 focus:ring-sky-400/12"
          >
            <span className="flex items-center gap-3">
              <Icon className="h-4 w-4 text-sky-200" aria-hidden="true" />
              {item.label}
            </span>
            <ChevronDown className="-rotate-90 h-4 w-4 text-slate-500" aria-hidden="true" />
          </button>
        );
      })}
      <button
        type="button"
        onClick={resetDemoLocal}
        className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-white/[0.05] p-4 text-left text-slate-200 transition-all hover:border-sky-300/24 hover:bg-white/[0.075] focus:outline-none focus:ring-4 focus:ring-sky-400/12"
      >
        <RefreshCcw className="h-4 w-4 text-sky-200" aria-hidden="true" />
        Limpiar demo local
      </button>
    </div>
  );

  const renderMainContent = () => {
    if (activeSection === "Pacientes") {
      return renderPatientsView();
    }
    if (activeSection === "Disponibilidad") {
      return renderAvailabilityView();
    }
    if (activeSection === "Configuracion") {
      return renderSettingsView();
    }
    if (activeSection === "Mas") {
      return renderMoreView();
    }

    return renderAgendaContent();
  };

  const renderSidePanel = () => {
    if (isCreating) {
      return renderAppointmentForm();
    }

    if (selectedAppointment) {
      return (
        <div className="relative flex flex-col gap-4">
          <div>
            <p className="text-sm font-medium text-sky-200/75">Cita seleccionada</p>
            <h2 className="mt-1 text-xl font-semibold text-white">
              {selectedAppointment.time} · {selectedAppointment.patient}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              {selectedAppointment.reason} · {displaySite(selectedAppointment.site)}
            </p>
            <p className="mt-1 text-sm text-slate-500">{selectedAppointment.phone || "Sin teléfono"}</p>
          </div>
          <span
            className={[
              "w-fit rounded-full border px-3 py-1 text-xs font-semibold",
              statusStyles[selectedAppointment.status],
            ].join(" ")}
          >
            {selectedAppointment.status}
          </span>
          <div className="grid gap-2">
            <button
              type="button"
              disabled={selectedAppointment.status === "Confirmada" || selectedAppointment.status === "Cancelada" || selectedAppointment.status === "Finalizada"}
              onClick={() => updateAppointmentStatus(selectedAppointment.id, "Confirmada")}
              className="rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-left text-sm font-semibold text-slate-200 transition-all hover:bg-white/[0.08] focus:outline-none focus:ring-4 focus:ring-sky-400/12 disabled:cursor-not-allowed disabled:text-slate-600 disabled:hover:bg-white/[0.055]"
            >
              Confirmar
            </button>
            <button
              type="button"
              disabled={selectedAppointment.status === "Cancelada" || selectedAppointment.status === "Finalizada"}
              onClick={() => updateAppointmentStatus(selectedAppointment.id, "En consulta")}
              className="rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-left text-sm font-semibold text-slate-200 transition-all hover:bg-white/[0.08] focus:outline-none focus:ring-4 focus:ring-sky-400/12 disabled:cursor-not-allowed disabled:text-slate-600 disabled:hover:bg-white/[0.055]"
            >
              Marcar en consulta
            </button>
            <button
              type="button"
              disabled={selectedAppointment.status === "Cancelada" || selectedAppointment.status === "Finalizada"}
              onClick={() => updateAppointmentStatus(selectedAppointment.id, "Finalizada")}
              className="rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-left text-sm font-semibold text-slate-200 transition-all hover:bg-white/[0.08] focus:outline-none focus:ring-4 focus:ring-sky-400/12 disabled:cursor-not-allowed disabled:text-slate-600 disabled:hover:bg-white/[0.055]"
            >
              Marcar finalizada
            </button>
            <button
              type="button"
              disabled={selectedAppointment.status === "Cancelada" || selectedAppointment.status === "Finalizada"}
              onClick={() => updateAppointmentStatus(selectedAppointment.id, "Cancelada")}
              className="rounded-2xl border border-rose-300/20 bg-rose-300/10 px-4 py-3 text-left text-sm font-semibold text-rose-100 transition-all hover:border-rose-300/35 focus:outline-none focus:ring-4 focus:ring-rose-400/12 disabled:cursor-not-allowed disabled:text-slate-600 disabled:hover:border-rose-300/20"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => openReprogramAppointment(selectedAppointment)}
              className="rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-left text-sm font-semibold text-slate-200 transition-all hover:bg-white/[0.08] focus:outline-none focus:ring-4 focus:ring-sky-400/12"
            >
              Reprogramar
            </button>
            <button
              type="button"
              onClick={() => void copyAppointmentMessage(selectedAppointment)}
              className="rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-left text-sm font-semibold text-slate-200 transition-all hover:bg-white/[0.08] focus:outline-none focus:ring-4 focus:ring-sky-400/12"
            >
              Copiar mensaje
            </button>
            <button
              type="button"
              onClick={() => viewPatient(selectedAppointment)}
              className="rounded-2xl border border-sky-300/20 bg-sky-300/10 px-4 py-3 text-left text-sm font-semibold text-sky-100 transition-all hover:border-sky-300/35 focus:outline-none focus:ring-4 focus:ring-sky-400/12"
            >
              Ver paciente
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="relative flex flex-col gap-4">
        <div>
          <p className="text-sm font-medium text-sky-200/75">Próxima cita</p>
          <h2 className="mt-1 text-xl font-semibold text-white">
            {nextAppointment ? `${nextAppointment.time} · ${nextAppointment.patient}` : "Sin cita próxima"}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {nextAppointment
              ? `${nextAppointment.reason} · ${displaySite(nextAppointment.site)}`
              : "La agenda local no tiene citas futuras visibles."}
          </p>
        </div>

        <div className="grid gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-inner shadow-white/[0.02]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-slate-400">Pendientes por confirmar</p>
              <Clock3 className="h-4 w-4 text-amber-200/75" aria-hidden="true" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-white">{pendingCount}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-inner shadow-white/[0.02]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-slate-400">Espacios disponibles</p>
              <CalendarDays className="h-4 w-4 text-cyan-200/75" aria-hidden="true" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-white">{availableSlots.length}</p>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm font-semibold text-emerald-100 shadow-[0_0_24px_rgba(52,211,153,0.08)]">
            Disponibilidad actualizada
            <Check className="h-4 w-4" aria-hidden="true" />
          </div>
        </div>
      </div>
    );
  };

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
                <p className="truncate text-sm font-semibold text-white">Alexis García</p>
                <p className="text-xs text-slate-400">Ortopedia</p>
              </div>
            </div>

            <nav className="flex flex-col gap-1.5" aria-label="Navegación interna">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.label === activeSection;

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setActiveSection(item.label);
                      setIsCreating(false);
                    }}
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
                    {sectionLabel(item.label)}
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
                <p className="text-base font-semibold text-white">Alexis García Ortopedia</p>
              </div>

              <label className="relative min-w-[260px] flex-1">
                <span className="sr-only">Buscar paciente, cita o teléfono</span>
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-200/65"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Buscar paciente, cita o teléfono..."
                  className="h-11 w-full rounded-2xl border border-white/10 bg-white/[0.06] pl-11 pr-4 text-sm text-slate-100 outline-none shadow-inner shadow-black/10 transition-all duration-200 placeholder:text-slate-500 focus:border-sky-300/45 focus:ring-4 focus:ring-sky-400/10"
                />
              </label>

              <button
                type="button"
                onClick={resetToToday}
                className="h-11 rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-slate-200 shadow-sm transition-all duration-200 hover:border-sky-300/25 hover:bg-white/[0.09] focus:outline-none focus:ring-4 focus:ring-sky-400/10"
              >
                Hoy
              </button>

              <div className="flex rounded-2xl border border-white/10 bg-white/[0.05] p-1 shadow-inner shadow-black/10">
                {appointmentViews.map((view) => (
                  <button
                    key={view}
                    type="button"
                    onClick={() => {
                      setActiveView(view);
                      setActiveSection("Agenda");
                    }}
                    className={[
                      "rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-sky-400/10",
                      activeView === view && activeSection === "Agenda"
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
                onClick={() => openNewAppointment()}
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
                  <p className="truncate text-base font-semibold text-white">Alexis García Ortopedia</p>
                  <p className="text-sm text-slate-400">{sectionLabel(activeSection)}</p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={resetToToday}
                    className="hidden h-10 rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-slate-200 shadow-sm transition-all duration-200 hover:bg-white/[0.09] focus:outline-none focus:ring-4 focus:ring-sky-400/10 sm:block"
                  >
                    Hoy
                  </button>
                  <button
                    type="button"
                    onClick={() => openNewAppointment()}
                    className="hidden h-10 rounded-2xl border border-sky-200/25 bg-gradient-to-r from-sky-500 to-cyan-400 px-4 text-sm font-semibold text-white shadow-[0_0_26px_rgba(56,189,248,0.24)] transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-sky-300/25 sm:block"
                  >
                    + Nueva cita
                  </button>
                </div>
              </div>

              <div className="hidden grid-cols-[minmax(0,1fr)_auto] gap-3 sm:grid">
                <label className="relative min-w-0">
                  <span className="sr-only">Buscar paciente, cita o teléfono</span>
                  <Search
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-200/65"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Buscar paciente, cita o teléfono..."
                    className="h-11 w-full rounded-2xl border border-white/10 bg-white/[0.06] pl-11 pr-4 text-sm text-slate-100 outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-sky-300/45 focus:ring-4 focus:ring-sky-400/10"
                  />
                </label>

                <div className="flex rounded-2xl border border-white/10 bg-white/[0.05] p-1">
                  {appointmentViews.map((view) => (
                    <button
                      key={view}
                      type="button"
                      onClick={() => {
                        setActiveView(view);
                        setActiveSection("Agenda");
                      }}
                      className={[
                        "rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-sky-400/10",
                        activeView === view && activeSection === "Agenda"
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
                {siteFilters.map((site) => {
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
                          isActive ? "bg-sky-200/18 text-sky-50" : "bg-white/[0.07] text-slate-500",
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
                    <p className="text-sm font-medium text-sky-200/75">
                      {activeDate === todayKey ? "Hoy" : formatShortDate(activeDate)}
                    </p>
                    <h1 className="text-2xl font-semibold text-white md:text-3xl">
                      {activeSection === "Agenda" ? "Agenda médica interna" : sectionLabel(activeSection)}
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">{formatLongDate(activeDate)}</p>
                  </div>
                  <div className="flex flex-col gap-2 sm:items-end">
                    <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-sm font-medium text-emerald-100 shadow-[0_0_24px_rgba(52,211,153,0.08)]">
                      <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]" />
                      Disponibilidad actualizada
                    </div>
                    {notice ? <p className="max-w-sm text-sm text-sky-100/80">{notice}</p> : null}
                  </div>
                </div>

                {renderMainContent()}
              </div>
            </section>

            <aside className="hidden xl:block">
              <div className="sticky top-5 overflow-hidden rounded-[30px] border border-white/10 bg-slate-950/48 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.38)] backdrop-blur-2xl">
                <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-sky-400/12 blur-3xl" />
                {renderSidePanel()}
              </div>
            </aside>

            {isCreating ? (
              <section className="order-first rounded-[26px] border border-white/10 bg-slate-950/50 p-4 shadow-[0_22px_70px_rgba(0,0,0,0.34)] backdrop-blur-2xl xl:hidden">
                {renderAppointmentForm()}
              </section>
            ) : null}

            {!isCreating ? (
              <section className="hidden rounded-[26px] border border-white/10 bg-slate-950/46 p-4 shadow-[0_22px_70px_rgba(0,0,0,0.30)] backdrop-blur-2xl md:block xl:hidden">
                <div className="grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(180px,0.8fr)_minmax(180px,0.8fr)]">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                    <p className="text-sm font-medium text-sky-200/75">Próxima cita</p>
                    <h2 className="mt-1 truncate text-lg font-semibold text-white">
                      {nextAppointment ? `${nextAppointment.time} · ${nextAppointment.patient}` : "Sin cita próxima"}
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                      {nextAppointment
                        ? `${nextAppointment.reason} · ${displaySite(nextAppointment.site)}`
                        : "Agenda local sin citas futuras."}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                    <p className="text-sm font-medium text-slate-400">Pendientes por confirmar</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{pendingCount}</p>
                  </div>

                  <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-emerald-100">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">Disponibilidad actualizada</p>
                      <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </div>
                    <p className="mt-2 text-sm font-medium text-emerald-100/80">
                      {availableSlots.length} espacios disponibles
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
          onClick={() => openNewAppointment()}
          className="fixed bottom-24 right-4 z-30 rounded-full border border-sky-200/30 bg-gradient-to-r from-sky-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(56,189,248,0.35),0_18px_45px_rgba(8,47,73,0.45)] transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-sky-300/25 md:hidden"
        >
          + Nueva cita
        </button>
      ) : null}

      <nav className="fixed bottom-4 left-4 right-4 z-30 grid grid-cols-3 rounded-[28px] border border-white/10 bg-slate-950/72 px-3 py-2 shadow-[0_22px_70px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:hidden">
        {[
          { label: "Agenda", icon: CalendarDays, section: "Agenda" as const },
          { label: "Pacientes", icon: UsersRound, section: "Pacientes" as const },
          { label: "Más", icon: ChevronDown, section: "Mas" as const },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.section;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setActiveSection(item.section);
                setIsCreating(false);
              }}
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
