export type TranslationProvider = "staticDictionary" | "bhashini" | "englishFallback";

export type TranslationErrorCode =
  | "PROVIDER_NOT_CONFIGURED"
  | "UNSUPPORTED_LANGUAGE_PAIR"
  | "CONFIG_TIMEOUT"
  | "CONFIG_INVALID"
  | "COMPUTE_TIMEOUT"
  | "COMPUTE_INVALID"
  | "OUTPUT_COUNT_MISMATCH"
  | "HOST_NOT_ALLOWED"
  | "FREE_TEXT_PII_DETECTED"
  | "INVALID_FIELD_TYPE";

export interface TranslateRequest {
  sourceLanguage?: string;
  targetLanguage: string;
  fields: Record<string, string | string[]>;
}

export interface BhashiniPipelineConfigResponse {
  pipelineResponseConfig: Array<{
    taskType: string;
    config: Array<{
      serviceId: string;
      language: {
        sourceLanguage: string;
        targetLanguage: string;
      };
    }>;
  }>;
  pipelineInferenceAPIEndPoint: {
    callbackUrl: string;
    inferenceApiKey: {
      name: string;
      value: string;
    };
  };
}

export interface BhashiniComputeResponse {
  pipelineResponse: Array<{
    taskType: string;
    output: Array<{
      source: string;
      target: string;
    }>;
  }>;
}

export interface TranslationResult {
  requestedLanguage: string;
  resolvedLanguage: string;
  provider: TranslationProvider;
  translated: boolean;
  disclaimer: string;
  translatedFields: Record<string, string | string[]>;
  errorCode?: TranslationErrorCode;
  latencyMs?: number;
}
