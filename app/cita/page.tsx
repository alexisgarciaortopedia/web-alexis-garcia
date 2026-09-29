"use client";

import Link from "next/link";
import ContactOptions from "@/components/ContactOptions";
import GlassPanel from "@/components/GlassPanel";
import Header from "@/components/Header";
import WhatsAppFloating from "@/components/WhatsAppFloating";

const WHATSAPP_MESSAGE =
  "Hola, vengo de la página del Dr. Alexis García. Me gustaría reprogramar o cancelar mi cita.";

export default function CitaPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink-900">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050608_0%,#0B0F17_50%,#050608_100%)]" />
      <div className="pointer-events-none absolute -right-28 top-16 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(148,156,170,0.18),transparent_70%)] blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-20" />

      <Header />

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-10 px-8 pb-24 pt-10 sm:px-10 lg:pt-14">
        <section className="flex flex-col gap-4 text-center">
          <h1 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
            Gestión de cita
          </h1>
          <p className="text-sm text-text-secondary sm:text-base">
            Para reprogramar o cancelar una cita, comunícate directamente con
            nuestro equipo.
          </p>
        </section>

        <GlassPanel className="px-6 py-8">
          <div className="flex flex-col items-center gap-6">
            <ContactOptions message={WHATSAPP_MESSAGE} />

            <Link
              href="/agendar"
              className="text-sm text-text-secondary transition-colors hover:text-white"
            >
              Ir a agendar consulta
            </Link>

            <p className="text-center text-xs text-text-muted">
              La confirmación de cambios queda sujeta a respuesta de nuestro
              equipo.
            </p>
          </div>
        </GlassPanel>
      </main>

      <WhatsAppFloating />
    </div>
  );
}
