"use client";

import { trackWhatsAppClick, useWhatsAppUrl } from "@/lib/whatsapp";

import type { Sede } from "@/lib/sede";

type WhatsAppLinkProps = {
  sede?: Sede;
  /** Texto prellenado del mensaje; el Ref: se le añade solo. */
  message: string;
  className?: string;
  "aria-label"?: string;
  children: React.ReactNode;
};

/**
 * Enlace a WhatsApp con el ?ref= de la URL actual y la conversión
 * "WhatsApp – clic" ya cableada.
 *
 * Existe para que las páginas que son Server Components (y por tanto no
 * pueden usar el hook useWhatsAppUrl) no acaben con enlaces wa.me
 * hardcodeados, que pierden la atribución.
 */
export default function WhatsAppLink({
  message,
  sede,
  className,
  children,
  ...rest
}: WhatsAppLinkProps) {
  const whatsappUrl = useWhatsAppUrl(message, sede);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackWhatsAppClick}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}
