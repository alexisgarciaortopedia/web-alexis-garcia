import type { MetadataRoute } from "next";

const BASE_URL = "https://www.alexisgarciaortopedia.com";

// Una sola marca de tiempo por build, en vez de un new Date() por URL.
// La ruta es estática, así que el valor se congela en el sitemap.xml
// generado; hoistearlo deja explícito que las 15 URLs comparten el mismo
// lastmod y que no se mueve entre peticiones.
const LAST_MODIFIED = new Date();

// Solo páginas públicas indexables. Quedan fuera a propósito /agendar y
// /cita (noindex, shadow routing por clínica) y las rutas privadas
// /panel, /panel-luna y /control.
const PUBLIC_ROUTES = [
  "/",
  "/sobre-mi",
  "/que-atiendo",
  "/ubicaciones",
  "/pachuca",
  "/tula",
  "/pachuca/fracturas",
  "/tula/fracturas",
  "/pachuca/rodilla",
  "/tula/rodilla",
  "/segunda-opinion",
  "/muevete-seguro",
  "/muevete-seguro/atletas",
  "/centros-deportivos",
  "/privacidad",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((path) => ({
    url: path === "/" ? `${BASE_URL}/` : `${BASE_URL}${path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
