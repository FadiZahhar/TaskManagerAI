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

## External checkpoints observed

- Commit `e4c7414a7532b572634bc9b1ce3ba7c1b842e194` (`first commit module 5`)
  was created by the repository owner at 2026-07-18 00:48:07 EEST and pushed
  to `origin/mid-course-project` at 00:48:10 EEST.
- The commit added the Module 5 guide, prompt-library PDF, and this Phase 0
  evidence index.
- Codex did not create or push the checkpoint and did not alter or undo it.
- A later repository-owner checkpoint, commit
  `c40fc8c4d864048325d498967bd89bb43ce03ffa` (`fixing teh agaent and claude md file`),
  contains the approved Module 5 `AGENTS.md`, aligned `CLAUDE.md`, setup smoke
  tests, and updated evidence index. The working branch now tracks
  `origin/module-5-governance`.
- Phase 2 was committed and pushed by the repository owner as
  `646f3658d8ab55001b836b8e75bcee0b4ff7ff69` (`enhancements`). Before Phase 3
  began, local HEAD and `origin/module-5-governance` were synchronized at that
  commit (`0` ahead, `0` behind), and the worktree was clean.
- Phase 3 was committed and pushed by the repository owner as
  `f61b6023b8ff10912e3fdcc6f4cbe99edcc0223e` (`governance worksheet`). Before
  Phase 4 began, local HEAD and `origin/module-5-governance` were synchronized
  at that commit (`0` ahead, `0` behind), and the worktree was clean.
- The frozen generic comments baseline was committed and pushed by the
  repository owner during Phase 4 as
  `98648760082917cdc145a98e0ed8fefa7d8aad9b` (`comments plan generic`). Before
  the final Phase 4 document was written, local HEAD and
  `origin/module-5-governance` were synchronized at that commit (`0` ahead,
  `0` behind).
- The final comments-feature plan and its evidence update were checkpointed in
  `46b62cd1ad945640b26c53fcf99cf8275deca7de` (`comments features`).
- Architecture A and B were checkpointed in
  `11665571148d03458f48f53bff1ba79b0b5cbdd6` (`Adding Architecture A and B`),
  and Architecture C was checkpointed separately in
  `0f94c6b1530e5fa84085b6017c65b0f292604e2c` (`adding this`). Local HEAD and
  `origin/module-5-governance` were synchronized at the latter commit when the
  final architecture document was assembled.
- The repository owner then created and pushed
  `2d15ad89bad7499f98c3580398a85e3afa384855` (`architecture.md file`), which
  added the final architecture document and checkpointed its evidence-index
  update. Codex did not create or push this commit.

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
- Checkpoint: commit `c40fc8c4d864048325d498967bd89bb43ce03ffa`,
  created and pushed by the repository owner.

## Part 5.2 — Security review

- Status: **PASS — documentation prepared 2026-07-18**
- Raw AI audit: `Docs/module-5/security-audit-raw.md`.
- Final graded artifact: `Docs/security-review.md`.
- Audit mode: **PASS — source review was read-only; runtime probes used only
  in-memory `TestClient` state and reset it after execution**.
- Student-confirmed grades: S1 Valid, S2 Valid, S3 Valid, S4 Valid, S5 Noise.
- Manual scan: **Student-confirmed; no genuine You-only finding was retained**.
  The empty column is explained rather than filled with an invented issue.
- Reconciliation: **PASS — Agreement, AI-only, and You-only columns are
  present**.
- Backlog: **PASS — all three ranked items use findings graded Valid**.
- Course scope: **PASS — authentication, resource controls, and in-memory
  storage are distinguished from production requirements**.
- Targeted runtime evidence: explicit `null` updates returned HTTP 200 and
  corrupted stored required fields; later search or transition requests
  reproduced HTTP 500 for title, description, and status cases.
- Input-bound evidence: a 10,000-character description and assignee were
  accepted with HTTP 201.
- Dependency consistency: **PASS — `pip check` reported no broken
  requirements**.
- Vulnerability database scan: **NOT RUN — `pip-audit` is not installed**.
- Optional fix: **Not applied — S1 requires field-semantics decisions and
  regression tests, so it is not a safe one-line Module 5 change**.
- Application and test edits: **None**.
- Browser verification: **NOT RUN — not required for this source audit**.
- Full pytest suite in Phase 2: **NOT RUN — documentation-only work; the Phase
  0 baseline remains 60 passed**.
- Checkpoint: commit `646f3658d8ab55001b836b8e75bcee0b4ff7ff69`,
  created and pushed by the repository owner.

## Part 5.3 — Governance

- Status: **PASS — documentation prepared 2026-07-18**
- Artifact: `Docs/governance-worksheet.md`.
- Source reconstruction: **PASS — actual Module 1–3 and mid-course prompt,
  reflection, debugging, and verification artifacts were inspected**.
- Module 4 scope: **Unavailable on this branch; no sharing event was
  invented**.
- What I Shared: **PASS — five evidence-based rows with final classifications,
  reasons, ambiguity notes, and smaller future-sharing alternatives**.
- Student-approved classifications: G1 Low, G2 Low, G3 Low, G4 Medium, G5
  Medium; no High-risk event was evidenced.
- Sensitive content: **PASS — no secret value, credential, production data, or
  private-key material was copied into the worksheet**.
- What I Received: **PASS — four course stages are traced to actual use,
  verification, and accepted/modified/rejected decisions**.
- Generated-code ownership: **PASS — the mid-course `loadBoard()`
  stale-response guard is preserved exactly and traced in meaningful line
  groups**.
- Ownership questions: **PASS — three student-approved answers explain newest
  request behavior, stale-error suppression, and the guard's scope limit**.
- Personal rules: **PASS — three student-approved rules are concrete,
  evidence-backed, and testable**.
- Browser verification: **NOT RUN — the worksheet documents existing source
  and historical evidence; it makes no new browser-behavior claim**.
- Test suite: **NOT RUN — documentation-only change**.
- Application and test edits: **None**.
- Checkpoint: commit `f61b6023b8ff10912e3fdcc6f4cbe99edcc0223e`,
  created and pushed by the repository owner.

## Part 5.4 — Comments-feature planning

- Status: **PASS — documentation prepared 2026-07-18**
- Generic baseline: `Docs/module-5/comments-plan-generic.md`.
- Final reviewed plan: `Docs/decisions/comments-feature-plan.md`.
- Generic context: **PASS — generated in a fresh context without repository
  access, source files, filenames, or repository summaries**.
- Generic freeze: **PASS — the attachment text was preserved; the repository
  file differs only by a standard final newline and was not revised after the
  grounded plan was read**.
- Generic checkpoint: commit
  `98648760082917cdc145a98e0ed8fefa7d8aad9b`, created and pushed by the
  repository owner.
- Grounded context: **PASS — generated in a separate fresh repository thread
  that explicitly did not read the generic baseline**.
- Grounded plan scope: **PASS — P15 planning only; no files were edited and no
  comments feature was implemented**.
- Self-critique: **PASS — P16 ran in the same grounded-planning thread and
  identified unapproved scope, deletion, ordering, whitespace, response-shape,
  and UI choices**.
- Manual repository verification: **PASS — cited model, route, storage,
  fixture, frontend, README, ADR, Python-version, and no-seed claims were
  checked against the current branch**.
- Path conflict resolution: **PASS — `Docs/decisions/` contained no file on
  this branch before the final plan was added; the IDE's Module 4 tab was not
  treated as branch evidence**.
- Student-approved section grades: Data Model Right; API Routes Missing; Tests
  Needs-Resequencing; Frontend Changes Right; Migration Notes Right; Open
  Questions Right; Suggested Implementation Order Right.
- Minimal corrections: **PASS — unratified choices are labeled as proposals,
  decision-dependent tests follow contract ratification, server-owned-field
  cases are separated/parameterized, and transactional deletion wording was
  removed**.
- Comparison: **PASS — exactly three lines cover the biggest difference, the
  teammate handoff choice, and a task appropriate for generic chat**.
- Open questions: **PASS — eight real product/architecture decisions remain
  visible**.
- Non-implementation: **PASS — no model, route, storage, test, frontend,
  migration, dependency, or configuration change was made**.
- Browser verification: **NOT RUN — planning-only documentation**.
- Test suite: **NOT RUN — documentation-only change**.
- Checkpoint: commit `46b62cd1ad945640b26c53fcf99cf8275deca7de`,
  synchronized with `origin/module-5-governance` before Phase 5 completion.

## Part 5.5 — Context engineering

- Status: **PASS — documentation completed 2026-07-18**.
- Preserved drafts: `Docs/architecture-A.md`, `Docs/architecture-B.md`, and
  `Docs/architecture-C.md`.
- Final artifact: `Docs/architecture.md`.
- Approved scorecard: **PASS — the student graded correctness, specificity,
  completeness, unsupported claims, uncertainty, concision, task fit, and each
  strategy's most important miss**.
- Student-selected baseline: **Strategy A — approved because it is the most
  complete, directly cited whole-system draft**.
- Final corrections: **PASS — the stale Module 1 metadata conflict identified
  by Strategy C is included, and Strategy A's concurrency statement is labeled
  as an architectural inference rather than an observed runtime failure**.
- Context comparison: **PASS — A, B, and C are compared by strengths, misses,
  uncertainty, and best task shape**.
- Student-approved context rule: **PASS — Strategy A is used for broad
  architecture summaries with repository inspection; Strategy C is used for
  bounded backend reviews with tightly controlled context**.
- Draft runtime/browser verification: **NOT RUN for A, B, and C**.
- Full test suite after final architecture assembly: **PASS — 60 passed with
  four warnings via `.venv/bin/python -m pytest` on 2026-07-18**.
- Application changes: **PASS — none made for this phase**.
- Fresh-thread evidence: **PASS — the student confirmed that A and B were
  created in fresh threads; the supplied scorecard identifies C as the clean
  rerun and excludes the earlier contaminated attempt**.
- Draft checkpoints: **A and B are preserved in `1166557`; C is preserved in
  the separate `0f94c6b` checkpoint**.
- Final architecture checkpoint: commit
  `2d15ad89bad7499f98c3580398a85e3afa384855`, created and pushed by the
  repository owner.

## Part 5.6 — Personal AI coding playbook

- Status: **PASS — student approved 2026-07-18**.
- Artifact: `Docs/ai-playbook.md`.
- Existing student-approved evidence available for reuse: the three concrete
  rules in `Docs/governance-worksheet.md:122-128`, the ownership conclusion at
  `Docs/governance-worksheet.md:115-120`, the security-review observation at
  `Docs/security-review.md:49-54`, and the context-engineering rule in
  `Docs/architecture.md`.
- Student decisions: **PASS — the student explicitly accepted all six
  task-shaped recommendations and their evidence-based rationale**.
- Decision Card: **PASS — new feature, code review, debugging, infrastructure,
  never-paste data, and strongest-rule entries have no blanks**.
- Task-shape choices: **PASS — Claude Code is selected for repository-wide
  feature and infrastructure work; Codex App for evidence-based review;
  debugging distinguishes backend/test evidence from UI/browser evidence**.
- Concrete never-paste rule: **PASS — credentials, tokens, private keys,
  unredacted environment files, production configuration, and real
  personal/customer data are named without reproducing values**.
- Codex review: **PASS — 684 words, all required sections present, rules tied to
  course incidents, practical checks, no unresolved placeholder pattern, and
  no confidential value reproduced**.
- Student voice: **PASS — after Codex assembled the draft from previously
  approved rules and the six accepted decisions, the student reviewed and
  explicitly approved the final wording**.
- Reread commitment: **PASS — 2026-08-17, approximately 30 days after
  completion**.
- Application and test edits: **None**.
- Commit authorization: **PASS — the student explicitly authorized committing
  `Docs/ai-playbook.md` and `Docs/module-5/evidence-index.md` after review**.

## Final deliverable matrix

| Part | Artifact | Human-owned evidence | Status | Remaining action |
|---|---|---|---|---|
| 5.1 | `AGENTS.md`; `Docs/module-5/setup-smoke-tests.md` | Repository rules, verified commands, business contract, and smoke-test evidence | **Complete** | None |
| 5.2 | `Docs/security-review.md` | Student grades, manual scan, reconciliation, and ranked backlog | **Complete** | None; optional fix remains deliberately backlogged |
| 5.3 | `Docs/governance-worksheet.md` | Risk classifications, code ownership answers, reflection, and three approved rules | **Complete** | None |
| 5.4 | `Docs/decisions/comments-feature-plan.md` | Section grades, grounded corrections, generic-plan comparison, and open decisions | **Complete** | Do not implement comments in Module 5 |
| 5.5 | `Docs/architecture-A.md`, `Docs/architecture-B.md`, `Docs/architecture-C.md`, `Docs/architecture.md` | Approved scorecard, Strategy A verdict, corrections, context rule, and fresh-thread confirmation | **Complete** | None |
| 5.6 | `Docs/ai-playbook.md` | Accepted tool choices, approved rules, Decision Card, course evidence, reread commitment, and final voice approval | **Complete** | None |

## Final verification

- Status: **PASS — student reviewed the final wording and declared the Module 5
  documentation ready on 2026-07-18**.
- Core artifact inventory: **PASS — all 10 core artifacts are present**.
- Placeholder scan: **PASS for all core artifacts — no unresolved
  placeholder pattern matched**.
- Suspicious tracked filename scan: **PASS — no common `.env`, secret,
  credential, token, private-key, PEM, or key filename matched; Git history and
  external systems were not scanned**.
- Unexpected application changes: **PASS — no baseline-to-HEAD changes under
  `app/`, `tests/`, `frontend/`, `requirements.txt`, or `pytest.ini`; current
  uncommitted changes are documentation only**.
- Test suite: **PASS — 60 passed with four warnings via
  `.venv/bin/python -m pytest` on Python 3.14.2**.
- Browser verification: **NOT RUN — no application behavior was changed in the
  remaining documentation work**.
- Diff whitespace check: **PASS — `git diff --check` and the no-index check for
  the new playbook file produced no whitespace errors**.
- Branch synchronization: **PASS — latest observed HEAD and
  `origin/module-5-governance` were both at `2d15ad8`**.
- Final human decision: **PASS — the student, not Codex, decided that the
  documentation is ready after reviewing the playbook wording**.
- Final documentation commit: **Authorized for the playbook and evidence
  index; the immutable hash is reported from Git immediately after creation
  because a commit cannot contain its own final hash**.
