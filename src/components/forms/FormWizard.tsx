"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  OfficialFormDefinition,
  FormFieldDefinition,
  FormFieldDataType
} from "@/types/form-filler";
import { isFieldActive, validateFormField } from "@/data/forms";
import {
  generateFilingDocument,
  FormattedDocumentOutput
} from "@/lib/forms/document-generator";
import DocumentPreviewModal from "./DocumentPreviewModal";
import VoiceInputButton from "@/components/voice/VoiceInputButton";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Save,
  RotateCcw,
  FileCheck,
  Shield,
  HelpCircle,
  FileText,
  AlertCircle,
  Clock,
  Sparkles,
  ExternalLink,
  Edit3
} from "lucide-react";

interface FormWizardProps {
  form: OfficialFormDefinition;
  initialAnswers?: Record<string, any>;
  onComplete?: (output: FormattedDocumentOutput) => void;
}

export default function FormWizard({
  form,
  initialAnswers = {},
  onComplete
}: FormWizardProps) {
  const storageKey = `inforight_draft_${form.form_id}`;

  // Form State
  const [answers, setAnswers] = useState<Record<string, any>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          return { ...initialAnswers, ...JSON.parse(saved) };
        }
      } catch (err) {
        console.warn("Failed to load local draft:", err);
      }
    }
    return initialAnswers;
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [generatedDoc, setGeneratedDoc] = useState<FormattedDocumentOutput | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Compute active fields dynamically based on conditional logic
  const activeFields: FormFieldDefinition[] = useMemo(() => {
    return form.fields.filter((field) => isFieldActive(field, answers));
  }, [form.fields, answers]);

  // Ensure currentStepIndex stays within bounds when active fields change
  useEffect(() => {
    if (currentStepIndex >= activeFields.length && activeFields.length > 0) {
      setCurrentStepIndex(activeFields.length - 1);
    }
  }, [activeFields.length, currentStepIndex]);

  // Auto-save draft locally whenever answers change
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(storageKey, JSON.stringify(answers));
        setSaveStatus("Saved locally");
        const timer = setTimeout(() => setSaveStatus(null), 2000);
        return () => clearTimeout(timer);
      } catch (err) {
        console.warn("Failed to persist draft:", err);
      }
    }
  }, [answers, storageKey]);

  const currentField = activeFields[currentStepIndex];
  const currentValue = currentField ? answers[currentField.field_id] ?? "" : "";

  // Progress Calculation
  const answeredMandatoryCount = activeFields.filter(
    (f) => f.required && answers[f.field_id] !== undefined && answers[f.field_id] !== ""
  ).length;
  const totalMandatoryCount = activeFields.filter((f) => f.required).length;
  const progressPercent =
    totalMandatoryCount > 0
      ? Math.min(100, Math.round((answeredMandatoryCount / totalMandatoryCount) * 100))
      : 0;

  const handleInputChange = (fieldId: string, val: any) => {
    setValidationError(null);
    setAnswers((prev) => ({ ...prev, [fieldId]: val }));
  };

  const handleNext = () => {
    if (!currentField) return;

    // Validate current field
    const validation = validateFormField(currentField, currentValue);
    if (!validation.isValid) {
      setValidationError(validation.errorMessage || "Please enter a valid answer.");
      return;
    }

    setValidationError(null);

    // If on last step, transition to review
    if (currentStepIndex >= activeFields.length - 1) {
      setIsReviewMode(true);
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setValidationError(null);
    if (isReviewMode) {
      setIsReviewMode(false);
      setCurrentStepIndex(activeFields.length - 1);
    } else if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    if (currentField && !currentField.required) {
      setValidationError(null);
      if (currentStepIndex >= activeFields.length - 1) {
        setIsReviewMode(true);
      } else {
        setCurrentStepIndex((prev) => prev + 1);
      }
    }
  };

  const handleClearForm = () => {
    if (window.confirm("Are you sure you want to clear this form? All answers saved on this device will be deleted.")) {
      setAnswers({});
      setCurrentStepIndex(0);
      setIsReviewMode(false);
      setValidationError(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem(storageKey);
      }
    }
  };

  const handleGenerateDocument = () => {
    // Final check on mandatory fields
    const missingFields = activeFields.filter(
      (f) => f.required && (answers[f.field_id] === undefined || answers[f.field_id] === "")
    );

    if (missingFields.length > 0) {
      alert(
        `Please complete the following required question(s) before generating: \n- ${missingFields
          .map((f) => f.official_label)
          .join("\n- ")}`
      );
      return;
    }

    const output = generateFilingDocument(form, answers);
    setGeneratedDoc(output);
    setIsModalOpen(true);
    if (onComplete) onComplete(output);
  };

  const isOfficialPrescribed = form.form_category === "OFFICIAL_PRESCRIBED_FORM";

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Form Context Header Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  isOfficialPrescribed
                    ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                    : "bg-amber-50 text-amber-800 border-amber-200"
                }`}
              >
                {isOfficialPrescribed ? "OFFICIAL PRESCRIBED FORM" : "FILING-READY DRAFT"}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {form.form_code || form.form_id}
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 leading-snug">
              {form.form_name}
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              {form.form_description ||
                `Official statutory application administered by ${form.authority}.`}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            {saveStatus && (
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200 flex items-center gap-1 font-medium animate-in fade-in">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {saveStatus}
              </span>
            )}
            <button
              onClick={handleClearForm}
              title="Clear all saved answers from this device"
              className="text-xs text-slate-500 hover:text-rose-600 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-rose-200 transition-colors inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Form Quick Info Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs text-slate-600">
          <div>
            <span className="font-semibold text-slate-400 block">Authority:</span>
            <span className="font-medium text-slate-800 truncate block">{form.authority}</span>
          </div>
          <div>
            <span className="font-semibold text-slate-400 block">Jurisdiction:</span>
            <span className="font-medium text-slate-800">{form.jurisdiction.state_ut}</span>
          </div>
          <div>
            <span className="font-semibold text-slate-400 block">Statutory Fee:</span>
            <span className="font-medium text-slate-800">{form.submission.statutory_fee || "Nil"}</span>
          </div>
          <div>
            <span className="font-semibold text-slate-400 block">Filing Mode:</span>
            <span className="font-medium text-slate-800">
              {form.submission.online && form.submission.offline
                ? "Online & Offline"
                : form.submission.online
                ? "Online Portal"
                : "Physical Office Counter"}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-medium text-slate-700">
              {isReviewMode
                ? "Step: Final Review & Document Generation"
                : `Question ${currentStepIndex + 1} of ${activeFields.length}`}
            </span>
            <span className="font-bold text-indigo-600">{progressPercent}% Completed</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Wizard Card */}
      {!isReviewMode && currentField ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
          {/* Question Meta */}
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              {currentField.official_label}
            </span>
            <span
              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                currentField.required
                  ? "bg-rose-50 text-rose-700 border border-rose-200"
                  : "bg-slate-100 text-slate-600 border border-slate-200"
              }`}
            >
              {currentField.required ? "Mandatory" : "Optional"}
            </span>
          </div>

          {/* Conversational Question */}
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 leading-snug">
            {currentField.plain_language_question}
          </h2>

          {currentField.help_text && (
            <p className="text-xs text-slate-500 mb-4 flex items-start gap-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>{currentField.help_text}</span>
            </p>
          )}

          {/* Field Input Renderer */}
          <div className="my-6 space-y-2">
            {(currentField.data_type === "text" || currentField.data_type === "string") &&
              !currentField.sensitive && (
                <div className="flex justify-end">
                  <VoiceInputButton
                    onTranscriptConfirmed={(val) => handleInputChange(currentField.field_id, val)}
                    fieldLabel={currentField.plain_language_question}
                  />
                </div>
              )}
            <FieldInput
              field={currentField}
              value={currentValue}
              onChange={(val) => handleInputChange(currentField.field_id, val)}
              onEnterPress={handleNext}
            />

            {validationError && (
              <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium mt-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}
          </div>

          {/* Wizard Action Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 gap-3">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                currentStepIndex === 0
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-700 bg-slate-100 hover:bg-slate-200"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-2">
              {!currentField.required && (
                <button
                  onClick={handleSkip}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Skip
                </button>
              )}

              <button
                onClick={() => setIsReviewMode(true)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors hidden sm:inline-block"
              >
                Review All Answers
              </button>

              <button
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow transition-all"
              >
                <span>{currentStepIndex >= activeFields.length - 1 ? "Review" : "Next"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Review Screen */
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-600" />
                <span>Review &amp; Verify Your Application</span>
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Ensure all particulars are correct. You can click "Edit" on any field to modify your answer before generating the final petition.
              </p>
            </div>
          </div>

          {/* Answers Summary Table */}
          <div className="space-y-3 mb-8">
            {activeFields.map((field, idx) => {
              const val = answers[field.field_id];
              const isAnswered = val !== undefined && val !== null && val !== "";

              return (
                <div
                  key={field.field_id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-4 hover:border-slate-200 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-slate-400 font-mono">
                        #{idx + 1}
                      </span>
                      <span className="text-xs font-semibold text-slate-700">
                        {field.official_label}
                      </span>
                      {field.required && !isAnswered && (
                        <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                          Missing Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-slate-900 mt-1 break-words whitespace-pre-wrap">
                      {isAnswered ? (
                        String(val)
                      ) : (
                        <span className="text-slate-400 italic">Not provided</span>
                      )}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentStepIndex(idx);
                      setIsReviewMode(false);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors shrink-0"
                    title="Edit this answer"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Document Checklist */}
          {form.documents_required.length > 0 && (
            <div className="mb-8 p-4 rounded-xl bg-indigo-50/60 border border-indigo-100">
              <h3 className="text-xs font-bold text-indigo-950 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>Required Documents Checklist</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {form.documents_required.map((doc) => (
                  <li key={doc.doc_id} className="flex items-start gap-2">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>
                      <strong>{doc.document_name}</strong> ({doc.mandatory ? "Mandatory" : "Optional"}) —{" "}
                      <span className="text-slate-500">{doc.official_description}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Review Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-slate-100">
            <button
              onClick={handlePrev}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors w-full sm:w-auto justify-center"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Questions</span>
            </button>

            <button
              onClick={handleGenerateDocument}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all w-full sm:w-auto justify-center"
            >
              <FileCheck className="w-5 h-5" />
              <span>Generate Filing-Ready Document / PDF</span>
            </button>
          </div>
        </div>
      )}

      {/* Privacy Notice Banner */}
      <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Zero Server PII:</strong> All entries are processed exclusively inside your browser. No Aadhaar, phone, or bank details are uploaded to AI databases.
          </span>
        </div>
      </div>

      {/* Document Preview & Print Modal */}
      <DocumentPreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        document={generatedDoc}
      />
    </div>
  );
}

/**
 * Subcomponent to render input types cleanly
 */
interface FieldInputProps {
  field: FormFieldDefinition;
  value: any;
  onChange: (val: any) => void;
  onEnterPress: () => void;
}

function FieldInput({ field, value, onChange, onEnterPress }: FieldInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && field.data_type !== "text") {
      e.preventDefault();
      onEnterPress();
    }
  };

  switch (field.data_type) {
    case "text":
      return (
        <textarea
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder || "Type your detailed explanation here..."}
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-slate-900 bg-white leading-relaxed resize-y"
        />
      );

    case "date":
      return (
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full sm:w-72 px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-slate-900 bg-white"
        />
      );

    case "number":
      return (
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={field.placeholder || "0"}
          min={field.validation?.minValue}
          max={field.validation?.maxValue}
          className="w-full sm:w-72 px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-slate-900 bg-white"
        />
      );

    case "currency":
      return (
        <div className="relative w-full sm:w-72">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
            ₹
          </span>
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="0.00"
            min={field.validation?.minValue ?? 0}
            className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-slate-900 bg-white font-mono"
          />
        </div>
      );

    case "boolean":
      return (
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onChange(true)}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
              value === true || value === "true"
                ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => onChange(false)}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
              value === false || value === "false"
                ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
            }`}
          >
            No
          </button>
        </div>
      );

    case "select":
      const options = field.validation?.allowedOptions || [];
      return (
        <div className="space-y-2 max-w-xl">
          {options.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                value === opt.value
                  ? "bg-indigo-50/70 border-indigo-500 text-indigo-950 shadow-sm"
                  : "bg-white border-slate-200 hover:bg-slate-50 text-slate-800"
              }`}
            >
              <input
                type="radio"
                name={field.field_id}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange(opt.value)}
                className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium">{opt.label}</span>
            </label>
          ))}
        </div>
      );

    case "phone":
      return (
        <input
          type="tel"
          maxLength={10}
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
          onKeyDown={handleKeyDown}
          placeholder="10-digit mobile number"
          className="w-full sm:w-72 px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-slate-900 bg-white font-mono"
        />
      );

    case "pincode":
      return (
        <input
          type="text"
          maxLength={6}
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
          onKeyDown={handleKeyDown}
          placeholder="6-digit Indian PIN code"
          className="w-full sm:w-72 px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-slate-900 bg-white font-mono"
        />
      );

    case "email":
      return (
        <input
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="name@example.com"
          className="w-full sm:w-80 px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-slate-900 bg-white"
        />
      );

    case "string":
    default:
      return (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={field.placeholder || "Type your answer here..."}
          className="w-full max-w-xl px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-slate-900 bg-white"
        />
      );
  }
}
