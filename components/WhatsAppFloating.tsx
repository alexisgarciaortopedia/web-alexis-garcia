const WHATSAPP_URL =
  "https://wa.me/527713344634?text=Hola%20Dr.%20Alexis,%20deseo%20agendar%20una%20consulta";

export default function WhatsAppFloating() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-[rgba(255,255,255,0.6)] text-[#0A2540] shadow-[0_12px_30px_rgba(16,24,40,0.18)] backdrop-blur-[18px] transition-transform hover:-translate-y-1"
      aria-label="WhatsApp"
    >
      <span className="absolute inset-0 rounded-full shadow-[0_0_22px_rgba(37,211,102,0.35)]" />
      <svg
        viewBox="0 0 32 32"
        className="relative h-6 w-6"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M19.1 17.3c-.2-.1-1.1-.5-1.3-.6-.2-.1-.4-.1-.6.1-.2.2-.7.6-.8.8-.1.1-.3.2-.5.1-.2-.1-.9-.3-1.7-1-.6-.6-1-1.4-1.1-1.6-.1-.2 0-.3.1-.4.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.1 0-.3 0-.4 0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.5.3-.2.2-.7.7-.7 1.7s.7 2 .8 2.1c.1.1 1.5 2.3 3.7 3.3 2.2 1 2.2.7 2.6.7.4-.1 1.1-.4 1.3-.8.2-.4.2-.7.1-.8-.1-.1-.2-.1-.4-.2Z" />
        <path d="M16 3C9.4 3 4 8.4 4 15c0 2 .5 3.9 1.5 5.6L4 29l8.6-1.4c1.5.8 3.2 1.2 4.9 1.2 6.6 0 12-5.4 12-12S22.6 3 16 3Zm0 22.2c-1.6 0-3.1-.4-4.5-1.2l-.7-.4-5 .8.8-4.9-.4-.7c-.8-1.4-1.2-3-1.2-4.5 0-5.1 4.2-9.3 9.3-9.3s9.3 4.2 9.3 9.3-4.2 9.3-9.3 9.3Z" />
      </svg>
    </a>
  );
}
