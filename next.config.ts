import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF primero: mismo pipeline de optimizacion (todos los anchos del
    // srcset del hero y de cada <Image> del sitio), mejor compresion que
    // WebP a la misma calidad. Next.js prueba avif -> webp -> original
    // segun el Accept header del navegador; nunca sirve mas pesado que hoy.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
