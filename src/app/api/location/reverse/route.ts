// src/app/api/location/reverse/route.ts — Server-side Reverse Geocoding API
import { NextRequest, NextResponse } from "next/server";
import { reverseGeocodeCoordinates } from "@/lib/location/all-india-location-resolver";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { latitude, longitude } = body;

    if (latitude === undefined || longitude === undefined) {
      return NextResponse.json({ error: "Missing latitude or longitude" }, { status: 400 });
    }

    const result = await reverseGeocodeCoordinates(Number(latitude), Number(longitude));
    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message || "Failed to reverse geocode coordinates",
      },
      { status: 500 }
    );
  }
}
