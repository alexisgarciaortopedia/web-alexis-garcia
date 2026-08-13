import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "../centros-deportivos/GlassCard";
import { ScrollReveal } from "../centros-deportivos/ScrollReveal";

const PUERTAS = [
  {
    href: "/muevete-seguro/atletas",
    eyebrow: "Para deportistas",
    frase: "Entrenas, te preocupa una molestia, y quieres que alguien real te diga si debes parar.",
    entrar: "Entra aquí",
  },
  {
    href: "/centros-deportivos",
    eyebrow: "Para centros deportivos",
    frase: "Diriges un gimnasio, box o academia, y no quieres perder socios por una lesión mal atendida.",
    entrar: "Entra aquí",
  },
] as const;

export default function MueveteSeguroPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050608] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050608_0%,#071018_45%,#050608_100%)]" />
      <div className="pointer-events-none absolute -right-32 top-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.11),transparent_70%)] blur-[110px]" />
      <div className="pointer-events-none absolute -left-32 top-[35%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08),transparent_70%)] blur-[120px]" />
      <div className="pointer-events-none absolute right-[12%] top-[90%] h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.08),transparent_70%)] blur-[110px]" />

      {/* Marca -- sin nav, sin botón: nada compite con la apertura. */}
      <header className="relative z-20 px-5 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-5xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-400">Ortik</span>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-5 pb-28 sm:px-8">
        {/* 1. Apertura -- amplia, sin botones. */}
        <section className="mb-32 flex flex-col items-center gap-8 py-8 text-center sm:mb-40 sm:py-16">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-400">
            Muévete Seguro by Ortik
          </span>
          <h1 className="max-w-4xl font-serif text-[clamp(2.5rem,7vw,4.75rem)] leading-[1.02] tracking-[-0.03em] text-white">
            Seguimiento de molestias y lesiones por WhatsApp, con supervisión
            médica.
          </h1>
        </section>

        {/* 2. Qué es */}
        <ScrollReveal>
          <section className="mb-32 flex justify-center sm:mb-40">
            <p className="max-w-[65ch] text-center text-base leading-relaxed text-[#C5CDD9] sm:text-lg">
              Cuando algo te molesta o te duele mientras entrenas, le
              escribes a Luna por WhatsApp y te ayuda a entender qué tan en
              serio tomarlo. Si hace falta, un traumatólogo revisa tu caso y
              firma el seguimiento. Los centros deportivos lo ofrecen a sus
              socios repartiendo un código de acceso. No reemplaza a tu
              entrenador ni a tu médico -- los conecta mejor.
            </p>
          </section>
        </ScrollReveal>

        {/* 3. Las dos puertas -- la pieza central. */}
        <section className="mb-32 sm:mb-40">
          <div className="grid gap-5 sm:grid-cols-2">
            {PUERTAS.map((puerta, i) => (
              <ScrollReveal key={puerta.href} delayMs={i * 100}>
                <Link href={puerta.href} className="group block h-full">
                  <GlassCard className="flex h-full flex-col justify-between p-8 transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-teal-400/40 hover:shadow-[0_24px_60px_-24px_rgba(45,212,191,0.3)] sm:p-10">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
                        {puerta.eyebrow}
                      </span>
                      <p className="mt-5 font-serif text-2xl leading-snug tracking-[-0.01em] text-white sm:text-3xl">
                        {puerta.frase}
                      </p>
                    </div>
                    <div className="mt-9 flex items-center gap-2 text-sm font-medium text-teal-300">
                      {puerta.entrar}
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </div>
                  </GlassCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* 4. Respaldo médico -- el mayor peso visual de la página. */}
        <ScrollReveal>
          <section className="relative mb-32 sm:mb-40">
            <div className="pointer-events-none absolute -right-20 -top-20 -z-10 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.16),transparent_70%)] blur-[110px]" />
            <GlassCard className="border-teal-500/25 bg-gradient-to-br from-teal-500/10 to-blue-500/8 p-8 sm:p-16">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-400">
                Respaldo médico
              </span>
              <h2 className="mb-5 mt-4 font-serif text-4xl leading-[1.04] tracking-[-0.02em] text-white sm:text-6xl">
                Dr. Alexis Eduardo García de los Santos
              </h2>
              <p className="mb-7 text-lg text-[#C5CDD9] sm:text-xl">Traumatología y Ortopedia</p>
              <div className="flex flex-col gap-2 text-sm text-[#9AA3B2] sm:text-base">
                <p>Cédula Profesional 12314318</p>
                <p>Cédula de Especialidad 15549455</p>
                <p>Consejo Mexicano de Ortopedia y Traumatología -- registro 1/8697/26</p>
              </div>
              <p className="mt-8 max-w-[65ch] text-sm leading-relaxed text-[#B9C0CC] sm:text-base">
                Consulta en Tula de Allende y Pachuca de Soto, Hidalgo.
              </p>
            </GlassCard>
          </section>
        </ScrollReveal>

        {/* 5. Los límites -- dichos con orgullo. */}
        <ScrollReveal>
          <section className="mb-32 text-center sm:mb-40">
            <p className="mx-auto max-w-[60ch] font-serif text-2xl leading-snug tracking-[-0.01em] text-white sm:text-3xl">
              Luna no diagnostica, no receta ni autoriza a competir.
            </p>
            <p className="mx-auto mt-5 max-w-[65ch] text-sm leading-relaxed text-[#9AA3B2] sm:text-base">
              Toda valoración clínica y todo informe firmado provienen de un
              médico. Eso no resta -- es lo que separa un servicio serio de
              una app cualquiera.
            </p>
          </section>
        </ScrollReveal>
      </main>

      {/* 6. Cierre -- sobrio. */}
      <footer className="relative z-10 border-t border-white/5 bg-[#050608]/90 px-5 py-10 sm:px-8">
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
            <a
              href="/privacidad"
              className="underline decoration-white/20 underline-offset-2 transition-colors hover:text-[#8C95A3]"
            >
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
