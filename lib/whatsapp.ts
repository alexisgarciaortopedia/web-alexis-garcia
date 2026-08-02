"use client";

import { useSyncExternalStore } from "react";

const PHONE = "527731754638";
const DEFAULT_REF = "WEB";
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

function getClientSnapshot() {
  return new URLSearchParams(window.location.search).get("ref") ?? DEFAULT_REF;
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
