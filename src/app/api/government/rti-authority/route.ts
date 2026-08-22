// src/app/api/government/rti-authority/route.ts — RTI Authority Resolver API
import { NextRequest, NextResponse } from "next/server";
import { resolveRtiAuthority } from "@/lib/government-data/adapters/rti-authority";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subject, state, district, localBody, department, pinCode, isCentralBody } = body;

    if (!state || !district) {
      return NextResponse.json(
        { error: "Missing required fields: state, district" },
        { status: 400 }
      );
    }

    const result = await resolveRtiAuthority({
      subject: subject || "Public Grievance",
      state,
      district,
      localBody,
      department,
      pinCode,
      isCentralBody
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to resolve RTI authority" },
      { status: 500 }
    );
  }
}
