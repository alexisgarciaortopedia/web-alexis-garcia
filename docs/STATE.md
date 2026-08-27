# Estado actual

Actualizado: 2026-08-26.

## Atribución WhatsApp Ads / Maps (Misión 3)

- PR #16 mergeado a `main` el 2026-08-26 mediante el commit `759f0fc927d71a95ef476cc7737912a5be0c9b01`. Vercel reportó `SUCCESS` y producción sirve la atribución nueva.
- `gclid`, `gbraid` o `wbraid` clasifican la sesión como `GADS-PAC` y tienen prioridad sobre cualquier `ref=`. El click ID se conserva solo en `sessionStorage` y no aparece en el mensaje de WhatsApp.
- `?ref=GMAPS-PAC` se conserva durante la navegación; sin parámetros se usa `WEB`. Los `ref` explícitos se normalizan y validan antes de aceptarlos.
- Cada pestaña genera un ID anónimo `WA-XXXXXX`, sin PII, estable durante esa sesión. El mensaje termina `Ref: <origen> | ID: <ID>`.
- Pruebas locales verificaron Ads, Maps, fallback Web, prioridad Ads, IDs distintos entre sesiones y persistencia al navegar. Home, Pachuca, Que atiendo, Rodilla, Fracturas, Segunda opinión y Agendar conservaron enlaces válidos.
- Un clic controlado emitió el request de conversión `AW-18142944053/CAIPCPry49ocELW2nctD`. `lib/phone.ts` permanece idéntico a `main` y conserva `AW-18142944053/_EqkCPn2q-ccELW2nctD`.
- `npm run lint` y `npm run build` pasan. Para desbloquear lint se ignoraron flujos retirados bajo `app/_archived/**` y se sustituyeron tres anchors internos por `next/link`; no cambian atribución ni producción.
- URL etiquetada verificada para Google Business Profile Pachuca: `https://www.alexisgarciaortopedia.com/pachuca?ref=GMAPS-PAC`.
- Verificación post-deploy en producción: Maps conservó `GMAPS-PAC / WA-623BT9` al navegar a `/agendar`; Ads simulado conservó `GADS-PAC / WA-JREND2` al navegar a `/que-atiendo`; Ads ganó sobre Maps con `GADS-PAC / WA-66C97S`; Web directa produjo `WEB / WA-AXLTA7`.
- Los cuatro IDs de pestañas nuevas fueron distintos. Ninguno de los mensajes incluyó los `gclid` de prueba. Los enlaces WhatsApp siguen apuntando a `wa.me` en pestaña nueva y el teléfono conserva `tel:+527731754638`; no se abrió WhatsApp ni se inició llamada.

## Conversión de teléfono

- PR #14 fue mergeado a `main` el 2026-08-26 (merge `1a5e5d9e4ca39459bbdbbed3c471b911366f74d3`). Vercel terminó el despliegue correctamente.
- Producción contiene el handler de `lib/phone.ts`: `preventDefault`, `event_callback`, `event_timeout: 1000`, fallback de 1 segundo y protección contra navegación doble.
- Prueba controlada: 2026-08-26 13:20:37 America/Mexico_City. El botón principal emitió un `fetch` a `www.googleadservices.com/pagead/conversion/18142944053/` con `label=_EqkCPn2q-ccELW2nctD`, `en=conversion` y `event_timeout=1000`; después mantuvo el destino `tel:+527731754638`.
- Google Ads puede tardar hasta 48 horas en reflejar recepción/estado. La evidencia de red está cerrada; la contabilización atribuida sigue su latencia normal.

## Google Ads

- Cuenta verificada el 2026-08-26: `954-489-8007`, usuario `alexisgarciaortopedia@gmail.com`, zona horaria GMT-06:00.
- Campaña `Search-1`: habilitada, búsqueda, presupuesto 150 MXN/día y estrategia de puja en aprendizaje.
- Hoy: 38 impresiones, 6 clics, 46.56 MXN de gasto y 0 conversiones.
- Últimos 30 días (27 jul–25 ago): 9,946 impresiones, 612 clics, 4,443.41 MXN, 33 conversiones y 134.65 MXN/conv. Desglose: WhatsApp 27, `Clic de llamada` 5 y `Llamadas desde anuncios` 1.
- Grupos: `Ad group 1` habilitado y con gasto; `Procedimientos-PAC` habilitado sin gasto hoy; `PAC-URG` y `PAC-2OP` en pausa y sin gasto hoy.
- Solo aparece una campaña no retirada. Existe un borrador `Search-2-Tula`; un borrador no publica ni gasta.
- `Clic a teléfono - sitio web`: habilitada y guardada como **Acción secundaria** el 2026-08-26 tras verificar el hit. Ads confirma que no se usa para optimizar pujas y solo aparece en `Todas las conversiones`. La interfaz aún mostraba **Esperando conversiones** por latencia de procesamiento.
- `WhatsApp - clic`: activa, principal e incluida en objetivos de cuenta. `Clicks to call` alojada en Google es principal pero no está incluida en objetivos de cuenta.
- Enhanced Conversions sigue sin activarse; Ads muestra una recomendación para activarlas, que debe ignorarse por decisión cerrada.
- No se modificaron campañas, presupuesto, pujas, grupos, keywords, WhatsApp ni otras conversiones. `PAC-URG` y `PAC-2OP` permanecen pausados.

## Monitoreo

- `Panel Dr. García`, pestaña `Métricas-diarias`, contiene para `Tue 25 Aug`: gasto 227.67, 19 clics, 250 impresiones, 2 conversiones, CPA 113.84, saldo 1165.76 y 7.8 días.
- Ads Facturación muestra fondos disponibles por 4,979.25 MXN y saldo promocional restante de 686.23 MXN. El saldo 1,165.76 del Sheet es incorrecto.
- Causa del saldo incorrecto: `getSaldoDisponible_()` resta `amount_served` a `approved_spending_limit` de `account_budget`; ese presupuesto de cuenta no representa los fondos de prepago disponibles.
- Promoción verificada: crédito concedido 4,000 MXN, **Activo**, ya financiando campañas; 3,313.77 MXN gastados (82.84 %) y caducidad del crédito 2 oct 2026. La alerta B8 que exige primera conversión antes del 1 sept es falsa y se basa solo en una fecha hardcodeada.
- Script vivo `Sistema de Monitoreo` ID `12037766`: A1 quedó en recomendaciones manuales; no existe ninguna llamada `.pause()` ni ruta que cambie keywords.
- B8 y sus constantes hardcodeadas fueron retiradas. No se sustituyeron por inferencias.
- `getSaldoDisponible_()` devuelve `null`, ya no consulta `account_budget`; el reporte dice `Saldo: no verificado — revisar Facturación`. `diasDeSaldo` queda `null` cuando el saldo no está verificado.
- Gasto, clics, impresiones, conversiones y CPA conservan sus consultas. La vista previa terminó `Hecho (0:02)` y mostró `Sin cambios`, sin tocar campañas.
- Existe `Monitoreo - Reporte 08h` ID `12143656`, habilitado, sin frecuencia y sin ejecución visible; no gasta por sí mismo, pero sigue siendo un duplicado huérfano.

## Fase 0

- Sheet operativo verificado con pestañas `INICIO`, `PACIENTES`, `MOVIMIENTOS`, `RESUMEN`, respaldo y catálogos.
- `RESUMEN` mantiene gasto Ads manual en 0 y advierte que el Panel requiere validación contra la interfaz real.
