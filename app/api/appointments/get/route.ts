import { NextResponse } from "next/server";
import { getAppointment } from "@/lib/appointmentsDb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const appointmentId = searchParams.get("appointment_id");

  if (!appointmentId) {
    return NextResponse.json(
      { error: "Missing appointment_id" },
      { status: 400 }
    );
  }

  const appointment = getAppointment(appointmentId);
  if (!appointment) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ appointment });
}
