import type { Metadata } from "next";
import AgendarClient from "./AgendarClient";

export const metadata: Metadata = {
  title: "Agendar consulta | Dr Alexis García",
  description:
    "Agenda tu consulta de Traumatología y Ortopedia por WhatsApp o conoce las opciones de atención presencial y en línea del Dr Alexis García.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.alexisgarciaortopedia.com/agendar",
  },
};

export default function AgendarPage() {
  return <AgendarClient />;
}
