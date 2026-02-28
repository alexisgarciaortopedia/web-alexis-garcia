import { NextResponse } from "next/server";
import { getOccupiedSlots } from "@/lib/appointmentsDb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sede = searchParams.get("sede");
  const date = searchParams.get("date");

  if (!sede || !date) {
    return NextResponse.json(
      { error: "Missing sede or date" },
      { status: 400 }
    );
  }

  const slots = getOccupiedSlots(sede as any, date);
  return NextResponse.json({ occupied: slots });
}
