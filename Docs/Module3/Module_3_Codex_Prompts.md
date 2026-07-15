# Module 3 — Codex Prompt Sequence

Use these prompts one at a time in Codex at the Task Tracker repository root. Place `AGENTS.md` in the root first. For complex phases, use Codex Plan mode before implementation. Keep open or attach the most relevant files, such as `@app/main.py`, imported schema/model files, `@tests/test_tasks.py`, and `@frontend/index.html` when present.

---

## X1 — Inspect the repository and establish a baseline — PLAN MODE

```text
Read AGENTS.md and inspect this repository before making changes.

Start with @app/main.py, every imported task schema/model/enum, @tests/test_tasks.py and its fixtures, dependency/run configuration, any existing frontend files, and Git status.

Return an evidence-based baseline:
- repository root and relevant file tree;
- actual route table: method, path, function, request/response model, and visible status behavior;
- actual task fields, allowed statuses, priorities, optional fields, defaults, and transition rules;
- CORS presence and configured origins;
- test fixture and naming conventions;
- exact backend, frontend, targeted-test, and full-test commands;
- current Git risks;
- existing test-suite result, if safe to run.

Do not edit. Do not infer unproved routes or features. Use “not present” when appropriate. Cite file paths and symbols. Stop after the audit.
```

---

## X2 — Produce the execution plan and align the behavior contract — PLAN MODE

```text
Using the verified repository baseline and AGENTS.md, produce a step-by-step Module 3 execution plan.

Required order:
1. behavior contract;
2. static frontend board;
3. GET /tasks fetch/render and all UI states;
4. CORS only if browser evidence requires it;
5. native drag-and-drop with PATCH persistence and failure recovery;
6. create/edit modal;
7. pre-refactor eight-item verification and Git checkpoint;
8. one focused refactor;
9. PATCH test-gap analysis and one test at a time;
10. deliberate-breakage proof;
11. debugging log;
12. final review.

For each step name the exact likely files, commands, acceptance evidence, and rollback point. Reconcile MODULE3_BEHAVIOR_CONTRACT.md with the actual backend and identify any conflict. Do not edit yet. Stop after the plan.
```

After approval:

```text
Create or update only MODULE3_BEHAVIOR_CONTRACT.md as approved. Do not change application or test code. Show the diff and stop.
```

---

## X3 — Build the static board only

```text
Implement only the static Kanban layout.

Target: @frontend/index.html, creating it if absent.

Requirements:
- page header;
- exactly three columns backed by ToDo, InProgress, and Done;
- display labels To Do, In Progress, and Done are allowed, but data values must remain exact API strings;
- one temporary sample card marked as sample data;
- clean responsive CSS and basic semantic/accessibility structure.

Do not add API fetches, drag-and-drop, modal code, dependencies, CORS changes, or backend changes.

Before editing, name the exact file/sections. After editing, show a concise diff summary, run safe syntax/static checks, provide the local serving command and browser checklist, and mark any unobserved visual check NOT RUN. Stop.
```

---

## X4 — Connect GET /tasks and implement deterministic rendering

```text
Implement only fetch, grouping, sorting, rendering, and UI states in @frontend/index.html.

Inspect the actual GET /tasks response shape first. Then:
- remove temporary sample data;
- add verified constants for API base, statuses, labels, and priority order;
- implement fetchTasks() with response.ok handling;
- group by exact status;
- sort High → Medium → Low, then by a deterministic secondary key such as ascending id;
- render actual task fields, column counts if useful, and per-column empty placeholders;
- implement loading, ready, and request-error behavior;
- keep errors visible and honest.

Do not add drag-and-drop, modal behavior, or backend/CORS changes.

Run available static checks. If browser control is available, start the servers and inspect the page; otherwise provide exact manual and DevTools steps. Report files changed, commands/results, and PASS/FAIL/NOT RUN for loading, populated, empty, and backend-down states. Stop.
```

---

## X5 — Diagnose and fix CORS only from evidence — CONDITIONAL

```text
Bug evidence:
- frontend origin: [EXACT ORIGIN]
- backend request: [METHOD AND URL]
- console message: [FULL MESSAGE]
- network result: [STATUS/DETAIL]

Reproduce or inspect the evidence before editing. Determine whether this is truly CORS.

If not CORS, explain the actual cause and make no middleware change.

If CORS, inspect @app/main.py and make the smallest change:
- add/configure CORSMiddleware;
- allow only the actual required local origin(s);
- preserve current routes, schemas, business rules, and middleware;
- avoid broad speculative origins.

Run the full backend test suite. Report the focused diff, commands/results, restart instructions, and the exact network/console proof needed. Stop.
```

---

## X6 — Add native drag-and-drop and PATCH persistence

```text
Implement only native drag-and-drop status changes in @frontend/index.html.

Required behavior:
- no external drag library;
- card drag carries actual task id and original exact status;
- drop targets use exact ToDo/InProgress/Done values;
- same-column drop sends no PATCH;
- cross-column drop sends PATCH /tasks/{id} with the smallest valid payload accepted by the actual backend;
- backend remains the sole authority on transition validity;
- success re-fetches and renders server truth;
- 422, other HTTP failure, or network failure shows a useful error and re-fetches/reverts;
- avoid duplicate in-flight updates if needed;
- preserve current render, sort, loading, empty, and error behavior.

Keep the diff focused around card rendering and drag handlers. Do not rewrite the full file.

After the edit, run applicable checks and report:
- PATCH URL/body;
- same-column guard;
- rejection recovery path;
- exact DevTools verification for valid move, invalid move, network failure, persisted refresh, and no-op drop;
- PASS/FAIL/NOT RUN for each.

Stop.
```

---

## X7 — Add the create/edit modal

```text
Implement only the create/edit modal in @frontend/index.html after inspecting the actual POST and PATCH schemas.

Add:
- New Task button;
- Edit button on each card;
- one reusable modal with create/edit modes;
- title, description, status, priority, and assignee fields, adjusted only to the actual schema;
- internal edit task id and prefilling;
- sensible create defaults consistent with the backend;
- semantic labels and basic dialog accessibility.

Submission contract:
- title is trimmed;
- blank/whitespace-only title shows a client error and sends no request;
- empty optional assignee becomes null only if accepted by the backend;
- create uses POST /tasks;
- edit uses PATCH /tasks/{id};
- response.ok is checked;
- server 422 keeps the modal open and displays a useful server message;
- success clears errors, closes and resets, then re-fetches;
- other failures do not display false success.

Dismissal contract:
- Cancel, close/X, Escape, and overlay click;
- clicks inside the dialog do not close it;
- every close clears stale id, values, and errors.

Preserve drag-and-drop and all existing UI behavior. Use focused edits and inspect the diff.

Run applicable checks. If browser automation is available, exercise the five flows; otherwise provide exact steps and mark them NOT RUN: empty title, create High-priority ToDo, edit/reorder or move, invalid transition 422, all dismissals. Stop.
```

---

## X8 — Verify all eight behaviors and prepare the checkpoint

```text
Do not refactor or add features.

Evaluate the current code against @MODULE3_BEHAVIOR_CONTRACT.md. Run automated checks and, when available, browser/network verification. For every contract item record PASS, FAIL, or NOT RUN plus concrete evidence.

Do not infer browser success from code inspection. For failures, identify the smallest responsible function/section and propose a focused correction.

Also report:
- current Git status and diff summary;
- unrelated changes;
- whether the working state is safe to checkpoint;
- a recommended checkpoint commit message and exact commands.

Do not commit unless explicitly authorized. Stop.
```

---

## X9 — Perform one focused refactor — PLAN MODE

Replace the bracketed area.

```text
Plan a behavior-preserving refactor of only: [render logic | drag handlers | modal helpers | submit handler | CSS block].

Read @MODULE3_BEHAVIOR_CONTRACT.md and inspect the selected code plus its callers/listeners. Do not edit until the plan is approved.

The plan must preserve:
- exact API status strings;
- GET /tasks, POST /tasks, PATCH /tasks/{id};
- selectors/data attributes/event hooks;
- title .trim();
- 422 modal behavior;
- drag rejection/network recovery;
- same-column no-op behavior;
- listener correctness after re-render.

Name exact files/symbols, intended diff size, checks, and rollback method. Do not propose a whole-file rewrite. Stop after the plan.
```

After approval:

```text
Implement only the approved refactor. Show the focused diff, run the smallest relevant checks, then re-check every affected item in @MODULE3_BEHAVIOR_CONTRACT.md. Report PASS/FAIL/NOT RUN and stop.
```

---

## X10 — Analyze missing PATCH tests without writing code

```text
Read the actual PATCH route, request model, transition logic, @tests/test_tasks.py, and fixtures. Perform a read-only test-gap analysis.

Return a prioritized table. For each candidate test include:
- proposed name;
- setup via public API;
- request method/path/body;
- expected status;
- meaningful body assertion;
- frontend risk protected;
- smallest temporary source mutation that should make the test fail;
- whether the expected behavior is proven by current code or needs clarification.

Consider unsupported status, invalid priority, InProgress → ToDo rejection, InProgress → Done success, nonexistent id, and model-defined handling of an empty or unsupported update body.

Do not edit. Stop after the analysis.
```

---

## X11 — Add one targeted pytest test

Replace the bracketed scenario.

```text
Add exactly one pytest test for: [SCENARIO].

Use existing fixtures and conventions in @tests/test_tasks.py. Establish state through the API. Assert the exact status code and a meaningful response-body property. Keep the test deterministic and independent.

Do not change application source. Do not alter unrelated tests or weaken assertions.

After editing:
- show the focused test diff;
- run pytest -k <new_test_name> -v;
- report the command and result;
- run the nearest relevant test group if useful;
- explain the protected bug;
- propose but do not apply the smallest source mutation for deliberate-breakage proof.

Stop.
```

Repeat one scenario at a time.

---

## X12 — Prove the test with deliberate source breakage

```text
Explicit approval is granted to perform a controlled temporary source mutation for [TEST NAME]. A clean checkpoint exists.

Do not modify the test. First show the exact minimal source mutation and why this test should fail.

Then:
1. Run the target test on correct source and confirm pass.
2. Apply only the approved temporary mutation.
3. Run pytest -k [TEST NAME] -v.
4. Confirm failure for the expected semantic reason, not syntax/import/setup damage.
5. Capture the key failure output.
6. Restore the exact source change only.
7. Re-run the target test and confirm pass.
8. Show git status/diff proving no accidental mutation remains.
9. Draft a factual debugging-log entry.

If the test still passes, stop and explain whether the assertion is weak or the mutation missed the path. Do not fabricate a successful proof.
```

---

## X13 — Reproduce and fix a concrete bug

```text
Bug:
[ONE-SENTENCE FAILURE]

Reproduction:
1. [STEP]
2. [STEP]
3. [STEP]

Expected:
[EXPECTED]

Observed:
[OBSERVED]

Evidence:
- request method/URL: [PASTE]
- status/response body: [PASTE]
- console or full pytest failure: [PASTE]
- relevant files: [@FILE REFERENCES]

Constraints:
- preserve the API shape and exact enums;
- do not weaken a correct test;
- keep the fix minimal;
- add or strengthen a regression test only when justified;
- do not hide the error with a broad exception handler.

Start by reproducing or tracing the failure. Report the root cause, file/symbol, and proposed patch before editing. After approval, implement the smallest source fix, re-run the reproduction, run the smallest relevant tests and then the full suite, and draft the four-line debug log. Report commands/results and any remaining manual UI check.
```

---

## X14 — Final Codex review and deliverable audit

Run Codex review on the working tree with this focus instruction, or paste it as a normal prompt when review mode is unavailable:

```text
Review the final Module 3 working tree against AGENTS.md and MODULE3_BEHAVIOR_CONTRACT.md.

Focus on functional regressions, not style-only preferences. Check:
- exact status values versus display labels;
- route/method/payload alignment;
- priority sorting and deterministic tie-break;
- all four UI states;
- same-column no PATCH;
- valid drag persistence and rejected-drag recovery;
- title trimming and no request for blank title;
- create/edit POST/PATCH behavior;
- 422 keeps modal open and surfaces message;
- all dismissal paths clear stale state;
- listener survival after render;
- CORS scope;
- test quality and deliberate-breakage evidence;
- symptom-suppression changes;
- temporary data, debug logging, dead code, or unrelated diffs.

Run the full test suite. Complete a deliverable matrix with file, evidence, status, and remaining action. Mark browser-only checks NOT RUN unless actually observed. End with READY, READY AFTER MANUAL CHECKS, or NOT READY and the precise reasons.
```
