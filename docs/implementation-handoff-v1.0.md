# InfoRight AI — Frozen Phase 1 Scope

## Product position

InfoRight AI converts an ordinary civic road-related problem into a record-based RTI application.

It is built for India, with official source verification currently demonstrated for Coimbatore City Municipal Corporation.

## Required workflow

1. User enters location and describes the road-related civic problem.
2. The system converts the complaint into 3–5 requests for existing government records.
3. The public authority is constructed deterministically.
4. Only allowlisted official citation IDs are accepted.
5. The applicant reviews and edits the application.
6. The application can be copied, printed or downloaded as PDF.
7. A deterministic template is returned if AI generation fails.

## Privacy boundary

Applicant name, full address and signature information must remain in the browser.

These fields must never be included in the Gemini/API-generation request.

## AI boundary

Gemini may generate only:

* Subject
* Short application body
* Three to five record-based questions
* Allowlisted citation IDs

Gemini must not determine:

* The public authority
* Official URLs
* RTI fees
* Laws
* Verification status
* Applicant personal information

## Deterministic features

* Authority construction
* Official source records
* Citation validation
* Response-schema validation
* Safe fallback
* Applicant-data privacy indicator

## Phase 1 exclusions

Do not implement:

* Authentication
* User history
* Database
* Vector database or general RAG
* Consumer complaint module
* Scheme eligibility module
* Nationwide verified PIO directory
* Automatic government-portal submission
* Payments
* Voice assistant
* Multilingual support

## Branch ownership

* Harsha: frontend, integration, PDF, deployment and Pull Request review
* Mithun: RTI API, Gemini output, validation and fallback
* Abirami: official sources, citation verification, documentation and testing evidence

No contributor may change the frozen scope or API contract without Harsha’s explicit approval.
