"use client";

import { useSyncExternalStore } from "react";

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

/**
 * Determina qué sede mostrar en el hero a partir del ?ref= de la campaña
 * que trajo al paciente (p. ej. GADS-TUL-URG => Tula). Mismo patrón de
 * hidratación en dos pasos que useWhatsAppUrl: el servidor siempre entrega
 * la variante de Pachuca, y el cliente la corrige tras montar si el ref
 * indica Tula.
 */
export function useSede(): Sede {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
