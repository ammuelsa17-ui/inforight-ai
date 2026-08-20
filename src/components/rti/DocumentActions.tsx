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
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
            isEditing
              ? "bg-teal-600 text-white border-teal-500 hover:bg-teal-500"
              : "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700"
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditing ? "Save Edits" : "Edit Application"}</span>
        </button>
      )}

      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-teal-400" />
            <span className="text-teal-400">Copied!</span>
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
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition-colors"
      >
        <Printer className="w-4 h-4" />
        <span>Print Document</span>
      </button>

      <button
        onClick={onDownloadPdf || handlePrint}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-teal-600 text-white hover:bg-teal-500 transition-colors shadow-sm"
      >
        <Printer className="w-4 h-4" />
        <span>Print / Save as PDF</span>
      </button>
    </div>
  );
}
