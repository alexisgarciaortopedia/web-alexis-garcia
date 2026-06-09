import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muévete Seguro by Ortik",
  description:
    "Sistema médico-deportivo de monitoreo preventivo para deportistas, gimnasios y equipos.",
  alternates: {
    canonical: "https://www.alexisgarciaortopedia.com/muevete-seguro",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MueveteSeguroLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
