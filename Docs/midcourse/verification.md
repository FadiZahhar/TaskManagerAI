# Verification Evidence

> Record only observed output. Use concise excerpts rather than huge logs. Optional screenshots belong in `docs/midcourse/evidence/`.

## 1. Baseline check

| Item | Evidence |
|---|---|
| Date/time | `2026-07-16` |
| Branch before work | `mid-course-project` |
| Required branch created/switched | `mid-course-project — PASS` |
| Starting commit | `3915bb1` |
| Git status | `CLEAN` |
| Backend start command | `uvicorn app.main:app --reload` |
| Frontend start/open command | `python3 -m http.server 5500 --directory frontend` |
| Baseline pytest command | `.venv/bin/python -m pytest -q` |
| Baseline pytest result | `25 passed, 3 warnings in 0.07s` |
| Baseline app/API smoke check | `NOT RUN (live uvicorn not started; API exercised via FastAPI TestClient instead)` |
| Baseline browser check | `NOT RUN (no browser control in this session)` |

Existing failures, if any, before feature work:

```text
NONE (25 passed). The 3 warnings are a pre-existing FastAPI DeprecationWarning
about HTTP_422_UNPROCESSABLE_ENTITY in app/main.py, unrelated to this work.
```

### Feature 1 backend implementation — automated evidence (observed)

Backend implemented (models/storage/route) per `mini-adr.md`. Formal pytest
coverage for Feature 1 (Prompt 05) is still **outstanding** — not yet added.

```text
Static check: python -m py_compile app/{models,storage,main}.py → OK
Full suite after Feature 1 backend: .venv/bin/python -m pytest -q → 25 passed, 3 warnings
Frontend JS syntax: node --check (extracted <script>) → OK
```

Ad-hoc backend smoke (FastAPI TestClient, scratchpad script, not committed) — all
20 assertions PASS: valid create echoes ISO `due_date`; invalid date (`2026-13-40`,
`not-a-date`) → 422; past-due ToDo/InProgress → `overdue:true`; due-today → false;
Done past-due → false; `?overdue=true/false` filters correctly; PATCH set/clear
(`due_date:null`) works and leaves unrelated fields unchanged; response shape is
additive (`due_date` + `overdue` on every task).

### Feature 1 verification — Prompt 07 (per requested item)

Evidence sources: `pytest` (regression), an ad-hoc FastAPI TestClient smoke script
(scratchpad, not committed), and code-path review. No browser control this session.

| Requested item | Status | Evidence |
|---|---|---|
| Full pytest suite (regression) | PASS | `.venv/bin/python -m pytest -q` → `41 passed, 3 warnings` (25 existing + 16 new) |
| Targeted Feature 1 pytest | PASS | `pytest tests/test_due_dates.py` → `16 passed` (added after the initial Prompt 07 snapshot; see §2) |
| Create with / without date | PASS (API) / NOT RUN (UI) | Smoke: with date → 201 + ISO `due_date`; without → 201 + `null`. Browser create NOT RUN. |
| Edit and clear date | PASS (API) / NOT RUN (UI) | Smoke: PATCH sets date (200), PATCH `due_date:null` clears (200), `title` unchanged. Browser edit NOT RUN. |
| Refresh persistence | PASS (API) / NOT RUN (UI) | Smoke: GET after PATCH reflects the change (module-level store). UI server-truth refresh NOT RUN. |
| Invalid backend date behavior | PASS (API) | Smoke: `2026-13-40` and `not-a-date` → 422. (Native date picker blocks bad input; Network-forced 422 path NOT RUN.) |
| Overdue indicator semantics | PASS (predicate) / NOT RUN (UI) | Smoke: past ToDo & InProgress → `overdue:true`; due-today → false; Done past-due → false. Visual badge NOT RUN. |
| Overdue filter and clear | PASS (API) / NOT RUN (UI) | Smoke: `?overdue=true` returns only the two overdue; `?overdue=false` excludes them. UI toggle/clear NOT RUN. |
| Preserved existing behavior | PASS (backend) / NOT RUN (UI) | `25 passed`; response keys additive (no shape assertions broken). Drag/edit/modal UI NOT RUN. |

Maps to behavior-contract items: 1,2 PASS; 3 backend-PASS/UI-NOT RUN; 4,5,6,7,9
backend-PASS/UI-NOT RUN; 8 NOT RUN (visual). **No FAIL found; no source change made this phase.**

## 2. New backend tests

Use one row per new test. The assignment requires at least four new pytest tests; the recommended target is at least eight meaningful tests across the two features. Feature 1 added **16** tests in `tests/test_due_dates.py` (rows below summarise the four required categories).

| Feature | Test name | Behavior protected | Targeted command | Result |
|---|---|---|---|---|
| Due dates | `test_create_task_with_valid_due_date_returns_201_and_echoes_iso` | Valid create echoes ISO date; overdue=false | `pytest tests/test_due_dates.py` | PASS |
| Due dates | `test_create_task_invalid_due_date_month_returns_422` / `_non_date_due_date_` | Invalid date rejected by backend (422) | `pytest tests/test_due_dates.py` | PASS |
| Due dates | `test_update_clears_due_date_via_null_keeps_other_fields` / `_sets_due_date_` | Update + clear via null; unrelated fields intact | `pytest tests/test_due_dates.py` | PASS |
| Due dates | `test_overdue_filter_returns_only_past_due_incomplete` (+ semantics/predicate tests) | Overdue filter + predicate (due-today & Done excluded) | `pytest tests/test_due_dates.py` | PASS |
| Search/filters | `[TEST]` | Title/description search | `[COMMAND]` | NOT RUN |
| Search/filters | `[TEST]` | Case-insensitive matching | `[COMMAND]` | NOT RUN |
| Search/filters | `[TEST]` | Combined status + priority | `[COMMAND]` | NOT RUN |
| Search/filters | `[TEST]` | No matches or invalid filter | `[COMMAND]` | NOT RUN |

### Full suite after Feature 1

```text
Command: .venv/bin/python -m pytest -q
Result: 41 passed, 3 warnings in 0.12s   (25 existing + 16 new Feature 1 tests in tests/test_due_dates.py)
```

### Full suite after Feature 2

```text
Command: [COMMAND]
Result: [REAL SUMMARY]
```

### Final full suite

```text
Command: [COMMAND]
Result: [REAL SUMMARY]
```

## 3. Manual browser checks — Feature 1

> Browser control was **unavailable** in the implementation session, so every row
> below is **NOT RUN**. To run them: start the backend
> (`uvicorn app.main:app --reload`) and frontend
> (`python3 -m http.server 5500 --directory frontend`), open
> <http://127.0.0.1:5500>, and open DevTools → Network. The invalid-date case is
> not reachable from the native date picker; force it via the Network panel (re-send
> a create/edit with `"due_date":"2026-13-40"`) and confirm a 422 with the modal
> error shown and no false success.

| Check | Exact action | Expected | Evidence | Status |
|---|---|---|---|---|
| Create with date | Create a task with a future date. | POST succeeds; date appears and persists after refresh. | `[NETWORK/SCREENSHOT/NOTE]` | NOT RUN |
| Create without date | Create with empty date field. | Task is created without a misleading date. | `[EVIDENCE]` | NOT RUN |
| Edit date | Change the date, save, refresh. | New date persists; unrelated fields stay unchanged. | `[EVIDENCE]` | NOT RUN |
| Clear date | Remove date in edit mode. | Date remains cleared after refresh. | `[EVIDENCE]` | NOT RUN |
| Overdue indicator | View a past-due incomplete task. | Overdue marker is visible. | `[EVIDENCE]` | NOT RUN |
| Due today | View a task due today. | It is not marked overdue. | `[EVIDENCE]` | NOT RUN |
| Completed past due | View a completed task with a past date. | It is not marked overdue. | `[EVIDENCE]` | NOT RUN |
| Overdue filter | Activate then clear filter. | Only overdue tasks display; columns remain; clear restores. | `[EVIDENCE]` | NOT RUN |

## 4. Manual browser checks — Feature 2

| Check | Exact action | Expected | Evidence | Status |
|---|---|---|---|---|
| Search title | Enter a unique title fragment. | Matching task displays. | `[EVIDENCE]` | NOT RUN |
| Search description | Enter a description-only fragment. | Matching task displays. | `[EVIDENCE]` | NOT RUN |
| Case-insensitive | Search with different case. | Same matching task displays. | `[EVIDENCE]` | NOT RUN |
| Combined filters | Choose status + priority and optional assignee/overdue. | Only tasks satisfying every criterion display. | `[EVIDENCE]` | NOT RUN |
| No matches | Enter a known non-match. | 200/empty result; columns and empty states remain. | `[EVIDENCE]` | NOT RUN |
| Clear/reset | Click clear/reset. | Controls reset and unfiltered board reloads. | `[EVIDENCE]` | NOT RUN |
| Request error | Stop backend or use observed failure safely. | Visible error; no false “no matches” state. | `[EVIDENCE]` | NOT RUN |

## 5. Behavior contract before refactor

Copy the completed statuses from `behavior-contract.md` and add evidence references.

- Result: `[__ / 16 PASS]`
- Failures corrected before checkpoint: `[COMPLETE]`
- Commit/checkpoint: `[HASH AND MESSAGE]`

## 6. Break Test evidence — required test 1 (Feature 1)

| Step | Evidence |
|---|---|
| Selected test | `tests/test_due_dates.py::test_due_today_is_not_overdue` |
| Why important | Protects the strict boundary rule "a task due **today** is not overdue" (ADR-2 / F1-US3). A weaker predicate (`<=`) would wrongly flag today's tasks. |
| Clean checkpoint | `app/models.py` at commit `b40f664`; `git diff -- app/models.py` empty before mutation. |
| Correct-source command/result | `pytest tests/test_due_dates.py::test_due_today_is_not_overdue` → `1 passed`. |
| Approved temporary source mutation | `app/models.py`, `is_overdue`: `return due_date < today` → `return due_date <= today`. Test file unchanged. |
| Mutated-source command/result | Same command → `1 failed`: `assert True is False` at `tests/test_due_dates.py:86`. |
| Why failure is semantic | Under `<=`, a task with `due_date == today` computes `overdue=True`; the test requires `False`. It fails on the exact due-today boundary the rule defines — not a syntax error — proving the test enforces strict `<`. |
| Source restoration | `git checkout -- app/models.py` (restores `<`). |
| Restored command/result | Same command → `1 passed`; full suite `.venv/bin/python -m pytest -q` → `41 passed, 3 warnings`. |
| Final Git proof | `git diff -- app/models.py` empty; `git status` shows `app/` clean (only the intended Feature 1 test + docs remain, committed in this checkpoint). |

## 7. Break Test evidence — required test 2 (Feature 2)

| Step | Evidence |
|---|---|
| Selected test | `[TEST NAME]` |
| Why important | `[BEHAVIOR/BUG IT PROTECTS]` |
| Clean checkpoint | `[HASH / GIT STATUS]` |
| Correct-source command/result | `[COMMAND + PASS]` |
| Approved temporary source mutation | `[EXACT SMALL CHANGE; DO NOT CHANGE TEST]` |
| Mutated-source command/result | `[COMMAND + EXPECTED FAILURE EXCERPT]` |
| Why failure is semantic | `[EXPLAIN]` |
| Source restoration | `[HOW RESTORED]` |
| Restored command/result | `[COMMAND + PASS]` |
| Final Git proof | `[git diff/status RESULT]` |

## 8. Focused refactor and behavior preservation

| Item | Evidence |
|---|---|
| Working checkpoint before refactor | `[HASH]` |
| Refactor target | `[ONE FUNCTION/SECTION]` |
| Reason | `[READABILITY/DUPLICATION/STRUCTURE]` |
| Files/symbols changed | `[COMPLETE]` |
| AI proposal accepted/edited/rejected | `[COMPLETE]` |
| Targeted checks | `[COMMANDS + RESULTS]` |
| Full pytest result | `[RESULT]` |
| Browser contract result | `[RESULT]` |

## 9. Behavior contract after refactor

- Result: `[__ / 16 PASS]`
- Regressions found: `[NONE OR DESCRIBE]`
- Corrections made: `[COMPLETE]`
- Remaining `NOT RUN` items: `[COMPLETE]`

## 10. Final repository hygiene

| Check | Status/evidence |
|---|---|
| Branch is exactly `mid-course-project` | NOT RUN |
| Working tree contains no temporary Break Test mutation | NOT RUN |
| No secrets/credentials/private data | NOT RUN |
| No debug prints or temporary sample data | NOT RUN |
| No unrelated generated files | NOT RUN |
| Required docs complete with no brackets/TBD | NOT RUN |
| README commands verified | NOT RUN |
| Public remote branch pushed | NOT RUN |
| Repository URL ready for submission | `[URL]` |
