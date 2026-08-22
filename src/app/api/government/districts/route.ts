// src/app/api/government/districts/route.ts — Live / Cached Districts API
import { NextRequest, NextResponse } from "next/server";
import { getDistrictsForStateRealtime } from "@/lib/government-data/adapters/districts";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");

  if (!state) {
    return NextResponse.json(
      { error: "State parameter is required" },
      { status: 400 }
    );
  }

  try {
    const result = await getDistrictsForStateRealtime(state.trim());
    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to resolve districts" },
      { status: 500 }
    );
  }
}
