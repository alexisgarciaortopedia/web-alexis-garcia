# Siguientes pasos

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
