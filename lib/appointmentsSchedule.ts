import { CLINIC_LOCATIONS } from "@/lib/locations";

export type Sede = "tula" | "pachuca" | "telemedicina";

export const SCHEDULES: Record<Sede, { days: number[]; slots: string[] }> = {
  tula: {
    days: CLINIC_LOCATIONS.tula.scheduleDays,
    slots: CLINIC_LOCATIONS.tula.slots,
  },
  pachuca: {
    days: CLINIC_LOCATIONS.pachuca.scheduleDays,
    slots: CLINIC_LOCATIONS.pachuca.slots,
  },
  telemedicina: {
    days: [1, 3, 5],
    slots: [
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
    ],
  },
};
