# Changelog

## 2026-08-26 — Misión 3: verificación post-deploy

- PR #16 mergeado a `main` en `759f0fc927d71a95ef476cc7737912a5be0c9b01`; Vercel reportó `SUCCESS`.
- Producción verificada en Maps, Ads simulado, prioridad Ads sobre Maps y Web directa; origen e ID persistieron durante navegación y cada pestaña recibió un ID diferente.
- Confirmado que los `gclid` de prueba no aparecen en el mensaje final de WhatsApp.
- Confirmados enlaces `wa.me` válidos y destino telefónico `tel:+527731754638` sin abrir WhatsApp, enviar mensajes ni iniciar llamadas.
- Queda pendiente únicamente la acción manual de etiquetar el enlace del sitio web en Google Business Profile de Pachuca.

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
