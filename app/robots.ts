import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /agendar y /cita: flujo de citas con shadow routing por clínica,
      // en noindex a propósito.
      //
      // /panel, /panel-luna y /control: superficies privadas. Hasta hoy
      // solo se defendían con el header X-Robots-Tag, que Google lee
      // DESPUÉS de rastrear la página -- bloquearlas aquí evita el
      // rastreo desde el principio.
      disallow: [
        "/agendar",
        "/cita",
        "/api/",
        "/panel",
        "/panel-luna",
        "/control",
      ],
    },
    sitemap: "https://www.alexisgarciaortopedia.com/sitemap.xml",
  };
}
