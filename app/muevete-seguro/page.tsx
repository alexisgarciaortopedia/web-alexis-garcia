const WHATSAPP_NUMBER = "527713537099";
const CONTACT_EMAIL = "alexisgarciaortopedia@gmail.com";

function buildWhatsAppUrl(message: string) {
  const digits = WHATSAPP_NUMBER.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

const WHATSAPP_REGISTRO = buildWhatsAppUrl(
  "Hola, quiero registrarme en Muévete Seguro."
);
const WHATSAPP_GIMNASIO = buildWhatsAppUrl(
  "Hola, quiero recibir información para incorporar Muévete Seguro en mi gimnasio."
);
const WHATSAPP_ATENCION = buildWhatsAppUrl(
  "Hola, quiero solicitar atención médica mediante Muévete Seguro."
);

const NAV_LINKS = [
  { href: "#que-es", label: "Qué es" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#semaforo", label: "Semáforo" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#contacto", label: "Contacto" },
];

const STEPS = [
  {
    num: "1",
    title: "Inicia tu registro por WhatsApp",
    description: "Comienza con un mensaje sencillo y recibe orientación inmediata.",
  },
  {
    num: "2",
    title: "Responde preguntas breves y sencillas",
    description: "Cuestionarios conversacionales para conocer tu estado y carga.",
  },
  {
    num: "3",
    title: "Recibe seguimiento semanal supervisado",
    description: "Reportes periódicos con recomendaciones claras y personalizadas.",
  },
  {
    num: "4",
    title: "Solicita atención humana cuando lo necesites",
    description: "Canal directo cuando el semáforo o tus síntomas lo requieran.",
  },
];

const BENEFICIOS_DEPORTISTAS = [
  "Detección temprana de señales de alerta.",
  "Seguimiento semanal sencillo.",
  "Historial de molestias y recuperación.",
  "Recomendaciones personalizadas.",
  "Menos decisiones a ciegas.",
  "Acceso rápido a atención profesional cuando se requiere.",
];

const BENEFICIOS_GIMNASIOS = [
  "Servicio diferenciador para sus usuarios.",
  "Mayor percepción de profesionalismo.",
  "Seguimiento preventivo.",
  "Red médico-deportiva.",
  "Ruta clara de atención.",
  "Mejor experiencia para deportistas y miembros.",
];

const SEMAFORO = [
  {
    color: "verde",
    label: "Verde",
    text: "Puedes continuar entrenando con recomendaciones personalizadas.",
    dot: "bg-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    textColor: "text-emerald-300",
  },
  {
    color: "amarillo",
    label: "Amarillo",
    text: "Conviene ajustar carga, vigilar síntomas o seguir indicaciones específicas.",
    dot: "bg-amber-400",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    textColor: "text-amber-300",
  },
  {
    color: "rojo",
    label: "Rojo",
    text: "Necesitas valoración humana prioritaria y una ruta clara de atención.",
    dot: "bg-red-400",
    border: "border-red-500/30",
    bg: "bg-red-500/10",
    textColor: "text-red-300",
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
      <div className="pointer-events-none absolute -right-32 top-0 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.14),transparent_70%)] blur-[100px]" />
      <div className="pointer-events-none absolute -left-32 top-[30%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_70%)] blur-[110px]" />

      {/* Nav interna */}
      <header className="relative z-20 border-b border-white/5 bg-[#050608]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
              Ortik
            </span>
            <span className="text-sm font-semibold text-white">Muévete Seguro</span>
          </div>
          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#B9C0CC] sm:text-sm">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-teal-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
        {/* Hero */}
        <section className="mb-16 flex flex-col gap-8" aria-labelledby="hero-title">
          <div className="flex flex-col gap-5">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-teal-500/25 bg-teal-500/10 px-4 py-1.5 text-xs font-medium text-teal-300">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
              Monitoreo médico-deportivo preventivo
            </div>
            <h1
              id="hero-title"
              className="font-serif text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.08] tracking-tight text-white"
            >
              Muévete Seguro{" "}
              <span className="text-teal-400">by Ortik</span>
            </h1>
            <p className="max-w-2xl text-lg text-[#C5CDD9] sm:text-xl">
              Monitorea tu cuerpo. Detecta señales de alerta. Entrena con mayor
              seguridad.
            </p>
            <p className="max-w-2xl text-sm leading-relaxed text-[#9AA3B2] sm:text-base">
              Muévete Seguro es un sistema médico-deportivo de monitoreo
              preventivo para deportistas, gimnasios y equipos. Funciona
              principalmente por WhatsApp y ayuda a identificar oportunamente
              cuándo puedes continuar entrenando, cuándo conviene ajustar tu
              carga y cuándo necesitas atención profesional.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={WHATSAPP_REGISTRO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-[#050608] shadow-[0_12px_30px_rgba(45,212,191,0.25)] transition-colors hover:bg-teal-400"
            >
              <WhatsAppIcon />
              Registrarme por WhatsApp
            </a>
            <a
              href={WHATSAPP_GIMNASIO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-6 py-3 text-sm font-semibold text-blue-200 transition-colors hover:border-blue-400/60 hover:bg-blue-500/20"
            >
              <WhatsAppIcon />
              Solicitar información para mi gimnasio
            </a>
          </div>
        </section>

        {/* Qué es */}
        <section
          id="que-es"
          className="mb-16 scroll-mt-24 rounded-[24px] border border-white/10 bg-[rgba(16,18,22,0.55)] p-6 backdrop-blur-[24px] sm:p-8"
        >
          <h2 className="mb-4 font-serif text-2xl text-white sm:text-3xl">
            Qué es Muévete Seguro
          </h2>
          <div className="flex flex-col gap-4 text-sm leading-relaxed text-[#B9C0CC] sm:text-base">
            <p>
              Muévete Seguro acompaña al deportista mediante seguimiento
              periódico, cuestionarios conversacionales, historial de molestias,
              evaluación de carga, recuperación y orientación clara mediante un
              semáforo verde, amarillo o rojo.
            </p>
            <p className="border-l-2 border-teal-500/50 pl-4 text-[#C5CDD9]">
              No sustituye al entrenador, al médico ni al rehabilitador. Los
              conecta mejor.
            </p>
          </div>
        </section>

        {/* Cómo funciona */}
        <section id="como-funciona" className="mb-16 scroll-mt-24">
          <h2 className="mb-6 font-serif text-2xl text-white sm:text-3xl">
            Cómo funciona
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="rounded-[20px] border border-white/10 bg-[rgba(16,18,22,0.45)] p-5 backdrop-blur-[20px]"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/30 to-blue-500/30 text-sm font-bold text-teal-300">
                    {step.num}
                  </span>
                  <h3 className="text-sm font-semibold text-white sm:text-base">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-[#9AA3B2]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Semáforo */}
        <section id="semaforo" className="mb-16 scroll-mt-24">
          <h2 className="mb-6 font-serif text-2xl text-white sm:text-3xl">
            Semáforo
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {SEMAFORO.map((item) => (
              <div
                key={item.color}
                className={`rounded-[20px] border ${item.border} ${item.bg} p-5`}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className={`h-3 w-3 rounded-full ${item.dot}`} />
                  <h3 className={`text-sm font-semibold ${item.textColor}`}>
                    {item.label}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-[#B9C0CC]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 rounded-[16px] border border-white/8 bg-white/3 px-4 py-3 text-xs leading-relaxed text-[#8C95A3] sm:text-sm">
            El semáforo no representa un diagnóstico médico. Es una herramienta
            de orientación y detección temprana.
          </p>
        </section>

        {/* Beneficios */}
        <section id="beneficios" className="mb-16 scroll-mt-24">
          <h2 className="mb-6 font-serif text-2xl text-white sm:text-3xl">
            Beneficios
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[24px] border border-teal-500/20 bg-[rgba(16,18,22,0.55)] p-6 backdrop-blur-[24px]">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-teal-400">
                Para deportistas
              </h3>
              <ul className="flex flex-col gap-3">
                {BENEFICIOS_DEPORTISTAS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-[#B9C0CC]"
                  >
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[24px] border border-blue-500/20 bg-[rgba(16,18,22,0.55)] p-6 backdrop-blur-[24px]">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-blue-400">
                Para gimnasios
              </h3>
              <ul className="flex flex-col gap-3">
                {BENEFICIOS_GIMNASIOS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-[#B9C0CC]"
                  >
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Supervisión médica */}
        <section className="mb-16 rounded-[24px] border border-blue-500/20 bg-gradient-to-br from-blue-500/8 to-teal-500/8 p-6 sm:p-8">
          <h2 className="mb-4 font-serif text-xl text-white sm:text-2xl">
            Supervisión médica
          </h2>
          <p className="text-sm leading-relaxed text-[#B9C0CC] sm:text-base">
            Los reportes semanales de Muévete Seguro son revisados bajo
            supervisión médica antes de enviarse. La inteligencia artificial
            ayuda a organizar la información, identificar patrones y proponer
            recomendaciones, pero no sustituye el criterio profesional.
          </p>
        </section>

        {/* Contacto */}
        <section
          id="contacto"
          className="mb-16 scroll-mt-24 rounded-[24px] border border-white/10 bg-[rgba(16,18,22,0.55)] p-6 backdrop-blur-[24px] sm:p-8"
        >
          <h2 className="mb-2 font-serif text-2xl text-white sm:text-3xl">
            Contacto
          </h2>
          <p className="mb-6 text-sm text-[#9AA3B2]">
            Escríbenos por WhatsApp o correo para registrarte, incorporar el
            servicio en tu gimnasio o solicitar atención.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href={WHATSAPP_REGISTRO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-[#050608] transition-colors hover:bg-teal-400"
            >
              <WhatsAppIcon />
              Registrarme por WhatsApp
            </a>
            <a
              href={WHATSAPP_GIMNASIO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-6 py-3 text-sm font-semibold text-blue-200 transition-colors hover:border-blue-400/60 hover:bg-blue-500/20"
            >
              <WhatsAppIcon />
              Solicitar información para mi gimnasio
            </a>
            <a
              href={WHATSAPP_ATENCION}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <WhatsAppIcon />
              Solicitar atención médica
            </a>
          </div>
          <p className="mt-5 text-sm text-[#8C95A3]">
            Correo:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-teal-400 transition-colors hover:text-teal-300"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </section>

        {/* Disclaimer */}
        <section className="mb-10 rounded-[20px] border border-amber-500/25 bg-amber-500/8 p-5">
          <p className="text-sm leading-relaxed text-amber-100/90">
            <strong className="font-semibold text-amber-200">Importante: </strong>
            Muévete Seguro es una herramienta de monitoreo y acompañamiento
            médico-deportivo. No sustituye una consulta médica ni la atención de
            urgencias. Ante una emergencia, acude inmediatamente al servicio
            médico correspondiente.
          </p>
        </section>

        {/* Aviso de privacidad */}
        <section
          id="privacidad"
          className="mb-10 scroll-mt-24 rounded-[20px] border border-white/8 bg-[rgba(16,18,22,0.4)] p-5 sm:p-6"
        >
          <h2 className="mb-3 text-lg font-semibold text-white">
            Aviso de privacidad
          </h2>
          <p className="mb-3 text-sm leading-relaxed text-[#9AA3B2]">
            Muévete Seguro utiliza los datos proporcionados por sus usuarios
            exclusivamente para registro, seguimiento médico-deportivo,
            orientación preventiva y canalización a atención profesional cuando
            sea necesario. La información no sustituye una consulta médica. Para
            ejercer derechos relacionados con sus datos personales, el usuario
            podrá comunicarse mediante el correo de contacto indicado en esta
            página.
          </p>
          <p className="text-xs text-[#6B7280]">
            Este aviso básico podrá ampliarse posteriormente con una versión
            jurídica completa.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-[#050608]/90 px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs leading-relaxed text-[#6B7280] sm:text-sm">
            Muévete Seguro by Ortik es una iniciativa médico-deportiva vinculada
            a la práctica profesional del Dr. Alexis García.
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
