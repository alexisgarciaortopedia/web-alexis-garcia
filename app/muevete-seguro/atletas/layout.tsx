import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muévete Seguro para Deportistas",
  description:
    "Seguimiento de molestias y lesiones por WhatsApp, con supervisión médica, para quien entrena. Pide tu código en tu centro deportivo.",
  alternates: {
    canonical: "https://www.alexisgarciaortopedia.com/muevete-seguro/atletas",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MueveteSeguroAtletasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
