import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/agendar", "/cita", "/api/"],
    },
    sitemap: "https://www.alexisgarciaortopedia.com/sitemap.xml",
  };
}
