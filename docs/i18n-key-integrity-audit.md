# InfoRight AI — Whole-Site Translation Key Integrity Audit

**Date**: 2026-08-22  
**Branch**: `fix/global-i18n-key-integrity`

---

## 🔍 Key Integrity Audit Matrix

| Key | Used In File(s) | In Schema | In English (`en.ts`) | In All 23 Locales | Status | Resolution / Canonical Value |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| `ask.pageTitle` | `src/app/ask/page.tsx` | YES | YES | YES | **FIXED** | *"Describe Your Problem"* |
| `ask.pageSubtitle` | `src/app/ask/page.tsx` | YES | YES | YES | **FIXED** | *"Tell us what happened. InfoRight will identify the relevant civic or legal path using source-grounded guidance."* |
| `ask.pinCodeLabel` | `src/app/ask/page.tsx`, `/rights/consumer`, `/rights/tenant`, `IndiaLocationSelector.tsx` | YES | YES | YES | **FIXED** | *"PIN Code"* |
| `ask.describeProblemRequired` | `src/app/ask/page.tsx` | YES | YES | YES | **FIXED** | *"Please describe your problem before continuing."* |
| `ask.translationUnavailable` | `src/app/ask/page.tsx` | YES | YES | YES | **FIXED** | *"Translation service currently unavailable. Showing canonical text."* |
| `ask.btnStopRecording` | `src/app/ask/page.tsx` | YES | YES | YES | **FIXED** | *"Stop"* |
| `ask.btnStartVoice` | `src/app/ask/page.tsx` | YES | YES | YES | **FIXED** | *"Speak in Your Language"* |
| `ask.transcribingText` | `src/app/ask/page.tsx` | YES | YES | YES | **FIXED** | *"Transcribing your voice..."* |
| `ask.voiceTranscriptLabel` | `src/app/ask/page.tsx` | YES | YES | YES | **FIXED** | *"Voice Transcript"* |
| `ask.btnUseTranscript` | `src/app/ask/page.tsx` | YES | YES | YES | **FIXED** | *"Use This Transcript"* |
| `ask.problemUnderstoodTitle` | `src/app/ask/page.tsx` | YES | YES | YES | **FIXED** | *"Problem Understood"* |
| `ask.problemDescLabel` | `/rights/consumer`, `/rights/tenant` | YES | YES | YES | **FIXED** | *"Problem Description"* |
| `evidence.addPhotoTitle` | `CitizenEvidenceCapture.tsx` | YES | YES | YES | **FIXED** | *"Attach Photo Evidence (Before Rectification)"* |
| `evidence.takePhotoBtn` | `CitizenEvidenceCapture.tsx` | YES | YES | YES | **FIXED** | *"Take Photo"* |
| `evidence.uploadPhotoBtn` | `CitizenEvidenceCapture.tsx` | YES | YES | YES | **FIXED** | *"Upload File"* |
| `evidence.descriptionLabel` | `CitizenEvidenceCapture.tsx` | YES | YES | YES | **FIXED** | *"Evidence Description"* |
| `evidence.descriptionPlaceholder` | `CitizenEvidenceCapture.tsx` | YES | YES | YES | **FIXED** | *"Describe the visible defect (e.g., deep road trench)..."* |
| `evidence.geoTagHeading` | `CitizenEvidenceCapture.tsx` | YES | YES | YES | **FIXED** | *"Device Location & GPS Metadata"* |
| `evidence.addLocationBtn` | `CitizenEvidenceCapture.tsx` | YES | YES | YES | **FIXED** | *"Capture GPS Location"* |
| `evidence.confirmEvidenceBtn` | `CitizenEvidenceCapture.tsx` | YES | YES | YES | **FIXED** | *"Attach Evidence to Case"* |

---

## 🛡️ Enforced Defect Prevention
1. **Automated Static CI Audit**: `scripts/audit-i18n.js` now verifies that **every single `t("namespace.key")`** called anywhere in `src/` exists in `en.ts` and `schema.ts`. Any missing key immediately fails CI with exit code 1.
2. **Navbar Logo Presentation**: Cleaned up the navbar logo area to show only `[Icon] InfoRight AI`, removing the multi-line language version tagline that previously crowded laptop widths.
3. **Safe Production Fallbacks**: `LanguageContext.t()` no longer displays raw `namespace.key` in production if an unknown key is encountered.
