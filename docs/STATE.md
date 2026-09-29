# Estado actual

Actualizado: 2026-09-29.

## Contactos por sede (2026-09-29)

- Alexis autorizó actualizar Ads, Maps y el sitio publicado; proporcionó Pachuca **771 758 8383**. Tula conserva **773 175 4638**.
- Maps: Pachuca principal 7717588383, adicional 7731754638, WhatsApp `https://wa.me/527717588383`; Tula principal 7731754638, adicional 7717588383, WhatsApp propio conservado. Cambios guardados y aceptados en ambas fichas.
- Google Ads 954-489-8007: recurso de llamada 7717588383 añadido a nivel campaña Search-1 (Pachuca); pendiente de revisión de Google al verificar. Recurso de cuenta Tula conservado. Sin cambios de presupuesto, pujas ni objetivos.
- Web: contactos centralizados en `lib/contacts.ts`; ambos números visibles en encabezado, footer, agenda, gestión de cita, ubicaciones y privacidad. Llamadas, WhatsApp y flotante de cada ruta dirigen a su sede; home conserva selección por ref. JSON-LD incluye ambos contactos.
- Conservados IDs y lógica de conversión, atribución por ref/click ID e ID anónimo de WhatsApp. Muévete Seguro mantiene su canal operativo existente.
- Lint, TypeScript y build de producción local (webpack con certificados del sistema) verificados. HTML generado comprobado en 12 rutas: ambos teléfonos y destinos de cada sede correctos. Turbopack local limitado por Google Fonts; build Vercel y publicación pendientes al preparar esta rama.

## Prueba social de Google Maps (2026-09-23)

- Fichas profesionales verificadas directamente en Google Maps: Pachuca 5.0 / 24 reseñas (CID `13899597655234583047`, dirección Lic. Hernández y Fernández 105); Tula 5.0 / 23 reseñas (CID `16310803683419924396`, dirección Cto. Revolución 19). Tula conserva el conteo anterior porque eso muestra hoy su ficha.
- Integración y despliegue autorizados el 23 sep 2026 para `fix/google-reviews-social-proof`. `lib/practiceReviews.ts` contiene las dos fichas; el total 47 se calcula, y `GoogleRating` se usa en home, sedes, fracturas, rodilla, segunda opinión y carrusel.
- El `AggregateRating` combinado de `Physician` se retiró: era una suma de dos perfiles propios y Google no admite snippets de reseñas autogestionadas para negocios locales. El resto del schema Physician permanece.
- Los conteos son manuales, sin consulta de Maps en cada request. Revisar las dos fichas antes de futuras actualizaciones.

## Indexación del sitio (2026-09-16)

- Implementado en la rama `fix/seo-indexacion-enlaces`; todavía no está desplegado ni modifica producción.
- Dominio canónico verificado: `www.alexisgarciaortopedia.com`. La variante sin `www` responde 307 hacia ella (dominio primario de Vercel). Las URLs de Ads y la ficha de Maps de Pachuca ya apuntan a `www`; no se cambió nada de esto.
- La propiedad de Search Console es de dominio (`sc-domain`), así que cubre `www` y no-`www`. El `Sitemap:` de robots.txt se mantiene en `www`.
- Sitemap: 15 URLs, sin cambios respecto a producción. Las 15 verificadas 200 y `index, follow` en el sitio en vivo antes de tocar nada.
- Causa raíz del bajo descubrimiento: 7 páginas huérfanas (`/pachuca`, `/tula`, las cuatro guías por sede, `/segunda-opinion`) con cero enlaces internos entrantes, más `/muevete-seguro` y `/centros-deportivos` como islote sin enlace desde el sitio principal. Tras el cambio, cada una de las 15 rutas recibe entre 13 y 17 enlaces internos, medido sobre el HTML generado por `next build`.
- `/agendar` y `/cita` permanecen `noindex, nofollow`, fuera del sitemap y sin el footer compartido — verificado en el build.

## Atribución WhatsApp Ads / Maps (Misión 3)

- Implementado en la rama `feature/privada-attribution-ads-maps`; todavía no está desplegado ni modifica producción.
- `gclid`, `gbraid` o `wbraid` clasifican la sesión como `GADS-PAC` y tienen prioridad sobre cualquier `ref=`. El click ID se conserva solo en `sessionStorage` y no aparece en el mensaje de WhatsApp.
- `?ref=GMAPS-PAC` se conserva durante la navegación; sin parámetros se usa `WEB`. Los `ref` explícitos se normalizan y validan antes de aceptarlos.
- Cada pestaña genera un ID anónimo `WA-XXXXXX`, sin PII, estable durante esa sesión. El mensaje termina `Ref: <origen> | ID: <ID>`.
- Pruebas locales verificaron Ads, Maps, fallback Web, prioridad Ads, IDs distintos entre sesiones y persistencia al navegar. Home, Pachuca, Que atiendo, Rodilla, Fracturas, Segunda opinión y Agendar conservaron enlaces válidos.
- Un clic controlado emitió el request de conversión `AW-18142944053/CAIPCPry49ocELW2nctD`. `lib/phone.ts` permanece idéntico a `main` y conserva `AW-18142944053/_EqkCPn2q-ccELW2nctD`.
- `npm run lint` y `npm run build` pasan. Para desbloquear lint se ignoraron flujos retirados bajo `app/_archived/**` y se sustituyeron tres anchors internos por `next/link`; no cambian atribución ni producción.
- URL etiquetada verificada para Google Business Profile Pachuca: `https://www.alexisgarciaortopedia.com/pachuca?ref=GMAPS-PAC`.

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

### Cierre verificado — 28 septiembre 2026, hora de México

- PR #18 integrado en main, commit `783b06f5f606b06f6327b0666a99836504b97406`.
- Vercel confirmó éxito del preview completo `f97bc2b` (2/2 checks) y del despliegue de producción `783b06f`.
- Los primeros previews fallaron por cargas parciales desde navegador; todos los archivos dependientes quedaron incluidos antes del merge. No se publicó un build fallido.
- Verificadas en navegador las 12 rutas públicas afectadas, con ambos teléfonos y destinos correctos por sede. También se verificó navegación interna Tula → Pachuca y cambio del WhatsApp flotante; ID anónimo conservado.
- Evidencia visual de agenda publicada: ambos contactos separados con botones de llamada y WhatsApp.
- Único pendiente externo: revisión de Google Ads del nuevo recurso de llamada; Maps aceptó los cambios.

## Rediseño premium — revisión del 28 septiembre 2026

- Nueva rama feature/premium-conversion-preview: portada, sedes, agenda y solicitud Muévete Seguro implementadas con videos reales optimizados.
- Lint, TypeScript y compilación de producción local pasan. GA4 preparado pero pendiente del identificador real; no se afirma medición activa.
- Producción conserva los contactos publicados. Alcance y pendientes en PREMIUM_REVIEW.md.

- Vercel confirmó éxito del preview `f292e36a`; pruebas de contactos y atribución pasan. Acceso Vercel resuelto y revisión visual en escritorio/celular completada. Ambos videos reproducen y el flujo Tula → agenda conserva contacto. PR #19 en borrador; GA4 real sigue pendiente.

## Publicación premium — 28 septiembre 2026, America/Mexico_City

- Alexis autorizó expresamente hacer pública la versión revisada a las 22:51–22:52.
- PR #19 integrado en main: `b327db6ada39c7454ad17d55265cdf3a23f1d93f`. Vercel confirmó `Deployment has completed` en producción.
- Sitio público: https://www.alexisgarciaortopedia.com/
- Home, Pachuca, Tula, agenda y Muévete Seguro responden HTTP 200 con el diseño nuevo y ambos teléfonos. `/design-review` devuelve 404 en producción, como se diseñó.
- Quirófano y Adoy sirven video/mp4 HTTP 200. Quirófano llegó al final 0:20/0:20 en navegador público; Tula → agenda conservó el número 7731754638 y el ID anónimo de sesión. Pachuca conserva 7717588383.
- GA4 continúa pendiente de propiedad real y validación de recepción; no se afirma conteo activo de visitas. No se modificaron campañas Ads, presupuestos ni pujas.
- Video de consulta con personas identificables continúa excluido hasta confirmar autorización de publicación web.

## Ajustes de identidad y consulta — 28 septiembre 2026, 23:11 México

- Alexis confirmó autorización de publicación web del video de consulta con pacientes y ordenó publicar los ajustes sin otra confirmación.
- Monograma del favicon extraído con transparencia mediante edición de imagen; reemplaza el AG tipográfico. Presentación blanca por CSS para contraste en fondo oscuro; nombre conservado.
- Instagram usa su icono SVG; enlace Inicio explícito en cabeceras premium e histórica.
- Video consulta de 25 segundos y portada incorporados; carga únicamente al pulsar reproducir.
- Lint, compilación Next.js con TypeScript y verificación de contactos/atribución/carga diferida pasan.
- GA4 sigue pendiente; campañas y presupuestos sin cambios.
- Publicación `68bc7d1d2efe943295584bb91d79770d7108a674`: Vercel confirmó éxito; navegador público reprodujo consulta y los tres recursos nuevos responden HTTP 200.
