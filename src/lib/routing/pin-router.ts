import {
  PIN_AUTHORITY_REGISTRY,
  CivicIssueCategory,
  PinAuthorityRecord
} from "@/data/pin-authority-registry";

export interface PinRoutingResolution {
  resolved: boolean;
  pinCode: string;
  localityName?: string;
  state?: string;
  district?: string;
  localBodyName?: string;
  jurisdictionType?: string;
  zoneName?: string;
  wardNumbers?: string;
  wardNote?: string;
  issueCategory?: CivicIssueCategory;
  categoryTitle?: string;
  responsibleAuthority?: string;
  departmentName?: string;
  rtiAuthority?: string;
  grievanceChannel?: string;
  postalSourceId?: string;
  jurisdictionSourceId?: string;
  departmentSourceId?: string;
  rtiSourceId?: string;
  officialSourceId?: string;
  confidence?: "HIGH" | "MEDIUM" | "VERIFICATION_REQUIRED";
  reasoning?: string;
  unsupportedMessage?: string;
}

/**
 * Classifies complaint description text into one of 5 supported civic categories.
 */
export function classifyIssueCategory(text: string): CivicIssueCategory {
  const lower = (text || "").toLowerCase();

  if (/pothole|road|tarmac|asphalt|street repair|pavement|bridge|flyover|footpath|tar/i.test(lower)) {
    return "road_pothole";
  }
  if (/drain|sewage|sewer|gutter|stormwater|flooding|waterlogging|stagnant|drainage/i.test(lower)) {
    return "drainage_sewage";
  }
  if (/light|lamp|dark|electrical|wire|pole|bulb|led|lighting/i.test(lower)) {
    return "streetlight";
  }
  if (/garbage|trash|waste|dustbin|clean|sanitation|smell|dump|sweeping|litter/i.test(lower)) {
    return "waste_sanitation";
  }
  if (/water|pipe|leak|tap|drinking|supply|tanker|flow|siruvani|pilloor/i.test(lower)) {
    return "water_supply";
  }

  // Default fallback category for municipal issues
  return "road_pothole";
}

/**
 * Deterministically resolves PIN code + issue description to statutory public authority details.
 * Strictly relies on verified PIN_AUTHORITY_REGISTRY records.
 * Zero LLM hallucination.
 */
export function resolvePinAuthority(
  pinCodeInput: string,
  issueDescription: string
): PinRoutingResolution {
  const cleanPin = (pinCodeInput || "").trim().replace(/\D/g, "");

  // Format validation for 6-digit Indian PIN codes
  if (!cleanPin || cleanPin.length !== 6) {
    return {
      resolved: false,
      pinCode: cleanPin || pinCodeInput,
      unsupportedMessage: "Invalid PIN code format. Indian PIN codes must contain exactly 6 numeric digits."
    };
  }

  const record: PinAuthorityRecord | undefined = PIN_AUTHORITY_REGISTRY[cleanPin];

  if (!record) {
    return {
      resolved: false,
      pinCode: cleanPin,
      unsupportedMessage: "Exact local authority mapping is not yet verified for this PIN code."
    };
  }

  const category = classifyIssueCategory(issueDescription);
  const categoryMapping = record.categoryMappings[category];

  if (!categoryMapping) {
    return {
      resolved: false,
      pinCode: cleanPin,
      state: record.state,
      district: record.district,
      localBodyName: record.localBodyName,
      unsupportedMessage: "Exact local authority mapping is not yet verified for this issue category."
    };
  }

  return {
    resolved: true,
    pinCode: record.pinCode,
    localityName: record.localityName,
    state: record.state,
    district: record.district,
    localBodyName: record.localBodyName,
    jurisdictionType: record.jurisdictionType,
    zoneName: record.zoneName,
    wardNumbers: record.wardNumbers,
    wardNote: record.wardNote,
    issueCategory: categoryMapping.issueCategory,
    categoryTitle: categoryMapping.categoryTitle,
    responsibleAuthority: categoryMapping.responsibleAuthority,
    departmentName: categoryMapping.departmentName,
    rtiAuthority: categoryMapping.rtiAuthority,
    grievanceChannel: categoryMapping.grievanceChannel,
    postalSourceId: categoryMapping.postalSourceId,
    jurisdictionSourceId: categoryMapping.jurisdictionSourceId,
    departmentSourceId: categoryMapping.departmentSourceId,
    rtiSourceId: categoryMapping.rtiSourceId,
    officialSourceId: categoryMapping.officialSourceId,
    confidence: categoryMapping.confidence,
    reasoning: categoryMapping.reasoning
  };
}
