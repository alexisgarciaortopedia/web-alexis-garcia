import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso de Privacidad | Muévete Seguro by Ortik",
  description:
    "Aviso de privacidad de Muévete Seguro by Ortik: qué datos personales y de salud tratamos, para qué los usamos, con quién se comparten y cómo ejercer sus derechos ARCO.",
  alternates: {
    canonical: "https://www.alexisgarciaortopedia.com/privacidad",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacidadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
