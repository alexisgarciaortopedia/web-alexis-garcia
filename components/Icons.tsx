import type { SVGProps } from "react";

export function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5.3 3.8c.5-.5 1.3-.5 1.9 0l2.6 2.6c.5.5.6 1.2.3 1.8l-1 2a.9.9 0 0 0 .2 1.1l4.6 4.6c.3.3.7.4 1.1.2l2-1c.6-.3 1.4-.2 1.8.3l2.6 2.6c.5.5.5 1.3 0 1.9l-1.5 1.5c-1.2 1.2-3 1.6-4.6.9-3-1.2-5.8-3-8.3-5.4-2.4-2.4-4.2-5.3-5.4-8.3-.6-1.6-.3-3.4.9-4.6L5.3 3.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19.1 17.3c-.2-.1-1.1-.5-1.3-.6-.2-.1-.4-.1-.6.1-.2.2-.7.6-.8.8-.1.1-.3.2-.5.1-.2-.1-.9-.3-1.7-1-.6-.6-1-1.4-1.1-1.6-.1-.2 0-.3.1-.4.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.1 0-.3 0-.4 0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.5.3-.2.2-.7.7-.7 1.7s.7 2 .8 2.1c.1.1 1.5 2.3 3.7 3.3 2.2 1 2.2.7 2.6.7.4-.1 1.1-.4 1.3-.8.2-.4.2-.7.1-.8-.1-.1-.2-.1-.4-.2Z" />
      <path d="M16 3C9.4 3 4 8.4 4 15c0 2 .5 3.9 1.5 5.6L4 29l8.6-1.4c1.5.8 3.2 1.2 4.9 1.2 6.6 0 12-5.4 12-12S22.6 3 16 3Zm0 22.2c-1.6 0-3.1-.4-4.5-1.2l-.7-.4-5 .8.8-4.9-.4-.7c-.8-1.4-1.2-3-1.2-4.5 0-5.1 4.2-9.3 9.3-9.3s9.3 4.2 9.3 9.3-4.2 9.3-9.3 9.3Z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="4.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.7" cy="7.3" r="1" fill="currentColor" />
    </svg>
  );
}
