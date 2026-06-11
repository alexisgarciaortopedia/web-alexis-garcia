import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { confirmAppointment, getAppointment } from "@/lib/appointmentsDb";

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
  const { appointment_id, payment_result } = body;

  if (!appointment_id || !payment_result) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  confirmAppointment({
    id: appointment_id,
    provider: payment_result.provider || "none",
    intentId: payment_result.intent_id || null,
    status: payment_result.status || "paid",
  });

  const appointment = getAppointment(appointment_id);

  if (appointment) {
    const summary = [
      "Nueva cita confirmada (WEB)",
      `Nombre: ${appointment.nombre}`,
      `Teléfono: ${appointment.telefono}`,
      `Sede: ${appointment.sede}`,
      `Tipo: ${appointment.tipo}`,
      `Fecha: ${appointment.fecha}`,
      `Hora: ${appointment.hora_inicio}`,
      `Motivo: ${appointment.motivo || "—"}`,
      `Pago: ${appointment.pago_tipo}`,
      `Monto: ${appointment.pago_monto}`,
      `Provider: ${appointment.pago_provider}`,
      `Status: ${appointment.pago_status}`,
      `Ref: ${appointment.ref_source || "WEB-2026"}`,
    ].join("\n");

    await sendDoctorEmail("Nueva cita confirmada (WEB)", summary);
  }

  return NextResponse.json({ ok: true });
}
