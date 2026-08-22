// src/app/api/government/location/route.ts — Live / Cached Location Resolver API
import { NextRequest, NextResponse } from "next/server";
import { resolveIndianPin } from "@/lib/government-data/adapters/postal-location";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pin = searchParams.get("pin");

  if (!pin || !/^[1-9][0-9]{5}$/.test(pin.trim())) {
    return NextResponse.json(
      { error: "Invalid Indian PIN code format. Must be 6 numeric digits starting with 1-9." },
      { status: 400 }
    );
  }

  try {
    const result = await resolveIndianPin(pin.trim());
    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to resolve PIN location" },
      { status: 500 }
    );
  }
}
