# Claude Code Prompt Sequence — Mid-Course Task Tracker

Use these prompts **one at a time** from the repository root. Do not paste the entire file as one prompt. Use Plan mode for prompts marked **PLAN FIRST**. Start a fresh Claude conversation when moving from one feature to the other if the existing context has become noisy.

After every prompt, inspect the response and diff. Copy the exact prompt, response summary, and accept/edit/reject decision into `prompt-log.md`.

---

## Prompt 00 — Read durable instructions and confirm scope — PLAN FIRST

```text
Read CLAUDE.md, AGENTS.md, and every file in docs/midcourse/. Do not edit yet.

Confirm:
1. the exact repository root;
2. the current branch and Git status;
3. the two target features;
4. the required documentation and evidence;
5. the prohibitions on broad rewrites, fabricated verification, unapproved commits, and unapproved Break Test mutations.

Return any conflict or missing file. Stop after the confirmation.
```

## Prompt 01 — Repository audit and baseline plan — PLAN FIRST

```text
Perform a read-only audit of the actual Task Tracker repository before any feature work.

Inspect at minimum:
- backend application entry point and task routes;
- every task schema/model/enum imported by those routes;
- storage/state-reset mechanism;
- all existing pytest files and fixtures;
- frontend files/components, API helpers, modal/form logic, card rendering, board filtering/state, and error handling;
- dependency and run configuration;
- README;
- current Git status, branch, and recent log.

Return an evidence-based baseline containing:
1. relevant file tree;
2. route table with method/path/request/response behavior;
3. exact task fields, optional/null conventions, status values, priority values, defaults, and transition rules;
4. current task-list behavior and query parameters;
5. frontend data flow and exact symbols likely affected;
6. test conventions and isolation risks;
7. exact install, backend, frontend, targeted-test, and full-test commands;
8. current Git risks;
9. a safe branch/baseline execution plan.

Do not edit. Do not infer missing behavior. Mark facts versus assumptions and cite file paths/symbols. Stop.
```

## Prompt 02 — Create/switch branch and capture baseline

```text
Using the approved audit, prepare the assignment branch and baseline only.

Rules:
- Do not discard or overwrite uncommitted work.
- If the working tree is unsafe, stop and report the exact conflict.
- Create and switch to branch mid-course-project if it does not exist; otherwise switch to it safely.
- Run the verified existing full pytest command.
- Start or smoke-test the backend using the verified command.
- Perform only the baseline frontend/browser check that is actually possible.
- Update only the baseline section of docs/midcourse/verification.md with real commands/results and PASS/FAIL/NOT RUN.
- Update README-MIDCOURSE-SECTION.md placeholders only when the audit proved the commands.

Show Git status, files changed, commands/results, and remaining baseline risks. Do not implement features or commit. Stop.
```

## Prompt 03 — Reconcile Feature 1 design — PLAN FIRST

```text
Plan Feature 1 only: due dates + overdue filtering.

Read the actual backend schemas/routes/tests, frontend form/card/filter code, docs/midcourse/user-stories.md, mini-adr.md, and behavior-contract.md.

Target behavior:
- optional date-only due_date;
- create, update, and clear support;
- backend validation for invalid dates;
- overdue is derived, not stored;
- target overdue predicate is due_date before today and status not completed;
- due today is not overdue;
- completed past-due tasks are not overdue;
- existing task-list endpoint supports overdue filtering;
- frontend modal/card/filter integration;
- existing behavior remains intact.

Return:
1. repository facts versus assumptions;
2. any conflict requiring correction to the stories/ADR;
3. exact files/symbols to change;
4. minimal data/route design;
5. deterministic date-testing strategy;
6. prioritized pytest cases;
7. browser verification cases;
8. phased implementation order and rollback points.

Do not edit. Do not add dependencies or plan Feature 2. Stop.
```

## Prompt 04 — Implement Feature 1 backend only

```text
Implement only the approved Feature 1 backend phase.

Scope is limited to the smallest existing schema/model/route/helper changes needed for:
- optional due_date create/read/update/clear behavior;
- backend-owned overdue semantics;
- overdue filtering on the existing task-list route;
- preservation of unfiltered behavior and existing status rules.

Constraints:
- follow the repository's current architecture and naming;
- use native/Pydantic date validation if this is FastAPI and already consistent with the project;
- do not store a mutable overdue flag;
- do not change frontend code or tests in this phase;
- do not rename unrelated symbols, reformat whole files, add dependencies, or change existing business rules.

Before editing, name the exact files/symbols and intended diff boundaries. After editing:
1. show a focused diff summary;
2. explain serialization/null/overdue behavior;
3. run safe syntax/import checks and the nearest existing relevant tests;
4. report PASS/FAIL with exact commands;
5. list remaining test and frontend work.

Stop after the backend phase.
```

## Prompt 05 — Add focused Feature 1 pytest tests

```text
Add focused pytest coverage for Feature 1, following the existing fixtures and state-reset conventions.

First perform a read-only gap check against the approved Feature 1 acceptance criteria. Then add tests one small group at a time for the highest-value cases, targeting at least:
- valid create with due_date;
- invalid due_date rejected;
- update and clear due_date without unrelated changes;
- overdue filter includes past-due incomplete tasks and excludes due-today/completed tasks.

Requirements:
- use public API setup where practical;
- keep tests deterministic and independent;
- assert exact status plus meaningful response/state content;
- preserve all existing tests;
- do not change application source merely to make a weak test pass;
- do not perform deliberate breakage yet.

After each small group, run the targeted test(s). At the end run the relevant test file/group and the full suite. Show the focused test diff, commands/results, and explain the bug protected by each test. Update the new-test table in docs/midcourse/verification.md with real names/results. Stop.
```

## Prompt 06 — Integrate Feature 1 into the frontend

```text
Implement only the approved Feature 1 frontend integration after inspecting the actual frontend structure and API response.

Required observable behavior:
- due-date field in the existing create/edit flow;
- edit prefills the existing date;
- empty input uses the backend-approved null/absent representation;
- successful create/update/clear refreshes server truth;
- cards display a readable due date when present;
- overdue tasks show a clear, accessible indicator using the approved semantics/source;
- an overdue filter is available;
- all existing columns, sorting, drag-and-drop, modal validation, loading/empty/error states, and event behavior are preserved.

Constraints:
- no new frontend framework, date library, or whole-file rewrite;
- do not duplicate backend mutation rules;
- do not show false success after an HTTP/network error;
- inspect response.ok/status and useful backend error details.

Before editing, identify exact functions/components/sections. After editing, show the focused diff and run available static checks. If browser control is available, exercise the Feature 1 flows; otherwise provide exact manual/DevTools steps and mark them NOT RUN. Update only observed Feature 1 browser evidence in verification.md. Stop.
```

## Prompt 07 — Verify Feature 1 end-to-end and prepare checkpoint

```text
Do not add code unless a concrete Feature 1 failure requires a focused fix.

Verify Feature 1 against its user stories and the relevant behavior-contract items:
- targeted and full pytest;
- create with/without date;
- edit and clear date;
- refresh persistence;
- invalid backend date behavior;
- overdue indicator semantics;
- overdue filter and clear;
- preserved existing UI behavior.

For every item record PASS, FAIL, or NOT RUN with exact evidence. If an item fails, diagnose from the request, response, traceback, console, Network panel, or code path before proposing the smallest source fix.

Update verification.md and prompt-log.md from observed evidence. Show Git status/diff and recommend, but do not create, a Feature 1 checkpoint commit. Stop.
```

## Prompt 08A — Propose Feature 1 Break Test mutation — PLAN FIRST

```text
Select one important passing Feature 1 test for controlled Break Test evidence.

Do not edit. Propose exactly one minimal temporary application-source mutation that should make the selected test fail for a semantic reason. Do not modify the test. Explain:
- current passing command/result;
- exact source file/symbol/change;
- expected assertion failure;
- restoration method;
- Git/checkpoint safety requirements.

Stop and wait for explicit approval.
```

## Prompt 08B — Execute Feature 1 Break Test — EXPLICIT APPROVAL

```text
Explicit approval is granted for the previously proposed Feature 1 Break Test mutation. A clean checkpoint has been confirmed.

Execute exactly this sequence:
1. Re-run the selected test on correct source and confirm PASS.
2. Apply only the approved temporary application-source mutation.
3. Re-run the same test and confirm it FAILS for the expected semantic reason.
4. Capture the concise failure evidence.
5. Restore the exact source mutation without touching the test or unrelated work.
6. Re-run the same test and confirm PASS.
7. Run git diff and git status to prove no temporary mutation remains.
8. Update the Feature 1 Break Test section in docs/midcourse/verification.md with observed evidence.

If the test does not fail as expected, do not claim success. Restore source, explain whether the mutation missed the path or the test is weak, and stop.
```

## Prompt 09 — Reconcile Feature 2 design — PLAN FIRST

```text
Plan Feature 2 only: search + combined filters. Start from the verified Feature 1 checkpoint.

Inspect the current task-list route, enums, storage, tests, frontend fetch/render flow, and docs/midcourse Feature 2 stories/ADR.

Target behavior:
- optional case-insensitive substring search over title and description;
- trim search input; blank search behaves as omitted;
- combine text, status, priority, assignee, and overdue filters with logical AND;
- invalid validated enum values receive the backend-defined validation response;
- no matches returns 200 with [];
- omitted filters preserve unfiltered behavior;
- frontend has a compact filter bar, keeps every board column visible, distinguishes empty results from request errors, and resets cleanly;
- server-side filtering is required.

Return repository facts versus assumptions, exact parameter names/types, files/symbols, test matrix, UI request strategy, risks, and phased plan. Do not edit or add dependencies. Stop.
```

## Prompt 10 — Implement Feature 2 backend only

```text
Implement only the approved Feature 2 backend phase on the existing task-list endpoint.

Requirements:
- optional text search over actual title/description fields;
- documented trim/case-insensitive substring behavior;
- approved status, priority, assignee, and overdue parameters;
- logical AND across supplied criteria;
- validation through existing enum/schema conventions;
- omitted parameters preserve current list behavior;
- no match returns 200 with an empty list;
- no stored task is mutated by filtering.

Keep filtering logic small and readable. Reuse a focused helper only if it reduces duplication without changing architecture. Do not change frontend or tests in this phase, add dependencies, or rewrite unrelated code.

Before editing, name files/symbols/diff boundaries. After editing, show the focused diff, run syntax/import and nearest existing tests, and report exact commands/results. Stop.
```

## Prompt 11 — Add focused Feature 2 pytest tests

```text
Add focused pytest coverage for Feature 2 using existing fixtures and public API setup.

Target high-value cases:
- search matches title;
- search matches description and is case-insensitive;
- combined status + priority (and another implemented filter if useful) uses AND;
- no matches returns 200 and [];
- invalid validated status or priority returns the expected validation response;
- unfiltered GET /tasks remains compatible.

Keep one primary behavior per test, make state deterministic, and assert meaningful body content. Do not weaken existing tests or perform deliberate breakage yet.

Run each new test/group targeted, then the relevant test file/group, then the full suite. Show diff, commands/results, and protected bug for each test. Update verification.md with real test names/results. Stop.
```

## Prompt 12 — Integrate Feature 2 into the frontend

```text
Implement only the approved Feature 2 frontend search/filter area.

Required behavior:
- compact controls above the existing board;
- text search plus the approved status, priority, assignee, and overdue controls supported by the backend;
- build requests using actual parameter names and encoded values;
- preserve exact API enum values;
- keep all board columns visible while filtered;
- preserve deterministic sorting and per-column empty placeholders;
- distinguish valid no-match results from HTTP/network errors;
- clear/reset restores defaults and refetches the unfiltered board;
- existing drag, edit, create, due-date, modal, loading, and error behavior continues to work.

Use the smallest change consistent with the current frontend. Do not add a framework, debounce library, or broad refactor. Prevent avoidable stale responses using the simplest existing-compatible approach if needed.

After editing, show the focused diff and checks. Observe browser/Network cases when possible; otherwise give exact steps and mark NOT RUN. Update only real Feature 2 browser evidence. Stop.
```

## Prompt 13 — Verify Feature 2 end-to-end and prepare checkpoint

```text
Do not add features.

Verify Feature 2 and regression behavior:
- targeted Feature 2 tests;
- full pytest suite;
- title search;
- description search;
- case-insensitive result;
- combined filter AND behavior;
- no-match 200/[] and UI empty states;
- invalid filter API behavior;
- reset to unfiltered board;
- existing Feature 1 and Module 1–3 UI flows.

Record PASS/FAIL/NOT RUN with exact evidence in verification.md. Update prompt-log decisions. Diagnose any failure from concrete evidence before changing code. Show Git status/diff and recommend, but do not create, a Feature 2 checkpoint commit. Stop.
```

## Prompt 14A — Propose Feature 2 Break Test mutation — PLAN FIRST

```text
Select one important passing Feature 2 test for controlled Break Test evidence.

Do not edit. Propose exactly one minimal temporary application-source mutation that should make it fail for the expected semantic reason. Do not modify the test. State the passing command, exact source mutation, expected failure, restoration method, and checkpoint requirements. Stop for approval.
```

## Prompt 14B — Execute Feature 2 Break Test — EXPLICIT APPROVAL

```text
Explicit approval is granted for the previously proposed Feature 2 Break Test mutation. A clean checkpoint has been confirmed.

Perform pass → approved source mutation → expected targeted failure → exact restoration → restored pass. Do not change the test. Capture concise evidence, confirm final git diff/status contains no temporary mutation, and update the Feature 2 Break Test section in verification.md.

If the expected failure does not occur, restore immediately, report why the proof is invalid, and stop without fabricating success.
```

## Prompt 15 — Complete pre-refactor behavior contract and working checkpoint

```text
Do not refactor yet.

Audit the current repository against every item in docs/midcourse/behavior-contract.md. Run automated checks and perform browser/Network checks when available. Record PASS, FAIL, or NOT RUN with evidence. Fix only concrete failures with narrowly approved changes, then re-run affected checks.

When all required behavior is proven, update verification.md with the pre-refactor result. Show final Git status/diff and recommend exact checkpoint files and a commit message such as:
feat: add due dates and task filtering

Do not commit until explicitly authorized. Stop.
```

## Prompt 16A — Plan one focused refactor — PLAN FIRST

```text
Choose one narrow, behavior-preserving refactor target from the completed feature code, preferably one filtering/query helper, frontend query-builder, or repeated rendering block.

Read behavior-contract.md and the clean working checkpoint. Do not edit yet.

Return:
- exact file/symbol boundary;
- readability/duplication problem;
- minimal proposed diff;
- behavior risks;
- targeted tests and browser items to re-run;
- rollback method.

Do not rename public API fields, change query semantics, alter date/overdue rules, add dependencies, or refactor multiple areas. Stop for approval.
```

## Prompt 16B — Apply the approved focused refactor

```text
Apply only the approved refactor boundary. Inspect the diff and reject unrelated cleanup.

Run the smallest relevant tests, then the full pytest suite, then every affected browser/behavior-contract item. Update the after-refactor columns in behavior-contract.md and the refactor sections in verification.md with real evidence. Report PASS/FAIL/NOT RUN and stop.
```

## Prompt 17 — Complete documentation from evidence

```text
Complete the mid-course documentation using only actual repository history, Claude session summaries, terminal output, browser/Network evidence, diffs, and decisions.

Files:
- docs/midcourse/user-stories.md
- docs/midcourse/mini-adr.md
- docs/midcourse/prompt-log.md
- docs/midcourse/verification.md
- docs/midcourse/reflection.md
- docs/midcourse/behavior-contract.md

Requirements:
- remove all resolved placeholders;
- retain NOT RUN only where honestly unavoidable and explain it;
- ensure 3–5 user stories per feature and at least one corrected AI assumption per feature;
- ensure at least three meaningful logged prompts per feature with response and accept/edit/reject decisions;
- include the weak-to-strong prompt rewrite;
- include two complete Break Tests;
- write a factual 250–500 word reflection and count the words;
- do not invent evidence or paste huge transcripts.

Show a documentation completeness matrix and remaining gaps. Stop.
```

## Prompt 18 — README and final submission audit

```text
Perform a final evidence-based submission audit. Do not add features.

1. Merge the verified content from README-MIDCOURSE-SECTION.md into the existing README without deleting correct existing instructions.
2. Run the documented install/start/test commands as safely as possible and correct only inaccurate documentation.
3. Run the full pytest suite.
4. Review the final diff for unrelated changes, debug output, temporary data, broad CORS, secrets, generated junk, and restored Break Test mutations.
5. Verify branch name is exactly mid-course-project.
6. Verify every item in docs/midcourse/submission-checklist.md.
7. Confirm required documentation has no unresolved brackets/TBD and reflection is 250–500 words.
8. Report any browser items still NOT RUN.
9. Recommend final commit boundaries/messages and push commands, but do not commit or push without explicit authorization.

Return a final matrix: requirement, file/evidence, PASS/FAIL/NOT RUN, remaining action. End with READY, READY AFTER CORRECTIONS, or NOT READY and precise reasons. Stop.
```

## Prompt 19 — Optional reviewed commits and push — EXPLICIT AUTHORIZATION ONLY

Use only after reviewing the final diff and audit.

```text
Explicit authorization is granted to create the reviewed commits and push the branch mid-course-project to the configured remote.

Before committing, show the exact staged file list and proposed commit message(s). Do not stage secrets, unrelated files, temporary evidence, or local environment files. Create only the approved commit(s), run the final full pytest command again if any source changed since the audit, then push the branch.

Report commit hashes, push result, remote branch, and repository URL. Do not merge to the default branch and do not open a pull request unless separately requested.
```
