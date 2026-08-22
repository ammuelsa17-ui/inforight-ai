"use client";

import React, { useState, useEffect, useRef } from "react";
import { TtsPlaybackState } from "@/types/voice";
import { BharatTextToSpeechPlayer } from "@/lib/voice/text-to-speech";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Square,
  AlertCircle
} from "lucide-react";

interface ReadAloudButtonProps {
  textToRead: string;
  languageLocale?: string;
  className?: string;
}

export default function ReadAloudButton({
  textToRead,
  languageLocale = "en-IN",
  className = ""
}: ReadAloudButtonProps) {
  const [playbackState, setPlaybackState] = useState<TtsPlaybackState>("IDLE");
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const playerRef = useRef<BharatTextToSpeechPlayer | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      playerRef.current = new BharatTextToSpeechPlayer({
        onStateChange: (state) => {
          setPlaybackState(state);
          if (state !== "VOICE_UNAVAILABLE") setErrorMessage(null);
        },
        onError: (err) => setErrorMessage(err)
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.stop();
      }
    };
  }, []);

  const handlePlayOrResume = () => {
    if (!playerRef.current) return;
    if (playbackState === "PAUSED") {
      playerRef.current.resume();
    } else {
      playerRef.current.setRate(speechRate);
      playerRef.current.speak(textToRead, languageLocale);
    }
  };

  const handlePause = () => {
    if (playerRef.current) {
      playerRef.current.pause();
    }
  };

  const handleStop = () => {
    if (playerRef.current) {
      playerRef.current.stop();
    }
  };

  const handleCycleRate = () => {
    const nextRate = speechRate === 1.0 ? 1.25 : speechRate === 1.25 ? 0.75 : 1.0;
    setSpeechRate(nextRate);
    if (playerRef.current) {
      playerRef.current.setRate(nextRate);
    }
  };

  if (!textToRead || textToRead.trim().length === 0) return null;

  return (
    <div className={`inline-flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs ${className}`}>
      {playbackState === "PLAYING" ? (
        <>
          <button
            type="button"
            onClick={handlePause}
            className="p-1.5 rounded-lg bg-white text-slate-800 hover:bg-slate-50 font-semibold shadow-xs flex items-center gap-1 transition-colors"
            title="Pause speech"
          >
            <Pause className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-[11px]">Pause</span>
          </button>
          <button
            type="button"
            onClick={handleStop}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 transition-colors"
            title="Stop speech"
          >
            <Square className="w-3.5 h-3.5" />
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={handlePlayOrResume}
          className="px-2.5 py-1 rounded-lg bg-white text-slate-800 hover:text-indigo-600 font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
          title="Read answer aloud"
        >
          <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
          <span className="text-[11px]">{playbackState === "PAUSED" ? "Resume" : "Read Aloud"}</span>
        </button>
      )}

      {/* Speed Selector */}
      <button
        type="button"
        onClick={handleCycleRate}
        className="px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-500 hover:text-slate-900 bg-slate-200/60 transition-colors font-mono"
        title="Adjust speech speed"
      >
        {speechRate}x
      </button>

      {errorMessage && (
        <span className="text-[10px] text-amber-700 pl-1" title={errorMessage}>
          (Voice note: {errorMessage})
        </span>
      )}
    </div>
  );
}
