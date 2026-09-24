# Siguientes pasos

## Prueba social de Google Maps

1. Tras el despliegue autorizado, comprobar las cifras y enlaces en home y todas las landings.
2. Cuando cambien las reseñas, verificar ambas fichas de Google Maps y actualizar únicamente `lib/practiceReviews.ts`.

## Indexación — requiere autorización de Alexis

1. Revisar y autorizar el merge del PR de `fix/seo-indexacion-enlaces`; después autorizar despliegue. No se hizo merge ni deploy.
2. Ya desplegado, comprobar en Search Console que `https://www.alexisgarciaortopedia.com/robots.txt` sirve los tres `Disallow` nuevos (`/panel`, `/panel-luna`, `/control`).
3. Reenviar el sitemap en Search Console y pedir indexación manual de las 7 que estaban huérfanas: `/pachuca`, `/tula`, `/pachuca/fracturas`, `/tula/fracturas`, `/pachuca/rodilla`, `/tula/rodilla`, `/segunda-opinion`.
4. Volver a mirar Cobertura a las 2-3 semanas: lo que se espera es que "rastreada: actualmente sin indexar" baje y suba el número de URLs conocidas. Antes de ese plazo no hay señal que leer.
5. `/agendar` conserva el `<title>` triplicado ("Agendar consulta | Dr Alexis García | Dr. Alexis Eduardo García de los Santos"). Se dejó a propósito: es `noindex` y es ruta del flujo de citas. Corregirlo solo si algún día deja de serlo.

## Misión 3 — requiere autorización de Alexis

1. Revisar y autorizar el merge del PR de `feature/privada-attribution-ads-maps`; después autorizar despliegue a producción. No se hizo merge ni deploy durante esta misión.
2. Después del deploy, ejecutar una visita real desde Google Ads y comprobar que WhatsApp recibe `Ref: GADS-PAC | ID: WA-XXXXXX`, conservando el mismo ID al navegar.
3. Ejecutar una visita desde la URL etiquetada de Maps y comprobar `Ref: GMAPS-PAC | ID: WA-XXXXXX`.
4. Cambio manual pendiente en Google Business Profile de Pachuca: configurar como sitio web `https://www.alexisgarciaortopedia.com/pachuca?ref=GMAPS-PAC`. No modificar la ficha antes del deploy autorizado.
5. Definir en la operación de PRIVADA cómo capturar el `Ref` y el `ID` del mensaje en el paciente/movimiento sin inventar atribución. No existe unión individual perfecta para llamadas.

## Seguimiento Misión 1

- Revisar después del plazo de procesamiento de Google Ads (hasta 48 horas) que `Clic a teléfono - sitio web` deje de mostrar `Esperando conversiones` o registre actividad diagnóstica.
- Mantener el saldo en `no verificado — revisar Facturación` hasta que exista una fuente fiable de fondos prepago en Ads Scripts.

Procedimiento telefónico: `docs/PHONE_CONVERSION_RUNBOOK.md`.
