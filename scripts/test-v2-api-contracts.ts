import { POST as triageHandler } from "@/app/api/triage/route";
import { POST as rtiHandler } from "@/app/api/rti/generate/route";
import { POST as rightsHandler } from "@/app/api/rights/navigate/route";
import { POST as schemesHandler } from "@/app/api/schemes/match/route";
import { NextRequest } from "next/server";

async function runTests() {
  console.log("=================================================");
  console.log("   InfoRight AI Version 2.0 API Contract Test   ");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`✓ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`✗ FAIL: ${testName} - ${detail || "Assertion failed"}`);
      failed++;
    }
  }

  // ---------------------------------------------------------
  // 1. Triage API Tests (/api/triage)
  // ---------------------------------------------------------
  console.log("--- 1. Testing /api/triage ---");

  // Case A: Civic Road Complaint -> RTI
  {
    const req = new NextRequest("http://localhost/api/triage", {
      method: "POST",
      body: JSON.stringify({ problemDescription: "Broken road and deep potholes near DB Road causing accidents" }),
    });
    const res = await triageHandler(req);
    const data = await res.json();
    assert(res.status === 200, "Triage HTTP 200");
    assert(data.service === "rti", "Triage classifies road issue as 'rti'", `Got ${data.service}`);
  }

  // Case B: Consumer Laptop Refund Denial -> Rights Consumer
  {
    const req = new NextRequest("http://localhost/api/triage", {
      method: "POST",
      body: JSON.stringify({ problemDescription: "E-commerce seller refused laptop refund for defective screen" }),
    });
    const res = await triageHandler(req);
    const data = await res.json();
    assert(data.service === "rights" && data.category === "consumer", "Triage classifies refund issue as 'rights/consumer'");
  }

  // Case C: Emergency Safety Handling -> Unsupported
  {
    const req = new NextRequest("http://localhost/api/triage", {
      method: "POST",
      body: JSON.stringify({ problemDescription: "Physical assault and medical emergency requiring immediate help" }),
    });
    const res = await triageHandler(req);
    const data = await res.json();
    assert(data.service === "unsupported", "Triage handles emergency safety requests as 'unsupported'");
  }

  // Case D: Invalid Payload -> 400 Bad Request
  {
    const req = new NextRequest("http://localhost/api/triage", {
      method: "POST",
      body: JSON.stringify({}),
    });
    const res = await triageHandler(req);
    assert(res.status === 400, "Triage rejects payload missing problemDescription with 400");
  }

  // ---------------------------------------------------------
  // 2. RTI Generation API Tests (/api/rti/generate)
  // ---------------------------------------------------------
  console.log("\n--- 2. Testing /api/rti/generate ---");

  // Case A: Prohibited Applicant Identity Field Rejection
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

  // Case B: Valid RTI Request Contract Compliance
  {
    const req = new NextRequest("http://localhost/api/rti/generate", {
      method: "POST",
      body: JSON.stringify({
        issue: "Potholes and broken pavement along DB Road near R.S. Puram",
        state: "Tamil Nadu",
        district: "Coimbatore",
        localBodyName: "Coimbatore Corporation",
        locality: "R.S. Puram",
        sourceIds: ["RTI_ACT_2005_AMENDED", "CCMC_RTI_AUTHORITY"],
      }),
    });
    const res = await rtiHandler(req);
    const data = await res.json();
    assert(res.status === 200, "RTI API HTTP 200");
    assert(data.validation?.applicantDataSentToAI === false, "RTI response guarantees applicantDataSentToAI === false");
    assert(Array.isArray(data.questions) && data.questions.length >= 3 && data.questions.length <= 5, "RTI response returns 3 to 5 questions");
    assert(data.authority?.designation === "Public Information Officer", "RTI authority designation is Public Information Officer");
  }

  // ---------------------------------------------------------
  // 3. Rights Navigator API Tests (/api/rights/navigate)
  // ---------------------------------------------------------
  console.log("\n--- 3. Testing /api/rights/navigate ---");

  // Case A: Consumer Rights Contract Compliance
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
    assert(data.escalationPathway?.helplinePhone === "1915", "Consumer rights includes NCH 1915 helpline");
    assert(data.citationIds.includes("E_JAGRITI_PORTAL"), "Consumer rights includes e-Jagriti portal citation");
  }

  // Case B: Tenant Rights Contract Compliance with Jurisdiction Warning
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

  // Case C: Workplace Rights Contract Compliance
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
    assert(data.citationIds.includes("SAMADHAN_2_PORTAL"), "Workplace rights includes SAMADHAN 2.0 portal citation");
  }

  // ---------------------------------------------------------
  // 4. Scheme Eligibility Matcher API Tests (/api/schemes/match)
  // ---------------------------------------------------------
  console.log("\n--- 4. Testing /api/schemes/match ---");

  // Case A: Student Profile Matching
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

  // Case B: High Income Boundary -> Zero Match
  {
    const req = new NextRequest("http://localhost/api/schemes/match", {
      method: "POST",
      body: JSON.stringify({
        state: "Tamil Nadu",
        age: 30,
        annualIncome: 2000000, // ₹20 Lakhs
        occupation: "salaried",
        isStudent: false,
        areaType: "urban",
      }),
    });
    const res = await schemesHandler(req);
    const data = await res.json();
    assert(data.totalMatched === 0, "Scheme matcher returns 0 matches for high-income profile");
  }

  console.log("\n=================================================");
  console.log(`   Tests Completed: ${passed} Passed, ${failed} Failed`);
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("API Contract Test Runner Error:", err);
  process.exit(1);
});
