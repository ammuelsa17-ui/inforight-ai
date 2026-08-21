import { ResolvedPipeline } from "./bhashini-config";
import { BhashiniComputeResponse } from "./types";

export async function executeBhashiniComputeCall(
  config: ResolvedPipeline,
  inputs: string[],
  sourceLang: string,
  targetLang: string
): Promise<string[] | null> {
  if (inputs.length === 0) return [];

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (config.authHeaderName && config.authHeaderValue) {
      headers[config.authHeaderName] = config.authHeaderValue;
    }

    const res = await fetch(config.callbackUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        pipelineTasks: [
          {
            taskType: "translation",
            config: {
              language: {
                sourceLanguage: sourceLang,
                targetLanguage: targetLang,
              },
              serviceId: config.serviceId,
            },
          },
        ],
        inputData: {
          input: inputs.map((text) => ({ source: text })),
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return null;
    }

    const data = (await res.json().catch(() => null)) as BhashiniComputeResponse | null;
    if (!data || !data.pipelineResponse || !Array.isArray(data.pipelineResponse)) {
      return null;
    }

    const translationTask = data.pipelineResponse.find((t) => t.taskType === "translation");
    const outputs = translationTask?.output;

    if (!Array.isArray(outputs) || outputs.length !== inputs.length) {
      return null; // Output count mismatch or missing output array
    }

    const translatedStrings: string[] = [];
    for (let i = 0; i < outputs.length; i++) {
      const targetText = outputs[i]?.target;
      if (typeof targetText !== "string" || targetText.trim().length === 0) {
        return null; // Reject if any single output item is empty or invalid
      }
      translatedStrings.push(targetText);
    }

    return translatedStrings;
  } catch {
    clearTimeout(timeoutId);
    return null;
  }
}
