"use client";

import React, { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, useState, useRef } from "react";
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
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-xs font-bold text-dark-text uppercase tracking-wide mb-1.5">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-dark-text placeholder:text-secondary-text bg-white shadow-2xs transition-colors focus:border-indigo-primary focus:outline-none ${
          error ? "border-danger-red focus:border-danger-red" : "border-borders"
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="flex items-center gap-1 text-xs text-danger-red font-medium mt-1">
          <AlertCircle className="h-3 w-3 shrink-0" />
          <span>{error}</span>
        </span>
      )}
      {!error && helperText && <span className="text-[11px] text-secondary-text mt-1 block">{helperText}</span>}
    </div>
  );
};

// Generic TextArea component
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  helperText,
  className = "",
  id,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-xs font-bold text-dark-text uppercase tracking-wide mb-1.5">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-dark-text placeholder:text-secondary-text bg-white shadow-2xs transition-colors focus:border-indigo-primary focus:outline-none min-h-[100px] resize-y ${
          error ? "border-danger-red focus:border-danger-red" : "border-borders"
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="flex items-center gap-1 text-xs text-danger-red font-medium mt-1">
          <AlertCircle className="h-3 w-3 shrink-0" />
          <span>{error}</span>
        </span>
      )}
      {!error && helperText && <span className="text-[11px] text-secondary-text mt-1 block">{helperText}</span>}
    </div>
  );
};

// Search Input
export const SearchInput: React.FC<InputProps> = ({
  className = "",
  ...props
}) => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-text" />
      <input
        type="search"
        className={`w-full pl-10 pr-4 py-2 rounded-lg border border-borders text-sm text-dark-text bg-white transition-colors focus:border-indigo-primary focus:outline-none ${className}`}
        {...props}
      />
    </div>
  );
};

// Select Dropdown
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
  helperText?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  helperText,
  className = "",
  id,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-xs font-bold text-dark-text uppercase tracking-wide mb-1.5">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full px-3.5 py-2.5 rounded-lg border border-borders text-sm text-dark-text bg-white shadow-2xs transition-colors focus:border-indigo-primary focus:outline-none appearance-none ${
          error ? "border-danger-red focus:border-danger-red" : "border-borders"
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-danger-red font-medium mt-1 block">{error}</span>}
      {!error && helperText && <span className="text-[11px] text-secondary-text mt-1 block">{helperText}</span>}
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
        <span className="text-sm font-semibold text-dark-text block">Upload supporting documents</span>
        <span className="text-xs text-secondary-text mt-1 block">
          Drag & drop files, or click to browse (PDF, JPEG, PNG up to 10MB)
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
