import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import GlassPanel from "@/components/GlassPanel";
import Header from "@/components/Header";
import WhatsAppFloating from "@/components/WhatsAppFloating";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050608]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050608_0%,#0B0F17_50%,#050608_100%)]" />
      <div className="pointer-events-none absolute -right-28 top-16 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(148,156,170,0.18),transparent_70%)] blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-20" />

      <Header />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-20 px-8 pb-28 pt-10 sm:px-10 lg:pt-14">
        <section className="relative w-full min-h-[600px] flex flex-col items-center justify-center gap-12 lg:flex-row">
          <div className="order-2 flex flex-col gap-6 lg:order-none">
            <div className="flex flex-col gap-5">
              <h1 className="font-serif text-[clamp(2.3rem,5vw,4.2rem)] leading-tight tracking-tight text-white">
                Dr. Alexis Eduardo García de los Santos
              </h1>
              <div className="font-serif text-[clamp(1.25rem,2.6vw,2rem)] leading-loose text-white/90">
                <p>Diagnóstico claro.</p>
                <p>Plan preciso.</p>
                <p>Recuperación con objetivos.</p>
              </div>
              <p className="max-w-xl text-sm text-[#B9C0CC] sm:text-base">
                Traumatología y Ortopedia con precisión diagnóstica y tratamiento
                estratégico.
              </p>
            </div>
            <div className="flex flex-col gap-1 text-xs text-[#8C95A3] sm:text-sm">
              <span>Especialista en Traumatología y Ortopedia</span>
              <span>
                Certificado por el Consejo Mexicano de Ortopedia y Traumatología
              </span>
              <span>Cédula de especialidad: en trámite</span>
            </div>
          </div>

          <div
            className={`${styles.heroPortrait} ${styles.heroDoctorMask} order-1 min-w-[300px] lg:order-none lg:basis-[55%] lg:min-w-[340px]`}
          >
            <Image
              src="/doctor.png"
              alt="Dr. Alexis Eduardo García de los Santos"
              fill
              priority
              unoptimized
              className={`${styles.heroPortraitImg} object-cover object-[50%_30%]`}
            />
          </div>
        </section>

        <GlassPanel className="flex flex-col gap-8 px-6 py-8 lg:px-8">
          <div className="flex flex-wrap items-center gap-6 text-sm text-[#B9C0CC]">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white" />
              <div>
                <div className="font-medium text-white">Tula</div>
                <div className="text-xs text-[#8C95A3]">Activa</div>
              </div>
            </div>
            <div className="hidden h-6 w-px bg-white/10 sm:block" />
            <div className="text-[#8C95A3]">
              <div className="font-medium text-white/70">Pachuca</div>
            </div>
          </div>

          <div className="h-px w-full bg-white/10" />

          <div className="flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-white/10 px-4 py-2 text-white shadow-[0_10px_26px_rgba(0,0,0,0.35)]">
              Consulta programada
            </span>
            <span className="rounded-full border border-white/15 px-4 py-2 text-[#B9C0CC]">
              Atención prioritaria
            </span>
          </div>

          <div className="w-full sm:w-auto">
            <a
              href="/agendar?sede=tula&tipo=programada"
              className="inline-flex min-h-[56px] w-full items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-black shadow-[0_18px_46px_rgba(0,0,0,0.4)] transition-all hover:-translate-y-0.5 hover:opacity-90"
            >
              Agendar ahora
            </a>
          </div>
        </GlassPanel>

        <GlassPanel className="px-6 py-9 lg:px-10 lg:py-12">
          <div className="flex flex-col gap-2 text-center text-sm text-[#B9C0CC] md:text-left">
            <span className="font-serif text-base text-white">¿Qué atiendo?</span>
            <span>
              Problemas frecuentes que evalúo y trato. Si no ves tu caso, agenda
              y lo valoramos.
            </span>
          </div>
          <div className="grid gap-6 text-center font-serif text-lg text-white md:grid-cols-2 md:text-left">
            <div className="flex flex-col justify-center gap-4 md:pr-8">
              <span className="font-semibold">TRAUMA</span>
              <Link
                href="/que-atiendo#trauma"
                className="text-sm font-normal text-inherit"
              >
                Fracturas (muñeca, tobillo, clavícula, húmero)
              </Link>
              <Link
                href="/que-atiendo#trauma"
                className="text-sm font-normal text-inherit"
              >
                Esguinces y luxaciones
              </Link>
              <Link
                href="/que-atiendo#trauma"
                className="text-sm font-normal text-inherit"
              >
                Lesiones deportivas agudas
              </Link>
              <span className="font-semibold">COLUMNA</span>
              <Link
                href="/que-atiendo#columna"
                className="text-sm font-normal text-inherit"
              >
                Dolor lumbar (lumbalgia) / ciática
              </Link>
              <Link
                href="/que-atiendo#columna"
                className="text-sm font-normal text-inherit"
              >
                Dolor cervical
              </Link>
              <Link
                href="/que-atiendo#columna"
                className="text-sm font-normal text-inherit"
              >
                Hernia lumbar
              </Link>
              <span className="font-semibold">HOMBRO / CODO</span>
              <Link
                href="/que-atiendo#hombro-codo"
                className="text-sm font-normal text-inherit"
              >
                Dolor de hombro
              </Link>
              <Link
                href="/que-atiendo#hombro-codo"
                className="text-sm font-normal text-inherit"
              >
                Lesión del manguito rotador
              </Link>
              <Link
                href="/que-atiendo#hombro-codo"
                className="text-sm font-normal text-inherit"
              >
                Dolor de codo (epicondilitis)
              </Link>
            </div>
            <div className="flex flex-col justify-center gap-4 md:border-l md:border-white/10 md:pl-8">
              <span className="font-semibold">MANO / MUÑECA</span>
              <Link
                href="/que-atiendo#mano-muneca"
                className="text-sm font-normal text-inherit"
              >
                Túnel del carpo
              </Link>
              <Link
                href="/que-atiendo#mano-muneca"
                className="text-sm font-normal text-inherit"
              >
                Dolor de muñeca
              </Link>
              <Link
                href="/que-atiendo#mano-muneca"
                className="text-sm font-normal text-inherit"
              >
                Dedo en gatillo
              </Link>
              <span className="font-semibold">CADERA</span>
              <Link
                href="/que-atiendo#cadera"
                className="text-sm font-normal text-inherit"
              >
                Dolor de cadera
              </Link>
              <Link
                href="/que-atiendo#cadera"
                className="text-sm font-normal text-inherit"
              >
                Bursitis trocantérica
              </Link>
              <Link
                href="/que-atiendo#cadera"
                className="text-sm font-normal text-inherit"
              >
                Artrosis de cadera
              </Link>
              <span className="font-semibold">RODILLA</span>
              <Link
                href="/que-atiendo#rodilla"
                className="text-sm font-normal text-inherit"
              >
                Dolor de rodilla
              </Link>
              <Link
                href="/que-atiendo#rodilla"
                className="text-sm font-normal text-inherit"
              >
                Lesiones de menisco
              </Link>
              <Link
                href="/que-atiendo#rodilla"
                className="text-sm font-normal text-inherit"
              >
                Lesiones de ligamentos
              </Link>
              <span className="font-semibold">TOBILLO / PIE</span>
              <Link
                href="/que-atiendo#tobillo-pie"
                className="text-sm font-normal text-inherit"
              >
                Esguince de tobillo
              </Link>
              <Link
                href="/que-atiendo#tobillo-pie"
                className="text-sm font-normal text-inherit"
              >
                Fascitis plantar
              </Link>
              <Link
                href="/que-atiendo#tobillo-pie"
                className="text-sm font-normal text-inherit"
              >
                Dolor de pie
              </Link>
            </div>
          </div>
        </GlassPanel>

        <div className="flex flex-col items-center gap-1 text-center text-xs text-[#8C95A3] sm:text-sm">
          <span>
            Médico Cirujano · Universidad Autónoma del Estado de Hidalgo
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 text-center text-xs text-[#8C95A3] sm:text-sm">
          <span>Especialidad en Traumatología y Ortopedia – UNAM</span>
          <span>Hospital Central Norte PEMEX (formación)</span>
          <span>
            Certificado por el Consejo Mexicano de Ortopedia y Traumatología
          </span>
        </div>
      </main>

      <WhatsAppFloating />
    </div>
  );
}
