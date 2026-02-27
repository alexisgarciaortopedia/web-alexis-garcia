import GlassPanel from "@/components/GlassPanel";
import Header from "@/components/Header";
import WhatsAppFloating from "@/components/WhatsAppFloating";

export default function AgendarPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F2F3F6]">
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-30" />
      <div className="pointer-events-none absolute -left-24 top-24 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-white/70 via-white/35 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-white/85 to-transparent blur-2xl" />

      <Header />

      <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 pb-20 pt-10 lg:pt-16">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-slate-900 sm:text-4xl">
            Agendar
          </h1>
        </div>

        <GlassPanel className="px-6 py-10 text-center text-sm text-slate-600 sm:text-base">
          Calendario próximamente
        </GlassPanel>
      </main>

      <WhatsAppFloating />
    </div>
  );
}
