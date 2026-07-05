import type { AppointmentStatus, AppointmentView, ClinicSite, SiteFilter } from "./agendaTypes";

export const AGENDA_STORAGE_KEY = "alexis-agenda-demo-v1";

export const clinicSites = ["Zarate", "Vidal", "Doxey", "Adoy"] as const satisfies readonly ClinicSite[];

export const siteFilters = ["Todas", ...clinicSites] as const satisfies readonly SiteFilter[];

export const appointmentViews = ["Dia", "Semana", "Por sede"] as const satisfies readonly AppointmentView[];

export const appointmentStatuses = [
  "Pendiente",
  "Confirmada",
  "En consulta",
  "Cancelada",
  "Finalizada",
] as const satisfies readonly AppointmentStatus[];

type SiteSchedule = {
  workingDays: number[];
  start: string;
  end: string;
  slotMinutes: number;
  note?: string;
};

export const siteSchedule: Record<ClinicSite, SiteSchedule> = {
  Adoy: {
    workingDays: [1, 2, 3, 4, 5],
    start: "08:00",
    end: "13:00",
    slotMinutes: 30,
  },
  Zarate: {
    workingDays: [0, 6],
    start: "10:00",
    end: "19:00",
    slotMinutes: 30,
    note: "Sede principal de fin de semana.",
  },
  Vidal: {
    workingDays: [0, 6],
    start: "10:00",
    end: "19:00",
    slotMinutes: 30,
    note: "Sede opcional de fin de semana.",
  },
  Doxey: {
    workingDays: [0, 6],
    start: "10:00",
    end: "19:00",
    slotMinutes: 30,
    note: "Sede opcional de fin de semana.",
  },
};

export const dayLabels = ["Dom", "Lun", "Mar", "Mi\u00e9", "Jue", "Vie", "S\u00e1b"] as const;

export const siteShortNames: Record<ClinicSite, string> = {
  Adoy: "Adoy",
  Zarate: "Z\u00e1rate",
  Vidal: "Vidal",
  Doxey: "OB Doxey",
};

export const siteFullNames: Record<ClinicSite, string> = {
  Adoy: "Adoy Medical Center",
  Zarate: "Z\u00e1rate Unidad de Especialidades M\u00e9dicas",
  Vidal: "M\u00e9dica Vidal",
  Doxey: "Cl\u00ednica de Especialidades OB",
};
