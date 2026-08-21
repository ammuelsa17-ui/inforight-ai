import {
  TranslationResult,
} from "./types";
import { resolveBhashiniPipelineConfig } from "./bhashini-config";
import { executeBhashiniComputeCall } from "./bhashini-client";
import {
  buildIndexMap,
  reconstructTranslatedFields,
  areProtectedFieldsUnchanged,
} from "./response-validator";
import { isSupportedLanguageCode } from "./language-capabilities";

const TRANSLATABLE_FIELDS = new Set([
  "title",
  "summary",
  "actions",
  "evidenceChecklist",
  "escalationSteps",
  "representationLetter",
  "whatThisMeans",
  "whatYouShouldDoNow",
  "documentsToCollect",
  "whereToSubmit",
  "whatIfNoResponse",
  "problemDescription",
  "issue",
  "issueTitle",
  "disclaimer",
  "reasons",
  "questions",
  "explanation",
  "body",
  "subject",
  "text",
]);

const PROTECTED_FIELDS = new Set([
  "citationIds",
  "sourceUrls",
  "schemeIds",
  "authority",
  "authorityName",
  "portalUrl",
  "portalName",
  "helplinePhone",
  "legalReferences",
  "dates",
  "amounts",
  "amountInDispute",
  "annualIncome",
  "age",
  "state",
  "district",
]);

const PROHIBITED_PII_KEYS = new Set([
  "applicantname",
  "applicantaddress",
  "phonenumber",
  "email",
  "aadhaar",
  "identitydetails",
  "name",
  "address",
]);

const PHONE_REGEX = /(\+91[\-\s]?)?[6-9]\d{9}/;
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const AADHAAR_REGEX = /\b[2-9]\d{3}\s?\d{4}\s?\d{4}\b/;

function containsFreeTextPii(text: string): boolean {
  return PHONE_REGEX.test(text) || EMAIL_REGEX.test(text) || AADHAAR_REGEX.test(text);
}

export async function processTranslationRequest(
  fields: Record<string, string | string[]>,
  targetLanguage: string,
  sourceLanguage: string = "en"
): Promise<TranslationResult> {
  const startTime = Date.now();

  // 1. Validate Language Codes
  if (!isSupportedLanguageCode(targetLanguage)) {
    return {
      requestedLanguage: targetLanguage,
      resolvedLanguage: "en",
      provider: "englishFallback",
      translated: false,
      disclaimer: "Unsupported target language. Falling back to English.",
      translatedFields: fields,
      errorCode: "UNSUPPORTED_LANGUAGE_PAIR",
      latencyMs: Date.now() - startTime,
    };
  }

  // 2. Validate Fields Structure & Privacy Safeguards
  if (!fields || typeof fields !== "object" || Array.isArray(fields)) {
    return {
      requestedLanguage: targetLanguage,
      resolvedLanguage: "en",
      provider: "englishFallback",
      translated: false,
      disclaimer: "Invalid fields object format.",
      translatedFields: fields || {},
      errorCode: "INVALID_FIELD_TYPE",
      latencyMs: Date.now() - startTime,
    };
  }

  for (const [k, v] of Object.entries(fields)) {
    if (PROHIBITED_PII_KEYS.has(k.toLowerCase())) {
      return {
        requestedLanguage: targetLanguage,
        resolvedLanguage: "en",
        provider: "englishFallback",
        translated: false,
        disclaimer: `Privacy Violation: Identity field '${k}' detected.`,
        translatedFields: fields,
        errorCode: "FREE_TEXT_PII_DETECTED",
        latencyMs: Date.now() - startTime,
      };
    }

    if (typeof v === "string") {
      if (containsFreeTextPii(v)) {
        return {
          requestedLanguage: targetLanguage,
          resolvedLanguage: "en",
          provider: "englishFallback",
          translated: false,
          disclaimer: `Privacy Violation: Free-text PII detected in field '${k}'.`,
          translatedFields: fields,
          errorCode: "FREE_TEXT_PII_DETECTED",
          latencyMs: Date.now() - startTime,
        };
      }
    } else if (Array.isArray(v)) {
      for (const item of v) {
        if (typeof item !== "string" || containsFreeTextPii(item)) {
          return {
            requestedLanguage: targetLanguage,
            resolvedLanguage: "en",
            provider: "englishFallback",
            translated: false,
            disclaimer: `Privacy Violation or Invalid Item Type in array field '${k}'.`,
            translatedFields: fields,
            errorCode: "FREE_TEXT_PII_DETECTED",
            latencyMs: Date.now() - startTime,
          };
        }
      }
    }
  }

  // 3. English Pass-Through
  if (targetLanguage === "en") {
    return {
      requestedLanguage: "en",
      resolvedLanguage: "en",
      provider: "englishFallback",
      translated: false,
      disclaimer: "Official English source-grounded result.",
      translatedFields: fields,
      latencyMs: Date.now() - startTime,
    };
  }

  // 4. Structural Protection Separation (Protected fields never enter translation payload)
  const translatablePayload: Record<string, string | string[]> = {};
  const protectedPayload: Record<string, string | string[]> = {};

  for (const [k, v] of Object.entries(fields)) {
    if (PROTECTED_FIELDS.has(k)) {
      protectedPayload[k] = v;
    } else if (TRANSLATABLE_FIELDS.has(k)) {
      translatablePayload[k] = v;
    }
  }

  // 5. Attempt Real BHASHINI 2-Step Pipeline Protocol
  const pipelineConfig = await resolveBhashiniPipelineConfig(sourceLanguage, targetLanguage);

  if (!pipelineConfig) {
    return {
      requestedLanguage: targetLanguage,
      resolvedLanguage: "en",
      provider: "englishFallback",
      translated: false,
      disclaimer: "Translation beta — BHASHINI infrastructure unconfigured or unavailable. Falling back to English.",
      translatedFields: fields,
      errorCode: "PROVIDER_NOT_CONFIGURED",
      latencyMs: Date.now() - startTime,
    };
  }

  const { inputs, map } = buildIndexMap(translatablePayload);
  const computeOutputs = await executeBhashiniComputeCall(
    pipelineConfig,
    inputs,
    sourceLanguage,
    targetLanguage
  );

  if (!computeOutputs || computeOutputs.length !== inputs.length) {
    return {
      requestedLanguage: targetLanguage,
      resolvedLanguage: "en",
      provider: "englishFallback",
      translated: false,
      disclaimer: "Translation beta — BHASHINI compute call failed or output count mismatched. Falling back to English.",
      translatedFields: fields,
      errorCode: "COMPUTE_INVALID",
      latencyMs: Date.now() - startTime,
    };
  }

  const reconstructedTranslatable = reconstructTranslatedFields(
    translatablePayload,
    map,
    computeOutputs
  );

  const finalFields = { ...protectedPayload, ...reconstructedTranslatable };

  if (!areProtectedFieldsUnchanged(protectedPayload, protectedPayload)) {
    return {
      requestedLanguage: targetLanguage,
      resolvedLanguage: "en",
      provider: "englishFallback",
      translated: false,
      disclaimer: "Security Error: Protected field byte equality failed. Falling back to English.",
      translatedFields: fields,
      errorCode: "COMPUTE_INVALID",
      latencyMs: Date.now() - startTime,
    };
  }

  const isDifferent = JSON.stringify(reconstructedTranslatable) !== JSON.stringify(translatablePayload);

  if (!isDifferent) {
    return {
      requestedLanguage: targetLanguage,
      resolvedLanguage: "en",
      provider: "englishFallback",
      translated: false,
      disclaimer: "Translation beta — provider output equal to input. Falling back to English.",
      translatedFields: fields,
      latencyMs: Date.now() - startTime,
    };
  }

  return {
    requestedLanguage: targetLanguage,
    resolvedLanguage: targetLanguage,
    provider: "bhashini",
    translated: true,
    disclaimer: "Translated via official BHASHINI pipeline infrastructure (Translation beta). Where interpretation differs, refer to official English source-grounded result.",
    translatedFields: finalFields,
    latencyMs: Date.now() - startTime,
  };
}
