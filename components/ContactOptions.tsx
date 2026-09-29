import { CLINIC_CONTACTS, CONTACT_SEDES } from "@/lib/contacts";
import PhoneLink from "@/components/PhoneLink";
import WhatsAppLink from "@/components/WhatsAppLink";

export default function ContactOptions({ message = "Hola, me gustaría agendar una consulta con el Dr. Alexis García." }: { message?: string }) {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2" aria-label="Contacto por sede">
      {CONTACT_SEDES.map((sede) => {
        const contact = CLINIC_CONTACTS[sede];
        return (
          <section key={sede} className="flex flex-col gap-3 rounded-2xl border border-white/15 bg-white/5 p-5 text-center">
            <h2 className="font-serif text-xl text-white">{contact.label}</h2>
            <PhoneLink sede={sede} className="text-sm text-white/80">{contact.display}</PhoneLink>
            <WhatsAppLink sede={sede} message={`${message} Sede: ${contact.label}.`} className="rounded-full bg-accent-signal px-4 py-3 text-sm font-semibold text-ink-900">WhatsApp {contact.label}</WhatsAppLink>
            <PhoneLink sede={sede} className="rounded-full border border-white/20 px-4 py-3 text-sm font-semibold text-white">Llamar a {contact.label}</PhoneLink>
          </section>
        );
      })}
    </div>
  );
}
