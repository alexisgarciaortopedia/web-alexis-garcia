import Link from "next/link";
import GlassPanel from "./GlassPanel";
import { InstagramIcon, PhoneIcon } from "./Icons";

const WHATSAPP_PHONE = "771 334 4634";
const INSTAGRAM_URL =
  "https://www.instagram.com/dr.bonesgs?igsh=cDI5ZW5sMGx5dmho&utm_source=qr";

export default function Header() {
  return (
    <div className="relative z-20 flex w-full justify-center px-3 pt-6 sm:px-4 lg:px-4">
      <GlassPanel className="w-full max-w-6xl px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between max-[900px]:flex-wrap max-[900px]:items-start max-[900px]:gap-2">
          <Link href="/" className="text-sm font-semibold text-white">
            Dr. Alexis Eduardo García
          </Link>
          <nav className="flex w-full flex-wrap items-center gap-4 text-sm text-[#B9C0CC] md:w-auto md:flex-nowrap md:justify-center">
            <Link href="/sobre-mi" className="transition-colors hover:text-white">
              Sobre mí
            </Link>
            <Link href="/ubicaciones" className="transition-colors hover:text-white">
              Ubicación
            </Link>
            <Link href="/que-atiendo" className="transition-colors hover:text-white">
              ¿Qué atiendo?
            </Link>
          </nav>
          <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:gap-3 md:w-auto md:justify-end max-[900px]:w-full max-[900px]:flex-wrap max-[900px]:justify-between">
            <div className="flex min-w-0 items-center gap-3 text-sm text-white/70">
              <a
                href="tel:+527713344634"
                className="flex min-w-0 items-center gap-2 transition-colors hover:text-white max-[900px]:truncate"
              >
                <PhoneIcon className="h-4 w-4 text-white/80" />
                <span>{WHATSAPP_PHONE}</span>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-1 text-white/80 transition-colors hover:text-white"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
            <Link
              href="/agendar"
              className="inline-flex w-full min-h-[46px] items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-black shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)] sm:w-auto max-[900px]:w-full max-[900px]:justify-center"
            >
              Agendar consulta
            </Link>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
