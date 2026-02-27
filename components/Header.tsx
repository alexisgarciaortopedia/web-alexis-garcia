import Link from "next/link";
import GlassPanel from "./GlassPanel";
import { InstagramIcon, PhoneIcon } from "./Icons";

const WHATSAPP_PHONE = "771 334 4634";
const INSTAGRAM_URL =
  "https://www.instagram.com/dr.bonesgs?igsh=cDI5ZW5sMGx5dmho&utm_source=qr";

export default function Header() {
  return (
    <div className="relative z-20 flex w-full justify-center px-4 pt-6">
      <GlassPanel className="w-full max-w-6xl px-5 py-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <nav className="hidden items-center gap-6 text-sm text-slate-700 md:flex">
            <Link href="#" className="transition-opacity hover:opacity-70">
              Sobre mí
            </Link>
            <Link href="#" className="transition-opacity hover:opacity-70">
              Ubicación
            </Link>
            <Link href="#" className="transition-opacity hover:opacity-70">
              Condiciones
            </Link>
          </nav>
          <div className="flex flex-wrap items-center justify-between gap-3 md:justify-end">
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <a
                href="tel:+527713344634"
                className="flex items-center gap-2 transition-opacity hover:opacity-70"
              >
                <PhoneIcon className="h-4 w-4" />
                <span>{WHATSAPP_PHONE}</span>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-1 text-slate-700 transition-opacity hover:opacity-70"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
            <Link
              href="/agendar"
              className="rounded-full bg-[#0A2540] px-5 py-2 text-sm font-medium text-white shadow-[0_10px_25px_rgba(10,37,64,0.35)] transition-transform hover:-translate-y-0.5"
            >
              Agendar consulta
            </Link>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
