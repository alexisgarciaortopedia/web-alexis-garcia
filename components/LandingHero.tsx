import { CertifiedIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import PhoneLink from "@/components/PhoneLink";
import WhatsAppLink from "@/components/WhatsAppLink";
import { PHONE_DISPLAY } from "@/lib/phone";

type LandingHeroProps = {
  eyebrow: string;
  h1First: string;
  h1Second: string;
  entradilla: string;
  reviewCount: number;
  reviewLabel: string;
  micro: string;
  whatsappMessage: string;
};

/**
 * Hero compartido de las landings de oleada (/pachuca, /tula,
 * /[sede]/fracturas, /segunda-opinion) -- mismo patrón que el hero del
 * home (eyebrow, H1, entradilla, fila de confianza, WhatsApp + Llamar,
 * micro-línea), factorizado para no repetirlo página por página.
 */
export default function LandingHero({
  eyebrow,
  h1First,
  h1Second,
  entradilla,
  reviewCount,
  reviewLabel,
  micro,
  whatsappMessage,
}: LandingHeroProps) {
  return (
    <section className="flex flex-col gap-6 pt-4">
      <div className="flex flex-col gap-4">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-clinical">
          {eyebrow}
        </span>
        <h1 className="font-serif text-[clamp(2.3rem,5vw,4.2rem)] font-semibold leading-tight tracking-tight text-white">
          {h1First}
          <br />
          {h1Second}
        </h1>
        <p className="max-w-xl text-sm text-text-secondary sm:text-base">
          <span className="block font-serif text-base text-white sm:text-lg">
            Diagnóstico claro. Plan preciso. Recuperación con objetivos.
          </span>
          {entradilla}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-text-secondary sm:text-sm">
        <span className="inline-flex items-center gap-1.5">
          <span className="text-accent-rating" aria-hidden="true">
            ★★★★★
          </span>
          5.0 · {reviewCount} {reviewLabel}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-brand-field/70 px-3 py-1">
          <CertifiedIcon className="h-3.5 w-3.5 shrink-0 text-accent-clinical" />
          Certificado · Consejo Mexicano de Ortopedia y Traumatología
        </span>
      </div>

      <div className="flex max-w-md flex-col gap-3">
        <WhatsAppLink
          message={whatsappMessage}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-signal px-6 py-3.5 text-sm font-semibold text-ink-900 shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Escribir por WhatsApp
        </WhatsAppLink>
        <PhoneLink className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10">
          <PhoneIcon className="h-4 w-4" />
          Llamar {PHONE_DISPLAY}
        </PhoneLink>
        <span className="text-center text-xs text-text-muted sm:text-left">
          {micro}
        </span>
      </div>
    </section>
  );
}
