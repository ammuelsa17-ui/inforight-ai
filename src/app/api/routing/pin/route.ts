import { NextRequest, NextResponse } from "next/server";
import { resolvePinAuthority } from "@/lib/routing/pin-router";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pinCode, issueDescription } = body || {};

    if (!pinCode || typeof pinCode !== "string") {
      return NextResponse.json(
        {
          resolved: false,
          pinCode: pinCode || "",
          unsupportedMessage: "pinCode is required and must be a 6-digit numeric string."
        },
        { status: 400 }
      );
    }

    const resolution = resolvePinAuthority(pinCode, issueDescription || "");
    return NextResponse.json(resolution, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        resolved: false,
        pinCode: "",
        unsupportedMessage: "Internal server error resolving PIN code authority."
      },
      { status: 500 }
    );
  }
}
