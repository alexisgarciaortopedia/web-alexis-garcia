/**
 * Tratamiento "vidrio" compartido -- borde de 1px en blanco a baja
 * opacidad, blur de fondo, y un highlight superior apenas visible (línea
 * de degradado de 1px) simulando luz rozando el borde. Nunca sombras
 * duras -- solo el blur y el borde dan la profundidad.
 */
export function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[24px] border border-white/10 bg-[rgba(16,18,22,0.5)] backdrop-blur-[24px] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent ${className}`}
    >
      {children}
    </div>
  );
}
