import { MasterDomain, GovernmentLevel, VerificationStatus } from "./source-data";

/**
 * Conversational Form-Filler Schema & Engine Types
 * 
 * Maps plain-language citizen dialogue into official government forms
 * with zero hallucination and strict PII privacy boundaries.
 */

export type FormFieldDataType =
  | "string"
  | "text"
  | "number"
  | "date"
  | "boolean"
  | "select"
  | "multiselect"
  | "file"
  | "phone"
  | "email"
  | "pincode"
  | "currency";

export interface FormFieldValidationRule {
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  allowedOptions?: Array<{ label: string; value: string }>;
  customErrorMessage?: string;
}

export interface FormConditionalRule {
  dependsOnFieldId: string;
  operator: "EQUALS" | "NOT_EQUALS" | "GREATER_THAN" | "IN_LIST" | "IS_TRUE" | "IS_FALSE";
  expectedValue: unknown;
}

export interface FormFieldDefinition {
  field_id: string;
  official_label: string;
  plain_language_question: string;
  help_text?: string;
  required: boolean;
  data_type: FormFieldDataType;
  format?: string;
  validation?: FormFieldValidationRule;
  conditional?: FormConditionalRule;
  sensitive: boolean; // Flagged true for PII/ID fields to enforce local browser-only handling
  reusable_profile_field?: string; // e.g. "applicant_name", "applicant_phone", "pincode", "district"
  placeholder?: string;
}

export interface RequiredDocumentAttachment {
  doc_id: string;
  document_name: string;
  official_description: string;
  mandatory: boolean;
  accepted_formats: string[]; // e.g. ["PDF", "JPG", "PNG"]
  max_size_mb: number;
}

export interface FormSubmissionDetails {
  online: boolean;
  offline: boolean;
  portal?: string;
  office?: string;
  postal_address?: string;
  statutory_fee?: string;
  fee_payment_mode?: string;
}

export type FormTypeCategory = "OFFICIAL_PRESCRIBED_FORM" | "FILING_READY_DRAFT";

export interface OfficialFormDefinition {
  form_id: string;
  form_name: string;
  form_code?: string; // e.g. "Form 1", "Form N", "Section 6(1)"
  form_category?: FormTypeCategory;
  form_description?: string;
  domain: MasterDomain;
  authority: string;
  jurisdiction: {
    country: "IN";
    state_ut: string;
    government_level: GovernmentLevel;
  };
  official_source: string;
  official_blank_form_url?: string;
  submission: FormSubmissionDetails;
  last_verified: string;
  verification_status: VerificationStatus;
  
  fields: FormFieldDefinition[];
  documents_required: RequiredDocumentAttachment[];
}

export interface FormFillingSessionState {
  sessionId: string;
  formId: string;
  startedAt: string;
  completedAt?: string;
  answers: Record<string, unknown>; // field_id -> citizen answer
  uploadedDocs: Record<string, string>; // doc_id -> fileName
  validationErrors: Record<string, string>; // field_id -> error message
  isReadyForReview: boolean;
  isFinalized: boolean;
}

export interface FormGeneratedOutput {
  formId: string;
  formName: string;
  authority: string;
  portalUrl?: string;
  submissionMode: string;
  generatedDocumentText: string;
  mappedFieldValues: Array<{
    field_id: string;
    official_label: string;
    citizen_answer: string;
    is_sensitive: boolean;
  }>;
  attachmentChecklist: Array<{
    document_name: string;
    mandatory: boolean;
    status: "ATTACHED" | "PENDING_USER_UPLOAD";
  }>;
  submissionInstructions: string[];
  legalDisclaimer: string;
}
