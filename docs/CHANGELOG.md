# Changelog

## 2026-09-16 — Indexación: enlaces internos, robots y canonical

- Diagnóstico: las 15 URLs públicas ya estaban en el sitemap, todas 200 y todas `index, follow`. El problema no era el sitemap sino el enlazado interno: `/pachuca`, `/tula`, sus cuatro guías y `/segunda-opinion` no recibían un solo enlace desde ninguna página — existían únicamente en el sitemap.
- Añadido `components/SiteFooter.tsx` con las 15 rutas públicas agrupadas. Montado en las 13 páginas del sitio principal; en las cuatro de Muévete Seguro by Ortik se monta solo la rejilla (`SiteFooterNav`) encima de su footer de marca, para no perder el deslinde médico.
- Añadidos enlaces en cuerpo (no solo footer): home → `/pachuca` y `/tula`; `/ubicaciones` → cada sede con sus dos guías; `/pachuca` y `/tula` → sus guías de fracturas y rodilla.
- `app/robots.ts`: añadidos `Disallow` para `/panel`, `/panel-luna` y `/control`, que hasta hoy solo se defendían con el header `X-Robots-Tag` (Google lo lee después de rastrear). Se mantienen `/agendar`, `/cita` y `/api/`.
- `app/layout.tsx`: añadido `alternates.canonical` por defecto, para que una ruta nueva no nazca sin canonical. Verificado que los 17 canonicals generados siguen siendo correctos y con `www`.
- `app/sitemap.ts`: `lastModified` hoisteado a una sola constante por build. La lista de URLs no cambió.
- Confirmado que el dominio canónico es `www`: `alexisgarciaortopedia.com` responde 307 a `www`. No se tocó nada por este motivo — la propiedad de Search Console es de dominio (`sc-domain`) y cubre ambas variantes.
- `/agendar` y `/cita` sin tocar: siguen `noindex, nofollow`, fuera del sitemap y sin el footer compartido.
- Corregido el `<title>` triplicado de las 6 páginas de sede y de `/segunda-opinion`: el título propio ya cerraba con la marca y la plantilla del layout raíz le sumaba otra vez el nombre completo. Ahora usan `title.absolute`. Añadido `shortLabel` en `lib/locations.ts` ("Pachuca", "Tula") porque `publicLabel` gastaba caracteres sin ganar búsquedas. Los 7 títulos quedan entre 45 y 59 caracteres. `/agendar` tiene el mismo defecto pero se dejó intacta: es `noindex` y es ruta del flujo de citas.
- `npm run lint` y `npm run build` correctos (los 12 errores de lint restantes vienen de `.worktrees/ads-intent/`, un worktree suelto sin trackear, ajeno a este cambio). Sin merge, deploy ni cambios de producción.

## 2026-08-26 — Misión 3: atribución Ads / Maps por WhatsApp

- Añadida detección session-only de `gclid`, `gbraid` y `wbraid`, con clasificación `GADS-PAC` y prioridad sobre `ref=`.
- Añadido soporte validado para `GMAPS-PAC`, fallback `WEB` e ID anónimo por pestaña `WA-XXXXXX`.
- El mensaje de WhatsApp ahora termina `Ref: <origen> | ID: <ID>`; los click IDs no se exponen en el mensaje ni se envían a analytics por esta lógica.
- Verificada persistencia al navegar, sesiones nuevas con IDs distintos y compatibilidad en las rutas críticas.
- Verificado el request de conversión WhatsApp existente `AW-18142944053/CAIPCPry49ocELW2nctD`; `lib/phone.ts` no fue modificado.
- Corregidos tres enlaces internos para cumplir `@next/next/no-html-link-for-pages` e ignorados en lint los flujos retirados `app/_archived/**`, que no forman parte del build.
- `npm run lint` y `npm run build` completados correctamente. Sin merge, deploy ni cambios de producción.

## 2026-08-26 — Cierre ejecutivo Misión 1

- Mergeado PR #14 y verificado despliegue Vercel exitoso en producción.
- Verificado en recursos de red el hit telefónico `AW-18142944053/_EqkCPn2q-ccELW2nctD` a las 13:20:37 (America/Mexico_City), con `event_timeout=1000` y destino `tel:` preservado.
- Cambiada únicamente `Clic a teléfono - sitio web` de principal a secundaria; Google Ads confirma que no optimiza pujas con ella.
- Editado el script vivo `Sistema de Monitoreo`: A1 solo recomienda, B8 eliminada, `account_budget` retirado y saldo marcado no verificado.
- Vista previa segura completada en 2 segundos con `Sin cambios`; no se modificaron campañas ni keywords.
- `PAC-URG` y `PAC-2OP` permanecen pausados; no se tocaron presupuesto, pujas, grupos, keywords, WhatsApp ni otras conversiones.

## 2026-08-26 — Misión 1 (rama `audit/privada-mision-1`)

- Auditada la medición telefónica y localizado el riesgo de cancelación por navegación inmediata a `tel:`.
- Preparado handler robusto con callback y timeout; sin deploy.
- Verificados IDs de etiquetas y cobertura de enlaces de teléfono en el repo.
- Leídos los Sheets operativos y documentada la cuarentena del saldo derivado.
- Creada documentación persistente y reglas multiagente.
- Añadido runbook post-deploy para evidencia de red y verificación posterior en Google Ads.
- Google Ads y Apps Script vivos quedaron sin lectura por falta de sesión autenticada; ningún cambio externo realizado.
- Continuación: auditados Ads, facturación, promociones, conversiones y ambos scripts con la cuenta correcta. Confirmados B8 falso, saldo derivado incorrecto y riesgo de pausa automática A1. Ningún cambio externo realizado.
