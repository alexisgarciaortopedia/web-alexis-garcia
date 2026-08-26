# Estado actual

Actualizado: 2026-08-26.

## Conversión de teléfono

- `main` contiene la etiqueta correcta, pero el handler previo solo llamaba a `gtag` y dejaba navegar inmediatamente a `tel:`.
- La acción de Ads había reportado cero datos después de una prueba real según el estado maestro reconciliado del 26-08-2026.
- Rama `audit/privada-mision-1`: handler corregido con `preventDefault`, `event_callback`, `event_timeout: 1000` y fallback de 1 segundo con protección contra navegación doble.
- Falta deploy autorizado y prueba real; después esperar procesamiento de Ads y revisar la acción por fecha/hora. No declarar recepción del hit antes de verla en Ads.

## Google Ads

- La interfaz no pudo auditarse en esta ejecución: el navegador disponible pidió iniciar sesión y no había Chrome conectado.
- Por ello, campañas/grupos/PAC-URG/PAC-2OP/presupuesto/gasto/primarias-secundarias se mantienen como **no verificados hoy**.
- No se realizó ningún cambio en Ads.

## Monitoreo

- `Panel Dr. García`, pestaña `Métricas-diarias`, contiene para `Tue 25 Aug`: gasto 227.67, 19 clics, 250 impresiones, 2 conversiones, CPA 113.84, saldo 1165.76 y 7.8 días.
- Esos datos son salida del script, no una conciliación con Ads; `saldo` y `días de saldo` quedan en cuarentena.
- Estado previo documenta script Ads ID `12037766`, correcciones `DURING ALL_TIME` → `LAST_30_DAYS` y guard de hoja nula. El código vivo y ejecuciones no fueron accesibles sin autenticación de Ads.
- Existe un segundo script histórico `Monitoreo - Reporte 08h`; no tocar sin identificar propietario, trigger y destinatarios.

## Fase 0

- Sheet operativo verificado con pestañas `INICIO`, `PACIENTES`, `MOVIMIENTOS`, `RESUMEN`, respaldo y catálogos.
- `RESUMEN` mantiene gasto Ads manual en 0 y advierte que el Panel requiere validación contra la interfaz real.
