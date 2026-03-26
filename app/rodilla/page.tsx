import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import GlassPanel from "@/components/GlassPanel";
import Header from "@/components/Header";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { InstagramIcon, PhoneIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Dolor de rodilla en Tula | Traumatología y Ortopedia",
  description:
    "Valoración de dolor de rodilla en Tula por especialista en Traumatología y Ortopedia. Consulta programada y atención prioritaria.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://alexisgarciaortopedia.com/rodilla",
  },
};

const EVALUATION_STEPS = [
  {
    title: "Evaluación clínica dirigida",
    description:
      "Exploración estructurada para identificar origen del dolor y estructuras comprometidas.",
  },
  {
    title: "Análisis funcional",
    description: "Valoración del movimiento, carga y mecánica articular.",
  },
  {
    title: "Estudios de imagen",
    description:
      "Indicados solo cuando aportan información que cambia la conducta.",
  },
  {
    title: "Plan estructurado",
    description: "Tratamiento con objetivos claros, progresión y seguimiento.",
  },
];

export default function RodillaPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050608]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#020308_0%,#0A1322_50%,#050608_100%)]" />
      <div className="pointer-events-none absolute -right-28 top-6 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(118,146,186,0.25),transparent_70%)] blur-[130px]" />
      <div className="pointer-events-none absolute -left-32 top-[18%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(58,111,165,0.22),transparent_70%)] blur-[140px]" />
      <div className="pointer-events-none absolute left-1/2 top-[6%] h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,188,120,0.18),transparent_70%)] blur-[160px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(120,160,210,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(255,255,255,0.04),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-35" />

      <Header />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-8 pb-24 pt-10 sm:px-10 lg:pt-14">
        <section className="flex flex-col gap-6">
          <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h1 className="font-serif text-[clamp(3rem,5.2vw,4.6rem)] leading-[1.02] tracking-[0.01em] text-white">
                  Dolor de rodilla en Tula
                </h1>
                <p className="text-sm text-[#B9C0CC] sm:text-base">
                  Evaluación por especialista en Traumatología y Ortopedia
                </p>
              </div>

              <div className="relative overflow-hidden rounded-[22px] border border-white/15 bg-[rgba(12,16,24,0.68)] px-6 py-5 shadow-[0_35px_110px_rgba(2,6,12,0.65)] backdrop-blur-[30px]">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08),transparent_60%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_50%)]" />
                <div className="relative font-serif text-base text-white sm:text-lg">
                  <p>Diagnóstico claro. Plan preciso.</p>
                  <p>Recuperación con objetivos.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="https://alexisgarciaortopedia.com/agendar"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(12,18,28,0.7))] px-6 py-2 text-sm font-semibold text-white shadow-[0_20px_55px_rgba(2,6,12,0.65)] backdrop-blur-[20px] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(12,18,28,0.75))]"
                >
                  Agendar valoración
                </Link>
                <a
                  href="https://wa.me/527731754638?text=Hola%2C%20quiero%20agendar%20una%20valoraci%C3%B3n%20por%20dolor%20de%20rodilla."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-[rgba(255,255,255,0.04)] px-6 py-2 text-sm font-semibold text-white backdrop-blur-[18px] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.08)]"
                >
                  WhatsApp
                </a>
                <a
                  href="https://instagram.com/dralexisgarcia.ortopedia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-[rgba(255,255,255,0.04)] px-6 py-2 text-sm font-semibold text-white backdrop-blur-[18px] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.08)]"
                >
                  Instagram
                </a>
              </div>

              <p className="text-xs text-[#8C95A3] sm:text-sm">
                Valoración orientada por exploración clínica, análisis funcional
                y uso selectivo de estudios de imagen.
              </p>
            </div>

            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] border border-white/20 bg-[rgba(10,14,20,0.65)] shadow-[0_65px_160px_rgba(2,6,12,0.75)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_55%)]" />
              <Image
                src="/images/rodilla.jpg"
                alt="Dolor de rodilla"
                fill
                priority
                className="object-cover object-[50%_12%] opacity-98 [filter:contrast(1.2)_saturate(1.05)] [transform:scale(1.1)_translateY(-8%)] [mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.25)_28%,rgba(0,0,0,0.7)_52%,#000_74%,#000_100%)] [mask-size:100%_100%] [mask-repeat:no-repeat]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,8,0.92)_0%,rgba(5,6,8,0.78)_30%,rgba(5,6,8,0.45)_55%,rgba(5,6,8,0.18)_75%,rgba(5,6,8,0)_100%)]" />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(circle_at_0%_50%,rgba(5,6,8,0.75),transparent_60%)] blur-[10px]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_55%,rgba(255,166,96,0.25),transparent_45%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_60%_55%,rgba(255,210,160,0.18),transparent_35%)] blur-[18px]" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,8,0.05)_0%,rgba(5,6,8,0.45)_100%)]" />
            </div>
          </div>

          <GlassPanel className="relative overflow-hidden px-6 py-4 shadow-[0_40px_110px_rgba(2,6,12,0.65)]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.1),transparent_60%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_55%)]" />
            <div className="relative grid items-center divide-y divide-white/10 text-sm text-[#B9C0CC] sm:grid-cols-4 sm:divide-x sm:divide-y-0">
              <Link
                href="/agendar"
                className="flex items-center gap-2 px-2 py-2 text-white transition-colors hover:text-white/80 sm:py-0"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                <span>Agendar consulta</span>
              </Link>
              <a
                href="https://wa.me/527731754638?text=Hola%2C%20quiero%20agendar%20una%20valoraci%C3%B3n%20por%20dolor%20de%20rodilla."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-2 py-2 text-white transition-colors hover:text-white/80 sm:py-0"
              >
                <PhoneIcon className="h-4 w-4" />
                <span>WhatsApp prioritario</span>
              </a>
              <Link
                href="/agendar"
                className="flex items-center gap-2 px-2 py-2 text-white transition-colors hover:text-white/80 sm:py-0"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                <span>Consulta en línea</span>
              </Link>
              <a
                href="https://instagram.com/dralexisgarcia.ortopedia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-2 py-2 text-white transition-colors hover:text-white/80 sm:py-0"
              >
                <InstagramIcon className="h-4 w-4" />
                <span>Instagram</span>
              </a>
            </div>
          </GlassPanel>
        </section>

        <section className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="pointer-events-none absolute inset-x-0 -top-10 h-20 bg-[linear-gradient(180deg,rgba(5,6,8,0),rgba(5,6,8,0.4),rgba(5,6,8,0))]" />
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-2xl text-white sm:text-3xl">
              El dolor de rodilla no es un diagnóstico
            </h2>
            <div className="flex flex-col gap-4 text-sm text-[#B9C0CC] sm:text-base">
              <p>
                El dolor de rodilla puede relacionarse con sobrecarga, lesión
                meniscal, lesión ligamentaria, tendinopatías, desgaste articular
                o traumatismos.
              </p>
              <p>
                El reto no es solo identificar dónde duele, sino entender por
                qué duele, qué estructuras están implicadas y qué estudios
                realmente cambian la conducta.
              </p>
              <p>
                La evaluación clínica permite orientar el problema, priorizar
                estudios solo cuando aportan decisiones terapéuticas y definir
                un plan con objetivos claros.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[26px] border border-white/15 bg-[rgba(12,16,24,0.6)] shadow-[0_40px_120px_rgba(2,6,12,0.6)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(255,255,255,0.12),transparent_60%)]" />
              <Image
                src="/images/infiltracion.jpg"
                alt="Procedimiento clínico de rodilla"
                fill
                className="object-cover object-center opacity-55 [filter:contrast(1)_saturate(1.02)] [mask-image:radial-gradient(circle_at_50%_30%,#000_65%,transparent_100%)] [mask-size:100%_100%] [mask-repeat:no-repeat]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(5,6,8,0.6)_0%,rgba(5,6,8,0.2)_45%,rgba(5,6,8,0.65)_100%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.12),transparent_55%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.08),transparent_65%)]" />
            </div>
          </div>
        </section>

        <GlassPanel className="relative flex flex-col gap-6 overflow-hidden px-7 py-9 shadow-[0_45px_120px_rgba(2,6,12,0.65)]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.1),transparent_65%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_55%)]" />
          <div className="flex flex-col gap-2">
            <span className="font-serif text-xl text-white">Cómo se evalúa</span>
            <p className="text-sm text-[#B9C0CC] sm:text-base">
              Exploración clínica, análisis funcional y estudios de imagen solo
              cuando modifican decisiones diagnósticas o terapéuticas.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {EVALUATION_STEPS.map((step) => (
              <div
                key={step.title}
                className="relative overflow-hidden rounded-[20px] border border-white/20 bg-[rgba(14,18,26,0.65)] p-5 text-sm text-[#B9C0CC] shadow-[0_28px_70px_rgba(2,6,12,0.55)] backdrop-blur-[26px] transition-transform duration-200 hover:-translate-y-0.5 sm:text-base"
              >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08),transparent_60%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_55%)]" />
                <p className="font-semibold text-white">{step.title}</p>
                <p className="mt-2">{step.description}</p>
              </div>
            ))}
          </div>
        </GlassPanel>

        <section className="text-center">
          <p className="font-serif text-[clamp(1.4rem,3vw,2rem)] text-white">
            No se trata solo de aliviar el dolor.
          </p>
          <p className="font-serif text-[clamp(1.4rem,3vw,2rem)] text-white">
            Se trata de resolver el problema.
          </p>
        </section>
      </main>

      <WhatsAppFloating />
    </div>
  );
}
