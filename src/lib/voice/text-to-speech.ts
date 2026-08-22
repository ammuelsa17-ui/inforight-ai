import { TtsPlaybackState } from "@/types/voice";
import { findBestTtsVoice } from "./voice-capabilities";

export interface TtsPlayerHandlers {
  onStateChange: (state: TtsPlaybackState) => void;
  onError?: (errorMessage: string) => void;
}

export class BharatTextToSpeechPlayer {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private handlers: TtsPlayerHandlers;
  private speechRate: number = 1.0;
  private voices: SpeechSynthesisVoice[] = [];

  constructor(handlers: TtsPlayerHandlers) {
    this.handlers = handlers;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (this.synth) {
      this.voices = this.synth.getVoices() || [];
    }
  }

  public isSupported(): boolean {
    return !!this.synth;
  }

  public setRate(rate: number) {
    // Safe bounds 0.75x to 1.25x
    this.speechRate = Math.min(Math.max(rate, 0.75), 1.25);
    if (this.currentUtterance) {
      this.currentUtterance.rate = this.speechRate;
    }
  }

  public speak(text: string, languageLocale: string = "en-IN") {
    if (!this.synth) {
      this.handlers.onStateChange("VOICE_UNAVAILABLE");
      if (this.handlers.onError) {
        this.handlers.onError("Text-to-speech is not supported on this browser.");
      }
      return;
    }

    this.stop();

    if (!text || text.trim().length === 0) return;

    try {
      const cleanText = text
        .replace(/[*#_`]/g, "") // Clean markdown symbols
        .replace(/https?:\/\/[^\s]+/g, "link") // Simplify URLs
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = this.speechRate;
      utterance.pitch = 1.0;
      utterance.lang = languageLocale;

      const matchingVoice = findBestTtsVoice(languageLocale, this.voices);
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      utterance.onstart = () => {
        this.handlers.onStateChange("PLAYING");
      };

      utterance.onpause = () => {
        this.handlers.onStateChange("PAUSED");
      };

      utterance.onresume = () => {
        this.handlers.onStateChange("PLAYING");
      };

      utterance.onend = () => {
        this.handlers.onStateChange("STOPPED");
        this.currentUtterance = null;
      };

      utterance.onerror = (event) => {
        console.warn("TTS playback error:", event);
        this.handlers.onStateChange("STOPPED");
        if (this.handlers.onError) {
          this.handlers.onError("Playback error occurred.");
        }
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    } catch (err: any) {
      console.warn("TTS speak exception:", err);
      this.handlers.onStateChange("VOICE_UNAVAILABLE");
    }
  }

  public pause() {
    if (this.synth && this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      this.handlers.onStateChange("PAUSED");
    }
  }

  public resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
      this.handlers.onStateChange("PLAYING");
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.handlers.onStateChange("STOPPED");
      this.currentUtterance = null;
    }
  }
}
