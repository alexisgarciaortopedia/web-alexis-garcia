import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muévete Seguro para Centros Deportivos",
  description:
    "Ayuda a tu centro deportivo a retener socios: seguimiento por WhatsApp con supervisión médica ante molestias y lesiones, sin cambiar tu operación.",
  alternates: {
    canonical: "https://www.alexisgarciaortopedia.com/centros-deportivos",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CentrosDeportivosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
