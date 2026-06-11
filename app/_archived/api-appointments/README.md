# API de citas automatizadas (archivado)

Código del sistema automatizado anterior de citas, preservado para una eventual reactivación futura.

**Desactivado en producción:** 2026-06-11

## Contenido

| Ruta archivada | Método original | Función |
|---|---|---|
| `availability/route.ts` | GET | Consulta de horarios ocupados |
| `weekly-availability/route.ts` | GET | Disponibilidad semanal |
| `create-hold/route.ts` | POST | Creación de hold temporal |
| `confirm/route.ts` | POST | Confirmación y notificación por correo |
| `get/route.ts` | GET | Consulta de cita por ID |
| `reschedule/route.ts` | POST | Reprogramación |
| `cancel/route.ts` | POST | Cancelación |

## Dependencias históricas (conservadas en el repositorio)

- `lib/appointmentsDb.ts`
- `lib/appointmentsSchedule.ts`
- `lib/appointmentsPricing.ts`

## Reactivación futura

Ver `docs/booking-automation-disabled.md`.
