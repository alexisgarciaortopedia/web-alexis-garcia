/**
 * Shell del panel nuevo -- HTML + CSS + JS vanilla en un solo archivo,
 * sin framework, servido directo por la Edge Function (igual criterio
 * que el panel viejo: el HTML es público, sin datos; todo dato real pasa
 * por /api/* con Bearer token real de Supabase Auth).
 *
 * Auth: magic link real de Supabase Auth, disparado desde el propio
 * navegador con la anon key (supabase.auth.signInWithOtp) -- sin
 * WhatsApp, sin whatsapp-worker.ts, sin nada del sistema viejo. Al volver
 * del link, supabase-js resuelve la sesión solo (detectSessionInUrl).
 *
 * El filtro por rol que aplica aquí (ocultar/deshabilitar campos) es solo
 * cosmético -- la autorización real vive en panel-luna/index.ts
 * (src/panel-permissions.ts), que valida cada request sin importar lo que
 * mande el cliente.
 */
export function renderPanelLunaHtml(params: {
  supabaseUrl: string;
  supabaseAnonKey: string;
  /**
   * Base absoluta de la API (sin slash final), p.ej.
   * "https://xxx.supabase.co/functions/v1/panel-luna". Siempre absoluta y
   * nunca relativa -- una ruta relativa como "api/me" se resuelve distinto
   * según si la URL de la página trae o no slash final, y panel-luna se
   * sirve sin él. Necesaria también para el mirror en el repo `privada`,
   * donde la API vive en otro origen (ver panel-luna-frontend.ts portado).
   */
  panelApiBase: string;
}): string {
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<title>Panel · Muévete Seguro</title>
<style>
  :root {
    --rojo: #d6304a;
    --ambar: #c78a1f;
    --verde: #2c9a5f;
    --bg: #0f1115;
    --card: #171a21;
    --card-border: #2a2e38;
    --text: #eef0f3;
    --text-muted: #9aa1ad;
    --accent: #1957d6;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background: var(--bg); color: var(--text); min-height: 100vh;
  }
  header {
    position: sticky; top: 0; z-index: 5;
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 16px; background: var(--bg); border-bottom: 1px solid var(--card-border);
  }
  header h1 { font-size: 17px; margin: 0; }
  header .quien { font-size: 12px; color: var(--text-muted); }
  nav.tabs { display: flex; gap: 6px; padding: 8px 12px; }
  nav.tabs button {
    flex: 1; padding: 10px; border-radius: 10px; border: 1px solid var(--card-border);
    background: var(--card); color: var(--text); font-size: 14px;
  }
  nav.tabs button.activo { background: var(--accent); border-color: var(--accent); }
  main { padding: 8px 12px 80px; max-width: 640px; margin: 0 auto; }
  .card {
    background: var(--card); border: 1px solid var(--card-border); border-radius: 14px;
    padding: 14px; margin-bottom: 10px;
  }
  .card.tocable { cursor: pointer; }
  .fila-top { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
  .nombre { font-weight: 600; font-size: 15px; }
  .badge { font-size: 12px; font-weight: 700; padding: 2px 9px; border-radius: 999px; color: #fff; white-space: nowrap; }
  .badge.rojo { background: var(--rojo); }
  .badge.ambar { background: var(--ambar); }
  .badge.verde { background: var(--verde); }
  .meta { color: var(--text-muted); font-size: 13px; margin-top: 2px; }
  .mensaje { margin-top: 8px; font-size: 14px; color: var(--text); background: #0000002e; padding: 8px 10px; border-radius: 8px; }
  .fila-acciones { display: flex; gap: 8px; margin-top: 10px; }
  button.accion {
    padding: 9px 14px; border-radius: 9px; border: 1px solid var(--card-border);
    background: #1e232c; color: var(--text); font-size: 13px;
  }
  button.accion.primario { background: var(--accent); border-color: var(--accent); }
  input, select, textarea {
    width: 100%; padding: 10px; border-radius: 9px; border: 1px solid var(--card-border);
    background: #0f131a; color: var(--text); font-size: 14px; margin-top: 4px;
  }
  label { font-size: 12px; color: var(--text-muted); display: block; margin-top: 12px; }
  .vacio { text-align: center; color: var(--text-muted); padding: 40px 20px; }
  .login-box { max-width: 360px; margin: 15vh auto; padding: 20px; }
  .login-box h2 { font-size: 18px; }
  .msg-ok { color: var(--verde); font-size: 13px; margin-top: 10px; }
  .msg-error { color: var(--rojo); font-size: 13px; margin-top: 10px; }
  .transcript { display: flex; flex-direction: column; gap: 6px; margin-top: 10px; }
  .turno { padding: 8px 10px; border-radius: 10px; font-size: 13px; max-width: 88%; }
  .turno.in { background: #22303f; align-self: flex-start; }
  .turno.out { background: #232a1f; align-self: flex-end; }
  .turno.alert { background: #3a2320; align-self: center; font-size: 12px; color: var(--text-muted); max-width: 100%; }
  .turno-hora { color: var(--text-muted); font-size: 11px; margin-top: 3px; }
  .volver { background: none; border: none; color: var(--accent); font-size: 14px; padding: 0 0 10px; }
  .campo-negocio-oculto { display: none; }
</style>
</head>
<body>
<div id="app"></div>

<script type="module">
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(${JSON.stringify(params.supabaseUrl)}, ${JSON.stringify(params.supabaseAnonKey)});
const PANEL_API_BASE = ${JSON.stringify(params.panelApiBase)};
const app = document.getElementById("app");

let sesion = null;
let operador = null;
let vista = { nombre: "alertas" };

function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function hace(iso) {
  if (!iso) return "sin actividad";
  const ms = Date.now() - new Date(iso).getTime();
  const min = Math.floor(ms / 60000);
  if (min < 1) return "hace un momento";
  if (min < 60) return \`hace \${min} min\`;
  const h = Math.floor(min / 60);
  if (h < 24) return \`hace \${h} h\`;
  return \`hace \${Math.floor(h / 24)} d\`;
}

/** Fecha y hora absolutas de un mensaje del transcript -- a diferencia de
 * hace() (relativo, para "última actividad"), aquí el punto es poder leer
 * CUÁNDO pasó cada turno de la conversación, sin que el dato se vuelva
 * ambiguo al releerlo días después. "" si el timestamp viene vacío o
 * inválido -- nunca truena el render de la conversación completa. */
function horaMensaje(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const fecha = d.toLocaleDateString("es-MX", { day: "numeric", month: "short" });
  const hora = d.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
  return \`\${fecha}, \${hora}\`;
}

async function api(path, options = {}) {
  const token = sesion?.access_token;
  const res = await fetch(\`\${PANEL_API_BASE}/\${path}\`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: \`Bearer \${token}\` } : {}),
      ...(options.headers || {}),
    },
  });
  if (res.status === 401) throw new Error("unauthorized");
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "error");
  return res.status === 204 ? null : res.json();
}

async function boot() {
  const { data } = await supabase.auth.getSession();
  sesion = data.session;
  if (!sesion) return render(pantallaLogin());

  supabase.auth.onAuthStateChange((_ev, s) => { sesion = s; });

  try {
    const { operator } = await api("api/me");
    operador = operator;
  } catch {
    return render(pantallaSinAcceso());
  }
  await irAAlertas();
}

function layout(contenido) {
  const wrap = el(\`<div></div>\`);
  wrap.appendChild(el(\`
    <header>
      <h1>Muévete Seguro</h1>
      <div class="quien">\${operador ? operador.nombre || operador.email : ""}</div>
    </header>
  \`));
  if (operador) {
    const tabs = el(\`
      <nav class="tabs">
        <button data-tab="alertas">Alertas</button>
        <button data-tab="casos">Casos</button>
        <button data-tab="atletas">Atletas</button>
      </nav>
    \`);
    tabs.querySelector('[data-tab="alertas"]').classList.toggle("activo", vista.nombre === "alertas");
    tabs.querySelector('[data-tab="casos"]').classList.toggle("activo", vista.nombre === "casos");
    tabs.querySelector('[data-tab="atletas"]').classList.toggle("activo", vista.nombre === "atletas");
    tabs.querySelector('[data-tab="alertas"]').onclick = irAAlertas;
    tabs.querySelector('[data-tab="casos"]').onclick = irACasos;
    tabs.querySelector('[data-tab="atletas"]').onclick = irAAtletas;
    wrap.appendChild(tabs);
  }
  const main = el(\`<main></main>\`);
  main.appendChild(contenido);
  wrap.appendChild(main);
  return wrap;
}

function render(contenido) {
  app.innerHTML = "";
  app.appendChild(contenido.tagName === "MAIN" || contenido.dataset?.raiz ? contenido : layout(contenido));
}

function pantallaLogin() {
  const raiz = el(\`<div data-raiz><div class="login-box">
    <h2>Panel · Muévete Seguro</h2>
    <label>Tu correo</label>
    <input type="email" id="email" placeholder="tu@correo.com" autocomplete="email">
    <button class="accion primario" id="enviar" style="margin-top:14px;width:100%">Enviar link de acceso</button>
    <div id="msg"></div>
  </div></div>\`);
  raiz.querySelector("#enviar").onclick = async () => {
    const email = raiz.querySelector("#email").value.trim();
    const msg = raiz.querySelector("#msg");
    if (!email) return;
    msg.textContent = "Enviando...";
    msg.className = "";
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin + window.location.pathname },
    });
    if (error) {
      msg.textContent = "No se pudo enviar el link: " + error.message;
      msg.className = "msg-error";
    } else {
      msg.textContent = "Listo -- revisa tu correo y abre el link desde este celular.";
      msg.className = "msg-ok";
    }
  };
  return raiz;
}

function pantallaSinAcceso() {
  const raiz = el(\`<div data-raiz><div class="login-box">
    <h2>Sin acceso</h2>
    <p style="color:var(--text-muted);font-size:14px">Tu correo entró correctamente, pero no está dado de alta en el panel. Pídele a Alexis que te agregue.</p>
    <button class="accion" id="salir">Cerrar sesión</button>
  </div></div>\`);
  raiz.querySelector("#salir").onclick = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };
  return raiz;
}

async function irAAlertas() {
  vista = { nombre: "alertas" };
  render(el(\`<div class="vacio">Cargando...</div>\`));
  try {
    const { alertas } = await api("api/alertas");
    render(vistaAlertas(alertas));
  } catch (e) {
    render(el(\`<div class="vacio">No se pudieron cargar las alertas.</div>\`));
  }
}

function vistaAlertas(alertas) {
  const cont = el(\`<div></div>\`);
  if (!alertas.length) {
    cont.appendChild(el(\`<div class="vacio">Sin alertas abiertas. Todo tranquilo. 🎉</div>\`));
    return cont;
  }
  for (const a of alertas) {
    const card = el(\`
      <div class="card">
        <div class="fila-top">
          <div class="nombre">\${a.nombre || "sin nombre"}</div>
          <span class="badge \${a.nivelActual}">\${a.nivelActual.toUpperCase()}</span>
        </div>
        <div class="meta">\${a.telefono || ""} · \${a.deporte || "deporte sin registrar"}</div>
        <div class="meta">\${a.zonaMolestiaActual ? "Zona: " + a.zonaMolestiaActual + " · " : ""}\${hace(a.ultimaActividad)}</div>
        \${a.ultimoMensajeAtleta ? \`<div class="mensaje">"\${a.ultimoMensajeAtleta}"</div>\` : ""}
        <div class="fila-acciones">
          <button class="accion primario" data-ver>Ver conversación</button>
          <button class="accion" data-atender>Atendido</button>
        </div>
      </div>
    \`);
    card.querySelector("[data-ver]").onclick = () => irADetalle(a.phoneHash);
    card.querySelector("[data-atender]").onclick = async (ev) => {
      ev.target.disabled = true;
      ev.target.textContent = "...";
      try {
        await api(\`api/alertas/\${a.phoneHash}/atender\`, { method: "POST" });
        card.remove();
        if (!cont.querySelector(".card")) irAAlertas();
      } catch {
        ev.target.disabled = false;
        ev.target.textContent = "Atendido";
      }
    };
    cont.appendChild(card);
  }
  return cont;
}

// ---- Puente humano (Fase 4): lista de casos abiertos ----

const ETIQUETA_TIPO_HANDOFF = {
  revision_clinica: "Revisión clínica -- Luna sigue respondiendo",
  toma_humana: "Puente activo -- Luna está callada",
};

async function irACasos() {
  vista = { nombre: "casos" };
  render(el(\`<div class="vacio">Cargando...</div>\`));
  try {
    const { handoffs } = await api("api/handoffs");
    render(vistaCasos(handoffs));
  } catch {
    render(el(\`<div class="vacio">No se pudieron cargar los casos.</div>\`));
  }
}

function vistaCasos(handoffs) {
  const cont = el(\`<div></div>\`);
  if (!handoffs.length) {
    cont.appendChild(el(\`<div class="vacio">Sin casos abiertos. 🎉</div>\`));
    return cont;
  }
  for (const h of handoffs) {
    const card = el(\`
      <div class="card tocable">
        <div class="fila-top">
          <div class="nombre">\${h.nombreAtleta || "sin nombre"}</div>
          \${h.nivelOrigen ? \`<span class="badge \${h.nivelOrigen}">\${h.nivelOrigen.toUpperCase()}</span>\` : ""}
        </div>
        <div class="meta">\${ETIQUETA_TIPO_HANDOFF[h.tipo] || h.tipo}</div>
        \${h.razon ? \`<div class="mensaje">\${h.razon}</div>\` : ""}
        <div class="meta">Abierto \${hace(h.creadoAt)}</div>
        <div class="fila-acciones">
          <button class="accion" data-cerrar>Cerrar caso</button>
        </div>
      </div>
    \`);
    card.onclick = () => irADetalle(h.phoneHash);
    const botonCerrar = card.querySelector("[data-cerrar]");
    botonCerrar.onclick = async (ev) => {
      ev.stopPropagation(); // no navegar a la ficha al cerrar desde la lista
      ev.target.disabled = true;
      ev.target.textContent = "...";
      try {
        await api(\`api/handoffs/\${h.id}/cerrar\`, { method: "POST" });
        card.remove();
        if (!cont.querySelector(".card")) irACasos();
      } catch {
        ev.target.disabled = false;
        ev.target.textContent = "Cerrar caso";
      }
    };
    cont.appendChild(card);
  }
  return cont;
}

async function irAAtletas() {
  vista = { nombre: "atletas" };
  render(el(\`<div class="vacio">Cargando...</div>\`));
  await recargarAtletas();
}

async function recargarAtletas(filtros = {}) {
  const params = new URLSearchParams(filtros);
  try {
    const { atletas } = await api("api/atletas?" + params.toString());
    render(vistaAtletas(atletas, filtros));
  } catch {
    render(el(\`<div class="vacio">No se pudo cargar la lista de atletas.</div>\`));
  }
}

function vistaAtletas(atletas, filtrosActuales) {
  const esAdmin = operador?.rol === "admin";
  const cont = el(\`<div>
    <div class="card">
      <input type="search" id="buscar" placeholder="Buscar por nombre o teléfono" value="\${filtrosActuales.q || ""}">
      \${esAdmin ? \`
      <div style="display:flex;gap:8px;margin-top:8px">
        <select id="f-estado" style="margin-top:0">
          <option value="">Estado: todos</option>
          <option value="activo">Activo</option>
          <option value="pausado">Pausado</option>
          <option value="baja">Baja</option>
        </select>
        <select id="f-nivel" style="margin-top:0">
          <option value="">Nivel: todos</option>
          <option value="rojo">Rojo</option>
          <option value="ambar">Ámbar</option>
          <option value="verde">Verde</option>
        </select>
      </div>\` : ""}
    </div>
  </div>\`);
  if (esAdmin) {
    cont.querySelector("#f-estado").value = filtrosActuales.estado || "";
    cont.querySelector("#f-nivel").value = filtrosActuales.nivel || "";
    cont.querySelector("#f-estado").onchange = (e) => recargarAtletas({ ...filtrosActuales, estado: e.target.value });
    cont.querySelector("#f-nivel").onchange = (e) => recargarAtletas({ ...filtrosActuales, nivel: e.target.value });
  }
  let temporizador;
  cont.querySelector("#buscar").oninput = (e) => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => recargarAtletas({ ...filtrosActuales, q: e.target.value }), 300);
  };

  if (!atletas.length) {
    cont.appendChild(el(\`<div class="vacio">Sin resultados.</div>\`));
    return cont;
  }
  for (const a of atletas) {
    const card = el(\`
      <div class="card tocable">
        <div class="fila-top">
          <div class="nombre">\${a.nombre || "sin nombre"}</div>
          \${a.nivel_actual ? \`<span class="badge \${a.nivel_actual}">\${a.nivel_actual.toUpperCase()}</span>\` : ""}
        </div>
        <div class="meta">\${a.telefono || ""} · \${a.deporte || "deporte sin registrar"}</div>
        \${esAdmin ? \`<div class="meta">\${a.origen || "origen sin registrar"} · \${a.estado}</div>\` : ""}
        <div class="meta">\${hace(a.ultima_actividad)}</div>
      </div>
    \`);
    card.onclick = () => irADetalle(a.phone_hash);
    cont.appendChild(card);
  }
  return cont;
}

async function irADetalle(phoneHash) {
  render(el(\`<div class="vacio">Cargando...</div>\`));
  try {
    const { atleta, transcript, handoffTomaHumanaAbierto, handoffTomaHumanaId, lunaCallada } = await api(\`api/atletas/\${phoneHash}\`);
    render(vistaDetalle(atleta, transcript, handoffTomaHumanaAbierto, handoffTomaHumanaId, lunaCallada));
  } catch {
    render(el(\`<div class="vacio">No se pudo cargar la ficha.</div>\`));
  }
}

function vistaDetalle(atleta, transcript, handoffTomaHumanaAbierto, handoffTomaHumanaId, lunaCallada) {
  const esAdmin = operador?.rol === "admin";
  const cont = el(\`<div></div>\`);
  const volver = el(\`<button class="volver">← Volver</button>\`);
  volver.onclick = () => {
    if (vista.nombre === "atletas") return irAAtletas();
    if (vista.nombre === "casos") return irACasos();
    return irAAlertas();
  };
  cont.appendChild(volver);

  cont.appendChild(el(\`
    <div class="card">
      <div class="fila-top">
        <div class="nombre">\${atleta.nombre || "sin nombre"}</div>
        \${atleta.nivel_actual ? \`<span class="badge \${atleta.nivel_actual}">\${atleta.nivel_actual.toUpperCase()}</span>\` : ""}
      </div>
      <div class="meta">\${atleta.telefono || ""}</div>
      <div class="meta">\${atleta.deporte || "deporte sin registrar"} · \${atleta.objetivo || "sin objetivo registrado"}</div>
      <div class="meta">\${atleta.zona_molestia_actual ? "Zona actual: " + atleta.zona_molestia_actual : "sin molestia activa registrada"}</div>
      <div class="meta">Alertas: \${atleta.alertas_ambar || 0} ámbar · \${atleta.alertas_rojas || 0} rojas</div>
      \${esAdmin ? \`<div class="meta">\${atleta.origen || "origen sin registrar"} · doctor: \${atleta.doctor_asignado || "-"}</div>\` : ""}
    </div>
  \`));

  cont.appendChild(cardPuenteHumano(atleta.phone_hash, handoffTomaHumanaAbierto, handoffTomaHumanaId, lunaCallada));

  const form = el(\`
    <div class="card">
      \${esAdmin ? \`
      <label>Estado</label>
      <select id="estado">
        <option value="activo">Activo</option>
        <option value="pausado">Pausado</option>
        <option value="baja">Baja</option>
      </select>
      \` : ""}
      <label><input type="checkbox" id="agendo" style="width:auto;display:inline-block;vertical-align:middle"> Agendó cita</label>
      <label><input type="checkbox" id="asistio" style="width:auto;display:inline-block;vertical-align:middle"> Asistió</label>
      <label>Notas del equipo</label>
      <textarea id="notas" rows="3">\${atleta.notas_equipo || ""}</textarea>
      <button class="accion primario" id="guardar" style="margin-top:12px">Guardar</button>
      <div id="msg-guardar"></div>
    </div>
  \`);
  if (esAdmin) {
    form.querySelector("#estado").value = atleta.estado;
  }
  form.querySelector("#agendo").checked = !!atleta.agendo;
  form.querySelector("#asistio").checked = !!atleta.asistio;
  form.querySelector("#guardar").onclick = async () => {
    const patch = {
      notas_equipo: form.querySelector("#notas").value,
      agendo: form.querySelector("#agendo").checked,
      asistio: form.querySelector("#asistio").checked,
    };
    if (esAdmin) {
      patch.estado = form.querySelector("#estado").value;
    }
    const msg = form.querySelector("#msg-guardar");
    msg.textContent = "Guardando...";
    msg.className = "";
    try {
      await api(\`api/atletas/\${atleta.phone_hash}\`, { method: "PATCH", body: JSON.stringify(patch) });
      msg.textContent = "Guardado.";
      msg.className = "msg-ok";
    } catch (e) {
      msg.textContent = "No se pudo guardar.";
      msg.className = "msg-error";
    }
  };
  cont.appendChild(form);

  // Reportes clínicos ("El Erudito") -- de cualquier operador autenticado
  // (generar/listar/ver/editar); aprobar y descargar PDF son solo admin,
  // ver vistaRevisionReporte.
  cont.appendChild(cardReportes(atleta.phone_hash));

  const hilo = el(\`<div class="card"><div class="meta" style="margin-bottom:4px">Conversación completa</div><div class="transcript"></div></div>\`);
  const lista = hilo.querySelector(".transcript");
  for (const m of transcript) {
    lista.appendChild(el(\`<div class="turno \${m.direccion}">\${(m.texto || "").replace(/</g, "&lt;")}<div class="turno-hora">\${horaMensaje(m.created_at)}</div></div>\`));
  }
  cont.appendChild(hilo);

  return cont;
}

// ---- Puente humano (Fase 4, ajuste "decisión explícita"): tomar
// conversación y responder desde el panel.
//
// "Tomar conversación" (se queda igual) activa el candado sin
// preguntar nada -- es una acción deliberada de un solo paso.
//
// "Enviar" es distinto: si NO hay un puente tipo='toma_humana' abierto
// todavía, el panel PREGUNTA antes de mandar ("Mandar y tomar la
// conversación" vs. "Solo mandar este mensaje") -- nunca asume. Si ya
// hay uno abierto, manda directo (tomarConversacion:true de todos
// modos -- el backend lo reusa sin duplicar, ver
// src/panel-handoffs.ts::tomarConversacion).
//
// El indicador de arriba ("Luna activa" / "Luna callada") viene del
// backend (lunaCallada, mismo debeCallarLuna que aplica el candado
// real) -- nunca se calcula ni se adivina en el cliente.
//
// El mensaje que se manda aquí se firma siempre "— Equipo Muévete
// Seguro" (nunca un nombre propio, eso lo agrega el backend) y queda
// en la conversación completa de abajo en cuanto se recarga la ficha.

function cardPuenteHumano(phoneHash, handoffTomaHumanaAbierto, handoffTomaHumanaId, lunaCallada) {
  const card = el(\`
    <div class="card">
      <div class="fila-top">
        <div class="meta">Puente humano</div>
        <span class="badge \${lunaCallada ? "rojo" : "verde"}">\${lunaCallada ? "🔇 Luna callada" : "🟢 Luna activa"}</span>
      </div>
      <div class="fila-acciones" style="margin-top:8px">
        <button class="accion primario" id="tomar-conversacion">Tomar conversación</button>
        \${handoffTomaHumanaAbierto ? \`<button class="accion" id="cerrar-caso">Cerrar caso</button>\` : ""}
      </div>
      <div id="msg-tomar"></div>
      <label style="margin-top:14px">Responder al atleta (WhatsApp)</label>
      <textarea id="mensaje-operador" rows="3" placeholder="Escribe tu mensaje..."></textarea>
      <button class="accion primario" id="enviar-mensaje" style="margin-top:8px">Enviar</button>
      <div id="eleccion-tomar"></div>
      <div id="msg-enviar"></div>
    </div>
  \`);

  card.querySelector("#tomar-conversacion").onclick = async (ev) => {
    ev.target.disabled = true;
    const msg = card.querySelector("#msg-tomar");
    msg.textContent = "Tomando conversación...";
    msg.className = "";
    try {
      await api(\`api/atletas/\${phoneHash}/tomar\`, { method: "POST" });
      msg.textContent = "Listo -- Luna se calla, tú sigues la conversación.";
      msg.className = "msg-ok";
      irADetalle(phoneHash);
    } catch {
      msg.textContent = "No se pudo tomar la conversación.";
      msg.className = "msg-error";
      ev.target.disabled = false;
    }
  };

  if (handoffTomaHumanaAbierto) {
    card.querySelector("#cerrar-caso").onclick = async (ev) => {
      ev.target.disabled = true;
      const msg = card.querySelector("#msg-tomar");
      msg.textContent = "Cerrando caso...";
      msg.className = "";
      try {
        await api(\`api/handoffs/\${handoffTomaHumanaId}/cerrar\`, { method: "POST" });
        msg.textContent = "Cerrado -- Luna retoma la conversación.";
        msg.className = "msg-ok";
        irADetalle(phoneHash);
      } catch {
        msg.textContent = "No se pudo cerrar el caso.";
        msg.className = "msg-error";
        ev.target.disabled = false;
      }
    };
  }

  async function mandarMensaje(texto, tomarConversacionElegido) {
    const msg = card.querySelector("#msg-enviar");
    card.querySelector("#eleccion-tomar").innerHTML = "";
    msg.textContent = "Enviando...";
    msg.className = "";
    try {
      await api(\`api/atletas/\${phoneHash}/responder\`, {
        method: "POST",
        body: JSON.stringify({ mensaje: texto, tomarConversacion: tomarConversacionElegido }),
      });
      msg.textContent = "Enviado.";
      msg.className = "msg-ok";
      irADetalle(phoneHash);
    } catch {
      msg.textContent = "No se pudo enviar.";
      msg.className = "msg-error";
    }
  }

  function preguntarSiTomar(texto) {
    const contenedor = card.querySelector("#eleccion-tomar");
    contenedor.innerHTML = "";
    const pregunta = el(\`
      <div class="card" style="margin-top:8px;padding:10px">
        <div class="meta" style="margin-bottom:8px">Luna sigue activa para este atleta. ¿Qué quieres hacer?</div>
        <div class="fila-acciones">
          <button class="accion primario" id="elegir-tomar">Mandar y tomar la conversación</button>
          <button class="accion" id="elegir-solo-mandar">Solo mandar este mensaje</button>
        </div>
      </div>
    \`);
    pregunta.querySelector("#elegir-tomar").onclick = () => mandarMensaje(texto, true);
    pregunta.querySelector("#elegir-solo-mandar").onclick = () => mandarMensaje(texto, false);
    contenedor.appendChild(pregunta);
  }

  card.querySelector("#enviar-mensaje").onclick = () => {
    const texto = card.querySelector("#mensaje-operador").value;
    const msg = card.querySelector("#msg-enviar");
    if (!texto.trim()) {
      msg.textContent = "Escribe un mensaje primero.";
      msg.className = "msg-error";
      return;
    }
    msg.textContent = "";
    msg.className = "";
    if (handoffTomaHumanaAbierto) {
      // Ya hay un puente abierto -- no se pregunta nada (punto 2 del
      // ajuste), se manda directo y el backend lo reusa sin duplicar.
      mandarMensaje(texto, true);
    } else {
      preguntarSiTomar(texto);
    }
  };

  return card;
}

// ---- "El Erudito": reporte clínico en 2 etapas. Solo admin (ver
// puedeGestionarReportes en src/panel-permissions.ts, validado también en
// el servidor -- esto es solo cosmético).

function cardReportes(phoneHash) {
  const card = el(\`
    <div class="card">
      <div class="meta" style="margin-bottom:6px">Reportes clínicos (El Erudito)</div>
      <div style="display:flex;gap:8px">
        <div style="flex:1">
          <label>Del</label>
          <input type="date" id="periodo-inicio">
        </div>
        <div style="flex:1">
          <label>Al</label>
          <input type="date" id="periodo-fin">
        </div>
      </div>
      <button class="accion primario" id="generar-reporte" style="margin-top:12px">Generar reporte</button>
      <div id="msg-reporte"></div>
      <div id="lista-reportes" style="margin-top:10px"></div>
    </div>
  \`);

  card.querySelector("#generar-reporte").onclick = async (ev) => {
    const inicio = card.querySelector("#periodo-inicio").value;
    const fin = card.querySelector("#periodo-fin").value;
    const msg = card.querySelector("#msg-reporte");
    if (!inicio || !fin) {
      msg.textContent = "Elige ambas fechas.";
      msg.className = "msg-error";
      return;
    }
    ev.target.disabled = true;
    msg.textContent = "Generando... esto puede tardar un momento (2 etapas de IA).";
    msg.className = "";
    try {
      const { reporte } = await api(\`api/atletas/\${phoneHash}/reportes\`, {
        method: "POST",
        body: JSON.stringify({
          periodo_inicio: new Date(inicio + "T00:00:00").toISOString(),
          periodo_fin: new Date(fin + "T23:59:59").toISOString(),
        }),
      });
      irARevisionReporte(phoneHash, reporte.id);
    } catch (e) {
      ev.target.disabled = false;
      msg.textContent = "No se pudo generar: " + (e.message || "error desconocido");
      msg.className = "msg-error";
    }
  };

  cargarListaReportes(phoneHash, card.querySelector("#lista-reportes"));
  return card;
}

async function cargarListaReportes(phoneHash, contenedor) {
  contenedor.textContent = "Cargando reportes...";
  try {
    const { reportes } = await api(\`api/atletas/\${phoneHash}/reportes\`);
    contenedor.innerHTML = "";
    if (!reportes.length) {
      contenedor.appendChild(el(\`<div class="meta">Sin reportes generados todavía.</div>\`));
      return;
    }
    for (const r of reportes) {
      const fila = el(\`
        <div class="card tocable" style="margin:6px 0;padding:10px">
          <div class="fila-top">
            <div class="meta">\${(r.periodo_inicio || "").slice(0, 10)} → \${(r.periodo_fin || "").slice(0, 10)}</div>
            <span class="badge \${r.estado === "aprobado" ? "verde" : "ambar"}">\${r.estado.toUpperCase()}</span>
          </div>
        </div>
      \`);
      fila.onclick = () => irARevisionReporte(phoneHash, r.id);
      contenedor.appendChild(fila);
    }
  } catch {
    contenedor.innerHTML = "";
    contenedor.appendChild(el(\`<div class="meta">No se pudieron cargar los reportes.</div>\`));
  }
}

async function irARevisionReporte(phoneHash, reporteId) {
  render(el(\`<div class="vacio">Cargando...</div>\`));
  try {
    const { reportes } = await api(\`api/atletas/\${phoneHash}/reportes\`);
    const reporte = reportes.find((r) => r.id === reporteId);
    if (!reporte) throw new Error("no encontrado");
    render(vistaRevisionReporte(phoneHash, reporte));
  } catch {
    render(el(\`<div class="vacio">No se pudo cargar el reporte.</div>\`));
  }
}

function vistaRevisionReporte(phoneHash, reporte) {
  const cont = el(\`<div></div>\`);
  const volver = el(\`<button class="volver">← Volver a la ficha</button>\`);
  volver.onclick = () => irADetalle(phoneHash);
  cont.appendChild(volver);

  const aprobado = reporte.estado === "aprobado";
  const esAdmin = operador?.rol === "admin";

  cont.appendChild(el(\`
    <div class="card">
      <div class="fila-top">
        <div class="nombre">Reporte clínico</div>
        <span class="badge \${aprobado ? "verde" : "ambar"}">\${reporte.estado.toUpperCase()}</span>
      </div>
      <div class="meta">\${(reporte.periodo_inicio || "").slice(0, 10)} → \${(reporte.periodo_fin || "").slice(0, 10)}</div>
      \${aprobado ? \`<div class="meta">Aprobado: \${hace(reporte.aprobado_at)}</div>\` : ""}
    </div>
  \`));

  // Editar (nota y carta) y "Guardar cambios" son de cualquier operador
  // mientras esté en borrador. "Aprobar y firmar" y "Descargar PDF" son
  // solo del admin -- esto es cosmético, la autorización real la aplica
  // panel-luna/index.ts (puedeAprobarReportes) sin importar lo que mande
  // el cliente.
  const form = el(\`
    <div class="card">
      <label>Nota para el doctor (nunca sale en el PDF ni se manda al atleta)</label>
      <textarea id="nota-doctor" rows="8" \${aprobado ? "disabled" : ""}></textarea>
      <label style="margin-top:16px">Carta al atleta</label>
      <textarea id="carta-atleta" rows="10" \${aprobado ? "disabled" : ""}></textarea>
      <div class="fila-acciones" style="margin-top:12px">
        \${!aprobado ? \`<button class="accion" id="guardar-cambios">Guardar cambios</button>\` : ""}
        \${!aprobado && esAdmin ? \`<button class="accion primario" id="aprobar">Aprobar y firmar</button>\` : ""}
      </div>
      \${!aprobado && !esAdmin ? \`<div class="meta" style="margin-top:6px">Solo Alexis puede aprobar y firmar este reporte.</div>\` : ""}
      <div id="msg-revision"></div>
      \${aprobado && esAdmin ? \`<button class="accion primario" id="descargar-pdf" style="margin-top:10px">Descargar PDF (solo la carta)</button>\` : ""}
    </div>
  \`);
  form.querySelector("#nota-doctor").value = reporte.nota_doctor || "";
  form.querySelector("#carta-atleta").value = reporte.carta_atleta || "";
  const msg = form.querySelector("#msg-revision");

  if (!aprobado) {
    form.querySelector("#guardar-cambios").onclick = async () => {
      msg.textContent = "Guardando...";
      msg.className = "";
      try {
        await api(\`api/reportes/\${reporte.id}\`, {
          method: "PATCH",
          body: JSON.stringify({
            nota_doctor: form.querySelector("#nota-doctor").value,
            carta_atleta: form.querySelector("#carta-atleta").value,
          }),
        });
        msg.textContent = "Guardado.";
        msg.className = "msg-ok";
      } catch {
        msg.textContent = "No se pudo guardar.";
        msg.className = "msg-error";
      }
    };

    if (esAdmin) {
      form.querySelector("#aprobar").onclick = async () => {
        if (!confirm("¿Aprobar y firmar este reporte? Ya no se podrá editar después.")) return;
        msg.textContent = "Aprobando...";
        msg.className = "";
        try {
          await api(\`api/reportes/\${reporte.id}/aprobar\`, {
            method: "POST",
            body: JSON.stringify({
              nota_doctor: form.querySelector("#nota-doctor").value,
              carta_atleta: form.querySelector("#carta-atleta").value,
            }),
          });
          irARevisionReporte(phoneHash, reporte.id);
        } catch {
          msg.textContent = "No se pudo aprobar.";
          msg.className = "msg-error";
        }
      };
    }
  } else if (esAdmin) {
    form.querySelector("#descargar-pdf").onclick = async (ev) => {
      const boton = ev.target;
      boton.disabled = true;
      try {
        const token = sesion?.access_token;
        const res = await fetch(\`\${PANEL_API_BASE}/api/reportes/\${reporte.id}/pdf\`, {
          headers: token ? { Authorization: \`Bearer \${token}\` } : {},
        });
        if (!res.ok) throw new Error("fallo");
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = \`carta-atleta-\${reporte.id}.pdf\`;
        a.click();
        URL.revokeObjectURL(url);
      } catch {
        msg.textContent = "No se pudo descargar el PDF.";
        msg.className = "msg-error";
      } finally {
        boton.disabled = false;
      }
    };
  }

  cont.appendChild(form);
  return cont;
}

boot();
</script>
</body>
</html>`;
}
