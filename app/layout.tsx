import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const siteTitle =
  "Dr. Alexis Eduardo García de los Santos | Traumatología y Ortopedia";
const siteDescription =
  "Consulta de Traumatología y Ortopedia en Tula de Allende y Pachuca de Soto, Hidalgo. Valoración ortopédica con enfoque clínico y toma de decisiones basada en evidencia.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.alexisgarciaortopedia.com"),
  title: {
    default: siteTitle,
    template: "%s | Dr. Alexis Eduardo García de los Santos",
  },
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://www.alexisgarciaortopedia.com",
    siteName: "Dr. Alexis Eduardo García de los Santos",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  icons: {
    icon: "/favicon-ag-v2.png?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta
          name="google-site-verification"
          content="rkruYMA5jVoDuZbRDX7ASEeJabhBbAaTctpdBKdRaDY"
        />
        <meta
          name="facebook-domain-verification"
          content="fjzniz8f2fcocaxcc6a9jwqb6sbo7c"
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
