"use client";
import { useEffect } from "react";
import Script from "next/script";
import { GA4_ID, isPublicMeasurementEnabled, trackWebEvent } from "@/lib/webAnalytics";

export default function WebAnalytics() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element)?.closest?.("a"); if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const channel = href.startsWith("tel:") ? "phone" : /^https:\/\/wa.me\//.test(href) ? "whatsapp" : null;
      if (!channel) return;
      const program = anchor.dataset.program === "muevete_seguro";
      const sede = program ? "programa" : href.includes("7717588383") ? "pachuca" : href.includes("7731754638") ? "tula" : null;
      if (!sede) return;
      trackWebEvent(program ? "program_request_click" : "contact_click", { sede, channel, placement: anchor.dataset.placement ?? "legacy" });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  // GA4 automatic history measurement handles Next.js client navigation.
  // Do not add manual page_view calls: they would double count.
  if (!/^G-[A-Z0-9]+$/.test(GA4_ID)) return null;
  return <Script id="ga4-configuration" strategy="afterInteractive" onReady={() => {
    if (!isPublicMeasurementEnabled()) return;
    const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
    w.gtag?.("config", GA4_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
  }}>{`/* GA4 configuration: ${GA4_ID} */`}</Script>;
}
