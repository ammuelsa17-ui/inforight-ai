// src/services/api.ts
import { GenerateRtiRequest, GenerateRtiResponse } from "@/types/api";

export async function generateRti(request: GenerateRtiRequest): Promise<GenerateRtiResponse> {
  const response = await fetch("/api/generate-rti", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || "Failed to generate RTI guidance");
  }

  const data = await response.json();
  // Basic validation to ensure required fields exist
  if (
    typeof data.subject !== "string" ||
    typeof data.applicationBody !== "string" ||
    !Array.isArray(data.questions) ||
    typeof data.authority !== "object" ||
    typeof data.citationIds === "undefined"
  ) {
    throw new Error("Malformed response from backend");
  }
  return data as GenerateRtiResponse;
}
