import type { MetadataRoute } from "next";

const BASE_URL = "https://www.alexisgarciaortopedia.com";

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
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
