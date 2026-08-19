"use client";

import { PHONE_TEL, trackPhoneCallClick } from "@/lib/phone";

type PhoneLinkProps = {
  className?: string;
  "aria-label"?: string;
  children: React.ReactNode;
};

/**
 * Enlace a tel: con la conversión "Clic de llamada" ya cableada.
 *
 * Mismo motivo que WhatsAppLink: las páginas que son Server Components no
 * pueden llevar un onClick directo en su propio JSX.
 */
export default function PhoneLink({
  className,
  children,
  ...rest
}: PhoneLinkProps) {
  return (
    <a
      href={PHONE_TEL}
      onClick={trackPhoneCallClick}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}
