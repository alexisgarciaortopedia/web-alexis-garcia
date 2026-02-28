import type { Sede } from "@/lib/appointmentsSchedule";

export type VisitType = "programada" | "prioritaria";

export const PRICES: Record<Sede, Record<VisitType, number>> = {
  tula: { programada: 900, prioritaria: 1800 },
  pachuca: { programada: 1200, prioritaria: 1800 },
  telemedicina: { programada: 800, prioritaria: 1500 },
};

export function formatCurrency(value: number) {
  return `$${value.toLocaleString("es-MX")} MXN`;
}
