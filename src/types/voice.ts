export type BrowserSupportStatus =
  | "FULL_SUPPORT"
  | "STT_ONLY"
  | "TTS_ONLY"
  | "UNAVAILABLE"
  | "UNKNOWN";

export type VoiceInputState =
  | "IDLE"
  | "REQUESTING_PERMISSION"
  | "LISTENING"
  | "PROCESSING"
  | "TRANSCRIPT_READY"
  | "ERROR"
  | "UNSUPPORTED";

export type TtsPlaybackState =
  | "IDLE"
  | "PLAYING"
  | "PAUSED"
  | "STOPPED"
  | "VOICE_UNAVAILABLE";

export interface VoiceLanguage {
  id: string; // e.g. "ta", "hi", "en"
  display_name: string; // "Tamil", "Hindi", "English"
  native_name: string; // "தமிழ்", "हिन्दी", "English"
  locale: string; // "ta-IN", "hi-IN", "en-IN"
  recognition_locale: string;
  tts_locale: string;
  script: string;
  enabled: boolean;
  browser_support_status?: BrowserSupportStatus;
  fallback_available: boolean;
}

export interface VoiceRecognitionError {
  code:
    | "NO_SPEECH"
    | "AUDIO_CAPTURE_ERROR"
    | "PERMISSION_DENIED"
    | "NETWORK_RECOGNITION_ERROR"
    | "LANGUAGE_NOT_SUPPORTED"
    | "RECOGNITION_ABORTED"
    | "UNKNOWN_ERROR";
  message: string;
  isPermissionDenied: boolean;
  isUnsupported: boolean;
}

export interface VoicePreferences {
  preferred_language_id: string;
  speech_rate: number; // 0.75, 1.0, 1.25
  preferred_tts_voice_uri?: string;
  auto_read_aloud: boolean;
}

export interface NumberNormalizationResult {
  originalText: string;
  normalizedValue: number | string;
  type: "PINCODE" | "INCOME" | "AGE" | "NUMBER" | "DATE" | "UNKNOWN";
  formattedDisplay: string;
  confidence: "CONFIRMED_EXACT" | "CANDIDATE_REQUIRES_CONFIRMATION" | "UNABLE_TO_PARSE";
  confirmationPrompt: string;
}
