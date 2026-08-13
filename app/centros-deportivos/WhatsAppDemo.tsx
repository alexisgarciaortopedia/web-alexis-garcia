"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CONVERSACIONES, type Turno } from "./conversations";

type EstadoCheck = 1 | 2 | 3; // 1 = enviado, 2 = entregado, 3 = leído (azul)

type Cancelable = { cancelado: boolean };

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Nunca un tiempo fijo -- ±20% de variación sobre el valor base. */
function jitter(ms: number): number {
  return Math.round(ms * (0.8 + Math.random() * 0.4));
}

/** Duración del "escribiendo…" proporcional al largo del mensaje, con
 * piso y techo para que ni un mensaje corto se sienta instantáneo ni uno
 * largo se sienta eterno, más el ±20% de variación. */
function duracionTecleo(texto: string): number {
  return jitter(Math.min(2600, Math.max(900, 350 + texto.length * 7)));
}

type Callbacks = {
  setVisibles: (n: number) => void;
  setTecleando: (v: "atleta" | "luna" | null) => void;
  setChecks: (updater: (prev: Record<number, EstadoCheck>) => Record<number, EstadoCheck>) => void;
};

/**
 * Reproduce una conversación turno a turno -- función de módulo (no un
 * hook) para poder recorrer una lista arbitraria de turnos sin las
 * restricciones de los hooks de React sobre recursión/estado. `token`
 * se revisa después de cada `await`: si ya se canceló (cambio de
 * pestaña, desmontaje), la función corta de inmediato sin tocar estado
 * de un componente que ya siguió adelante.
 */
async function reproducirConversacion(turnos: Turno[], token: Cancelable, cb: Callbacks): Promise<void> {
  for (let i = 0; i < turnos.length; i++) {
    if (token.cancelado) return;
    const turno = turnos[i]!;

    if (turno.tipo === "separador") {
      await sleep(jitter(500));
      if (token.cancelado) return;
      cb.setVisibles(i + 1);
      await sleep(jitter(500));
      continue;
    }

    // El atleta tarda más en "decidirse a escribir" que Luna en
    // responder -- ambos con variación, nunca un tiempo fijo.
    await sleep(turno.de === "atleta" ? jitter(1000) : jitter(650));
    if (token.cancelado) return;

    cb.setTecleando(turno.de);
    await sleep(duracionTecleo(turno.texto));
    if (token.cancelado) return;

    cb.setTecleando(null);
    cb.setVisibles(i + 1);

    if (turno.de === "luna") {
      // Palomitas con retraso -- enviado, entregado, leído (azul) --
      // en paralelo al resto de la conversación, nunca bloqueándola.
      const indice = i;
      cb.setChecks((prev) => ({ ...prev, [indice]: 1 }));
      sleep(jitter(450)).then(() => {
        if (!token.cancelado) cb.setChecks((prev) => ({ ...prev, [indice]: 2 }));
      });
      sleep(jitter(1100)).then(() => {
        if (!token.cancelado) cb.setChecks((prev) => ({ ...prev, [indice]: 3 }));
      });
    }
  }
}

function Palomitas({ estado }: { estado: EstadoCheck }) {
  const color = estado === 3 ? "#34B7F1" : "rgba(255,255,255,0.6)";
  return (
    <svg viewBox="0 0 18 12" className="h-[10px] w-[15px]" aria-hidden="true">
      {estado >= 2 && (
        <path
          d="M1 6.2 4.4 9.6 10.6 2.2"
          fill="none"
          stroke={color}
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      <path
        d="M6.4 6.2 9.8 9.6 16.4 2.2"
        fill="none"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
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
            className={`h-1.5 w-1.5 animate-bounce rounded-full ${esLuna ? "bg-[#04201A]/70" : "bg-white/60"}`}
            style={{ animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function Separador({ texto }: { texto: string }) {
  return (
    <div className="my-1 flex justify-center">
      <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-[#8C95A3]">
        {texto}
      </span>
    </div>
  );
}

function Burbuja({ turno, check }: { turno: Extract<Turno, { tipo: "mensaje" }>; check?: EstadoCheck }) {
  const esLuna = turno.de === "luna";
  return (
    <div className={`flex flex-col ${esLuna ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed sm:max-w-[75%] ${
          esLuna ? "rounded-br-sm bg-teal-500 text-[#04201A]" : "rounded-bl-sm bg-white/10 text-[#E5E9F0]"
        }`}
      >
        {turno.texto}
      </div>
      <span className="mt-1 flex items-center gap-1 px-1 text-[10px] text-[#6B7280]">
        {esLuna ? "Luna" : "Atleta"}
        {esLuna && check && <Palomitas estado={check} />}
      </span>
    </div>
  );
}

const RETARDO_SIGUIENTE_MS = 2200;

export function WhatsAppDemo() {
  const [activo, setActivo] = useState(0);
  const [replayToken, setReplayToken] = useState(0);
  const [visibles, setVisibles] = useState(0);
  const [tecleando, setTecleando] = useState<"atleta" | "luna" | null>(null);
  const [checks, setChecks] = useState<Record<number, EstadoCheck>>({});
  const [fade, setFade] = useState(true);
  const manualRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const conversacion = CONVERSACIONES[activo]!;

  // Reinicia el estado visual para arrancar una conversación desde cero
  // -- se llama SIEMPRE desde un manejador (clic de pestaña) o un
  // callback de temporizador, nunca de forma síncrona en el cuerpo de un
  // efecto (eso dispara re-renders en cascada, ver react-hooks/set-state-in-effect).
  const reiniciarVisual = useCallback(() => {
    setVisibles(0);
    setTecleando(null);
    setChecks({});
    setFade(false);
  }, []);

  useEffect(() => {
    const token: Cancelable = { cancelado: false };
    const cuadro = requestAnimationFrame(() => setFade(true));

    let siguienteTimeout: ReturnType<typeof setTimeout> | undefined;
    reproducirConversacion(conversacion.turnos, token, { setVisibles, setTecleando, setChecks }).then(() => {
      if (token.cancelado || manualRef.current) return;
      siguienteTimeout = setTimeout(() => {
        if (token.cancelado) return;
        reiniciarVisual();
        setActivo((a) => (a + 1) % CONVERSACIONES.length);
      }, RETARDO_SIGUIENTE_MS);
    });

    return () => {
      token.cancelado = true;
      cancelAnimationFrame(cuadro);
      if (siguienteTimeout !== undefined) clearTimeout(siguienteTimeout);
    };
  }, [activo, replayToken, conversacion, reiniciarVisual]);

  useEffect(() => {
    const nodo = scrollRef.current;
    if (!nodo) return;
    nodo.scrollTo({ top: nodo.scrollHeight, behavior: "smooth" });
  }, [visibles, tecleando]);

  const elegirPestana = useCallback(
    (i: number) => {
      manualRef.current = true;
      reiniciarVisual();
      setActivo(i);
      setReplayToken((t) => t + 1);
    },
    [reiniciarVisual],
  );

  const mensajesTotales = conversacion.turnos.filter((t) => t.tipo === "mensaje").length;
  const mensajesVistos = conversacion.turnos.slice(0, visibles).filter((t) => t.tipo === "mensaje").length;
  const progreso = mensajesTotales > 0 ? mensajesVistos / mensajesTotales : 0;

  return (
    <div>
      {/* Pestañas -- discretas, subrayado en vez de pastilla llena para
          no competir con el botón de WhatsApp. */}
      <div className="mb-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
        {CONVERSACIONES.map((c, i) => (
          <button
            key={c.id}
            type="button"
            onClick={() => elegirPestana(i)}
            aria-current={i === activo}
            className={`border-b-2 pb-1.5 text-xs font-medium transition-colors sm:text-sm ${
              i === activo
                ? "border-teal-400 text-white"
                : "border-transparent text-[#6B7280] hover:text-[#B9C0CC]"
            }`}
          >
            {c.titulo}
          </button>
        ))}
      </div>

      {/* Indicador de progreso -- sutil, un solo hilo delgado. */}
      <div className="mb-4 h-[2px] w-full overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full origin-left rounded-full bg-teal-400 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `scaleX(${progreso})`, width: "100%" }}
        />
      </div>

      {/* Marco del teléfono -- sobrio: bisel oscuro, muesca superior. */}
      <div className="rounded-[40px] border border-white/10 bg-[#0a0c0f] p-2 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.65)]">
        <div className="relative overflow-hidden rounded-[32px] bg-[rgba(10,12,15,0.9)]">
          <div className="absolute left-1/2 top-2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-black/50" />

          <div className="flex items-center gap-3 border-b border-white/10 bg-[#0b1115]/90 px-4 pb-3 pt-6">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/40 to-blue-500/40 text-sm font-bold text-teal-300">
              L
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Luna · Muévete Seguro</span>
              <span className="text-xs text-[#8C95A3]">{tecleando ? "escribiendo…" : "en línea"}</span>
            </div>
          </div>

          <div
            ref={scrollRef}
            className={`flex h-[400px] flex-col gap-3 overflow-y-auto px-4 py-5 transition-opacity duration-300 ease-out sm:h-[440px] ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mt-auto flex flex-col gap-3">
              {conversacion.turnos.slice(0, visibles).map((turno, i) =>
                turno.tipo === "separador" ? (
                  <Separador key={i} texto={turno.texto} />
                ) : (
                  <Burbuja key={i} turno={turno} check={checks[i]} />
                ),
              )}
              {tecleando && <BurbujaTecleando de={tecleando} />}
            </div>
          </div>

          <div className="border-t border-white/10 px-4 py-3">
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-[#6B7280]">
              Escribe un mensaje…
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-[#6B7280]">
        Conversación real del sistema, con datos modificados.
      </p>
    </div>
  );
}
