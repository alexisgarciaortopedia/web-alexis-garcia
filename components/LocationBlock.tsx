import GlassPanel from "@/components/GlassPanel";
import type { ClinicLocation } from "@/lib/locations";

type LocationBlockProps = {
  sede: ClinicLocation;
};

/** Bloque de ubicación compartido -- dirección, horario y enlace a Maps. */
export default function LocationBlock({ sede }: LocationBlockProps) {
  return (
    <GlassPanel className="flex flex-col gap-4 px-6 py-6 sm:px-8 sm:py-7">
      <div className="flex flex-col gap-1">
        <h3 className="font-serif text-lg text-white">
          Consultorio en {sede.publicLabel}
        </h3>
        <p className="text-sm font-semibold text-white">{sede.clinicName}</p>
      </div>
      <div className="flex flex-col gap-1 text-sm text-text-secondary">
        {sede.addressLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
      <div className="flex flex-col gap-1 text-sm text-text-secondary">
        <span>
          <span className="font-semibold text-white">Atención:</span>{" "}
          {sede.daysLabel}
        </span>
        <span>
          <span className="font-semibold text-white">Horario:</span>{" "}
          {sede.scheduleLabel}
        </span>
      </div>
      <a
        href={sede.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-fit items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
      >
        Ver en Google Maps
      </a>
    </GlassPanel>
  );
}
