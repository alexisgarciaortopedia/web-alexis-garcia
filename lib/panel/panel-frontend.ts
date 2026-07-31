/**
 * Panel de Muévete Seguro — servido desde este sitio (dominio propio de
 * Alexis) en vez de *.supabase.co: Supabase reescribe cualquier
 * respuesta text/html a text/plain en su dominio por defecto
 * (limitación documentada de la plataforma, confirmada con curl -I
 * contra producción — CSP "default-src 'none'; sandbox" + nosniff eran
 * la huella exacta). Next.js/Vercel sí respeta Content-Type real.
 *
 * ORIGEN: portado literal desde muevete-seguro-backend
 * (supabase/functions/_shared/panel-frontend.ts) — ese repo sigue
 * siendo la fuente canónica del look/lógica (tests automatizados viven
 * ahí, con Deno test). Cualquier cambio de comportamiento del panel se
 * hace primero ahí, se prueba, y se vuelve a portar aquí — este archivo
 * no tiene su propia suite de tests en este repo.
 *
 * panel-api (los datos reales, la autenticación, las acciones) sigue
 * viviendo en Supabase — este archivo solo genera el HTML/CSS/JS del
 * shell; todo dato real cruza el origen vía fetch() con CORS
 * (PANEL_ALLOWED_ORIGIN configurado del lado de Supabase).
 *
 * Look & feel: mismo sistema de tokens que la maqueta aprobada por
 * Alexis — cobalt #1957D6 como único acento de marca, semáforo
 * rojo/ámbar/gris como información de estado, pila tipográfica del
 * sistema.
 */

/** /c/<handoffId> bajo la ruta del panel -> handoffId, o null si no matchea. */
export function parsePanelDeepLinkHandoffId(pathname: string): string | null {
  const match = /\/c\/([^/]+)\/?$/.exec(pathname);
  if (!match) return null;
  const id = match[1]?.trim();
  return id ? id : null;
}

export interface PanelManifest {
  name: string;
  short_name: string;
  start_url: string;
  display: string;
  background_color: string;
  theme_color: string;
  icons: Array<{ src: string; sizes: string; type: string; purpose?: string }>;
}

/** PWA anclable — icono generado en runtime vía canvas no aplica aquí
 * (manifest necesita URLs reales); se usa un ícono maskable simple SVG
 * data-URI en lugar de archivos PNG nuevos que gestionar. */
const PANEL_ICON_SVG_DATA_URI =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192">' +
      '<rect width="192" height="192" rx="40" fill="#1957D6"/>' +
      '<text x="96" y="128" font-family="-apple-system,system-ui,sans-serif" ' +
      'font-size="104" font-weight="700" fill="#FFFFFF" text-anchor="middle">MS</text>' +
      "</svg>",
  );

export function buildPanelManifest(startUrl: string): PanelManifest {
  return {
    name: "Muévete Seguro — Panel",
    short_name: "Panel MS",
    start_url: startUrl,
    display: "standalone",
    background_color: "#FAFAF8",
    theme_color: "#1957D6",
    icons: [
      { src: PANEL_ICON_SVG_DATA_URI, sizes: "192x192", type: "image/svg+xml", purpose: "any maskable" },
    ],
  };
}

export function renderPanelManifestJson(startUrl: string): string {
  return JSON.stringify(buildPanelManifest(startUrl));
}

/**
 * Service worker mínimo: solo cachea el app shell (para que abra desde
 * el ícono aunque haya mala señal) — NUNCA intercepta llamadas a
 * panel-api/Supabase Auth/Realtime, que siempre deben ir a red (datos
 * clínicos en vivo, nunca servidos desde caché).
 */
export function renderPanelServiceWorkerJs(shellUrl: string): string {
  return `const SHELL_CACHE = "panel-shell-v1";
const SHELL_URL = ${JSON.stringify(shellUrl)};

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.add(SHELL_URL)).catch(() => {}),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  // Solo el app shell (mismo origen, GET, navegación de documento) pasa
  // por caché — todo lo demás (panel-api, Supabase Auth/Realtime) va
  // directo a red, siempre.
  if (event.request.method !== "GET" || url.origin !== self.location.origin) return;
  if (event.request.mode !== "navigate") return;

  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(SHELL_URL).then((cached) => cached ?? Response.error())
    ),
  );
});
`;
}

export interface PanelHtmlConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  /** F6.c.6b — panel-api vive siempre en Supabase, sin importar dónde
   * se sirva este shell; explícito porque ya no se puede derivar de
   * location.origin (cross-origin real desde que el shell se mudó al
   * dominio propio de Alexis). */
  panelApiBase: string;
}

export function renderPanelHtml(config: PanelHtmlConfig): string {
  const configJson = JSON.stringify({
    supabaseUrl: config.supabaseUrl,
    supabaseAnonKey: config.supabaseAnonKey,
    panelApiBase: config.panelApiBase,
  });

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>Muévete Seguro — Panel</title>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#1957D6" />
<style>
${PANEL_CSS}
</style>
</head>
<body>
${PANEL_BODY_HTML}
<script id="panel-config" type="application/json">${configJson}</script>
<script type="module">
${PANEL_APP_JS}
</script>
</body>
</html>
`;
}

// ---------------------------------------------------------------------
// CSS — mismo token system que panel-mockup.html (F6.b, aprobada).
// ---------------------------------------------------------------------
const PANEL_CSS = `
:root {
  --bg: #FAFAF8; --surface: #FFFFFF; --surface-2: #F2F1EE;
  --ink: #1C1B1F; --ink-muted: #6E6B76; --ink-faint: #A6A3AC;
  --border: #E7E5E1; --accent: #1957D6; --accent-ink: #FFFFFF;
  --accent-soft: #E8EFFC; --accent-soft-ink: #0F3E9E;
  --danger: #D3402A; --danger-soft: #FBE6E2;
  --warning: #B8791A; --warning-soft: #FBEFD9;
  --resolved: #8A8792; --resolved-soft: #EDECEA;
  --bubble-them: #F0EFEC; --bubble-us: var(--accent); --bubble-us-ink: #FFFFFF;
  --shadow-sm: 0 1px 2px rgba(28,27,31,.04), 0 1px 1px rgba(28,27,31,.03);
  --shadow-md: 0 8px 24px rgba(28,27,31,.10), 0 2px 6px rgba(28,27,31,.05);
  --shadow-lg: 0 24px 60px rgba(28,27,31,.22);
  --radius-lg: 20px; --radius-md: 14px; --radius-sm: 10px;
  color-scheme: light;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #121114; --surface: #1C1B1F; --surface-2: #242327;
    --ink: #F3F2F0; --ink-muted: #9B98A2; --ink-faint: #706D78;
    --border: #302E33; --accent: #6C93F0; --accent-ink: #0B142B;
    --accent-soft: #1C2A4D; --accent-soft-ink: #AFC4F5;
    --danger: #E77362; --danger-soft: #3A211E;
    --warning: #E0A94B; --warning-soft: #3A2E17;
    --resolved: #9C99A3; --resolved-soft: #29272C;
    --bubble-them: #29272C; --bubble-us: #3457AE; --bubble-us-ink: #F3F2F0;
    color-scheme: dark;
  }
}
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; height: 100%; background: var(--surface-2); overscroll-behavior: none; }
body {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif;
  color: var(--ink); -webkit-font-smoothing: antialiased;
  display: flex; justify-content: center; min-height: 100vh;
}
button { font: inherit; }
.tabular { font-variant-numeric: tabular-nums; }
.stage { width: 100%; max-width: 428px; min-height: 100vh; background: var(--bg); position: relative; overflow: hidden; display: flex; flex-direction: column; }
@media (min-width: 640px) {
  body { padding: 40px 16px; align-items: flex-start; justify-content: center; }
  .stage { min-height: 860px; height: 860px; border-radius: 44px; box-shadow: var(--shadow-lg); border: 1px solid var(--border); }
}
.view { position: absolute; inset: 0; display: flex; flex-direction: column; background: var(--bg); transition: transform 360ms cubic-bezier(.22,.9,.32,1); }
#view-thread { transform: translateX(100%); z-index: 10; }
.stage.thread-open #view-list { transform: translateX(-22%); filter: brightness(0.92); }
.stage.thread-open #view-thread { transform: translateX(0); }
.topbar { flex: 0 0 auto; padding: 14px 18px 12px; padding-top: max(14px, env(safe-area-inset-top)); background: var(--bg); display: flex; align-items: center; gap: 10px; }
.topbar h1 { font-size: 22px; font-weight: 700; letter-spacing: -0.01em; margin: 0; }
.eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-faint); margin: 0 0 2px; }
#view-list .list-scroll { flex: 1 1 auto; overflow-y: auto; padding: 4px 12px 24px; }
.case-row { display: flex; align-items: center; gap: 12px; width: 100%; text-align: left; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 12px 14px; margin-bottom: 10px; cursor: pointer; box-shadow: var(--shadow-sm); }
.avatar { flex: 0 0 auto; width: 46px; height: 46px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; background: var(--accent-soft); color: var(--accent-soft-ink); position: relative; }
.dot { position: absolute; right: -2px; bottom: -2px; width: 13px; height: 13px; border-radius: 50%; border: 2.5px solid var(--surface); }
.dot.rojo { background: var(--danger); } .dot.amarillo { background: var(--warning); } .dot.resuelto { background: var(--resolved); }
.case-main { flex: 1 1 auto; min-width: 0; }
.case-top { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.case-name { font-size: 16px; font-weight: 600; }
.case-time { font-size: 12.5px; color: var(--ink-faint); flex: 0 0 auto; }
.case-sub { display: flex; align-items: center; gap: 6px; font-size: 13.5px; color: var(--ink-muted); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.zone-pill { flex: 0 0 auto; font-size: 11.5px; font-weight: 600; padding: 2px 8px; border-radius: 999px; }
.zone-pill.rojo { background: var(--danger-soft); color: var(--danger); }
.zone-pill.amarillo { background: var(--warning-soft); color: var(--warning); }
.zone-pill.resuelto { background: var(--resolved-soft); color: var(--resolved); }
.thread-header { flex: 0 0 auto; padding: 10px 14px 14px; padding-top: max(10px, env(safe-area-inset-top)); background: var(--bg); }
.thread-nav { display: flex; align-items: center; gap: 4px; margin-bottom: 10px; }
.back-btn { display: flex; align-items: center; gap: 2px; background: none; border: none; color: var(--accent); font-size: 16px; font-weight: 500; padding: 6px 4px 6px 0; cursor: pointer; }
.back-btn svg { width: 20px; height: 20px; }
.thread-identity { display: flex; align-items: center; gap: 12px; }
.thread-identity .avatar { width: 44px; height: 44px; font-size: 15px; }
.thread-name { font-size: 18px; font-weight: 700; }
.thread-status { font-size: 12.5px; color: var(--ink-muted); margin-top: 1px; }
.resolve-btn { margin-top: 12px; width: 100%; background: var(--surface); border: 1px solid var(--border); color: var(--accent); font-size: 15px; font-weight: 600; padding: 11px; border-radius: var(--radius-sm); cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; box-shadow: var(--shadow-sm); }
.resolve-btn[disabled] { color: var(--resolved); cursor: default; }
.thread-scroll { flex: 1 1 auto; overflow-y: auto; padding: 12px 14px 8px; display: flex; flex-direction: column; gap: 4px; }
.bubble-row { display: flex; }
.bubble-row.them { justify-content: flex-start; } .bubble-row.us { justify-content: flex-end; }
.bubble { max-width: 78%; padding: 9px 13px; border-radius: 18px; font-size: 15px; line-height: 1.36; box-shadow: var(--shadow-sm); }
.them .bubble { background: var(--bubble-them); color: var(--ink); border-bottom-left-radius: 5px; }
.us .bubble { background: var(--bubble-us); color: var(--bubble-us-ink); border-bottom-right-radius: 5px; }
.bubble.system { background: transparent; box-shadow: none; color: var(--ink-faint); font-size: 12.5px; text-align: center; max-width: 100%; margin: 8px auto 2px; font-weight: 600; }
.stamp { font-size: 11px; color: var(--ink-faint); margin: 2px 4px 10px; }
.stamp.us { text-align: right; }
.composer { flex: 0 0 auto; display: flex; align-items: flex-end; gap: 8px; padding: 10px 12px; padding-bottom: max(10px, env(safe-area-inset-bottom)); background: var(--bg); border-top: 1px solid var(--border); }
.composer textarea { flex: 1 1 auto; resize: none; border: 1px solid var(--border); background: var(--surface); border-radius: 20px; padding: 10px 15px; font-size: 15px; font-family: inherit; color: var(--ink); max-height: 100px; line-height: 1.3; }
.composer textarea:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
.send-btn { flex: 0 0 auto; width: 38px; height: 38px; border-radius: 50%; border: none; background: var(--accent); color: var(--accent-ink); display: flex; align-items: center; justify-content: center; cursor: pointer; }
.send-btn svg { width: 17px; height: 17px; }
.sheet-backdrop { position: absolute; inset: 0; background: rgba(20,19,22,.38); opacity: 0; pointer-events: none; transition: opacity 220ms ease; z-index: 40; }
.sheet-backdrop.open { opacity: 1; pointer-events: auto; }
.sheet { position: absolute; left: 10px; right: 10px; bottom: 10px; background: var(--surface); border-radius: 18px; box-shadow: var(--shadow-lg); padding: 20px 18px max(18px, env(safe-area-inset-bottom)); transform: translateY(120%); transition: transform 320ms cubic-bezier(.22,.9,.32,1); z-index: 41; }
.sheet-backdrop.open .sheet { transform: translateY(0); }
.sheet h2 { margin: 0 0 6px; font-size: 17px; font-weight: 700; }
.sheet p { margin: 0 0 16px; font-size: 14px; color: var(--ink-muted); line-height: 1.4; }
.sheet-actions { display: flex; flex-direction: column; gap: 8px; }
.sheet-actions button { border: none; padding: 13px; border-radius: 13px; font-size: 16px; font-weight: 600; cursor: pointer; }
.sheet-confirm { background: var(--accent); color: var(--accent-ink); }
.sheet-cancel { background: var(--surface-2); color: var(--ink); }
.toast { position: absolute; left: 50%; bottom: 18px; transform: translate(-50%, 12px); background: var(--ink); color: var(--bg); font-size: 13.5px; font-weight: 600; padding: 10px 16px; border-radius: 999px; box-shadow: var(--shadow-md); opacity: 0; transition: opacity 220ms ease, transform 220ms ease; z-index: 50; pointer-events: none; white-space: nowrap; }
.toast.show { opacity: 1; transform: translate(-50%, 0); }
.empty-hint { text-align: center; color: var(--ink-faint); font-size: 13px; padding: 18px 30px 6px; }
.gate { flex: 1 1 auto; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 32px; gap: 14px; }
.gate h1 { font-size: 19px; margin: 0; }
.gate p { color: var(--ink-muted); font-size: 14.5px; line-height: 1.5; margin: 0; max-width: 320px; }
.tabs { flex: 0 0 auto; display: flex; gap: 6px; padding: 0 18px 10px; }
.tab-btn { flex: 1 1 auto; background: var(--surface-2); border: none; color: var(--ink-muted); font-size: 14px; font-weight: 600; padding: 9px; border-radius: var(--radius-sm); cursor: pointer; }
.tab-btn.active { background: var(--accent); color: var(--accent-ink); }
.dot.escalado { background: var(--danger); }
.region-pill { flex: 0 0 auto; font-size: 11.5px; font-weight: 600; padding: 2px 8px; border-radius: 999px; background: var(--accent-soft); color: var(--accent-soft-ink); }
.readonly-banner { flex: 0 0 auto; text-align: center; color: var(--ink-faint); font-size: 12.5px; padding: 10px 20px; border-top: 1px solid var(--border); }
.view-case-btn { margin-top: 12px; width: 100%; background: var(--accent-soft); border: none; color: var(--accent-soft-ink); font-size: 15px; font-weight: 600; padding: 11px; border-radius: var(--radius-sm); cursor: pointer; }
`;

// ---------------------------------------------------------------------
// HTML body — misma estructura que panel-mockup.html (F6.b), más una
// pantalla "gate" (sin sesión / cargando / error) que la maqueta no
// necesitaba (era 100% datos falsos, siempre "logueada").
// ---------------------------------------------------------------------
const PANEL_BODY_HTML = `<div class="stage" id="stage">
  <section class="view" id="view-gate" style="display:none">
    <div class="gate">
      <h1 id="gate-title">Muévete Seguro — Panel</h1>
      <p id="gate-text">Cargando…</p>
    </div>
  </section>

  <section class="view" id="view-list" style="display:none">
    <header class="topbar">
      <div><p class="eyebrow">Muévete Seguro</p><h1 id="list-title">Casos</h1></div>
    </header>
    <nav class="tabs" id="panel-tabs">
      <button class="tab-btn active" type="button" data-tab="cases">Casos</button>
      <button class="tab-btn" type="button" data-tab="conversations">Conversaciones</button>
    </nav>
    <div class="list-scroll">
      <div id="case-list"></div>
      <p class="empty-hint" id="list-empty-hint">Ordenado por urgencia — lo que espera respuesta va primero.</p>
    </div>
  </section>

  <section class="view" id="view-thread">
    <header class="thread-header">
      <div class="thread-nav">
        <button class="back-btn" id="back-btn" type="button" aria-label="Volver a casos">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          Casos
        </button>
      </div>
      <div class="thread-identity">
        <div class="avatar" id="thread-avatar"></div>
        <div><div class="thread-name" id="thread-name"></div><div class="thread-status" id="thread-status"></div></div>
      </div>
      <button class="resolve-btn" id="resolve-btn" type="button">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        Resolver caso
      </button>
      <button class="view-case-btn" id="view-case-btn" type="button" style="display:none">Ver caso escalado</button>
    </header>
    <div class="thread-scroll" id="thread-scroll"></div>
    <p class="readonly-banner" id="readonly-banner" style="display:none">Solo lectura — para responder, usa la vista de Casos.</p>
    <div class="composer" id="composer">
      <textarea id="composer-input" rows="1" placeholder="Responder como Muévete Seguro…"></textarea>
      <button class="send-btn" id="send-btn" type="button" aria-label="Enviar">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 11.5L20.5 3 15 20.5l-4-7.5-8-1.5z"/></svg>
      </button>
    </div>
  </section>

  <div class="sheet-backdrop" id="sheet-backdrop">
    <div class="sheet">
      <h2>¿Resolver este caso?</h2>
      <p>El paciente recibe un mensaje de transición y Muévete Seguro retoma el seguimiento automático.</p>
      <div class="sheet-actions">
        <button class="sheet-confirm" id="sheet-confirm" type="button">Resolver y avisar al paciente</button>
        <button class="sheet-cancel" id="sheet-cancel" type="button">Cancelar</button>
      </div>
    </div>
  </div>

  <div class="toast" id="toast"></div>
</div>`;

// ---------------------------------------------------------------------
// JS de la app — vanilla, sin build step (mismo criterio que F6.b).
// supabase-js se carga desde esm.sh (única dependencia externa real de
// este proyecto — "mínimo viable" no significa cero librerías, significa
// cero infraestructura de hosting/build nueva).
// ---------------------------------------------------------------------
const PANEL_APP_JS = `
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

var CONFIG = JSON.parse(document.getElementById("panel-config").textContent);
var supabase = createClient(CONFIG.supabaseUrl, CONFIG.supabaseAnonKey, {
  auth: { detectSessionInUrl: true, persistSession: true, autoRefreshToken: true },
});
// F6.c.6b — panel-api SIEMPRE vive en Supabase, sin importar dónde se
// sirva este shell (dominio propio de Alexis o, antes, *.supabase.co)
// — cross-origin real ahora, por eso viene explícito en el config en
// vez de derivarse de location.origin (que ya no es el mismo host).
var PANEL_API_BASE = CONFIG.panelApiBase;
// Raíz de donde se sirve ESTE shell (sea "/panel" en el dominio propio
// o cualquier otro prefijo) — calculada de la URL real con la que
// cargó la página, no asumida, para que los deep links funcionen sin
// importar el host ni si trae o no slash final.
var PANEL_BASE_PATH = (function () {
  var path = window.location.pathname;
  var deepLinkMatch = /^(.*)\\/c\\/[^/]+\\/?$/.exec(path);
  var base = deepLinkMatch ? deepLinkMatch[1] : path;
  return base.replace(/\\/$/, "");
})();

// manifest.json y el service worker se registran con la ruta REAL con
// la que cargó la página (PANEL_BASE_PATH) — nunca hardcodeados,
// funcionan igual en /panel (dominio propio) que en cualquier otro
// prefijo, sin depender de si el HTML trae o no un <link> estático.
(function () {
  var manifestLink = document.createElement("link");
  manifestLink.rel = "manifest";
  manifestLink.href = (PANEL_BASE_PATH || "") + "/manifest.json";
  document.head.appendChild(manifestLink);
})();
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register((PANEL_BASE_PATH || "") + "/sw.js").catch(function () {});
}

var stage = document.getElementById("stage");
var viewGate = document.getElementById("view-gate");
var viewList = document.getElementById("view-list");
var gateTitle = document.getElementById("gate-title");
var gateText = document.getElementById("gate-text");
var listEl = document.getElementById("case-list");
var accessToken = null;
var cases = [];
var conversations = [];
var activeTab = "cases";
var activeCaseId = null;
var activeConversationId = null;
var activeThreadKind = "case";
var realtimeChannel = null;

function showOnly(view) {
  [viewGate, viewList].forEach(function (v) { v.style.display = v === view ? "flex" : "none"; });
  if (view !== viewList) stage.classList.remove("thread-open");
}

function showGate(title, text) {
  gateTitle.textContent = title;
  gateText.textContent = text;
  showOnly(viewGate);
}

function initials(name) {
  var parts = String(name || "Paciente").trim().split(/\\s+/);
  return ((parts[0] || "")[0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
}

function bandFor(status) {
  if (status === "closed" || status === "cancelled") return "resuelto";
  if (status === "active") return "amarillo";
  return "rojo";
}

var bandLabel = { rojo: "Esperando respuesta", amarillo: "En conversación", resuelto: "Resuelto" };

function fmtTime(iso) {
  try {
    var d = new Date(iso);
    var h = d.getHours(), m = d.getMinutes();
    return (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m);
  } catch (e) { return ""; }
}

async function apiFetch(path, options) {
  var res = await fetch(PANEL_API_BASE + path, Object.assign({}, options, {
    headers: Object.assign({ "Authorization": "Bearer " + accessToken }, (options && options.headers) || {}),
  }));
  if (res.status === 401 || res.status === 403) {
    showGate("Sesión vencida", "Pide \\"panel\\" de nuevo por WhatsApp al número de Muévete Seguro para volver a entrar.");
    throw new Error("unauthorized");
  }
  return res;
}

function sortCases(list) {
  var order = { rojo: 0, amarillo: 1, resuelto: 2 };
  return list.slice().sort(function (a, b) { return order[bandFor(a.status)] - order[bandFor(b.status)]; });
}

function renderList() {
  var sorted = sortCases(cases);
  if (sorted.length === 0) {
    listEl.innerHTML = "";
    document.getElementById("list-empty-hint").textContent = "Sin casos todavía.";
    return;
  }
  document.getElementById("list-empty-hint").textContent = "Ordenado por urgencia — lo que espera respuesta va primero.";
  listEl.innerHTML = sorted.map(function (c) {
    var band = bandFor(c.status);
    return (
      '<button class="case-row" type="button" data-id="' + c.handoffId + '">' +
        '<div class="avatar">' + initials(c.displayName) + '<span class="dot ' + band + '"></span></div>' +
        '<div class="case-main">' +
          '<div class="case-top"><span class="case-name">' + c.displayName + '</span>' +
          '<span class="case-time tabular">' + fmtTime(c.createdAt) + '</span></div>' +
          '<div class="case-sub"><span class="zone-pill ' + band + '">' + bandLabel[band] + '</span></div>' +
        '</div>' +
      '</button>'
    );
  }).join("");
}

async function loadCases() {
  var res = await apiFetch("/cases");
  var body = await res.json();
  cases = body.cases || [];
  renderList();
}

// BLOQUE C — piso 2: TODAS las conversaciones, no solo las escaladas.
function renderConversationList() {
  var sorted = conversations.slice().sort(function (a, b) {
    var ta = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
    var tb = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
    return tb - ta;
  });
  if (sorted.length === 0) {
    listEl.innerHTML = "";
    document.getElementById("list-empty-hint").textContent = "Sin conversaciones todavía.";
    return;
  }
  document.getElementById("list-empty-hint").textContent = "Todas las conversaciones, más reciente primero.";
  listEl.innerHTML = sorted.map(function (c) {
    return (
      '<button class="case-row" type="button" data-kind="conversation" data-id="' + c.conversationId + '" data-handoff-id="' + (c.activeHandoffId || "") + '">' +
        '<div class="avatar">' + initials(c.displayName) + (c.activeHandoffId ? '<span class="dot escalado"></span>' : '') + '</div>' +
        '<div class="case-main">' +
          '<div class="case-top"><span class="case-name">' + c.displayName + '</span>' +
          '<span class="case-time tabular">' + fmtTime(c.lastMessageAt) + '</span></div>' +
          '<div class="case-sub">' + (c.activeRegionLabel ? '<span class="region-pill">' + c.activeRegionLabel + '</span>' : '') + '</div>' +
        '</div>' +
      '</button>'
    );
  }).join("");
}

async function loadConversations() {
  var res = await apiFetch("/conversations");
  var body = await res.json();
  conversations = body.conversations || [];
  renderConversationList();
}

document.getElementById("panel-tabs").addEventListener("click", function (e) {
  var btn = e.target.closest(".tab-btn");
  if (!btn) return;
  var tab = btn.getAttribute("data-tab");
  if (tab === activeTab) return;
  activeTab = tab;
  document.querySelectorAll(".tab-btn").forEach(function (b) {
    b.classList.toggle("active", b.getAttribute("data-tab") === activeTab);
  });
  document.getElementById("list-title").textContent = activeTab === "cases" ? "Casos" : "Conversaciones";
  if (activeTab === "cases") { renderList(); } else { loadConversations(); }
});

function findCase(handoffId) {
  for (var i = 0; i < cases.length; i++) if (cases[i].handoffId === handoffId) return cases[i];
  return null;
}

function renderMessages(messages) {
  var scroll = document.getElementById("thread-scroll");
  scroll.innerHTML = messages.map(function (m) {
    var rowClass = m.direction === "outbound" ? "us" : "them";
    var text = String(m.text || "").replace(/</g, "&lt;").replace(/\\n/g, "<br>");
    return (
      '<div class="bubble-row ' + rowClass + '"><div class="bubble">' + text + '</div></div>' +
      '<div class="stamp ' + rowClass + '">' + fmtTime(m.createdAt) + '</div>'
    );
  }).join("");
  scroll.scrollTop = scroll.scrollHeight;
}

function subscribeThreadRealtime(channelKey, conversationId, onNewMessage) {
  if (realtimeChannel) { supabase.removeChannel(realtimeChannel); realtimeChannel = null; }
  if (!conversationId) return;
  realtimeChannel = supabase
    .channel("panel:" + channelKey + ":messages")
    .on("postgres_changes", {
      event: "INSERT", schema: "public", table: "conversation_messages",
      filter: "conversation_id=eq." + conversationId,
    }, onNewMessage)
    .subscribe();
}

// BLOQUE C — piso 2 reutiliza el shell del hilo (misma tarjeta de contexto
// clínico, mismo look), así que cada apertura primero regresa el shell al
// modo "caso" (composer + resolver visibles, botón "ver caso" oculto)
// antes de pintar — evita que el estado de solo-lectura de una conversación
// se quede pegado si el operador abre un caso justo después.
function resetThreadShellToCaseMode() {
  activeThreadKind = "case";
  document.getElementById("composer").style.display = "flex";
  document.getElementById("readonly-banner").style.display = "none";
  document.getElementById("view-case-btn").style.display = "none";
  document.getElementById("resolve-btn").style.display = "flex";
}

async function openThread(handoffId, silent) {
  resetThreadShellToCaseMode();
  var c = findCase(handoffId);
  activeCaseId = handoffId;
  document.getElementById("thread-avatar").textContent = initials(c ? c.displayName : "");
  document.getElementById("thread-name").textContent = c ? c.displayName : "Caso";
  var band = c ? bandFor(c.status) : "amarillo";
  document.getElementById("thread-status").textContent = bandLabel[band];

  var resolveBtn = document.getElementById("resolve-btn");
  if (band === "resuelto") {
    resolveBtn.setAttribute("disabled", "true");
    resolveBtn.textContent = "Caso resuelto";
  } else {
    resolveBtn.removeAttribute("disabled");
    resolveBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg> Resolver caso';
  }

  var res = await apiFetch("/cases/" + encodeURIComponent(handoffId) + "/messages");
  var body = await res.json();
  activeConversationId = body.conversationId;
  renderMessages(body.messages || []);
  if (!silent) {
    subscribeThreadRealtime("case:" + handoffId, activeConversationId, function () {
      openThread(handoffId, true);
    });
  }

  stage.classList.add("thread-open");
  history.replaceState(null, "", PANEL_BASE_PATH + "/c/" + encodeURIComponent(handoffId));
}

// BLOQUE C — piso 2: hilo SOLO LECTURA de cualquier conversación (no solo
// escaladas). Sin composer, sin resolver — si tiene un caso escalado
// abierto, un botón lleva a la vista de caso existente (openThread).
async function openConversationThread(conversationId, handoffId, silent) {
  activeThreadKind = "conversation";
  activeCaseId = null;
  var c = conversations.filter(function (x) { return x.conversationId === conversationId; })[0];
  document.getElementById("thread-avatar").textContent = initials(c ? c.displayName : "");
  document.getElementById("thread-name").textContent = c ? c.displayName : "Conversación";
  document.getElementById("thread-status").textContent = handoffId
    ? "Tiene caso escalado abierto"
    : "Conversación";

  document.getElementById("resolve-btn").style.display = "none";
  document.getElementById("composer").style.display = "none";
  document.getElementById("readonly-banner").style.display = "block";
  var viewCaseBtn = document.getElementById("view-case-btn");
  if (handoffId) {
    viewCaseBtn.style.display = "block";
    viewCaseBtn.onclick = function () { openThread(handoffId); };
  } else {
    viewCaseBtn.style.display = "none";
    viewCaseBtn.onclick = null;
  }

  var res = await apiFetch("/conversations/" + encodeURIComponent(conversationId) + "/messages");
  var body = await res.json();
  activeConversationId = conversationId;
  renderMessages(body.messages || []);
  if (!silent) {
    subscribeThreadRealtime("conv:" + conversationId, conversationId, function () {
      openConversationThread(conversationId, handoffId, true);
    });
  }

  stage.classList.add("thread-open");
  history.replaceState(null, "", PANEL_BASE_PATH + "/");
}

function closeThread() {
  stage.classList.remove("thread-open");
  var wasConversation = activeThreadKind === "conversation";
  activeCaseId = null;
  activeConversationId = null;
  if (realtimeChannel) { supabase.removeChannel(realtimeChannel); realtimeChannel = null; }
  history.replaceState(null, "", PANEL_BASE_PATH ? PANEL_BASE_PATH + "/" : "/");
  if (wasConversation) { loadConversations(); } else { loadCases(); }
}

listEl.addEventListener("click", function (e) {
  var row = e.target.closest(".case-row");
  if (!row) return;
  if (row.getAttribute("data-kind") === "conversation") {
    openConversationThread(row.getAttribute("data-id"), row.getAttribute("data-handoff-id") || null);
  } else {
    openThread(row.getAttribute("data-id"));
  }
});
document.getElementById("back-btn").addEventListener("click", closeThread);

var input = document.getElementById("composer-input");
input.addEventListener("input", function () {
  input.style.height = "auto";
  input.style.height = Math.min(input.scrollHeight, 100) + "px";
});
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
});
document.getElementById("send-btn").addEventListener("click", sendMessage);

async function sendMessage() {
  var text = input.value.trim();
  if (!text || !activeCaseId) return;
  input.value = ""; input.style.height = "auto";
  try {
    await apiFetch("/cases/" + encodeURIComponent(activeCaseId) + "/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text }),
    });
    showToast('Entregado como "Equipo Muévete Seguro"');
    openThread(activeCaseId, true);
  } catch (e) { /* apiFetch ya mostró el gate si fue 401 */ }
}

var sheetBackdrop = document.getElementById("sheet-backdrop");
document.getElementById("resolve-btn").addEventListener("click", function (e) {
  if (e.currentTarget.hasAttribute("disabled")) return;
  sheetBackdrop.classList.add("open");
});
document.getElementById("sheet-cancel").addEventListener("click", function () {
  sheetBackdrop.classList.remove("open");
});
sheetBackdrop.addEventListener("click", function (e) {
  if (e.target === sheetBackdrop) sheetBackdrop.classList.remove("open");
});
document.getElementById("sheet-confirm").addEventListener("click", async function () {
  sheetBackdrop.classList.remove("open");
  try {
    await apiFetch("/cases/" + encodeURIComponent(activeCaseId) + "/resolve", { method: "POST" });
    showToast("Caso resuelto · paciente avisado");
    closeThread();
  } catch (e) { /* apiFetch ya mostró el gate si fue 401 */ }
});

var toastTimer = null;
function showToast(msg) {
  var toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2200);
}

function deepLinkHandoffId() {
  var match = /\\/c\\/([^/]+)\\/?$/.exec(window.location.pathname);
  return match ? decodeURIComponent(match[1]) : null;
}

async function boot() {
  showGate("Muévete Seguro — Panel", "Cargando…");
  var { data } = await supabase.auth.getSession();
  var session = data && data.session;
  if (!session) {
    showGate(
      "Sin acceso",
      'Escribe "panel" por WhatsApp al número de Muévete Seguro para recibir tu acceso.',
    );
    return;
  }
  accessToken = session.access_token;
  supabase.auth.onAuthStateChange(function (_event, newSession) {
    accessToken = newSession ? newSession.access_token : null;
  });

  showOnly(viewList);
  await loadCases();

  var deepLink = deepLinkHandoffId();
  if (deepLink) await openThread(deepLink);
}

boot();
`;
