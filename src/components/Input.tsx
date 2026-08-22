"use client";

import React, { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Search, UploadCloud, Mic, MicOff, AlertCircle } from "lucide-react";

// Generic Input component
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = "",
  id,
  type = "text",
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-bold text-[#526176] uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-[#172033] text-sm placeholder-[#94A3B8] transition-all focus:outline-none ${
          error
            ? "border-[#EF4444] focus:ring-1 focus:ring-[#EF4444]"
            : "border-[#BCD7EE] focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
        } ${className}`}
        {...props}
      />
      {error ? (
        <p className="text-xs text-[#EF4444] flex items-center gap-1 font-medium mt-1">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-[#526176] mt-1">{helperText}</p>
      ) : null}
    </div>
  );
};

// Textarea Component
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  className = "",
  id,
  rows = 4,
  ...props
}) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={textareaId} className="block text-xs font-bold text-[#526176] uppercase tracking-wider">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-[#172033] text-sm placeholder-[#94A3B8] transition-all focus:outline-none ${
          error
            ? "border-[#EF4444] focus:ring-1 focus:ring-[#EF4444]"
            : "border-[#BCD7EE] focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
        } ${className}`}
        {...props}
      />
      {error ? (
        <p className="text-xs text-[#EF4444] flex items-center gap-1 font-medium mt-1">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-[#526176] mt-1">{helperText}</p>
      ) : null}
    </div>
  );
};

// SearchInput Component
interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (query: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  className = "",
  placeholder = "Search resources...",
  onChange,
  onSearch,
  ...props
}) => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
      <input
        type="search"
        placeholder={placeholder}
        onChange={(e) => {
          onChange?.(e);
          onSearch?.(e.target.value);
        }}
        className={`w-full pl-10 pr-4 py-2.5 bg-white border border-[#BCD7EE] rounded-lg text-[#172033] text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] ${className}`}
        {...props}
      />
    </div>
  );
};

// Select Component
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  className = "",
  id,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-bold text-[#526176] uppercase tracking-wider">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-[#172033] text-sm transition-all focus:outline-none cursor-pointer ${
          error
            ? "border-[#EF4444] focus:ring-1 focus:ring-[#EF4444]"
            : "border-[#BCD7EE] focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-xs text-[#EF4444] flex items-center gap-1 font-medium mt-1">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
};

// File Upload Area
interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFilesSelected,
  maxFiles = 3,
  accept = ".pdf,.jpg,.jpeg,.png,.doc,.docx",
  error
}) => {
  const { t } = useLanguage();
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const processFiles = (filesList: FileList | null) => {
    if (!filesList) return;
    const selected: File[] = [];
    for (let i = 0; i < Math.min(filesList.length, maxFiles); i++) {
      selected.push(filesList[i]);
    }
    onFilesSelected(selected);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    processFiles(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  };

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-150 ${
          isDragActive
            ? "border-indigo-primary bg-indigo-primary/5"
            : "border-borders hover:border-indigo-primary/50 hover:bg-slate-50/50"
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept={accept}
          multiple
          className="hidden"
        />
        <UploadCloud className="h-8 w-8 text-secondary-text mb-2.5" />
        <span className="text-sm font-semibold text-dark-text block">{t("evidence.selectFileLabel")}</span>
        <span className="text-xs text-secondary-text mt-1 block">
          {t("evidence.privacyNotice")}
        </span>
        <span className="text-[10px] text-secondary-text/80 mt-1 block">Max {maxFiles} files</span>
      </div>
      {error && <span className="text-xs text-danger-red font-medium mt-1 block">{error}</span>}
    </div>
  );
};

// Voice Input Button
interface VoiceInputButtonProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({
  isRecording,
  onStartRecording,
  onStopRecording
}) => {
  return (
    <button
      type="button"
      onClick={isRecording ? onStopRecording : onStartRecording}
      className={`p-3 rounded-full flex items-center justify-center transition-all ${
        isRecording
          ? "bg-danger-red text-white animate-pulse"
          : "bg-sky-blue/10 text-indigo-primary hover:bg-sky-blue/20"
      } cursor-pointer`}
      title={isRecording ? "Stop recording voice input" : "Start voice dictation"}
    >
      {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
    </button>
  );
};

export { Textarea as TextArea };
