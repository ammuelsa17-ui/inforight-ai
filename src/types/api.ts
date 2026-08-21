// src/types/api.ts — Version 2.0 API Contracts

// -------------------------------------------------------------
// 1. Frozen RTI Generation API Contracts (Scope v1.0)
// -------------------------------------------------------------
export interface GenerateRtiRequest {
  issue: string;
  state: string;
  district: string;
  localBodyName: string;
  locality: string;
  ward?: string;
  dateRange?: string;
  sourceIds: string[];
  simulateFailure?: boolean;
}

export interface Authority {
  designation: "Public Information Officer";
  organization: string;
  state: string;
  verified: boolean;
}

export interface ValidationInfo {
  schemaValid: boolean;
  citationsValid: boolean;
  questionCount: number;
  applicantDataSentToAI: false;
}

export interface GenerateRtiResponse {
  mode: "ai" | "fallback";
  subject: string;
  applicationBody: string;
  questions: string[];
  authority: Authority;
  citationIds: string[];
  validation: ValidationInfo;
  warning?: string;
}

// -------------------------------------------------------------
// 2. Additive Version 2.0 Contracts (Triage, Rights & Schemes)
// -------------------------------------------------------------

export type ServiceRoute = "rti" | "rights" | "schemes" | "unsupported";

export interface TriageRequest {
  problemDescription: string;
}

export interface TriageResponse {
  service: ServiceRoute;
  category?: "consumer" | "tenant" | "workplace" | "civic_road";
  confidence: "high" | "medium" | "verificationRequired";
  explanation: string;
  suggestedRoute?: string;
  missingFields: string[];
}

export interface RightsNavigateRequest {
  category: "consumer" | "tenant" | "workplace";
  issueType: string;
  description: string;
  state: string;
  jurisdiction?: string;
  amountInDispute?: number;
  sourceIds?: string[];
  simulateFailure?: boolean;
}

export interface RightsNavigateResponse {
  mode?: "ai" | "fallback";
  category: "consumer" | "tenant" | "workplace";
  jurisdiction: string;
  issueTitle?: string;
  summary: string;
  actions: string[];
  evidenceChecklist: string[];
  escalationSteps: string[];
  escalationPathway?: {
    portalName: string;
    portalUrl: string;
    authorityName: string;
    helplinePhone?: string;
  };
  representationLetter?: {
    recipientTitle: string;
    subject: string;
    body: string;
  };
  bureaucracyTranslation?: {
    whatThisMeans: string;
    whatYouShouldDoNow: string;
    documentsToCollect: string[];
    whereToSubmit: string;
    whatIfNoResponse: string;
  };
  draftLetter?: string;
  jurisdictionWarning?: string;
  citationIds: string[];
  verificationRequired: boolean;
  warning?: string;
}

export interface SchemeMatchRequest {
  state: string;
  age: number;
  annualIncome: number;
  occupation: "student" | "farmer" | "salaried" | "self_employed" | "unemployed" | "senior_citizen";
  isStudent: boolean;
  areaType: "urban" | "rural";
  hasDisability?: boolean;
  socialCategory?: string;
}

export interface SchemeMatch {
  schemeId: string;
  result: "matched" | "notMatched" | "verificationRequired";
  reasons: string[];
  requiredDocuments: string[];
  officialApplyUrl?: string;
  citationIds: string[];
}

export interface SchemeMatchResponse {
  totalMatched: number;
  matchedSchemes: SchemeMatch[];
  disclaimer: "Final eligibility is determined strictly by the respective government department.";
}

export interface SourceRecord {
  id: string;
  category: "rti" | "consumer" | "tenant" | "workplace" | "welfare";
  title: string;
  authority: string;
  officialUrl: string;
  jurisdiction: string;
  supports: string[];
  lastVerified: string;
  verificationStatus: "verified" | "partial";
}

// Re-export Unified Source Data Architecture & Navigator types
export * from "./source-data";
export * from "./consumer-navigator";
export * from "./tenant-navigator";
export * from "./rti-navigator";
export * from "./scheme-navigator";
export * from "./workplace-navigator";
export * from "./form-filler";
export * from "./router";
