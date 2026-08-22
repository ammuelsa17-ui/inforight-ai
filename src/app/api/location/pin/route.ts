// src/app/api/location/pin/route.ts — Server-side Pan-India PIN & Location Resolution API
import { NextRequest, NextResponse } from "next/server";
import { resolveAllIndiaPin } from "@/lib/location/all-india-location-resolver";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pin = searchParams.get("pin") || "";
  const locality = searchParams.get("locality") || undefined;

  try {
    const result = await resolveAllIndiaPin(pin, locality);
    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      {
        valid: false,
        error: err.message || "Failed to resolve PIN location",
      },
      { status: 400 }
    );
  }
}
