import { NextResponse } from "next/server";
import { getWeeklyAvailability } from "@/lib/appointmentsDb";
import { SCHEDULES } from "@/lib/appointmentsSchedule";

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sede = searchParams.get("sede") as keyof typeof SCHEDULES | null;
  const from = searchParams.get("from");

  if (!sede || !from || !SCHEDULES[sede]) {
    return NextResponse.json(
      { error: "Missing sede or from" },
      { status: 400 }
    );
  }

  const fromDate = new Date(from);
  const toDate = addDays(fromDate, 7);
  const fromString = fromDate.toISOString().slice(0, 10);
  const toString = toDate.toISOString().slice(0, 10);

  const occupied = getWeeklyAvailability({
    sede,
    fromDate: fromString,
    toDate: toString,
  });

  let totalSlots = 0;
  const schedule = SCHEDULES[sede];
  for (let i = 0; i < 8; i += 1) {
    const day = addDays(fromDate, i);
    if (schedule.days.includes(day.getDay())) {
      totalSlots += schedule.slots.length;
    }
  }

  const occupiedSlots = occupied.length;
  const availableSlots = Math.max(totalSlots - occupiedSlots, 0);

  return NextResponse.json({
    totalSlots,
    occupiedSlots,
    availableSlots,
  });
}
