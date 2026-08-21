import { TranslateRequest, TranslateResult, TranscribeRequest, TranscribeResult, TTSRequest, TTSResult } from "./types";

export interface BharatLanguageProvider {
  readonly name: string;
  isAvailable(): boolean;
  translate(request: TranslateRequest): Promise<TranslateResult>;
  transcribe(request: TranscribeRequest): Promise<TranscribeResult>;
  synthesizeSpeech(request: TTSRequest): Promise<TTSResult>;
}
