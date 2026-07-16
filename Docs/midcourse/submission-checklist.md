# Submission Readiness Checklist

Use this as a strict **Met / Not Met** gate. Do not submit until every required item is complete or honestly identified for correction.

## Repository and branch

- [ ] Repository is public. — **VERIFY EXTERNALLY:** `https://github.com/FadiZahhar/TaskManagerAI` returns **404 to anonymous access**; the owner must set the GitHub repository to **public** before submission.
- [ ] Submitted URL opens without authentication. — pending the public-visibility fix above.
- [x] Branch is named exactly `mid-course-project`.
- [x] Branch contains the final code and documentation.
- [x] No secrets, tokens, credentials, private data, `.env` files, or unrelated generated artifacts are committed.
- [x] No temporary Break Test mutation remains.

## Two scoped features

- [x] Feature 1 is complete end-to-end: backend, tests, frontend, manual verification.
- [x] Feature 2 is complete end-to-end: backend, tests, frontend, manual verification.
- [x] At least one feature is visible and usable in the frontend; this plan expects both.
- [x] Existing Module 1–3 behavior still works.
- [x] No unapproved scope extensions were added.

## Tests

- [x] All existing tests are retained.
- [x] At least four new pytest tests exist.
- [x] New tests follow existing fixture/state conventions.
- [x] Tests assert meaningful response/body/state behavior.
- [x] Targeted tests pass.
- [x] Full pytest suite passes.
- [x] Break Test 1 shows correct pass → expected failure → restored pass.
- [x] Break Test 2 shows correct pass → expected failure → restored pass.
- [x] Git proof confirms both temporary mutations were restored.

## AI-assisted workflow evidence

- [x] At least three meaningful prompts are logged for Feature 1.
- [x] At least three meaningful prompts are logged for Feature 2.
- [x] One weak prompt is rewritten into a stronger prompt.
- [x] Each prompt entry summarizes what AI returned.
- [x] Each prompt entry states what was accepted, edited, or rejected.
- [x] At least one AI assumption corrected for Feature 1.
- [x] At least one AI assumption corrected for Feature 2.
- [x] One real evidence-based debugging example is documented.
- [x] No fabricated or generic transcript summaries are present.

## Required documentation in `docs/midcourse/`

- [x] `user-stories.md` has 3–5 stories per feature and acceptance criteria.
- [x] `mini-adr.md` explains decisions, alternatives, and rejected scope.
- [x] `prompt-log.md` is complete.
- [x] `verification.md` includes baseline, tests, browser checks, contract, and two Break Tests.
- [x] `reflection.md` is 250–500 words and based on actual events.
- [x] No `TBD`, `NOT RUN` that should have been completed, or bracketed placeholders remain.

## Refactor evidence

- [x] Working checkpoint exists before refactor.
- [x] Refactor is focused on one area.
- [x] Diff was reviewed.
- [x] Behavior contract passed before refactor.
- [x] Relevant behavior contract passed after refactor.
- [x] Full tests pass after refactor.

## README and run instructions

- [x] README explains dependency installation.
- [x] README contains the actual backend start command.
- [x] README contains the actual frontend open/serve command.
- [x] README contains the actual full pytest command.
- [x] README commands were run from a fresh/reliable repository state.
- [x] README names the two selected features and links to `docs/midcourse/`.

## Final status

- **Code:** `READY`
- **Automated tests:** `PASS` — `60 passed` (25 baseline + 16 Feature 1 + 19 Feature 2)
- **Manual browser checks:** `PASS` — Feature 1 53/53, Feature 2 22/22 (headless Chrome via CDP); baseline live-smoke `NOT RUN` (historical, superseded by §3/§4)
- **Documentation:** `COMPLETE` — 0 bracket placeholders in the six required files; reflection 409 words
- **Repository hygiene:** `PASS` — `.DS_Store` untracked + gitignored; no secrets/debug output/wildcard CORS; Break Test mutations restored
- **Submission recommendation:** `READY AFTER CORRECTIONS` — (1) set the GitHub repository to **public** (URL currently 404 to anonymous); (2) create the final reviewed commit + push the last audit changes (README merge, `.DS_Store` removal, §10 hygiene) per Prompt 19.
- **Repository URL:** `https://github.com/FadiZahhar/TaskManagerAI`
