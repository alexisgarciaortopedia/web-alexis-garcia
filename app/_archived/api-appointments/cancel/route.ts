import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { cancelAppointment, getAppointment } from "@/lib/appointmentsDb";

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

export async function POST(request: Request) {
  const body = await request.json();
  const { appointment_id } = body;

  if (!appointment_id) {
    return NextResponse.json({ error: "Missing appointment_id" }, { status: 400 });
  }

  const appointment = getAppointment(appointment_id);
  if (!appointment) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  cancelAppointment(appointment_id);

  const summary = [
    "Cita cancelada desde WEB",
    `Nombre: ${appointment.nombre}`,
    `Teléfono: ${appointment.telefono}`,
    `Sede: ${appointment.sede}`,
    `Tipo: ${appointment.tipo}`,
    `Fecha: ${appointment.fecha}`,
    `Hora: ${appointment.hora_inicio}`,
    `Motivo: ${appointment.motivo || "—"}`,
    `Ref: ${appointment.ref_source || "WEB-2026"}`,
  ].join("\n");

  await sendDoctorEmail("Cita cancelada desde WEB", summary);
  return NextResponse.json({ ok: true });
}
