# InfoRight AI - Agent & Collaborator Rules

All AI agents and team members contributing to the InfoRight AI repository must strictly adhere to the following collaboration rules:

1. **Read Implementation Handoff & API Contract**: Read the frozen implementation handoff documentation (`docs/implementation-handoff-v1.0.md`) and API contract (`docs/api-contract.md`) before modifying any code.
2. **Preserve API Contracts**: Do not rename or modify frozen API fields or contract definitions.
3. **Branch Scope Isolation**: Work only on your assigned feature branch and files.
4. **No Direct Main Commits**: Never commit directly to the `main` branch. All changes must arrive via Pull Request.
   > The repository owner may make the single initial bootstrap commit directly to `main` because no remote history exists. After that bootstrap commit, every change must arrive through a Pull Request.
5. **Protect Git History**: Never force-push (`git push --force`), rewrite commit history, or delete another team member's branch.
6. **Sync Before Starting**: Always pull the latest `main` branch (`git pull origin main`) before beginning new work.
7. **Zero Secret Leaks**: Never commit API keys, tokens, or credentials (`.env`, `.env.local`, etc.). Use `.env.example` for environment variable templates.
8. **Scope Enforcement**: Do not add dependencies, infrastructure, modules, or features outside the frozen scope without explicit approval.
