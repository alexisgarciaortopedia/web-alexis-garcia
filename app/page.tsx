import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Dr. Alexis Eduardo García de los Santos | Traumatología y Ortopedia",
  description:
    "Consulta de Traumatología y Ortopedia en Tula de Allende y Pachuca de Soto, Hidalgo. Valoración ortopédica con enfoque clínico y toma de decisiones basada en evidencia.",
  alternates: {
    canonical: "https://www.alexisgarciaortopedia.com/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <HomeClient />;
}
