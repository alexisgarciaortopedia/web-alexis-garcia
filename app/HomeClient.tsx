"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import GlassPanel from "@/components/GlassPanel";
import Header from "@/components/Header";
import { PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import { PHONE_DISPLAY, PHONE_TEL, trackPhoneCallClick } from "@/lib/phone";
import { useSede, type Sede } from "@/lib/sede";
import { trackWhatsAppClick, useWhatsAppUrl } from "@/lib/whatsapp";

const WHATSAPP_MESSAGE =
  "Hola, vengo de la página del Dr. Alexis García. Me gustaría agendar una consulta.";

const HERO_CONTENT: Record<
  Sede,
  { eyebrow: string; h1First: string; h1Second: string; micro: string }
> = {
  pachuca: {
    eyebrow: "ADOY MEDICAL CENTER, PACHUCA · CLÍNICA ZÁRATE, TULA",
    h1First: "Traumatólogo y Ortopedista",
    h1Second: "en Pachuca",
    micro: "Lunes a viernes en Pachuca · sábado y domingo en Tula",
  },
  tula: {
    eyebrow: "CLÍNICA ZÁRATE, TULA DE ALLENDE · SÁBADO Y DOMINGO",
    h1First: "Traumatólogo y Ortopedista",
    h1Second: "en Tula de Allende",
    micro: "Sábado y domingo en Tula · lunes a viernes en Pachuca",
  },
};

export default function HomeClient() {
  const whatsappUrl = useWhatsAppUrl(WHATSAPP_MESSAGE);
  const sede = useSede();
  const hero = HERO_CONTENT[sede];

  const heroRef = useRef<HTMLElement>(null);
  const [heroPassed, setHeroPassed] = useState(false);

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroPassed(!entry.isIntersecting),
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050608]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050608_0%,#0B0F17_50%,#050608_100%)]" />
      <div className="pointer-events-none absolute -right-28 top-16 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(148,156,170,0.18),transparent_70%)] blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-20" />

      <Header />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-20 px-8 pb-28 pt-10 sm:px-10 lg:pt-14">
        <section
          ref={heroRef}
          className="relative flex min-h-[600px] w-full flex-col items-center justify-center gap-12 lg:flex-row"
        >
          {/* En móvil el mensaje va antes que la foto (order-1 vs order-2):
              con la foto primero, el hero anterior expulsaba el H1, los
              botones y toda decisión de conversión fuera de la primera
              pantalla. En escritorio ambas columnas van lado a lado
              (lg:order-none) y este orden deja de importar. */}
          <div className="order-1 flex flex-col gap-6 lg:order-none">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8FB3DE]">
                {hero.eyebrow}
              </span>
              <h1 className="font-serif text-[clamp(2.3rem,5vw,4.2rem)] leading-tight tracking-tight text-white">
                {hero.h1First}
                <br />
                {hero.h1Second}
              </h1>
              <p className="max-w-xl text-sm text-[#B9C0CC] sm:text-base">
                <span className="block font-serif text-base text-white sm:text-lg">
                  Diagnóstico claro. Plan preciso. Recuperación con objetivos.
                </span>
                Rodilla, hombro, cadera, columna, fracturas y lesión
                deportiva. Un plan con objetivos desde la primera consulta.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWhatsAppClick}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-[#070B12] shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Escribir por WhatsApp
              </a>
              <a
                href={PHONE_TEL}
                onClick={trackPhoneCallClick}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
              >
                <PhoneIcon className="h-4 w-4" />
                Llamar {PHONE_DISPLAY}
              </a>
              <span className="text-center text-xs text-[#8C95A3] sm:text-left">
                {hero.micro}
              </span>
            </div>
          </div>

          <div
            className={`${styles.heroPortrait} ${styles.heroDoctorMask} order-2 min-w-[300px] lg:order-none lg:basis-[55%] lg:min-w-[340px]`}
          >
            <Image
              src="/doctor-hero.webp"
              alt="Dr. Alexis Eduardo García de los Santos"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 55vw"
              className={`${styles.heroPortraitImg} object-cover object-[50%_30%]`}
            />
          </div>
        </section>

        <ReviewsCarousel />

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

      <footer className="relative z-10 border-t border-white/5 px-8 py-6">
        <nav
          className="mb-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#8C95A3]"
          aria-label="Enlaces del sitio"
        >
          <a
            href="https://instagram.com/dralexisgarcia.ortopedia"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition-colors hover:text-white"
          >
            Instagram
          </a>
          <Link href="/ubicaciones" className="transition-colors hover:text-white">
            Ubicaciones
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
            aria-label="WhatsApp"
            className="transition-colors hover:text-white"
          >
            WhatsApp
          </a>
        </nav>
        <p className="text-center text-xs text-[#8C95A3]">
          Responsable: Dr. Alexis Eduardo García de los Santos.
        </p>
      </footer>

      <WhatsAppFloating visible={heroPassed} />
    </div>
  );
}
