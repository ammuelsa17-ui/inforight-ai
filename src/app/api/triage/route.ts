import { NextRequest, NextResponse } from "next/server";
import { TriageRequest, TriageResponse } from "@/types/api";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as TriageRequest | null;

    if (!body || !body.problemDescription || typeof body.problemDescription !== "string") {
      return NextResponse.json(
        { error: "Invalid request. 'problemDescription' is required." },
        { status: 400 }
      );
    }

    const text = body.problemDescription.toLowerCase().trim();

    // Emergency / Criminal Safety Handling
    if (/suicide|self harm|physical assault|domestic violence|murder|kidnap|blood|medical emergency/i.test(text)) {
      const response: TriageResponse = {
        service: "unsupported",
        confidence: "high",
        explanation: "Emergency or criminal matter detected. Please contact national emergency helpline (112) or local emergency services immediately.",
        missingFields: [],
      };
      return NextResponse.json(response, { status: 200 });
    }

    // 1. RTI Drafting Classifier
    if (/road|pothole|trench|work order|measurement book|\bmb\b|repair|drain|municipal|corporation|rti|government record/i.test(text)) {
      const response: TriageResponse = {
        service: "rti",
        category: "civic_road",
        confidence: "high",
        explanation: "Your issue pertains to civic infrastructure or municipal works. We will guide you to request certified copies of official government records under Section 6(1) of the RTI Act 2005.",
        suggestedRoute: "/ask",
        missingFields: [],
      };
      return NextResponse.json(response, { status: 200 });
    }

    // 2. Rights Navigator — Consumer
    if (/refund|defective|laptop|mobile|e-commerce|flipkart|amazon|product|delivery|warranty|seller|service center/i.test(text)) {
      const response: TriageResponse = {
        service: "rights",
        category: "consumer",
        confidence: "high",
        explanation: "Your issue relates to consumer protection and defective product/refund denial. We will guide you through National Consumer Helpline (1915) & e-Jagriti escalation.",
        suggestedRoute: "/rights/consumer",
        missingFields: [],
      };
      return NextResponse.json(response, { status: 200 });
    }

    // 3. Rights Navigator — Tenant
    if (/tenant|landlord|rent|security deposit|eviction|lease|flat|house deposit|repairs|agreement/i.test(text)) {
      const response: TriageResponse = {
        service: "rights",
        category: "tenant",
        confidence: "high",
        explanation: "Your issue relates to residential tenancy and deposit recovery. We will guide you through State Rent Authority procedures and draft a representation letter.",
        suggestedRoute: "/rights/tenant",
        missingFields: [],
      };
      return NextResponse.json(response, { status: 200 });
    }

    // 4. Rights Navigator — Workplace
    if (/salary|wages|employer|company|resignation|termination|hr|unpaid|pf|gratuity|job/i.test(text)) {
      const response: TriageResponse = {
        service: "rights",
        category: "workplace",
        confidence: "high",
        explanation: "Your issue relates to workplace wage withholding or employment grievance. We will guide you through Labour Commissioner / SAMADHAN 2.0 conciliation procedures.",
        suggestedRoute: "/rights/workplace",
        missingFields: [],
      };
      return NextResponse.json(response, { status: 200 });
    }

    // 5. Scheme Eligibility Reader
    if (/scheme|scholarship|pension|welfare|stipend|financial assistance|pm kisan|pudhumai penn|subsidy/i.test(text)) {
      const response: TriageResponse = {
        service: "schemes",
        confidence: "high",
        explanation: "Your issue relates to government welfare scheme eligibility. We will evaluate your profile against deterministic myScheme reference rules.",
        suggestedRoute: "/schemes",
        missingFields: [],
      };
      return NextResponse.json(response, { status: 200 });
    }

    // Default fallback triage
    const response: TriageResponse = {
      service: "rights",
      category: "consumer",
      confidence: "medium",
      explanation: "We matched your request to Rights Navigation. You can explore procedural steps or select another module below.",
      suggestedRoute: "/rights",
      missingFields: [],
    };
    return NextResponse.json(response, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error in Triage Route." },
      { status: 500 }
    );
  }
}
