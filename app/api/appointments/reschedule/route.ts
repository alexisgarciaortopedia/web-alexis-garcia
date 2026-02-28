import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  getAppointment,
  isSlotAvailable,
  rescheduleAppointment,
} from "@/lib/appointmentsDb";

export const runtime = "nodejs";

async function sendDoctorEmail(subject: string, text: string) {
  const recipient = process.env.DOCTOR_NOTIFICATION_EMAIL;
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = Number(process.env.SMTP_PORT || "587");

  if (!recipient || !smtpHost || !smtpUser || !smtpPass) {
    return { sent: false, reason: "missing_smtp_config" };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false,
    auth: { user: smtpUser, pass: smtpPass },
  });

  await transporter.sendMail({
    to: recipient,
    from: smtpUser,
    subject,
    text,
  });

  return { sent: true };
}

function hoursUntil(iso: string | null | undefined) {
  if (!iso) return null;
  const now = new Date();
  const start = new Date(iso);
  return (start.getTime() - now.getTime()) / (1000 * 60 * 60);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { appointment_id, fecha, hora_inicio, hora_fin } = body;

  if (!appointment_id || !fecha || !hora_inicio || !hora_fin) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const appointment = getAppointment(appointment_id);
  if (!appointment) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const reprogramCount = Number(appointment.reprogram_count || 0);
  const remainingHours = hoursUntil(appointment.current_start_at);

  if (reprogramCount >= 1) {
    return NextResponse.json(
      { error: "Reprogram limit reached" },
      { status: 409 }
    );
  }

  if (remainingHours !== null && remainingHours < 12) {
    return NextResponse.json(
      { error: "Less than 12 hours" },
      { status: 409 }
    );
  }

  const available = isSlotAvailable({
    sede: appointment.sede,
    fecha,
    hora_inicio,
    excludeId: appointment_id,
  });

  if (!available) {
    return NextResponse.json({ error: "Slot not available" }, { status: 409 });
  }

  const beforeDate = appointment.fecha;
  const beforeTime = appointment.hora_inicio;
  rescheduleAppointment({ id: appointment_id, fecha, hora_inicio, hora_fin });

  const summary = [
    "Cita reprogramada desde WEB",
    `Nombre: ${appointment.nombre}`,
    `Teléfono: ${appointment.telefono}`,
    `Sede: ${appointment.sede}`,
    `Tipo: ${appointment.tipo}`,
    `Antes: ${beforeDate} ${beforeTime}`,
    `Después: ${fecha} ${hora_inicio}`,
    `Motivo: ${appointment.motivo || "—"}`,
    `Ref: ${appointment.ref_source || "WEB-2026"}`,
  ].join("\n");

  await sendDoctorEmail("Cita reprogramada desde WEB", summary);
  return NextResponse.json({ ok: true });
}
