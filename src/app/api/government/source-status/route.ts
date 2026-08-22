// src/app/api/government/source-status/route.ts — Portal Health & Source Status API
import { NextRequest, NextResponse } from "next/server";
import { checkPortalHealth } from "@/lib/government-data/adapters/source-health";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 }
    );
  }

  try {
    const result = await checkPortalHealth(url);
    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to check portal health" },
      { status: 500 }
    );
  }
}
