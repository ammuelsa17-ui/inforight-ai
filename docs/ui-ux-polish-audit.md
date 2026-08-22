# InfoRight AI — UI/UX Polish Audit

**Baseline Commit**: `67d941e21b2be4ba7da0f0322d7c5ee3ea3f60be`  
**Date**: 2026-08-22  

---

## 1. Global Inconsistencies Identified

1. **Page Container Diversity**:
   - Some pages used `max-w-4xl`, others `max-w-5xl`, `max-w-6xl`, or `max-w-7xl` arbitrarily.
   - Reading-heavy legal pages (`/rights/consumer`, `/rights/tenant`, `/rights/workplace`) stretched inconsistently.
   - Standardized to: `PageContainer size="narrow"` (`max-w-4xl`) for legal guides, `PageContainer size="default"` (`max-w-7xl`) for dashboard/locator/schemes.

2. **Header Rhythm & Typography**:
   - Inconsistent eyebrow labels: some pages used colored uppercase text, others used rounded pill badges with icons.
   - Standardized to `PageHeader` with unified `text-3xl md:text-4xl font-bold tracking-tight` titles and `text-base md:text-lg text-slate-600 leading-relaxed` subtitles.

3. **Card & Border Standards**:
   - Mixed border colors: `#BCD7EE` vs `slate-200` vs `borders`.
   - Standardized cards to `rounded-2xl bg-white border border-slate-200 shadow-xs`.

4. **Button & Action Sizing**:
   - Heights varied between `h-8`, `h-9`, `h-10`, `h-12`.
   - Standardized to `h-10` default (`py-2.5 px-4 font-bold text-xs sm:text-sm rounded-xl`).

5. **Form Field Alignment**:
   - Spacing between label and input standardized to `space-y-1.5`.
   - Form groups standardized to `gap-4`.

6. **RTL Compatibility**:
   - Checked Urdu layout: `dir="rtl"` flows naturally with flexbox alignment and logical margins.
