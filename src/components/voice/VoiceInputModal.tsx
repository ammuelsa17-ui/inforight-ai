"use client";

import React, { useState, useEffect, useRef } from "react";
import { VoiceInputState, VoiceLanguage, VoiceRecognitionError } from "@/types/voice";
import { BHARAT_LANGUAGES, getLanguageById } from "@/data/voice/languages";
import { BharatSpeechRecognizer } from "@/lib/voice/speech-recognition";
import { checkBrowserVoiceCapabilities } from "@/lib/voice/voice-capabilities";
import {
  Mic,
  MicOff,
  X,
  RotateCcw,
  Check,
  Globe,
  AlertCircle,
  ShieldCheck,
  Volume2,
  Edit3
} from "lucide-react";

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmTranscript: (transcript: string) => void;
  initialText?: string;
  fieldLabel?: string;
  defaultLanguageId?: string;
}

export default function VoiceInputModal({
  isOpen,
  onClose,
  onConfirmTranscript,
  initialText = "",
  fieldLabel = "Describe your issue",
  defaultLanguageId = "ta"
}: VoiceInputModalProps) {
  const [selectedLangId, setSelectedLangId] = useState(defaultLanguageId);
  const [voiceState, setVoiceState] = useState<VoiceInputState>("IDLE");
  const [interimText, setInterimText] = useState("");
  const [finalText, setFinalText] = useState(initialText);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPermissionDenied, setIsPermissionDenied] = useState(false);

  const recognizerRef = useRef<BharatSpeechRecognizer | null>(null);
  const selectedLang = getLanguageById(selectedLangId);

  // Initialize Speech Recognizer
  useEffect(() => {
    if (typeof window !== "undefined") {
      recognizerRef.current = new BharatSpeechRecognizer({
        onStateChange: (state) => setVoiceState(state),
        onInterimTranscript: (interim) => setInterimText(interim),
        onFinalTranscript: (final) => {
          setFinalText(final);
          setErrorMessage(null);
        },
        onError: (err) => {
          setErrorMessage(err.message);
          if (err.isPermissionDenied) {
            setIsPermissionDenied(true);
          }
        }
      });
    }

    return () => {
      if (recognizerRef.current) {
        recognizerRef.current.stopListening();
      }
    };
  }, []);

  // Update language in recognizer
  useEffect(() => {
    if (recognizerRef.current) {
      recognizerRef.current.setLanguage(selectedLang.recognition_locale);
    }
  }, [selectedLang]);

  if (!isOpen) return null;

  const handleStartListening = () => {
    setErrorMessage(null);
    setIsPermissionDenied(false);
    if (recognizerRef.current) {
      recognizerRef.current.setLanguage(selectedLang.recognition_locale);
      recognizerRef.current.startListening(finalText);
    }
  };

  const handleStopListening = () => {
    if (recognizerRef.current) {
      recognizerRef.current.stopListening();
    }
  };

  const handleReset = () => {
    if (recognizerRef.current) {
      recognizerRef.current.reset();
    }
    setInterimText("");
    setFinalText("");
    setErrorMessage(null);
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
              <h2 className="text-base font-bold text-slate-900">Bharat Voice Input</h2>
              <span className="text-xs text-slate-500">
                Speak your legal/civic problem in your regional language.
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
          {/* Language Selection Row */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              <span>Select Spoken Language (23 Official Indian Languages)</span>
            </label>
            <select
              value={selectedLangId}
              onChange={(e) => setSelectedLangId(e.target.value)}
              disabled={voiceState === "LISTENING"}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium text-slate-900 text-xs"
            >
              {BHARAT_LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.display_name} — {lang.native_name} ({lang.recognition_locale})
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
            ) : (
              <button
                type="button"
                onClick={handleStartListening}
                className="w-16 h-16 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-md transition-transform hover:scale-105"
                title="Tap to Speak"
              >
                <Mic className="w-7 h-7" />
              </button>
            )}

            <div>
              <div className="font-bold text-slate-900 text-sm">
                {voiceState === "LISTENING"
                  ? `Listening in ${selectedLang.display_name} (${selectedLang.native_name})...`
                  : voiceState === "REQUESTING_PERMISSION"
                  ? "Requesting microphone permission..."
                  : voiceState === "TRANSCRIPT_READY"
                  ? "Transcript ready — review before confirming"
                  : `Tap microphone to speak in ${selectedLang.display_name}`}
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                {voiceState === "LISTENING"
                  ? "Speak clearly. Tap the red button when finished."
                  : "Speech is recognized into text locally using your browser service."}
              </span>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Speech Recognition Note:</span>
                <span>{errorMessage}</span>
                {isPermissionDenied && (
                  <span className="block mt-1 text-[11px] font-semibold text-rose-900">
                    To enable: Click the site lock/settings icon in your browser address bar and set Microphone to "Allow".
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
                <span>Recognized Transcript (Editable)</span>
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
              placeholder="Your spoken words will appear here. You can also edit and refine the text directly before confirming."
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
              <strong>Privacy First:</strong> Voice is processed through your device's native speech recognition. Audio recordings are never uploaded or stored on InfoRight servers.
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
