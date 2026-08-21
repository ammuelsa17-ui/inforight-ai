import { processTranslationRequest } from "../src/lib/translation/translation-service";
import { clearConfigCache } from "../src/lib/translation/translation-cache";

async function runTranslationUnitTests() {
  console.log("=================================================================");
  console.log("   InfoRight AI — Translation Service & Safety Unit Tests      ");
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

  clearConfigCache();

  // Test 1: Unconfigured Credentials Honest English Fallback
  {
    const res = await processTranslationRequest({ title: "Public Information Officer" }, "ta");
    assert(res.provider === "englishFallback", "Unconfigured credentials returns provider 'englishFallback'");
    assert(res.translated === false, "Unconfigured credentials returns translated === false");
    assert(res.resolvedLanguage === "en", "Unconfigured credentials resolves language to 'en'");
  }

  // Test 2: Protected Citation IDs Byte Equality Preservation
  {
    const res = await processTranslationRequest(
      { citationIds: ["RTI_ACT_2005"], title: "PIO" },
      "hi"
    );
    assert(res.translatedFields.citationIds?.[0] === "RTI_ACT_2005", "Protected citationIds remain 100% unchanged");
  }

  // Test 3: Free-Text Phone Number Detection -> Error Code
  {
    const res = await processTranslationRequest(
      { text: "Call me at 9876543210 for details." },
      "ta"
    );
    assert(res.errorCode === "FREE_TEXT_PII_DETECTED", "Free-text phone number triggers FREE_TEXT_PII_DETECTED");
  }

  // Test 4: Free-Text Email Detection -> Error Code
  {
    const res = await processTranslationRequest(
      { text: "Contact citizen@example.com for details." },
      "hi"
    );
    assert(res.errorCode === "FREE_TEXT_PII_DETECTED", "Free-text email triggers FREE_TEXT_PII_DETECTED");
  }

  // Test 5: Free-Text Aadhaar Pattern Detection -> Error Code
  {
    const res = await processTranslationRequest(
      { text: "Aadhaar number 2345 6789 0123 provided." },
      "ta"
    );
    assert(res.errorCode === "FREE_TEXT_PII_DETECTED", "Free-text Aadhaar pattern triggers FREE_TEXT_PII_DETECTED");
  }

  // Test 6: Case-Insensitive PII Identity Key Detection
  {
    const res = await processTranslationRequest(
      { APPLICANTNAME: "Leaked Name" },
      "hi"
    );
    assert(res.errorCode === "FREE_TEXT_PII_DETECTED", "Identity key APPLICANTNAME triggers FREE_TEXT_PII_DETECTED");
  }

  // Test 7: Unsupported Target Language -> Error Code
  {
    const res = await processTranslationRequest(
      { title: "Test" },
      "invalid_lang_code"
    );
    assert(res.errorCode === "UNSUPPORTED_LANGUAGE_PAIR", "Unsupported target language triggers UNSUPPORTED_LANGUAGE_PAIR");
  }

  // Test 8: English Target Pass-Through
  {
    const res = await processTranslationRequest(
      { title: "Public Information Officer" },
      "en"
    );
    assert(res.provider === "englishFallback" && res.translated === false, "English target returns englishFallback and translated === false");
  }

  console.log("\n=================================================================");
  console.log(`   Translation Unit Tests Completed: ${passed} Passed, ${failed} Failed`);
  console.log("=================================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runTranslationUnitTests().catch((err) => {
  console.error("Translation Unit Test Runner Error:", err);
  process.exit(1);
});
