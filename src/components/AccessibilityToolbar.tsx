"use client";

import React, { useState, useEffect } from "react";
import { VolumeX, Pause, Play, ZoomIn, Contrast } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface AccessibilityToolbarProps {
  textToRead?: string;
}

export function AccessibilityToolbar({ textToRead }: AccessibilityToolbarProps) {
  const { t, selectedLanguage } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<"normal" | "large" | "xlarge">("normal");
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlaySpeech = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    if (!textToRead) return;

    window.speechSynthesis.cancel(); // Stop any ongoing speech
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    utterance.lang = selectedLanguage || "en-IN";

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePauseSpeech = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStopSpeech = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const toggleFontSize = () => {
    if (fontSizeLevel === "normal") {
      setFontSizeLevel("large");
      document.documentElement.style.fontSize = "18px";
    } else if (fontSizeLevel === "large") {
      setFontSizeLevel("xlarge");
      document.documentElement.style.fontSize = "20px";
    } else {
      setFontSizeLevel("normal");
      document.documentElement.style.fontSize = "16px";
    }
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle("high-contrast");
  };

  return (
    <div className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs shadow-md">
      <span className="font-bold text-[10px] uppercase tracking-wider text-slate-400">{t("accessibility.title")}</span>

      {/* Read Aloud Controls */}
      <div className="flex items-center gap-1 border-r border-slate-700 pr-2">
        {!isPlaying ? (
          <button
            onClick={handlePlaySpeech}
            className="p-1 hover:bg-slate-800 rounded text-slate-200 hover:text-white flex items-center gap-1"
            title={t("accessibility.readAloudTitle")}
            aria-label={t("accessibility.readAloudAria")}
          >
            <Play className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline text-[11px]">{t("accessibility.readAloud")}</span>
          </button>
        ) : (
          <button
            onClick={handlePauseSpeech}
            className="p-1 hover:bg-slate-800 rounded text-amber-400 flex items-center gap-1"
            title={t("accessibility.pauseTitle")}
            aria-label={t("accessibility.pauseAria")}
          >
            <Pause className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">{t("accessibility.pause")}</span>
          </button>
        )}

        {(isPlaying || isPaused) && (
          <button
            onClick={handleStopSpeech}
            className="p-1 hover:bg-slate-800 rounded text-red-400"
            title={t("accessibility.stopTitle")}
            aria-label={t("accessibility.stopAria")}
          >
            <VolumeX className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Font Size Scaler */}
      <button
        onClick={toggleFontSize}
        className="p-1 hover:bg-slate-800 rounded text-slate-200 hover:text-white flex items-center gap-1 border-r border-slate-700 pr-2"
        title={t("accessibility.toggleFontTitle")}
        aria-label={`Current font size level ${fontSizeLevel}. Click to change font size`}
      >
        <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
        <span className="text-[11px] font-mono font-bold">
          {fontSizeLevel === "normal" ? "A" : fontSizeLevel === "large" ? "A+" : "A++"}
        </span>
      </button>

      {/* High Contrast Toggle */}
      <button
        onClick={toggleHighContrast}
        className={`p-1 rounded flex items-center gap-1 ${
          highContrast ? "bg-amber-400 text-slate-950 font-bold" : "hover:bg-slate-800 text-slate-200"
        }`}
        title={t("accessibility.toggleContrastTitle")}
        aria-label={t("accessibility.toggleContrastAria")}
      >
        <Contrast className="w-3.5 h-3.5" />
        <span className="hidden sm:inline text-[11px]">{t("accessibility.contrast")}</span>
      </button>
    </div>
  );
}

export default AccessibilityToolbar;
