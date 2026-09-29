"use client";

// A real GA4 web-stream ID must be configured before collection can begin.
// Preview deployments and test visits never send hits to Analytics or Ads.
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";
const PUBLIC_HOSTS = new Set(["www.alexisgarciaortopedia.com", "alexisgarciaortopedia.com"]);
export function isPublicMeasurementEnabled() {
  if (typeof window === "undefined" || !PUBLIC_HOSTS.has(window.location.hostname)) return false;
  const params = new URLSearchParams(window.location.search);
  try {
    if (params.get("medicion") === "prueba") window.sessionStorage.setItem("ag_measurement_test", "1");
    return window.sessionStorage.getItem("ag_measurement_test") !== "1";
  } catch { return params.get("medicion") !== "prueba"; }
}

export function acquisitionSource(): "gads_pachuca" | "gmaps_pachuca" | "gmaps_tula" | "web_other" {
  if (typeof window === "undefined") return "web_other";
  const q = new URLSearchParams(window.location.search);
  let ref = q.get("ref")?.toUpperCase() ?? "";
  let hasClick = ["gclid", "gbraid", "wbraid"].some(key => !!q.get(key));
  try { ref ||= window.sessionStorage.getItem("ag_ref") ?? ""; hasClick ||= !!window.sessionStorage.getItem("ag_ads_click"); } catch { /* attribution stays unknown */ }
  if (hasClick || ref === "GADS-PAC") return "gads_pachuca";
  if (ref === "GMAPS-PAC") return "gmaps_pachuca";
  if (ref === "GMAPS-TUL") return "gmaps_tula";
  return "web_other";
}

type WebEvent = "contact_click" | "program_request_click" | "video_start" | "video_progress" | "video_complete";
type EventParameters = { sede?: "pachuca" | "tula" | "programa"; channel?: "whatsapp" | "phone"; placement?: string; video_id?: string; video_percent?: number };
export function trackWebEvent(name: WebEvent, parameters: EventParameters = {}) {
  const detail = { event: name, ...parameters, acquisition_source: acquisitionSource(), page_path: window.location.pathname };
  // Local observable event, without identifiers, for preview QA. No database or remote call.
  window.dispatchEvent(new CustomEvent("ag:measurement", { detail }));
  if (!isPublicMeasurementEnabled() || !/^G-[A-Z0-9]+$/.test(GA4_ID)) return;
  const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", name, { ...parameters, acquisition_source: detail.acquisition_source, send_to: GA4_ID, page_location: `${window.location.origin}${window.location.pathname}` });
}
