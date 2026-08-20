# Team Workflow & Branching Strategy

This document outlines the GitHub collaboration workflow for the InfoRight AI project.

## Team Feature Branches & Ownership Mapping

Each contributor is assigned a specific feature branch. Contributors must create their own branch locally from the latest `main` branch:

- `feature/rti-engine` — Harsha
  AI integration, Gemini prompts, structured output, validation, deterministic authority logic, fallback, integration, deployment and Pull Request review.

- `feature/frontend` — Abirami
  Next.js foundation, frontend UI/UX, guided form, client-side applicant details, editable document preview, trust panel, citation cards, copy/print/PDF and responsive design.

- `feature/source-data` — Mithun
  Official government sources, citation metadata, verification dates, source documentation, README support and manual test evidence. No vector database or general RAG.

> **Note**: Do not create all feature branches on a single machine. Each contributor must create their own branch from `main` on their local environment.

## Step-by-Step Development Workflow

1. **Update Local `main`**:
   Before starting any work, sync your local `main` branch with the remote repository:
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create or Switch to Assigned Branch**:
   Create and switch to your feature branch based on the latest `main`:
   ```bash
   git checkout -b feature/<assigned-feature>
   ```

3. **Make Small, Atomic Commits**:
   Keep commits focused and write clear, meaningful commit messages following standard conventions (e.g., `feat: ...`, `fix: ...`, `docs: ...`).
   ```bash
   git add <modified-files>
   git commit -m "feat: description of work done"
   ```

4. **Push Branch to GitHub**:
   Push your feature branch to the remote GitHub repository:
   ```bash
   git push -u origin feature/<assigned-feature>
   ```

5. **Open a Pull Request**:
   Open a Pull Request (PR) from your feature branch into `main` using the repository PR template.

6. **Build and Test**:
   Ensure all builds and automated/manual tests pass clean before requesting a review or merging.

7. **Integration Review**:
   One controlled integration review must happen before every merge into `main`. Direct pushes to `main` are strictly prohibited.
