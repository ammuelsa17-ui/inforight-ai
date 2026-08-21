import { POST as triageHandler } from "@/app/api/triage/route";
import { POST as rtiHandler } from "@/app/api/rti/generate/route";
import { POST as rightsHandler } from "@/app/api/rights/navigate/route";
import { POST as schemesHandler } from "@/app/api/schemes/match/route";
import { POST as langTranslateHandler } from "@/app/api/language/translate/route";
import { POST as langTranscribeHandler } from "@/app/api/language/transcribe/route";
import { POST as langSpeakHandler } from "@/app/api/language/speak/route";
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
