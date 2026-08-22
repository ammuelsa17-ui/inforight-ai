// src/lib/government-data/versioned-rules.ts — Versioned Statutory Legal Rules Registry
import { VersionedLegalRule } from "@/lib/government-data/types";

export const VERSIONED_LEGAL_RULES: VersionedLegalRule[] = [
  // RTI Act 2005 Rules
  {
    ruleId: "RULE-RTI-TIMELINE-STANDARD",
    domain: "CIVIC_RTI",
    jurisdiction: "ALL_INDIA",
    parameter: "RTI_RESPONSE_DAYS",
    value: 30,
    unit: "DAYS",
    statutoryBasis: "Section 7(1), Right to Information Act, 2005",
    effectiveFrom: "2005-10-12",
    sourceIds: ["SRC-CENTRAL-RTI-2005"],
    status: "CURRENT"
  },
  {
    ruleId: "RULE-RTI-TIMELINE-LIFE-LIBERTY",
    domain: "CIVIC_RTI",
    jurisdiction: "ALL_INDIA",
    parameter: "RTI_LIFE_LIBERTY_HOURS",
    value: 48,
    unit: "HOURS",
    statutoryBasis: "Proviso to Section 7(1), Right to Information Act, 2005",
    effectiveFrom: "2005-10-12",
    sourceIds: ["SRC-CENTRAL-RTI-2005"],
    status: "CURRENT"
  },
  {
    ruleId: "RULE-RTI-FIRST-APPEAL-DAYS",
    domain: "CIVIC_RTI",
    jurisdiction: "ALL_INDIA",
    parameter: "RTI_FIRST_APPEAL_LIMIT_DAYS",
    value: 30,
    unit: "DAYS",
    statutoryBasis: "Section 19(1), Right to Information Act, 2005",
    effectiveFrom: "2005-10-12",
    sourceIds: ["SRC-CENTRAL-RTI-2005"],
    status: "CURRENT"
  },

  // Consumer Protection Act 2019 Pecuniary Limits
  {
    ruleId: "RULE-CONS-DCDRC-MAX-INR",
    domain: "CONSUMER",
    jurisdiction: "ALL_INDIA",
    parameter: "DISTRICT_COMMISSION_MAX_INR",
    value: 5000000,
    unit: "INR",
    statutoryBasis: "Section 34(1), Consumer Protection Act, 2019",
    effectiveFrom: "2020-07-20",
    sourceIds: ["SRC-CONS-2A-CENTRAL"],
    status: "CURRENT"
  },
  {
    ruleId: "RULE-CONS-SCDRC-MAX-INR",
    domain: "CONSUMER",
    jurisdiction: "ALL_INDIA",
    parameter: "STATE_COMMISSION_MAX_INR",
    value: 20000000,
    unit: "INR",
    statutoryBasis: "Section 47(1), Consumer Protection Act, 2019",
    effectiveFrom: "2020-07-20",
    sourceIds: ["SRC-CONS-2A-CENTRAL"],
    status: "CURRENT"
  },

  // State Tenancy Deposit Caps
  {
    ruleId: "RULE-TENANT-TN-DEPOSIT-MAX",
    domain: "TENANT",
    jurisdiction: "TAMIL_NADU",
    parameter: "TENANT_DEPOSIT_MAX_MONTHS",
    value: 3,
    unit: "MONTHS_RENT",
    statutoryBasis: "Section 11, Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act, 2017",
    effectiveFrom: "2019-02-22",
    sourceIds: ["SRC-TEN-2-TAMILNADU"],
    status: "CURRENT"
  },
  {
    ruleId: "RULE-TENANT-UP-DEPOSIT-MAX",
    domain: "TENANT",
    jurisdiction: "UTTAR_PRADESH",
    parameter: "TENANT_DEPOSIT_MAX_MONTHS",
    value: 2,
    unit: "MONTHS_RENT",
    statutoryBasis: "Uttar Pradesh Regulation of Urban Premises Tenancy Act, 2021",
    effectiveFrom: "2021-01-11",
    sourceIds: ["SRC-TEN-UP-2021"],
    status: "CURRENT"
  }
];

export function getVersionedRule(parameter: string, jurisdiction: string = "ALL_INDIA"): VersionedLegalRule | undefined {
  return VERSIONED_LEGAL_RULES.find(
    (r) => r.parameter === parameter && (r.jurisdiction === jurisdiction || r.jurisdiction === "ALL_INDIA") && r.status === "CURRENT"
  );
}
