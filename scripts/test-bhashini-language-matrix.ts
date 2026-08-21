import { ALL_SCHEDULED_LANGUAGES } from "../src/i18n/languages";
import { processTranslationRequest } from "../src/lib/translation/translation-service";

async function runBhashiniLanguageMatrixTest() {
  console.log("=================================================================");
  console.log("   InfoRight AI — 22 Scheduled Indian Languages Matrix Audit   ");
  console.log("=================================================================\n");

  const apiKey = process.env.BHASHINI_API_KEY;
  const userId = process.env.BHASHINI_USER_ID;
  const pipelineId = process.env.BHASHINI_PIPELINE_ID;

  const credentialsConfigured = Boolean(apiKey) && Boolean(userId) && Boolean(pipelineId);

  console.log(`Server-Side Credentials Status: ${credentialsConfigured ? "CONFIGURED" : "NOT CONFIGURED (Safe Fallback)"}\n`);

  console.log("| Language Name | Code | Config Status | Provider | Fallback Reason | Latency |");
  console.log("| :--- | :---: | :---: | :---: | :--- | :---: |");

  const testPayload = {
    title: "Public Information Officer",
    summary: "Civic road repair dispute",
  };

  for (const lang of ALL_SCHEDULED_LANGUAGES) {
    if (lang.code === "en") continue; // Skip English self-test

    const startTime = Date.now();
    const res = await processTranslationRequest(testPayload, lang.code, "en");
    const latency = Date.now() - startTime;

    const configStatus = credentialsConfigured ? "Supported" : "Unconfigured";
    const fallbackReason = res.provider === "englishFallback" ? "Credentials Unconfigured" : "N/A (Active)";

    console.log(
      `| ${lang.name.padEnd(14)} | ${lang.code.padEnd(4)} | ${configStatus.padEnd(13)} | ${res.provider.padEnd(15)} | ${fallbackReason.padEnd(23)} | ${latency}ms |`
    );
  }

  console.log("\n=================================================================");
  console.log("   Language Capability Matrix Audit Completed");
  console.log("=================================================================\n");
}

runBhashiniLanguageMatrixTest().catch((err) => {
  console.error("Language Matrix Test Error:", err);
  process.exit(1);
});
