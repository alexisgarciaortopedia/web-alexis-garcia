"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

export type Sede = "pachuca" | "tula";

// Pachuca es la plaza de conquista (Hito 1): todo visitante sin ?ref= o con
// un ref que no identifica Tula ve el hero de Pachuca por defecto.
const DEFAULT_SEDE: Sede = "pachuca";

function subscribe() {
  return () => {};
}

function getServerSnapshot(): Sede {
  return DEFAULT_SEDE;
}

function detectSedeFromRef(ref: string | null): Sede {
  if (ref && ref.toUpperCase().includes("TUL")) {
    return "tula";
  }
  return DEFAULT_SEDE;
}

function getClientSnapshot(): Sede {
  const ref = new URLSearchParams(window.location.search).get("ref");
  return detectSedeFromRef(ref);
}

/** La sede de la ruta tiene prioridad; el home conserva la selección por ref. */
export function useSede(): Sede {
  const pathname = usePathname();
  const refSede = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const routeSede = pathname.split("/")[1];
  return routeSede === "tula" || routeSede === "pachuca" ? routeSede : refSede;
}
