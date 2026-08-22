// src/app/api/government/authority/route.ts — Civic Authority Resolver API
import { NextRequest, NextResponse } from "next/server";
import { resolveCurrentAuthority } from "@/lib/government-data/adapters/authorities";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { domain, issueType, state, district, locality, localBody, pinCode } = body;

    if (!domain || !state || !district) {
      return NextResponse.json(
        { error: "Missing required fields: domain, state, district" },
        { status: 400 }
      );
    }

    const result = await resolveCurrentAuthority({
      domain,
      issueType: issueType || "general",
      state,
      district,
      locality,
      localBody,
      pinCode
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to resolve authority" },
      { status: 500 }
    );
  }
}
