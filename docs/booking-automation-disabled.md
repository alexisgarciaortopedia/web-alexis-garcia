# Desactivación del agendado automatizado

## Fecha de desactivación

**11 de junio de 2026**

## Razón

El consultorio administra la agenda **manualmente** mediante la asistente. El sistema automatizado anterior se desactivó por:

- **Simplificación operativa:** el embudo vigente es web → WhatsApp o llamada → confirmación manual.
- **Riesgos de SQLite en Vercel:** la persistencia en filesystem no es adecuada para producción serverless.
- **Falsas confirmaciones:** evitar que un visitante interprete que la cita quedó reservada o pagada automáticamente.
- **Pagos en línea pospuestos:** Stripe/Mercado Pago no forman parte del flujo actual.

## Embudo vigente

1. Página web profesional (`/`, contenido clínico, ubicaciones, reseñas).
2. `/agendar` — contacto por WhatsApp o llamada telefónica.
3. Confirmación manual por el equipo del consultorio.
4. `/cita` — reprogramación o cancelación únicamente vía contacto directo.

## Rutas API neutralizadas

Todas responden **HTTP 410 Gone** con:

```json
{
  "ok": false,
  "code": "BOOKING_AUTOMATION_DISABLED",
  "message": "El agendado automatizado no está disponible. Para agendar, reprogramar o cancelar una cita, comunícate directamente con el consultorio por WhatsApp o llamada telefónica."
}
```

| Endpoint público | Estado |
|---|---|
| `/api/appointments/availability` | 410 Gone |
| `/api/appointments/weekly-availability` | 410 Gone |
| `/api/appointments/create-hold` | 410 Gone |
| `/api/appointments/confirm` | 410 Gone |
| `/api/appointments/get` | 410 Gone |
| `/api/appointments/reschedule` | 410 Gone |
| `/api/appointments/cancel` | 410 Gone |

## Código archivado

| Ubicación | Contenido |
|---|---|
| `app/_archived/api-appointments/` | Handlers API originales |
| `app/_archived/HomeAutomatedBookingFlow.tsx` | Flujo embebido en home |
| `app/_archived/AgendarClientAutomated.tsx` | Landing `/agendar` anterior |
| `app/_archived/CitaAutomatedFlow.tsx` | Gestión automatizada `/cita` |
| `lib/appointmentsDb.ts` | Capa SQLite (sin uso en producción) |
| `lib/appointmentsSchedule.ts` | Horarios del sistema anterior |
| `lib/appointmentsPricing.ts` | Precios del sistema anterior |

## Reactivación futura (pasos mínimos)

1. **Migrar a base persistente** (p. ej. Supabase/Postgres); no reutilizar SQLite en Vercel.
2. **Auditar doble reserva** y condiciones de carrera en holds.
3. **Reimplementar holds** con TTL y limpieza en servidor persistente.
4. **Conectar proveedor de pago** solo si el negocio lo aprueba; validar webhooks en Preview.
5. **Restaurar handlers** desde `app/_archived/api-appointments/` a `app/api/appointments/`.
6. **Reconectar UI** desde `app/_archived/` o reimplementar flujos con pruebas E2E.
7. **Probar en Preview** de Vercel antes de reactivar en producción.
8. **Reactivar endpoints** únicamente después de auditoría de seguridad y privacidad.

## Revertir la desactivación de endpoints

Restaurar cada `app/api/appointments/*/route.ts` desde la copia en `app/_archived/api-appointments/` y redeploy.
