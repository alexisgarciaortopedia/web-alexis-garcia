"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, ChevronDown, MapPin, Menu, Phone, Play, ShieldCheck, X, Activity } from "lucide-react";
import { CLINIC_CONTACTS } from "@/lib/contacts";
import { CLINIC_LOCATIONS } from "@/lib/locations";
import { practiceReviews } from "@/lib/practiceReviews";
import { STATIC_GOOGLE_REVIEWS } from "@/lib/staticGoogleReviews";
import { useSede, type Sede } from "@/lib/sede";
import { trackWhatsAppClick, useWhatsAppUrl } from "@/lib/whatsapp";
import { trackPhoneCallClick } from "@/lib/phone";
import { trackWebEvent } from "@/lib/webAnalytics";
import "./premium.css";

function Eyebrow({ children, number }: { children: React.ReactNode; number?: string }) {
  return <p className="p-eyebrow">{number && <span>{number} /</span>}{children}</p>;
}

export function AppointmentButton({ sede, placement = "body", children, secondary = false }: { sede: Sede; placement?: string; children?: React.ReactNode; secondary?: boolean }) {
  const contact = CLINIC_CONTACTS[sede];
  const href = useWhatsAppUrl(`Hola, me gustaría agendar una valoración con el Dr. Alexis García en ${contact.label}.`, sede);
  return <a className={`p-button ${secondary ? "p-button-outline" : "p-button-contact"}`} href={href} target="_blank" rel="noopener noreferrer" onClick={trackWhatsAppClick} data-placement={placement} data-contact-sede={sede}>
    {children ?? `Agendar en ${contact.label}`}<ArrowUpRight size={18} aria-hidden="true" />
  </a>;
}

export function PremiumHeader({ sede }: { sede?: Sede }) {
  const [open, setOpen] = useState(false);
  const currentSede = useSede();
  const active = sede ?? currentSede;
  return <header className="p-header">
    <Link href="/" className="p-brand" aria-label="Dr. Alexis García, inicio"><span className="p-monogram">AG<span>✳</span></span><span>Dr. Alexis García<small>TRAUMATOLOGÍA Y ORTOPEDIA</small></span></Link>
    <nav className={`p-nav ${open ? "is-open" : ""}`} aria-label="Navegación principal">
      <Link onClick={() => setOpen(false)} href="/#consulta">La consulta</Link>
      <Link onClick={() => setOpen(false)} href="/#tratamientos">Qué atiendo</Link>
      <Link onClick={() => setOpen(false)} href="/#sedes">Consultorios</Link>
      <Link onClick={() => setOpen(false)} href="/muevete-seguro">Muévete Seguro <ArrowUpRight size={12}/></Link>
    </nav>
    <Link href={`/agendar?sede=${active}`} className="p-header-cta">Agendar consulta <ArrowUpRight size={15}/></Link>
    <button className="p-menu" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
  </header>;
}

export function PremiumFooter() {
  return <footer className="p-footer p-wrap">
    <div className="p-footer-top"><div><Link href="/" className="p-footer-brand">Dr. Alexis García<span>Traumatología y Ortopedia</span></Link><p>Tu movimiento merece atención.</p></div>
      <div><span className="p-label">CONSULTORIOS</span><Link href="/pachuca">Pachuca · Adoy Medical Center</Link><Link href="/tula">Tula · Clínica Zárate</Link><Link href="/ubicaciones">Ubicaciones y horarios</Link></div>
      <div><span className="p-label">CONOCE MÁS</span><Link href="/sobre-mi">Sobre el doctor</Link><Link href="/segunda-opinion">Segunda opinión</Link><Link href="/muevete-seguro">Muévete Seguro</Link><a href="https://instagram.com/dralexisgarcia.ortopedia" target="_blank" rel="noopener noreferrer">Instagram ↗</a></div>
    </div>
    <div className="p-footer-phones">{(["pachuca","tula"] as const).map(s => <a key={s} href={CLINIC_CONTACTS[s].tel} onClick={trackPhoneCallClick} data-placement="footer"><span>{CLINIC_CONTACTS[s].label}</span>{CLINIC_CONTACTS[s].display}<ArrowUpRight size={17}/></a>)}</div>
    <div className="p-footer-bottom"><span>© {new Date().getFullYear()} Dr. Alexis Eduardo García de los Santos.</span><Link href="/privacidad">Aviso de privacidad</Link><span>Hidalgo, México</span></div>
  </footer>;
}

export function VideoCard({ name, title, label, compact = false }: { name: "consulta" | "quirofano" | "pachuca"; title: string; label: string; compact?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const progress = useRef(new Set<number>());
  const videoRef = useRef<HTMLVideoElement>(null);
  return <div className={`p-video-card ${compact ? "p-video-compact" : ""}`}>
    {playing ? <><video ref={videoRef} controls autoPlay playsInline preload="none" poster={`/media/${name}.jpg`} onError={() => setError(true)} onPlay={() => trackWebEvent("video_start", { video_id: name })} onEnded={() => trackWebEvent("video_complete", { video_id: name })} onTimeUpdate={e => {
      const v=e.currentTarget; if(!v.duration) return;
      for(const percentage of [25,50,75]) if(v.currentTime/v.duration*100 >= percentage && !progress.current.has(percentage)) { progress.current.add(percentage); trackWebEvent("video_progress", {video_id:name, video_percent:percentage}); }
    }} aria-label={title}><source src={`/media/${name}.mp4`} type="video/mp4"/>Tu navegador no puede reproducir este video.</video><button className="p-video-close" onClick={() => {setPlaying(false);setError(false);}} aria-label="Cerrar video"><X size={20}/></button>{error && <p className="p-video-error">No se pudo cargar el video. <a href={`/media/${name}.mp4`}>Abrir video</a></p>}</> : <button className="p-video-trigger" onClick={() => {progress.current.clear();setPlaying(true);}} aria-label={`Reproducir: ${title}`}>
      <Image src={`/media/${name}.jpg`} alt="" fill sizes="(max-width: 700px) 90vw, 40vw" className="p-video-poster"/>
      <span className="p-video-top">DR. ALEXIS GARCÍA <span>EN PRIMERA PERSONA</span></span>
      <span className="p-play"><Play size={23} fill="currentColor"/></span>
      <span className="p-video-caption"><small>{label}</small><strong>{title}</strong><span>Ver video <ArrowUpRight size={16}/></span></span>
    </button>}
  </div>;
}

function Rating({ sede }: { sede?: Sede }) {
  const reviews = sede ? practiceReviews[sede] : null;
  return <div className="p-rating"><span className="p-stars" aria-label="5 de 5 estrellas">★★★★★</span><strong>5.0</strong><span>{reviews ? `${reviews.count} reseñas en Google` : "47 reseñas entre ambas sedes"}</span><a href={(reviews ?? practiceReviews.pachuca).googleMapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Ver reseñas en Google"><ArrowUpRight size={15}/></a></div>;
}

const conditions = [
  {n:"01",title:"Rodilla",body:"Dolor al caminar, lesiones de menisco, ligamentos y desgaste.",path:"rodilla",tag:"CAMINAR CON CONFIANZA"},
  {n:"02",title:"Fracturas y lesiones",body:"Valoración, inmovilización y opciones de tratamiento quirúrgico.",path:"fracturas",tag:"ATENCIÓN DESPUÉS DE UNA LESIÓN"},
  {n:"03",title:"Hombro y brazo",body:"Dolor al levantar el brazo, lesiones de tendones y limitación del movimiento.",path:"/que-atiendo#hombro-codo",tag:"RECUPERAR TU ALCANCE"},
  {n:"04",title:"Columna y cadera",body:"Dolor de espalda, ciática y molestias que afectan tu día a día.",path:"/que-atiendo#columna",tag:"MOVERTE CON MAYOR COMODIDAD"},
];

export default function PremiumSite({ sede }: { sede?: Sede }) {
  const inferredSede=useSede();
  const active=sede ?? inferredSede;
  const contact=CLINIC_CONTACTS[active];
  const [sticky,setSticky]=useState(false);
  const heroRef=useRef<HTMLElement>(null);
  useEffect(() => { const el=heroRef.current; if(!el) return;const observer=new IntersectionObserver(([entry]) => setSticky(!entry.isIntersecting));observer.observe(el);return () => observer.disconnect();},[]);
  return <div className="premium">
    <a className="p-skip" href="#contenido">Ir al contenido</a>
    <PremiumHeader sede={sede}/>
    <main id="contenido">
      <section ref={heroRef} className="p-hero p-wrap" id="inicio">
        <div className="p-hero-copy">
          <Eyebrow>{sede ? `CONSULTA EN ${contact.label.toUpperCase()} · HIDALGO` : "PACHUCA Y TULA · HIDALGO"}</Eyebrow>
          <h1>{sede ? <><span className="p-hero-specialty">Traumatólogo en {contact.label}.</span>Vuelve a moverte<br/><em>con confianza.</em></> : <>Tu vida está<br/>en movimiento.<br/><em>Cuídalo.</em></>}</h1>
          <p className="p-hero-description">{sede ? "Una valoración para entender tu dolor, conocer tus opciones y dar el siguiente paso en tu recuperación." : "Traumatología y Ortopedia con el Dr. Alexis García. Entiende qué te pasa y encuentra un plan para volver a lo que disfrutas."}</p>
          <div className="p-hero-actions"><AppointmentButton sede={active} placement="hero"/>{!sede ? <Link href={`/${active === "pachuca" ? "tula" : "pachuca"}`} className="p-text-link">Consultar en {active === "pachuca" ? "Tula" : "Pachuca"} <ArrowUpRight size={15}/></Link> : <a className="p-text-link" href={contact.tel} onClick={trackPhoneCallClick} data-placement="hero"><Phone size={15}/>{contact.display}</a>}</div>
          <p className="p-micro">Atención con cita · Nuestro equipo confirma tu horario.</p>
          <Rating sede={sede}/>
        </div>
        <div className="p-hero-visual">
          <div className="p-orbit p-orbit-one"/><div className="p-orbit p-orbit-two"/>
          <span className="p-portrait-word" aria-hidden="true">MOVIMIENTO</span>
          <Image src="/doctor-hero.webp" alt="Dr. Alexis Eduardo García de los Santos, traumatólogo y ortopedista" fill priority sizes="(max-width: 700px) 90vw, 50vw" className="p-portrait"/>
          <div className="p-portrait-note"><span className="p-note-cross">+</span><div><strong>Dr. Alexis García</strong><span>Escucharte. Explicarte. Acompañarte.</span></div></div>
          <a href="#consulta" className="p-hero-watch"><span><Play size={14} fill="currentColor"/></span>Conoce mi consulta<ArrowUpRight size={15}/></a>
        </div>
      </section>
      <div className="p-credentials"><div className="p-wrap"><span><ShieldCheck size={23}/>Certificado por el CMOT</span><span>UNAM<small>Especialidad</small></span><span>HOSPITAL CENTRAL NORTE<small>Formación · PEMEX</small></span><span>UAEH<small>Médico Cirujano</small></span></div></div>
      <section className="p-section p-wrap p-consult" id="consulta">
        <div className="p-consult-copy"><Eyebrow number="01">LA CONSULTA</Eyebrow><h2>Primero te escucho.<br/><em>Después, decidimos.</em></h2><p>Tu lesión tiene una historia. Tu actividad, tus dudas y lo que quieres recuperar también forman parte de la valoración.</p>
          <div className="p-steps">{[["Entender qué te pasa","Valoración clínica y revisión de los estudios que ya tengas."],["Explicarte tus opciones","Un diagnóstico comprensible y alternativas según tu caso."],["Definir el siguiente paso","Indicaciones claras y un plan de tratamiento y seguimiento."]].map(([title,text],i) => <div key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
          <AppointmentButton sede={active} placement="consultation">Quiero una valoración <span className="p-sr-only">en {contact.label}</span></AppointmentButton>
        </div>
        <div className="p-consult-film"><VideoCard name="consulta" title="Así es una consulta conmigo." label="UNA MIRADA A LA ATENCIÓN"/><p>Atención real. Explicaciones claras. Un espacio para tus dudas.</p></div>
      </section>
      <section className="p-conditions" id="tratamientos"><div className="p-wrap p-section">
        <div className="p-section-heading"><div><Eyebrow number="02">QUÉ ATIENDO</Eyebrow><h2>¿Qué te está<br/><em>limitando hoy?</em></h2></div><p>Empieza por lo que sientes.<br/>En consulta valoramos la causa.</p></div>
        <div className="p-condition-grid">{conditions.map(c => <Link href={c.path.startsWith("/") ? c.path : `/${active}/${c.path}`} className="p-condition" key={c.n}><div className="p-condition-top"><span>{c.n}</span><ArrowUpRight size={24}/></div><span className="p-condition-tag">{c.tag}</span><h3>{c.title}</h3><p>{c.body}</p><span className="p-condition-more">Conocer más <ArrowRight size={16}/></span></Link>)}</div>
        <Link href="/que-atiendo" className="p-text-link p-all-conditions">Ver otros motivos de consulta <ArrowUpRight size={16}/></Link>
      </div></section>
      <section className="p-section p-wrap p-expertise" id="doctor">
        <div className="p-expertise-film"><VideoCard name="quirofano" title="Cada decisión importa." label="DENTRO DEL QUIRÓFANO" compact/></div>
        <div><Eyebrow number="03">CRITERIO Y EXPERIENCIA</Eyebrow><h2>El tratamiento<br/>empieza con una<br/><em>buena decisión.</em></h2><p>El objetivo es encontrar la opción adecuada para ti: desde tratamiento conservador y rehabilitación hasta cirugía, cuando está indicada.</p><p>Soy el Dr. Alexis Eduardo García de los Santos, especialista en Traumatología y Ortopedia, con formación en el Hospital Central Norte de PEMEX y especialidad avalada por la UNAM.</p><div className="p-certification"><ShieldCheck/><span>Certificado por el Consejo Mexicano<br/>de Ortopedia y Traumatología</span></div><Link href="/sobre-mi" className="p-text-link">Conoce mi formación <ArrowUpRight size={16}/></Link></div>
      </section>
      <section className="p-reviews"><div className="p-wrap p-section"><div className="p-section-heading"><div><Eyebrow number="04">LA EXPERIENCIA DE MIS PACIENTES</Eyebrow><h2>La confianza<br/><em>se construye.</em></h2></div><div><Rating sede={sede}/><p className="p-micro">Opiniones públicas de Google.</p></div></div>
        <div className="p-review-grid">{STATIC_GOOGLE_REVIEWS.slice(1,4).map(r => <figure key={r.name}><span className="p-stars">★★★★★</span><blockquote>{r.text}</blockquote><figcaption><span>{r.name.slice(0,1)}</span><div>{r.name}<small>Reseña de Google · Tula</small></div><a href={practiceReviews.tula.googleMapsUrl} target="_blank" rel="noopener noreferrer" aria-label={`Ver reseñas de Tula en Google, ${r.name}`}><ArrowUpRight size={17}/></a></figcaption></figure>)}</div>
      </div></section>
      <section className="p-section p-wrap" id="sedes"><div className="p-section-heading"><div><Eyebrow number="05">CONSULTORIOS</Eyebrow><h2>Cerca de ti.<br/><em>En Hidalgo.</em></h2></div><p>Elige tu sede.<br/>Nosotros te ayudamos con la cita.</p></div><div className={`p-location-grid ${sede ? "p-location-focused" : ""}`}>{(sede ? [sede] : ["pachuca","tula"] as Sede[]).map(s => <LocationCard key={s} sede={s}/>) }{sede === "pachuca" && <VideoCard name="pachuca" title="Te espero en Pachuca." label="ADOY MEDICAL CENTER" compact/>}</div>{sede && <Link href={`/${sede === "pachuca" ? "tula" : "pachuca"}`} className="p-text-link p-alternate">¿Buscas consulta en {sede === "pachuca" ? "Tula" : "Pachuca"}? <ArrowUpRight size={16}/></Link>}</section>
      {!sede && <section className="p-wrap p-program-wrap"><div className="p-program"><div className="p-program-art" aria-hidden="true"><div/><div/><div/><Activity size={70} strokeWidth={1}/><span>MUÉVETE<br/><em>SEGURO.</em></span></div><div className="p-program-copy"><Eyebrow>MUÉVETE SEGURO · BY ORTIK</Eyebrow><h2>Tu movimiento,<br/><em>también entre consultas.</em></h2><p>Conoce el programa de seguimiento de molestias y lesiones por WhatsApp, con supervisión médica, para personas activas y centros deportivos.</p><Link href="/muevete-seguro" className="p-button p-button-light">Conocer el programa <ArrowUpRight size={18}/></Link><span className="p-micro">Solicita información sobre ingreso y disponibilidad.</span></div></div></section>}
      <section className="p-section p-wrap p-faq"><div><Eyebrow number="06">ANTES DE TU CITA</Eyebrow><h2>Llega con dudas.<br/><em>Salgamos con un plan.</em></h2></div><div>{[
        ["¿Cómo agendo mi consulta?","Elige Pachuca o Tula y escríbenos por WhatsApp. Nuestro equipo te comparte horarios disponibles y confirma tu cita. También puedes llamar al teléfono de tu sede."],
        ["¿Qué incluye la valoración?","Revisión de tu motivo de consulta, exploración física, revisión de estudios disponibles y explicación del plan recomendado. Estudios, procedimientos y revisiones posteriores se cotizan cuando correspondan."],
        ["¿Necesito llevar radiografías o una resonancia?","Si ya tienes estudios, llévalos junto con tus informes y tratamientos previos. Si aún no tienes, puedes agendar la valoración; el médico indicará si hace falta algún estudio."],
        ["¿Cuál es el costo de la consulta?","Nuestro equipo te confirma el costo vigente de la consulta y las formas de pago antes de agendar. Puedes preguntarlo por WhatsApp al elegir tu sede."],
        ["¿Puedo pedir una segunda opinión?","Sí. Puedes acudir con tus estudios y recomendaciones previas para revisar el diagnóstico y las alternativas de tratamiento."]
      ].map(([q,a]) => <details key={q}><summary>{q}<ChevronDown size={18}/></summary><p>{a}</p></details>)}</div></section>
      <section className="p-final"><div className="p-wrap"><Eyebrow>TU SIGUIENTE PASO</Eyebrow><h2>Hablemos de lo que<br/><em>quieres volver a hacer.</em></h2><p>Empieza con una valoración.</p><div className="p-final-actions"><AppointmentButton sede={active} placement="final"/>{!sede && <AppointmentButton sede={active === "pachuca" ? "tula" : "pachuca"} placement="final" secondary/>}</div><span className="p-micro">La cita se confirma con nuestro equipo de asistencia.</span></div></section>
    </main><PremiumFooter/>
    <div className={`p-sticky ${sticky ? "is-visible" : ""}`} inert={!sticky} aria-hidden={!sticky}><span>Consulta en <strong>{contact.label}</strong></span><AppointmentButton sede={active} placement="sticky">Agendar valoración</AppointmentButton></div>
  </div>;
}

export function LocationCard({sede}:{sede:Sede}) {const c=CLINIC_CONTACTS[sede];const l=CLINIC_LOCATIONS[sede];return <article className="p-location"><div className="p-location-top"><MapPin size={20}/><span>CONSULTA PRESENCIAL</span><span>0{sede === "pachuca" ? "1" : "2"}</span></div><h3>{c.label}<span>{l.clinicName}</span></h3><p>{l.address}</p><p className="p-location-hours">{l.daysLabel} · {l.scheduleLabel}<br/><small>Con cita y disponibilidad confirmada.</small></p><div className="p-location-actions"><AppointmentButton sede={sede} placement="location"/><a href={l.mapsUrl} target="_blank" rel="noopener noreferrer" className="p-text-link" data-placement="location">Cómo llegar <ArrowUpRight size={15}/></a></div><a className="p-location-phone" href={c.tel} onClick={trackPhoneCallClick} data-placement="location"><Phone size={15}/>{c.display}</a></article>}
