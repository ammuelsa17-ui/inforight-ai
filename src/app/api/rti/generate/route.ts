import { NextRequest, NextResponse } from "next/server";
import { GenerateRtiRequest, GenerateRtiResponse } from "@/types/api";

// Server-side official citation allowlist
const SERVER_SOURCE_ALLOWLIST = new Set([
  "RTI_ACT_2005_AMENDED",
  "CCMC_RTI_AUTHORITY",
  "CCMC_ENGINEERING_ROADS",
]);

// Prohibited applicant PII keys that violate privacy boundaries if sent in API request
const PROHIBITED_REQUEST_KEYS = [
  "applicantName",
  "applicantAddress",
  "phone",
  "email",
  "aadhaar",
  "signature",
];

// String normalization helper
function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// In-text PII scanner and redactor
function sanitizeIssueText(text: string): { sanitized: string; hadUnsafePii: boolean } {
  let sanitized = text;
  const hadUnsafePii = false;

  // Redact 10-digit Indian phone numbers or +91 patterns
  const phoneRegex = /(\+91[\s-]?)?[6-9]\d{9}/g;
  if (phoneRegex.test(sanitized)) {
    sanitized = sanitized.replace(phoneRegex, "[REDACTED_PHONE]");
  }

  // Redact email addresses
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  if (emailRegex.test(sanitized)) {
    sanitized = sanitized.replace(emailRegex, "[REDACTED_EMAIL]");
  }

  // Redact 12-digit Aadhaar-like number patterns
  const aadhaarRegex = /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g;
  if (aadhaarRegex.test(sanitized)) {
    sanitized = sanitized.replace(aadhaarRegex, "[REDACTED_AADHAAR]");
  }

  return { sanitized, hadUnsafePii };
}

// Deterministic authority & fallback citation resolution
function buildDeterministicAuthority(localBodyName: string, state: string) {
  const normLocalBody = normalizeString(localBodyName);
  const normState = normalizeString(state);

  const isVerifiedCoimbatore =
    normLocalBody.includes("coimbatore city municipal corporation") ||
    (normLocalBody.includes("coimbatore") && normState.includes("tamil nadu"));

  const authority = {
    designation: "Public Information Officer" as const,
    organization: localBodyName.trim() || "Municipal Corporation Office",
    state: state.trim() || "Tamil Nadu",
    verified: isVerifiedCoimbatore,
  };

  const fallbackCitationIds = isVerifiedCoimbatore
    ? ["RTI_ACT_2005_AMENDED", "CCMC_RTI_AUTHORITY", "CCMC_ENGINEERING_ROADS"]
    : ["RTI_ACT_2005_AMENDED"];

  return { authority, isVerifiedCoimbatore, fallbackCitationIds };
}

// Fallback response builder
function buildFallbackResponse(
  reqPayload: GenerateRtiRequest,
  warningMessage?: string
): GenerateRtiResponse {
  const { authority, fallbackCitationIds } = buildDeterministicAuthority(
    reqPayload.localBodyName,
    reqPayload.state
  );

  const localityStr = reqPayload.locality ? reqPayload.locality.trim() : "specified road stretch";
  const wardStr = reqPayload.ward ? ` (Ward: ${reqPayload.ward.trim()})` : "";

  return {
    mode: "fallback",
    subject: `Application under Section 6(1) of RTI Act, 2005 regarding road inspection and works records in ${localityStr}, ${authority.organization}`,
    applicationBody: `Under Section 6(1) of the Right to Information Act, 2005, please provide certified copies of official government records regarding road inspection, repair work orders, Measurement Book (MB) entries, and expenditure statements for the road stretch at ${localityStr}${wardStr}.`,
    questions: [
      `Provide certified copies of the sanctioned work order, estimate, approved technical specifications, and contractor SLA for road maintenance at ${localityStr}.`,
      `Provide certified copies of the Measurement Book (MB) entries and completion certificates cleared for road repair at ${localityStr} during the specified period.`,
      `Provide the official Defect Liability Period (DLP) details, contractor name, and expenditure statement for road works carried out at ${localityStr}.`,
      `Provide certified copies of public complaints registered and Action Taken Reports (ATR) for road defects in ${localityStr}${wardStr}.`,
    ],
    authority,
    citationIds: fallbackCitationIds,
    validation: {
      schemaValid: true,
      citationsValid: true,
      questionCount: 4,
      applicantDataSentToAI: false,
    },
    warning:
      warningMessage ||
      (!authority.verified
        ? "Authority is not verified in Phase 1 registry; confirm PIO details before filing."
        : "Gemini API unavailable or fallback activated; displaying predetermined record requests."),
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    // 1. Prohibited Applicant Data Security Check
    for (const key of Object.keys(body)) {
      if (PROHIBITED_REQUEST_KEYS.includes(key)) {
        return NextResponse.json(
          {
            error: `Security Violation: Prohibited field '${key}' sent in API request. Applicant identity must remain strictly in browser memory.`,
          },
          { status: 400 }
        );
      }
    }

    // 2. Strict Required Fields Check
    const {
      issue,
      state,
      district,
      localBodyName,
      locality,
      ward,
      dateRange,
      sourceIds,
      simulateFailure,
    } = body as Partial<GenerateRtiRequest>;

    if (!issue || !state || !district || !localBodyName || !locality) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: issue, state, district, localBodyName, locality are mandatory.",
        },
        { status: 400 }
      );
    }

    // 3. Deterministic Authority Construction
    const { authority, fallbackCitationIds } = buildDeterministicAuthority(
      localBodyName,
      state
    );

    // 4. In-text PII Detection & Redaction
    const { sanitized: sanitizedIssue } = sanitizeIssueText(issue);

    // 5. Citation Allowlist Intersection
    const requestedSourceIds = Array.isArray(sourceIds) ? sourceIds : [];
    const validatedSourceIds = requestedSourceIds.filter((id) =>
      SERVER_SOURCE_ALLOWLIST.has(id)
    );

    const safeCitationIds =
      validatedSourceIds.length > 0 ? validatedSourceIds : fallbackCitationIds;

    const fullPayload: GenerateRtiRequest = {
      issue: sanitizedIssue,
      state: state.trim(),
      district: district.trim(),
      localBodyName: localBodyName.trim(),
      locality: locality.trim(),
      ward: ward ? ward.trim() : undefined,
      dateRange: dateRange ? dateRange.trim() : undefined,
      sourceIds: safeCitationIds,
      simulateFailure,
    };

    // 6. Check for Simulated Failure or Missing Gemini API Key
    const apiKey = process.env.GEMINI_API_KEY;

    if (simulateFailure || !apiKey) {
      const fallback = buildFallbackResponse(
        fullPayload,
        !apiKey
          ? "GEMINI_API_KEY environment variable is not configured. Active safe fallback mode."
          : "Internal failure simulation toggled."
      );
      return NextResponse.json(fallback, { status: 200 });
    }

    // 7. Gemini API Integration with Gemini 2.5/1.5 Flash
    try {
      const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const systemPrompt = `You are a specialized RTI Drafting Assistant for Indian municipal civic issues.
Your task is to convert the user's civic road issue into structured, record-based requests for existing government records under Section 6(1) of the RTI Act 2005.

RULES:
- Do NOT generate subjective opinions or why/reason questions (e.g. "Why was the road not repaired?").
- Generate ONLY 3 to 5 objective, record-based requests for existing documents (e.g. sanctioned estimates, work orders, Measurement Book (MB) entries, defect liability period certificates, complaints registers).
- Select citationIds ONLY from the provided allowlist: ${JSON.stringify(safeCitationIds)}.

Output JSON matching this exact structure:
{
  "subject": "Concise RTI Subject Title",
  "applicationBody": "Short context statement requesting certified copies of government records under Section 6(1) of RTI Act 2005.",
  "questions": ["Question 1", "Question 2", "Question 3"],
  "citationIds": ${JSON.stringify(safeCitationIds)}
}`;

      const userContent = `Civic Issue: ${sanitizedIssue}
Locality: ${fullPayload.locality}
Local Body: ${fullPayload.localBodyName}
District: ${fullPayload.district}
State: ${fullPayload.state}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second server timeout

      const geminiRes = await fetch(geminiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemPrompt}\n\n${userContent}` }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2,
          },
        }),
      });

      clearTimeout(timeoutId);

      if (!geminiRes.ok) {
        const fallback = buildFallbackResponse(
          fullPayload,
          `Gemini API request failed with status ${geminiRes.status}. Fallback activated.`
        );
        return NextResponse.json(fallback, { status: 200 });
      }

      const geminiJson = await geminiRes.json();
      const rawText = geminiJson?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        const fallback = buildFallbackResponse(
          fullPayload,
          "Gemini API returned empty text. Fallback activated."
        );
        return NextResponse.json(fallback, { status: 200 });
      }

      const parsed = JSON.parse(rawText);

      // Validate Gemini response schema
      if (
        !parsed.subject ||
        !parsed.applicationBody ||
        !Array.isArray(parsed.questions) ||
        parsed.questions.length < 3 ||
        parsed.questions.length > 5
      ) {
        const fallback = buildFallbackResponse(
          fullPayload,
          "Gemini output failed schema validation. Fallback activated."
        );
        return NextResponse.json(fallback, { status: 200 });
      }

      // Check for subjective questions
      const hasSubjectiveQuestion = parsed.questions.some((q: string) =>
        /why|reason|who is responsible|how come/i.test(q)
      );

      if (hasSubjectiveQuestion) {
        const fallback = buildFallbackResponse(
          fullPayload,
          "Gemini generated subjective question. Fallback activated."
        );
        return NextResponse.json(fallback, { status: 200 });
      }

      // Intersect response citations with allowlist
      const validCitations = Array.isArray(parsed.citationIds)
        ? parsed.citationIds.filter((id: string) => SERVER_SOURCE_ALLOWLIST.has(id))
        : safeCitationIds;

      const aiResponse: GenerateRtiResponse = {
        mode: "ai",
        subject: String(parsed.subject).trim(),
        applicationBody: String(parsed.applicationBody).trim(),
        questions: parsed.questions.map((q: string) => String(q).trim()),
        authority,
        citationIds: validCitations.length > 0 ? validCitations : safeCitationIds,
        validation: {
          schemaValid: true,
          citationsValid: true,
          questionCount: parsed.questions.length,
          applicantDataSentToAI: false,
        },
        warning: !authority.verified
          ? "Authority is not verified in Phase 1 registry; confirm PIO details before filing."
          : undefined,
      };

      return NextResponse.json(aiResponse, { status: 200 });
    } catch {
      // Timeout or JSON parse error -> Trigger Fallback Response
      const fallback = buildFallbackResponse(
        fullPayload,
        "Gemini request timeout or response parsing error. Fallback activated."
      );
      return NextResponse.json(fallback, { status: 200 });
    }
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error in RTI Engine." },
      { status: 500 }
    );
  }
}
