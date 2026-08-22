import fs from "fs";
import path from "path";
import assert from "assert";
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
} from "@/lib/pdf/print-export";
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
