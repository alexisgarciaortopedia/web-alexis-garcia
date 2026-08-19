import type { Metadata } from "next";
import FloatingWhatsAppAfterHero from "@/components/FloatingWhatsAppAfterHero";
import GlassPanel from "@/components/GlassPanel";
import Header from "@/components/Header";
import LandingHero from "@/components/LandingHero";
import LocationBlock from "@/components/LocationBlock";
import { CLINIC_LOCATIONS as SEDES } from "@/lib/locations";
import { AGGREGATE_REVIEW_COUNT } from "@/lib/staticGoogleReviews";

const WHATSAPP_MESSAGE =
  "Hola, ya tengo un diagnóstico y quiero una segunda opinión antes de decidir.";

export const metadata: Metadata = {
  title: "Segunda Opinión Ortopédica | Dr. Alexis García",
  description:
    "¿Ya te dijeron que necesitas cirugía? Revisamos tu diagnóstico contigo. No toda lesión necesita operarse -- evaluamos todas las opciones antes.",
  alternates: {
    canonical: "https://www.alexisgarciaortopedia.com/segunda-opinion",
  },
  robots: { index: true, follow: true },
};

const HOW_IT_WORKS = [
  "Trae tus estudios y la cotización que ya tienes — rayos X, resonancia, informe del otro médico.",
  "Revisamos el caso a fondo: qué tan justificada está la cirugía y qué otras opciones existen.",
  "Si la cirugía es necesaria, te explicamos exactamente qué implica. Si no lo es, también te lo decimos con la misma claridad.",
];

export default function SegundaOpinionPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink-900">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050608_0%,#0B0F17_50%,#050608_100%)]" />
      <div className="pointer-events-none absolute -right-28 top-16 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(148,156,170,0.18),transparent_70%)] blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-20" />

      <Header />

      <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-16 px-8 pb-28 pt-10 sm:px-10 lg:pt-14">
        <div id="hero">
          <LandingHero
            eyebrow="SEGUNDA OPINIÓN ORTOPÉDICA"
            h1First="¿Ya Tienes un Diagnóstico?"
            h1Second="Confirma Antes de Operarte"
            entradilla="¿Ya te dijeron que necesitas cirugía? Revisamos tu diagnóstico contigo. No toda lesión necesita operarse — evaluamos todas las opciones antes."
            reviewCount={AGGREGATE_REVIEW_COUNT}
            reviewLabel="reseñas en Google"
            micro="Consulta presencial todos los días, 9:00 a 19:00 h, en Pachuca y en Tula"
            whatsappMessage={WHATSAPP_MESSAGE}
          />
        </div>

        <GlassPanel className="flex flex-col gap-4 px-6 py-7 sm:px-8">
          <h2 className="font-serif text-xl text-white sm:text-2xl">
            Trae tu diagnóstico, te damos una lectura clara
          </h2>
          <ul className="flex flex-col gap-3 text-sm text-text-secondary sm:text-base">
            {HOW_IT_WORKS.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-clinical" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </GlassPanel>

        <div className="grid gap-6 sm:grid-cols-2">
          <LocationBlock sede={SEDES.pachuca} />
          <LocationBlock sede={SEDES.tula} />
        </div>
      </main>

      <FloatingWhatsAppAfterHero heroId="hero" />
    </div>
  );
}
