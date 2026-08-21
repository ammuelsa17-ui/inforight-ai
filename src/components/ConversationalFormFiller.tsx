"use client";

import React, { useState } from "react";
import { MessageSquare, Send, CheckCircle2, RefreshCw, FileText, ShieldCheck, Sparkles } from "lucide-react";

interface InterviewStep {
  id: number;
  question: string;
  fieldKey: string;
  placeholder: string;
  options?: string[];
}

const INTERVIEW_STEPS: InterviewStep[] = [
  {
    id: 1,
    question: "What civic issue or dispute are you facing today?",
    fieldKey: "issue",
    placeholder: "e.g. Deep potholes along DB Road near RS Puram causing congestion...",
    options: [
      "Broken road & potholes repair",
      "E-commerce defective laptop refund denial",
      "Landlord withholding security deposit",
      "Employer withholding monthly salary",
    ],
  },
  {
    id: 2,
    question: "Which State and District does this concern?",
    fieldKey: "location",
    placeholder: "e.g. Tamil Nadu, Coimbatore",
    options: ["Tamil Nadu, Coimbatore", "Karnataka, Bengaluru", "Maharashtra, Mumbai", "Delhi, New Delhi"],
  },
  {
    id: 3,
    question: "What specific government body or party is involved?",
    fieldKey: "authority",
    placeholder: "e.g. Coimbatore City Municipal Corporation (CCMC)...",
    options: [
      "Coimbatore City Municipal Corporation",
      "National Consumer Helpline / Seller",
      "State Rent Authority / Landlord",
      "Labour Commissioner / Employer",
    ],
  },
  {
    id: 4,
    question: "What specific resolution, records, or certified documents do you require?",
    fieldKey: "relief",
    placeholder: "e.g. Certified copy of work order, measurement book, and defect liability register...",
    options: [
      "Certified work orders & road inspection logs",
      "Full product refund of ₹45,000 via NCH 1915",
      "Refund of ₹50,000 security deposit under Rent Act",
      "Release of 2 months unpaid salary & Form 16",
    ],
  },
];

export function ConversationalFormFiller() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({
    issue: "",
    location: "",
    authority: "",
    relief: "",
  });
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ sender: "bot" | "user"; text: string }>>([
    {
      sender: "bot",
      text: "Hello! I am your Conversational Form-Filler. I'll interview you step-by-step to auto-populate your official RTI or Rights application.",
    },
    {
      sender: "bot",
      text: INTERVIEW_STEPS[0].question,
    },
  ]);

  const currentStep = INTERVIEW_STEPS[currentStepIndex];

  const handleAnswerSubmit = (answerText: string) => {
    if (!answerText.trim()) return;

    const key = currentStep.fieldKey;
    const updatedData = { ...formData, [key]: answerText };
    setFormData(updatedData);

    const newHistory = [
      ...chatHistory,
      { sender: "user" as const, text: answerText },
    ];

    if (currentStepIndex < INTERVIEW_STEPS.length - 1) {
      const nextStep = INTERVIEW_STEPS[currentStepIndex + 1];
      newHistory.push({ sender: "bot" as const, text: nextStep.question });
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      newHistory.push({
        sender: "bot" as const,
        text: "Great job! All details collected. Your official application draft on the right has been auto-populated.",
      });
    }

    setChatHistory(newHistory);
    setInputValue("");
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setFormData({ issue: "", location: "", authority: "", relief: "" });
    setInputValue("");
    setChatHistory([
      {
        sender: "bot",
        text: "Hello! I am your Conversational Form-Filler. I'll interview you step-by-step to auto-populate your official RTI or Rights application.",
      },
      {
        sender: "bot",
        text: INTERVIEW_STEPS[0].question,
      },
    ]);
  };

  const isComplete = currentStepIndex === INTERVIEW_STEPS.length - 1 && Boolean(formData.relief);

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 text-white p-4 sm:p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
              Conversational Form-Filler
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                Direction #4
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Interactive interview assistant that auto-populates official application forms in real-time
            </p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Restart Interview
        </button>
      </div>

      {/* Main Split Body */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
        {/* Left Column: Conversational Assistant */}
        <div className="p-4 sm:p-6 flex flex-col justify-between h-[480px]">
          {/* Chat Messages Log */}
          <div className="space-y-4 overflow-y-auto pr-2 flex-1 mb-4 scrollbar-thin">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    AI
                  </div>
                )}
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input & Quick Options Area */}
          <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            {/* Quick Option Chips */}
            {currentStep?.options && currentStepIndex < INTERVIEW_STEPS.length && (
              <div className="flex flex-wrap gap-1.5">
                {currentStep.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswerSubmit(opt)}
                    className="text-[11px] bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full hover:bg-blue-100 transition-colors text-left"
                  >
                    + {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Form Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAnswerSubmit(inputValue);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={currentStep?.placeholder || "Type your response..."}
                disabled={currentStepIndex >= INTERVIEW_STEPS.length}
                className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || currentStepIndex >= INTERVIEW_STEPS.length}
                className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Live Auto-Populated Form Preview */}
        <div className="p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-950/50 flex flex-col justify-between h-[480px] overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                  Live Auto-Populated Application Draft
                </h4>
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Live Syncing
              </span>
            </div>

            {/* Document Draft Canvas */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-xs font-mono space-y-3 shadow-inner">
              <div className="text-center font-bold border-b border-slate-200 dark:border-slate-800 pb-2 text-slate-800 dark:text-slate-200">
                FORMAL APPLICATION DRAFT
              </div>

              <div>
                <span className="text-slate-400 uppercase text-[10px]">Target Authority:</span>
                <p className="font-semibold text-blue-700 dark:text-blue-300">
                  {formData.authority || "[Auto-populating authority...]"}
                </p>
              </div>

              <div>
                <span className="text-slate-400 uppercase text-[10px]">Jurisdiction & Location:</span>
                <p className="text-slate-700 dark:text-slate-300">
                  {formData.location || "[Auto-populating jurisdiction...]"}
                </p>
              </div>

              <div>
                <span className="text-slate-400 uppercase text-[10px]">Subject Matter / Issue:</span>
                <p className="text-slate-700 dark:text-slate-300 italic">
                  {formData.issue ? `"${formData.issue}"` : "[Auto-populating subject issue...]"}
                </p>
              </div>

              <div>
                <span className="text-slate-400 uppercase text-[10px]">Requested Relief / Public Records:</span>
                <p className="text-slate-700 dark:text-slate-300">
                  {formData.relief || "[Auto-populating requested records...]"}
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Footnote */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Client-side form synthesis
            </span>
            {isComplete && (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Ready for Print / Copy
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationalFormFiller;
