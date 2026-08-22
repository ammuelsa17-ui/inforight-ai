"use client";

import React, { useState } from "react";
import { Mic } from "lucide-react";
import VoiceInputModal from "./VoiceInputModal";
import { BharatLanguageCode } from "@/lib/language/types";
import { useLanguage } from "@/context/LanguageContext";
import { resolveSpeechLanguageConfig } from "@/lib/voice/speech-language-registry";

interface VoiceInputButtonProps {
  onTranscriptConfirmed: (transcript: string) => void;
  fieldLabel?: string;
  className?: string;
  defaultLanguageCode?: BharatLanguageCode | string;
}

export default function VoiceInputButton({
  onTranscriptConfirmed,
  fieldLabel = "Voice input",
  className = "",
  defaultLanguageCode
}: VoiceInputButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedLanguage } = useLanguage();

  // Prefer explicitly provided language, otherwise bind seamlessly to citizen's currently selected UI language
  const effectiveLanguageCode = defaultLanguageCode || selectedLanguage || "ta-IN";
  const speechConfig = resolveSpeechLanguageConfig(effectiveLanguageCode);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold shadow-xs transition-colors ${className}`}
        title={`Speak in ${speechConfig.name} (${speechConfig.nativeName})`}
      >
        <Mic className="w-3.5 h-3.5 text-indigo-600" />
        <span>Voice: {speechConfig.name}</span>
      </button>

      <VoiceInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirmTranscript={onTranscriptConfirmed}
        fieldLabel={fieldLabel}
        defaultLanguageCode={effectiveLanguageCode}
      />
    </>
  );
}
