# Activación de reseñas dinámicas de Google

Esta guía describe cómo activar la integración con **Places API (New)** para mostrar reseñas reales del perfil profesional del Dr. Alexis Eduardo García de los Santos en la home del sitio.

Hasta que las variables estén configuradas, el sitio muestra automáticamente las reseñas estáticas actuales como fallback, sin errores visibles para el visitante.

## Requisitos previos

- Proyecto en [Google Cloud Console](https://console.cloud.google.com/)
- Facturación habilitada en el proyecto
- **Place ID** confirmado del perfil profesional del médico en Google Maps (no de una clínica ni de un centro médico ajeno)

## Paso 1 — Crear o usar un proyecto en Google Cloud

1. Accede a Google Cloud Console.
2. Crea un proyecto nuevo o selecciona uno existente dedicado al sitio web.

## Paso 2 — Habilitar facturación

Places API (New) requiere una cuenta de facturación activa. Configúrala en **Billing** dentro del proyecto.

## Paso 3 — Activar Places API (New)

1. Ve a **APIs & Services → Library**.
2. Busca **Places API (New)**.
3. Haz clic en **Enable**.

No confundas esta API con la versión legacy “Places API”.

## Paso 4 — Crear una API key exclusiva para servidor

1. Ve a **APIs & Services → Credentials**.
2. Crea una **API key** nueva.
3. Nómbrala de forma identificable, por ejemplo: `alexisgarciaortopedia-server`.

## Paso 5 — Restringir la API key

En la configuración de la key:

1. **Application restrictions**: elige **IP addresses** (recomendado en Vercel con IPs estáticas si las usas) o deja sin restricción de aplicación solo durante pruebas controladas. Nunca expongas esta key en el navegador.
2. **API restrictions**: selecciona **Restrict key** y permite únicamente **Places API (New)**.

## Paso 6 — Obtener el Place ID correcto

El Place ID debe corresponder al **perfil profesional del médico**, no a:

- Adoy Medical Center
- Zárate Unidad de Especialidades Médicas
- Doctoralia u otras plataformas

Herramientas útiles:

- [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
- URL pública de Google Maps del perfil del médico (el identificador suele aparecer como `!1s0x...` o en el parámetro `place_id`)

Verifica manualmente que la ficha muestre al Dr. Alexis Eduardo García de los Santos como traumatólogo/ortopedista antes de usar su Place ID.

## Paso 7 — Configurar variables de entorno

Añade estas variables **solo en el servidor**. No uses el prefijo `NEXT_PUBLIC_`.

```env
GOOGLE_PLACES_API_KEY=tu_api_key
GOOGLE_PLACES_PLACE_ID=ChIJxxxxxxxxxxxxxxxx
```

Referencia local: copia `.env.example` a `.env.local` y completa los valores allí. **No subas `.env.local` al repositorio.**

## Paso 8 — Configurar variables en Vercel

En el panel del proyecto en Vercel:

1. **Settings → Environment Variables**
2. Añade `GOOGLE_PLACES_API_KEY` y `GOOGLE_PLACES_PLACE_ID`
3. Actívalas en **Production**, **Preview** y **Development** según corresponda

## Paso 9 — Redeploy

Tras guardar las variables, realiza un **Redeploy** del último deployment en producción para que el entorno las cargue.

## Paso 10 — Verificar la integración

### Endpoint interno

Abre:

```
https://www.alexisgarciaortopedia.com/api/reviews
```

Respuesta esperada con credenciales válidas:

```json
{
  "source": "google",
  "rating": 4.9,
  "totalReviews": 42,
  "reviews": [ ... ],
  "googleMapsUri": "https://maps.google.com/...",
  "updatedAt": "2026-06-11T..."
}
```

### Home

Visita la home y confirma:

- Calificación real visible
- Total de opiniones (si Google lo proporciona)
- Hasta cinco reseñas en el carrusel
- Botón **Ver todas las reseñas en Google** apuntando a `googleMapsUri`
- Atribución visible a Google

### Seguridad

Confirma que:

- La API key **no** aparece en el HTML de la página
- La API key **no** aparece en bundles del cliente (DevTools → Sources / Network)
- `/api/reviews` no devuelve secretos ni variables de entorno

## Caché

Las respuestas se cachean en el servidor durante **24 horas** (`revalidate: 86400`). Tras activar credenciales nuevas, los cambios pueden tardar hasta 24 h en reflejarse salvo que se invalide la caché o se redepliegue.

## Revertir al fallback estático

Para volver al fallback sin eliminar código:

1. Elimina `GOOGLE_PLACES_API_KEY` y/o `GOOGLE_PLACES_PLACE_ID` de Vercel (o déjalas vacías).
2. Redeploy.

El endpoint responderá con `"source": "fallback"` y la home mostrará las reseñas estáticas actuales.

## Solución de problemas

| Síntoma | Posible causa |
|---|---|
| `"source": "fallback"` con variables configuradas | Place ID incorrecto, key restringida de más, o Places API (New) no habilitada |
| Reseñas vacías | Perfil sin reseñas públicas en Google o FieldMask incompleto |
| Error 403 en Places API | Restricciones de API key o facturación inactiva |

Los warnings del servidor se registran con el prefijo `[googlePlaces]` y nunca incluyen la API key.
