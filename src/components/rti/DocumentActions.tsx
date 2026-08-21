"use client";

import React, { useState } from "react";
import { Edit3, Copy, Printer, Check } from "lucide-react";

interface DocumentActionsProps {
  onCopy?: () => void;
  onPrint?: () => void;
  onDownloadPdf?: () => void;
  isEditing?: boolean;
  onToggleEdit?: () => void;
}

export default function DocumentActions({
  onCopy,
  onPrint,
  onDownloadPdf,
  isEditing = false,
  onToggleEdit,
}: DocumentActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (onCopy) {
      onCopy();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 no-print">
      {onToggleEdit && (
        <button
          onClick={onToggleEdit}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border ${
            isEditing
              ? "bg-[#4F46E5] text-white border-[#4338CA] hover:bg-[#4338CA]"
              : "bg-white text-[#102A56] border-[#BCD7EE] hover:bg-[#F4F9FF]"
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditing ? "Save Edits" : "Edit Application"}</span>
        </button>
      )}

      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-white text-[#102A56] border border-[#BCD7EE] hover:bg-[#F4F9FF] transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-[#0F9D76]" />
            <span className="text-[#0F9D76]">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            <span>Copy to Clipboard</span>
          </>
        )}
      </button>

      <button
        onClick={handlePrint}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-white text-[#102A56] border border-[#BCD7EE] hover:bg-[#F4F9FF] transition-colors"
      >
        <Printer className="w-4 h-4" />
        <span>Print Document</span>
      </button>

      <button
        onClick={onDownloadPdf || handlePrint}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-colors shadow-sm"
      >
        <Printer className="w-4 h-4" />
        <span>Print / Save as PDF</span>
      </button>
    </div>
  );
}
