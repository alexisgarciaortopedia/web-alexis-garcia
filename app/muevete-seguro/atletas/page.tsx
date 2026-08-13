import { ArrowDown } from "lucide-react";
import { GlassCard } from "../../centros-deportivos/GlassCard";
import { ScrollReveal } from "../../centros-deportivos/ScrollReveal";
import { WhatsAppDemo } from "../../centros-deportivos/WhatsAppDemo";

const WHATSAPP_NUMBER = "527731754638";

function buildWhatsAppUrl(message: string) {
  const digits = WHATSAPP_NUMBER.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

const WHATSAPP_SIN_CENTRO = buildWhatsAppUrl(
  "Hola, quiero contarles dónde entreno para que Muévete Seguro llegue a mi centro deportivo.",
);

const NAV_LINKS = [
  { href: "#que-recibes", label: "Qué recibes" },
  { href: "#demo", label: "La demo" },
  { href: "#respaldo", label: "Respaldo médico" },
  { href: "#como-entrar", label: "Cómo entrar" },
];

const QUE_RECIBES = [
  "Alguien que te responde cuando algo te molesta, sin cita y sin esperar.",
  "Seguimiento de verdad: te escriben para ver cómo vas.",
  "Detección temprana de lo que puede volverse lesión.",
  "Respaldo de un equipo médico especializado en deporte, con precio preferente cuando necesitas consulta.",
  "Informes de seguimiento revisados y firmados por un médico.",
];

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.1 17.3c-.2-.1-1.1-.5-1.3-.6-.2-.1-.4-.1-.6.1-.2.2-.7.6-.8.8-.1.1-.3.2-.5.1-.2-.1-.9-.3-1.7-1-.6-.6-1-1.4-1.1-1.6-.1-.2 0-.3.1-.4.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.1 0-.3 0-.4 0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.5.3-.2.2-.7.7-.7 1.7s.7 2 .8 2.1c.1.1 1.5 2.3 3.7 3.3 2.2 1 2.2.7 2.6.7.4-.1 1.1-.4 1.3-.8.2-.4.2-.7.1-.8-.1-.1-.2-.1-.4-.2Z" />
      <path d="M16 3C9.4 3 4 8.4 4 15c0 2 .5 3.9 1.5 5.6L4 29l8.6-1.4c1.5.8 3.2 1.2 4.9 1.2 6.6 0 12-5.4 12-12S22.6 3 16 3Zm0 22.2c-1.6 0-3.1-.4-4.5-1.2l-.7-.4-5 .8.8-4.9-.4-.7c-.8-1.4-1.2-3-1.2-4.5 0-5.1 4.2-9.3 9.3-9.3s9.3 4.2 9.3 9.3-4.2 9.3-9.3 9.3Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="mt-0.5 h-4 w-4 shrink-0 text-teal-400"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function MueveteSeguroPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050608] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050608_0%,#071018_45%,#050608_100%)]" />
      <div className="pointer-events-none absolute -right-32 top-0 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.13),transparent_70%)] blur-[100px]" />
      <div className="pointer-events-none absolute -left-32 top-[30%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.1),transparent_70%)] blur-[110px]" />
      <div className="pointer-events-none absolute right-[10%] top-[85%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.09),transparent_70%)] blur-[110px]" />

      {/* Nav interna */}
      <header className="relative z-20 border-b border-white/5 bg-[#050608]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">Ortik</span>
            <span className="text-sm font-semibold text-white">Muévete Seguro</span>
          </div>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#B9C0CC] sm:text-sm">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-teal-300">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
        {/* 1. Apertura */}
        <section className="mb-28 flex flex-col gap-8 sm:mb-32" aria-labelledby="hero-title">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-teal-500/25 bg-teal-500/10 px-4 py-1.5 text-xs font-medium text-teal-300">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
              Para quien entrena
            </div>
            <h1
              id="hero-title"
              className="max-w-3xl font-serif text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.05] tracking-[-0.02em] text-white"
            >
              ¿Eso que te duele es normal, o deberías parar?
            </h1>
            <p className="max-w-[65ch] text-base leading-relaxed text-[#C5CDD9] sm:text-lg">
              Muévete Seguro es seguimiento con supervisión médica por
              WhatsApp: le cuentas a Luna lo que te pasa y sabes, a tiempo,
              si puedes seguir entrenando o necesitas que te revisen.
            </p>
          </div>

          <a
            href="#como-entrar"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-[#050608] shadow-[0_12px_30px_rgba(45,212,191,0.22)] transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:bg-teal-400 hover:shadow-[0_16px_38px_rgba(45,212,191,0.34)]"
          >
            Así entras
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
        </section>

        {/* 2. Qué recibes */}
        <section id="que-recibes" className="mb-28 scroll-mt-24 sm:mb-32">
          <ScrollReveal>
            <h2 className="mb-8 font-serif text-3xl leading-tight tracking-[-0.01em] text-white sm:text-4xl">
              Qué recibes
            </h2>
          </ScrollReveal>
          <ScrollReveal delayMs={90}>
            <GlassCard className="p-6 sm:p-8">
              <ul className="flex flex-col gap-4">
                {QUE_RECIBES.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[#C5CDD9] sm:text-base">
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </ScrollReveal>
        </section>

        {/* 3. La demo */}
        <section id="demo" className="relative mb-28 scroll-mt-24 sm:mb-32">
          <div className="pointer-events-none absolute left-1/2 top-10 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.1),transparent_70%)] blur-[90px]" />
          <ScrollReveal>
            <h2 className="mb-3 font-serif text-3xl leading-tight tracking-[-0.01em] text-white sm:text-4xl">
              Así te responde Luna
            </h2>
            <p className="mb-10 max-w-[65ch] text-sm leading-relaxed text-[#9AA3B2] sm:text-base">
              Conversaciones reales, con datos modificados. Podría ser la
              tuya.
            </p>
          </ScrollReveal>
          <ScrollReveal delayMs={120}>
            <div className="mx-auto max-w-md">
              <WhatsAppDemo />
            </div>
          </ScrollReveal>
        </section>

        {/* 4. Respaldo médico */}
        <ScrollReveal>
          <section id="respaldo" className="relative mb-28 scroll-mt-24 sm:mb-32">
            <div className="pointer-events-none absolute -right-16 -top-16 -z-10 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.14),transparent_70%)] blur-[90px]" />
            <GlassCard className="border-teal-500/25 bg-gradient-to-br from-teal-500/10 to-blue-500/8 p-8 sm:p-12">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
                Quién firma
              </span>
              <h2 className="mb-4 mt-3 font-serif text-3xl leading-[1.08] tracking-[-0.015em] text-white sm:text-5xl">
                Dr. Alexis Eduardo García de los Santos
              </h2>
              <p className="mb-6 text-base text-[#C5CDD9] sm:text-lg">Traumatología y Ortopedia</p>
              <div className="flex flex-col gap-1.5 text-sm text-[#9AA3B2] sm:text-base">
                <p>Cédula Profesional 12314318</p>
                <p>Cédula de Especialidad 15549455</p>
              </div>
              <p className="mt-7 max-w-[65ch] text-sm leading-relaxed text-[#B9C0CC] sm:text-base">
                Cada señal que le cuentas a Luna pasa frente a un
                traumatólogo antes de llegar a ti. No es una app cualquiera
                respondiéndote -- es seguimiento real, con alguien
                capacitado detrás.
              </p>
            </GlassCard>
          </section>
        </ScrollReveal>

        {/* 5. Cómo entrar */}
        <section id="como-entrar" className="mb-28 scroll-mt-24 sm:mb-32">
          <ScrollReveal>
            <h2 className="mb-8 font-serif text-3xl leading-tight tracking-[-0.01em] text-white sm:text-4xl">
              Cómo entrar
            </h2>
          </ScrollReveal>
          <ScrollReveal delayMs={90}>
            <GlassCard className="p-8 text-center sm:p-12">
              <p className="font-serif text-2xl leading-snug tracking-[-0.01em] text-white sm:text-3xl">
                Pide tu código en tu centro deportivo.
              </p>
              <p className="mx-auto mt-4 max-w-[50ch] text-sm leading-relaxed text-[#B9C0CC] sm:text-base">
                Tu gimnasio, box o academia te lo da. Lo escribes la primera
                vez que le hablas a Luna por WhatsApp, y ya -- sin registros,
                sin trámites.
              </p>
            </GlassCard>
          </ScrollReveal>
        </section>

        {/* 6. Salida secundaria -- discreta, al final, nunca compite con
            "Cómo entrar". */}
        <ScrollReveal>
          <section id="contacto" className="mb-10 scroll-mt-24 text-center">
            <h2 className="mb-2 text-base font-semibold text-white sm:text-lg">
              ¿Tu centro deportivo todavía no lo tiene?
            </h2>
            <p className="mb-5 text-sm text-[#8C95A3]">Escríbenos y dinos dónde entrenas.</p>
            <a
              href={WHATSAPP_SIN_CENTRO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-medium text-[#C5CDD9] transition-colors hover:border-teal-500/30 hover:text-teal-300 sm:text-sm"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Escribir por WhatsApp
            </a>
          </section>
        </ScrollReveal>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-[#050608]/90 px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs leading-relaxed text-[#6B7280] sm:text-sm">
            Muévete Seguro by Ortik es una iniciativa médico-deportiva
            vinculada a la práctica profesional del Dr. Alexis García. No
            sustituye una consulta médica ni la atención de urgencias -- ante
            una emergencia, acude directo al servicio médico correspondiente.
          </p>
          <p className="mt-3 text-center text-xs text-[#4B5563]">
            Responsable: Dr. Alexis Eduardo García de los Santos.
          </p>
          <p className="mt-3 text-center text-xs text-[#4B5563]">
            <a href="/privacidad" className="underline decoration-white/20 underline-offset-2 transition-colors hover:text-[#8C95A3]">
              Aviso de privacidad
            </a>
          </p>
          <p className="mt-3 text-center text-xs text-[#4B5563]">
            © {new Date().getFullYear()} Muévete Seguro by Ortik
          </p>
        </div>
      </footer>
    </div>
  );
}
