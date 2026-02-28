import Link from "next/link";
import Header from "@/components/Header";
import WhatsAppFloating from "@/components/WhatsAppFloating";

export default function UbicacionesPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050608]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050608_0%,#0B0F17_50%,#050608_100%)]" />
      <div className="pointer-events-none absolute -right-28 top-16 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(148,156,170,0.18),transparent_70%)] blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-20" />

      <Header />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-8 pb-24 pt-10 sm:px-10 lg:pt-14">
        <section className="flex flex-col gap-3">
          <h1 className="font-serif text-3xl text-white sm:text-4xl">
            Ubicaciones
          </h1>
          <p className="text-sm text-[#B9C0CC] sm:text-base">
            Consulta privada en Hidalgo.
          </p>
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          <article className="flex flex-col gap-6 rounded-[24px] border border-white/15 bg-white/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-2">
              <h2 className="font-serif text-xl text-white">Tula — Activa</h2>
              <div className="text-sm text-[#B9C0CC]">
                <p>Zárate Unidad de Especialidades Médicas</p>
                <p>Cto. Revolución 19</p>
                <p>Col. Iturbe</p>
                <p>42803 Tula de Allende, Hidalgo</p>
                <p>México</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm text-[#B9C0CC]">
              <p>
                <span className="text-white">Atención:</span> Viernes y sábado
              </p>
              <p>
                <span className="text-white">Horario:</span> 14:00 – 18:00 h
              </p>
              <p className="text-xs text-[#8C95A3]">
                Confirmación de cita vía WhatsApp.
              </p>
              <p className="text-[#8C95A3]">Solo con cita.</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                Disponibilidad limitada
              </span>
              <Link
                href="/agendar?sede=tula"
                className="inline-flex items-center justify-center rounded-lg bg-[#0A2540] px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:brightness-105"
              >
                Agendar cita en Tula
              </Link>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Z%C3%A1rate+Unidad+de+Especialidades+M%C3%A9dicas+Cto+Revoluci%C3%B3n+19+Tula+de+Allende+Hidalgo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-[#0A2540] px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/5"
              >
                Abrir en Google Maps
              </a>
            </div>

            <div className="overflow-hidden rounded-xl shadow-md">
              <iframe
                title="Mapa Tula"
                src="https://www.google.com/maps?q=Z%C3%A1rate+Unidad+de+Especialidades+M%C3%A9dicas+Cto+Revoluci%C3%B3n+19+Tula+de+Allende+Hidalgo&output=embed"
                className="w-full"
                height={200}
                loading="lazy"
              />
            </div>
          </article>

          <article className="flex flex-col gap-6 rounded-[24px] border border-white/15 bg-white/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-2">
              <h2 className="font-serif text-xl text-white">Pachuca</h2>
              <div className="text-sm text-[#B9C0CC]">
                <p>Consulta privada en Pachuca de Soto, Hidalgo</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm text-[#B9C0CC]">
              <p>
                <span className="text-white">Atención:</span> Lunes, miércoles y
                viernes
              </p>
              <p>
                <span className="text-white">Horario:</span> 14:00 – 18:00 h
              </p>
              <p className="text-xs text-[#8C95A3]">
                Confirmación de cita vía WhatsApp.
              </p>
              <p className="text-[#8C95A3]">Solo con cita.</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                Disponibilidad limitada
              </span>
              <Link
                href="/agendar?sede=pachuca"
                className="inline-flex items-center justify-center rounded-lg bg-[#0A2540] px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:brightness-105"
              >
                Agendar cita en Pachuca
              </Link>
              <button
                type="button"
                className="inline-flex cursor-not-allowed items-center justify-center rounded-lg border border-[#0A2540] px-5 py-2 text-sm font-semibold text-white/60"
                disabled
              >
                Ubicación exacta disponible al confirmar cita.
              </button>
            </div>

            <div className="overflow-hidden rounded-xl shadow-md">
              <iframe
                title="Mapa Pachuca"
                src="https://www.google.com/maps?q=Pachuca+de+Soto+Hidalgo&output=embed"
                className="w-full"
                height={200}
                loading="lazy"
              />
            </div>
          </article>
        </section>
      </main>

      <WhatsAppFloating />
    </div>
  );
}
