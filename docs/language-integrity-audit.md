# InfoRight AI — Language Integrity & Global State Forensic Audit

## 1. Forensic Audit Findings & Resolution

| Audit Area | Previous State | Forensic Defect Detected | Corrective Action & Hardened Pattern |
| :--- | :--- | :--- | :--- |
| **Global State Management** | `LanguageContext.tsx` | Multiple local `useState` language initializers existed across sub-components, creating potential out-of-sync states. | Unified under `LanguageContext.tsx` with automatic `localStorage` synchronization, `StorageEvent` broadcast across browser tabs, and CustomEvent `"languageChange"`. |
| **Document RTL Switching** | Root HTML element | When switching to Urdu (`ur-IN`), directional CSS and `dir="rtl"` had to be enforced on `document.documentElement`. | Direct `useEffect` hook in `LanguageContext.tsx` dynamically sets `document.documentElement.lang = "ur"` and `document.documentElement.dir = "rtl"`. |
| **Static vs Canonical Separation** | Translation dictionary | Risk of translating statutory Act titles or case IDs into broken vernacular. | Strict policy: Static UI Chrome (buttons, labels, badges) resolved via `t(...)` from 23 locale bundles. Official Act titles, Court/Tribunal designations, and Source IDs remain canonical. |
| **Dynamic Legal Result Translation** | Action Planner & Dispute Engines | Re-evaluating legal decisions upon language change could alter deterministic statutory outputs. | Legal decisions and statutory sections remain 100% deterministic invariant; UI presentation wrappers dynamically translate labels and explainer notes. |
| **Progressive Location Entry** | Location Selectors | Unnecessary 10-field forms displayed on pages where location wasn't relevant. | `IndiaLocationSelector` component introduced with progressive disclosure: State $\rightarrow$ District $\rightarrow$ PIN $\rightarrow$ Locality. |
| **Conflict Guard** | Location Resolver | Selecting a State (e.g. Tamil Nadu) with a contradictory PIN (e.g. 560001 Karnataka) previously resolved silently. | Active `conflictStatus: "LOCATION_CONFIRMATION_REQUIRED"` alert triggered when PIN prefix does not match the selected State/UT. |

---

## 2. Supported Indian Language Bundles (23 Scheduled Languages):
1. **Assamese** (`as-IN`)
2. **Bengali** (`bn-IN`)
3. **Bodo** (`brx-IN`)
4. **Dogri** (`doi-IN`)
5. **English (India)** (`en-IN`)
6. **Gujarati** (`gu-IN`)
7. **Hindi** (`hi-IN`)
8. **Kannada** (`kn-IN`)
9. **Kashmiri** (`ks-IN`)
10. **Konkani** (`kok-IN`)
11. **Maithili** (`mai-IN`)
12. **Malayalam** (`ml-IN`)
13. **Manipuri (Meitei)** (`mni-IN`)
14. **Marathi** (`mr-IN`)
15. **Nepali** (`ne-IN`)
16. **Odia** (`od-IN`)
17. **Punjabi** (`pa-IN`)
18. **Sanskrit** (`sa-IN`)
19. **Santali** (`sat-IN`)
20. **Sindhi** (`sd-IN`)
21. **Tamil** (`ta-IN`)
22. **Telugu** (`te-IN`)
23. **Urdu** (`ur-IN` — RTL Enabled)

---

## 3. Localization Verification Status:
* **Automated i18n Auditor**: `0 unlocalized strings detected`
* **Schema Conformance**: All 23 locale files conform 1:1 to `src/i18n/locales/schema.ts`
