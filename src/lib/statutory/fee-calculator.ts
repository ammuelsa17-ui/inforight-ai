import { RtiFeeStructure } from "./types";
import { OFFICIAL_SOURCES_REGISTRY } from "@/data/source-registry";

export function calculateRtiFeeStructure(
  state: string = "Tamil Nadu",
  authorityName: string = "Central / Public Information Officer"
): RtiFeeStructure {
  const isCentral = authorityName.toLowerCase().includes("central") || authorityName.toLowerCase().includes("dopt") || authorityName.toLowerCase().includes("union");

  const rtiSource = OFFICIAL_SOURCES_REGISTRY.RTI_ACT_2005_AMENDED;

  if (isCentral) {
    return {
      jurisdiction: "Central",
      applicationFeeAmount: 10,
      currency: "INR",
      permittedPaymentModes: [
        "Cash against proper receipt",
        "Demand Draft",
        "Banker's Cheque",
        "Indian Postal Order (IPO)",
        "Electronic Payment (via RTI Online Portal where available)",
      ],
      isBplExempt: true,
      bplExemptionNotice: "Application/information fees exempt for eligible BPL applicants, subject to submission of appropriate proof.",
      reproductionFeeNotice: "Reproduction charges: ₹2 per A4/A3 page created or copied; actual cost for samples/models.",
      sourceCitation: `${rtiSource.title} & RTI Rules 2012 (${rtiSource.authority})`,
      sourceUrl: rtiSource.officialUrl,
    };
  }

  // State Jurisdiction (e.g. Tamil Nadu)
  const isTamilNadu = state.toLowerCase().includes("tamil nadu") || state.toLowerCase().includes("tn");

  if (isTamilNadu) {
    const ccmcSource = OFFICIAL_SOURCES_REGISTRY.CCMC_RTI_AUTHORITY || rtiSource;
    return {
      jurisdiction: "State",
      stateName: "Tamil Nadu",
      applicationFeeAmount: 10,
      currency: "INR",
      permittedPaymentModes: [
        "Court Fee Stamp (affixed to application)",
        "Demand Draft",
        "Treasury Challan (Head of Account: 0070-00-60-118)",
      ],
      isBplExempt: true,
      bplExemptionNotice: "Application/information fees exempt for eligible BPL applicants, subject to submission of appropriate proof.",
      reproductionFeeNotice: "Reproduction charges: ₹2 per page; actual inspection fee for work records after 1st hour.",
      sourceCitation: `${ccmcSource.title} (${ccmcSource.authority})`,
      sourceUrl: ccmcSource.officialUrl,
    };
  }

  // Generic State Fallback derived from source registry
  return {
    jurisdiction: "State",
    stateName: state,
    applicationFeeAmount: 10,
    currency: "INR",
    permittedPaymentModes: [
      "Court Fee Stamp / Treasury Challan / Demand Draft (As per State RTI Rules)",
      "Indian Postal Order (IPO)",
    ],
    isBplExempt: true,
    bplExemptionNotice: "Application/information fees exempt for eligible BPL applicants, subject to submission of appropriate proof.",
    reproductionFeeNotice: "Reproduction charges apply as per specific State RTI Rules.",
    sourceCitation: `${rtiSource.title} (${rtiSource.authority})`,
    sourceUrl: rtiSource.officialUrl,
  };
}
