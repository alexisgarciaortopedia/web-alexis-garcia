import type { ReactNode } from "react";

type GlassPanelProps = {
  className?: string;
  children: ReactNode;
};

export default function GlassPanel({ className = "", children }: GlassPanelProps) {
  return (
    <div
      className={[
        "rounded-[24px] border border-white/10",
        "bg-[rgba(16,18,22,0.55)] backdrop-blur-[24px]",
        "shadow-[0_35px_90px_rgba(2,6,12,0.55)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
