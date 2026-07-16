# Submission Readiness Checklist

Use this as a strict **Met / Not Met** gate. Do not submit until every required item is complete or honestly identified for correction.

## Repository and branch

- [ ] Repository is public.
- [ ] Submitted URL opens without authentication.
- [ ] Branch is named exactly `mid-course-project`.
- [ ] Branch contains the final code and documentation.
- [ ] No secrets, tokens, credentials, private data, `.env` files, or unrelated generated artifacts are committed.
- [ ] No temporary Break Test mutation remains.

## Two scoped features

- [ ] Feature 1 is complete end-to-end: backend, tests, frontend, manual verification.
- [ ] Feature 2 is complete end-to-end: backend, tests, frontend, manual verification.
- [ ] At least one feature is visible and usable in the frontend; this plan expects both.
- [ ] Existing Module 1–3 behavior still works.
- [ ] No unapproved scope extensions were added.

## Tests

- [ ] All existing tests are retained.
- [ ] At least four new pytest tests exist.
- [ ] New tests follow existing fixture/state conventions.
- [ ] Tests assert meaningful response/body/state behavior.
- [ ] Targeted tests pass.
- [ ] Full pytest suite passes.
- [ ] Break Test 1 shows correct pass → expected failure → restored pass.
- [ ] Break Test 2 shows correct pass → expected failure → restored pass.
- [ ] Git proof confirms both temporary mutations were restored.

## AI-assisted workflow evidence

- [ ] At least three meaningful prompts are logged for Feature 1.
- [ ] At least three meaningful prompts are logged for Feature 2.
- [ ] One weak prompt is rewritten into a stronger prompt.
- [ ] Each prompt entry summarizes what AI returned.
- [ ] Each prompt entry states what was accepted, edited, or rejected.
- [ ] At least one AI assumption corrected for Feature 1.
- [ ] At least one AI assumption corrected for Feature 2.
- [ ] One real evidence-based debugging example is documented.
- [ ] No fabricated or generic transcript summaries are present.

## Required documentation in `docs/midcourse/`

- [ ] `user-stories.md` has 3–5 stories per feature and acceptance criteria.
- [ ] `mini-adr.md` explains decisions, alternatives, and rejected scope.
- [ ] `prompt-log.md` is complete.
- [ ] `verification.md` includes baseline, tests, browser checks, contract, and two Break Tests.
- [ ] `reflection.md` is 250–500 words and based on actual events.
- [ ] No `TBD`, `NOT RUN` that should have been completed, or bracketed placeholders remain.

## Refactor evidence

- [ ] Working checkpoint exists before refactor.
- [ ] Refactor is focused on one area.
- [ ] Diff was reviewed.
- [ ] Behavior contract passed before refactor.
- [ ] Relevant behavior contract passed after refactor.
- [ ] Full tests pass after refactor.

## README and run instructions

- [ ] README explains dependency installation.
- [ ] README contains the actual backend start command.
- [ ] README contains the actual frontend open/serve command.
- [ ] README contains the actual full pytest command.
- [ ] README commands were run from a fresh/reliable repository state.
- [ ] README names the two selected features and links to `docs/midcourse/`.

## Final status

- **Code:** `READY / NOT READY`
- **Automated tests:** `PASS / FAIL`
- **Manual browser checks:** `PASS / FAIL / NOT RUN`
- **Documentation:** `COMPLETE / INCOMPLETE`
- **Repository hygiene:** `PASS / FAIL`
- **Submission recommendation:** `READY / READY AFTER CORRECTIONS / NOT READY`
- **Repository URL:** `https://github.com/FadiZahhar/TaskManagerAI`
