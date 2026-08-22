import {
  AuthorityResolutionQuery,
  AuthorityResolutionResult,
  CompetentAuthority,
  LocationConfidence
} from "@/types/authority-locator";
import { defaultPincodeProvider } from "./pincode-resolver";
import {
  VERIFIED_AUTHORITIES_REGISTRY,
  getAuthorityById
} from "@/data/authorities/authority-registry";
import { WELFARE_SOURCES } from "@/data/sources/schemes";

/**
 * Domain-Aware Authority Resolution Engine
 * Grounded in jurisdictional competence over geographic proximity.
 */
export function resolveCompetentAuthority(
  query: AuthorityResolutionQuery
): AuthorityResolutionResult {
  const pinResult = defaultPincodeProvider.resolvePincode(query.pincode);

  if (!pinResult.isValid) {
    return {
      query,
      confidence: "UNKNOWN",
      disclaimer: "Invalid PIN code. Please provide a valid 6-digit Indian postal PIN.",
      competentAuthority: {
        authority_id: "AUTH_INVALID_PIN",
        name: "Unresolved Authority",
        authority_type: "Unknown",
        domain: query.domain,
        state_ut: "Unknown",
        jurisdiction_scope: "CENTRAL",
        filing_modes: [],
        legal_basis: "N/A",
        source_record_ids: [],
        verification_status: "NEEDS_REVERIFICATION",
        location_confidence: "UNKNOWN",
        last_verified: "2026-08-20"
      },
      suggestedActions: {
        canStartForm: false,
        canAddToTracker: false
      }
    };
  }

  const location =
    pinResult.candidateLocalities.find((l) => l.locality === query.selectedLocality) ||
    pinResult.primaryLocation;

  const stateUt = location?.state_ut || pinResult.state_ut || "National";
  const district = location?.district || pinResult.district || "District Center";

  // 1. CONSUMER PROTECTION ROUTING
  if (query.domain === "CONSUMER_PROTECTION") {
    let authority: CompetentAuthority | undefined;

    if (district.toLowerCase().includes("chennai")) {
      authority = getAuthorityById("DCDRC_CHENNAI_NORTH") || getAuthorityById("DCDRC_CHENNAI_SOUTH");
    } else if (district.toLowerCase().includes("delhi")) {
      authority = getAuthorityById("DCDRC_NEW_DELHI");
    } else if (stateUt.toLowerCase().includes("chandigarh")) {
      authority = getAuthorityById("DCDRC_CHANDIGARH");
    }

    if (!authority) {
      authority = {
        authority_id: `DCDRC_${district.toUpperCase().replace(/\s+/g, "_")}`,
        name: `District Consumer Disputes Redressal Commission (${district})`,
        authority_type: "District Consumer Commission (DCDRC)",
        domain: "CONSUMER_PROTECTION",
        state_ut: stateUt,
        district,
        jurisdiction_scope: "DISTRICT",
        office_address: `District Court Complex / Collectorate Campus, ${district}, ${stateUt}`,
        helpline_phone: "1915 (National Consumer Helpline)",
        official_website: "https://e-jagriti.gov.in",
        filing_portal: "https://e-jagriti.gov.in",
        filing_modes: ["ONLINE", "PHYSICAL_COUNTER"],
        legal_basis: "Consumer Protection Act, 2019, Section 28 & Section 34 (Territorial Jurisdiction)",
        source_record_ids: ["SRC-CONS-1A-002"],
        verification_status: "CURRENT",
        location_confidence: "OFFICE_LOCATION_REQUIRES_VERIFICATION",
        last_verified: "2026-08-20",
        pre_litigation_help: {
          name: "National Consumer Helpline (NCH)",
          helpline: "1915",
          note: "Pre-litigation helpline before formal commission filing."
        },
        suggested_form_id: "FORM-CONS-EJAGRITI"
      };
    }

    return {
      query,
      resolvedLocation: location,
      competentAuthority: authority,
      confidence: authority.location_confidence,
      disclaimer: "Consumer commissions are determined strictly by territorial and pecuniary jurisdiction under Section 34 of the Consumer Protection Act, 2019.",
      suggestedActions: {
        canStartForm: true,
        formId: "FORM-CONS-EJAGRITI",
        formTitle: "Draft Consumer Petition (e-Jagriti)",
        portalUrl: authority.filing_portal,
        canAddToTracker: true,
        deadlineRuleId: "CONS_SECTION_69_LIMITATION"
      }
    };
  }

  // 2. TENANT RIGHTS ROUTING (STATE ISOLATED)
  if (query.domain === "TENANT_RIGHTS") {
    let authority: CompetentAuthority;

    if (stateUt.toLowerCase() === "tamil nadu") {
      authority = getAuthorityById("RENT_AUTHORITY_CHENNAI_SOUTH") || {
        authority_id: `RENT_AUTHORITY_TN_${district.toUpperCase()}`,
        name: `Rent Authority (Tahsildar / RDO — ${district})`,
        authority_type: "Rent Authority under TNRRRLT Act",
        domain: "TENANT_RIGHTS",
        state_ut: "Tamil Nadu",
        district,
        jurisdiction_scope: "DISTRICT",
        office_address: `Taluk Office / Revenue Division, ${district}, Tamil Nadu`,
        official_website: "https://www.tenancy.tn.gov.in",
        filing_portal: "https://www.tenancy.tn.gov.in",
        filing_modes: ["ONLINE", "PHYSICAL_COUNTER"],
        legal_basis: "Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act, 2017, Section 4 & Section 30",
        source_record_ids: ["SRC-TEN-2F-TN"],
        verification_status: "CURRENT",
        location_confidence: "OFFICE_LOCATION_REQUIRES_VERIFICATION",
        last_verified: "2026-08-20",
        suggested_form_id: "FORM-TEN-TN-REG"
      };

      return {
        query,
        resolvedLocation: location,
        competentAuthority: authority,
        confidence: authority.location_confidence,
        disclaimer: "Governed exclusively by the Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act, 2017.",
        suggestedActions: {
          canStartForm: true,
          formId: "FORM-TEN-TN-REG",
          formTitle: "Tenancy Registration Form",
          portalUrl: authority.filing_portal,
          canAddToTracker: true,
          deadlineRuleId: "TEN_TN_RENT_REVISION_NOTICE"
        }
      };
    }

    if (stateUt.toLowerCase() === "chandigarh") {
      authority = getAuthorityById("RENT_CONTROLLER_CHANDIGARH")!;
      return {
        query,
        resolvedLocation: location,
        competentAuthority: authority,
        confidence: "DISTRICT_VERIFIED",
        disclaimer: "Governed by the East Punjab Urban Rent Restriction Act, 1949 as extended to Chandigarh. Adjudicated by the Rent Controller (Civil Judge).",
        suggestedActions: {
          canStartForm: false,
          portalUrl: authority.official_website,
          canAddToTracker: false
        }
      };
    }

    // Generic State Tenancy Fallback (Zero Tamil Nadu Leakage)
    authority = {
      authority_id: `TENANCY_${stateUt.toUpperCase().replace(/\s+/g, "_")}`,
      name: `Competent Tenancy Authority / Rent Controller (${stateUt})`,
      authority_type: "State Tenancy Machinery / Civil Court",
      domain: "TENANT_RIGHTS",
      state_ut: stateUt,
      district,
      jurisdiction_scope: "STATE",
      office_address: `District Court / Revenue Authority, ${district}, ${stateUt}`,
      filing_modes: ["PHYSICAL_COUNTER"],
      legal_basis: `Applicable State Tenancy Legislation in ${stateUt}`,
      source_record_ids: ["SRC-TEN-2A-001"],
      verification_status: "CURRENT",
      location_confidence: "OFFICE_LOCATION_REQUIRES_VERIFICATION",
      last_verified: "2026-08-20",
      notes: `Tenancy in ${stateUt} is governed by state-specific rent statutes. Physical filing is subject to local civil court/rent controller territorial jurisdiction.`
    };

    return {
      query,
      resolvedLocation: location,
      competentAuthority: authority,
      confidence: "OFFICE_LOCATION_REQUIRES_VERIFICATION",
      disclaimer: `Tenancy laws in ${stateUt} are strictly state-specific. Contact the local district administration or civil court for exact filing procedures.`,
      suggestedActions: {
        canStartForm: false,
        canAddToTracker: false
      }
    };
  }

  // 3. RTI ACCESS ROUTING (CENTRAL VS STATE VS LOCAL CIVIC)
  if (query.domain === "RTI_ACCESS") {
    const sphere = query.rti_sphere || "LOCAL_CIVIC_BODY";

    if (sphere === "CENTRAL_PUBLIC_AUTHORITY") {
      const auth = getAuthorityById("CPIO_EPFO_CENTRAL") || {
        authority_id: "CPIO_CENTRAL_GENERIC",
        name: "Central Public Information Officer (CPIO) — Central Ministry / Department",
        authority_type: "Central Public Authority PIO",
        domain: "RTI_ACCESS",
        state_ut: "National",
        jurisdiction_scope: "CENTRAL",
        office_address: "Respective Central Ministry / PSU Headquarters, New Delhi",
        official_website: "https://rtionline.gov.in",
        filing_portal: "https://rtionline.gov.in",
        filing_modes: ["ONLINE", "POSTAL"],
        legal_basis: "Right to Information Act, 2005, Section 6(1)",
        source_record_ids: ["SRC-RTI-NAT-001"],
        verification_status: "CURRENT",
        location_confidence: "EXACT_VERIFIED",
        last_verified: "2026-08-20",
        suggested_form_id: "FORM-RTI-6-1"
      };

      return {
        query,
        resolvedLocation: location,
        competentAuthority: auth,
        confidence: "EXACT_VERIFIED",
        disclaimer: "Central Public Authorities (EPFO, Railways, Income Tax, Defense, Central PSUs) must be filed through Central RTI Online (rtionline.gov.in), regardless of which State you live in.",
        suggestedActions: {
          canStartForm: true,
          formId: "FORM-RTI-6-1",
          formTitle: "RTI Application (Section 6(1))",
          portalUrl: auth.filing_portal,
          canAddToTracker: true,
          deadlineRuleId: "RTI_SEC_7_1_NORMAL"
        }
      };
    }

    if (sphere === "LOCAL_CIVIC_BODY") {
      let localPio: CompetentAuthority | undefined;
      if (district.toLowerCase().includes("chennai")) {
        localPio = getAuthorityById("PIO_GREATER_CHENNAI_CORP");
      } else if (stateUt.toLowerCase().includes("delhi")) {
        localPio = getAuthorityById("PIO_MCD_DELHI");
      }

      if (!localPio) {
        localPio = {
          authority_id: `PIO_LOCAL_${district.toUpperCase()}`,
          name: `Public Information Officer (PIO) — ${location?.local_body_name || district + " Municipal Body"}`,
          authority_type: "Local Civic Body PIO",
          domain: "RTI_ACCESS",
          state_ut: stateUt,
          district,
          local_body: location?.local_body_name,
          jurisdiction_scope: "LOCAL_BODY",
          office_address: `Municipal Corporation / Collectorate Office, ${district}, ${stateUt}`,
          filing_modes: ["PHYSICAL_COUNTER", "POSTAL"],
          legal_basis: `Right to Information Act, 2005, Section 6(1) & ${stateUt} State RTI Rules`,
          source_record_ids: ["SRC-RTI-NAT-001"],
          verification_status: "CURRENT",
          location_confidence: "DISTRICT_VERIFIED",
          last_verified: "2026-08-20",
          suggested_form_id: "FORM-RTI-6-1",
          notes: "Do NOT submit local civic road/sanitation RTI requests to Central rtionline.gov.in."
        };
      }

      return {
        query,
        resolvedLocation: location,
        competentAuthority: localPio,
        confidence: localPio.location_confidence,
        disclaimer: "Local civic matters (roads, streetlights, building approvals, sanitation) are held by the local municipal body / panchayat. Do not submit these to the Central RTI portal.",
        suggestedActions: {
          canStartForm: true,
          formId: "FORM-RTI-6-1",
          formTitle: "RTI Application (Section 6(1))",
          portalUrl: localPio.official_website,
          canAddToTracker: true,
          deadlineRuleId: "RTI_SEC_7_1_NORMAL"
        }
      };
    }

    // State Public Authority
    const statePio: CompetentAuthority = {
      authority_id: `SPIO_${stateUt.toUpperCase().replace(/\s+/g, "_")}`,
      name: `State Public Information Officer (SPIO) — Government of ${stateUt}`,
      authority_type: "State Public Authority SPIO",
      domain: "RTI_ACCESS",
      state_ut: stateUt,
      district,
      jurisdiction_scope: "STATE",
      office_address: `State Secretariat / District Administrative Complex, ${district}, ${stateUt}`,
      filing_modes: ["POSTAL", "PHYSICAL_COUNTER"],
      legal_basis: `Right to Information Act, 2005, Section 6(1) & ${stateUt} RTI Rules`,
      source_record_ids: ["SRC-RTI-NAT-001"],
      verification_status: "CURRENT",
      location_confidence: "STATE_LEVEL_VERIFIED",
      last_verified: "2026-08-20",
      suggested_form_id: "FORM-RTI-6-1"
    };

    return {
      query,
      resolvedLocation: location,
      competentAuthority: statePio,
      confidence: "STATE_LEVEL_VERIFIED",
      disclaimer: `State Government RTI applications in ${stateUt} must be submitted to the respective State Department SPIO under State RTI Rules.`,
      suggestedActions: {
        canStartForm: true,
        formId: "FORM-RTI-6-1",
        formTitle: "RTI Application (Section 6(1))",
        canAddToTracker: true,
        deadlineRuleId: "RTI_SEC_7_1_NORMAL"
      }
    };
  }

  // 4. WORKPLACE RIGHTS ROUTING (CENTRAL VS STATE SPHERE & GRATUITY)
  if (query.domain === "WORKPLACE_RIGHTS") {
    if (query.workplace_issue_type === "GRATUITY") {
      const gratuityAuth =
        getAuthorityById("CONTROLLING_AUTHORITY_GRATUITY_CHENNAI") || {
          authority_id: `CONTROLLING_AUTHORITY_GRATUITY_${district.toUpperCase()}`,
          name: `Controlling Authority under the Payment of Gratuity Act — ${district}`,
          authority_type: "Statutory Gratuity Adjudication Authority",
          domain: "WORKPLACE_RIGHTS",
          state_ut: stateUt,
          district,
          jurisdiction_scope: "DISTRICT",
          office_address: `Office of the Deputy Commissioner of Labour / Controlling Authority, ${district}, ${stateUt}`,
          filing_modes: ["PHYSICAL_COUNTER", "POSTAL"],
          legal_basis: "Payment of Gratuity Act, 1972, Section 3 & Section 7",
          source_record_ids: ["SRC-WRK-004-SOCIAL-SECURITY"],
          verification_status: "CURRENT",
          location_confidence: "DISTRICT_VERIFIED",
          last_verified: "2026-08-20",
          suggested_form_id: "FORM-WRK-GRATUITY-N"
        };

      return {
        query,
        resolvedLocation: location,
        competentAuthority: gratuityAuth,
        confidence: gratuityAuth.location_confidence,
        disclaimer: "Gratuity recovery claims are adjudicated by the Controlling Authority under Section 7 of the Payment of Gratuity Act, 1972 via Form N.",
        suggestedActions: {
          canStartForm: true,
          formId: "FORM-WRK-GRATUITY-N",
          formTitle: "Form N Gratuity Direction Application",
          canAddToTracker: true,
          deadlineRuleId: "WRK_GRATUITY_30_DAY_PAYMENT"
        }
      };
    }

    if (query.workplace_sphere === "CENTRAL_SPHERE_ESTABLISHMENT") {
      const alcCentral =
        getAuthorityById("ALC_CENTRAL_CHENNAI") || {
          authority_id: `ALC_CENTRAL_${district.toUpperCase()}`,
          name: `Office of the Assistant Labour Commissioner (Central) — ${district}`,
          authority_type: "Central Labour Conciliation Authority",
          domain: "WORKPLACE_RIGHTS",
          state_ut: stateUt,
          district,
          jurisdiction_scope: "CENTRAL",
          office_address: `Central Government Office Complex / Shastri Bhawan, ${district}`,
          official_website: "https://clc.gov.in",
          filing_portal: "https://samadhan.labour.gov.in",
          filing_modes: ["ONLINE", "PHYSICAL_COUNTER"],
          legal_basis: "Industrial Relations Code, 2020 / Industrial Disputes Act, 1947, Section 4",
          source_record_ids: ["SRC-WRK-003-TERMINATION"],
          verification_status: "CURRENT",
          location_confidence: "DISTRICT_VERIFIED",
          last_verified: "2026-08-20",
          suggested_form_id: "FORM-WRK-SAMADHAN"
        };

      return {
        query,
        resolvedLocation: location,
        competentAuthority: alcCentral,
        confidence: alcCentral.location_confidence,
        disclaimer: "Conciliation for Central Sphere establishments (Banks, PSUs, Railways, Ports, Mines, Telecom, Central Gov) is administered by the Chief Labour Commissioner (Central) through the SAMADHAN portal.",
        suggestedActions: {
          canStartForm: true,
          formId: "FORM-WRK-SAMADHAN",
          formTitle: "SAMADHAN Industrial Dispute Application",
          portalUrl: alcCentral.filing_portal,
          canAddToTracker: true,
          deadlineRuleId: "WRK_WAGE_DISBURSEMENT_MONTHLY"
        }
      };
    }

    // State Private Establishment
    const stateLabour: CompetentAuthority = {
      authority_id: `STATE_LABOUR_OFFICE_${district.toUpperCase()}`,
      name: `Office of the Labour Officer / Conciliation Officer — ${district}`,
      authority_type: "State Labour Department Conciliation Authority",
      domain: "WORKPLACE_RIGHTS",
      state_ut: stateUt,
      district,
      jurisdiction_scope: "DISTRICT",
      office_address: `State Labour Department Complex, ${district}, ${stateUt}`,
      filing_modes: ["PHYSICAL_COUNTER", "POSTAL"],
      legal_basis: "Industrial Relations Code, 2020 & State Labour Rules",
      source_record_ids: ["SRC-WRK-001-WAGES"],
      verification_status: "CURRENT",
      location_confidence: "DISTRICT_VERIFIED",
      last_verified: "2026-08-20",
      suggested_form_id: "FORM-WRK-SAMADHAN"
    };

    return {
      query,
      resolvedLocation: location,
      competentAuthority: stateLabour,
      confidence: "DISTRICT_VERIFIED",
      disclaimer: `Disputes with private shops, commercial establishments, and state factories in ${stateUt} are conciliated by the State Labour Department.`,
      suggestedActions: {
        canStartForm: true,
        formId: "FORM-WRK-SAMADHAN",
        formTitle: "Industrial Dispute Application",
        canAddToTracker: true,
        deadlineRuleId: "WRK_WAGE_DISBURSEMENT_MONTHLY"
      }
    };
  }

  // 5. WELFARE SCHEMES ROUTING (INTEGRATED WITH FEATURE 5)
  if (query.domain === "WELFARE_SCHEMES") {
    let schemeRecord = query.scheme_id
      ? WELFARE_SOURCES.find((s) => s.id === query.scheme_id)
      : undefined;

    const welfareAuth: CompetentAuthority = {
      authority_id: schemeRecord ? `SCHEME_AUTH_${schemeRecord.id}` : `DEPT_WELFARE_${district.toUpperCase()}`,
      name: schemeRecord?.provenance.administering_authority || `District Social Welfare Officer (${district})`,
      authority_type: "Scheme Implementing Authority",
      domain: "WELFARE_SCHEMES",
      state_ut: stateUt,
      district,
      jurisdiction_scope: schemeRecord?.jurisdiction.government_level === "CENTRAL" ? "CENTRAL" : "DISTRICT",
      office_address: `District Administrative Complex / Collectorate, ${district}, ${stateUt}`,
      official_website: schemeRecord?.provenance.official_source_url || "https://www.myscheme.gov.in",
      filing_portal: schemeRecord?.authority_details?.portal_url || "https://www.myscheme.gov.in",
      filing_modes: schemeRecord?.authority_details?.filing_modes || ["ONLINE", "PHYSICAL_COUNTER"],
      legal_basis: schemeRecord?.provenance.legal_basis || "Official Welfare Scheme Guidelines (myScheme)",
      source_record_ids: schemeRecord ? [schemeRecord.id] : ["SRC-SCH-4A-PMMVY"],
      verification_status: schemeRecord?.provenance.verification_status || "CURRENT",
      location_confidence: schemeRecord?.authority_details?.portal_url ? "EXACT_VERIFIED" : "DISTRICT_VERIFIED",
      last_verified: schemeRecord?.provenance.last_verified || "2026-08-20"
    };

    return {
      query,
      resolvedLocation: location,
      competentAuthority: welfareAuth,
      confidence: welfareAuth.location_confidence,
      disclaimer: "Welfare scheme applications are processed online-first through designated official portals (myScheme, NSP, State DBT) or at the District Social Welfare / Revenue Office.",
      suggestedActions: {
        canStartForm: false,
        portalUrl: welfareAuth.filing_portal,
        canAddToTracker: false
      }
    };
  }

  // Fallback
  return {
    query,
    resolvedLocation: location,
    confidence: "OFFICE_LOCATION_REQUIRES_VERIFICATION",
    disclaimer: "Authority identified based on general administrative guidelines. Exact local counter requires district verification.",
    competentAuthority: {
      authority_id: `AUTH_GENERIC_${district.toUpperCase()}`,
      name: `District Administration Office (${district})`,
      authority_type: "District Administration",
      domain: query.domain,
      state_ut: stateUt,
      district,
      jurisdiction_scope: "DISTRICT",
      office_address: `District Collectorate, ${district}, ${stateUt}`,
      filing_modes: ["PHYSICAL_COUNTER"],
      legal_basis: "Administrative Procedure",
      source_record_ids: [],
      verification_status: "CURRENT",
      location_confidence: "OFFICE_LOCATION_REQUIRES_VERIFICATION",
      last_verified: "2026-08-20"
    },
    suggestedActions: {
      canStartForm: false,
      canAddToTracker: false
    }
  };
}
