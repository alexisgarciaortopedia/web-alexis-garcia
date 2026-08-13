"use client";

import { RotateCcw, ChevronsRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

type Turno = { de: "atleta" | "luna"; texto: string };

const CONVERSACION: Turno[] = [
  { de: "atleta", texto: "Me duele mucho la rodilla y se me hinchó desde ayer" },
  {
    de: "luna",
    texto:
      "Dolor fuerte con hinchazón desde ayer sí necesita que te valore un traumatólogo hoy. Mientras te valoran, no entrenes pierna ni cargues peso con esa rodilla. Manténla en reposo relativo, elévala y aplica frío indirecto 10–15 minutos. ¿Puedes apoyar y caminar, o la rodilla no te responde?",
  },
  { de: "atleta", texto: "sigue igual, no puedo apoyar bien" },
  {
    de: "luna",
    texto:
      "Que no puedas apoyar bien confirma que la rodilla está limitando tu función. Ya avisé al equipo médico para que te contacten hoy. Si no puedes dar pasos, se ve deformada, está muy roja o caliente, o tienes fiebre, ve directo a urgencias.",
  },
];

/** Duración del "escribiendo..." proporcional al largo del mensaje, con
 * piso y techo para que ni un mensaje corto se sienta instantáneo ni uno
 * largo se sienta eterno. */
function duracionTecleo(texto: string): number {
  return Math.min(2600, Math.max(900, 350 + texto.length * 7));
}

type Timeout = ReturnType<typeof setTimeout> | undefined;

type EstadoAnimacion = {
  generacionRef: RefObject<number>;
  timeoutRef: RefObject<Timeout>;
  setTecleando: (v: "atleta" | "luna" | null) => void;
  setVisibles: (v: number) => void;
};

function limpiarTimeout(timeoutRef: RefObject<Timeout>) {
  if (timeoutRef.current !== undefined) clearTimeout(timeoutRef.current);
}

/**
 * Motor de la animación -- función de módulo (no un hook) a propósito:
 * se llama a sí misma para encadenar los turnos, y un useCallback
 * recursivo dispara el error de eslint-plugin-react-hooks (accede a la
 * variable antes de declararse). Aquí, al vivir fuera del componente,
 * la recursión es una llamada de función normal, sin ese problema.
 */
function programarPaso(
  paso: number,
  generacion: number,
  esperaInicial: number,
  estado: EstadoAnimacion,
): void {
  limpiarTimeout(estado.timeoutRef);
  if (paso >= CONVERSACION.length) return;
  const turno = CONVERSACION[paso]!;
  estado.timeoutRef.current = setTimeout(() => {
    if (estado.generacionRef.current !== generacion) return;
    estado.setTecleando(turno.de);
    estado.timeoutRef.current = setTimeout(() => {
      if (estado.generacionRef.current !== generacion) return;
      estado.setTecleando(null);
      estado.setVisibles(paso + 1);
      programarPaso(paso + 1, generacion, 700, estado);
    }, duracionTecleo(turno.texto));
  }, esperaInicial);
}

function BurbujaTecleando({ de }: { de: "atleta" | "luna" }) {
  const esLuna = de === "luna";
  return (
    <div className={`flex ${esLuna ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex items-center gap-1 rounded-2xl px-4 py-3 ${
          esLuna ? "rounded-br-sm bg-teal-500/90" : "rounded-bl-sm bg-white/10"
        }`}
        aria-label={esLuna ? "Luna está escribiendo" : "El atleta está escribiendo"}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 animate-bounce rounded-full ${
              esLuna ? "bg-[#04201A]/70" : "bg-white/60"
            }`}
            style={{ animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function Burbuja({ turno }: { turno: Turno }) {
  const esLuna = turno.de === "luna";
  return (
    <div className={`flex flex-col ${esLuna ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed sm:max-w-[75%] ${
          esLuna
            ? "rounded-br-sm bg-teal-500 text-[#04201A]"
            : "rounded-bl-sm bg-white/10 text-[#E5E9F0]"
        }`}
      >
        {turno.texto}
      </div>
      <span className="mt-1 px-1 text-[10px] text-[#6B7280]">
        {esLuna ? "Luna" : "Atleta"}
      </span>
    </div>
  );
}

export function WhatsAppDemo() {
  const [visibles, setVisibles] = useState(0);
  const [tecleando, setTecleando] = useState<"atleta" | "luna" | null>(null);
  const timeoutRef = useRef<Timeout>(undefined);
  const generacionRef = useRef(0);
  // useRef solo usa este valor en el primer render -- en los siguientes,
  // el argumento se descarta y `.current` conserva el mismo objeto. Así
  // queda estable sin leer/escribir `.current` durante el render (regla
  // react-hooks/refs).
  const estadoRef = useRef<EstadoAnimacion>({ generacionRef, timeoutRef, setTecleando, setVisibles });

  useEffect(() => {
    programarPaso(0, generacionRef.current, 900, estadoRef.current);
    return () => limpiarTimeout(timeoutRef);
  }, []);

  const reiniciar = useCallback(() => {
    limpiarTimeout(timeoutRef);
    generacionRef.current += 1;
    setTecleando(null);
    setVisibles(0);
    programarPaso(0, generacionRef.current, 500, estadoRef.current);
  }, []);

  const avanzar = useCallback(() => {
    if (visibles >= CONVERSACION.length) return;
    limpiarTimeout(timeoutRef);
    setTecleando(null);
    const siguiente = visibles + 1;
    setVisibles(siguiente);
    programarPaso(siguiente, generacionRef.current, 500, estadoRef.current);
  }, [visibles]);

  const completo = visibles >= CONVERSACION.length && tecleando === null;

  return (
    <div>
      <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[rgba(10,12,15,0.6)] backdrop-blur-[24px]">
        <div className="flex items-center gap-3 border-b border-white/10 bg-[#0b1115]/80 px-4 py-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/40 to-blue-500/40 text-sm font-bold text-teal-300">
            L
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">Luna · Muévete Seguro</span>
            <span className="text-xs text-[#8C95A3]">
              {tecleando ? "escribiendo…" : "en línea"}
            </span>
          </div>
        </div>

        <div className="flex min-h-[360px] flex-col justify-end gap-3 px-4 py-5 sm:min-h-[420px]">
          {CONVERSACION.slice(0, visibles).map((turno, i) => (
            <Burbuja key={i} turno={turno} />
          ))}
          {tecleando && <BurbujaTecleando de={tecleando} />}
        </div>

        <div className="border-t border-white/10 px-4 py-3">
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-[#6B7280]">
            Escribe un mensaje…
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={reiniciar}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-[#C5CDD9] transition-colors hover:bg-white/10"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reiniciar
        </button>
        <button
          type="button"
          onClick={avanzar}
          disabled={completo}
          className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-2 text-xs font-medium text-teal-300 transition-colors hover:bg-teal-500/20 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-teal-500/10"
        >
          <ChevronsRight className="h-3.5 w-3.5" aria-hidden="true" />
          Avanzar
        </button>
      </div>

      <p className="mt-3 text-center text-xs text-[#6B7280]">
        Conversación real del sistema, con datos modificados.
      </p>
    </div>
  );
}
