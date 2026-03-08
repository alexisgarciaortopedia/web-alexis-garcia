"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, MapPin, MessageCircle, Video } from "lucide-react";

type CardConfig = {
  key: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  href?: string;
  externalHref?: string;
  badge?: string;
  onClick?: () => void;
};

const cardBaseClasses =
  "group relative flex w-full items-center gap-4 rounded-[22px] border border-white/15 bg-white/5 px-5 py-4 text-left text-white/90 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/8 hover:shadow-[0_0_30px_rgba(124,169,255,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30";

export default function AgendarClient() {
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  }, []);

  useEffect(() => {
    if (!toastVisible) return;
    const timeout = window.setTimeout(() => setToastVisible(false), 2600);
    return () => window.clearTimeout(timeout);
  }, [toastVisible]);

  const cards: CardConfig[] = [
    {
      key: "whatsapp",
      title: "Agendar valoración",
      subtitle: "Respuesta rápida por WhatsApp.",
      icon: <MessageCircle className="h-6 w-6 text-white" />,
      externalHref:
        "https://wa.me/527731754638?text=Hola%20Dr%20Alexis%20Garcia,%20me%20gustaria%20informacion%20para%20agendar%20una%20consulta%20de%20Traumatologia%20y%20Ortopedia.",
    },
    {
      key: "doctoralia",
      title: "Agendar en Doctoralia",
      subtitle: "Reserva inmediata con horarios disponibles.",
      icon: <CalendarCheck className="h-6 w-6 text-white" />,
      badge: "Próximamente",
      onClick: () =>
        showToast("Doctoralia estará disponible próximamente."),
    },
    {
      key: "telemedicina",
      title: "Consulta en línea",
      subtitle:
        "Videoconsulta para orientación inicial y revisión de estudios.",
      icon: <Video className="h-6 w-6 text-white" />,
      href: "/#agendar?modalidad=telemedicina",
    },
    {
      key: "tula",
      title: "Consulta Presencial — Tula",
      subtitle: "Atención en consultorio.",
      icon: <MapPin className="h-6 w-6 text-white" />,
      href: "/#agendar?modalidad=tula",
    },
    {
      key: "pachuca",
      title: "Consulta Presencial — Pachuca",
      subtitle: "Próxima apertura.",
      icon: <MapPin className="h-6 w-6 text-white" />,
      badge: "Próximamente",
      onClick: () =>
        showToast(
          "La consulta presencial en Pachuca estará disponible próximamente."
        ),
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050608] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#0B1430_0%,rgba(5,6,8,0.92)_55%,#050608_100%)]" />
      <div className="pointer-events-none absolute -left-32 top-12 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(120,160,255,0.18),transparent_70%)] blur-[90px]" />
      <div className="pointer-events-none absolute -right-40 bottom-[-120px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(60,90,160,0.2),transparent_65%)] blur-[100px]" />

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-24 pt-16 text-center sm:px-10 lg:pt-20">
        <section className="flex flex-col items-center gap-4">
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] text-white">
            Agenda tu consulta
          </h1>
          <p className="max-w-2xl text-sm text-white/70 sm:text-base">
            Selecciona cómo deseas agendar tu valoración.
          </p>
        </section>

        <section className="mt-12 w-full max-w-[560px] space-y-6">
          {cards.map((card) => {
            const content = (
              <div className="flex w-full items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  {card.icon}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-white">{card.title}</p>
                    {card.badge && (
                      <span className="rounded-full border border-white/20 px-3 py-1 text-[11px] text-white/70">
                        {card.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-white/65">
                    {card.subtitle}
                  </p>
                  {card.key === "tula" && (
                    <p className="mt-2 text-xs text-white/50">Tula, Hidalgo.</p>
                  )}
                </div>
              </div>
            );

            if (card.externalHref) {
              return (
                <a
                  key={card.key}
                  href={card.externalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardBaseClasses}
                >
                  {content}
                </a>
              );
            }

            if (card.href) {
              return (
                <Link key={card.key} href={card.href} className={cardBaseClasses}>
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={card.key}
                type="button"
                onClick={card.onClick}
                className={cardBaseClasses}
              >
                {content}
              </button>
            );
          })}
        </section>

        <section className="mt-16 flex flex-col items-center gap-4 text-center">
          <Image
            src="/brand/ag-logo.png"
            alt="AG logo"
            width={120}
            height={120}
            className="h-auto w-[110px] opacity-90"
          />
          <div className="font-serif text-2xl text-white">Dr Alexis García</div>
          <div className="text-sm text-white/65">
            <p>Diagnóstico claro. Plan preciso.</p>
            <p>Recuperación con objetivos.</p>
          </div>
        </section>
      </main>

      <div className="pointer-events-none absolute bottom-0 right-0 z-0 w-[220px] sm:w-[300px] lg:w-[360px]">
        <Image
          src="/brand/dr-alexis.png"
          alt="Dr Alexis García"
          width={720}
          height={900}
          className="h-auto w-full object-contain opacity-80"
          priority
        />
      </div>

      {toastVisible && (
        <div className="fixed bottom-6 left-1/2 z-30 -translate-x-1/2">
          <div
            role="status"
            className="rounded-full border border-white/15 bg-[#0C111C]/90 px-6 py-3 text-sm text-white shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          >
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}
