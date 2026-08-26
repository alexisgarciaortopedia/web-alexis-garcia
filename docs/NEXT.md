# Siguiente paso único

Usar Fase 0 diariamente y validar el hábito operativo antes de construir más software:

1. Brayan busca primero por nombre o teléfono; paciente nuevo va en la primera fila vacía de `PACIENTES`.
2. Cada contacto, cita, atención, cancelación, estudio, procedimiento o seguimiento crea una fila nueva en `MOVIMIENTOS`.
3. Solo marcar `Cobrado` y capturar importe cuando el dinero se recibió realmente; si queda pendiente, registrar próxima acción y fecha.
4. Revisar cada día `RESUMEN` → `PENDIENTES` y corregir las celdas resaltadas, sin borrar ni reutilizar filas.
5. Mantener gasto Ads manual durante la validación; no iniciar PWA ni integración automática todavía.
