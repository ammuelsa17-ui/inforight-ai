# RTI Generation API Contract

## Request

```ts
interface GenerateRtiRequest {
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

Prohibited request fields:

* `applicantName`
* `applicantAddress`
* Phone number
* Email address
* Aadhaar number
* Signature

## Response

```ts
interface GenerateRtiResponse {
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

Rules:

* `questions` must contain 3–5 record-based requests.
* Every citation ID must exist in the local official-source allowlist.
* Invalid AI output must be rejected.
* Timeout, malformed output or invalid citations must activate fallback mode.
* Authority must be constructed outside Gemini.
* Coimbatore can be marked verified only when matched against the curated Coimbatore source record.
* Other authorities must display a verification warning.
