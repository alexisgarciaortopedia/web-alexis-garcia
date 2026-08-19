import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FloatingWhatsAppAfterHero from "@/components/FloatingWhatsAppAfterHero";
import GlassPanel from "@/components/GlassPanel";
import Header from "@/components/Header";
import LandingHero from "@/components/LandingHero";
import LocationBlock from "@/components/LocationBlock";
import {
  CLINIC_LOCATIONS as SEDES,
  getSedeStaticParams,
  type ClinicLocationId,
} from "@/lib/locations";

type PageProps = {
  params: Promise<{ sede: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getSedeStaticParams();
}

function isValidSede(sede: string): sede is ClinicLocationId {
  return sede === "pachuca" || sede === "tula";
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { sede: sedeParam } = await params;
  if (!isValidSede(sedeParam)) return {};
  const sede = SEDES[sedeParam];

  const title = `Fractura o Lesión Reciente en ${sede.publicLabel} | Dr. Alexis García`;
  const description = `¿Fractura, esguince o lesión deportiva reciente en ${sede.publicLabel}? Escríbenos y el médico responde directamente. Valoración clara y manejo completo.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.alexisgarciaortopedia.com/${sedeParam}/fracturas`,
    },
    robots: { index: true, follow: true },
  };
}

const WHAT_TO_DO = [
  "Si hay deformidad, dolor intenso o no puedes apoyar: escríbenos ahora — te decimos si necesitas urgencias o si tu valoración puede esperar.",
  "Trae cualquier estudio que ya tengas (rayos X, resonancia). Si no tienes, se indica según lo que encontremos en la exploración.",
  "La valoración clínica decide si el manejo es con inmovilización o si se requiere cirugía.",
];

export default async function FracturasPage({ params }: PageProps) {
  const { sede: sedeParam } = await params;
  if (!isValidSede(sedeParam)) notFound();
  const sede = SEDES[sedeParam];
  const whatsappMessage = `Hola, tuve una fractura o lesión reciente y quiero agendar una valoración en ${sede.publicLabel}.`;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink-900">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050608_0%,#0B0F17_50%,#050608_100%)]" />
      <div className="pointer-events-none absolute -right-28 top-16 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(148,156,170,0.18),transparent_70%)] blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-20" />

      <Header />

      <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-16 px-8 pb-28 pt-10 sm:px-10 lg:pt-14">
        <div id="hero">
          <LandingHero
            eyebrow={sede.fracturas.eyebrow}
            h1First="¿Fractura o Lesión Reciente?"
            h1Second={`Traumatólogo en ${sede.publicLabel.split(" ")[0]}`}
            entradilla={sede.fracturas.entradilla}
            reviewCount={sede.reviewCount}
            reviewLabel={`reseñas en ${sede.publicLabel.split(" ")[0]}`}
            micro={sede.fracturas.micro}
            whatsappMessage={whatsappMessage}
          />
        </div>

        <GlassPanel className="flex flex-col gap-4 px-6 py-7 sm:px-8">
          <h2 className="font-serif text-xl text-white sm:text-2xl">
            ¿Qué hago si me acabo de lesionar?
          </h2>
          <ul className="flex flex-col gap-3 text-sm text-text-secondary sm:text-base">
            {WHAT_TO_DO.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-clinical" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </GlassPanel>

        <LocationBlock sede={sede} />
      </main>

      <FloatingWhatsAppAfterHero heroId="hero" />
    </div>
  );
}
