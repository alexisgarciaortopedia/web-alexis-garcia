import { NextResponse } from "next/server";

const DISABLED_BODY = {
  ok: false,
  code: "BOOKING_AUTOMATION_DISABLED",
  message:
    "El agendado automatizado no está disponible. Para agendar, reprogramar o cancelar una cita, comunícate directamente con el consultorio por WhatsApp o llamada telefónica.",
} as const;

export function bookingAutomationDisabledResponse() {
  return NextResponse.json(DISABLED_BODY, { status: 410 });
}

export async function GET() {
  return bookingAutomationDisabledResponse();
}

export async function POST() {
  return bookingAutomationDisabledResponse();
}
