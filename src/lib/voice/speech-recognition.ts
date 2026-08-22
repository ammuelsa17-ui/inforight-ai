import { VoiceInputState, VoiceRecognitionError } from "@/types/voice";

export interface SpeechRecognitionHandlers {
  onStateChange: (state: VoiceInputState) => void;
  onInterimTranscript: (interim: string) => void;
  onFinalTranscript: (final: string) => void;
  onError: (error: VoiceRecognitionError) => void;
}

export class BharatSpeechRecognizer {
  private recognition: any | null = null;
  private isListening: boolean = false;
  private currentLanguageLocale: string = "ta-IN";
  private handlers: SpeechRecognitionHandlers;
  private accumulatedFinalTranscript: string = "";

  constructor(handlers: SpeechRecognitionHandlers, initialLocale: string = "ta-IN") {
    this.handlers = handlers;
    this.currentLanguageLocale = initialLocale;
    this.initRecognition();
  }

  private initRecognition() {
    if (typeof window === "undefined") return;

    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      return;
    }

    try {
      this.recognition = new SpeechRecognitionClass();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;
      this.recognition.lang = this.currentLanguageLocale;

      this.recognition.onstart = () => {
        this.isListening = true;
        this.handlers.onStateChange("LISTENING");
      };

      this.recognition.onresult = (event: any) => {
        let interimText = "";
        let newFinalText = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            newFinalText += transcript + " ";
          } else {
            interimText += transcript;
          }
        }

        if (newFinalText) {
          this.accumulatedFinalTranscript += newFinalText;
          this.handlers.onFinalTranscript(this.accumulatedFinalTranscript.trim());
        }

        this.handlers.onInterimTranscript(interimText);
      };

      this.recognition.onerror = (event: any) => {
        const error = this.mapSpeechError(event.error);
        this.isListening = false;
        this.handlers.onStateChange("ERROR");
        this.handlers.onError(error);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (this.accumulatedFinalTranscript.trim().length > 0) {
          this.handlers.onStateChange("TRANSCRIPT_READY");
        } else {
          this.handlers.onStateChange("IDLE");
        }
      };
    } catch (err) {
      console.warn("Failed to initialize Web Speech Recognition:", err);
    }
  }

  public isAvailable(): boolean {
    return !!this.recognition;
  }

  public getLanguage(): string {
    return this.currentLanguageLocale;
  }

  public setLanguage(locale: string) {
    if (!locale) return;
    this.currentLanguageLocale = locale;
    if (this.recognition) {
      this.recognition.lang = locale;
    }
  }

  public startListening(initialText: string = "") {
    if (!this.recognition) {
      this.handlers.onStateChange("UNSUPPORTED");
      this.handlers.onError({
        code: "LANGUAGE_NOT_SUPPORTED",
        message: "Speech recognition is not supported in this browser. You can continue by typing.",
        isPermissionDenied: false,
        isUnsupported: true
      });
      return;
    }

    if (this.isListening) {
      this.stopListening();
    }

    this.accumulatedFinalTranscript = initialText ? initialText.trim() + " " : "";
    this.recognition.lang = this.currentLanguageLocale;

    try {
      this.handlers.onStateChange("REQUESTING_PERMISSION");
      this.recognition.start();
    } catch (err: any) {
      if (err.name === "InvalidStateError") {
        // Recognition already started
        this.isListening = true;
        this.handlers.onStateChange("LISTENING");
      } else {
        this.handlers.onStateChange("ERROR");
        this.handlers.onError({
          code: "UNKNOWN_ERROR",
          message: "Unable to start microphone recording: " + (err.message || "Unknown error"),
          isPermissionDenied: false,
          isUnsupported: false
        });
      }
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (err) {
        console.warn("Error stopping speech recognition:", err);
      }
      this.isListening = false;
      this.handlers.onStateChange("PROCESSING");
    }
  }

  public reset() {
    this.stopListening();
    this.accumulatedFinalTranscript = "";
    this.handlers.onInterimTranscript("");
    this.handlers.onFinalTranscript("");
    this.handlers.onStateChange("IDLE");
  }

  private mapSpeechError(errorType: string): VoiceRecognitionError {
    switch (errorType) {
      case "not-allowed":
      case "permission-denied":
        return {
          code: "PERMISSION_DENIED",
          message: "Microphone access was denied. Please allow microphone permissions in your browser address bar to speak.",
          isPermissionDenied: true,
          isUnsupported: false
        };
      case "no-speech":
        return {
          code: "NO_SPEECH",
          message: "No speech detected. Please speak clearly into your microphone.",
          isPermissionDenied: false,
          isUnsupported: false
        };
      case "network":
        return {
          code: "NETWORK_RECOGNITION_ERROR",
          message: "Network error during speech processing. Please check your internet connection.",
          isPermissionDenied: false,
          isUnsupported: false
        };
      case "audio-capture":
        return {
          code: "AUDIO_CAPTURE_ERROR",
          message: "No working microphone was detected on this device.",
          isPermissionDenied: false,
          isUnsupported: false
        };
      case "language-not-supported":
        return {
          code: "LANGUAGE_NOT_SUPPORTED",
          message: `Speech recognition in locale '${this.currentLanguageLocale}' is not supported on this browser.`,
          isPermissionDenied: false,
          isUnsupported: true
        };
      default:
        return {
          code: "UNKNOWN_ERROR",
          message: "An unexpected speech recognition error occurred. You can continue by typing.",
          isPermissionDenied: false,
          isUnsupported: false
        };
    }
  }
}
