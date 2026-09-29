"use client";

import Link from "next/link";
import ContactOptions from "@/components/ContactOptions";
import GlassPanel from "@/components/GlassPanel";
import Header from "@/components/Header";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { CLINIC_LOCATIONS } from "@/lib/locations";

const WHATSAPP_MESSAGE =
  "Hola, vengo de la página del Dr. Alexis García. Me gustaría agendar una consulta.";

const MODALITIES = [
  `Consulta presencial en ${CLINIC_LOCATIONS.tula.publicLabel}`,
  `Consulta presencial en ${CLINIC_LOCATIONS.pachuca.publicLabel}`,
  "Telemedicina",
];

export default function AgendarClient() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink-900 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050608_0%,#0B0F17_50%,#050608_100%)]" />
      <div className="pointer-events-none absolute -right-28 top-16 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(148,156,170,0.18),transparent_70%)] blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-20" />

      <Header />

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-10 px-8 pb-24 pt-10 sm:px-10 lg:pt-14">
        <section className="flex flex-col gap-4 text-center">
          <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] font-semibold text-white">
            Agenda tu consulta
          </h1>
          <p className="text-sm text-text-secondary sm:text-base">
            Nuestro equipo te ayudará a confirmar la sede, el horario y la
            disponibilidad que mejor se adapten a tus necesidades.
          </p>
        </section>

        <ContactOptions message={WHATSAPP_MESSAGE} />

        <p className="text-center text-xs text-text-muted sm:text-sm">
          La cita queda confirmada únicamente después de recibir respuesta de
          nuestro equipo.
        </p>

        <GlassPanel className="px-6 py-6">
          <div className="flex flex-col gap-4 text-sm text-text-secondary">
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
            className="text-sm text-text-secondary transition-colors hover:text-white"
          >
            Consultar sedes y horarios
          </Link>
        </div>
      </main>

      <WhatsAppFloating />
    </div>
  );
}
