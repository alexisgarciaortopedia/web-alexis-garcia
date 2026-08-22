# AGENTS.md — Alexis García Ortopedia / Proyecto privada

## Rol
Actúa como ingeniero senior full-stack especializado en Next.js App Router, TypeScript, Tailwind CSS y diseño SaaS médico premium.

## Contexto del repo
Este repo es un proyecto Next.js para Alexis García Ortopedia.

Estructura conocida:
- app
- components
- data
- docs
- lib
- public

Scripts conocidos:
- npm run dev
- npm run build
- npm run start
- npm run lint

No existe script typecheck. Para TypeScript usar:
- npx tsc --noEmit

## Reglas críticas
No modificar estas rutas:
- app/muevete-seguro/page.tsx
- app/agendar/page.tsx
- app/agendar/AgendarClient.tsx

Estas rutas ya funcionan y deben mantenerse intactas en diseño y comportamiento.

No hacer cambios destructivos.
No hacer git reset --hard.
No hacer push force.
No instalar dependencias salvo necesidad justificada.

## Objetivo visual
Crear una agenda médica interna premium, simple y usable para “Alexis García Ortopedia”.

Prioridad absoluta:
1. Simplicidad
2. Claridad
3. Utilidad diaria
4. Diseño médico premium
5. Responsive desktop/mobile

Regla principal:
Menos cosas, mejor pensadas.

## Estilo UI
- Premium, limpio, moderno y médico.
- Glassmorphism sutil.
- Fondo azul-gris claro.
- Tarjetas translúcidas.
- Bordes suaves.
- Sombras delicadas.
- Mucho aire visual.
- Tipografía moderna y legible.
- Colores sobrios: blanco, gris perla, azul profundo, azul claro, aqua suave.
- Estados suaves: verde, amarillo, azul, rojo y gris.
- Debe sentirse como SaaS médico listo para producción.

Evitar:
- Dashboard genérico.
- Interfaz saturada.
- Exceso de tarjetas.
- Demasiados botones.
- Demasiados colores.
- Texto pequeño ilegible.
- Menús largos.
- Secciones repetidas.

## Ruta objetivo
Crear la nueva agenda interna en:

app/dashboard/agenda/page.tsx

La ruta debe estar separada de la ruta pública app/agendar.

Mientras no exista autenticación, esta página debe tratarse como mockup interno sin datos reales de pacientes.

Agregar metadata noindex/nofollow si aplica en la ruta o layout correspondiente.

## Navegación lateral
Mostrar solo:
- Agenda
- Pacientes
- Disponibilidad
- Configuración

No mostrar:
- Inicio
- Mensajes
- Consultas

## Topbar
Mostrar solo:
- Alexis García Ortopedia
- Buscador: “Buscar paciente, cita o teléfono…”
- Fecha: “Hoy”
- Vista: “Día / Semana / Por sede”
- Botón principal: “+ Nueva cita”

## Sedes
Chips pequeños y elegantes:
- Todas
- Zárate
- Vidal
- Doxey
- Adoy

## Agenda principal
La agenda debe ser el centro visual y ocupar la mayor parte de la pantalla.

Citas mock:
- 08:00 María Fernanda López — Rodilla derecha — Adoy — Confirmada
- 09:00 José Antonio Martínez — Hombro — Adoy — En consulta
- 10:00 Bloqueo de tiempo — Procedimiento menor — Zárate
- 11:00 Ana Gabriela Sánchez — Columna — Vidal — Pendiente
- 12:00 Carlos Alberto Pérez — Postoperatorio — Doxey — Confirmada
- 13:00 Espacio disponible — + Agendar aquí

Cada cita debe mostrar:
- Hora
- Paciente
- Motivo
- Sede
- Estado

Estados:
- Pendiente: amarillo suave
- Confirmada: verde suave
- En consulta: azul suave
- Cancelada: rojo suave
- Finalizada: gris suave

## Panel derecho
Cuando no hay nada seleccionado, mostrar solo:
- Próxima cita
- Pendientes por confirmar
- Espacios disponibles
- “Disponibilidad actualizada”

Cuando se presiona “+ Nueva cita”, mostrar formulario compacto:
- Paciente
- Teléfono
- Motivo
- Sede
- Fecha
- Hora
- Botón: “Confirmar cita”

## Mobile
Versión móvil simple:
- Header con marca.
- Chips de sede.
- Agenda del día.
- Botón flotante “+ Nueva cita”.
- Navegación inferior:
  - Agenda
  - Pacientes
  - Más

## Validación obligatoria
Antes de terminar cualquier tarea de implementación:
1. Ejecutar npm run lint.
2. Ejecutar npm run build.
3. Ejecutar npx tsc --noEmit.
4. Si algo falla, corregir y volver a ejecutar.
5. Revisar git status.
6. Confirmar que no se modificaron rutas críticas.

## Definition of Done
Una tarea solo está terminada si:
- La ruta nueva carga sin errores.
- Build pasa.
- Lint pasa.
- TypeScript pasa o se reporta bloqueo real.
- Mobile y desktop funcionan.
- La UI es simple, premium y médica.
- No se tocaron rutas críticas.
- No se agregaron dependencias innecesarias.
