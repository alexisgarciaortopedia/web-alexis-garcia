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
    start: "11:00",
    end: "13:00",
    slotMinutes: 60,
  },
  Zarate: {
    workingDays: [0, 6],
    start: "09:00",
    end: "13:00",
    slotMinutes: 60,
    note: "Horario provisional. Ajustar con datos reales antes de producción.",
  },
  Vidal: {
    workingDays: [1, 3, 5],
    start: "09:00",
    end: "13:00",
    slotMinutes: 60,
    note: "Horario provisional. Confirmar días y horas exactas antes de producción.",
  },
  Doxey: {
    workingDays: [2, 4],
    start: "10:00",
    end: "14:00",
    slotMinutes: 60,
    note: "Horario provisional. Confirmar días y horas exactas antes de producción.",
  },
};

export const dayLabels = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"] as const;
