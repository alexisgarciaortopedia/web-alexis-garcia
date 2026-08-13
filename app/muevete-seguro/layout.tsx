import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muévete Seguro by Ortik",
  description:
    "Seguimiento de molestias y lesiones por WhatsApp, con supervisión médica del Dr. Alexis Eduardo García de los Santos, Traumatología y Ortopedia.",
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
