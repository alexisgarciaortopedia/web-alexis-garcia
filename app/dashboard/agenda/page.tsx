import type { Metadata } from "next";
import AgendaDashboardClient from "@/components/agenda/AgendaDashboardClient";

export const metadata: Metadata = {
  title: "Agenda interna | Alexis García Ortopedia",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AgendaPage() {
  return <AgendaDashboardClient />;
}
