import Image from "next/image";
import GlassPanel from "@/components/GlassPanel";
import Header from "@/components/Header";
import WhatsAppFloating from "@/components/WhatsAppFloating";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F2F3F6]">
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-30" />
      <div className="pointer-events-none absolute -right-20 top-24 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-white/70 via-white/35 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-white/85 to-transparent blur-2xl" />

      <Header />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-20 pt-6 lg:pt-12">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-5">
              <h1 className="font-serif text-3xl leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Dr. Alexis Eduardo García de los Santos
              </h1>
              <div className="font-serif text-2xl leading-snug text-slate-700 sm:text-3xl">
                <p>Diagnóstico claro.</p>
                <p>Plan preciso.</p>
                <p>Recuperación con objetivos.</p>
              </div>
              <p className="max-w-xl text-sm text-slate-600 sm:text-base">
                Ortopedia moderna con enfoque en problemas ortopédicos y toma de
                decisiones basada en evidencia.
              </p>
            </div>
            <div className="flex flex-col gap-1 text-xs text-slate-500 sm:text-sm">
              <span>Especialista en Traumatología y Ortopedia</span>
              <span>Consulta privada en Hidalgo</span>
              <span>
                Certificado por el Consejo Mexicano de Ortopedia y Traumatología
              </span>
              <span>Cédula de especialidad: en trámite</span>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-[420px] items-center justify-center">
            <div className="absolute -inset-10 rounded-full bg-gradient-to-br from-white/80 via-white/40 to-transparent blur-3xl" />
            <Image
              src="/doctor.png"
              alt="Dr. Alexis Eduardo García de los Santos"
              width={520}
              height={720}
              priority
              className="relative h-auto w-full max-w-[420px] drop-shadow-[0_28px_50px_rgba(15,23,42,0.2)]"
            />
          </div>
        </section>

        <GlassPanel className="flex flex-col gap-6 px-6 py-7 lg:px-8">
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-700">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" />
              <div>
                <div className="font-medium text-slate-900">Tula</div>
                <div className="text-xs text-slate-500">Activa</div>
              </div>
            </div>
            <div className="hidden h-6 w-px bg-white/60 sm:block" />
            <div className="text-slate-400">
              <div className="font-medium">Pachuca</div>
            </div>
          </div>

          <div className="h-px w-full bg-white/60" />

          <div className="flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-white/70 px-4 py-2 text-slate-900 shadow-[0_6px_16px_rgba(15,23,42,0.08)]">
              Consulta programada
            </span>
            <span className="rounded-full border border-white/60 px-4 py-2 text-slate-600">
              Atención prioritaria
            </span>
          </div>

          <div>
            <a
              href="/agendar?sede=Tula&tipo=programada"
              className="inline-flex items-center justify-center rounded-full bg-[#0A2540] px-6 py-3 text-sm font-medium text-white shadow-[0_14px_30px_rgba(10,37,64,0.35)] transition-transform hover:-translate-y-0.5"
            >
              Agendar ahora
            </a>
          </div>
        </GlassPanel>

        <GlassPanel className="px-6 py-8 lg:px-10 lg:py-10">
          <div className="grid gap-6 text-center font-serif text-lg text-slate-800 md:grid-cols-2 md:text-left">
            <div className="flex flex-col justify-center gap-4 md:pr-8">
              <span>Dolor de rodilla</span>
              <span>Dolor de cadera</span>
              <span>Lesiones deportivas</span>
              <span>Fracturas y traumatismos</span>
            </div>
            <div className="flex flex-col justify-center gap-4 md:border-l md:border-white/50 md:pl-8">
              <span>Dolor de hombro</span>
              <span>Atención prioritaria</span>
              <span>Lumbalgia / ciática</span>
              <span>Artrosis y dolor crónico</span>
              <span>Esguinces graves</span>
            </div>
          </div>
        </GlassPanel>

        <div className="flex flex-col items-center gap-1 text-center text-xs text-slate-500 sm:text-sm">
          <span>
            Médico Cirujano · Universidad Autónoma del Estado de Hidalgo
          </span>
          <span>Especialidad UNAM · Hospital Central Norte PEMEX</span>
        </div>

        <div className="flex flex-col items-center gap-2 text-center text-xs text-slate-500 sm:text-sm">
          <span>
            Certificado por el Consejo Mexicano de Ortopedia y Traumatología ·
            Especialidad
          </span>
          <span>Ortopedista en Tula · Traumatólogo en Hidalgo</span>
        </div>
      </main>

      <WhatsAppFloating />
    </div>
  );
}
