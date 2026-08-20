import { NextRequest, NextResponse } from "next/server";

export interface TranslateRequest {
  sourceLanguage?: string;
  targetLanguage: string;
  fields: Record<string, string | string[]>;
}

const ALLOWED_KEYS = new Set(["sourceLanguage", "targetLanguage", "fields"]);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    const keys = Object.keys(body);
    const unknownKeys = keys.filter((k) => !ALLOWED_KEYS.has(k));
    if (unknownKeys.length > 0) {
      return NextResponse.json(
        { error: `Unknown request fields detected: ${unknownKeys.join(", ")}.` },
        { status: 400 }
      );
    }

    const { targetLanguage, fields } = body as unknown as TranslateRequest;

    if (!targetLanguage || !fields || typeof fields !== "object") {
      return NextResponse.json(
        { error: "Missing required fields: targetLanguage and fields dictionary are required." },
        { status: 400 }
      );
    }

    // Pass-through if targetLanguage is English
    if (targetLanguage === "en") {
      return NextResponse.json({ translatedFields: fields, disclaimer: null }, { status: 200 });
    }

    // Stage 1 Translation Layer (Tamil & Hindi presentation translation)
    const translatedFields: Record<string, string | string[]> = {};

    for (const [key, value] of Object.entries(fields)) {
      // Never translate URLs, Citation IDs, or Authority IDs
      if (key.includes("Url") || key.includes("Id") || key.includes("authority")) {
        translatedFields[key] = value;
        continue;
      }

      if (typeof value === "string") {
        if (targetLanguage === "ta") {
          translatedFields[key] = value
            .replace(/Public Information Officer/g, "பொது தகவல் அலுவலர்")
            .replace(/National Consumer Helpline/g, "தேசிய நுகர்வோர் உதவி மையம்")
            .replace(/State Rent Authority/g, "மாநில வாடகை ஆணையம்")
            .replace(/District Labour Commissioner/g, "மாவட்ட தொழிலாளர் ஆணையர்");
        } else if (targetLanguage === "hi") {
          translatedFields[key] = value
            .replace(/Public Information Officer/g, "लोक सूचना अधिकारी")
            .replace(/National Consumer Helpline/g, "राष्ट्रीय उपभोक्ता हेल्पलाइन")
            .replace(/State Rent Authority/g, "राज्य किराया प्राधिकरण")
            .replace(/District Labour Commissioner/g, "जिला श्रम आयुक्त");
        } else {
          translatedFields[key] = value;
        }
      } else if (Array.isArray(value)) {
        translatedFields[key] = value;
      } else {
        translatedFields[key] = value;
      }
    }

    return NextResponse.json(
      {
        translatedFields,
        disclaimer: "This is a translated guidance version. Where interpretation differs, refer to the official source and English source-grounded result.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error in Translate Route." },
      { status: 500 }
    );
  }
}
