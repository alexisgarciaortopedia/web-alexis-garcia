"use client";

import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import GlassPanel from "@/components/GlassPanel";
import Header from "@/components/Header";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { PhoneIcon } from "@/components/Icons";
import { CLINIC_LOCATIONS } from "@/lib/locations";

const WHATSAPP_MESSAGE =
  "Hola, vengo de la página del Dr. Alexis García. Me gustaría agendar una consulta.\nRef: WEB-2026";
const WHATSAPP_URL = `https://wa.me/527731754638?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;
const PHONE_TEL = "tel:+527731754638";
const PHONE_DISPLAY = "773 175 4638";

const MODALITIES = [
  `Consulta presencial en ${CLINIC_LOCATIONS.tula.publicLabel}`,
  `Consulta presencial en ${CLINIC_LOCATIONS.pachuca.publicLabel}`,
  "Telemedicina",
];

const cardBaseClasses =
  "group flex w-full items-center justify-center gap-3 rounded-[22px] border border-white/20 bg-white/6 px-6 py-5 text-center text-sm font-semibold text-white backdrop-blur-[22px] shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30";

export default function AgendarClient() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050608] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050608_0%,#0B0F17_50%,#050608_100%)]" />
      <div className="pointer-events-none absolute -right-28 top-16 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(148,156,170,0.18),transparent_70%)] blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-20" />

      <Header />

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-10 px-8 pb-24 pt-10 sm:px-10 lg:pt-14">
        <section className="flex flex-col gap-4 text-center">
          <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] text-white">
            Agenda tu consulta
          </h1>
          <p className="text-sm text-[#B9C0CC] sm:text-base">
            Nuestro equipo te ayudará a confirmar la sede, el horario y la
            disponibilidad que mejor se adapten a tus necesidades.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agendar por WhatsApp"
            className={`${cardBaseClasses} bg-[linear-gradient(180deg,rgba(37,211,102,0.16),rgba(255,255,255,0.06))]`}
          >
            <MessageCircle className="h-5 w-5 text-[#25D366]" aria-hidden="true" />
            Agendar por WhatsApp
          </a>

          <a
            href={PHONE_TEL}
            aria-label="Llamar para agendar"
            className={cardBaseClasses}
          >
            <Phone className="h-5 w-5 text-white/80" aria-hidden="true" />
            Llamar para agendar
            <span className="sr-only">{PHONE_DISPLAY}</span>
          </a>
        </section>

        <p className="text-center text-xs text-[#8C95A3] sm:text-sm">
          La cita queda confirmada únicamente después de recibir respuesta de
          nuestro equipo.
        </p>

        <GlassPanel className="px-6 py-6">
          <div className="flex flex-col gap-4 text-sm text-[#B9C0CC]">
            <p className="font-serif text-base text-white">
              Modalidades disponibles
            </p>
            <ul className="flex flex-col gap-2">
              {MODALITIES.map((modality) => (
                <li key={modality} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />
                  <span>{modality}</span>
                </li>
              ))}
            </ul>
          </div>
        </GlassPanel>

        <div className="flex justify-center">
          <Link
            href="/ubicaciones"
            className="text-sm text-[#B9C0CC] transition-colors hover:text-white"
          >
            Consultar sedes y horarios
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-white/70">
          <PhoneIcon className="h-4 w-4 text-white/80" aria-hidden="true" />
          <a
            href={PHONE_TEL}
            className="transition-colors hover:text-white"
            aria-label={`Llamar al ${PHONE_DISPLAY}`}
          >
            {PHONE_DISPLAY}
          </a>
        </div>
      </main>

      <WhatsAppFloating />
    </div>
  );
}
