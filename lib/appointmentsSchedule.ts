export type Sede = "tula" | "pachuca" | "telemedicina";

export const SCHEDULES: Record<Sede, { days: number[]; slots: string[] }> = {
  tula: {
    days: [5, 6],
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
  pachuca: {
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
