import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF primero: mismo pipeline de optimizacion (todos los anchos del
    // srcset del hero y de cada <Image> del sitio), mejor compresion que
    // WebP a la misma calidad. Next.js prueba avif -> webp -> original
    // segun el Accept header del navegador; nunca sirve mas pesado que hoy.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        // /rodilla era estatico y siempre decia "Tula", sin importar el
        // ?ref= -- reemplazado por /[sede]/rodilla. 301 a la variante de
        // Pachuca (la plaza de conquista) por defecto. Next.js reenvia el
        // querystring automaticamente, asi que cualquier ?ref= que llegue
        // aqui sigue de largo intacto.
        source: "/rodilla",
        destination: "/pachuca/rodilla",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
