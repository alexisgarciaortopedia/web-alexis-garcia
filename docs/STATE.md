# Estado actual

Actualizado: 2026-08-26.

## Conversión de teléfono

- `main` contiene la etiqueta correcta, pero el handler previo solo llamaba a `gtag` y dejaba navegar inmediatamente a `tel:`.
- La acción de Ads había reportado cero datos después de una prueba real según el estado maestro reconciliado del 26-08-2026.
- Rama `audit/privada-mision-1`: handler corregido con `preventDefault`, `event_callback`, `event_timeout: 1000` y fallback de 1 segundo con protección contra navegación doble.
- Falta deploy autorizado y prueba real; después esperar procesamiento de Ads y revisar la acción por fecha/hora. No declarar recepción del hit antes de verla en Ads.

## Google Ads

- Cuenta verificada el 2026-08-26: `954-489-8007`, usuario `alexisgarciaortopedia@gmail.com`, zona horaria GMT-06:00.
- Campaña `Search-1`: habilitada, búsqueda, presupuesto 150 MXN/día y estrategia de puja en aprendizaje.
- Hoy: 38 impresiones, 6 clics, 46.56 MXN de gasto y 0 conversiones.
- Últimos 30 días (27 jul–25 ago): 9,946 impresiones, 612 clics, 4,443.41 MXN, 33 conversiones y 134.65 MXN/conv. Desglose: WhatsApp 27, `Clic de llamada` 5 y `Llamadas desde anuncios` 1.
- Grupos: `Ad group 1` habilitado y con gasto; `Procedimientos-PAC` habilitado sin gasto hoy; `PAC-URG` y `PAC-2OP` en pausa y sin gasto hoy.
- Solo aparece una campaña no retirada. Existe un borrador `Search-2-Tula`; un borrador no publica ni gasta.
- `Clic a teléfono - sitio web`: habilitada, **Esperando conversiones**, principal, incluida en objetivos de cuenta y 0 conversiones. No es secundaria actualmente.
- `WhatsApp - clic`: activa, principal e incluida en objetivos de cuenta. `Clicks to call` alojada en Google es principal pero no está incluida en objetivos de cuenta.
- Enhanced Conversions sigue sin activarse; Ads muestra una recomendación para activarlas, que debe ignorarse por decisión cerrada.
- No se realizó ningún cambio en Ads.

## Monitoreo

- `Panel Dr. García`, pestaña `Métricas-diarias`, contiene para `Tue 25 Aug`: gasto 227.67, 19 clics, 250 impresiones, 2 conversiones, CPA 113.84, saldo 1165.76 y 7.8 días.
- Ads Facturación muestra fondos disponibles por 4,979.25 MXN y saldo promocional restante de 686.23 MXN. El saldo 1,165.76 del Sheet es incorrecto.
- Causa del saldo incorrecto: `getSaldoDisponible_()` resta `amount_served` a `approved_spending_limit` de `account_budget`; ese presupuesto de cuenta no representa los fondos de prepago disponibles.
- Promoción verificada: crédito concedido 4,000 MXN, **Activo**, ya financiando campañas; 3,313.77 MXN gastados (82.84 %) y caducidad del crédito 2 oct 2026. La alerta B8 que exige primera conversión antes del 1 sept es falsa y se basa solo en una fecha hardcodeada.
- Script `Sistema de Monitoreo` ID `12037766`: habilitado cada hora, última ejecución 26 ago 12:36, terminó sin cambios. El código mantiene `LAST_30_DAYS` y el guard de hoja nula.
- Riesgo operativo: `reporteDiario()` puede pausar keywords automáticamente mediante A1 a las 08:00. Esto contradice la regla vigente de no cambiar campañas sin autorización y debe retirarse o pasar a modo recomendación, pero no se modificó.
- Existe `Monitoreo - Reporte 08h` ID `12143656`, habilitado, sin frecuencia y sin ejecución visible; no gasta por sí mismo, pero sigue siendo un duplicado huérfano.

## Fase 0

- Sheet operativo verificado con pestañas `INICIO`, `PACIENTES`, `MOVIMIENTOS`, `RESUMEN`, respaldo y catálogos.
- `RESUMEN` mantiene gasto Ads manual en 0 y advierte que el Panel requiere validación contra la interfaz real.
