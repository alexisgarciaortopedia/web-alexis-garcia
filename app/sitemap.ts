import type { MetadataRoute } from "next";

const BASE_URL = "https://www.alexisgarciaortopedia.com";

const PUBLIC_ROUTES = [
  "/",
  "/sobre-mi",
  "/que-atiendo",
  "/ubicaciones",
  "/rodilla",
  "/muevete-seguro",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((path) => ({
    url: path === "/" ? `${BASE_URL}/` : `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
