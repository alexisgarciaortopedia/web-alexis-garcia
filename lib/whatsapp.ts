"use client";

import { useSyncExternalStore } from "react";

const PHONE = "527731754638";
const DEFAULT_REF = "WEB";
const REF_STORAGE_KEY = "ag_ref";
const CONVERSION_SEND_TO = "AW-18142944053/CAIPCPry49ocELW2nctD";

function buildWhatsAppUrl(message: string, ref: string) {
  const fullMessage = `${message}\nRef: ${ref}`;
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(fullMessage)}`;
}

// El parámetro ?ref= no cambia sin una navegación completa, así que no hace
// falta suscribirse a nada real: solo darle a React un snapshot para el
// servidor (DEFAULT_REF) y otro para el cliente (el valor real de la URL).
function subscribe() {
  return () => {};
}

function getServerSnapshot() {
  return DEFAULT_REF;
}

// El ref solo viaja en la URL de aterrizaje. Como el <Link> de Next navega en
// cliente sin arrastrar el query string, un paciente que llegaba con
// ?ref=GADS-PAC y tocaba "Agendar consulta" perdía la etiqueta y su WhatsApp
// salía como "WEB". Lo guardamos en sessionStorage al aterrizar para que
// sobreviva el resto de la visita; la sesión muere con la pestaña, así que no
// contamina visitas posteriores ni deja rastro persistente en el dispositivo.
let cachedRef: string | null = null;

function readStoredRef() {
  try {
    return window.sessionStorage.getItem(REF_STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeRef(ref: string) {
  try {
    window.sessionStorage.setItem(REF_STORAGE_KEY, ref);
  } catch {
    // Modo privado o almacenamiento bloqueado: seguimos con el ref en memoria.
  }
}

function getClientSnapshot() {
  if (cachedRef !== null) return cachedRef;

  const fromUrl = new URLSearchParams(window.location.search).get("ref");
  if (fromUrl) {
    storeRef(fromUrl);
    cachedRef = fromUrl;
  } else {
    cachedRef = readStoredRef() ?? DEFAULT_REF;
  }

  return cachedRef;
}

/**
 * Builds a wa.me link tagged con el ?ref= de la URL actual (o "WEB" por
 * defecto), para que un paciente que llega por un canal etiquetado (Google
 * Ads, Maps, etc.) se atribuya solo al abrir WhatsApp.
 */
export function useWhatsAppUrl(message: string) {
  const ref = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  return buildWhatsAppUrl(message, ref);
}

/** Dispara la conversión "WhatsApp – clic" de Google Ads antes de navegar. */
export function trackWhatsAppClick() {
  const w = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
  };
  w.gtag?.("event", "conversion", { send_to: CONVERSION_SEND_TO });
}
