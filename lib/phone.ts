"use client";

import type { MouseEvent } from "react";

/** Número único de contacto, en los dos formatos que usa la interfaz. */
export const PHONE_TEL = "tel:+527731754638";
export const PHONE_DISPLAY = "773 175 4638";

const CONVERSION_SEND_TO = "AW-18142944053/_EqkCPn2q-ccELW2nctD";

/**
 * Dispara la conversión "Clic de llamada" de Google Ads.
 *
 * Las llamadas desde anuncios no se pueden medir en México (Google no ofrece
 * números de desvío aquí), así que el clic en el teléfono del sitio es la
 * única señal telefónica que la puja puede aprovechar.
 */
export function trackPhoneCallClick(event: MouseEvent<HTMLAnchorElement>) {
  const w = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
  };

  // Una navegación tel: puede suspender la página antes de que gtag alcance a
  // despachar el hit. Conservamos el destino, detenemos la navegación y la
  // reanudamos cuando Google confirma el envío. El timeout evita bloquear la
  // llamada si gtag/ad blockers/red nunca ejecutan el callback.
  const destination = event.currentTarget.href;
  const gtag = w.gtag;
  if (!gtag) return;

  event.preventDefault();

  let navigated = false;
  const navigate = () => {
    if (navigated) return;
    navigated = true;
    w.location.href = destination;
  };

  gtag("event", "conversion", {
    send_to: CONVERSION_SEND_TO,
    event_callback: navigate,
    event_timeout: 1000,
  });

  w.setTimeout(navigate, 1000);
}
