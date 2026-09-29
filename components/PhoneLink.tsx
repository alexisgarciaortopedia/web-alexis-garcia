"use client";

import { trackPhoneCallClick } from "@/lib/phone";

import { CLINIC_CONTACTS } from "@/lib/contacts";
import { useSede, type Sede } from "@/lib/sede";

type PhoneLinkProps = {
  sede?: Sede;
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
  sede,
  className,
  children,
  ...rest
}: PhoneLinkProps) {
  const routeSede = useSede();
  return (
    <a
      href={CLINIC_CONTACTS[sede ?? routeSede].tel}
      onClick={trackPhoneCallClick}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}
