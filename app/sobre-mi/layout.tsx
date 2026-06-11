import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Conoce la formación y el enfoque clínico del Dr. Alexis Eduardo García de los Santos, especialista en Traumatología y Ortopedia en Hidalgo.",
  alternates: {
    canonical: "https://www.alexisgarciaortopedia.com/sobre-mi",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SobreMiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
