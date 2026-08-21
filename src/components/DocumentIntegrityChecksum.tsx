"use client";

import React, { useState, useEffect } from "react";
import { Hash, Copy, Check, ShieldCheck } from "lucide-react";

interface DocumentIntegrityChecksumProps {
  documentText: string;
}

export function DocumentIntegrityChecksum({ documentText }: DocumentIntegrityChecksumProps) {
  const [hash, setHash] = useState<string>("Calculating hash...");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function computeSha256() {
      if (!documentText) {
        setHash("N/A");
        return;
      }

      try {
        if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
          const encoder = new TextEncoder();
          const data = encoder.encode(documentText);
          const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
          setHash(hashHex);
        } else {
          setHash("Web Crypto API unavailable");
        }
      } catch {
        setHash("Hash calculation error");
      }
    }

    computeSha256();
  }, [documentText]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Browser fallback
    }
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
            Document Integrity Checksum (SHA-256)
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="text-[11px] text-slate-600 dark:text-slate-400 hover:text-blue-600 flex items-center gap-1 font-medium"
          aria-label="Copy SHA-256 integrity hash to clipboard"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? "Copied" : "Copy Hash"}</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2 font-mono text-[11px] text-slate-800 dark:text-slate-200 break-all select-all">
        {hash}
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
        <span>Integrity checksum — helps detect whether this draft has been modified after generation.</span>
      </div>
    </div>
  );
}

export default DocumentIntegrityChecksum;
