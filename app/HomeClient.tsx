"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import GlassPanel from "@/components/GlassPanel";
import Header from "@/components/Header";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import ReviewsCarousel from "@/components/ReviewsCarousel";

export default function HomeClient() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050608]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050608_0%,#0B0F17_50%,#050608_100%)]" />
      <div className="pointer-events-none absolute -right-28 top-16 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(148,156,170,0.18),transparent_70%)] blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-20" />

      <Header />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-20 px-8 pb-28 pt-10 sm:px-10 lg:pt-14">
        <section className="relative flex min-h-[600px] w-full flex-col items-center justify-center gap-12 lg:flex-row">
          <div className="order-2 flex flex-col gap-6 lg:order-none">
            <div className="flex flex-col gap-5">
              <h1 className="font-serif text-[clamp(2.3rem,5vw,4.2rem)] leading-tight tracking-tight text-white">
                Dr. Alexis Eduardo García de los Santos
              </h1>
              <div className="flex flex-col gap-1 text-xs text-[#8C95A3] sm:text-sm">
                <span>Especialista en Traumatología y Ortopedia</span>
                <span>
                  Certificado por el Consejo Mexicano de Ortopedia y
                  Traumatología
                </span>
              </div>
              <div className="font-serif text-[clamp(1.25rem,2.6vw,2rem)] leading-loose text-white/90">
                <p>Diagnóstico claro.</p>
                <p>Plan preciso.</p>
                <p>Recuperación con objetivos.</p>
              </div>
              <p className="max-w-xl text-sm text-[#B9C0CC] sm:text-base">
                Ortopedia y Traumatología con enfoque en diagnóstico preciso y
                tratamiento basado en evidencia.
              </p>
              <Link
                href="/agendar"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)] sm:w-fit"
              >
                Agendar consulta
              </Link>
            </div>
          </div>

          <div
            className={`${styles.heroPortrait} ${styles.heroDoctorMask} order-1 min-w-[300px] lg:order-none lg:basis-[55%] lg:min-w-[340px]`}
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
            href="https://wa.me/527731754638?text=Hola%2C%20vengo%20de%20la%20p%C3%A1gina%20del%20Dr.%20Alexis%20Garc%C3%ADa.%20Me%20gustar%C3%ADa%20agendar%20una%20consulta.%0ARef%3A%20WEB-2026"
            target="_blank"
            rel="noopener noreferrer"
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

      <WhatsAppFloating />
    </div>
  );
}
