import Link from "next/link";
import WhatsAppLink from "@/components/WhatsAppLink";

const WHATSAPP_MESSAGE =
  "Hola, vengo de la página del Dr. Alexis García. Me gustaría agendar una consulta.";

/**
 * Enlaces del sitio, agrupados por sección.
 *
 * Existe por SEO: hasta hoy /pachuca, /tula, sus cuatro guías y
 * /segunda-opinion no recibían un solo enlace interno -- vivían nada más
 * en el sitemap, y Search Console las dejaba en "rastreada, sin indexar".
 * Este bloque es el que le da a Google una ruta de rastreo hacia ellas
 * desde cualquier página pública.
 *
 * Se excluyen a propósito /agendar y /cita (noindex, shadow routing por
 * clínica) y las rutas privadas /panel, /panel-luna y /control.
 */
const FOOTER_SECTIONS = [
  {
    title: "Consultorios",
    links: [
      { href: "/pachuca", label: "Ortopedista en Pachuca" },
      { href: "/tula", label: "Ortopedista en Tula" },
      { href: "/ubicaciones", label: "Ubicaciones y horarios" },
    ],
  },
  {
    title: "Guías por sede",
    links: [
      { href: "/pachuca/fracturas", label: "Fracturas en Pachuca" },
      { href: "/tula/fracturas", label: "Fracturas en Tula" },
      { href: "/pachuca/rodilla", label: "Dolor de rodilla en Pachuca" },
      { href: "/tula/rodilla", label: "Dolor de rodilla en Tula" },
    ],
  },
  {
    title: "Consulta",
    links: [
      { href: "/que-atiendo", label: "Qué atiendo" },
      { href: "/segunda-opinion", label: "Segunda opinión" },
      { href: "/sobre-mi", label: "Sobre mí" },
    ],
  },
  {
    title: "Muévete Seguro",
    links: [
      { href: "/muevete-seguro", label: "Muévete Seguro" },
      { href: "/muevete-seguro/atletas", label: "Para atletas" },
      { href: "/centros-deportivos", label: "Centros deportivos" },
    ],
  },
] as const;

/**
 * Rejilla de enlaces internos, sin el envoltorio <footer>.
 *
 * Las páginas de Muévete Seguro by Ortik ya traen su propio footer de
 * marca con el deslinde médico; ahí se monta solo esta rejilla, encima
 * de ese texto, en vez de sustituirlo.
 */
export function SiteFooterNav() {
  return (
    <nav
      aria-label="Enlaces del sitio"
      className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-x-6 gap-y-7 text-left sm:grid-cols-4"
    >
      {FOOTER_SECTIONS.map((section) => (
        <div key={section.title} className="flex flex-col gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-white/70">
            {section.title}
          </h2>
          <ul className="flex flex-col gap-1.5">
            {section.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-text-muted transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

/** Footer completo del sitio principal: enlaces, contacto y responsable. */
export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/5 px-8 py-10">
      <SiteFooterNav />

      <div className="mx-auto mt-8 flex w-full max-w-5xl flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/5 pt-6 text-xs text-text-muted">
        <a
          href="https://instagram.com/dralexisgarcia.ortopedia"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-white"
        >
          Instagram
        </a>
        <WhatsAppLink
          message={WHATSAPP_MESSAGE}
          className="transition-colors hover:text-white"
        >
          WhatsApp
        </WhatsAppLink>
        <Link
          href="/privacidad"
          className="transition-colors hover:text-white"
        >
          Aviso de privacidad
        </Link>
      </div>

      <p className="mt-4 text-center text-xs text-text-muted">
        Responsable: Dr. Alexis Eduardo García de los Santos.
      </p>
    </footer>
  );
}
