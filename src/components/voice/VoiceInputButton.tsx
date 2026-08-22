"use client";

import React, { useState } from "react";
import { Mic } from "lucide-react";
import VoiceInputModal from "./VoiceInputModal";

interface VoiceInputButtonProps {
  onTranscriptConfirmed: (transcript: string) => void;
  fieldLabel?: string;
  className?: string;
  defaultLanguageId?: string;
}

export default function VoiceInputButton({
  onTranscriptConfirmed,
  fieldLabel = "Voice input",
  className = "",
  defaultLanguageId = "ta"
}: VoiceInputButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold shadow-xs transition-colors ${className}`}
        title="Speak in your regional language"
      >
        <Mic className="w-3.5 h-3.5 text-indigo-600" />
        <span>Speak Problem</span>
      </button>

      <VoiceInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirmTranscript={onTranscriptConfirmed}
        fieldLabel={fieldLabel}
        defaultLanguageId={defaultLanguageId}
      />
    </>
  );
}
