import fs from "fs";
import path from "path";

const localesDir = path.join(process.cwd(), "src/i18n/locales");
const files = fs.readdirSync(localesDir).filter(f => f.endsWith(".ts") && f !== "schema.ts" && f !== "en.ts");

const SCRIPT_REQUIREMENTS: Record<string, { name: string; regex: RegExp }> = {
  "as.ts": { name: "Assamese/Bengali", regex: /[\u0980-\u09FF]/ },
  "bn.ts": { name: "Bengali", regex: /[\u0980-\u09FF]/ },
  "gu.ts": { name: "Gujarati", regex: /[\u0A80-\u0AFF]/ },
  "kn.ts": { name: "Kannada", regex: /[\u0C80-\u0CFF]/ },
  "ml.ts": { name: "Malayalam", regex: /[\u0D00-\u0D7F]/ },
  "od.ts": { name: "Odia", regex: /[\u0B00-\u0B7F]/ },
  "pa.ts": { name: "Gurmukhi", regex: /[\u0A00-\u0A7F]/ },
  "ta.ts": { name: "Tamil", regex: /[\u0B80-\u0BFF]/ },
  "te.ts": { name: "Telugu", regex: /[\u0C00-\u0C7F]/ },
  "ur.ts": { name: "Urdu/Arabic", regex: /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/ },
  "sat.ts": { name: "Ol Chiki", regex: /[\u1C50-\u1C7F]/ },
  "mni.ts": { name: "Meitei Mayek", regex: /[\uABC0-\uABFF]/ },
  "hi.ts": { name: "Devanagari", regex: /[\u0900-\u097F]/ },
  "mr.ts": { name: "Devanagari", regex: /[\u0900-\u097F]/ },
  "ne.ts": { name: "Devanagari", regex: /[\u0900-\u097F]/ },
  "kok.ts": { name: "Devanagari", regex: /[\u0900-\u097F]/ },
  "sa.ts": { name: "Devanagari", regex: /[\u0900-\u097F]/ },
  "mai.ts": { name: "Devanagari", regex: /[\u0900-\u097F]/ },
  "doi.ts": { name: "Devanagari", regex: /[\u0900-\u097F]/ },
  "brx.ts": { name: "Devanagari", regex: /[\u0900-\u097F]/ }
};

const coreKeys = [
  "nav.home", "nav.rtiDrafting", "nav.rightsNavigator", "nav.welfareSchemes", "nav.resources", "nav.dashboard", "nav.describeProblem",
  "common.submit", "common.cancel", "common.loading", "common.save", "common.search", "common.close", "common.backToHome",
  "home.title", "home.subtitle", "home.cta",
  "ask.pageTitle", "ask.pageSubtitle", "ask.pinCodeLabel", "ask.useCurrentLocation", "ask.btnStartVoice", "ask.btnStopRecording",
  "ask.statusVerified", "ask.statusSuggested", "ask.statusCitizenConfirmed", "ask.statusVerificationRequired",
  "ask.streetLayer", "ask.satelliteLayer", "ask.adminDetailsToggle"
];

async function runScriptAwareAudit() {
  console.log("Script-Aware Core Key Quality Audit across 22 non-English locales:\n");
  let failed = false;

  for (const file of files) {
    const filePath = path.join(localesDir, file);
    const mod = await import(filePath);
    const exportKey = Object.keys(mod).find(k => k.endsWith("Locale")) || "default";
    const dict = mod[exportKey] || mod.default || mod;

    const scriptSpec = SCRIPT_REQUIREMENTS[file];
    let missing = 0;
    let wrongScript = 0;

    for (const k of coreKeys) {
      const [sec, sub] = k.split(".");
      const val = dict[sec]?.[sub];
      if (!val) {
        missing++;
      } else if (scriptSpec && typeof val === "string") {
        const trimmed = val.trim();
        if (!["RTI", "PIO", "FAA", "PDF", "GPS", "SHA-256", "InfoRight AI", "Sarvam"].includes(trimmed)) {
          if (!scriptSpec.regex.test(val)) {
            console.log(`  [FLAGGED] in ${file}: ${k}="${val}" (expected ${scriptSpec.name})`);
            wrongScript++;
          }
        }
      }
    }

    const pass = missing === 0 && wrongScript === 0;
    console.log(`${file.padEnd(8)}: ${pass ? "PASS" : "FAIL"} (missing: ${missing}, wrong script/English: ${wrongScript})`);
    if (!pass) failed = true;
  }

  if (failed) {
    console.error("\n❌ Locale quality audit failed. Genuine localized content required.");
    process.exit(1);
  } else {
    console.log("\n✅ All 22 non-English locales passed script-aware core validation!");
  }
}

runScriptAwareAudit().catch((err) => {
  console.error("Audit error:", err);
  process.exit(1);
});
