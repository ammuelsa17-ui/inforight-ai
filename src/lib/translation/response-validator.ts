export interface FieldIndexMap {
  fieldKey: string;
  isArray: boolean;
  itemIndex?: number;
}

export function buildIndexMap(
  translatableFields: Record<string, string | string[]>
): { inputs: string[]; map: FieldIndexMap[] } {
  const inputs: string[] = [];
  const map: FieldIndexMap[] = [];

  for (const [key, value] of Object.entries(translatableFields)) {
    if (typeof value === "string") {
      inputs.push(value);
      map.push({ fieldKey: key, isArray: false });
    } else if (Array.isArray(value)) {
      value.forEach((item, idx) => {
        inputs.push(item);
        map.push({ fieldKey: key, isArray: true, itemIndex: idx });
      });
    }
  }

  return { inputs, map };
}

export function reconstructTranslatedFields(
  translatableFields: Record<string, string | string[]>,
  map: FieldIndexMap[],
  translatedOutputs: string[]
): Record<string, string | string[]> {
  const result: Record<string, string | string[]> = {};

  // Initialize structure matching original translatableFields
  for (const [key, value] of Object.entries(translatableFields)) {
    if (Array.isArray(value)) {
      result[key] = new Array(value.length).fill("");
    } else {
      result[key] = "";
    }
  }

  map.forEach((item, idx) => {
    const text = translatedOutputs[idx];
    if (item.isArray && typeof item.itemIndex === "number") {
      (result[item.fieldKey] as string[])[item.itemIndex] = text;
    } else {
      result[item.fieldKey] = text;
    }
  });

  return result;
}

export function areProtectedFieldsUnchanged(
  originalProtected: Record<string, string | string[]>,
  resultProtected: Record<string, string | string[]>
): boolean {
  return JSON.stringify(originalProtected) === JSON.stringify(resultProtected);
}
