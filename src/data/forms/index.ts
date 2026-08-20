import {
  OfficialFormDefinition,
  FormFieldDefinition,
  FormFillingSessionState,
  FormGeneratedOutput
} from "@/types/form-filler";
import { OFFICIAL_FORMS_REGISTRY } from "./form-registry";
import { MasterDomain } from "@/types/source-data";

/**
 * Master Forms Index & Form-Filler Engine
 */

export const ALL_OFFICIAL_FORMS: OfficialFormDefinition[] = OFFICIAL_FORMS_REGISTRY;

const FORM_BY_ID = new Map<string, OfficialFormDefinition>();
ALL_OFFICIAL_FORMS.forEach((form) => {
  FORM_BY_ID.set(form.form_id, form);
});

/**
 * Legacy Form ID Aliases (for backward compatibility)
 */
export const LEGACY_FORM_ID_ALIASES: Record<string, string> = {
  "FORM-CONS-EDAAKHIL": "FORM-CONS-EJAGRITI"
};

/**
 * Retrieve an official form definition by its ID or legacy alias
 */
export function getFormById(formId: string): OfficialFormDefinition | undefined {
  const canonicalId = LEGACY_FORM_ID_ALIASES[formId] || formId;
  return FORM_BY_ID.get(canonicalId);
}

/**
 * Query forms filtered by Master Domain
 */
export function getFormsByDomain(domain: MasterDomain): OfficialFormDefinition[] {
  return ALL_OFFICIAL_FORMS.filter((f) => f.domain === domain);
}

/**
 * Evaluates whether a conditional field is active based on current answers
 */
export function isFieldActive(
  field: FormFieldDefinition,
  currentAnswers: Record<string, any>
): boolean {
  if (!field.conditional) return true;
  const parentValue = currentAnswers[field.conditional.dependsOnFieldId];
  if (parentValue === undefined || parentValue === null) return false;

  switch (field.conditional.operator) {
    case "EQUALS":
      return parentValue === field.conditional.expectedValue;
    case "NOT_EQUALS":
      return parentValue !== field.conditional.expectedValue;
    case "IS_TRUE":
      return Boolean(parentValue) === true;
    case "IS_FALSE":
      return Boolean(parentValue) === false;
    case "GREATER_THAN":
      return Number(parentValue) > Number(field.conditional.expectedValue);
    case "IN_LIST":
      return Array.isArray(field.conditional.expectedValue) &&
        field.conditional.expectedValue.includes(parentValue);
    default:
      return true;
  }
}

/**
 * Validates a single user answer against field constraints
 */
export function validateFormField(
  field: FormFieldDefinition,
  value: any
): { isValid: boolean; errorMessage?: string } {
  if (field.required && (value === undefined || value === null || value === "")) {
    return { isValid: false, errorMessage: `This field is required: ${field.official_label}` };
  }

  if (value === undefined || value === null || value === "") {
    return { isValid: true };
  }

  if (field.validation) {
    const { pattern, minLength, maxLength, minValue, maxValue, customErrorMessage } = field.validation;
    if (pattern && typeof value === "string") {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        return { isValid: false, errorMessage: customErrorMessage || `Invalid format for ${field.official_label}` };
      }
    }
    if (minLength && typeof value === "string" && value.length < minLength) {
      return { isValid: false, errorMessage: `Minimum length is ${minLength} characters.` };
    }
    if (maxLength && typeof value === "string" && value.length > maxLength) {
      return { isValid: false, errorMessage: `Maximum length is ${maxLength} characters.` };
    }
    if (minValue !== undefined && Number(value) < minValue) {
      return { isValid: false, errorMessage: `Value cannot be less than ${minValue}.` };
    }
    if (maxValue !== undefined && Number(value) > maxValue) {
      return { isValid: false, errorMessage: `Value cannot be greater than ${maxValue}.` };
    }
  }

  return { isValid: true };
}

/**
 * Identifies the next missing required question in the conversation
 */
export function getNextConversationalQuestion(
  form: OfficialFormDefinition,
  currentAnswers: Record<string, any>
): FormFieldDefinition | null {
  for (const field of form.fields) {
    if (!isFieldActive(field, currentAnswers)) continue;
    const answer = currentAnswers[field.field_id];
    if (field.required && (answer === undefined || answer === null || answer === "")) {
      return field;
    }
  }
  return null;
}

/**
 * Compiles a structured, reviewable output once all mandatory fields are answered
 */
export function renderFinalFormOutput(
  form: OfficialFormDefinition,
  sessionAnswers: Record<string, any>,
  uploadedDocIds: string[] = []
): FormGeneratedOutput {
  const mappedFieldValues = form.fields
    .filter((field) => isFieldActive(field, sessionAnswers))
    .map((field) => ({
      field_id: field.field_id,
      official_label: field.official_label,
      citizen_answer: String(sessionAnswers[field.field_id] ?? "N/A"),
      is_sensitive: field.sensitive
    }));

  const attachmentChecklist = form.documents_required.map((doc) => ({
    document_name: doc.document_name,
    mandatory: doc.mandatory,
    status: (uploadedDocIds.includes(doc.doc_id) ? "ATTACHED" : "PENDING_USER_UPLOAD") as "ATTACHED" | "PENDING_USER_UPLOAD"
  }));

  const textLines: string[] = [
    `==================================================================`,
    `               OFFICIAL APPLICATION / PETITION                    `,
    `==================================================================`,
    `Form Title: ${form.form_name}`,
    `Target Authority: ${form.authority}`,
    `Jurisdiction: ${form.jurisdiction.government_level} (${form.jurisdiction.state_ut})`,
    `Statutory Fee: ${form.submission.statutory_fee || "Nil"}`,
    `------------------------------------------------------------------`
  ];

  mappedFieldValues.forEach((mv) => {
    textLines.push(`[${mv.official_label.toUpperCase()}]`);
    textLines.push(`${mv.citizen_answer}\n`);
  });

  textLines.push(`------------------------------------------------------------------`);
  textLines.push(`ENCLOSURES / ATTACHMENTS:`);
  attachmentChecklist.forEach((att, idx) => {
    textLines.push(`${idx + 1}. ${att.document_name} [${att.status}]`);
  });
  textLines.push(`==================================================================`);

  return {
    formId: form.form_id,
    formName: form.form_name,
    authority: form.authority,
    portalUrl: form.submission.portal,
    submissionMode: form.submission.online ? "ONLINE_PORTAL" : "OFFLINE_POSTAL",
    generatedDocumentText: textLines.join("\n"),
    mappedFieldValues,
    attachmentChecklist,
    submissionInstructions: [
      form.submission.portal ? `Submit online via portal: ${form.submission.portal}` : `Submit in person/post to: ${form.authority}`,
      `Affix/pay statutory fee: ${form.submission.statutory_fee || "Free"}`,
      `Ensure all mandatory attachments are signed/self-attested before final submission.`
    ],
    legalDisclaimer: "This draft form is generated for citizen convenience based on verified statutory templates. InfoRight AI does not file applications on behalf of users or guarantee institutional decisions."
  };
}

export { OFFICIAL_FORMS_REGISTRY };
