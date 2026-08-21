import { processTranslationRequest } from "../src/lib/translation/translation-service";

async function runLiveBhashiniTest() {
  console.log("=================================================================");
  console.log("   InfoRight AI — BHASHINI Live Integration Test (Opt-in)       ");
  console.log("=================================================================\n");

  const apiKey = process.env.BHASHINI_API_KEY;
  const userId = process.env.BHASHINI_USER_ID;

  if (!apiKey || !userId) {
    console.log("[SKIP] BHASHINI credentials (BHASHINI_API_KEY / BHASHINI_USER_ID) not configured.");
    console.log("Live provider test skipped cleanly without error.\n");
    process.exit(0);
  }

  console.log("BHASHINI server-side credentials detected. Initiating 2-step pipeline call (English → Tamil)...");

  const startTime = Date.now();
  const res = await processTranslationRequest(
    {
      title: "Public Information Officer",
      summary: "Municipal road repair dispute in Coimbatore",
      citationIds: ["RTI_ACT_2005"],
    },
    "ta"
  );
  const latencyMs = Date.now() - startTime;

  console.log(`\nHTTP Outcome Summary:`);
  console.log(`- Requested Language: ${res.requestedLanguage}`);
  console.log(`- Resolved Language:  ${res.resolvedLanguage}`);
  console.log(`- Provider Name:      ${res.provider}`);
  console.log(`- Translated Status:  ${res.translated}`);
  console.log(`- Latency:            ${latencyMs} ms`);
  console.log(`- Disclaimer:         ${res.disclaimer}`);
  console.log(`- Citation ID Check:  ${res.translatedFields?.citationIds?.[0]}`);

  console.log("\n=================================================================");
  console.log("   BHASHINI Live Integration Test Completed Successfully");
  console.log("=================================================================\n");
}

runLiveBhashiniTest().catch((err) => {
  console.error("BHASHINI Live Test Error:", err);
  process.exit(1);
});
