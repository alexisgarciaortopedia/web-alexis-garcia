import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ubicaciones",
  description:
    "Consulta privada en Tula de Allende y Pachuca de Soto, Hidalgo. Horarios y direcciones de las sedes de atención.",
  alternates: {
    canonical: "https://www.alexisgarciaortopedia.com/ubicaciones",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function UbicacionesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
