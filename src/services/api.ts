import type { GenerateRtiRequest, GenerateRtiResponse } from "@/types/api";

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
