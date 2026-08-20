// src/types/api.ts
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

// Re-export Unified Source Data Architecture & Navigator types
export * from "./source-data";
export * from "./consumer-navigator";
export * from "./tenant-navigator";
export * from "./rti-navigator";
export * from "./scheme-navigator";
export * from "./workplace-navigator";
export * from "./form-filler";
export * from "./router";
