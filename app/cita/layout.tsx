import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detalle de cita",
  description: "Consulta el estado de tu cita programada.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.alexisgarciaortopedia.com/cita",
  },
};

export default function CitaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
