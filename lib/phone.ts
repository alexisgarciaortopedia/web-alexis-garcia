"use client";

/** Número único de contacto, en los dos formatos que usa la interfaz. */
export const PHONE_TEL = "tel:+527731754638";
export const PHONE_DISPLAY = "773 175 4638";

const CONVERSION_SEND_TO = "AW-18142944053/ScwECMaBhd8cELW2nctD";

/**
 * Dispara la conversión "Clic de llamada" de Google Ads.
 *
 * Las llamadas desde anuncios no se pueden medir en México (Google no ofrece
 * números de desvío aquí), así que el clic en el teléfono del sitio es la
 * única señal telefónica que la puja puede aprovechar.
 */
export function trackPhoneCallClick() {
  const w = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
  };
  w.gtag?.("event", "conversion", { send_to: CONVERSION_SEND_TO });
}
