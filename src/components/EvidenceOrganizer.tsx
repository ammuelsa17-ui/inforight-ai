"use client";

import React, { useState } from "react";
import { EvidenceFileItem } from "@/lib/statutory/types";
import { Paperclip, Trash2, ShieldCheck, Eye, UploadCloud, AlertCircle } from "lucide-react";

export function EvidenceOrganizer() {
  const [files, setFiles] = useState<EvidenceFileItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<EvidenceFileItem["category"]>("Photograph");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setError(null);
    const newItems: EvidenceFileItem[] = [];

    Array.from(selectedFiles).forEach((f) => {
      if (f.size > 5 * 1024 * 1024) {
        setError(`File '${f.name}' exceeds the maximum allowed size limit of 5MB.`);
        return;
      }

      const item: EvidenceFileItem = {
        id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: f.name,
        type: f.type,
        sizeBytes: f.size,
        category: selectedCategory,
        objectUrl: URL.createObjectURL(f),
      };
      newItems.push(item);
    });

    setFiles((prev) => [...prev, ...newItems]);
    e.target.value = ""; // Reset file input
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target?.objectUrl) {
        URL.revokeObjectURL(target.objectUrl);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-lg">
            <Paperclip className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Client-Side Evidence Organizer
            </h4>
            <p className="text-xs text-slate-500">
              Attach supporting photos, receipts & notices locally in your browser memory
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Notice Banner */}
      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 rounded-xl text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          Files remain in your browser unless you explicitly submit/upload them.
        </span>
        <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold">100% In-Memory</span>
      </div>

      {/* Upload Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="w-full sm:w-1/2">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Evidence Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as EvidenceFileItem["category"])}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="Photograph">Photograph / Site Condition</option>
            <option value="Complaint acknowledgement">Complaint Acknowledgement</option>
            <option value="Government letter/order">Government Letter / Order</option>
            <option value="Receipt">Receipt / Tax Invoice</option>
            <option value="Notice">Legal Notice / Memo</option>
            <option value="Supporting document">Supporting Document</option>
            <option value="Other">Other Document</option>
          </select>
        </div>

        <div className="w-full sm:w-1/2 pt-4 sm:pt-0">
          <label className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-sm">
            <UploadCloud className="w-4 h-4" />
            <span>Select Local File (Max 5MB)</span>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* File Items Grid */}
      {files.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                {file.type.startsWith("image/") ? (
                  /* Thumbnail preview */
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={file.objectUrl}
                    alt={file.name}
                    className="w-9 h-9 rounded-lg object-cover border border-slate-300 dark:border-slate-700 shrink-0"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    <Paperclip className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  </div>
                )}
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{file.name}</p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{file.category}</span>
                    <span>•</span>
                    <span>{formatFileSize(file.sizeBytes)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <a
                  href={file.objectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  title="Preview Local File"
                >
                  <Eye className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => handleRemoveFile(file.id)}
                  className="p-1.5 text-slate-500 hover:text-red-600 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  title="Remove File"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 text-xs">
          No local evidence files attached yet. Select a file above to add photographs or receipts.
        </div>
      )}
    </div>
  );
}

export default EvidenceOrganizer;
