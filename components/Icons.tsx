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
