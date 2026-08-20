import {
  UnifiedRouterRequest,
  UnifiedRouterResponse,
  ExtractedFactProfile,
  StructuredActionStep
} from "@/types/router";
import { classifyIntentAndDomain } from "./intent-classifier";
import { resolveJurisdiction } from "./jurisdiction-resolver";
import {
  ALL_SOURCES,
  getSourcesByDomain,
  getSourcesBySubdomain,
  searchSourcesByKeywords
} from "@/data/sources";
import { getFormById, ALL_OFFICIAL_FORMS } from "@/data/forms";
import { VerifiedSourceRecord } from "@/types/source-data";

/**
 * Extracts facts and profile attributes from the user query
 */
function extractFactsFromQuery(query: string, profileHint?: Partial<ExtractedFactProfile>): ExtractedFactProfile {
  const lower = query.toLowerCase();
  const facts: ExtractedFactProfile = {
    ...profileHint,
    raw_entities: {}
  };

  // Age extraction (e.g. "I'm 19", "age 25", "19 years old")
  const ageMatch = lower.match(/(?:i'm|i am|age|aged)\s*(\d{1,2})|\b(\d{1,2})\s*(?:years old|yrs old|yo)\b/);
  if (ageMatch) {
    facts.age = parseInt(ageMatch[1] || ageMatch[2], 10);
  }

  // Income extraction (e.g. "income ₹1.8 lakh", "1.8L", "250000", "income is 1.8 lakh")
  const incomeMatch = lower.match(/(?:income|family income)\s*(?:is|of|:)?\s*(?:₹|rs\.?)?\s*([\d.]+)\s*(?:lakh|lakhs|l|k)?/);
  if (incomeMatch) {
    let val = parseFloat(incomeMatch[1]);
    if (lower.includes("lakh") || lower.includes(" l") || val < 100) {
      val = val * 100000;
    }
    facts.annual_family_income = val;
  }

  // Community extraction
  if (lower.includes("mbc")) facts.community = "MBC";
  else if (lower.includes("sc") || lower.includes("scheduled caste")) facts.community = "SC";
  else if (lower.includes("st") || lower.includes("scheduled tribe")) facts.community = "ST";
  else if (lower.includes("obc") || lower.includes("backward class")) facts.community = "OBC";
  else if (lower.includes("dnc") || lower.includes("dnt")) facts.community = "DNC";
  else if (lower.includes("ews")) facts.community = "EWS";

  // Education / Student extraction
  if (lower.includes("student") || lower.includes("studying") || lower.includes("engineering") || lower.includes("college")) {
    facts.is_student = true;
    if (lower.includes("engineering")) facts.education_level = "UG_ENGINEERING";
  }

  // Farmer extraction
  if (lower.includes("farmer") || lower.includes("agriculture") || lower.includes("crop") || lower.includes("patta")) {
    facts.is_farmer = true;
  }

  // Gender hint
  if (lower.includes("female") || lower.includes("woman") || lower.includes("girl") || lower.includes("daughter")) {
    facts.gender = "FEMALE";
  } else if (lower.includes("male") || lower.includes("man") || lower.includes("son")) {
    facts.gender = "MALE";
  }

  return facts;
}

/**
 * Master Unified Router & Retrieval Coordinator
 */
export function routeUserQuery(request: UnifiedRouterRequest): UnifiedRouterResponse {
  const { user_query, current_state_ut, current_district, user_profile } = request;
  
  // 1. Intent & Domain Classification
  const classification = classifyIntentAndDomain(user_query);
  
  // 2. Jurisdiction Resolution
  const jurisdiction = resolveJurisdiction(user_query, current_state_ut, current_district);
  
  // 3. Extract Facts & Profile
  const facts = extractFactsFromQuery(user_query, user_profile);
  
  // 4. Retrieve Relevant Verified Sources
  let matchedSources: VerifiedSourceRecord[] = [];
  if (classification.subdomain) {
    matchedSources = getSourcesBySubdomain(classification.subdomain);
  }
  if (matchedSources.length === 0 && classification.domain !== "FORM_FILLING") {
    matchedSources = getSourcesByDomain(classification.domain);
  }
  
  // Add keyword-specific sources
  const keywordMatches = searchSourcesByKeywords(user_query);
  keywordMatches.forEach((src) => {
    if (!matchedSources.some((s) => s.id === src.id)) {
      matchedSources.push(src);
    }
  });

  // Top sources prioritized by official hierarchy
  matchedSources.sort((a, b) => a.provenance.source_priority - b.provenance.source_priority);
  const selectedSources = matchedSources.slice(0, 4);

  // 5. Synthesize Domain-Specific Actionable Response
  const missingCriticalFacts: string[] = [];
  let progressiveQuestion: string | undefined = undefined;
  
  let plainLanguageExplanation = "";
  const verifiedFacts: string[] = [];
  const mandatoryRequirements: string[] = [];
  const possibleRemedies: string[] = [];
  const recommendations: string[] = [];
  const unknownAspects: string[] = [];
  const actionPlan: StructuredActionStep[] = [];
  const escalationPathway: string[] = [];
  
  let designatedAuthority: {
    name: string;
    designation?: string;
    portal_url?: string;
    helpline?: string;
    address?: string;
  } = {
    name: "Designated Public Authority",
    designation: "Statutory Authority",
    portal_url: "https://www.india.gov.in"
  };

  let suggestedForm: { form_id: string; form_name: string; portal_url?: string; submission_mode: string } | undefined = undefined;
  let schemeState: any = undefined;

  // =========================================================================
  // DOMAIN-SPECIFIC SYNTHESIS
  // =========================================================================

  if (classification.domain === "TENANT_RIGHTS") {
    if (!jurisdiction.state_ut) {
      missingCriticalFacts.push("state_ut");
      progressiveQuestion = "Which State or Union Territory is your rented property located in? (Tenancy laws, statutory deposit caps, and rent authority procedures vary strictly by State).";
      plainLanguageExplanation = "Tenancy law in India is State-specific under Entry 18 of the State List. In general, landlords cannot unlawfully withhold security deposits or disconnect water/electricity, but exact deposit limits (e.g. 3 months in Tamil Nadu vs 2 months under Model Tenancy Act) depend on your state jurisdiction.";
      verifiedFacts.push("Under Indian Tenancy jurisprudence, security deposits must be refunded upon vacant handover minus reasonable agreed deductions for damage (fair wear and tear excluded).");
      verifiedFacts.push("Landlords are strictly prohibited across all states from disconnecting water or electricity to force eviction.");
      mandatoryRequirements.push("Written rental agreement and rent payment receipts/bank records.");
      possibleRemedies.push("Recovery of withheld deposit with statutory interest; emergency restoration of utilities.");
      recommendations.push("Please provide your State/City to retrieve the exact State Tenancy Act and local Rent Authority details.");
    } else {
      // State is known (e.g. Tamil Nadu)
      const isTN = jurisdiction.state_ut.toLowerCase().includes("tamil nadu");
      if (isTN) {
        designatedAuthority = {
          name: "Rent Authority (Revenue Divisional Officer / Tahsildar)",
          designation: "Rent Authority",
          portal_url: "https://www.tenancy.tn.gov.in",
          helpline: "044-25670000"
        };
        suggestedForm = {
          form_id: "FORM-TEN-TN-REG",
          form_name: "Application for Registration of Tenancy Agreement (TNRRRLT Form I)",
          portal_url: "https://www.tenancy.tn.gov.in",
          submission_mode: "ONLINE_PORTAL"
        };
        plainLanguageExplanation = "Under the Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act, 2017 (TNRRRLT Act), security deposits for residential premises are capped at a maximum of three months' rent (Section 19). Landlords must refund the deposit within one month of vacant possession handover.";
        verifiedFacts.push("Section 19(1) of TNRRRLT Act limits residential security deposit to maximum 3 months' rent.");
        verifiedFacts.push("Section 20 strictly prohibits landlords from cutting off or withholding water or electricity supplies.");
        mandatoryRequirements.push("Preserve bank transaction records (NEFT/UPI) proving deposit payment and notice demanding refund.");
        possibleRemedies.push("Petition before the Rent Authority (RDO) under Section 19 for recovery of wrongfully withheld deposit.");
        possibleRemedies.push("Emergency interim order under Section 20(2) within 24 hours if essential utilities are severed.");
        recommendations.push("Send a formal demand notice via Email / Registered Post giving 15 days to refund the deposit.");
        
        actionPlan.push(
          {
            step_number: 1,
            action_title: "Issue Formal Written Demand Notice",
            action_type: "RECOMMENDED_FIRST_STEP",
            description: "Send a written notice to the landlord citing Section 19 of the TNRRRLT Act demanding the refund within 15 days."
          },
          {
            step_number: 2,
            action_title: "File Petition before Rent Authority (RDO)",
            action_type: "MANDATORY_REQUIREMENT",
            target_authority: "Rent Authority (RDO / Tahsildar)",
            portal_url: "https://www.tenancy.tn.gov.in",
            description: "If landlord fails to refund, file application before Rent Authority for statutory recovery."
          }
        );
        escalationPathway.push("Rent Authority (RDO/Tahsildar) -> Rent Court (Sub-Judge) -> Rent Tribunal (District Judge)");
      } else {
        plainLanguageExplanation = `Under the tenancy framework applicable in ${jurisdiction.state_ut}, security deposits must be refunded upon vacant handover minus agreed repair costs for actual damages (normal wear-and-tear excluded).`;
        verifiedFacts.push("Self-help lockouts and utility disconnections are unlawful across all Indian jurisdictions.");
        mandatoryRequirements.push("Preserve lease agreement and proof of payment.");
        possibleRemedies.push("Recovery petition before the designated Rent Court / Competent Authority.");
        recommendations.push("Issue a formal legal notice demanding refund of deposit within 15 days.");
      }
    }
  } else if (classification.domain === "CONSUMER_PROTECTION") {
    designatedAuthority = {
      name: "National Consumer Helpline (NCH) / District Consumer Commission",
      designation: "Consumer Redressal Authority",
      portal_url: "https://consumerhelpline.gov.in",
      helpline: "1915"
    };
    suggestedForm = {
      form_id: "FORM-CONS-EJAGRITI",
      form_name: "Consumer Complaint Petition (e-Jagriti)",
      portal_url: "https://ejagriti.gov.in",
      submission_mode: "ONLINE_PORTAL"
    };
    plainLanguageExplanation = "Under the Consumer Protection Act, 2019 and Consumer Protection (E-Commerce) Rules, 2020, e-commerce platforms and sellers cannot arbitrarily refuse returns or refunds for defective, damaged, or spurious items (Rule 6(4)). E-commerce platforms must appoint a Resident Grievance Officer who must acknowledge complaints within 48 hours and resolve within 30 days (Rule 4(4)).";
    verifiedFacts.push("Rule 4(4) of E-Commerce Rules mandates 48 hours for complaint acknowledgment and 30 days for resolution.");
    verifiedFacts.push("Rule 4(8) prohibits charging unilateral cancellation fees.");
    mandatoryRequirements.push("Preserve purchase tax invoice, product unboxing video/photos, and customer support chat transcripts.");
    possibleRemedies.push("Full refund of purchase amount with interest; replacement of product; compensation for mental agony and litigation expenses.");
    recommendations.push("Escalate to the designated Resident Grievance Officer via official email before approaching the consumer court.");

    actionPlan.push(
      {
        step_number: 1,
        action_title: "Escalate to Resident Grievance Officer",
        action_type: "RECOMMENDED_FIRST_STEP",
        description: "Submit a formal email ticket to the platform's Resident Grievance Officer citing the 48-hour acknowledgment rule."
      },
      {
        step_number: 2,
        action_title: "Lodge Docket on National Consumer Helpline (NCH 1915)",
        action_type: "MANDATORY_REQUIREMENT",
        target_authority: "National Consumer Helpline (NCH)",
        portal_url: "https://consumerhelpline.gov.in",
        helpline: "1915",
        description: "Register a free pre-litigation complaint docket on NCH (portal / WhatsApp 8800001915)."
      },
      {
        step_number: 3,
        action_title: "File Consumer Complaint via e-Jagriti",
        action_type: "ESCALATION_STEP",
        target_authority: "District Consumer Disputes Redressal Commission",
        portal_url: "https://ejagriti.gov.in",
        description: "File online consumer petition before the District Commission via e-Jagriti (Exempt from court fees up to ₹5 Lakhs)."
      }
    );
    escalationPathway.push("Platform Customer Care -> Resident Grievance Officer -> National Consumer Helpline (1915) -> District Consumer Commission (e-Jagriti)");
  } else if (classification.domain === "RTI_ACCESS") {
    designatedAuthority = {
      name: "Public Information Officer (PIO)",
      designation: "Central / State PIO",
      portal_url: jurisdiction.state_ut?.toLowerCase().includes("tamil nadu") ? "https://rtionline.tn.gov.in" : "https://rtionline.gov.in"
    };
    suggestedForm = {
      form_id: "FORM-RTI-6-1",
      form_name: "RTI Application under Section 6(1)",
      portal_url: designatedAuthority.portal_url,
      submission_mode: "ONLINE_PORTAL"
    };
    plainLanguageExplanation = "Under the Right to Information Act, 2005, citizens have the right to request and receive certified copies of existing government records, work orders, financial sanctions, and measurement book (MB) entries. The Supreme Court has clarified (CBSE v. Aditya Bandopadhyay) that RTI is for accessing existing recorded documents, not for asking PIOs subjective questions ('why/how') or demanding action.";
    verifiedFacts.push("Section 7(1) of RTI Act mandates response within 30 days of application receipt.");
    verifiedFacts.push("Section 7(6) mandates that information must be provided free of cost if delayed beyond 30 days.");
    mandatoryRequirements.push("RTI request must ask for specific, numbered, existing material records (Sanctions, Work Orders, Measurement Books, Bills, Defect Liability logs).");
    possibleRemedies.push("Certified copies of tender work orders, contractor payment logs, defect liability records, and inspection notes.");
    recommendations.push("Pay the ₹10 statutory fee via Court Fee Stamp / IPO / Online Payment gateway.");

    actionPlan.push(
      {
        step_number: 1,
        action_title: "Draft Record-Based RTI Application",
        action_type: "RECOMMENDED_FIRST_STEP",
        description: "Use our structured numbered questions asking for Certified Administrative Sanction, Work Order, Measurement Book entries, and Contractor DLP."
      },
      {
        step_number: 2,
        action_title: "Submit to Designated PIO",
        action_type: "MANDATORY_REQUIREMENT",
        portal_url: designatedAuthority.portal_url,
        description: "File online via State/Central RTI portal or send via Speed Post with ₹10 fee."
      }
    );
    escalationPathway.push("CPIO/SPIO (30 days) -> First Appellate Authority (FAA within 30 days) -> Central/State Information Commission (Second Appeal within 90 days)");
  } else if (classification.domain === "WELFARE_SCHEMES") {
    schemeState = "POTENTIALLY_ELIGIBLE";
    plainLanguageExplanation = `Based on your profile (Age: ${facts.age || "Not specified"}, Community: ${facts.community || "Not specified"}, Student: ${facts.is_student ? "Yes" : "Not specified"}, Income: ₹${facts.annual_family_income || "Not specified"}), you appear potentially eligible for multiple higher education scholarships and welfare programs in ${jurisdiction.state_ut || "India"}.`;
    
    verifiedFacts.push("PM Young Achievers Scholarship (PM-YASASVI) provides post-matric scholarship support to OBC/EBC/DNT students with family income up to ₹2.5 Lakhs.");
    verifiedFacts.push("PM-USP Central Sector Scheme of Scholarship for College and University Students provides ₹12,000/year to students above 80th percentile with family income up to ₹4.5 Lakhs.");
    
    if (jurisdiction.state_ut?.toLowerCase().includes("tamil nadu")) {
      verifiedFacts.push("Tamil Nadu Post-Matric Scholarship for BC/MBC/DNC students provides tuition fee reimbursement and maintenance allowance for family income up to ₹2.5 Lakhs.");
      verifiedFacts.push("Pudhumai Penn Scheme provides ₹1,000/month for girl students pursuing UG courses who studied in Tamil Nadu Government schools from Class 6 to 12.");
      designatedAuthority = {
        name: "National Scholarship Portal & Tamil Nadu BC/MBC Welfare Department",
        designation: "Scholarship Sanctioning Authority",
        portal_url: "https://scholarships.gov.in"
      };
      
      // Progressive questions
      progressiveQuestion = "To confirm exact scholarship entitlement: (1) Did you study from Class 6 to 12 in a Tamil Nadu Government school? (2) Which year of engineering are you currently enrolled in?";
    } else {
      designatedAuthority = {
        name: "National Scholarship Portal (NSP)",
        designation: "Central Nodal Agency",
        portal_url: "https://scholarships.gov.in",
        helpline: "0120-6619540"
      };
    }

    mandatoryRequirements.push("Income Certificate from Revenue Authority (Tahsildar), Community Certificate, and College Bonafide Certificate.");
    possibleRemedies.push("Direct Benefit Transfer (DBT) scholarship credit directly into Aadhaar-seeded bank account.");
    recommendations.push("Create a One Time Registration (OTR) ID on the National Scholarship Portal (scholarships.gov.in).");

    actionPlan.push(
      {
        step_number: 1,
        action_title: "Obtain Income & Community Certificates",
        action_type: "RECOMMENDED_FIRST_STEP",
        description: "Ensure you possess a valid Income Certificate showing family income <₹2.5 Lakhs and MBC Community Certificate from Revenue Department."
      },
      {
        step_number: 2,
        action_title: "Apply on National Scholarship Portal",
        action_type: "MANDATORY_REQUIREMENT",
        portal_url: "https://scholarships.gov.in",
        description: "Submit online application for PM-YASASVI / Post-Matric Scholarship before the notified academic deadline."
      }
    );
    escalationPathway.push("College Nodal Officer -> District Social / BC Welfare Officer -> State Welfare Directorate");
  } else if (classification.domain === "WORKPLACE_RIGHTS") {
    designatedAuthority = {
      name: "Assistant Labour Commissioner (Central/State) / SAMADHAN Portal",
      designation: "Conciliation Officer",
      portal_url: "https://samadhan.labour.gov.in",
      helpline: "14434"
    };
    suggestedForm = {
      form_id: "FORM-WRK-SAMADHAN",
      form_name: "Industrial Dispute Application under Industrial Relations Code, 2020 (SAMADHAN Portal)",
      portal_url: "https://samadhan.labour.gov.in",
      submission_mode: "ONLINE_PORTAL"
    };
    plainLanguageExplanation = "Under the Code on Wages 2019 and Industrial Relations Code 2020, employers must pay earned salary by the 7th/10th of the month. Unauthorized deductions or unpaid overtime (mandatory double rate) are illegal. Worker retrenchment under Section 70 of the Industrial Relations Code requires 1 month notice (or wages in lieu) and retrenchment compensation equal to 15 days average pay per completed year of continuous service.";
    verifiedFacts.push("Section 70 of the Industrial Relations Code, 2020 mandates 1 month notice (or pay in lieu) and 15 days average pay per completed year of continuous service as retrenchment compensation (with Chapter X prior permission required for establishments with 300+ workers).");
    verifiedFacts.push("Maternity Benefit Act 1961 read with Code on Social Security 2020 guarantees 26 weeks paid maternity leave; termination during pregnancy is strictly prohibited.");
    mandatoryRequirements.push("Preserve salary slips, bank statements, appointment contract, and written demand notice.");
    possibleRemedies.push("Recovery of unpaid wages with statutory compensation; reinstatement with back-wages or retrenchment severance package.");
    recommendations.push("Send formal written demand email giving 7 days to employer before filing on SAMADHAN portal.");

    actionPlan.push(
      {
        step_number: 1,
        action_title: "Send Formal Demand Email to HR/Management",
        action_type: "RECOMMENDED_FIRST_STEP",
        description: "Send formal written notice giving employer 7 days to clear pending dues."
      },
      {
        step_number: 2,
        action_title: "Register Dispute on SAMADHAN Portal",
        action_type: "MANDATORY_REQUIREMENT",
        portal_url: "https://samadhan.labour.gov.in",
        description: "File online dispute docket for conciliation before the Assistant Labour Commissioner."
      }
    );
    escalationPathway.push("Employer Demand Notice -> Conciliation Officer (ALC) -> Labour Court / Industrial Tribunal (CGIT)");
  }

  return {
    intent: classification.intent,
    primary_domain: classification.domain,
    subdomain: classification.subdomain,
    jurisdiction,
    fact_analysis: {
      known_facts: facts,
      missing_critical_facts: missingCriticalFacts,
      is_sufficient_for_resolution: missingCriticalFacts.length === 0
    },
    progressive_question_to_ask: progressiveQuestion,
    response: {
      plain_language_explanation: plainLanguageExplanation,
      verified_statutory_facts: verifiedFacts,
      mandatory_legal_requirements: mandatoryRequirements,
      possible_remedies: possibleRemedies,
      recommendations,
      unknown_or_unverified_aspects: unknownAspects,
      action_plan: actionPlan,
      designated_authority: designatedAuthority,
      suggested_form: suggestedForm,
      scheme_eligibility_state: schemeState,
      escalation_pathway: escalationPathway
    },
    official_sources: selectedSources.map((s) => ({
      id: s.id,
      title: s.title,
      authority: s.provenance.administering_authority,
      url: s.provenance.official_source_url,
      source_type: s.provenance.source_type,
      verification_status: s.provenance.verification_status,
      source_priority: s.provenance.source_priority
    })),
    legal_disclaimer: "This guidance is generated based on verified statutory enactments and official government portals. InfoRight AI does not provide formal legal representation, guarantee dispute victory, or sanction welfare benefits. Consult designated statutory authorities or qualified counsel before taking legal action."
  };
}
