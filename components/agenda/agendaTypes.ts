export type AppointmentStatus =
  | "Pendiente"
  | "Confirmada"
  | "En consulta"
  | "Cancelada"
  | "Finalizada";

export type ClinicSite = "Zarate" | "Vidal" | "Doxey" | "Adoy";

export type SiteFilter = "Todas" | ClinicSite;

export type AppointmentView = "Dia" | "Semana" | "Por sede";

export type DashboardSection =
  | "Agenda"
  | "Pacientes"
  | "Disponibilidad"
  | "Configuracion"
  | "Mas";

export type Appointment = {
  id: string;
  date: string;
  time: string;
  patient: string;
  phone: string;
  reason: string;
  site: ClinicSite;
  status: AppointmentStatus;
};

export type AppointmentFormState = {
  patient: string;
  phone: string;
  reason: string;
  site: ClinicSite;
  date: string;
  time: string;
};

export type AvailableSlot = {
  id: string;
  date: string;
  time: string;
  site: ClinicSite;
};
