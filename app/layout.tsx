import type { Metadata } from "next";
import { Inter, Spectral } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GOOGLE_ADS_ID = "AW-18142944053";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Serif de bajo contraste de trazo en vez de la didona de alto contraste de
// Playfair, que se lee a clinica de estetica, no a precision clinica.
//
// Source Serif 4 era la primera opcion (linaje de documentacion tecnica),
// pero su archivo pesa 50.9KB solo en 400 -- ya deja el par de fuentes en
// ~97KB, por encima del presupuesto de 87KB. Literata pesa aun mas
// (52.7KB). Spectral, la segunda alternativa del documento de diseno,
// carga los DOS pesos (400 y 600) en 14.0KB + 14.8KB: el par completo
// queda en ~75.8KB, por debajo del actual. Medido con next build +
// inspeccion directa de los .woff2 generados, no estimado.
const sourceSerif = Spectral({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
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
      <body className={`${inter.variable} ${sourceSerif.variable} antialiased`}>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
