import fs from "fs";
import path from "path";
import { extractCoreTranslationKeys } from "./extract-core-keys";

const localesDir = path.join(process.cwd(), "src/i18n/locales");
const files = fs.readdirSync(localesDir).filter(f => f.endsWith(".ts") && f !== "schema.ts" && f !== "en.ts");

const SCRIPT_REQUIREMENTS: Record<string, { name: string; regex: RegExp; forbiddenRegex?: RegExp }> = {
  "as.ts": {
    name: "Assamese/Bengali",
    regex: /[\u0980-\u09FF]/,
    forbiddenRegex: /[\u0904-\u0939\u0A00-\u0A7F\u0A80-\u0AFF]/
  },
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

const ALLOWLISTED_ACRONYMS = new Set([
  "RTI", "PIO", "FAA", "PDF", "GPS", "SHA-256", "InfoRight AI", "Sarvam", "NCH 1915", "e-Jagriti", "SAMADHAN 2.0"
]);

function getVal(dict: any, k: string) {
  const parts = k.split(".");
  let cur = dict;
  for (const p of parts) {
    if (!cur) return undefined;
    cur = cur[p];
  }
  return cur;
}

export async function runFullLanguageAudit(options: { failOnLeakage?: boolean } = {}) {
  const extractedKeys = extractCoreTranslationKeys();
  console.log(`=====================================================================`);
  console.log(`INFORIGHT AI — RUNTIME LANGUAGE AUDIT (SINGLE-SOURCE EXTRACTOR)`);
  console.log(`=====================================================================`);
  console.log(`Total runtime t() keys extracted from components: ${extractedKeys.length}\n`);

  let totalFailedLocales = 0;
  const perLocaleStats: Record<string, { missing: number; forbidden: number; englishLeak: number; status: string }> = {};

  for (const file of files) {
    const filePath = path.join(localesDir, file);
    const mod = await import(filePath);
    const exportKey = Object.keys(mod).find(k => k.endsWith("Locale")) || "default";
    const dict = mod[exportKey] || mod.default || mod;

    const scriptSpec = SCRIPT_REQUIREMENTS[file];
    let missing = 0;
    let forbidden = 0;
    let englishLeak = 0;

    for (const k of extractedKeys) {
      const val = getVal(dict, k);
      if (val === undefined || val === null || val === "") {
        missing++;
      } else if (typeof val === "string") {
        const trimmed = val.trim();
        if (scriptSpec?.forbiddenRegex && scriptSpec.forbiddenRegex.test(val)) {
          forbidden++;
          console.log(`  [FORBIDDEN SCRIPT] in ${file}: ${k}="${val}"`);
        }
        if (!ALLOWLISTED_ACRONYMS.has(trimmed) && /^[A-Za-z0-9\s.,!?:;\-–—()/'"&]+$/.test(trimmed)) {
          englishLeak++;
        }
      }
    }

    const hasFailure = missing > 0 || forbidden > 0;
    if (hasFailure) {
      totalFailedLocales++;
    }

    perLocaleStats[file] = {
      missing,
      forbidden,
      englishLeak,
      status: hasFailure ? "FAIL" : "PASS"
    };

    console.log(
      `${file.padEnd(8)}: ${perLocaleStats[file].status} | Keys: ${extractedKeys.length} | Missing: ${missing} | ForbiddenScript: ${forbidden} | EnglishDuplicates: ${englishLeak}`
    );
  }

  console.log(`\n=====================================================================`);
  console.log(`SUMMARY: ${files.length - totalFailedLocales} / ${files.length} non-English locales passed structural & script audit`);
  console.log(`=====================================================================\n`);

  if (totalFailedLocales > 0 && options.failOnLeakage !== false) {
    console.error("❌ Language audit failed on structural or script constraints.");
    process.exit(1);
  }

  return {
    extractedKeysCount: extractedKeys.length,
    auditedKeysCount: extractedKeys.length,
    totalFailedLocales,
    perLocaleStats
  };
}

if (process.argv[1] && process.argv[1].endsWith("audit-locales-quality.ts")) {
  runFullLanguageAudit({ failOnLeakage: true }).catch((err) => {
    console.error("Audit error:", err);
    process.exit(1);
  });
}
