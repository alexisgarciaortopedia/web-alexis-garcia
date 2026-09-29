import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PremiumSite from "@/components/PremiumSite";
import { CLINIC_LOCATIONS as SEDES, getSedeStaticParams, type ClinicLocationId } from "@/lib/locations";

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

export default async function SedeHubPage({ params }: PageProps) {
  const { sede } = await params;
  if (!isValidSede(sede)) notFound();
  return <PremiumSite sede={sede}/>;
}
