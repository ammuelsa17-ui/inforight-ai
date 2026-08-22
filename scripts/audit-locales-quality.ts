import fs from "fs";
import path from "path";

const localesDir = path.join(process.cwd(), "src/i18n/locales");
const files = fs.readdirSync(localesDir).filter(f => f.endsWith(".ts") && f !== "schema.ts" && f !== "en.ts");

const coreKeysToCheck: [string, string][] = [
  ["common", "submit"],
  ["common", "cancel"],
  ["common", "save"],
  ["common", "loading"],
  ["common", "search"],
  ["common", "close"],
  ["common", "downloadPdf"],
  ["common", "print"],
  ["common", "status"],
  ["common", "action"],
  ["common", "language"],
  ["common", "statutoryDisputeNav"],
  ["ask", "statusVerified"],
  ["ask", "statusSuggested"],
  ["ask", "statusCitizenConfirmed"],
  ["ask", "statusVerificationRequired"],
  ["ask", "streetLayer"],
  ["ask", "satelliteLayer"],
  ["ask", "adminDetailsToggle"],
  ["ask", "multipleLocalitiesNotice"],
  ["ask", "selectLocalityPrompt"],
  ["ask", "pageTitle"],
  ["ask", "pageSubtitle"],
  ["ask", "useCurrentLocation"],
  ["ask", "btnStartVoice"],
  ["ask", "btnStopRecording"],
  ["nav", "home"],
  ["nav", "rtiDrafting"],
  ["nav", "rightsNavigator"],
  ["nav", "welfareSchemes"],
  ["nav", "officialSources"],
  ["nav", "resources"],
  ["nav", "dashboard"],
  ["nav", "describeProblem"]
];

async function run() {
  console.log("Accurate Core Key Audit across 22 non-English locales:\n");
  for (const file of files) {
    const filePath = path.join(localesDir, file);
    const mod = await import(filePath);
    const exportKey = Object.keys(mod).find(k => k.endsWith("Locale")) || "default";
    const dict = mod[exportKey] || mod.default || mod;

    let englishCount = 0;
    const englishKeys: string[] = [];

    for (const [section, key] of coreKeysToCheck) {
      const val = dict[section]?.[key];
      if (!val) {
        englishKeys.push(`${section}.${key} (MISSING)`);
        englishCount++;
      } else if (typeof val === "string" && /^[A-Za-z0-9\s.,!?:;\-–—()/'"&]+$/.test(val)) {
        const trimmed = val.trim();
        if (trimmed.length > 2 && !["RTI", "PIO", "FAA", "PDF", "GPS", "SHA-256", "InfoRight AI", "Sarvam"].includes(trimmed)) {
          englishKeys.push(`${section}.${key}="${val}"`);
          englishCount++;
        }
      }
    }

    console.log(`${file.padEnd(8)}: ${englishCount} English strings out of ${coreKeysToCheck.length}`);
    if (englishKeys.length > 0) {
      console.log(`   Sample: ${englishKeys.slice(0, 6).join(", ")}`);
    }
  }
}

run().catch(console.error);
