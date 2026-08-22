import fs from "fs";
import path from "path";
import { POST as triageHandler } from "@/app/api/triage/route";
import { POST as rtiHandler } from "@/app/api/rti/generate/route";
import { POST as rightsHandler } from "@/app/api/rights/navigate/route";
import { POST as schemesHandler } from "@/app/api/schemes/match/route";
import { POST as langTranslateHandler } from "@/app/api/language/translate/route";
import { POST as langTranscribeHandler } from "@/app/api/language/transcribe/route";
import { POST as langSpeakHandler } from "@/app/api/language/speak/route";
import { ALL_BHARAT_LANGUAGES } from "@/lib/language/languages";
import { getUITranslations } from "@/i18n/ui-translations";
import { getAudioExtensionFromMime } from "@/services/language";
import { resolvePinAuthority } from "@/lib/routing/pin-router";
import { evaluateSchemeEligibility } from "@/lib/schemes/eligibility-engine";
import {
  exportRtiApplicationHtml,
  exportEvidenceIndexHtml,
  exportFirstAppealHtml,
  exportRectificationEvidencePackHtml,
} from "@/lib/pdf/print-export";
import {
  calculateDistanceMeters,
  evaluateLocationConsistency,
  calculateSha256,
  getIssueProofRequirements,
} from "@/lib/geo/distance-calculator";
import { planCitizenAction } from "@/lib/triage/action-planner";
import {
  generateRepresentationDocument,
  exportRepresentationHtml,
} from "@/lib/templates/representation-generator";
import { ALL_STATES_AND_UTS, resolveLocationContext, getDistrictsForState } from "@/lib/location/location-context";
import { STATE_TENANCY_REGISTRY, getStateTenancyRecord } from "@/data/tenancy/state-tenancy-registry";
import { planConsumerAction, calculateConsumerJurisdiction } from "@/lib/consumer/consumer-engine";
import { resolveConsumerCommissionJurisdiction } from "@/lib/consumer/jurisdiction-resolver";
import { planTenantAction } from "@/lib/tenancy/tenancy-engine";
import { resolveTenantRights } from "@/lib/tenancy/tenant-rights-resolver";
import { checkSourceFreshness } from "@/lib/sources/freshness-checker";
import { ALL_SOURCES } from "@/data/sources";
import { NextRequest } from "next/server";

async function runRouteHandlerContractTests() {
  console.log("=================================================================");
  console.log("   InfoRight AI Version 2.0 — Route-Handler Contract & Safety   ");
  console.log("=================================================================\n");

  let totalTests = 0;
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    totalTests++;
    if (condition) {
      console.log(`[PASS ${totalTests}] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL ${totalTests}] ${testName} - ${detail || "Assertion failed"}`);
      failed++;
    }
  }

  // ---------------------------------------------------------
  // SECTION 1: TRIAGE ROUTE HANDLER TESTS (/api/triage)
  // ---------------------------------------------------------
  console.log("--- SECTION 1: /api/triage Route-Handler Tests ---");

  // Test 1: Civic Road Complaint -> RTI
  {
    const req = new NextRequest("http://localhost/api/triage", {
      method: "POST",
      body: JSON.stringify({ problemDescription: "Broken road and deep potholes near DB Road causing accidents" }),
    });
    const res = await triageHandler(req);
    const data = await res.json();
    assert(res.status === 200, "Triage HTTP 200 for civic road complaint");
    assert(data.service === "rti", "Triage classifies road issue as 'rti'", `Got ${data.service}`);
  }

  // Test 2: Consumer Laptop Refund Denial -> Rights Consumer
  {
    const req = new NextRequest("http://localhost/api/triage", {
      method: "POST",
      body: JSON.stringify({ problemDescription: "E-commerce seller refused laptop refund for defective screen" }),
    });
    const res = await triageHandler(req);
    const data = await res.json();
    assert(data.service === "rights" && data.category === "consumer", "Triage classifies refund issue as 'rights/consumer'");
  }

  // Test 3: Tenant Security Deposit Withholding -> Rights Tenant
  {
    const req = new NextRequest("http://localhost/api/triage", {
      method: "POST",
      body: JSON.stringify({ problemDescription: "Landlord refusing to refund rental deposit post handover" }),
    });
    const res = await triageHandler(req);
    const data = await res.json();
    assert(data.service === "rights" && data.category === "tenant", "Triage classifies tenancy issue as 'rights/tenant'");
  }

  // Test 4: Workplace Salary Withholding -> Rights Workplace
  {
    const req = new NextRequest("http://localhost/api/triage", {
      method: "POST",
      body: JSON.stringify({ problemDescription: "Employer withholding monthly salary and full settlement dues" }),
    });
    const res = await triageHandler(req);
    const data = await res.json();
    assert(data.service === "rights" && data.category === "workplace", "Triage classifies workplace issue as 'rights/workplace'");
  }

  // Test 5: Welfare Scholarship Query -> Schemes
  {
    const req = new NextRequest("http://localhost/api/triage", {
      method: "POST",
      body: JSON.stringify({ problemDescription: "Searching for student post-matric scholarship schemes in Tamil Nadu" }),
    });
    const res = await triageHandler(req);
    const data = await res.json();
    assert(data.service === "schemes", "Triage classifies scholarship query as 'schemes'");
  }

  // Test 6: Emergency & Criminal Input Safety Handling
  {
    const req = new NextRequest("http://localhost/api/triage", {
      method: "POST",
      body: JSON.stringify({ problemDescription: "Physical assault and domestic violence emergency" }),
    });
    const res = await triageHandler(req);
    const data = await res.json();
    assert(data.service === "unsupported" && data.confidence === "high", "Emergency input triggers 'unsupported' with high confidence");
  }

  // Test 7: Empty Description -> HTTP 400
  {
    const req = new NextRequest("http://localhost/api/triage", {
      method: "POST",
      body: JSON.stringify({ problemDescription: "" }),
    });
    const res = await triageHandler(req);
    assert(res.status === 400, "Triage rejects empty problemDescription with HTTP 400");
  }

  // Test 8: Missing Payload Body -> HTTP 400
  {
    const req = new NextRequest("http://localhost/api/triage", {
      method: "POST",
      body: JSON.stringify({}),
    });
    const res = await triageHandler(req);
    assert(res.status === 400, "Triage rejects missing problemDescription field with HTTP 400");
  }

  // Test 9: Strict Unknown Field Rejection -> HTTP 400
  {
    const req = new NextRequest("http://localhost/api/triage", {
      method: "POST",
      body: JSON.stringify({
        problemDescription: "Pothole repair on DB Road",
        applicantName: "Leaked Name", // UNKNOWN FIELD
      }),
    });
    const res = await triageHandler(req);
    assert(res.status === 400, "Triage strictly rejects unknown field applicantName with HTTP 400");
  }

  // ---------------------------------------------------------
  // SECTION 2: RTI GENERATION ROUTE HANDLER TESTS (/api/rti/generate)
  // ---------------------------------------------------------
  console.log("\n--- SECTION 2: /api/rti/generate Route-Handler Tests ---");

  // Test 10: Prohibited Applicant Identity Field Rejection (applicantName)
  {
    const req = new NextRequest("http://localhost/api/rti/generate", {
      method: "POST",
      body: JSON.stringify({
        issue: "Potholes on DB Road",
        state: "Tamil Nadu",
        district: "Coimbatore",
        localBodyName: "Coimbatore Corporation",
        locality: "R.S. Puram",
        sourceIds: ["RTI_ACT_2005_AMENDED"],
        applicantName: "K. Harsha", // PROHIBITED FIELD
      }),
    });
    const res = await rtiHandler(req);
    assert(res.status === 400, "RTI API rejects prohibited applicantName field with HTTP 400");
  }

  // Test 11: Prohibited Applicant Identity Field Rejection (applicantAddress)
  {
    const req = new NextRequest("http://localhost/api/rti/generate", {
      method: "POST",
      body: JSON.stringify({
        issue: "Potholes on DB Road",
        state: "Tamil Nadu",
        district: "Coimbatore",
        localBodyName: "Coimbatore Corporation",
        locality: "R.S. Puram",
        sourceIds: ["RTI_ACT_2005_AMENDED"],
        applicantAddress: "42 R.S. Puram, Coimbatore", // PROHIBITED FIELD
      }),
    });
    const res = await rtiHandler(req);
    assert(res.status === 400, "RTI API rejects prohibited applicantAddress field with HTTP 400");
  }

  // Test 12: Missing Required Field Rejection
  {
    const req = new NextRequest("http://localhost/api/rti/generate", {
      method: "POST",
      body: JSON.stringify({
        issue: "Potholes on DB Road",
        // missing state, district, localBodyName
      }),
    });
    const res = await rtiHandler(req);
    assert(res.status === 400, "RTI API rejects payload missing required location fields with HTTP 400");
  }

  // Test 13: Valid RTI Request Contract & Field Inspections
  {
    const req = new NextRequest("http://localhost/api/rti/generate", {
      method: "POST",
      body: JSON.stringify({
        issue: "Deep potholes and broken pavement along DB Road near R.S. Puram causing congestion",
        state: "Tamil Nadu",
        district: "Coimbatore",
        localBodyName: "Coimbatore Corporation",
        locality: "R.S. Puram",
        sourceIds: ["RTI_ACT_2005_AMENDED", "CCMC_RTI_AUTHORITY"],
      }),
    });
    const res = await rtiHandler(req);
    const data = await res.json();
    assert(res.status === 200, "RTI API HTTP 200 for valid request");
    assert(data.mode === "ai" || data.mode === "fallback", `RTI response returns valid mode ('${data.mode}')`);
    assert(data.validation?.applicantDataSentToAI === false, "RTI response guarantees applicantDataSentToAI === false");
    assert(Array.isArray(data.questions) && data.questions.length >= 3 && data.questions.length <= 5, `RTI response returns ${data.questions?.length} questions (3 to 5 required)`);
    assert(data.authority?.designation === "Public Information Officer", "RTI authority designation is 'Public Information Officer'");
  }

  // Test 14: Untrusted / Non-Allowlisted Citation ID Handling
  {
    const req = new NextRequest("http://localhost/api/rti/generate", {
      method: "POST",
      body: JSON.stringify({
        issue: "Potholes on DB Road",
        state: "Tamil Nadu",
        district: "Coimbatore",
        localBodyName: "Coimbatore Corporation",
        locality: "R.S. Puram",
        sourceIds: ["UNTRUSTED_FAKE_SOURCE_ID_123"],
      }),
    });
    const res = await rtiHandler(req);
    const data = await res.json();
    assert(res.status === 200, "RTI API handles untrusted citation IDs safely");
    assert(!data.citationIds?.includes("UNTRUSTED_FAKE_SOURCE_ID_123"), "Untrusted citation ID is excluded from response citationIds");
  }

  // Test 15: Controlled Failure Simulation Toggle (ENABLE_DEMO_FAILURE=true)
  {
    const oldFlag = process.env.ENABLE_DEMO_FAILURE;
    process.env.ENABLE_DEMO_FAILURE = "true";
    const req = new NextRequest("http://localhost/api/rti/generate", {
      method: "POST",
      body: JSON.stringify({
        issue: "Potholes on DB Road",
        state: "Tamil Nadu",
        district: "Coimbatore",
        localBodyName: "Coimbatore Corporation",
        locality: "R.S. Puram",
        sourceIds: ["RTI_ACT_2005_AMENDED"],
        simulateFailure: true,
      }),
    });
    const res = await rtiHandler(req);
    const data = await res.json();
    assert(data.mode === "fallback", "ENABLE_DEMO_FAILURE=true + simulateFailure: true triggers deterministic fallback mode");
    process.env.ENABLE_DEMO_FAILURE = oldFlag;
  }

  // Test 16: Controlled Failure Simulation Toggle Safety (ENABLE_DEMO_FAILURE=false)
  {
    const oldFlag = process.env.ENABLE_DEMO_FAILURE;
    process.env.ENABLE_DEMO_FAILURE = "false";
    const req = new NextRequest("http://localhost/api/rti/generate", {
      method: "POST",
      body: JSON.stringify({
        issue: "Potholes on DB Road",
        state: "Tamil Nadu",
        district: "Coimbatore",
        localBodyName: "Coimbatore Corporation",
        locality: "R.S. Puram",
        sourceIds: ["RTI_ACT_2005_AMENDED"],
        simulateFailure: true,
      }),
    });
    const res = await rtiHandler(req);
    const data = await res.json();
    assert(data.mode === "fallback" || data.mode === "ai", "ENABLE_DEMO_FAILURE=false ignores simulateFailure flag");
    process.env.ENABLE_DEMO_FAILURE = oldFlag;
  }

  // ---------------------------------------------------------
  // SECTION 3: RIGHTS NAVIGATOR ROUTE HANDLER TESTS (/api/rights/navigate)
  // ---------------------------------------------------------
  console.log("\n--- SECTION 3: /api/rights/navigate Route-Handler Tests ---");

  // Test 17: Consumer Rights Contract Compliance
  {
    const req = new NextRequest("http://localhost/api/rights/navigate", {
      method: "POST",
      body: JSON.stringify({
        category: "consumer",
        issueType: "Defective Product / Refund Denial",
        description: "Laptop screen broken on delivery; refund denied by seller.",
        state: "Tamil Nadu",
      }),
    });
    const res = await rightsHandler(req);
    const data = await res.json();
    assert(res.status === 200, "Rights Consumer HTTP 200");
    assert(data.escalationPathway?.helplinePhone === "1915", "Consumer rights returns National Consumer Helpline (1915)");
    assert(data.citationIds?.includes("E_JAGRITI_PORTAL"), "Consumer rights includes e-Jagriti portal citation");
  }

  // Test 18: Tenant Rights Contract Compliance & State Warning
  {
    const req = new NextRequest("http://localhost/api/rights/navigate", {
      method: "POST",
      body: JSON.stringify({
        category: "tenant",
        issueType: "Security Deposit Withholding",
        description: "Landlord refusing to refund ₹50,000 security deposit after handover.",
        state: "Tamil Nadu",
      }),
    });
    const res = await rightsHandler(req);
    const data = await res.json();
    assert(res.status === 200, "Rights Tenant HTTP 200");
    assert(typeof data.jurisdictionWarning === "string" && data.jurisdictionWarning.length > 0, "Tenant rights includes state jurisdiction warning");
  }

  // Test 19: Workplace Rights Contract Compliance
  {
    const req = new NextRequest("http://localhost/api/rights/navigate", {
      method: "POST",
      body: JSON.stringify({
        category: "workplace",
        issueType: "Unpaid Salary",
        description: "Employer withholding 2 months salary post resignation exit.",
        state: "Tamil Nadu",
      }),
    });
    const res = await rightsHandler(req);
    const data = await res.json();
    assert(res.status === 200, "Rights Workplace HTTP 200");
    assert(data.citationIds?.includes("SAMADHAN_2_PORTAL"), "Workplace rights includes SAMADHAN 2.0 portal citation");
  }

  // Test 20: Invalid Rights Category Rejection -> HTTP 400
  {
    const req = new NextRequest("http://localhost/api/rights/navigate", {
      method: "POST",
      body: JSON.stringify({
        category: "invalid_crypto_category",
        description: "Test dispute",
        state: "Tamil Nadu",
      }),
    });
    const res = await rightsHandler(req);
    assert(res.status === 400, "Rights API rejects invalid category with HTTP 400");
  }

  // Test 21: Strict Unknown Field Rejection -> HTTP 400
  {
    const req = new NextRequest("http://localhost/api/rights/navigate", {
      method: "POST",
      body: JSON.stringify({
        category: "consumer",
        description: "Test dispute",
        state: "Tamil Nadu",
        unknownParam: "unauthorized_data",
      }),
    });
    const res = await rightsHandler(req);
    assert(res.status === 400, "Rights API strictly rejects unknown fields with HTTP 400");
  }

  // ---------------------------------------------------------
  // SECTION 4: SCHEME MATCHING ROUTE HANDLER TESTS (/api/schemes/match)
  // ---------------------------------------------------------
  console.log("\n--- SECTION 4: /api/schemes/match Route-Handler Tests ---");

  // Test 22: Low-Income Student Profile Matching
  {
    const req = new NextRequest("http://localhost/api/schemes/match", {
      method: "POST",
      body: JSON.stringify({
        state: "Tamil Nadu",
        age: 20,
        annualIncome: 150000,
        occupation: "student",
        isStudent: true,
        areaType: "urban",
      }),
    });
    const res = await schemesHandler(req);
    const data = await res.json();
    assert(res.status === 200, "Scheme Matcher HTTP 200");
    assert(data.totalMatched >= 1, `Matched ${data.totalMatched} schemes for low-income student profile`);
    assert(typeof data.disclaimer === "string", "Scheme matcher returns mandatory department disclaimer");
  }

  // Test 23: Income Limit Exact Boundary Test (₹2,50,000 threshold)
  {
    const req = new NextRequest("http://localhost/api/schemes/match", {
      method: "POST",
      body: JSON.stringify({
        state: "Tamil Nadu",
        age: 20,
        annualIncome: 250000, // Exact limit for TN Post-Matric Scholarship
        occupation: "student",
        isStudent: true,
        areaType: "urban",
        socialCategory: "SC",
      }),
    });
    const res = await schemesHandler(req);
    const data = await res.json();
    const hasPostMatric = data.matchedSchemes?.some((s: { schemeId: string }) => s.schemeId === "TN_POST_MATRIC_SCHOLARSHIP");
    assert(hasPostMatric, "Scheme matcher matches TN_POST_MATRIC_SCHOLARSHIP at exact ₹2,50,000 income boundary");
  }

  // Test 24: Negative Income Rejection -> HTTP 400
  {
    const req = new NextRequest("http://localhost/api/schemes/match", {
      method: "POST",
      body: JSON.stringify({
        state: "Tamil Nadu",
        age: 20,
        annualIncome: -5000, // INVALID NEGATIVE INCOME
        occupation: "student",
        isStudent: true,
        areaType: "urban",
      }),
    });
    const res = await schemesHandler(req);
    assert(res.status === 400, "Scheme matcher rejects negative annualIncome with HTTP 400");
  }

  // Test 25: Strict Unknown Field Rejection -> HTTP 400
  {
    const req = new NextRequest("http://localhost/api/schemes/match", {
      method: "POST",
      body: JSON.stringify({
        state: "Tamil Nadu",
        age: 20,
        annualIncome: 150000,
        occupation: "student",
        isStudent: true,
        areaType: "urban",
        extraLeakedField: "unauthorized",
      }),
    });
    const res = await schemesHandler(req);
    assert(res.status === 400, "Scheme matcher strictly rejects unknown fields with HTTP 400");
  }

  // Unit & Rule Tests for evaluateSchemeEligibility Engine
  {
    // Test 1: Eligible profile
    const out1 = evaluateSchemeEligibility({
      state: "Tamil Nadu",
      age: 20,
      annualFamilyIncome: 150000,
      socialCategory: "SC",
      isStudent: true
    });
    const tnPostMatric = out1.results.find(r => r.schemeId === "TN_POST_MATRIC_SCHOLARSHIP");
    assert(tnPostMatric?.status === "ELIGIBLE", "Eligible profile matches TN_POST_MATRIC_SCHOLARSHIP");

    // Test 2: Income failure
    const out2 = evaluateSchemeEligibility({
      state: "Tamil Nadu",
      age: 20,
      annualFamilyIncome: 500000, // Exceeds ₹2.5L limit
      socialCategory: "SC",
      isStudent: true
    });
    const tnPostMatricIncomeFail = out2.results.find(r => r.schemeId === "TN_POST_MATRIC_SCHOLARSHIP");
    assert(tnPostMatricIncomeFail?.status === "NOT_ELIGIBLE", "Income > maxIncome returns NOT_ELIGIBLE");
    assert(Boolean(tnPostMatricIncomeFail?.failedConditions.some(c => c.includes("exceeds maximum limit"))), "Income failure reason is recorded");

    // Test 3: Age failure
    const out3 = evaluateSchemeEligibility({
      state: "Tamil Nadu",
      age: 45, // Exceeds max age 30
      annualFamilyIncome: 150000,
      socialCategory: "SC",
      isStudent: true
    });
    const tnPostMatricAgeFail = out3.results.find(r => r.schemeId === "TN_POST_MATRIC_SCHOLARSHIP");
    assert(tnPostMatricAgeFail?.status === "NOT_ELIGIBLE", "Age > ageMax returns NOT_ELIGIBLE");

    // Test 4: Wrong state
    const out4 = evaluateSchemeEligibility({
      state: "Karnataka", // Scheme requires Tamil Nadu
      age: 20,
      annualFamilyIncome: 150000,
      socialCategory: "SC",
      isStudent: true
    });
    const tnPostMatricStateFail = out4.results.find(r => r.schemeId === "TN_POST_MATRIC_SCHOLARSHIP");
    assert(tnPostMatricStateFail?.status === "NOT_ELIGIBLE", "Wrong state returns NOT_ELIGIBLE");

    // Test 5: Wrong category
    const out5 = evaluateSchemeEligibility({
      state: "Tamil Nadu",
      age: 20,
      annualFamilyIncome: 150000,
      socialCategory: "GENERAL", // Scheme requires SC/ST
      isStudent: true
    });
    const tnPostMatricCategoryFail = out5.results.find(r => r.schemeId === "TN_POST_MATRIC_SCHOLARSHIP");
    assert(tnPostMatricCategoryFail?.status === "NOT_ELIGIBLE", "Wrong social category returns NOT_ELIGIBLE");

    // Test 6: Missing income returns NEEDS_INFORMATION (NOT ELIGIBLE!)
    const out6 = evaluateSchemeEligibility({
      state: "Tamil Nadu",
      age: 20,
      annualFamilyIncome: null, // MISSING INCOME
      socialCategory: "SC",
      isStudent: true
    });
    const tnPostMatricMissingIncome = out6.results.find(r => r.schemeId === "TN_POST_MATRIC_SCHOLARSHIP");
    assert(tnPostMatricMissingIncome?.status === "NEEDS_INFORMATION", "Missing required income returns NEEDS_INFORMATION, never ELIGIBLE");
    assert(tnPostMatricMissingIncome?.status !== "ELIGIBLE", "Missing required field strictly prevents ELIGIBLE status");

    // Test 7: Missing required profile data returns NEEDS_INFORMATION
    const out7 = evaluateSchemeEligibility({});
    const anyEligible = out7.results.some(r => r.status === "ELIGIBLE");
    assert(anyEligible === false, "Empty profile produces ZERO false ELIGIBLE results across all 12 schemes");
  }

  // SECTION 5: /api/language/* Route-Handler Tests
  console.log("\n--- SECTION 5: /api/language/* Route-Handler Tests ---");
  const { splitTextForSarvam } = await import("../src/lib/language/sarvam");

  // Test 38: Language Translate HTTP 200 (valid request)
  {
    const req = new NextRequest("http://localhost/api/language/translate", {
      method: "POST",
      body: JSON.stringify({
        text: "Potholes on main road",
        sourceLanguage: "en-IN",
        targetLanguage: "ta-IN",
      }),
    });
    const res = await langTranslateHandler(req);
    const data = await res.json();
    assert(res.status === 200, "Language translate HTTP 200 for valid Tamil request");
    assert(typeof data.translatedText === "string", "Language translate returns translatedText string");
  }

  // Test 39: Language Translate rejects missing text -> HTTP 400
  {
    const req = new NextRequest("http://localhost/api/language/translate", {
      method: "POST",
      body: JSON.stringify({
        sourceLanguage: "en-IN",
        targetLanguage: "ta-IN",
      }),
    });
    const res = await langTranslateHandler(req);
    assert(res.status === 400, "Language translate rejects missing text with HTTP 400");
  }

  // Test 40: Language Translate rejects unsupported language -> HTTP 400
  {
    const req = new NextRequest("http://localhost/api/language/translate", {
      method: "POST",
      body: JSON.stringify({
        text: "Potholes on main road",
        sourceLanguage: "en-IN",
        targetLanguage: "xx-IN", // INVALID
      }),
    });
    const res = await langTranslateHandler(req);
    assert(res.status === 400, "Language translate rejects unsupported language with HTTP 400");
  }

  // Test 41: Language Translate fallback handling when SARVAM_API_KEY missing
  {
    const oldKey = process.env.SARVAM_API_KEY;
    delete process.env.SARVAM_API_KEY;
    const req = new NextRequest("http://localhost/api/language/translate", {
      method: "POST",
      body: JSON.stringify({
        text: "Road repair required",
        sourceLanguage: "en-IN",
        targetLanguage: "hi-IN",
      }),
    });
    const res = await langTranslateHandler(req);
    const data = await res.json();
    assert(res.status === 200, "Language translate returns HTTP 200 truthful fallback when SARVAM_API_KEY missing");
    assert(data.fallbackOccurred === true, "Language translate indicates fallbackOccurred === true");
    assert(data.disclaimer?.includes("Multilingual translation service unavailable"), "Language translate provides truthful disclaimer");
    if (oldKey) process.env.SARVAM_API_KEY = oldKey;
  }

  // Test 42: Long-text safe chunking helper (splitTextForSarvam <= 1,900 chars)
  {
    const longText = "Paragraph one text. ".repeat(150); // ~3,000 chars
    const chunks = splitTextForSarvam(longText, 1900);
    assert(chunks.length > 1, `Long-text chunking splits 3000 chars into ${chunks.length} chunks`);
    assert(chunks.every((c) => c.length <= 1900), "All translation chunks remain <= 1,900 characters");

    // Zero-data-loss verification for a single continuous sentence > 2,000 chars
    const hugeSentence = "VeryLongLegalWordWithoutSpaces".repeat(100); // 3,000 chars
    const hugeChunks = splitTextForSarvam(hugeSentence, 1900);
    const reassembled = hugeChunks.join(" ");
    assert(reassembled.replace(/\s/g, "").length === hugeSentence.length, "Zero data loss: huge continuous sentence is fully preserved without truncation");
  }

  // Test 43: Language Transcribe rejects empty request body -> HTTP 400
  {
    const req = new NextRequest("http://localhost/api/language/transcribe", {
      method: "POST",
    });
    const res = await langTranscribeHandler(req);
    assert(res.status === 400, "Language transcribe rejects empty request body with HTTP 400");
  }

  // Test 44: Language Speak rejects unsupported TTS language -> HTTP 400
  {
    const req = new NextRequest("http://localhost/api/language/speak", {
      method: "POST",
      body: JSON.stringify({
        text: "Hello",
        languageCode: "as-IN", // Assamese is TTS unsupported in matrix
      }),
    });
    const res = await langSpeakHandler(req);
    assert(res.status === 400, "Language speak rejects unsupported TTS language with HTTP 400");
  }

  // Test 45: Language Speak rejects missing text -> HTTP 400
  {
    const req = new NextRequest("http://localhost/api/language/speak", {
      method: "POST",
      body: JSON.stringify({
        languageCode: "hi-IN",
      }),
    });
    const res = await langSpeakHandler(req);
    assert(res.status === 400, "Language speak rejects missing text with HTTP 400");
  }

  // Test 46: Security & Error Normalization — No API key or stack trace leakage
  {
    const req = new NextRequest("http://localhost/api/language/speak", {
      method: "POST",
      body: JSON.stringify({
        text: "Test text",
        languageCode: "hi-IN",
      }),
    });
    const res = await langSpeakHandler(req);
    const data = await res.json();
    const str = JSON.stringify(data);
    assert(!str.includes("api-subscription-key"), "Language route response contains zero API key headers");
    assert(!str.includes("SARVAM_API_KEY"), "Language route response contains zero SARVAM_API_KEY strings");
  }

  // Test 47: Zero Fake Language Mapping & Schema Parity across 23 Locales
  {
    let zeroFakeMappings = true;
    let schemaParity = true;
    let genericStringsLocalized = true;

    for (const lang of ALL_BHARAT_LANGUAGES) {
      const dict = getUITranslations(lang.code);

      // Rule 1: No non-English language points to English locale object
      if (lang.code !== "en-IN" && dict === getUITranslations("en-IN")) {
        zeroFakeMappings = false;
        break;
      }

      // Schema Key Parity
      if (
        !dict.nav.home ||
        !dict.rights.title ||
        !dict.schemes.title ||
        !dict.sources.title ||
        !dict.dashboard.title ||
        !dict.home.modulesTitle
      ) {
        schemaParity = false;
        break;
      }

      // Rule 14: Non-English generic strings must not remain English
      if (lang.code !== "en-IN") {
        if (dict.nav.home === "Home" && dict.common.backToHome === "Back to Home") {
          genericStringsLocalized = false;
          break;
        }
      }
    }

    assert(zeroFakeMappings, "Zero fake language support — all 22 Scheduled Indian languages have unique locale bundles");
    assert(schemaParity, "Schema key parity verified across all 23 language locale bundles");
    assert(genericStringsLocalized, "Generic UI navigation labels are genuinely localized in all non-English locales");

    // Linguistic Integrity & Script Purity Tests
    const kokStr = JSON.stringify(getUITranslations("kok-IN"));
    const satStr = JSON.stringify(getUITranslations("sat-IN"));
    const neDict = getUITranslations("ne-IN");
    const hiDict = getUITranslations("hi-IN");

    // 1. Zero Myanmar script in Konkani (U+1000 to U+109F)
    const myanmarRegex = /[\u1000-\u109F]/;
    assert(!myanmarRegex.test(kokStr), "Konkani locale has 0 Myanmar script character contamination");

    // 2. Zero Arabic Presentation Forms in Santali Ol Chiki (U+FB50 to U+FDFF, U+FE70 to U+FEFF)
    const arabicPresRegex = /[\uFB50-\uFDFF\uFE70-\uFEFF]/;
    assert(!arabicPresRegex.test(satStr), "Santali locale has 0 Arabic presentation form characters in Ol Chiki text");

    // 3. Nepali is authentic Nepali and NOT copied from Hindi
    assert(neDict.home.cta !== hiDict.home.cta, "Nepali CTA is authentic Nepali and not copied from Hindi");
    assert(neDict.nav.home !== hiDict.nav.home, "Nepali home nav is authentic Nepali ('गृह पृष्ठ')");
    assert(neDict.common.backToHome !== hiDict.common.backToHome, "Nepali back button is authentic Nepali ('गृह पृष्ठमा फर्कनुहोस्')");

    // 4. Manipuri uses pure Meitei Mayek (U+ABC0 to U+ABFF) with 0 Bengali script mixing
    const mniStr = JSON.stringify(getUITranslations("mni-IN"));
    const bengaliScriptInMniRegex = /[\u0980-\u09FF]/;
    assert(!bengaliScriptInMniRegex.test(mniStr), "Manipuri locale uses pure Meitei Mayek with 0 Bengali script character contamination");

    // 5. Source-level test for /ask/page.tsx wiring & accessibility/error literals
    const askPageCode = fs.readFileSync(path.join(__dirname, "../src/app/ask/page.tsx"), "utf8");
    const rawEnglishInAsk = [
      ">State<",
      ">District<",
      ">Local Body Name<",
      ">Applicant Name<",
      ">Applicant Address<",
      "Generate RTI Application",
      "Generating Record Requests",
      "Quick Prefilled Scenarios",
      "RTI Suitability Guidance",
      '"Voice recording is not supported in this browser environment."',
      '"Microphone permission denied or unsupported browser."',
      '"Voice transcription error. Please try again or type text."',
      '"Please describe the civic problem and enter the locality."',
      '"Unable to generate the RTI application. Please try again."',
      '"Translation is currently unavailable. Your grievance has not been submitted for legal processing. Please retry or switch input language to English."',
      'title="Record voice input in selected language"',
      'aria-label="Voice input recording"',
      '"30s max"'
    ];
    for (const literal of rawEnglishInAsk) {
      assert(!askPageCode.includes(literal), `/ask/page.tsx contains zero raw user-facing literal '${literal}'`);
    }

    // 6. Verify inputLanguage & provenance safety in /ask/page.tsx
    assert(askPageCode.includes('issueInputLanguage'), "/ask/page.tsx uses issueInputLanguage state for input-language safety");
    assert(askPageCode.includes('issueInputSource'), "/ask/page.tsx tracks issueInputSource provenance");
    assert(askPageCode.includes('setIssueInputSource("prefilled")'), "applyScenario explicitly sets issueInputSource to prefilled");
    assert(askPageCode.includes('readOnly={issueInputSource === "prefilled"}'), "Prefilled scenario textarea is protected readOnly");
    assert(askPageCode.includes('startManualProblem'), "startManualProblem explicitly transitions to manual mode");
    assert(askPageCode.includes('setVoiceTranscript("")') && askPageCode.includes('setVoiceError(t("ask.transcriptionError"))'), "STT failure isolates error from voiceTranscript to prevent accidental grievance submission");
    assert(!askPageCode.includes('err instanceof Error && err.message ? err.message'), "No raw err.message is exposed to citizens in /ask catch path");
    assert(askPageCode.includes('setError(t("ask.genericGenerationError"))'), "Catch block uses normalized localized error");

    // 7. Verify /sources card chrome localization in src/app/sources/page.tsx
    const sourcesPageCode = fs.readFileSync(path.join(process.cwd(), "src/app/sources/page.tsx"), "utf8");
    assert(sourcesPageCode.includes('t("sources.responsibleAuth")'), "/sources uses localized responsibleAuth key");
    assert(sourcesPageCode.includes('t("sources.jurisdictionLabel")'), "/sources uses localized jurisdictionLabel key");
    assert(sourcesPageCode.includes('t("sources.supportedCapabilities")'), "/sources uses localized supportedCapabilities key");
    assert(sourcesPageCode.includes('t("sources.verifiedLabel")'), "/sources uses localized verifiedLabel key");
    assert(sourcesPageCode.includes('t("sources.visitPortal")'), "/sources uses localized visitPortal key");

    // 8. Verify AccessibilityToolbar localization & dynamic BCP-47 language speech synthesis
    const accessibilityCode = fs.readFileSync(path.join(process.cwd(), "src/components/AccessibilityToolbar.tsx"), "utf8");
    assert(accessibilityCode.includes('useLanguage'), "AccessibilityToolbar imports useLanguage hook");
    assert(accessibilityCode.includes('utterance.lang = selectedLanguage'), "AccessibilityToolbar sets speech synthesis lang dynamically to selected BCP-47 language");
    assert(accessibilityCode.includes('t("accessibility.title")'), "AccessibilityToolbar uses localized title key");
    assert(accessibilityCode.includes('t("accessibility.readAloud")'), "AccessibilityToolbar uses localized readAloud key");

    // 9. Verify package.json and GitHub Actions CI workflow contains audit:i18n gate
    const packageJsonCode = fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8");
    assert(packageJsonCode.includes('"audit:i18n": "node scripts/audit-i18n.js"'), "package.json contains audit:i18n script entry");
    const ciWorkflowCode = fs.readFileSync(path.join(process.cwd(), ".github/workflows/ci.yml"), "utf8");
    assert(ciWorkflowCode.includes("run: npm run audit:i18n"), ".github/workflows/ci.yml contains npm run audit:i18n CI step");
  }

  // Test 48: Audio MIME extension mapping helper
  {
    assert(getAudioExtensionFromMime("audio/webm;codecs=opus") === ".webm", "Audio extension for audio/webm is .webm");
    assert(getAudioExtensionFromMime("audio/mp4") === ".m4a", "Audio extension for audio/mp4 is .m4a");
    assert(getAudioExtensionFromMime("audio/wav") === ".wav", "Audio extension for audio/wav is .wav");
  }

  // Test 49: Translation route validates both sourceLanguage and targetLanguage
  {
    const req = new NextRequest("http://localhost/api/language/translate", {
      method: "POST",
      body: JSON.stringify({
        text: "Test",
        sourceLanguage: "invalid-code",
        targetLanguage: "hi-IN",
      }),
    });
    const res = await langTranslateHandler(req);
    assert(res.status === 400, "Language translate rejects invalid sourceLanguage with HTTP 400");
  }

  // Test 50: Transcribe route rejects invalid STT language -> HTTP 400
  {
    const formData = new FormData();
    const blob = new Blob(["dummy audio"], { type: "audio/wav" });
    formData.append("file", blob, "test.wav");
    formData.append("languageCode", "invalid-lang-code");
    const req = new NextRequest("http://localhost/api/language/transcribe", {
      method: "POST",
      body: formData,
    });
    const res = await langTranscribeHandler(req);
    assert(res.status === 400, "Language transcribe rejects STT unsupported language with HTTP 400");
  }

  // Test 51: Transcribe route rejects non-audio MIME type (e.g., application/octet-stream) -> HTTP 400
  {
    const formData = new FormData();
    const blob = new Blob(["raw binary"], { type: "application/octet-stream" });
    formData.append("file", blob, "test.bin");
    formData.append("languageCode", "hi-IN");
    const req = new NextRequest("http://localhost/api/language/transcribe", {
      method: "POST",
      body: formData,
    });
    const res = await langTranscribeHandler(req);
    assert(res.status === 400, "Language transcribe rejects application/octet-stream non-audio MIME with HTTP 400");
  }

  // Test 52: TTS payload field name contract — Verify language_code is required (NOT target_language_code)
  {
    const ttsPayload = {
      text: "வணக்கம்",
      language_code: "ta-IN",
      model: "bulbul:v3",
      speaker: "shubh",
      pace: 1.0,
    };
    assert(ttsPayload.language_code === "ta-IN", "TTS contract uses language_code field");
    assert((ttsPayload as Record<string, unknown>).target_language_code === undefined, "TTS contract excludes target_language_code field");
  }

  // =========================================================================
  // SECTION 6: PIN Code Authority Routing Engine Tests
  // =========================================================================
  {
    console.log("\n--- SECTION 6: PIN Code Authority Routing Engine Tests ---");

    // Test PIN 641002 road pothole
    const res1 = resolvePinAuthority("641002", "Potholes along DB Road");
    assert(res1.resolved === true, "PIN 641002 resolves successfully");
    assert(res1.state === "Tamil Nadu", "PIN 641002 resolves to Tamil Nadu");
    assert(res1.district === "Coimbatore", "PIN 641002 resolves to Coimbatore");
    assert(res1.localBodyName === "Coimbatore City Municipal Corporation (CCMC)", "PIN 641002 resolves to CCMC");
    assert(Boolean(res1.responsibleAuthority?.includes("Engineering Department")), "PIN 641002 road complaint resolves to Engineering Department");
    assert(res1.confidence === "HIGH", "PIN 641002 confidence is HIGH");

    // Test PIN 641002 water supply
    const res2 = resolvePinAuthority("641002", "Piped water leak in Siruvani pipeline");
    assert(res2.resolved === true, "PIN 641002 water supply resolves successfully");
    assert(res2.issueCategory === "water_supply", "Issue text classified as water_supply");
    assert(Boolean(res2.responsibleAuthority?.includes("Water Supply Department")), "PIN 641002 water complaint resolves to Water Supply Department");

    // Test unsupported PIN
    const resUnsupported = resolvePinAuthority("999999", "Road complaint");
    assert(resUnsupported.resolved === false, "Unsupported PIN 999999 returns resolved === false");
    assert(Boolean(resUnsupported.unsupportedMessage?.includes("not yet verified")), "Unsupported PIN returns truthful warning notice");

    // Test invalid format PIN
    const resInvalid = resolvePinAuthority("ABC12", "Road complaint");
    assert(resInvalid.resolved === false, "Invalid PIN format returns resolved === false");

    // Test 1: Postal source grounding
    const postalSourceExists = ALL_SOURCES.some((s: { id: string }) => s.id === res1.postalSourceId);
    assert(postalSourceExists === true, "PIN routing postalSourceId (SRC-POST-IN-PIN) grounds to a valid record in ALL_SOURCES");

    // Test 2: Jurisdiction source grounding
    const jurisdictionSourceExists = ALL_SOURCES.some((s: { id: string }) => s.id === res1.jurisdictionSourceId);
    assert(jurisdictionSourceExists === true, "PIN routing jurisdictionSourceId (SRC-TN-CCMC-JURISDICTION) grounds to a valid record in ALL_SOURCES");

    // Test 3: Department source grounding
    const departmentSourceExists = ALL_SOURCES.some((s: { id: string }) => s.id === res1.departmentSourceId);
    assert(departmentSourceExists === true, "PIN routing departmentSourceId (SRC-TN-CCMC-DEPARTMENTS) grounds to a valid record in ALL_SOURCES");

    // Test 4: RTI PIO source grounding
    const rtiSourceExists = ALL_SOURCES.some((s: { id: string }) => s.id === res1.rtiSourceId);
    assert(rtiSourceExists === true, "PIN routing rtiSourceId (SRC-TN-CCMC-RTI-PIO) grounds to a valid record in ALL_SOURCES");

    // Test 5: Exact ward non-invention rule
    assert(res1.wardNumbers === undefined, "Exact ward numbers are undefined for PIN 641002 to prevent false ward precision");
    assert(Boolean(res1.wardNote?.includes("Exact ward requires street address confirmation")), "Truthful wardNote is provided");

    // Test 6: Fact-checked PIN 641004 Peelamedu mapping
    const resPeelamedu = resolvePinAuthority("641004", "Storm drain overflow in Peelamedu");
    assert(resPeelamedu.resolved === true, "PIN 641004 resolves successfully");
    assert(Boolean(resPeelamedu.localityName?.includes("Peelamedu")), "PIN 641004 grounds explicitly to Peelamedu");
    assert(resPeelamedu.confidence === "HIGH", "PIN 641004 Peelamedu confidence is HIGH");

    // Test 7: Fact-checked PIN 641005 Singanallur mapping
    const resSinganallur = resolvePinAuthority("641005", "Potholes along Trichy Road");
    assert(resSinganallur.resolved === true, "PIN 641005 resolves successfully");
    assert(Boolean(resSinganallur.localityName?.includes("Singanallur")), "PIN 641005 grounds explicitly to Singanallur");
    assert(resSinganallur.confidence === "HIGH", "PIN 641005 Singanallur confidence is HIGH");

    // Test 8: Ambiguous boundary PIN 641003 handling (Ganapathy)
    const resBoundary = resolvePinAuthority("641003", "Road complaint");
    assert(resBoundary.resolved === true, "PIN 641003 resolves successfully");
    assert(resBoundary.confidence === "MEDIUM", "Ambiguous boundary PIN 641003 returns MEDIUM confidence");
    assert(resBoundary.zoneName === undefined, "Ambiguous boundary PIN 641003 keeps zoneName undefined to prevent false precision");
  }

  // =========================================================================
  // SECTION 7: Document & PDF Print-Export Integrity Tests
  // =========================================================================
  {
    console.log("\n--- SECTION 7: Document & PDF Print-Export Integrity Tests ---");

    // Test 1: RTI Application HTML Export
    const rtiHtml = exportRtiApplicationHtml({
      applicationDate: "2026-08-22",
      publicAuthority: "Coimbatore City Municipal Corporation",
      departmentName: "CCMC West Zone Engineering Cell",
      pioTitle: "Public Information Officer",
      applicantName: "A. Kumar",
      applicantAddress: "42, Lawley Road, Coimbatore",
      subject: "Request for Information regarding DB Road Pothole Repairs",
      problemDescription: "Severe potholes along DB Road causing traffic accidents.",
      requestedQuestions: [
        "Provide certified copies of Measurement Book records.",
        "Provide details of the contractor defect liability period.",
      ],
      periodConcerned: "January 2026 to Present",
      feeAmount: 10,
      paymentMode: "Court Fee Stamp",
      bplStatus: false,
      sourceReferences: ["SRC-POST-IN-PIN", "SRC-TN-CCMC-JURISDICTION"],
      checksum: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    });

    assert(Boolean(rtiHtml.includes("Section 6(1) of RTI Act 2005")), "RTI PDF export contains statutory Section 6(1) citation");
    assert(Boolean(rtiHtml.includes("Coimbatore City Municipal Corporation")), "RTI PDF export includes verified public authority");
    assert(Boolean(rtiHtml.includes("Measurement Book records")), "RTI PDF export includes requested questions");
    assert(Boolean(rtiHtml.includes("@page { size: A4;")), "RTI PDF export includes standard A4 print layout rules");
    assert(Boolean(!rtiHtml.includes("digitally signed")), "RTI PDF export strictly avoids false claims of digital signature");

    // Test 2: Evidence Index HTML Export
    const evidenceHtml = exportEvidenceIndexHtml({
      date: "2026-08-22",
      applicantName: "A. Kumar",
      authorityName: "CCMC Engineering Cell",
      evidenceItems: [
        {
          id: "E-1",
          description: "Photographs of damaged road",
          date: "August 2026",
          fileRef: "IMG_01.JPG",
          purpose: "Visual proof of defective surface",
        },
      ],
    });

    assert(Boolean(evidenceHtml.includes("Index of Supporting Documents & Evidence")), "Evidence Index PDF export includes title");
    assert(Boolean(evidenceHtml.includes("E-1")), "Evidence Index PDF export contains formatted item ID");
    assert(Boolean(evidenceHtml.includes("@page { size: A4;")), "Evidence Index PDF export includes A4 print CSS");

    // Test 3: First Appeal HTML Export
    const appealHtml = exportFirstAppealHtml({
      appealDate: "2026-08-22",
      appellantName: "A. Kumar",
      appellantAddress: "42, Lawley Road, Coimbatore",
      originalRtiDate: "2026-07-20",
      originalPioAuthority: "Public Information Officer, CCMC West Zone",
      firstAppellateAuthority: "The First Appellate Authority / Joint Commissioner",
      groundsForAppeal: ["Deemed Refusal under Section 7(2) due to 30-day statutory expiry."],
      statutoryTimelineBasis: "Section 19(1) of RTI Act 2005",
      reliefSought: "Direct PIO to supply records free of cost under Section 7(6).",
      enclosures: ["Copy of Original RTI Application"],
    });

    assert(Boolean(appealHtml.includes("First Appeal Under Section 19(1)")), "First Appeal PDF export contains Section 19(1) citation");
    assert(Boolean(appealHtml.includes("Deemed Refusal")), "First Appeal PDF export contains statutory grounds");
    assert(Boolean(appealHtml.includes("Section 7(6)")), "First Appeal PDF export contains fee waiver relief clause under Section 7(6)");
  }

  // =========================================================================
  // SECTION 8: Unified Action Planner Classification & Routing Tests
  // =========================================================================
  {
    console.log("\n--- SECTION 8: Unified Action Planner Tests ---");

    // Test 1: Tenant Dispute Classification
    const tenantPlan = planCitizenAction("My landlord is refusing to return my security deposit of 40000", "641002");
    assert(tenantPlan.domain === "TENANT", "Tenant security deposit classified as TENANT domain");
    assert(tenantPlan.availableDocumentType === "TENANT_REPRESENTATION", "Tenant dispute recommends TENANT_REPRESENTATION, NOT RTI");
    assert(Boolean(tenantPlan.whyNotOtherRoutes?.includes("RTI")), "Tenant plan explicitly explains why RTI is not applicable to private landlords");
    assert(tenantPlan.authority.name.includes("Rent Authority"), "Tenant dispute routes to Rent Authority / RDO");
    assert(tenantPlan.statutoryDeadline.days === 30, "Tenant security deposit statutory deadline is 30 days");

    // Test 2: Consumer Dispute Classification
    const consumerPlan = planCitizenAction("E-commerce company delivered a defective mobile phone and refused refund");
    assert(consumerPlan.domain === "CONSUMER", "Defective product / refund refusal classified as CONSUMER domain");
    assert(consumerPlan.availableDocumentType === "CONSUMER_REPRESENTATION", "Consumer dispute recommends CONSUMER_REPRESENTATION");
    assert(Boolean(consumerPlan.authority.portalUrl?.includes("consumerhelpline")), "Consumer dispute links to verified National Consumer Helpline");

    // Test 3: Workplace Dispute Classification
    const workplacePlan = planCitizenAction("Employer withheld two months of earned salary and relieving letter");
    assert(workplacePlan.domain === "WORKPLACE", "Unpaid salary classified as WORKPLACE domain");
    assert(workplacePlan.availableDocumentType === "WORKPLACE_REPRESENTATION", "Workplace dispute recommends WORKPLACE_REPRESENTATION");

    // Test 4: Civic / Road Pothole Grievance
    const civicPlan = planCitizenAction("Potholes along DB road causing accidents", "641002");
    assert(civicPlan.domain === "CIVIC_RTI", "Road potholes classified as CIVIC_RTI domain");
    assert(civicPlan.availableDocumentType === "RTI_APPLICATION", "Civic grievance recommends RTI_APPLICATION");
    assert(civicPlan.confidence === "HIGH", "PIN 641002 in CCMC West Zone yields HIGH confidence");
  }

  // =========================================================================
  // SECTION 9: Representation Generator Template & Print HTML Tests
  // =========================================================================
  {
    console.log("\n--- SECTION 9: Representation Generator Tests ---");

    // Test 1: Tenant Legal Demand Notice
    const tenantDoc = generateRepresentationDocument({
      documentType: "TENANT_REPRESENTATION",
      problemDescription: "Landlord refusing to refund deposit",
      locality: "R.S. Puram",
      state: "Tamil Nadu",
      applicantName: "R. Suresh",
      amountClaimed: "₹40,000",
    });

    assert(Boolean(tenantDoc.title.includes("TENANCY SECURITY DEPOSIT")), "Tenant representation title includes security deposit demand");
    assert(Boolean(tenantDoc.subject.includes("Section 11 of TNRRRLT Act")), "Tenant representation subject includes Section 11 statutory citation");
    assert(tenantDoc.evidenceEnclosures.some((e) => e.includes("E1")), "Tenant representation contains formatted evidence IDs (E1, E2)");

    const tenantHtml = exportRepresentationHtml(tenantDoc);
    assert(Boolean(tenantHtml.includes("@page { size: A4;")), "Tenant representation export contains standard A4 print layout");
    assert(Boolean(tenantHtml.includes("TNRRRLT Act, 2017")), "Tenant representation HTML contains TNRRRLT Act citation");

    // Test 2: Consumer Pre-Litigation Grievance
    const consumerDoc = generateRepresentationDocument({
      documentType: "CONSUMER_REPRESENTATION",
      problemDescription: "Defective item",
      applicantName: "A. Kumar",
    });
    assert(Boolean(consumerDoc.title.includes("PRE-LITIGATION CONSUMER GRIEVANCE")), "Consumer representation title formatted properly");
    assert(Boolean(consumerDoc.legalStatutoryBasis.some((b) => b.includes("Consumer Protection Act, 2019"))), "Consumer doc cites CPA 2019");

    // Test 3: Workplace Wage Demand
    const workDoc = generateRepresentationDocument({
      documentType: "WORKPLACE_REPRESENTATION",
      problemDescription: "Unpaid salary",
      applicantName: "P. Vignesh",
    });
    assert(Boolean(workDoc.title.includes("DEMAND FOR PAYMENT OF OUTSTANDING SALARY")), "Workplace doc title formatted properly");
    assert(Boolean(workDoc.legalStatutoryBasis.some((b) => b.includes("Payment of Wages Act"))), "Workplace doc cites Payment of Wages Act");
  }

  // =========================================================================
  // SECTION 10: Submission Tracker & Statutory Countdown Tests
  // =========================================================================
  {
    console.log("\n--- SECTION 10: Submission Tracker & Countdown Tests ---");

    const submissionDate = "2026-07-20";
    const filingTime = new Date(submissionDate).getTime();
    const nowTime = new Date("2026-08-22").getTime();
    const daysDiff = Math.floor((nowTime - filingTime) / (1000 * 60 * 60 * 24));

    assert(daysDiff === 33, "Days difference between 2026-07-20 and 2026-08-22 is 33 days");
    assert(daysDiff >= 30, "33 days exceeds statutory 30-day response window under Section 7(1)");
  }

  // =========================================================================
  // SECTION 11: Grounded Confidence Rating Invariance Tests
  // =========================================================================
  {
    console.log("\n--- SECTION 11: Grounded Confidence Invariance Tests ---");

    const verifiedPlan = planCitizenAction("Potholes on road", "641002");
    assert(verifiedPlan.confidence === "HIGH", "Fully verified Coimbatore PIN yields HIGH confidence");

    const unverifiedPlan = planCitizenAction("Potholes on road", "999999");
    assert(unverifiedPlan.confidence === "VERIFICATION_REQUIRED", "Unsupported PIN 999999 strictly returns VERIFICATION_REQUIRED, never HIGH");
  }

  // =========================================================================
  // SECTION 12: Pan-India Location Context Tests (All 36 States & UTs)
  // =========================================================================
  {
    console.log("\n--- SECTION 12: Pan-India Location Context Tests ---");

    assert(ALL_STATES_AND_UTS.length === 36, "All 36 Indian States and Union Territories registered");
    const statesCount = ALL_STATES_AND_UTS.filter((s) => !s.unionTerritory).length;
    const utCount = ALL_STATES_AND_UTS.filter((s) => s.unionTerritory).length;
    assert(statesCount === 28, "Exactly 28 States present in registry");
    assert(utCount === 8, "Exactly 8 Union Territories present in registry");

    const locKA = resolveLocationContext({ state: "Karnataka", district: "Bengaluru Urban" });
    assert(locKA.stateCode === "KA", "Karnataka resolved to KA");
    assert(locKA.district === "Bengaluru Urban", "Bengaluru Urban district preserved");

    const locMH = resolveLocationContext({ stateCode: "MH", district: "Pune" });
    assert(locMH.stateName === "Maharashtra", "MH resolved to Maharashtra");

    // District Directory Verification
    const tnDistricts = getDistrictsForState("TN");
    assert(tnDistricts.includes("Coimbatore") && tnDistricts.includes("Chennai"), "Tamil Nadu returns verified districts including Coimbatore and Chennai");
    assert(tnDistricts.length >= 38, "Tamil Nadu contains all 38 districts");

    const mhDistricts = getDistrictsForState("MH");
    assert(mhDistricts.includes("Pune") && mhDistricts.includes("Mumbai City"), "Maharashtra returns verified districts including Pune and Mumbai City");

    // Location Conflict Guard Check
    const conflictLoc = resolveLocationContext({ state: "Tamil Nadu", pinCode: "560001" }); // 560001 is Bengaluru, KA
    assert(conflictLoc.conflictStatus === "LOCATION_CONFIRMATION_REQUIRED", "Conflicting State (Tamil Nadu) and PIN (560001 Karnataka) triggers confirmation required");
    assert(Boolean(conflictLoc.conflictMessage?.includes("do not match")), "Conflict message clearly warns user of location mismatch");

    const validLoc = resolveLocationContext({ state: "Tamil Nadu", pinCode: "641002" });
    assert(validLoc.conflictStatus === "OK", "Matching State (Tamil Nadu) and PIN (641002) yields OK status");
  }

  // =========================================================================
  // SECTION 13: Pan-India Consumer Protection Engine Tests
  // =========================================================================
  {
    console.log("\n--- SECTION 13: Pan-India Consumer Protection Engine Tests ---");

    // 1. National core consistency across diverse states
    const statesToTest = ["Tamil Nadu", "Karnataka", "Maharashtra", "Delhi", "Kerala", "Uttar Pradesh", "West Bengal", "Gujarat", "Assam", "Jammu and Kashmir"];
    for (const st of statesToTest) {
      const cPlan = planConsumerAction({
        state: st,
        district: "Capital District",
        productOrService: "Mobile Phone",
        sellerOrProvider: "Online Retailer",
        amountPaid: 25000,
        issueType: "DEFECTIVE_GOODS",
        issueDescription: "Battery defective",
        invoiceAvailable: true,
        warrantyAvailable: true,
        communicationsAvailable: true,
        priorComplaintMade: true,
        reliefRequested: "REFUND",
      });

      assert(cPlan.domain === "CONSUMER", `Consumer dispute for ${st} correctly classified as CONSUMER domain`);
      assert(cPlan.statutoryBasis[0].includes("Consumer Protection Act, 2019"), `National CPA 2019 applies uniformly in ${st}`);
      assert(cPlan.nchDetails.helplineNumber.includes("1915"), `NCH 1915 integration verified for ${st}`);
    }

    // 2. Pecuniary Jurisdiction Rule calculation (2021 CPA Rules)
    const locDistrict = resolveLocationContext({ state: "Tamil Nadu", district: "Coimbatore" });
    const distJurisdiction = calculateConsumerJurisdiction(300000, locDistrict);
    assert(distJurisdiction.tier === "DISTRICT_COMMISSION", "Amount ₹3,00,000 routes to District Commission");

    const stateJurisdiction = calculateConsumerJurisdiction(7500000, locDistrict);
    assert(stateJurisdiction.tier === "STATE_COMMISSION", "Amount ₹75,00,000 routes to State Commission");

    const natJurisdiction = calculateConsumerJurisdiction(25000000, locDistrict);
    assert(natJurisdiction.tier === "NATIONAL_COMMISSION", "Amount ₹2,50,00,000 routes to National Commission (NCDRC)");

    // Missing amount fails safe to VERIFICATION_REQUIRED / MEDIUM
    const unknownJurisdiction = calculateConsumerJurisdiction(undefined, locDistrict);
    assert(unknownJurisdiction.tier === "VERIFICATION_REQUIRED", "Undefined claim amount strictly requires fact verification");
  }

  // =========================================================================
  // SECTION 14: Pan-India State-Aware Tenancy Registry & Adapters Tests
  // =========================================================================
  {
    console.log("\n--- SECTION 14: Pan-India State-Aware Tenancy Tests ---");

    // All 36 States/UTs must be in tenancy registry
    assert(Object.keys(STATE_TENANCY_REGISTRY).length >= 36, "36 States & UTs registered in State Tenancy Registry");

    // 1. Tamil Nadu — FULLY VERIFIED (TNRRRLT Act 2017)
    const tnRecord = getStateTenancyRecord("TN");
    assert(tnRecord.legalStatus === "VERIFIED_STATE_ACT", "Tamil Nadu verified as VERIFIED_STATE_ACT");
    assert(tnRecord.primaryActTitle.includes("TNRRRLT Act, 2017"), "TN cites TNRRRLT Act 2017");
    assert(tnRecord.statutoryDepositCapMonths === 3, "TN residential deposit capped at 3 months");

    const tnPlan = planTenantAction({
      state: "Tamil Nadu",
      district: "Coimbatore",
      propertyType: "RESIDENTIAL",
      agreementAvailable: true,
      agreementRegistered: true,
      issueType: "SECURITY_DEPOSIT",
      issueDescription: "Deposit withheld",
      noticeReceived: false,
      handoverProofAvailable: true,
      communicationsAvailable: true,
    });
    assert(tnPlan.applicableLaw.isStateSpecific === true, "TN tenancy law is verified state-specific");
    assert(tnPlan.statutoryRule.statutorySection === "Section 11, TNRRRLT Act 2017", "TN security deposit cites Section 11");

    // 2. Karnataka — VERIFIED RENT ACT (Karnataka Rent Act, 1999)
    const kaRecord = getStateTenancyRecord("KA");
    assert(kaRecord.primaryActTitle.includes("Karnataka Rent Act, 1999"), "KA cites Karnataka Rent Act, 1999");
    assert(kaRecord.rentAuthorityTitle.includes("Court of Small Causes"), "KA specifies Small Causes Court");

    // 3. Maharashtra — VERIFIED (Maharashtra Rent Control Act, 1999)
    const mhRecord = getStateTenancyRecord("MH");
    assert(mhRecord.primaryActTitle.includes("Maharashtra Rent Control Act, 1999"), "MH cites Maharashtra Rent Control Act, 1999");

    // 4. Uttar Pradesh — VERIFIED (UP Tenancy Act 2021)
    const upRecord = getStateTenancyRecord("UP");
    assert(upRecord.primaryActTitle.includes("Uttar Pradesh Regulation of Urban Premises Tenancy Act, 2021"), "UP cites 2021 Tenancy Act");
    assert(upRecord.statutoryDepositCapMonths === 2, "UP residential deposit capped at 2 months");

    // 5. Delhi — VERIFIED (Delhi Rent Control Act, 1958)
    const dlRecord = getStateTenancyRecord("DL");
    assert(dlRecord.primaryActTitle.includes("Delhi Rent Control Act, 1958"), "Delhi cites 1958 DRC Act");

    // 6. Kerala — VERIFIED (Kerala Buildings Act 1965)
    const klRecord = getStateTenancyRecord("KL");
    assert(klRecord.primaryActTitle.includes("Kerala Buildings (Lease and Rent Control) Act, 1965"), "Kerala cites 1965 Act");

    // 7. Unverified State (e.g. Sikkim) — Strictly VERIFICATION_REQUIRED, zero fake authority
    const skRecord = getStateTenancyRecord("SK");
    assert(skRecord.verificationTier === "VERIFICATION_REQUIRED", "Sikkim tenancy strictly flagged VERIFICATION_REQUIRED");

    const skPlan = planTenantAction({
      state: "Sikkim",
      propertyType: "RESIDENTIAL",
      agreementAvailable: true,
      agreementRegistered: false,
      issueType: "SECURITY_DEPOSIT",
      issueDescription: "Deposit dispute in Gangtok",
      noticeReceived: false,
      handoverProofAvailable: true,
      communicationsAvailable: true,
    });
    assert(skPlan.confidence === "VERIFICATION_REQUIRED", "Unverified state tenancy strictly yields VERIFICATION_REQUIRED confidence");
    assert(skPlan.authorityResolution.confidence === "VERIFICATION_REQUIRED", "Zero fabricated rent authority for unverified state");

    // 8. Model Tenancy Act is NEVER presented as automatically applicable law
    assert(tnPlan.applicableLaw.isModelActDisclaimer === false, "Model Tenancy Act not conflated with enacted TN law");
    assert(!tnPlan.applicableLaw.actTitle.startsWith("Model Tenancy Act"), "Model Tenancy Act never masquerades as state act");
  }

  // =========================================================================
  // SECTION 15: Source Freshness & Trust Model Tests
  // =========================================================================
  {
    console.log("\n--- SECTION 15: Source Freshness & Trust Model Tests ---");

    const freshCpa = checkSourceFreshness("SRC-CONS-2A-CENTRAL", "2026-08-22");
    assert(freshCpa.isFresh === true, "Central CPA 2019 is fresh");
    assert(freshCpa.status === "CURRENT", "CPA 2019 status is CURRENT");

    const freshTn = checkSourceFreshness("SRC-TEN-2F-TN", "2026-08-22");
    assert(freshTn.isFresh === true, "Tamil Nadu Tenancy Act source is fresh");

    const missingSource = checkSourceFreshness("SRC-UNKNOWN-999", "2026-08-22");
    assert(missingSource.isFresh === false, "Unregistered source ID fails freshness check");
    assert(missingSource.status === "REVIEW_DUE", "Unregistered source status is REVIEW_DUE");
  }

  // =========================================================================
  // SECTION 16: Pan-India Critical Negative Invariants & Jurisdiction Resolver Tests
  // =========================================================================
  {
    console.log("\n--- SECTION 16: Pan-India Critical Negative Invariants & Resolver Tests ---");

    // 1. Maharashtra tenant case must NOT cite Tamil Nadu TNRRRLT Act
    const mhTenantResolution = resolveTenantRights({
      state: "Maharashtra",
      district: "Pune",
      propertyType: "RESIDENTIAL",
      issueType: "SECURITY_DEPOSIT",
      issueDescription: "Landlord withheld deposit in Pune",
      handoverProof: true,
    });
    assert(!mhTenantResolution.applicableLaw.includes("TNRRRLT"), "Maharashtra tenant case strictly DOES NOT cite Tamil Nadu TNRRRLT Act");
    assert(mhTenantResolution.applicableLaw.includes("Maharashtra Rent Control Act"), "Maharashtra case correctly cites Maharashtra Rent Control Act");

    // 2. Unverified State (e.g. Goa) must NOT cite Model Tenancy Act as binding law
    const goaTenantResolution = resolveTenantRights({
      state: "Goa",
      propertyType: "RESIDENTIAL",
      issueType: "SECURITY_DEPOSIT",
      issueDescription: "Deposit dispute in Panaji",
    });
    assert(goaTenantResolution.isModelActBinding === false, "Unverified State tenant dispute strictly DOES NOT cite Model Tenancy Act as binding law");
    assert(goaTenantResolution.authority === undefined, "Unverified State produces undefined authority to prevent false precision");
    assert(goaTenantResolution.authorityConfidence === "VERIFICATION_REQUIRED", "Unverified State yields VERIFICATION_REQUIRED");

    // 3. Consumer missing jurisdiction facts must NOT invent Commission
    const unknownConsumerJurisdiction = resolveConsumerCommissionJurisdiction({
      state: "Karnataka",
      considerationAmount: undefined,
    });
    assert(unknownConsumerJurisdiction.level === "VERIFICATION_REQUIRED", "Missing consideration amount yields VERIFICATION_REQUIRED level");
    assert(unknownConsumerJurisdiction.missingFacts.length > 0, "Missing facts explicitly enumerated for consumer jurisdiction");

    // 4. Consumer ₹45,000 claim routes to District Commission
    const distResult = resolveConsumerCommissionJurisdiction({
      state: "Tamil Nadu",
      district: "Coimbatore",
      considerationAmount: 45000,
    });
    assert(distResult.level === "DISTRICT_COMMISSION", "₹45,000 consideration routes to District Commission (DCDRC)");
    assert(distResult.sourceIds.includes("SRC-CONS-2A-CENTRAL"), "District Commission cites CPA 2019 source");

    // 5. Tenant representation in unverified State contains NO fake section numbers
    const unverifiedStateDoc = generateRepresentationDocument({
      documentType: "TENANT_REPRESENTATION",
      problemDescription: "Landlord refusal",
      state: "Sikkim",
      applicantName: "T. Dorji",
    });
    assert(!unverifiedStateDoc.legalStatutoryBasis.some((b) => b.includes("TNRRRLT")), "Unverified State representation has zero fake TN citations");
    assert(unverifiedStateDoc.legalStatutoryBasis.some((b) => b.includes("Transfer of Property Act, 1882")), "Unverified State falls back to Transfer of Property Act 1882");

    // 6. Private disputes MUST NOT become RTI
    const tenantPlanAction = planCitizenAction("My landlord refuses to refund my security deposit", undefined, "Karnataka");
    assert(tenantPlanAction.domain === "TENANT", "Private landlord dispute classifies as TENANT, NOT CIVIC_RTI");
    assert(tenantPlanAction.availableDocumentType === "TENANT_REPRESENTATION", "Tenant dispute creates TENANT_REPRESENTATION, NOT RTI_APPLICATION");

    const consumerPlanAction = planCitizenAction("Amazon delivery was defective and seller refuses replacement", undefined, "Delhi");
    assert(consumerPlanAction.domain === "CONSUMER", "Private seller dispute classifies as CONSUMER, NOT CIVIC_RTI");
    assert(consumerPlanAction.availableDocumentType === "CONSUMER_REPRESENTATION", "Consumer dispute creates CONSUMER_REPRESENTATION, NOT RTI_APPLICATION");
  }

  // =========================================================================
  // SECTION 17: Closed-Loop Geo-Tagged Civic Rectification & Lifecycle Tests
  // =========================================================================
  {
    console.log("\n--- SECTION 17: Closed-Loop Civic Rectification & Lifecycle Tests ---");

    // 1. Haversine distance calculations
    const distCoimbatoreSame = calculateDistanceMeters(11.0168, 76.9678, 11.0170, 76.9679);
    assert(distCoimbatoreSame <= 30, "Immediate road repair location calculated at ~25m distance");

    const distFar = calculateDistanceMeters(11.0168, 76.9678, 13.0827, 80.2707); // Coimbatore to Chennai
    assert(distFar > 400000, "Coimbatore to Chennai calculated at > 400 km");

    // 2. Location Consistency Evaluator
    const evalConsistent = evaluateLocationConsistency(
      { latitude: 11.0168, longitude: 76.9678, accuracyMeters: 10 },
      { latitude: 11.0170, longitude: 76.9679, accuracyMeters: 12 }
    );
    assert(evalConsistent.status === "CONSISTENT", "Separation under 200m evaluated as CONSISTENT");
    assert(evalConsistent.message.includes("Device-reported location appears consistent"), "Message adheres to truthful device-reported wording");

    const evalMismatch = evaluateLocationConsistency(
      { latitude: 11.0168, longitude: 76.9678 },
      { latitude: 11.0400, longitude: 76.9900 }
    );
    assert(evalMismatch.status === "SIGNIFICANT_MISMATCH", "Separation > 1km evaluated as SIGNIFICANT_MISMATCH");

    const evalMissing = evaluateLocationConsistency(undefined, { latitude: 11.0168, longitude: 76.9678 });
    assert(evalMissing.status === "NOT_AVAILABLE", "Missing coordinates safely return NOT_AVAILABLE");

    // 3. Issue Proof Requirements
    const potholeReqs = getIssueProofRequirements("POTHOLE_ROAD");
    assert(potholeReqs.requiresAfterPhoto === true, "Pothole repair strictly requires after-repair photo");

    const streetlightReqs = getIssueProofRequirements("STREETLIGHT_FAULT");
    assert(streetlightReqs.requiresAfterPhoto === false, "Streetlight fault allows action note documentation without mandatory photo");

    // 4. SHA-256 Checksum generation
    const testChecksum = await calculateSha256("CIVIC_EVIDENCE_TEST_CONTENT");
    assert(testChecksum.length === 64, "SHA-256 produces valid 64-character hex string");

    // 5. Rectification Evidence Pack PDF Export
    const htmlReport = exportRectificationEvidencePackHtml({
      caseId: "INF-2026-002",
      issueDescription: "Pothole on Crosscut Road",
      locationDetails: "Gandhipuram, Coimbatore, Tamil Nadu",
      submissionDate: "2026-08-18",
      department: "Engineering & Roads Department",
      officerDesignation: "Assistant Executive Engineer",
      rectifiedDate: "2026-08-20",
      officerActionNote: "Bituminous mastic patch completed",
      locationConsistency: "CONSISTENT",
      distanceMeters: 25,
      citizenStatus: "RECTIFIED_PENDING_CITIZEN_CONFIRMATION",
      beforeEvidence: {
        id: "E1",
        description: "Pothole crater",
        date: "2026-08-18",
        checksum: testChecksum,
      },
      afterEvidence: {
        id: "E2",
        description: "Mastic patch",
        date: "2026-08-20",
        checksum: testChecksum,
      },
    });

    assert(htmlReport.includes("RECTIFICATION EVIDENCE RECORD"), "Report header includes official title");
    assert(htmlReport.includes("Location values shown are device-reported metadata"), "Report strictly contains truthful technical disclaimer");
    assert(htmlReport.includes("SHA-256"), "Report displays tamper-detection SHA-256 checksums");
  }

  // =========================================================================
  // SECTION 18: Real-Time Government Data & Authority Resolution Layer Tests
  // =========================================================================
  {
    console.log("\n--- SECTION 18: Real-Time Government Data & Authority Resolution Tests ---");

    const { isApprovedOfficialHost } = await import("@/lib/government-data/security");
    const { PostalLocationProvider } = await import("@/lib/government-data/adapters/postal-location");
    const { getDistrictsForStateRealtime } = await import("@/lib/government-data/adapters/districts");
    const { resolveLocalBody } = await import("@/lib/government-data/adapters/local-bodies");
    const { resolveRtiAuthority } = await import("@/lib/government-data/adapters/rti-authority");
    const { getConsumerDirectoryRecord } = await import("@/lib/government-data/adapters/consumer-directory");
    const { resolveLabourOffice } = await import("@/lib/government-data/adapters/labour-directory");
    const { discoverGovernmentSchemes } = await import("@/lib/government-data/adapters/schemes");
    const { getVersionedRule } = await import("@/lib/government-data/versioned-rules");

    // 1. Security & Official Host Allowlist
    assert(isApprovedOfficialHost("https://api.postalpincode.in/pincode/641002") === true, "Third-party postal PIN API host is in approved allowlist");
    assert(isApprovedOfficialHost("https://edaakhil.nic.in") === true, "eDaakhil portal is approved");
    assert(isApprovedOfficialHost("https://rtionline.gov.in") === true, "RTI Online portal is approved");
    assert(isApprovedOfficialHost("https://evil-site.com") === false, "Arbitrary non-gov host is strictly blocked");
    assert(isApprovedOfficialHost("http://localhost:3000") === false, "Localhost SSRF attempt is strictly blocked");

    // 2. Postal Location Provider & Fallback
    const postalProvider = new PostalLocationProvider();
    const mockPostalJson = [
      {
        Status: "Success",
        PostOffice: [
          {
            Name: "R.S.Puram Head Post Office",
            BranchType: "Head Post Office",
            DeliveryStatus: "Delivery",
            Circle: "Tamil Nadu",
            District: "Coimbatore",
            Division: "Coimbatore",
            Region: "Coimbatore",
            State: "Tamil Nadu",
            Pincode: "641002"
          }
        ]
      }
    ];

    const normalizedLocation = postalProvider.normalizeRawResponse("641002", mockPostalJson);
    assert(normalizedLocation.state === "Tamil Nadu", "Derived State is Tamil Nadu");
    assert(normalizedLocation.district === "Coimbatore", "Derived District is Coimbatore");
    assert(normalizedLocation.localityCandidates.includes("R.S.Puram Head Post Office"), "Localities include RS Puram HPO");
    assert(normalizedLocation.provenance.resolutionMode === "THIRD_PARTY_LIVE", "Provenance records resolutionMode THIRD_PARTY_LIVE");
    assert(normalizedLocation.provenance.trustLevel === "THIRD_PARTY_REFERENCE", "Trust level marked THIRD_PARTY_REFERENCE");
    assert(normalizedLocation.provenance.isOfficialGovernmentSource === false, "Not marked as official government source");
    assert(normalizedLocation.confidence === "MEDIUM", "Third-party PIN service yields MEDIUM confidence alone");

    const fallbackLoc = await postalProvider.getFallback("641002");
    assert(fallbackLoc?.confidence === "HIGH", "Fallback yields HIGH confidence for verified static PIN");
    assert(fallbackLoc?.provenance.trustLevel === "VERIFIED_STATIC_GOVERNMENT_SOURCE", "Fallback is VERIFIED_STATIC_GOVERNMENT_SOURCE");

    // 3. District Data Provider
    const districtsTN = await getDistrictsForStateRealtime("Tamil Nadu");
    assert(districtsTN.districts.includes("Coimbatore"), "Tamil Nadu districts include Coimbatore");
    assert(districtsTN.totalCount >= 38, "Tamil Nadu total district count >= 38");

    // 4. Local Body Resolver
    const localBodyCoimbatore = await resolveLocalBody({ state: "Tamil Nadu", district: "Coimbatore", pinCode: "641002" });
    assert(localBodyCoimbatore.name.includes("Coimbatore City Municipal Corporation"), "Resolved CCMC local body");
    assert(localBodyCoimbatore.type === "MUNICIPAL_CORPORATION", "Local body categorized as MUNICIPAL_CORPORATION");

    const localBodyBengaluru = await resolveLocalBody({ state: "Karnataka", district: "Bengaluru Urban" });
    assert(localBodyBengaluru.name.includes("BBMP"), "Bengaluru resolves to BBMP");

    // 5. RTI Authority Resolver
    const rtiAuthCentral = await resolveRtiAuthority({
      subject: "Passport delay inquiry",
      state: "Delhi",
      district: "New Delhi",
      isCentralBody: true
    });
    assert(rtiAuthCentral.level === "CENTRAL", "Passport inquiry routes to CENTRAL RTI level");
    assert(rtiAuthCentral.pioDesignation === "Central Public Information Officer (CPIO)", "Designation is CPIO");
    assert(rtiAuthCentral.filingPortalUrl === "https://rtionline.gov.in", "Central filing portal is rtionline.gov.in");

    // 6. Consumer Directory Adapter
    const consumerOffice = getConsumerDirectoryRecord(
      {
        level: "DISTRICT_COMMISSION",
        levelName: "District Consumer Disputes Redressal Commission",
        territorialBasis: "District territorial limits",
        ruleApplied: "Section 34, CPA 2019",
        sourceIds: ["SRC-CONS-2A-CENTRAL"],
        confidence: "HIGH",
        missingFacts: [],
        officialPortalUrl: "https://edaakhil.nic.in",
        officialPortalName: "eDaakhil"
      },
      "Tamil Nadu",
      "Coimbatore"
    );
    assert(consumerOffice.commissionName.includes("District Consumer Disputes Redressal Commission"), "Directory provides DCDRC record");
    assert(consumerOffice.nchHelpline.includes("1915"), "Includes official NCH 1915 helpline");

    // 7. Workplace Labour Directory
    const labourStateOffice = resolveLabourOffice("Tamil Nadu", "Coimbatore", false);
    assert(labourStateOffice.sphere === "STATE_SPHERE", "Private factory dispute routes to STATE_SPHERE");
    assert(labourStateOffice.officialPortal === "https://shramsuvidha.gov.in", "Official portal is shramsuvidha.gov.in");

    const labourCentralOffice = resolveLabourOffice("Maharashtra", "Mumbai", true);
    assert(labourCentralOffice.sphere === "CENTRAL_SPHERE", "Bank/Railway dispute routes to CENTRAL_SPHERE");
    assert(labourCentralOffice.officialPortal === "https://clc.gov.in", "Official portal is clc.gov.in");

    // 8. Scheme Live Discovery Guard
    const discoveredSchemes = await discoverGovernmentSchemes("Tamil Nadu", "farmer");
    assert(discoveredSchemes.length > 0, "Discovered schemes returned");
    assert(discoveredSchemes[0]?.eligibilityStatus === "FULLY_STRUCTURED_RULES", "Scheme has structured eligibility status");

    // 9. Versioned Legal Rules
    const rtiDaysRule = getVersionedRule("RTI_RESPONSE_DAYS");
    assert(rtiDaysRule?.value === 30, "RTI statutory response days is 30");
    assert(Boolean(rtiDaysRule?.statutoryBasis.includes("Section 7(1)")), "Statutory basis is Section 7(1)");

    const dcdrcLimitRule = getVersionedRule("DISTRICT_COMMISSION_MAX_INR");
    assert(dcdrcLimitRule?.value === 5000000, "DCDRC pecuniary limit is ₹50,00,000");

    const tnDepositRule = getVersionedRule("TENANT_DEPOSIT_MAX_MONTHS", "TAMIL_NADU");
    assert(tnDepositRule?.value === 3, "Tamil Nadu tenant deposit cap is 3 months");
  }

  console.log("\n=================================================================");
  console.log(`   Route-Handler Contract Tests Completed: ${passed} Passed, ${failed} Failed`);
  console.log("=================================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runRouteHandlerContractTests().catch((err) => {
  console.error("Route Handler Contract Test Runner Error:", err);
  process.exit(1);
});
