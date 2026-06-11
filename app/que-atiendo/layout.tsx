import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "¿Qué atiendo?",
  description:
    "Condiciones de trauma, hombro, rodilla, cadera, columna y pie que atiende el Dr. Alexis Eduardo García de los Santos en consulta presencial.",
  alternates: {
    canonical: "https://www.alexisgarciaortopedia.com/que-atiendo",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function QueAtiendoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
