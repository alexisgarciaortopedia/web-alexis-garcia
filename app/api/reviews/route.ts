import { NextResponse } from "next/server";
import { getGoogleReviews } from "@/lib/googlePlaces";

export const revalidate = 86400;

export async function GET() {
  const data = await getGoogleReviews();

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}
