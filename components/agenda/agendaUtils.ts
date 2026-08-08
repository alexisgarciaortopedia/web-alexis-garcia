import {
  appointmentStatuses,
  clinicSites,
  dayLabels,
  siteFullNames,
  siteSchedule,
  siteShortNames,
} from "./agendaSchedule";
import type {
  Appointment,
  AppointmentStatus,
  AvailableSlot,
  ClinicSite,
  SiteFilter,
} from "./agendaTypes";

const dateKeyPattern = /^\d{4}-\d{2}-\d{2}$/;
const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;

export type StoredAgendaState = {
  appointments: Appointment[];
  surgicalBlock: boolean;
};

const allowedStatusTransitions: Record<AppointmentStatus, AppointmentStatus[]> = {
  Pendiente: ["Confirmada", "Cancelada"],
  Confirmada: ["En consulta", "Cancelada"],
  "En consulta": ["Finalizada"],
  Finalizada: [],
  Cancelada: [],
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isValidDateKey(dateKey: unknown): dateKey is string {
  if (typeof dateKey !== "string" || !dateKeyPattern.test(dateKey)) {
    return false;
  }

  const [year, month, day] = dateKey.split("-").map(Number);
  const parsed = dateFromKey(dateKey);

  return (
    parsed.getFullYear() === year &&
    parsed.getMonth() === month - 1 &&
    parsed.getDate() === day
  );
}

export function isValidTime(time: unknown): time is string {
  return typeof time === "string" && timePattern.test(time);
}

export function isClinicSite(site: unknown): site is ClinicSite {
  return typeof site === "string" && clinicSites.includes(site as ClinicSite);
}

export function isAppointmentStatus(status: unknown): status is AppointmentStatus {
  return typeof status === "string" && appointmentStatuses.includes(status as AppointmentStatus);
}

export function isValidAppointment(value: unknown): value is Appointment {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    value.id.trim().length > 0 &&
    typeof value.patient === "string" &&
    value.patient.trim().length > 0 &&
    typeof value.phone === "string" &&
    typeof value.reason === "string" &&
    value.reason.trim().length > 0 &&
    isClinicSite(value.site) &&
    isValidDateKey(value.date) &&
    isValidTime(value.time) &&
    isAppointmentStatus(value.status)
  );
}

export function getAllowedStatusTransitions(status: AppointmentStatus) {
  return allowedStatusTransitions[status];
}

export function canTransitionAppointmentStatus(
  currentStatus: AppointmentStatus,
  nextStatus: AppointmentStatus,
) {
  return allowedStatusTransitions[currentStatus].includes(nextStatus);
}

export function canReprogramAppointment(status: AppointmentStatus) {
  return status === "Pendiente" || status === "Confirmada";
}

export function toDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function dateFromKey(dateKey: string) {
  return new Date(`${dateKey}T12:00:00`);
}

export function formatLongDate(dateKey: string) {
  return new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(dateFromKey(dateKey));
}

export function formatShortDate(dateKey: string) {
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
  }).format(dateFromKey(dateKey));
}

export function displaySite(site: SiteFilter | ClinicSite) {
  return site === "Todas" ? "Todas" : siteShortNames[site];
}

export function displaySiteFull(site: ClinicSite) {
  return siteFullNames[site];
}

export function displayView(view: string) {
  return view === "Dia" ? "D\u00eda" : view;
}

export function getDayName(dateKey: string) {
  return dayLabels[dateFromKey(dateKey).getDay()];
}

export function addDays(dateKey: string, days: number) {
  const date = dateFromKey(dateKey);
  date.setDate(date.getDate() + days);
  return toDateKey(date);
}

export function getWeekDates(dateKey: string) {
  const date = dateFromKey(dateKey);
  const day = date.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;

  return Array.from({ length: 7 }, (_, index) => addDays(dateKey, mondayOffset + index));
}

function getNextWorkingDate(site: ClinicSite, fromDateKey: string) {
  for (let offset = 0; offset < 14; offset += 1) {
    const candidateDate = addDays(fromDateKey, offset);

    if (isSiteWorkingOnDate(site, candidateDate)) {
      return candidateDate;
    }
  }

  return fromDateKey;
}

function getNextWeekendDate(fromDateKey: string) {
  return getNextWorkingDate("Zarate", fromDateKey);
}

export function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function minutesToTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

export function getSitesForFilter(site: SiteFilter) {
  return site === "Todas" ? [...clinicSites] : [site];
}

export function isSiteWorkingOnDate(site: ClinicSite, dateKey: string) {
  return siteSchedule[site].workingDays.includes(dateFromKey(dateKey).getDay());
}

export function getSitesForDate(dateKey: string) {
  return clinicSites.filter((site) => isSiteWorkingOnDate(site, dateKey));
}

export function getDefaultSiteForDate(dateKey: string): ClinicSite {
  const day = dateFromKey(dateKey).getDay();
  return day === 0 || day === 6 ? "Zarate" : "Adoy";
}

export function isTimeWithinSchedule(site: ClinicSite, dateKey: string, time: string) {
  if (!isSiteWorkingOnDate(site, dateKey)) {
    return false;
  }

  const schedule = siteSchedule[site];
  const current = timeToMinutes(time);
  const start = timeToMinutes(schedule.start);
  const end = timeToMinutes(schedule.end);

  return current >= start && current < end && (current - start) % schedule.slotMinutes === 0;
}

export function getSlotsForSite(site: ClinicSite, dateKey: string): AvailableSlot[] {
  if (!isSiteWorkingOnDate(site, dateKey)) {
    return [];
  }

  const schedule = siteSchedule[site];
  const start = timeToMinutes(schedule.start);
  const end = timeToMinutes(schedule.end);
  const slots: AvailableSlot[] = [];

  for (let minutes = start; minutes < end; minutes += schedule.slotMinutes) {
    const time = minutesToTime(minutes);
    slots.push({
      id: `slot-${dateKey}-${site}-${time}`,
      date: dateKey,
      time,
      site,
    });
  }

  return slots;
}

export function sortAppointments(appointments: Appointment[]) {
  return [...appointments].sort((a, b) => {
    const dateSort = a.date.localeCompare(b.date);
    if (dateSort !== 0) {
      return dateSort;
    }

    return a.time.localeCompare(b.time);
  });
}

export function getSlotOccupant(
  appointments: Appointment[],
  dateKey: string,
  time: string,
  _site: ClinicSite,
  ignoreAppointmentId?: string,
) {
  return appointments.find(
    (appointment) =>
      appointment.id !== ignoreAppointmentId &&
      appointment.date === dateKey &&
      appointment.time === time &&
      appointment.status !== "Cancelada",
  );
}

export function isSlotOccupied(
  appointments: Appointment[],
  dateKey: string,
  time: string,
  site: ClinicSite,
  ignoreAppointmentId?: string,
) {
  return Boolean(getSlotOccupant(appointments, dateKey, time, site, ignoreAppointmentId));
}

export function isDoctorSlotOccupied(
  appointments: Appointment[],
  dateKey: string,
  time: string,
  ignoreAppointmentId?: string,
) {
  return appointments.some(
    (appointment) =>
      appointment.id !== ignoreAppointmentId &&
      appointment.date === dateKey &&
      appointment.time === time &&
      appointment.status !== "Cancelada",
  );
}

export function hasConsecutiveSiteChange(
  appointments: Appointment[],
  dateKey: string,
  time: string,
  site: ClinicSite,
  ignoreAppointmentId?: string,
) {
  // Future strict mode can convert this warning into a 30-minute transfer buffer.
  const currentMinutes = timeToMinutes(time);

  return appointments.some((appointment) => {
    if (
      appointment.id === ignoreAppointmentId ||
      appointment.date !== dateKey ||
      appointment.site === site ||
      appointment.status === "Cancelada"
    ) {
      return false;
    }

    return Math.abs(timeToMinutes(appointment.time) - currentMinutes) === 30;
  });
}

export function getAvailableSlots(
  appointments: Appointment[],
  dateKey: string,
  siteFilter: SiteFilter,
) {
  const sites =
    siteFilter === "Todas"
      ? [getDefaultSiteForDate(dateKey)]
      : getSitesForFilter(siteFilter).filter((site) => isSiteWorkingOnDate(site, dateKey));

  return sites
    .flatMap((site) => getSlotsForSite(site, dateKey))
    .filter((slot) => !isDoctorSlotOccupied(appointments, slot.date, slot.time))
    .sort((a, b) => a.time.localeCompare(b.time) || a.site.localeCompare(b.site));
}

export function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function appointmentMatchesSearch(appointment: Appointment, search: string) {
  const query = normalizeSearch(search);

  if (!query) {
    return true;
  }

  return normalizeSearch(
    `${appointment.patient} ${appointment.phone} ${appointment.reason} ${displaySite(
      appointment.site,
    )} ${displaySiteFull(appointment.site)}`,
  ).includes(query);
}

export function parseStoredAgenda(raw: string | null): StoredAgendaState | null {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as {
      appointments?: unknown;
      surgicalBlock?: boolean;
    };

    if (!Array.isArray(parsed.appointments) || !parsed.appointments.every(isValidAppointment)) {
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

export function createInitialAppointments(dateKey = toDateKey()): Appointment[] {
  const adoyDate = getNextWorkingDate("Adoy", dateKey);
  const weekendDate = getNextWeekendDate(dateKey);

  return [
    {
      id: `maria-${adoyDate}-0800`,
      date: adoyDate,
      time: "08:00",
      patient: "Mar\u00eda Fernanda L\u00f3pez",
      phone: "555 010 1100",
      reason: "Rodilla derecha",
      site: "Adoy",
      status: "Confirmada",
    },
    {
      id: `jose-${adoyDate}-0830`,
      date: adoyDate,
      time: "08:30",
      patient: "Jos\u00e9 Antonio Mart\u00ednez",
      phone: "555 010 1200",
      reason: "Hombro",
      site: "Adoy",
      status: "En consulta",
    },
    {
      id: `bloqueo-${weekendDate}-1000`,
      date: weekendDate,
      time: "10:00",
      patient: "Bloqueo de tiempo",
      phone: "",
      reason: "Procedimiento menor",
      site: "Zarate",
      status: "Finalizada",
    },
    {
      id: `ana-${weekendDate}-1100`,
      date: weekendDate,
      time: "11:00",
      patient: "Ana Gabriela S\u00e1nchez",
      phone: "555 010 2100",
      reason: "Columna",
      site: "Vidal",
      status: "Pendiente",
    },
    {
      id: `carlos-${weekendDate}-1200`,
      date: weekendDate,
      time: "12:00",
      patient: "Carlos Alberto P\u00e9rez",
      phone: "555 010 2200",
      reason: "Postoperatorio",
      site: "Zarate",
      status: "Confirmada",
    },
  ];
}

export function getNextAppointment(appointments: Appointment[], fromDateKey: string) {
  const nowMinutes =
    toDateKey() === fromDateKey ? new Date().getHours() * 60 + new Date().getMinutes() : 0;

  return sortAppointments(appointments).find(
    (appointment) =>
      appointment.status !== "Cancelada" &&
      appointment.status !== "Finalizada" &&
      (appointment.date > fromDateKey ||
        (appointment.date === fromDateKey && timeToMinutes(appointment.time) >= nowMinutes)),
  );
}

export function getPatientsFromAppointments(appointments: Appointment[]) {
  const patients = new Map<
    string,
    {
      name: string;
      phone: string;
      recentReason: string;
      site: ClinicSite;
      latestAppointment?: Appointment;
      nextAppointment?: Appointment;
    }
  >();

  for (const appointment of sortAppointments(appointments)) {
    if (appointment.patient === "Bloqueo de tiempo") {
      continue;
    }

    const key = normalizeSearch(`${appointment.patient}-${appointment.phone}`);
    const current = patients.get(key);
    const isUpcoming =
      appointment.status !== "Cancelada" &&
      appointment.status !== "Finalizada" &&
      appointment.date >= toDateKey();

    patients.set(key, {
      name: appointment.patient,
      phone: appointment.phone,
      recentReason: appointment.reason,
      site: appointment.site,
      latestAppointment: appointment,
      nextAppointment: current?.nextAppointment ?? (isUpcoming ? appointment : undefined),
    });
  }

  return [...patients.values()].sort((a, b) => a.name.localeCompare(b.name));
}
