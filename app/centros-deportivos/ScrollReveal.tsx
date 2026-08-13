"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Aparición discreta al hacer scroll -- opacidad + un desplazamiento de
 * pocos píxeles, una sola vez por elemento (el observer se desconecta al
 * activarse, nunca se repite al volver a pasar). Curva de aceleración
 * suave (no lineal), duración corta (dentro de 400-700ms), y respeta
 * prefers-reduced-motion vía las variantes motion-reduce. Solo anima
 * transform y opacity -- nunca dispara reflow.
 */
export function ScrollReveal({
  children,
  className = "",
  delayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      } ${className}`}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
