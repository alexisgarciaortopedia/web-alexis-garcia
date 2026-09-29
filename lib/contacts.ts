import type { ClinicLocationId } from "@/lib/locations";

/** Contactos públicos de cada consultorio. Compartidos por UI y datos estructurados. */
export const CLINIC_CONTACTS = {
  pachuca: { label: "Pachuca", display: "771 758 8383", e164: "+527717588383", tel: "tel:+527717588383", whatsapp: "527717588383" },
  tula: { label: "Tula", display: "773 175 4638", e164: "+527731754638", tel: "tel:+527731754638", whatsapp: "527731754638" },
} as const satisfies Record<ClinicLocationId, { label: string; display: string; e164: string; tel: string; whatsapp: string }>;
export const CONTACT_SEDES = ["pachuca", "tula"] as const;
