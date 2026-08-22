// src/app/api/government/schemes/discover/route.ts — Welfare Scheme Discovery API
import { NextRequest, NextResponse } from "next/server";
import { discoverGovernmentSchemes } from "@/lib/government-data/adapters/schemes";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { state, category } = body;

    const schemes = await discoverGovernmentSchemes(state, category);
    return NextResponse.json({ schemes, count: schemes.length }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to discover schemes" },
      { status: 500 }
    );
  }
}
