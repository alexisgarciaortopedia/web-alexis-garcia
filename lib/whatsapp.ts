"use client";

import { useSyncExternalStore } from "react";

const PHONE = "527731754638";
const DEFAULT_REF = "WEB";
const REF_STORAGE_KEY = "ag_ref";
const CONTACT_ID_STORAGE_KEY = "ag_wa_contact_id";
const ADS_CLICK_STORAGE_KEY = "ag_ads_click";
const CONVERSION_SEND_TO = "AW-18142944053/CAIPCPry49ocELW2nctD";
const ADS_CLICK_PARAMS = ["gclid", "gbraid", "wbraid"] as const;
const REF_PATTERN = /^[A-Z0-9-]{1,32}$/;
const CONTACT_ID_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const SERVER_SNAPSHOT = `${DEFAULT_REF}|WA-XXXXXX`;

type AdsClickParam = (typeof ADS_CLICK_PARAMS)[number];

type StoredAdsClick = {
  parameter: AdsClickParam;
  value: string;
};

function buildWhatsAppUrl(message: string, snapshot: string) {
  const [ref, contactId] = snapshot.split("|");
  const fullMessage = `${message}\nRef: ${ref} | ID: ${contactId}`;
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(fullMessage)}`;
}

// El parámetro ?ref= no cambia sin una navegación completa, así que no hace
// falta suscribirse a nada real: solo darle a React un snapshot para el
// servidor (DEFAULT_REF) y otro para el cliente (el valor real de la URL).
function subscribe() {
  return () => {};
}

function getServerSnapshot() {
  return SERVER_SNAPSHOT;
}

// El ref solo viaja en la URL de aterrizaje. Como el <Link> de Next navega en
// cliente sin arrastrar el query string, un paciente que llegaba con
// ?ref=GADS-PAC y tocaba "Agendar consulta" perdía la etiqueta y su WhatsApp
// salía como "WEB". Lo guardamos en sessionStorage al aterrizar para que
// sobreviva el resto de la visita; la sesión muere con la pestaña, así que no
// contamina visitas posteriores ni deja rastro persistente en el dispositivo.
let cachedSnapshot: string | null = null;

function readSessionValue(key: string) {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function storeSessionValue(key: string, value: string) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Modo privado o almacenamiento bloqueado: seguimos con estado en memoria.
  }
}

function readAdsClickFromUrl(searchParams: URLSearchParams): StoredAdsClick | null {
  for (const parameter of ADS_CLICK_PARAMS) {
    const value = searchParams.get(parameter)?.trim();
    if (value) return { parameter, value };
  }
  return null;
}

function readStoredAdsClick(): StoredAdsClick | null {
  const stored = readSessionValue(ADS_CLICK_STORAGE_KEY);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored) as Partial<StoredAdsClick>;
    if (
      ADS_CLICK_PARAMS.includes(parsed.parameter as AdsClickParam) &&
      typeof parsed.value === "string" &&
      parsed.value.length > 0
    ) {
      return parsed as StoredAdsClick;
    }
  } catch {
    // Un valor corrupto no debe producir atribución inventada.
  }
  return null;
}

function normalizeExplicitRef(value: string | null) {
  const normalized = value?.trim().toUpperCase() ?? "";
  return REF_PATTERN.test(normalized) ? normalized : null;
}

function generateContactId() {
  const random = new Uint8Array(6);
  window.crypto.getRandomValues(random);
  const suffix = Array.from(
    random,
    (value) => CONTACT_ID_ALPHABET[value % CONTACT_ID_ALPHABET.length],
  ).join("");
  return `WA-${suffix}`;
}

function getContactId() {
  const stored = readSessionValue(CONTACT_ID_STORAGE_KEY);
  if (/^WA-[A-Z2-9]{6}$/.test(stored ?? "")) return stored as string;

  const contactId = generateContactId();
  storeSessionValue(CONTACT_ID_STORAGE_KEY, contactId);
  return contactId;
}

function getClientSnapshot() {
  if (cachedSnapshot !== null) return cachedSnapshot;

  const searchParams = new URLSearchParams(window.location.search);
  const clickFromUrl = readAdsClickFromUrl(searchParams);
  if (clickFromUrl) {
    storeSessionValue(ADS_CLICK_STORAGE_KEY, JSON.stringify(clickFromUrl));
  }

  const hasAdsClick = clickFromUrl !== null || readStoredAdsClick() !== null;
  const explicitRef = normalizeExplicitRef(searchParams.get("ref"));
  let ref: string;

  if (hasAdsClick) {
    ref = "GADS-PAC";
    storeSessionValue(REF_STORAGE_KEY, ref);
  } else if (explicitRef) {
    ref = explicitRef;
    storeSessionValue(REF_STORAGE_KEY, ref);
  } else {
    ref = normalizeExplicitRef(readSessionValue(REF_STORAGE_KEY)) ?? DEFAULT_REF;
  }

  cachedSnapshot = `${ref}|${getContactId()}`;
  return cachedSnapshot;
}

/**
 * Builds a wa.me link con origen e ID anónimo de contacto. Los click IDs de
 * Ads se conservan solo en sessionStorage y nunca se exponen en el mensaje.
 */
export function useWhatsAppUrl(message: string) {
  const snapshot = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  return buildWhatsAppUrl(message, snapshot);
}

/** Dispara la conversión "WhatsApp – clic" de Google Ads antes de navegar. */
export function trackWhatsAppClick() {
  const w = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
  };
  w.gtag?.("event", "conversion", { send_to: CONVERSION_SEND_TO });
}
