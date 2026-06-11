"use client";

import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import GlassPanel from "@/components/GlassPanel";
import Header from "@/components/Header";
import WhatsAppFloating from "@/components/WhatsAppFloating";

const WHATSAPP_MESSAGE =
  "Hola, vengo de la página del Dr. Alexis García. Me gustaría agendar una consulta.\nRef: WEB-2026";
const WHATSAPP_URL = `https://wa.me/527731754638?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;
const PHONE_TEL = "tel:+527731754638";
const PHONE_DISPLAY = "773 175 4638";

const actionButtonClasses =
  "inline-flex w-full items-center justify-center gap-3 rounded-[20px] border border-white/20 bg-white/6 px-6 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 sm:w-auto sm:min-w-[240px]";

export default function CitaPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050608]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050608_0%,#0B0F17_50%,#050608_100%)]" />
      <div className="pointer-events-none absolute -right-28 top-16 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(148,156,170,0.18),transparent_70%)] blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-20" />

      <Header />

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-10 px-8 pb-24 pt-10 sm:px-10 lg:pt-14">
        <section className="flex flex-col gap-4 text-center">
          <h1 className="font-serif text-3xl text-white sm:text-4xl">
            Gestión de cita
          </h1>
          <p className="text-sm text-[#B9C0CC] sm:text-base">
            Para reprogramar o cancelar una cita, comunícate directamente con
            nuestro equipo.
          </p>
        </section>

        <GlassPanel className="px-6 py-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp"
                className={actionButtonClasses}
              >
                <MessageCircle className="h-5 w-5 text-[#25D366]" aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href={PHONE_TEL}
                aria-label="Llamar para gestionar la cita"
                className={actionButtonClasses}
              >
                <Phone className="h-5 w-5 text-white/80" aria-hidden="true" />
                Llamar
              </a>
            </div>

            <Link
              href="/agendar"
              className="text-sm text-[#B9C0CC] transition-colors hover:text-white"
            >
              Ir a agendar consulta
            </Link>

            <p className="text-center text-xs text-[#8C95A3]">
              La confirmación de cambios queda sujeta a respuesta de nuestro
              equipo.
            </p>
          </div>
        </GlassPanel>

        <p className="text-center text-xs text-[#8C95A3]">
          Teléfono:{" "}
          <a href={PHONE_TEL} className="transition-colors hover:text-white">
            {PHONE_DISPLAY}
          </a>
        </p>
      </main>

      <WhatsAppFloating />
    </div>
  );
}
