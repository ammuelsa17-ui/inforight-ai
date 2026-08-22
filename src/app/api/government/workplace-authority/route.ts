// src/app/api/government/workplace-authority/route.ts — Workplace Authority Resolver API
import { NextRequest, NextResponse } from "next/server";
import { resolveLabourOffice } from "@/lib/government-data/adapters/labour-directory";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { state, district, isCentralSphere } = body;

    if (!state) {
      return NextResponse.json(
        { error: "State parameter is required" },
        { status: 400 }
      );
    }

    const result = resolveLabourOffice(state, district, isCentralSphere);
    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to resolve labour office" },
      { status: 500 }
    );
  }
}
