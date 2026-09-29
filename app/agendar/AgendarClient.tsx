"use client";
import { PremiumHeader, PremiumFooter, LocationCard } from "@/components/PremiumSite";
import { useSede } from "@/lib/sede";
export default function AgendarClient() {
  const sede=useSede();
  return <div className="premium"><PremiumHeader sede={sede}/><main className="p-wrap"><div className="p-agenda"><p className="p-eyebrow">TU SIGUIENTE PASO</p><h1>Hagamos espacio<br/><em>para tu salud.</em></h1><p>Elige tu consultorio y escríbenos. Nuestro equipo te comparte el costo y los horarios disponibles para confirmar tu valoración.</p><div className="p-location-grid"><LocationCard sede={sede}/><LocationCard sede={sede === "pachuca" ? "tula" : "pachuca"}/></div><p className="p-micro">Tu cita queda confirmada después de recibir respuesta de nuestro equipo.</p></div></main><PremiumFooter/></div>;
}
