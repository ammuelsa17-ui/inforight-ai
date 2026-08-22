import fs from "fs";
import path from "path";
import { extractCoreTranslationKeys } from "./extract-core-keys";

const localesDir = path.join(process.cwd(), "src/i18n/locales");
const files = fs.readdirSync(localesDir).filter(f => f.endsWith(".ts") && f !== "schema.ts" && f !== "en.ts");

export const SCRIPT_REQUIREMENTS: Record<string, { name: string; regex: RegExp; forbiddenRegex?: RegExp; isDevanagariShared?: boolean }> = {
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
  "hi.ts": { name: "Devanagari", regex: /[\u0900-\u097F]/, isDevanagariShared: true },
  "mr.ts": { name: "Devanagari", regex: /[\u0900-\u097F]/, isDevanagariShared: true },
  "ne.ts": { name: "Devanagari", regex: /[\u0900-\u097F]/, isDevanagariShared: true },
  "kok.ts": { name: "Devanagari", regex: /[\u0900-\u097F]/, isDevanagariShared: true },
  "sa.ts": { name: "Devanagari", regex: /[\u0900-\u097F]/, isDevanagariShared: true },
  "mai.ts": { name: "Devanagari", regex: /[\u0900-\u097F]/, isDevanagariShared: true },
  "doi.ts": { name: "Devanagari", regex: /[\u0900-\u097F]/, isDevanagariShared: true },
  "brx.ts": { name: "Devanagari", regex: /[\u0900-\u097F]/, isDevanagariShared: true }
};

export const ALLOWLISTED_ACRONYMS = new Set([
  "RTI", "PIO", "FAA", "PDF", "GPS", "SHA-256", "InfoRight AI", "Sarvam", "NCH 1915", "e-Jagriti", "SAMADHAN 2.0"
]);

// Focus scope for zero-English-leakage CI enforcement (Priority Demo Languages)
export const ZERO_LEAKAGE_ENFORCED_LOCALES = new Set([
  "ta.ts",
  "te.ts",
  "as.ts"
]);

export function getNestedValue(dict: any, keyPath: string) {
  const parts = keyPath.split(".");
  let cur = dict;
  for (const p of parts) {
    if (!cur) return undefined;
    cur = cur[p];
  }
  return cur;
}

export function validateSingleLocale(
  langFile: string,
  dict: any,
  keys: string[]
): {
  valid: boolean;
  missing: number;
  forbidden: number;
  wrongScript: number;
  englishLeak: number;
  failureReasons: string[];
} {
  const scriptSpec = SCRIPT_REQUIREMENTS[langFile];
  let missing = 0;
  let forbidden = 0;
  let wrongScript = 0;
  let englishLeak = 0;
  const failureReasons: string[] = [];

  for (const k of keys) {
    const val = getNestedValue(dict, k);
    if (val === undefined || val === null || val === "") {
      missing++;
      failureReasons.push(`Missing key: ${k}`);
    } else if (typeof val === "string") {
      const trimmed = val.trim();
      const isPureEnglish = /^[A-Za-z0-9\s.,!?:;\-–—()/'"&]+$/.test(trimmed);

      if (isPureEnglish && !ALLOWLISTED_ACRONYMS.has(trimmed)) {
        englishLeak++;
        failureReasons.push(`English duplicate in ${langFile}: ${k}="${val}"`);
      } else if (!isPureEnglish && scriptSpec) {
        if (scriptSpec.forbiddenRegex && scriptSpec.forbiddenRegex.test(val)) {
          forbidden++;
          failureReasons.push(`Forbidden script in ${langFile}: ${k}="${val}"`);
        }
        if (!scriptSpec.regex.test(val)) {
          wrongScript++;
          failureReasons.push(`Wrong expected script in ${langFile}: ${k}="${val}" (expected ${scriptSpec.name})`);
        }
      }
    }
  }

  const valid = missing === 0 && forbidden === 0 && wrongScript === 0 && englishLeak === 0;

  return {
    valid,
    missing,
    forbidden,
    wrongScript,
    englishLeak,
    failureReasons
  };
}

export async function runFullLanguageAudit(options: { failOnLeakage?: boolean } = {}) {
  const extractedKeys = extractCoreTranslationKeys();

  // Define closed loop keys for demo journey verification
  const closedLoopPrefixes = [
    "nav.", "common.", "home.", "ask.", "dashboard.", "official.", "resources.",
    "rights.", "sources.", "preview.", "evidence.", "appeal.", "feeCalc.",
    "timelineEngine.", "checksum.", "trustPanel.", "fallbackBanner.", "sidebar.",
    "tracker.", "trust.", "explainer.", "planner."
  ];
  const closedLoopKeys = extractedKeys.filter(k => closedLoopPrefixes.some(p => k.startsWith(p)));

  console.log(`=====================================================================`);
  console.log(`INFORIGHT AI — RUNTIME LANGUAGE AUDIT (SINGLE-SOURCE EXTRACTOR)`);
  console.log(`=====================================================================`);
  console.log(`Total statically discoverable t() keys in app/components: ${extractedKeys.length}`);
  console.log(`Core demo & closed-loop keys audited: ${closedLoopKeys.length}\n`);

  let totalFailedLocales = 0;
  const perLocaleStats: Record<string, any> = {};

  for (const file of files) {
    const filePath = path.join(localesDir, file);
    const mod = await import(filePath);
    const exportKey = Object.keys(mod).find(k => k.endsWith("Locale")) || "default";
    const dict = mod[exportKey] || mod.default || mod;

    // Run validation on closed-loop keys for strict zero-leakage enforcement
    const isEnforced = ZERO_LEAKAGE_ENFORCED_LOCALES.has(file);
    const keysToAudit = isEnforced ? closedLoopKeys : extractedKeys;
    const res = validateSingleLocale(file, dict, keysToAudit);

    // If it is in the enforced set, any defect is a hard failure
    const isFail = isEnforced
      ? !res.valid
      : (res.missing > 0 || res.forbidden > 0);

    if (isFail) {
      totalFailedLocales++;
    }

    perLocaleStats[file] = {
      missing: res.missing,
      forbidden: res.forbidden,
      wrongScript: res.wrongScript,
      englishLeak: res.englishLeak,
      status: isFail ? "FAIL" : "PASS"
    };

    console.log(
      `${file.padEnd(8)}: ${perLocaleStats[file].status} | Keys: ${keysToAudit.length} | Missing: ${res.missing} | EnglishLeak: ${res.englishLeak} | WrongScript: ${res.wrongScript} | ForbiddenScript: ${res.forbidden}${isEnforced ? " [STRICT CLOSED-LOOP]" : ""}`
    );
  }

  console.log(`\n=====================================================================`);
  console.log(`SUMMARY: ${files.length - totalFailedLocales} / ${files.length} non-English locales passed quality gate`);
  console.log(`=====================================================================\n`);

  if (totalFailedLocales > 0 && options.failOnLeakage !== false) {
    console.error(`❌ Language audit failed: ${totalFailedLocales} locale(s) violated structural, script, or zero-leakage constraints.`);
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
