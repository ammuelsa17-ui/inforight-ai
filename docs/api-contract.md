# InfoRight AI — API Contracts v2.0

> **Compatibility Notice**: The frozen RTI generation endpoint (`POST /api/rti/generate`) remains 100% untouched. Additional endpoints (`/api/triage`, `/api/rights/navigate`, `/api/schemes/match`) are additive extensions.

---

## 1. Problem Triage API (`POST /api/triage`)

### Request
```ts
export interface TriageRequest {
  problemDescription: string;
}
```

### Response
```ts
export interface TriageResponse {
  recommendedModule: "rti" | "rights" | "schemes";
  category?: "consumer" | "tenant" | "workplace" | "civic_road";
  confidence: number;
  explanation: string;
  suggestedRoute: string;
}
```

---

## 2. RTI Generation API (`POST /api/rti/generate`) — [Frozen Scope v1.0]

### Request
```ts
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
```

Prohibited request fields (strictly excluded from API payload):
* `applicantName`
* `applicantAddress`
* Phone number / Email address / Aadhaar number / Signature

### Response
```ts
export interface GenerateRtiResponse {
  mode: "ai" | "fallback";
  subject: string;
  applicationBody: string;
  questions: string[];
  authority: {
    designation: "Public Information Officer";
    organization: string;
    state: string;
    verified: boolean;
  };
  citationIds: string[];
  validation: {
    schemaValid: boolean;
    citationsValid: boolean;
    questionCount: number;
    applicantDataSentToAI: false;
  };
  warning?: string;
}
```

---

## 3. Rights Navigator API (`POST /api/rights/navigate`)

### Request
```ts
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
```

### Response
```ts
export interface RightsNavigateResponse {
  mode: "ai" | "fallback";
  category: "consumer" | "tenant" | "workplace";
  issueTitle: string;
  rightsSummary: string;
  proceduralSteps: string[];
  evidenceChecklist: string[];
  escalationPathway: {
    portalName: string;
    portalUrl: string;
    authorityName: string;
    helplinePhone?: string;
  };
  representationLetter: {
    recipientTitle: string;
    subject: string;
    body: string;
  };
  bureaucracyTranslation: {
    whatThisMeans: string;
    whatYouShouldDoNow: string;
    documentsToCollect: string[];
    whereToSubmit: string;
    whatIfNoResponse: string;
  };
  jurisdictionWarning?: string;
  citationIds: string[];
  warning?: string;
}
```

---

## 4. Scheme Eligibility Matcher API (`POST /api/schemes/match`)

### Request
```ts
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
```

### Response
```ts
export interface SchemeMatchResponse {
  totalMatched: number;
  matchedSchemes: Array<{
    id: string;
    title: string;
    ministry: string;
    state: string;
    matchingReason: string;
    benefits: string;
    eligibilityCriteria: string[];
    requiredDocuments: string[];
    officialApplyUrl: string;
    lastVerifiedDate: string;
  }>;
  disclaimer: "Final eligibility is determined strictly by the respective government department.";
}
```
