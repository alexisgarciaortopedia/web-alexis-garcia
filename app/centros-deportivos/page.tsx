import { ScrollReveal } from "./ScrollReveal";
import { WhatsAppDemo } from "./WhatsAppDemo";

const WHATSAPP_NUMBER = "527731754638";

function buildWhatsAppUrl(message: string) {
  const digits = WHATSAPP_NUMBER.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

const WHATSAPP_DEMO = buildWhatsAppUrl(
  "Hola, quiero agendar una demostración de Muévete Seguro para mi centro deportivo.",
);

const NAV_LINKS = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#demo", label: "La demo" },
  { href: "#respaldo", label: "Respaldo médico" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#contacto", label: "Contacto" },
];

const PASOS = [
  {
    num: "1",
    title: "El socio escribe por WhatsApp",
    description:
      "Cuando algo le molesta o le duele, le escribe a Luna -- sin instalar nada, sin registrarse en otro lado.",
  },
  {
    num: "2",
    title: "Luna da seguimiento y detecta señales",
    description:
      "Conversa con el socio, entiende su situación y clasifica la molestia en un semáforo verde, ámbar o rojo.",
  },
  {
    num: "3",
    title: "El equipo médico revisa y firma",
    description:
      "Cuando una señal lo amerita, un traumatólogo la revisa y decide la ruta de atención -- nunca lo decide el sistema solo.",
  },
];

const BENEFICIOS = [
  {
    title: "Retiene socios",
    description:
      "Cuando una molestia se atiende a tiempo, el socio sigue entrenando en vez de desaparecer de tu centro.",
  },
  {
    title: "Te diferencia de la competencia",
    description:
      "Pocos centros deportivos pueden ofrecer seguimiento con respaldo médico real a sus socios.",
  },
  {
    title: "No te cuesta trabajo operarlo",
    description:
      "Tu equipo no da seguimiento clínico ni contesta preguntas de salud -- de eso se encarga el sistema.",
  },
  {
    title: "Reporte mensual agregado",
    description:
      "Recibes información general de tu centro -- nunca datos individuales ni el detalle de ningún socio.",
  },
];

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.1 17.3c-.2-.1-1.1-.5-1.3-.6-.2-.1-.4-.1-.6.1-.2.2-.7.6-.8.8-.1.1-.3.2-.5.1-.2-.1-.9-.3-1.7-1-.6-.6-1-1.4-1.1-1.6-.1-.2 0-.3.1-.4.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.1 0-.3 0-.4 0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.5.3-.2.2-.7.7-.7 1.7s.7 2 .8 2.1c.1.1 1.5 2.3 3.7 3.3 2.2 1 2.2.7 2.6.7.4-.1 1.1-.4 1.3-.8.2-.4.2-.7.1-.8-.1-.1-.2-.1-.4-.2Z" />
      <path d="M16 3C9.4 3 4 8.4 4 15c0 2 .5 3.9 1.5 5.6L4 29l8.6-1.4c1.5.8 3.2 1.2 4.9 1.2 6.6 0 12-5.4 12-12S22.6 3 16 3Zm0 22.2c-1.6 0-3.1-.4-4.5-1.2l-.7-.4-5 .8.8-4.9-.4-.7c-.8-1.4-1.2-3-1.2-4.5 0-5.1 4.2-9.3 9.3-9.3s9.3 4.2 9.3 9.3-4.2 9.3-9.3 9.3Z" />
    </svg>
  );
}

function FlechaRiesgo() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 text-[#4B5563]"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function CentrosDeportivosPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050608] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050608_0%,#071018_45%,#050608_100%)]" />
      <div className="pointer-events-none absolute -right-32 top-0 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.14),transparent_70%)] blur-[100px]" />
      <div className="pointer-events-none absolute -left-32 top-[30%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_70%)] blur-[110px]" />

      {/* Nav interna */}
      <header className="relative z-20 border-b border-white/5 bg-[#050608]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
              Ortik
            </span>
            <span className="text-sm font-semibold text-white">
              Muévete Seguro para centros deportivos
            </span>
          </div>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#B9C0CC] sm:text-sm">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-teal-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_DEMO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-teal-500 px-3.5 py-1.5 text-xs font-semibold text-[#050608] transition-colors hover:bg-teal-400"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
              Agendar demo
            </a>
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
        {/* 1. Apertura */}
        <section className="mb-20 flex flex-col gap-8" aria-labelledby="hero-title">
          <div className="flex flex-col gap-5">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-teal-500/25 bg-teal-500/10 px-4 py-1.5 text-xs font-medium text-teal-300">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
              Para dueños de centros deportivos
            </div>
            <h1
              id="hero-title"
              className="font-serif text-[clamp(2rem,5vw,3.25rem)] leading-[1.12] tracking-tight text-white"
            >
              No pierdes socios por precio. Los pierdes cuando se lesionan y
              nadie actúa a tiempo.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-[#C5CDD9] sm:text-lg">
              Muévete Seguro es seguimiento con supervisión médica por
              WhatsApp para los socios de tu centro: cuando algo les duele,
              alguien se entera a tiempo y actúa.
            </p>
          </div>

          <a
            href={WHATSAPP_DEMO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-[#050608] shadow-[0_12px_30px_rgba(45,212,191,0.25)] transition-colors hover:bg-teal-400"
          >
            <WhatsAppIcon />
            Agendar una demostración por WhatsApp
          </a>

          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#8C95A3] sm:text-sm">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[#B9C0CC]">
              Molestia
            </span>
            <FlechaRiesgo />
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[#B9C0CC]">
              Ausencia
            </span>
            <FlechaRiesgo />
            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-red-300">
              Baja del socio
            </span>
          </div>
        </section>

        {/* 2. Cómo funciona */}
        <ScrollReveal>
          <section id="como-funciona" className="mb-20 scroll-mt-24">
            <h2 className="mb-6 font-serif text-2xl text-white sm:text-3xl">
              Cómo funciona
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {PASOS.map((paso) => (
                <div
                  key={paso.num}
                  className="rounded-[20px] border border-white/10 bg-[rgba(16,18,22,0.45)] p-5 backdrop-blur-[20px]"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/30 to-blue-500/30 text-sm font-bold text-teal-300">
                      {paso.num}
                    </span>
                    <h3 className="text-sm font-semibold text-white sm:text-base">
                      {paso.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#9AA3B2]">
                    {paso.description}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-[16px] border border-white/8 bg-white/3 px-4 py-3 text-xs leading-relaxed text-[#8C95A3] sm:text-sm">
              Luna no diagnostica, no receta y no autoriza a competir. Eso es
              lo que le da seriedad.
            </p>
          </section>
        </ScrollReveal>

        {/* 3. La demo */}
        <ScrollReveal>
          <section id="demo" className="mb-20 scroll-mt-24">
            <h2 className="mb-2 font-serif text-2xl text-white sm:text-3xl">
              Así se ve en la vida real
            </h2>
            <p className="mb-6 max-w-2xl text-sm leading-relaxed text-[#9AA3B2] sm:text-base">
              Una conversación real, con datos modificados, de cómo Luna
              responde cuando un socio le escribe.
            </p>
            <div className="mx-auto max-w-md">
              <WhatsAppDemo />
            </div>
          </section>
        </ScrollReveal>

        {/* 4. Respaldo médico */}
        <ScrollReveal>
          <section
            id="respaldo"
            className="mb-20 scroll-mt-24 rounded-[24px] border border-teal-500/25 bg-gradient-to-br from-teal-500/10 to-blue-500/8 p-6 sm:p-10"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
              Respaldo médico
            </span>
            <h2 className="mb-4 mt-3 font-serif text-2xl text-white sm:text-4xl">
              Dr. Alexis Eduardo García de los Santos
            </h2>
            <p className="mb-5 text-base text-[#C5CDD9] sm:text-lg">
              Traumatología y Ortopedia
            </p>
            <div className="flex flex-col gap-1.5 text-sm text-[#9AA3B2] sm:text-base">
              <p>Cédula Profesional 12314318</p>
              <p>Cédula de Especialidad 15549455</p>
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[#B9C0CC] sm:text-base">
              Cada señal que Luna detecta pasa frente a un traumatólogo antes
              de convertirse en una recomendación. Eso es lo que separa esto
              de una app cualquiera.
            </p>
          </section>
        </ScrollReveal>

        {/* 5. Lo que gana el centro */}
        <ScrollReveal>
          <section id="beneficios" className="mb-20 scroll-mt-24">
            <h2 className="mb-6 font-serif text-2xl text-white sm:text-3xl">
              Lo que gana tu centro
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {BENEFICIOS.map((beneficio) => (
                <div
                  key={beneficio.title}
                  className="rounded-[20px] border border-white/10 bg-[rgba(16,18,22,0.45)] p-5 backdrop-blur-[20px]"
                >
                  <h3 className="mb-2 text-sm font-semibold text-white sm:text-base">
                    {beneficio.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#9AA3B2]">
                    {beneficio.description}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-[16px] border border-white/8 bg-white/3 px-4 py-3 text-xs leading-relaxed text-[#8C95A3] sm:text-sm">
              Tu centro solo reparte códigos de acceso. Del resto -- la
              conversación, el seguimiento, la revisión médica -- se encarga
              el sistema.
            </p>
          </section>
        </ScrollReveal>

        {/* 6. Cierre */}
        <ScrollReveal>
          <section
            id="contacto"
            className="mb-10 scroll-mt-24 rounded-[24px] border border-white/10 bg-[rgba(16,18,22,0.55)] p-6 text-center backdrop-blur-[24px] sm:p-10"
          >
            <h2 className="mb-3 font-serif text-2xl text-white sm:text-3xl">
              Prueba un mes sin costo para tu centro.
            </h2>
            <p className="mx-auto mb-7 max-w-xl text-sm leading-relaxed text-[#B9C0CC] sm:text-base">
              Sin instalar nada, sin cambiar tu operación.
            </p>
            <a
              href={WHATSAPP_DEMO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-[#050608] shadow-[0_12px_30px_rgba(45,212,191,0.25)] transition-colors hover:bg-teal-400"
            >
              <WhatsAppIcon />
              Agendar una demostración por WhatsApp
            </a>
          </section>
        </ScrollReveal>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-[#050608]/90 px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs leading-relaxed text-[#6B7280] sm:text-sm">
            Muévete Seguro by Ortik es una iniciativa médico-deportiva
            vinculada a la práctica profesional del Dr. Alexis García.
          </p>
          <p className="mt-3 text-center text-xs text-[#4B5563]">
            Responsable: Dr. Alexis Eduardo García de los Santos.
          </p>
          <p className="mt-3 text-center text-xs text-[#4B5563]">
            © {new Date().getFullYear()} Muévete Seguro by Ortik
          </p>
        </div>
      </footer>
    </div>
  );
}
