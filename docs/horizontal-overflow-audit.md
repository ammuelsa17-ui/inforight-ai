# InfoRight AI — Horizontal Overflow Audit & Viewport Validation

**Date**: 2026-08-22  
**Branch**: `fix/global-horizontal-overflow`

---

## 📱 Viewport & Language Cross-Matrix

| Route | 375px | 390px | 768px | 1024px | 1440px | EN | TA | HI | KN | UR (RTL) | Body X-Overflow | Fix Applied |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| `/` (Home) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **NO** | Converted 5-column loop into responsive `grid-cols-1 sm:grid-cols-2 lg:grid-cols-5` with `min-w-0` & `truncate`. |
| `/ask` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **NO** | Card flex containers clamped with `min-w-0` and wrapping buttons. |
| `/dashboard` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **NO** | Tab controls clamped with horizontal internal scroll when required. |
| `/dashboard/cases/[id]` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **NO** | Responsive vertical stacking on mobile for `JourneyProgress` stages. |
| `/official` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **NO** | Queue cards wrap gracefully on 375px viewports. |
| `/official/cases/[id]` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **NO** | Embedded responsive `JourneyProgress` and clamped action cards. |
| `/rights` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **NO** | `PageContainer` with `max-w-full min-w-0`. |
| `/schemes` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **NO** | Scheme comparison tags wrap within card boundaries. |
| `/sources` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **NO** | Added `min-w-0` and `break-words` on all source directory items. |
| `/resources` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **NO** | Helplines and portal links wrap safely. |
| `/forms` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **NO** | Wizard steps stack vertically on mobile. |
| `/locator` | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **NO** | Authority cards clamped with `min-w-0`. |

---

## 🛡️ Containment Invariants Enforced
1. **Root Body Guard**: Added `max-width: 100%; overflow-x: clip;` to `html, body` in [`src/app/globals.css`](file:///Volumes/Disk%20D/OOSC/src/app/globals.css).
2. **Component Fluidity**: Replaced rigid horizontal flex rows in `JourneyProgress.tsx` with responsive `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 min-w-0`.
3. **No Unintended Width Expansion**: Verified zero instances of `w-screen` inside padded containers.
