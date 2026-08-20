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
