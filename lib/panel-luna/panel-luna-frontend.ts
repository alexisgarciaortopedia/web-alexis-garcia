/**
 * Panel-luna (el panel NUEVO, conectado a luna_atletas) -- servido desde
 * este sitio por el mismo motivo que el panel viejo: Supabase reescribe
 * cualquier respuesta text/html a text/plain en su dominio por defecto
 * (confirmado con curl -I contra panel-luna en Supabase -- misma huella
 * exacta que ya documentó panel-frontend.ts: CSP "default-src 'none';
 * sandbox" + nosniff). Next.js/Vercel sí respeta Content-Type real.
 *
 * ORIGEN: portado literal desde muevete-seguro
 * (src/panel-luna-frontend.ts) -- ese repo sigue siendo la fuente
 * canónica del look/lógica (tests automatizados viven ahí, con Deno
 * test). Cualquier cambio de comportamiento se hace primero ahí, se
 * prueba, y se vuelve a portar aquí -- este archivo no tiene su propia
 * suite de tests en este repo.
 *
 * La API real (datos, auth, permisos por rol) sigue viviendo en Supabase
 * (Edge Function panel-luna, repo muevete-seguro) -- este archivo solo
 * genera el HTML/CSS/JS del shell; todo dato real cruza el origen vía
 * fetch() con CORS (PANEL_ALLOWED_ORIGIN configurado del lado de
 * Supabase, mismo secret que ya usa el panel viejo).
 *
 * Convive con /panel (el panel viejo, sin tocar) mientras se valida este.
 */
export function renderPanelLunaHtml(params: {
  supabaseUrl: string;
  supabaseAnonKey: string;
  /**
   * Base absoluta de la API (sin slash final), p.ej.
   * "https://xxx.supabase.co/functions/v1/panel-luna". Siempre absoluta y
   * nunca relativa -- una ruta relativa como "api/me" se resuelve distinto
   * según si la URL de la página trae o no slash final.
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
        <button data-tab="atletas">Atletas</button>
      </nav>
    \`);
    tabs.querySelector('[data-tab="alertas"]').classList.toggle("activo", vista.nombre === "alertas");
    tabs.querySelector('[data-tab="atletas"]').classList.toggle("activo", vista.nombre === "atletas");
    tabs.querySelector('[data-tab="alertas"]').onclick = irAAlertas;
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
    const { atleta, transcript } = await api(\`api/atletas/\${phoneHash}\`);
    render(vistaDetalle(atleta, transcript));
  } catch {
    render(el(\`<div class="vacio">No se pudo cargar la ficha.</div>\`));
  }
}

function vistaDetalle(atleta, transcript) {
  const esAdmin = operador?.rol === "admin";
  const cont = el(\`<div></div>\`);
  const volver = el(\`<button class="volver">← Volver</button>\`);
  volver.onclick = () => (vista.nombre === "atletas" ? irAAtletas() : irAAlertas());
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

  const hilo = el(\`<div class="card"><div class="meta" style="margin-bottom:4px">Conversación completa</div><div class="transcript"></div></div>\`);
  const lista = hilo.querySelector(".transcript");
  for (const m of transcript) {
    lista.appendChild(el(\`<div class="turno \${m.direccion}">\${(m.texto || "").replace(/</g, "&lt;")}</div>\`));
  }
  cont.appendChild(hilo);

  return cont;
}

boot();
</script>
</body>
</html>`;
}
