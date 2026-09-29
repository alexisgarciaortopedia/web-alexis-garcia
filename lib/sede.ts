"use client";
import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
export type Sede = "pachuca" | "tula";
const valid = (s: string | null): s is Sede => s === "pachuca" || s === "tula";
function subscribe(callback: () => void) { window.addEventListener("ag:sede", callback); return () => window.removeEventListener("ag:sede", callback); }
function getServerSnapshot(): Sede { return "pachuca"; }
function getClientSnapshot(): Sede {
  const q=new URLSearchParams(window.location.search);
  const explicit=q.get("sede"); if(valid(explicit)) return explicit;
  const ref=q.get("ref")?.toUpperCase();
  if(ref?.includes("TUL")) return "tula";
  if(ref?.includes("PAC") || ["gclid","gbraid","wbraid"].some(key => q.has(key))) return "pachuca";
  try { const saved=window.sessionStorage.getItem("ag_sede");if(valid(saved)) return saved; } catch {}
  return "pachuca";
}
export function useSede(): Sede {
  const pathname=usePathname();
  const stored=useSyncExternalStore(subscribe,getClientSnapshot,getServerSnapshot);
  const route=pathname.split("/")[1];
  const sede=valid(route) ? route : stored;
  useEffect(() => { try { if(window.sessionStorage.getItem("ag_sede") !== sede) {window.sessionStorage.setItem("ag_sede",sede);window.dispatchEvent(new Event("ag:sede"));} } catch {} },[sede,pathname]);
  return sede;
}
