# Changelog

## 2026-08-26 — Misión 2: Fase 0 operativa

- Auditadas las seis pestañas del Sheet vivo y su privacidad.
- Convertidos IDs de pacientes y movimientos de fórmulas dependientes de fila a valores permanentes, conservando registros y relaciones existentes.
- Añadido `Doctoralia`; normalizado `Google Maps / orgánico`; validación de origen estricta con los once valores autorizados.
- Corregido valor acumulado por paciente para sumar exclusivamente movimientos `Cobrado`.
- Añadidos pendientes de contacto sin cita y no-show/cancelación al resumen.
- Añadidas alertas visuales para duplicados, cobros sin importe y próxima acción sin fecha; protegidas con advertencia las columnas técnicas y el respaldo.
- Simplificadas las instrucciones de `INICIO` para captura cotidiana de Brayan.
- Ejecutada y retirada una prueba ficticia completa; fórmulas, desplegables, vínculos, sede, cobro y resumen conciliaron sin dejar datos de prueba.
- Confirmado que el Sheet no es público y que Ads permanece manual, sin atribución inventada ni conexión al Panel.

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
