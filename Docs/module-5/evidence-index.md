# Module 5 Evidence Index

This index records observed Module 5 evidence. A status of **Not started** means
the corresponding bounded phase has not yet been performed; it is not a claim
of completion.

## Baseline

| Item | Observed value |
|---|---|
| Date | 2026-07-18 00:35:37 EEST (+0300) |
| Repository root | `/Users/apple/Documents/GitHub/TaskManagerAI` |
| Approved base ref | `origin/mid-course-project` |
| Working branch | `module-5-governance` |
| Starting commit | `c2a369ee552fe328c21602f6ed44c9c4675d01e7` |
| Starting commit subject | `docs: mark submission READY (repo public, final commit pushed)` |
| Tracked files at baseline | 131 |
| Documented full-suite command | `pytest` after activating `.venv` |
| Observed full-suite command | `.venv/bin/python -m pytest` |
| Baseline test result | **PASS — 60 passed, 4 warnings in 0.25s** |
| Test environment | Python 3.14.2, pytest 9.1.1, macOS |
| Existing root `AGENTS.md` | Present; Module 5 review is not started |
| Documentation root decision | Use the existing tracked `Docs/` directory |
| Existing uncommitted work | `Docs/Module5/Module_5_Prompt_Library.pdf` and `Docs/Module5/module_5_step_by_step_guide.md` were untracked before Phase 0 and were preserved |

## Baseline observations

- The approved remote base did not already contain `Docs/Module5/` or
  `Docs/module-5/`, so creating the branch did not overwrite the supplied
  Module 5 files.
- The shell did not expose a `python` or `pytest` command without virtual
  environment activation. The existing `.venv` provided Python and pytest, so
  the equivalent explicit command was used.
- The repository documents Python 3.9 compatibility, while this baseline ran
  on Python 3.14.2. The passing result is valid for the observed environment;
  Python 3.9 was not run in this phase.
- The four baseline warnings were one `TestClient`/`httpx` deprecation warning
  and three uses of Starlette's deprecated `HTTP_422_UNPROCESSABLE_ENTITY`
  constant. They did not fail the suite.
- `module-4-devops` was not merged. Its Module 4 evidence and DevOps files are
  not part of this branch baseline.

## Module 5 decisions active from Phase 0

- Module 5 work is based on `origin/mid-course-project`.
- Module 5 work is isolated on `module-5-governance`.
- New documentation uses `Docs/` to match the repository's tracked directory.
- `Docs/decisions/` and `Docs/module-5/` exist for the planned artifacts and
  supporting evidence.
- Module 5 remains docs-first and read-only by default.
- No application edit, merge, commit, or push was approved for Phase 0.

## External checkpoint observed during Phase 1

- Commit `e4c7414a7532b572634bc9b1ce3ba7c1b842e194` (`first commit module 5`)
  was created by the repository owner at 2026-07-18 00:48:07 EEST and pushed
  to `origin/mid-course-project` at 00:48:10 EEST.
- The commit added the Module 5 guide, prompt-library PDF, and this Phase 0
  evidence index.
- Codex did not create or push the checkpoint and did not alter or undo it.

## Part 5.1 — Setup and grounding

- Status: **PASS — completed 2026-07-18**
- Root `AGENTS.md` was replaced with the approved repository-specific Module 5
  instructions.
- Project-evidence smoke test: **PASS — five file-grounded claims; all cited
  sources were opened and checked**.
- Recent-files smoke test: **PASS — filesystem metadata only; three selected
  files were opened before description**.
- `CLAUDE.md` alignment: **PASS — legacy mid-course directions were replaced
  with a Module 5 wrapper that defers to `AGENTS.md`**.
- Evidence: `Docs/module-5/setup-smoke-tests.md`.
- Browser verification: **NOT RUN — not required for the grounding checks**.
- Commit status: **Not committed; explicit approval has not been given**.

## Part 5.2 — Security review

- Status: **Not started**
- Planned artifact: `Docs/security-review.md`.

## Part 5.3 — Governance

- Status: **Not started**
- Planned artifact: `Docs/governance-worksheet.md`.

## Part 5.4 — Comments-feature planning

- Status: **Not started**
- Planned artifact: `Docs/decisions/comments-feature-plan.md`.

## Part 5.5 — Context engineering

- Status: **Not started**
- Planned artifacts: `Docs/architecture-A.md`, `Docs/architecture-B.md`,
  `Docs/architecture-C.md`, and `Docs/architecture.md`.

## Part 5.6 — Personal AI coding playbook

- Status: **Not started**
- Planned artifact: `Docs/ai-playbook.md`.

## Final verification

- Status: **Not started**
- Phase 0 unexpected application edits: **None observed**
- Phase 0 browser verification: **NOT RUN — not required for the baseline**
- Final commit: **Not created; commits require explicit approval after review**
