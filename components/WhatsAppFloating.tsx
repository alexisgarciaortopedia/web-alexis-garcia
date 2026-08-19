"use client";

import { WhatsAppIcon } from "@/components/Icons";
import { trackWhatsAppClick, useWhatsAppUrl } from "@/lib/whatsapp";

const WHATSAPP_MESSAGE =
  "Hola, vengo de la página del Dr. Alexis García. Me gustaría agendar una consulta.";

type WhatsAppFloatingProps = {
  /**
   * Controla si el flotante se muestra. Por defecto siempre visible (todas
   * las páginas salvo el home, donde el hero ya trae su propio botón de
   * WhatsApp verde y el flotante solo debe aparecer al salir del hero de
   * pantalla, para no duplicar el mismo CTA dos veces a la vez).
   */
  visible?: boolean;
};

export default function WhatsAppFloating({
  visible = true,
}: WhatsAppFloatingProps) {
  const whatsappUrl = useWhatsAppUrl(WHATSAPP_MESSAGE);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackWhatsAppClick}
      className={[
        // Verde #25D366 exclusivo de WhatsApp en todo el sitio: si aparece
        // este color, es este botón. Texto/ícono en ink-900, no blanco: el
        // contraste de blanco sobre este verde es 1.98:1 (ilegible); ink-900
        // da 9.94:1.
        "fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-accent-signal text-ink-900 shadow-[0_18px_40px_rgba(0,0,0,0.45)] transition-all duration-200",
        visible
          ? "translate-y-0 opacity-100 hover:-translate-y-1"
          : "pointer-events-none translate-y-2 opacity-0",
      ].join(" ")}
      aria-label="WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <WhatsAppIcon className="relative h-6 w-6" />
    </a>
  );
}
