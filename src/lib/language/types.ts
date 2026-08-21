export type BharatLanguageCode =
  | "as-IN" // Assamese
  | "bn-IN" // Bengali
  | "brx-IN" // Bodo
  | "doi-IN" // Dogri
  | "en-IN" // English
  | "gu-IN" // Gujarati
  | "hi-IN" // Hindi
  | "kn-IN" // Kannada
  | "ks-IN" // Kashmiri
  | "kok-IN" // Konkani
  | "mai-IN" // Maithili
  | "ml-IN" // Malayalam
  | "mni-IN" // Manipuri
  | "mr-IN" // Marathi
  | "ne-IN" // Nepali
  | "od-IN" // Odia
  | "pa-IN" // Punjabi
  | "sa-IN" // Sanskrit
  | "sat-IN" // Santali
  | "sd-IN" // Sindhi
  | "ta-IN" // Tamil
  | "te-IN" // Telugu
  | "ur-IN"; // Urdu

export interface LanguageMetadata {
  code: BharatLanguageCode;
  name: string;
  nativeName: string;
  translationSupported: boolean;
  sttSupported: boolean;
  ttsSupported: boolean;
}

export interface TranslateRequest {
  text: string;
  sourceLanguage: BharatLanguageCode;
  targetLanguage: BharatLanguageCode;
}

export interface TranslateResult {
  translatedText: string;
  sourceLanguage: BharatLanguageCode;
  targetLanguage: BharatLanguageCode;
  provider: string;
  fallbackOccurred: boolean;
  disclaimer?: string;
  requestId?: string;
}

export interface TranscribeRequest {
  audioBuffer: Buffer;
  mimeType: string;
  languageCode?: BharatLanguageCode;
}

export interface TranscribeResult {
  transcript: string;
  languageCode: BharatLanguageCode;
  provider: string;
  requestId?: string;
}

export interface TTSRequest {
  text: string;
  languageCode: BharatLanguageCode;
}

export interface TTSResult {
  audioBase64: string;
  audioSegmentsBase64: string[];
  languageCode: BharatLanguageCode;
  mimeType: string;
  provider: string;
  requestId?: string;
}

export interface NormalizedLanguageError {
  error: string;
  code: "MISSING_KEY" | "UNSUPPORTED_LANGUAGE" | "INVALID_REQUEST" | "PAYLOAD_TOO_LARGE" | "RATE_LIMIT" | "PROVIDER_ERROR";
  status: number;
}
