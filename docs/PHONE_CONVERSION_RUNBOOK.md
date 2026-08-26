# Runbook post-deploy — conversión telefónica

No ejecutar hasta que Alexis autorice deploy/producción.

## 1. Preparación

- Confirmar que producción contiene el commit de esta rama.
- Abrir DevTools → Network, activar `Preserve log` y filtrar por `googleadservices`, `pagead` o `conversion`.
- Anotar fecha, hora y zona horaria de la prueba.

## 2. Prueba real

1. Cargar una página con enlace telefónico y esperar a que `gtag.js` termine de cargar.
2. Hacer un único clic real en el teléfono.
3. Confirmar que la apertura de `tel:+527731754638` ocurre después del callback o, como máximo, tras el fallback de 1 segundo.
4. En Network, conservar evidencia de un request de conversión exitoso cuyo identificador corresponda a `AW-18142944053/_EqkCPn2q-ccELW2nctD`. No registrar datos de pacientes.
5. Si no sale el request, revisar bloqueadores, consentimiento, carga de `gtag.js`, consola y payload antes de repetir una sola vez.

## 3. Google Ads

- Abrir Objetivos → Conversiones → Resumen → `Clic a teléfono - sitio web`.
- Comparar `Última actividad` y diagnósticos con la hora anotada. Considerar el tiempo de procesamiento que muestre Google Ads.
- DONE técnico: request observado antes de `tel:` y sin error.
- DONE Ads: la acción muestra actividad atribuible a la ventana de prueba. No inferirla solo desde el total agregado.
- Documentar hora, página, navegador, resultado técnico y resultado Ads en `docs/STATE.md`.

Cambiar la acción a secundaria requiere autorización expresa y no forma parte de esta prueba.
