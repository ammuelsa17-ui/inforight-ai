"use client";

import React, { useState, useEffect, useRef } from "react";
import { VoiceInputState } from "@/types/voice";
import {
  SPEECH_LANGUAGE_REGISTRY,
  resolveSpeechLanguageConfig,
  getAllSpeechLanguages,
  SpeechLanguageConfig
} from "@/lib/voice/speech-language-registry";
import { BharatSpeechRecognizer } from "@/lib/voice/speech-recognition";
import { transcribeAudio } from "@/services/language";
import { BharatLanguageCode } from "@/lib/language/types";
import {
  Mic,
  MicOff,
  X,
  RotateCcw,
  Check,
  Globe,
  AlertCircle,
  ShieldCheck,
  Edit3,
  Loader2
} from "lucide-react";

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmTranscript: (transcript: string) => void;
  initialText?: string;
  fieldLabel?: string;
  defaultLanguageCode?: BharatLanguageCode | string;
}

export default function VoiceInputModal({
  isOpen,
  onClose,
  onConfirmTranscript,
  initialText = "",
  fieldLabel = "Describe your issue",
  defaultLanguageCode = "ta-IN"
}: VoiceInputModalProps) {
  const initialConfig = resolveSpeechLanguageConfig(defaultLanguageCode);
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<BharatLanguageCode>(initialConfig.code);
  const [voiceState, setVoiceState] = useState<VoiceInputState>("IDLE");
  const [interimText, setInterimText] = useState("");
  const [finalText, setFinalText] = useState(initialText);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPermissionDenied, setIsPermissionDenied] = useState(false);
  const [isSarvamProcessing, setIsSarvamProcessing] = useState(false);
  const [recognitionMode, setRecognitionMode] = useState<"BROWSER_SPEECH" | "SARVAM_STT">("BROWSER_SPEECH");

  const recognizerRef = useRef<BharatSpeechRecognizer | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const currentConfig: SpeechLanguageConfig = resolveSpeechLanguageConfig(selectedLanguageCode);
  const allLanguages = getAllSpeechLanguages();

  // Sync initial language code prop when opened
  useEffect(() => {
    if (isOpen && defaultLanguageCode) {
      const resolved = resolveSpeechLanguageConfig(defaultLanguageCode);
      setSelectedLanguageCode(resolved.code);
    }
  }, [isOpen, defaultLanguageCode]);

  // Initialize Speech Recognizer
  useEffect(() => {
    if (typeof window !== "undefined") {
      recognizerRef.current = new BharatSpeechRecognizer(
        {
          onStateChange: (state) => setVoiceState(state),
          onInterimTranscript: (interim) => setInterimText(interim),
          onFinalTranscript: (final) => {
            setFinalText(final);
            setErrorMessage(null);
          },
          onError: (err) => {
            if (err.isPermissionDenied) {
              setIsPermissionDenied(true);
              setErrorMessage(err.message);
            } else if (err.isUnsupported) {
              // Fallback to server-side Sarvam STT automatically
              setRecognitionMode("SARVAM_STT");
              setErrorMessage(
                `Browser speech recognition is not reliable for ${currentConfig.name}. Using Sarvam Multilingual Speech Recognition instead.`
              );
            } else {
              setErrorMessage(err.message);
            }
          }
        },
        currentConfig.bcp47SpeechLocale
      );
    }

    return () => {
      if (recognizerRef.current) {
        recognizerRef.current.stopListening();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Update language in recognizer whenever user changes language
  useEffect(() => {
    if (recognizerRef.current) {
      recognizerRef.current.setLanguage(currentConfig.bcp47SpeechLocale);
    }
  }, [currentConfig.bcp47SpeechLocale]);

  if (!isOpen) return null;

  const handleStartListening = async () => {
    setErrorMessage(null);
    setIsPermissionDenied(false);

    // If browser supports SpeechRecognition and it's marked reliable, try browser first
    const hasBrowserSpeech = recognizerRef.current?.isAvailable() && currentConfig.isBrowserReliable;

    if (hasBrowserSpeech && recognitionMode === "BROWSER_SPEECH") {
      if (recognizerRef.current) {
        recognizerRef.current.setLanguage(currentConfig.bcp47SpeechLocale);
        recognizerRef.current.startListening(finalText);
      }
      return;
    }

    // Otherwise use high-fidelity server-side Sarvam STT recording
    try {
      if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        setErrorMessage("Microphone audio recording is not supported in this browser. Please type your problem.");
        return;
      }

      setVoiceState("REQUESTING_PERMISSION");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioChunksRef.current = [];

      // Determine best supported MIME
      let mimeType = "audio/webm";
      if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
        mimeType = "audio/webm;codecs=opus";
      } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
        mimeType = "audio/mp4";
      } else if (MediaRecorder.isTypeSupported("audio/ogg")) {
        mimeType = "audio/ogg";
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        setIsSarvamProcessing(true);
        setVoiceState("PROCESSING");

        try {
          const res = await transcribeAudio(audioBlob, currentConfig.code);
          if (res.transcript && res.transcript.trim()) {
            setFinalText((prev) => (prev ? `${prev.trim()} ${res.transcript}` : res.transcript));
            setVoiceState("TRANSCRIPT_READY");
            setErrorMessage(null);
          } else {
            setVoiceState("IDLE");
            setErrorMessage("No speech was detected. Please try speaking clearly into your microphone.");
          }
        } catch (err: any) {
          setVoiceState("ERROR");
          setErrorMessage(err.message || "Voice recognition is temporarily unavailable. Please type your problem.");
        } finally {
          setIsSarvamProcessing(false);
          if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
          }
        }
      };

      mediaRecorder.start();
      setVoiceState("LISTENING");
    } catch (err: any) {
      setVoiceState("ERROR");
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setIsPermissionDenied(true);
        setErrorMessage("Microphone permission was denied. Please allow microphone access in your browser address bar.");
      } else {
        setErrorMessage("Unable to access microphone: " + (err.message || "Unknown error"));
      }
    }
  };

  const handleStopListening = () => {
    if (recognizerRef.current && voiceState === "LISTENING") {
      recognizerRef.current.stopListening();
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  const handleReset = () => {
    if (recognizerRef.current) {
      recognizerRef.current.reset();
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setInterimText("");
    setFinalText("");
    setErrorMessage(null);
    setVoiceState("IDLE");
  };

  const handleConfirm = () => {
    handleStopListening();
    const confirmed = finalText.trim();
    if (confirmed) {
      onConfirmTranscript(confirmed);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Bharat Multilingual Voice Input</h2>
              <span className="text-xs text-slate-500">
                Voice input language: <strong className="text-indigo-700">{currentConfig.name}</strong> ({currentConfig.nativeName})
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              handleStopListening();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-auto flex-1 space-y-5 text-xs">
          {/* Spoken Language Dropdown Selection */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-600" />
                <span>Select Voice Input Language:</span>
              </span>
              <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                Locale: {currentConfig.bcp47SpeechLocale}
              </span>
            </label>
            <select
              value={selectedLanguageCode}
              onChange={(e) => {
                const newCode = e.target.value as BharatLanguageCode;
                setSelectedLanguageCode(newCode);
                const conf = resolveSpeechLanguageConfig(newCode);
                if (recognizerRef.current) {
                  recognizerRef.current.setLanguage(conf.bcp47SpeechLocale);
                }
              }}
              disabled={voiceState === "LISTENING" || isSarvamProcessing}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium text-slate-900 text-xs cursor-pointer"
            >
              {allLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name} — {lang.nativeName} ({lang.bcp47SpeechLocale})
                </option>
              ))}
            </select>
          </div>

          {/* Active Speaking State Visualizer */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
            {voiceState === "LISTENING" ? (
              <button
                type="button"
                onClick={handleStopListening}
                className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg animate-pulse transition-transform hover:scale-105"
                title="Tap to Stop Listening"
              >
                <MicOff className="w-7 h-7" />
              </button>
            ) : isSarvamProcessing ? (
              <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Loader2 className="w-7 h-7 animate-spin" />
              </div>
            ) : (
              <button
                type="button"
                onClick={handleStartListening}
                className="w-16 h-16 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-md transition-transform hover:scale-105"
                title={`Tap to speak in ${currentConfig.name}`}
              >
                <Mic className="w-7 h-7" />
              </button>
            )}

            <div>
              <div className="font-bold text-slate-900 text-sm">
                {voiceState === "LISTENING"
                  ? `Listening in ${currentConfig.name} (${currentConfig.nativeName})...`
                  : isSarvamProcessing
                  ? "Transcribing with Sarvam Multilingual STT..."
                  : voiceState === "REQUESTING_PERMISSION"
                  ? "Requesting microphone permission..."
                  : voiceState === "TRANSCRIPT_READY"
                  ? "Transcript ready — review before confirming"
                  : `Tap microphone to speak in ${currentConfig.name}`}
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                {voiceState === "LISTENING"
                  ? "Speak clearly in your selected language. Tap the red button when finished."
                  : `Target voice recognition language: ${currentConfig.name} (${currentConfig.bcp47SpeechLocale})`}
              </span>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Voice Recognition Notice:</span>
                <span>{errorMessage}</span>
                {isPermissionDenied && (
                  <span className="block mt-1 text-[11px] font-semibold text-rose-900">
                    To enable: Click the site lock icon in your browser address bar and set Microphone to "Allow".
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Transcript Review & Inline Edit Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                <span>Recognized Transcript in {currentConfig.name} (Editable)</span>
              </label>
              {finalText && (
                <button
                  onClick={handleReset}
                  className="text-[11px] text-slate-500 hover:text-rose-600 inline-flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            <textarea
              rows={4}
              value={finalText}
              onChange={(e) => setFinalText(e.target.value)}
              placeholder={`Your spoken words in ${currentConfig.name} will appear here. You can refine and edit directly before confirming.`}
              className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-slate-900 text-xs leading-relaxed"
            />

            {interimText && (
              <p className="text-[11px] text-indigo-600 italic animate-pulse">
                Hearing: "{interimText}"...
              </p>
            )}
          </div>

          {/* Privacy Guarantee Note */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Zero Audio Storage:</strong> Voice recognition transcripts are processed in memory and never stored on InfoRight servers without your consent.
            </span>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 text-xs">
          <button
            type="button"
            onClick={() => {
              handleStopListening();
              onClose();
            }}
            className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-200/60 font-semibold transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!finalText.trim()}
            onClick={handleConfirm}
            className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-white shadow-xs transition-colors ${
              finalText.trim()
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-slate-300 cursor-not-allowed"
            }`}
          >
            <Check className="w-4 h-4" />
            <span>Confirm &amp; Use Text</span>
          </button>
        </div>
      </div>
    </div>
  );
}
