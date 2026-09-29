# Rediseño premium — versión de revisión

Fecha: 28 septiembre 2026 (México). Rama: feature/premium-conversion-preview.

## Alcance construido
- Portada, páginas de Pachuca y Tula, agenda y entrada de Muévete Seguro.
- Diseño propio responsivo: verde petróleo, marfil, retrato real, tipografía editorial, bloques de confianza y CTA por sede.
- Videos públicos de la prueba: quirófano (20 s), Adoy/Pachuca (44 s), sin carga hasta reproducir. El video de consulta se preparó localmente pero queda fuera del repositorio y del preview hasta confirmar autorización de las personas reconocibles. Su sección muestra el retrato existente del doctor mientras tanto. Originales intactos; los archivos optimizados omiten cierres negros.
- Teléfonos vigentes: Pachuca 7717588383, Tula 7731754638. La sede se conserva en sesión para el recorrido hacia agenda.
- Muévete Seguro usa el canal operativo existente de Tula. Permite elegir perfil y zona, y prepara un mensaje de solicitud; no afirma inscripción ni envío hasta que el usuario lo envíe en WhatsApp. No dispara conversiones de consulta Ads.
- Reseñas existentes de Tula mostradas con su sede explícita; calificación por sede se conserva. No se inventaron reseñas nuevas.
- Costo no publicado: hay valores antiguos contradictorios en el repositorio. Equipo confirma tarifa antes de agendar.

## Medición
- Eventos GA4 preparados: contact_click (sede, channel, placement), program_request_click, video_start, video_progress, video_complete.
- Origen: gads_pachuca, gmaps_pachuca, gmaps_tula, web_other. El click ID de Ads conserva prioridad. No significa localidad física del usuario.
- No se envían nombre, teléfono del paciente, diagnóstico, texto de WhatsApp ni ID de sesión WA a GA4.
- Se conservan los IDs de conversión Ads. Las pruebas fuera del dominio público no emiten conversiones; en el dominio, ?medicion=prueba excluye toda la pestaña mientras dure la sesión.
- GA4 NO activo hasta configurar NEXT_PUBLIC_GA4_ID con el ID real de la propiedad y verificar llegada en Realtime/DebugView.
- Usar medición automática de page_view por historial en GA4; no añadir pageviews manuales duplicados. Revisar destinos ya conectados a Google tag antes de activar uno nuevo.
- Google Signals y personalización publicitaria desactivados en la configuración nueva.
- Enlaces propuestos de Maps para atribución completa (NO cambiados en este trabajo):
  - /pachuca?ref=GMAPS-PAC&utm_source=google&utm_medium=organic&utm_campaign=maps_pachuca
  - /tula?ref=GMAPS-TUL&utm_source=google&utm_medium=organic&utm_campaign=maps_tula
- Corte operativo: 1 octubre 2026, America/Mexico_City. Contacto real y asistencia/cobrado requieren registro de recepción y deduplicación; el clic no equivale a paciente.

## Validación local completada
- npm run lint
- npx tsc --noEmit
- node scripts/verify-premium.mjs: teléfonos, atribución, exclusión de pruebas y payload sin datos personales.
- NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt npx next build --webpack (35 rutas compiladas).

## Despliegue de revisión
- Vercel confirmó Deployment has completed para f292e36af84cb415a2a33bf983584de182dac34f y 0465afb6f6a7df8769ba845d4775bad54b3af983.
- PR #19 en borrador, sin fusión. Visor /design-review solo en entorno preview/desarrollo, no disponible en producción.
- Preview: https://web-alexis-garcia-git-fe-1ee11f-alexisgarciaortopedias-projects.vercel.app/
- En la sesión de Analytics abierta aparece la bienvenida inicial; no hay una propiedad seleccionada/configurada para activar estas métricas.
- Acceso a Vercel verificado. Revisión visual de portada en escritorio y 390 px; agenda, navegación y solicitud del programa verificadas a 360 px mediante el visor responsive del propio preview. Ambos videos alcanzan readyState 4 sin error; quirófano completó 20 s y Adoy reprodujo con duración 44 s. Tula → agenda conserva la sede. No equivale a una prueba en dispositivos físicos.

## Antes de producción
- Alexis revisa y aprueba la propuesta navegable antes de publicar.
- Confirmar la autorización de publicación de personas reconocibles en los videos.
- Conectar la propiedad GA4 real, comprobar eventos y exclusión de pruebas; verificar enlaces etiquetados en ambas fichas Maps.
- Confirmar tarifa actual si se desea mostrarla y alcance del seguimiento.
- El dominio público no se modifica hasta aprobar esta revisión. No se alteran presupuesto, pujas ni objetivos Ads.
