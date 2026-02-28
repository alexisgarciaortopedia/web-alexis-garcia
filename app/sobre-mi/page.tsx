import Header from "@/components/Header";
import WhatsAppFloating from "@/components/WhatsAppFloating";

export default function SobreMiPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050608]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050608_0%,#0B0F17_50%,#050608_100%)]" />
      <div className="pointer-events-none absolute -right-28 top-16 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(148,156,170,0.18),transparent_70%)] blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-20" />

      <Header />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-8 pb-24 pt-10 sm:px-10 lg:pt-14">
        <section
          className="flex flex-col gap-10 md:flex-row md:items-start"
          aria-labelledby="sobre-mi-title"
        >
          <div className="flex w-full flex-col gap-6 md:w-[60%]">
            <div className="flex flex-col gap-3">
              <h2
                id="sobre-mi-title"
                className="font-serif text-2xl text-white sm:text-3xl"
              >
                Dr. Alexis Eduardo García
              </h2>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                Especialista en Traumatología y Ortopedia
              </h3>
            </div>

            <div className="flex flex-col gap-4 text-sm text-[#B9C0CC] sm:text-base">
              <p>La ortopedia es una especialidad donde las decisiones se ven.</p>
              <p>Se sienten. Cambian vidas.</p>
              <p>
                Por eso cada caso lo tomo con responsabilidad absoluta.
              </p>
            </div>

            <div className="flex flex-col gap-3 text-sm text-[#B9C0CC] sm:text-base">
              <p>⸻</p>
              <p>Médico Cirujano por la UAEH.</p>
              <p>
                Especialista en Traumatología y Ortopedia avalado por la UNAM.
              </p>
              <p>
                Formación quirúrgica en Hospital Central Norte de PEMEX, centro
                de alto volumen y alta complejidad.
              </p>
              <p>
                Certificado por el Consejo Mexicano de Ortopedia y Traumatología.
              </p>
            </div>

            <div className="flex flex-col gap-3 text-sm text-[#B9C0CC] sm:text-base">
              <p>⸻</p>
              <p>Trabajo con evidencia.</p>
              <p>Con razonamiento clínico.</p>
              <p>Con objetivos claros.</p>
              <p>
                Explico cada diagnóstico de forma comprensible.
              </p>
              <p>Porque entender el problema es parte del tratamiento.</p>
              <p>No se trata solo de aliviar el dolor.</p>
              <p>Se trata de recuperar función y evitar secuelas.</p>
            </div>

            <div className="flex flex-col gap-3 text-sm text-[#B9C0CC] sm:text-base">
              <p>⸻</p>
              <p>Diagnóstico claro.</p>
              <p>Plan preciso.</p>
              <p>Recuperación con objetivos.</p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="/agendar?sede=tula&tipo=programada"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#0A2540] px-6 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 sm:w-fit"
              >
                Agendar evaluación
              </a>
              <span className="text-xs text-[#8C95A3]">Respuesta inmediata.</span>
            </div>
          </div>

          <div className="w-full md:w-[40%]">
            {/* TODO: reemplazar este bloque por la fotografía profesional */}
            <div className="flex aspect-[4/5] w-full items-center justify-center rounded-[24px] border border-white/10 bg-[#0A2540] text-center text-white shadow-[0_30px_80px_rgba(2,6,12,0.55)]">
              <div className="flex flex-col gap-2 px-6">
                <span className="font-serif text-lg">
                  Dr. Alexis Eduardo García
                </span>
                <span className="text-sm text-white/80">
                  Traumatología y Ortopedia
                </span>
                <span className="text-xs text-white/60">
                  Fotografía profesional próximamente
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <WhatsAppFloating />
    </div>
  );
}
