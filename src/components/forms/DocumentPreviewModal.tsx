"use client";

import React, { useState } from "react";
import {
  X,
  Printer,
  Download,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
  FileText,
  AlertCircle
} from "lucide-react";
import { FormattedDocumentOutput } from "@/lib/forms/document-generator";

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: FormattedDocumentOutput | null;
}

export default function DocumentPreviewModal({
  isOpen,
  onClose,
  document
}: DocumentPreviewModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"formatted" | "plain">("formatted");

  if (!isOpen || !document) return null;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(document.plainText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textArea = window.document.createElement("textarea");
      textArea.value = document.plainText;
      window.document.body.appendChild(textArea);
      textArea.select();
      window.document.execCommand("copy");
      window.document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow pop-ups to print this document.");
      return;
    }
    printWindow.document.write(document.htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([document.htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = `${document.formId}_Application_${Date.now()}.html`;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([document.plainText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = `${document.formId}_Application_${Date.now()}.txt`;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const isOfficial = document.formCategory === "OFFICIAL_PRESCRIBED_FORM";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${
                    isOfficial
                      ? "bg-indigo-100/70 text-indigo-800 border-indigo-200"
                      : "bg-amber-100/70 text-amber-800 border-amber-200"
                  }`}
                >
                  {document.categoryBadge}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {document.formCode || document.formId}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 truncate max-w-md sm:max-w-xl mt-0.5">
                {document.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar Controls */}
        <div className="px-6 py-2.5 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Format Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("formatted")}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                activeTab === "formatted"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Print Preview (A4)
            </button>
            <button
              onClick={() => setActiveTab("plain")}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                activeTab === "plain"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Plain Text
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadTxt}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Download .txt</span>
            </button>

            <button
              onClick={handleDownloadHtml}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Download HTML</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-semibold shadow-sm transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>

        {/* Modal Body: Scrollable Document View */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-100">
          {activeTab === "formatted" ? (
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg border border-slate-200 p-8 sm:p-12 text-slate-800 text-sm font-serif leading-relaxed">
              <div
                dangerouslySetInnerHTML={{
                  __html: document.htmlContent.replace(/<!DOCTYPE html>[\s\S]*?<body[^>]*>/i, "").replace(/<\/body>[\s\S]*?<\/html>/i, "")
                }}
              />
            </div>
          ) : (
            <div className="max-w-3xl mx-auto bg-slate-900 text-slate-100 rounded-lg p-6 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner">
              {document.plainText}
            </div>
          )}

          {/* Step-by-Step Submission Guide */}
          <div className="max-w-2xl mx-auto mt-6 bg-white rounded-xl border border-slate-200 p-5 text-xs text-slate-700 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Submission Instructions &amp; Authority Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div>
                <span className="font-semibold text-slate-500 block">Recipient Authority:</span>
                <span className="font-medium text-slate-800">{document.authority}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-500 block">Statutory Fee:</span>
                <span className="font-medium text-slate-800">{document.statutoryFeeText}</span>
              </div>
              {document.filingPortal && (
                <div className="sm:col-span-2">
                  <span className="font-semibold text-slate-500 block">Official Government Portal:</span>
                  <a
                    href={document.filingPortal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1 mt-0.5"
                  >
                    <span>{document.filingPortal}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            <ol className="space-y-1.5 text-slate-600 pl-4 list-decimal">
              {document.submissionInstructions.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        {/* Modal Bottom Banner: Privacy Guarantee */}
        <div className="px-6 py-3 bg-emerald-50 border-t border-emerald-100 flex items-center justify-between text-xs text-emerald-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>100% Client-Side Privacy:</strong> This document was compiled in your browser memory. No sensitive personal answers were transmitted to external AI servers.
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white border border-emerald-200 text-emerald-900 hover:bg-emerald-100 font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
