"use client";

import { useEffect, useState } from "react";
import WhatsAppFloating from "@/components/WhatsAppFloating";

type FloatingWhatsAppAfterHeroProps = {
  /** id del contenedor del hero a observar. */
  heroId: string;
};

/**
 * Mismo patrón que el hero del home: el flotante solo aparece al salir el
 * hero de pantalla, para no duplicar el botón de WhatsApp que el hero ya
 * trae. Recibe un id en vez de un ref porque el hero vive en un Server
 * Component (no se puede pasar un ref de servidor a cliente).
 */
export default function FloatingWhatsAppAfterHero({
  heroId,
}: FloatingWhatsAppAfterHeroProps) {
  const [heroPassed, setHeroPassed] = useState(false);

  useEffect(() => {
    const node = document.getElementById(heroId);
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) =>
      setHeroPassed(!entry.isIntersecting),
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [heroId]);

  return <WhatsAppFloating visible={heroPassed} />;
}
