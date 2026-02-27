import type { ReactNode } from "react";

type GlassPanelProps = {
  className?: string;
  children: ReactNode;
};

export default function GlassPanel({ className = "", children }: GlassPanelProps) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/40",
        "bg-[rgba(255,255,255,0.45)] backdrop-blur-[22px]",
        "shadow-[0_20px_60px_rgba(15,23,42,0.12)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
