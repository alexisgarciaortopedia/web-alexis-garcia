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

# 2026-09-23 — Prueba social de Google Reviews

- Verificadas las fichas profesionales en Maps: Pachuca 5.0 / 24 reseñas, Tula 5.0 / 23 reseñas. Total derivado: 47.
- Centralizados calificación, conteo y enlace de cada sede; componente compartido en home y landings.
- Retirado `AggregateRating` autogestionado de `Physician`, conservando el resto del JSON-LD.

## Contactos por sede (2026-09-29)

- Alexis autorizó actualizar Ads, Maps y el sitio publicado; proporcionó Pachuca **771 758 8383**. Tula conserva **773 175 4638**.
- Maps: Pachuca principal 7717588383, adicional 7731754638, WhatsApp `https://wa.me/527717588383`; Tula principal 7731754638, adicional 7717588383, WhatsApp propio conservado. Cambios guardados y aceptados en ambas fichas.
- Google Ads 954-489-8007: recurso de llamada 7717588383 añadido a nivel campaña Search-1 (Pachuca); pendiente de revisión de Google al verificar. Recurso de cuenta Tula conservado. Sin cambios de presupuesto, pujas ni objetivos.
- Web: contactos centralizados en `lib/contacts.ts`; ambos números visibles en encabezado, footer, agenda, gestión de cita, ubicaciones y privacidad. Llamadas, WhatsApp y flotante de cada ruta dirigen a su sede; home conserva selección por ref. JSON-LD incluye ambos contactos.
- Conservados IDs y lógica de conversión, atribución por ref/click ID e ID anónimo de WhatsApp. Muévete Seguro mantiene su canal operativo existente.
- Lint, TypeScript y build de producción local (webpack con certificados del sistema) verificados. HTML generado comprobado en 12 rutas: ambos teléfonos y destinos de cada sede correctos. Turbopack local limitado por Google Fonts; build Vercel y publicación pendientes al preparar esta rama.

### Cierre verificado — 28 septiembre 2026, hora de México

- PR #18 integrado en main, commit `783b06f5f606b06f6327b0666a99836504b97406`.
- Vercel confirmó éxito del preview completo `f97bc2b` (2/2 checks) y del despliegue de producción `783b06f`.
- Los primeros previews fallaron por cargas parciales desde navegador; todos los archivos dependientes quedaron incluidos antes del merge. No se publicó un build fallido.
- Verificadas en navegador las 12 rutas públicas afectadas, con ambos teléfonos y destinos correctos por sede. También se verificó navegación interna Tula → Pachuca y cambio del WhatsApp flotante; ID anónimo conservado.
- Evidencia visual de agenda publicada: ambos contactos separados con botones de llamada y WhatsApp.
- Único pendiente externo: revisión de Google Ads del nuevo recurso de llamada; Maps aceptó los cambios.

## 2026-09-28 — rediseño premium en revisión
- Construidas portada, Pachuca/Tula, agenda y solicitud de Muévete Seguro; incorporados videos optimizados y contacto por sede.
- Preparada instrumentación web GA4 con exclusión de pruebas, diferenciando contacto, solicitud de programa y video. Activación pendiente de ID real.
- Lint, TypeScript y build local de 35 rutas aprobados. Sin cambios a producción ni configuración de campañas Ads.

- Vercel confirmó éxito del preview `f292e36a`; pruebas de contactos y atribución pasan. Acceso Vercel resuelto y revisión visual en escritorio/celular completada. Ambos videos reproducen y el flujo Tula → agenda conserva contacto. PR #19 en borrador; GA4 real sigue pendiente.
