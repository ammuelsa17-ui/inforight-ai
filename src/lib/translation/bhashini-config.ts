import { BhashiniPipelineConfigResponse } from "./types";
import {
  isAllowedCallbackUrl,
  isValidAuthHeaderName,
  isValidAuthHeaderValue,
} from "./language-capabilities";
import {
  getCachedPipelineConfig,
  setCachedPipelineConfig,
  deduplicateConfigFetch,
} from "./translation-cache";

export interface ResolvedPipeline {
  callbackUrl: string;
  authHeaderName: string;
  authHeaderValue: string;
  serviceId: string;
}

export async function resolveBhashiniPipelineConfig(
  sourceLang: string,
  targetLang: string
): Promise<ResolvedPipeline | null> {
  const apiKey = process.env.BHASHINI_API_KEY;
  const userId = process.env.BHASHINI_USER_ID;
  const pipelineId = process.env.BHASHINI_PIPELINE_ID;

  if (!apiKey || !userId || !pipelineId) {
    return null; // Credentials or Pipeline ID missing -> honest fallback
  }

  const cached = getCachedPipelineConfig(pipelineId, sourceLang, targetLang);
  if (cached) {
    return {
      callbackUrl: cached.callbackUrl,
      authHeaderName: cached.authHeaderName,
      authHeaderValue: cached.authHeaderValue,
      serviceId: cached.serviceId,
    };
  }

  return deduplicateConfigFetch(pipelineId, sourceLang, targetLang, async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    try {
      const res = await fetch("https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          userID: userId,
          ulcaApiKey: apiKey,
        },
        body: JSON.stringify({
          pipelineTasks: [
            {
              taskType: "translation",
              config: {
                language: {
                  sourceLanguage: sourceLang,
                  targetLanguage: targetLang,
                },
              },
            },
          ],
          pipelineRequestConfig: {
            pipelineId,
          },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        return null;
      }

      const data = (await res.json().catch(() => null)) as BhashiniPipelineConfigResponse | null;
      if (!data || !data.pipelineInferenceAPIEndPoint || !data.pipelineResponseConfig) {
        return null;
      }

      const callbackUrl = data.pipelineInferenceAPIEndPoint.callbackUrl;
      if (!callbackUrl || !isAllowedCallbackUrl(callbackUrl)) {
        return null; // Reject un-allowlisted or insecure host
      }

      const rawHeaderName = data.pipelineInferenceAPIEndPoint.inferenceApiKey?.name || "Authorization";
      const rawHeaderValue = data.pipelineInferenceAPIEndPoint.inferenceApiKey?.value || "";

      if (!isValidAuthHeaderName(rawHeaderName) || !isValidAuthHeaderValue(rawHeaderValue)) {
        return null; // Reject invalid or forbidden dynamic header
      }

      const translationConfig = data.pipelineResponseConfig.find((task) => task.taskType === "translation");
      const serviceId = translationConfig?.config?.[0]?.serviceId;

      if (!serviceId) {
        return null; // Service ID missing
      }

      const resolved: ResolvedPipeline = {
        callbackUrl,
        authHeaderName: rawHeaderName.trim(),
        authHeaderValue: rawHeaderValue.trim(),
        serviceId,
      };

      setCachedPipelineConfig(pipelineId, sourceLang, targetLang, resolved);

      return resolved;
    } catch {
      clearTimeout(timeoutId);
      return null;
    }
  });
}
