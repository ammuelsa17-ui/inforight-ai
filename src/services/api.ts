import type {
  GenerateRtiRequest,
  GenerateRtiResponse,
  TriageRequest,
  TriageResponse,
  RightsNavigateRequest,
  RightsNavigateResponse,
  SchemeMatchRequest,
  SchemeMatchResponse,
} from "@/types/api";

// 1. RTI Application Generator Fetcher
export async function generateRtiApplication(
  payload: GenerateRtiRequest
): Promise<GenerateRtiResponse> {
  const response = await fetch("/api/rti/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData: { error?: string } = await response
      .json()
      .catch(() => ({}));

    throw new Error(
      errorData.error ?? `RTI generation failed with status ${response.status}`
    );
  }

  return response.json() as Promise<GenerateRtiResponse>;
}

// 2. Problem Triage Classifier Fetcher
export async function triageProblem(
  payload: TriageRequest
): Promise<TriageResponse> {
  const response = await fetch("/api/triage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData: { error?: string } = await response
      .json()
      .catch(() => ({}));

    throw new Error(
      errorData.error ?? `Problem triage failed with status ${response.status}`
    );
  }

  return response.json() as Promise<TriageResponse>;
}

// 3. Rights Navigator Fetcher
export async function navigateRightsDispute(
  payload: RightsNavigateRequest
): Promise<RightsNavigateResponse> {
  const response = await fetch("/api/rights/navigate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData: { error?: string } = await response
      .json()
      .catch(() => ({}));

    throw new Error(
      errorData.error ?? `Rights navigation failed with status ${response.status}`
    );
  }

  return response.json() as Promise<RightsNavigateResponse>;
}

// 4. Scheme Matcher Fetcher
export async function matchWelfareSchemes(
  payload: SchemeMatchRequest
): Promise<SchemeMatchResponse> {
  const response = await fetch("/api/schemes/match", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData: { error?: string } = await response
      .json()
      .catch(() => ({}));

    throw new Error(
      errorData.error ?? `Scheme matching failed with status ${response.status}`
    );
  }

  return response.json() as Promise<SchemeMatchResponse>;
}
