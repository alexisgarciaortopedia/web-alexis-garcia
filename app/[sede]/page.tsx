import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FloatingWhatsAppAfterHero from "@/components/FloatingWhatsAppAfterHero";
import GlassPanel from "@/components/GlassPanel";
import Header from "@/components/Header";
import LandingHero from "@/components/LandingHero";
import LocationBlock from "@/components/LocationBlock";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppLink from "@/components/WhatsAppLink";
import PhoneLink from "@/components/PhoneLink";
import { PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import {
  CLINIC_LOCATIONS as SEDES,
  getSedeStaticParams,
  type ClinicLocationId,
} from "@/lib/locations";
import { PHONE_DISPLAY } from "@/lib/phone";

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

  const title = `Traumatólogo y Ortopedista en ${sede.shortLabel} | Dr. Alexis García`;
  const description = `Consulta de Traumatología y Ortopedia en ${sede.publicLabel} con el Dr. Alexis García. Rodilla, hombro, cadera, columna, fracturas y lesión deportiva. ${sede.daysLabel}, ${sede.scheduleLabel}.`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `https://www.alexisgarciaortopedia.com/${sedeParam}`,
    },
    robots: { index: true, follow: true },
  };
}

const WHY_POINTS = [
  "Evaluación clínica dirigida antes que estudios de imagen — se piden solo cuando cambian el plan.",
  "Un plan con objetivos y progresión, no solo indicaciones sueltas.",
  "Seguimiento hasta que tu recuperación se cumple, no hasta la primera consulta.",
];

export default async function SedeHubPage({ params }: PageProps) {
  const { sede: sedeParam } = await params;
  if (!isValidSede(sedeParam)) notFound();
  const sede = SEDES[sedeParam];
  const whatsappMessage = `Hola, vengo de la página de ${sede.publicLabel}. Me gustaría agendar una consulta.`;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink-900">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050608_0%,#0B0F17_50%,#050608_100%)]" />
      <div className="pointer-events-none absolute -right-28 top-16 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(148,156,170,0.18),transparent_70%)] blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-20" />

      <Header />

      <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-16 px-8 pb-28 pt-10 sm:px-10 lg:pt-14">
        <div id="hero">
          <LandingHero
            eyebrow={sede.hub.eyebrow}
            h1First="Traumatólogo y Ortopedista"
            h1Second={sede.hub.h1Second}
            entradilla={sede.hub.entradilla}
            reviewLocation={sedeParam}
            micro={sede.hub.micro}
            whatsappMessage={whatsappMessage}
          />
        </div>

        <GlassPanel className="flex flex-col gap-4 px-6 py-7 sm:px-8">
          <h2 className="font-serif text-xl text-white sm:text-2xl">
            Un diagnóstico que no se queda en &ldquo;algo se
            lastimó&rdquo;
          </h2>
          <ul className="flex flex-col gap-3 text-sm text-text-secondary sm:text-base">
            {WHY_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-clinical" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </GlassPanel>

        <GlassPanel className="flex flex-col gap-5 px-6 py-7 sm:px-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-serif text-xl text-white sm:text-2xl">
              Guías de consulta en {sede.publicLabel}
            </h2>
            <p className="text-sm text-text-secondary sm:text-base">
              Los dos motivos con los que más llega la gente a esta sede,
              explicados antes de que agendes.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href={`/${sedeParam}/fracturas`}
              className="flex flex-col gap-1 rounded-md border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:bg-white/10"
            >
              <span className="font-serif text-base text-white">
                Fracturas en {sede.publicLabel}
              </span>
              <span className="text-sm text-text-secondary">
                Qué hacer en las primeras horas y cuándo se opera.
              </span>
            </Link>
            <Link
              href={`/${sedeParam}/rodilla`}
              className="flex flex-col gap-1 rounded-md border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:bg-white/10"
            >
              <span className="font-serif text-base text-white">
                Dolor de rodilla en {sede.publicLabel}
              </span>
              <span className="text-sm text-text-secondary">
                Menisco, ligamentos y artrosis: cómo se estudia cada uno.
              </span>
            </Link>
          </div>
        </GlassPanel>

        <LocationBlock sede={sede} />

        <section className="flex flex-col items-center gap-5 text-center">
          <h2 className="font-serif text-xl text-white sm:text-2xl">
            ¿Listo para tu valoración?
          </h2>
          <div className="flex w-full max-w-sm flex-col gap-3">
            <WhatsAppLink
              message={whatsappMessage}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-signal px-6 py-3.5 text-sm font-semibold text-ink-900 shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Escribir por WhatsApp
            </WhatsAppLink>
            <PhoneLink className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10">
              <PhoneIcon className="h-4 w-4" />
              Llamar {PHONE_DISPLAY}
            </PhoneLink>
          </div>
        </section>
      </main>

      <SiteFooter />

      <FloatingWhatsAppAfterHero heroId="hero" />
    </div>
  );
}
