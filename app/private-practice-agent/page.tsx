import type { Metadata } from "next";
import Link from "next/link";

const base = "https://www.alexisgarciaortopedia.com/private-practice-agent";

export const metadata: Metadata = {
  title: "Private Practice Agent | Dr. Alexis García",
  description: "Herramienta interna de análisis de adquisición para la práctica del Dr. Alexis García.",
  alternates: { canonical: base },
  robots: { index: false, follow: true },
};

export default function PrivatePracticeAgentPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-20 text-white">
      <h1 className="mb-6 font-serif text-4xl">Private Practice Agent</h1>
      <p className="mb-5 leading-relaxed text-white/80">
        Private Practice Agent es una herramienta interna de la práctica del Dr. Alexis Eduardo García de los Santos.
        Ayuda a consultar datos de adquisición y a preparar reportes para Pachuca y Tula. No es un portal para pacientes.
      </p>
      <p className="mb-5 leading-relaxed text-white/80">
        Con autorización de la cuenta de Google de la práctica, consulta en modo de solo lectura el monitor de Google Ads
        en Sheets, Search Console y las métricas de Google Business Profile. No cambia campañas, fichas ni propiedades.
      </p>
      <p className="mb-8 leading-relaxed text-white/80">
        La conexión requiere consentimiento de la cuenta autorizada. Puede revocarse en la configuración de seguridad
        de esa cuenta de Google.
      </p>
      <Link className="underline decoration-teal-400 underline-offset-4" href="/private-practice-agent/privacidad">
        Aviso de privacidad de Private Practice Agent
      </Link>
      <p className="mt-10 text-sm text-white/60">Contacto: alexisgarciaortopedia@gmail.com</p>
    </main>
  );
}
