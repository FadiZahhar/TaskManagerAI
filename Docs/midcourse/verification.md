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

Evidence sources: `pytest` (regression + 16 targeted), an ad-hoc FastAPI TestClient
smoke script, and — added when the user asked to close the gaps — a headless Chrome
(CDP) browser pass (§3). All rows now observed.

| Requested item | Status | Evidence |
|---|---|---|
| Full pytest suite (regression) | PASS | `.venv/bin/python -m pytest -q` → `41 passed, 3 warnings` (25 existing + 16 new) |
| Targeted Feature 1 pytest | PASS | `pytest tests/test_due_dates.py` → `16 passed` (see §2) |
| Create with / without date | PASS (API + UI) | Smoke: 201 + ISO / `null`. Browser (§3): card shows `Jul 17, 2026` / no badge. |
| Edit and clear date | PASS (API + UI) | Smoke: PATCH set + clear via null. Browser (§3): prefill `2026-07-17` → `2026-07-18`; clear → `null`, badge gone. |
| Refresh persistence | PASS (API + UI) | Smoke: GET after PATCH. Browser (§3): board re-renders server truth after each save. |
| Invalid backend date behavior | PASS (API) | Smoke + tests: `2026-13-40`, `not-a-date` → 422. (Native picker blocks bad input in-browser.) |
| Overdue indicator semantics | PASS (API + UI) | Smoke predicate. Browser (§3): past → red badge w/ aria-label; due-today → false; Done past-due → false. |
| Overdue filter and clear | PASS (API + UI) | Smoke `?overdue=`. Browser (§3): ON → only overdue, all columns visible; OFF → restored. |
| Preserved existing behavior | PASS (backend + UI) | `41 passed`; browser: all 3 columns, counts, empty placeholders, modal, banner intact. |

Maps to behavior-contract items 1–9: all **PASS** (item 8 visual due-date + overdue
indicator confirmed in §3). **No FAIL found; no source change made this phase.**

## 2. New backend tests

Use one row per new test. The assignment requires at least four new pytest tests; the recommended target is at least eight meaningful tests across the two features. Feature 1 added **16** tests in `tests/test_due_dates.py` and Feature 2 added **19** in `tests/test_search_filters.py` (rows below summarise the required categories per feature).

| Feature | Test name | Behavior protected | Targeted command | Result |
|---|---|---|---|---|
| Due dates | `test_create_task_with_valid_due_date_returns_201_and_echoes_iso` | Valid create echoes ISO date; overdue=false | `pytest tests/test_due_dates.py` | PASS |
| Due dates | `test_create_task_invalid_due_date_month_returns_422` / `_non_date_due_date_` | Invalid date rejected by backend (422) | `pytest tests/test_due_dates.py` | PASS |
| Due dates | `test_update_clears_due_date_via_null_keeps_other_fields` / `_sets_due_date_` | Update + clear via null; unrelated fields intact | `pytest tests/test_due_dates.py` | PASS |
| Due dates | `test_overdue_filter_returns_only_past_due_incomplete` (+ semantics/predicate tests) | Overdue filter + predicate (due-today & Done excluded) | `pytest tests/test_due_dates.py` | PASS |
| Search/filters | `test_search_matches_title` / `test_search_matches_description_only` / `test_search_matches_title_or_description` | Substring search over title AND description | `pytest tests/test_search_filters.py` | PASS |
| Search/filters | `test_search_is_case_insensitive` / `test_search_trims_surrounding_whitespace` / `test_blank_search_behaves_as_no_search` | Case-insensitive; trims; blank/empty → no search | `pytest tests/test_search_filters.py` | PASS |
| Search/filters | `test_status_and_priority_use_and` / `test_search_and_status_use_and` / `test_search_and_overdue_use_and` / `test_assignee_filter_exact_case_insensitive` | Combined filters compose with logical AND | `pytest tests/test_search_filters.py` | PASS |
| Search/filters | `test_search_no_match_returns_200_and_empty_list` / `test_invalid_status_filter_returns_422` / `test_invalid_enum_with_valid_search_still_returns_422` / `test_filtering_does_not_mutate_stored_tasks` | No-match 200 `[]`; invalid enum 422 (incl. combined); no mutation | `pytest tests/test_search_filters.py` | PASS |

### Full suite after Feature 1

```text
Command: .venv/bin/python -m pytest -q
Result: 41 passed, 3 warnings in 0.12s   (25 existing + 16 new Feature 1 tests in tests/test_due_dates.py)
```

### Full suite after Feature 2

```text
Command: .venv/bin/python -m pytest -q
Result: 60 passed, 3 warnings in 0.19s   (25 baseline + 16 Feature 1 + 19 Feature 2)
```

### Final full suite

```text
Command: [COMMAND]
Result: [REAL SUMMARY]
```

## 3. Manual browser checks — Feature 1

> **RUN on 2026-07-16** via headless Google Chrome 150.0.7871.124 driven over the
> Chrome DevTools Protocol — real JS + real `fetch` + real CORS from the
> `http://127.0.0.1:5500` origin, against live servers (backend `:8000`, frontend
> `:5500`). Chrome launched in `TZ=America/Los_Angeles` (UTC-8) to stress date
> formatting; the Network domain captured request URLs, PATCH bodies, and real
> HTTP status codes; drag-and-drop driven via synthetic `DataTransfer`/`DragEvent`.
>
> The check matrix was **designed by a 6-dimension agent fan-out**, executed by
> driver `bverify2.js` (scratchpad, not committed), then **adversarially audited**
> by a 4-lens agent workflow (false-positives / coverage-gaps / harness-artifacts /
> semantics). The audit's actionable findings were fixed in the harness (independent
> aria expected; real HTTP-status assertions; red-dominant style; null-date filter
> case; edit/delete under active filter; title-only-edit preserves date; server-side
> AND). Final run: **53/53 checks PASS** (store reset to empty afterwards).

**Comprehensive run — 53/53 PASS by group:**

| Group | Pass | What it proves |
|---|---|---|
| S1 render / semantics / a11y | 16/16 | overdue badge (class+title+aria) on past ToDo & InProgress; due-today/future/Done-past-due/no-date NOT overdue; strict-`<` boundary; exactly 2 overdue; priority+assignee preserved; **aria-label = independently-computed date**; human-readable format, no leading zero; UTC-8 renders ISO day (no off-by-one); red-dominant styling; `<input>` has `<label for>` |
| S2 overdue filter | 13/13 | server round-trip `GET ?overdue=true`; only overdue shown; due-today/Done/future/**null-date** excluded; all 3 columns + placeholders + counts; priority sort kept; survives create & drag; clear sends `GET /tasks` (no `overdue=false`); empty result = ready banner |
| S2b edit/delete under filter | 4/4 | editing a displayed overdue task to a future date removes it (filter stays ON); non-date edit keeps it; delete keeps filter ON (`DELETE 204`) — **F1-US4 "edit/drag remain functional for displayed tasks"** |
| S3 regression (Modules 1–3) | 9/9 | valid drag `PATCH 200` + counts; invalid drag → error banner, card stays; same-column noop (no PATCH); blank-title blocks submit (no POST); edit-only-title PATCH body has NO `status` key (`200`); invalid-transition modal error stays open; delete confirm (`204`) / cancel |
| S4 crud dates | 7/7 | create with/without date; edit prefill (ISO), change, clear; edit-only-date preserves other fields; edit-only-title preserves existing date |
| S5 error / network | 4/4 | invalid due_date `422`; edit missing task `404`; server-side AND `?status=ToDo&overdue=true`; backend down → error banner, no false success |

Core human-readable flows (subset, for quick reference):

| Check | Evidence | Status |
|---|---|---|
| Create with / without date | card shows `Jul 18, 2026` / no badge; API `due_date` matches | PASS |
| Edit change / clear date | prefill `2026-07-18` → `2026-07-25`; clear → `null`, badge gone | PASS |
| Overdue indicator (accessible) | red badge, `aria-label="Due Jul 15, 2026, overdue"` | PASS |
| Due-today / Done past-due not overdue | date shown, `overdue=false` | PASS |
| Overdue filter + clear | ON → only overdue, all columns visible, empties "No tasks"; OFF → restored | PASS |

Scope note: this browser run covers the UI-observable Feature 1 criteria. Contract
items 1 (Module 1–3 pytest), 2 (unfiltered `GET /tasks` shape) and 16 (Break Tests)
are established separately by §1/§2 (`41 passed`) and §6. Invalid-date input is
unreachable from the native date picker, so it is verified at the API/422 level.

## 4. Manual browser checks — Feature 2

> **RUN on 2026-07-16** via headless Google Chrome 150 over CDP (real fetch + CORS
> from the `:5500` origin) against live servers. The **Network domain captured every
> `GET /tasks` query string** to prove server-side filtering, URL-encoding, enum
> **values** (not labels), omitted-empty params, and that `overdue=false` is never
> sent. Drivers: scratchpad `bverify_f2.js` + `bverify_f2_err.js` (not committed).
> **22/22 checks PASS.**

| Check | Exact action | Expected | Evidence | Status |
|---|---|---|---|---|
| Search title | Type a title fragment (`report`). | Matching task(s) display; server round-trip. | Network `GET /tasks?search=report`; card `Write report` shown; all 3 columns visible. | PASS |
| Search description | Type a description-only fragment. | Description match displays. | `search=report` also returns `Email vendor` (matched via its description). | PASS |
| Case-insensitive | Search `REPORT`. | Same matches. | Same 2 cards returned for `REPORT`. | PASS |
| Combined filters | Set several controls. | AND across all criteria. | `?search=report&status=ToDo` → only `Write report`; `priority=High` → `Write report`+`Deploy API`; `assignee=dana lee` (exact, CI) → same. | PASS |
| No matches | Search `zzzznope`. | 200/empty; columns + placeholders remain; not an error. | 0 cards, all 3 columns show `No tasks` `(0)`, banner `ready`. | PASS |
| Clear/reset | Click **Clear**. | Controls reset; one unfiltered refetch. | All controls empty/unchecked; a single `GET /tasks` (no params); 4 cards restored. | PASS |
| Request error | Stop backend, trigger a filter reload. | Visible error; no false “no matches”. | Banner `error`: `Couldn't load tasks: Failed to fetch` (distinct from the ready+empty no-match state). | PASS |
| Enum values not labels | Filter status `In Progress`. | Sends the API enum value. | Network `status=InProgress` (never `In+Progress`); `All statuses` (value="") omits the param entirely. | PASS |
| Encoding / never overdue=false | Search `a & b`; toggle Overdue off. | Encoded query; unchecked omits param. | `search=a+%26+b` (200, matches literally); unchecking Overdue sends `GET /tasks` with no `overdue`. | PASS |
| Stale-response / debounce | Type 6 chars rapidly. | Few requests; final state correct. | Debounce collapsed 6 keystrokes → **1** request; board = `report` results. | PASS |
| Preserved flows | Create + drag with bar present. | Existing flows still work. | New task created; drag `ToDo→InProgress` persisted, filter bar unaffected. | PASS |

### Feature 2 verification — Prompt 13 (per requested item)

Automated re-run this pass; browser rows observed at commit `4e5abad` (frontend
byte-identical to HEAD, so the evidence stands). All PASS; no FAIL; no code change.

| Requested item | Status | Evidence |
|---|---|---|
| Targeted Feature 2 tests | PASS | `pytest tests/test_search_filters.py` → `19 passed` |
| Full pytest suite | PASS | `pytest -q` → `60 passed, 3 warnings` (25 + 16 F1 + 19 F2) |
| Title search | PASS | `test_search_matches_title`; browser §4: `GET ?search=report` → `Write report` |
| Description search | PASS | `test_search_matches_description_only`; browser §4: `search=report` also returns `Email vendor` (desc) |
| Case-insensitive result | PASS | `test_search_is_case_insensitive`; browser §4: `REPORT` returns same 2 cards |
| Combined filter AND | PASS | `test_status_and_priority_use_and` / `_search_and_status_` / `_search_and_overdue_`; browser §4: `?search=report&status=ToDo` → only `Write report` |
| No-match 200/[] + UI empty state | PASS | `test_search_no_match_returns_200_and_empty_list`; browser §4: 0 cards, all cols `No tasks (0)`, banner `ready` |
| Invalid filter API behavior | PASS | `test_invalid_status/priority_filter_returns_422`, `_invalid_enum_with_valid_search_still_returns_422`; browser: selects only emit valid enums, empty select omits param (no false 422) |
| Reset to unfiltered board | PASS | Browser §4: Clear resets all controls + single `GET /tasks`; 4 cards restored |
| Existing F1 + Module 1–3 UI flows | PASS | Full suite `60 passed` (all M1–3 + F1 tests); browser §4: create + drag preserved with the bar present; F1 board browser pass at §3 (53/53) unaffected (code identical) |

**No FAIL found; no source change made this phase.**

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

### Break Test #2 (Feature 1) — Done-exclusion rule

A second, distinct Feature 1 Break Test targeting a different semantic than #1 (which broke the strict-`<` boundary). This one breaks the "a Done task is never overdue" rule (ADR-2).

| Step | Evidence |
|---|---|
| Selected test | `tests/test_due_dates.py::test_completed_past_due_is_not_overdue` |
| Why important | Protects ADR-2's rule that a **completed (Done)** task is never flagged overdue, even when its due date is in the past. |
| Clean checkpoint | `HEAD f44b436`, tree clean; `git diff -- app/models.py` empty before mutation. |
| Correct-source command/result | `pytest tests/test_due_dates.py::test_completed_past_due_is_not_overdue` → `1 passed`. |
| Approved temporary source mutation | `app/models.py`, `is_overdue`: removed ` or status == TaskStatus.DONE` so the guard became `if due_date is None:`. Test file unchanged. |
| Mutated-source command/result | Same command → `1 failed`: `assert True is False` at `tests/test_due_dates.py:94`. |
| Why failure is semantic | Without the Done clause, a Done task with a past `due_date` satisfies `due_date < today` → `overdue=True`; the test requires `False`. It fails on the exact completed-exclusion rule — not a syntax error. (Collateral: `test_is_overdue_predicate_rules` and `test_overdue_filter_returns_only_past_due_incomplete` also fail, confirming the rule is well-covered.) |
| Source restoration | `git checkout -- app/models.py` (restores the Done clause). |
| Restored command/result | Same command → `1 passed`; full suite `.venv/bin/python -m pytest -q` → `41 passed, 3 warnings`. |
| Final Git proof | `git diff` empty and `git status --short` empty after restore — no temporary mutation remains. |

### Break Test #3 (Feature 1) — overdue filter logic

A third Feature 1 Break Test on a different function/module than #1 and #2 (which both mutate the `is_overdue` predicate in `models.py`). This one breaks the filter application in `storage.get_all_tasks` (the `?overdue=true` path, F1-US4).

| Step | Evidence |
|---|---|
| Selected test | `tests/test_due_dates.py::test_overdue_filter_returns_only_past_due_incomplete` |
| Why important | Protects that `GET /tasks?overdue=true` returns exactly the overdue tasks (server-side filtering), the crux of F1-US4. |
| Clean checkpoint | `HEAD 38f2466`, tree clean; `git diff -- app/storage.py` empty before mutation. |
| Correct-source command/result | `pytest tests/test_due_dates.py::test_overdue_filter_returns_only_past_due_incomplete` → `1 passed`. |
| Approved temporary source mutation | `app/storage.py`, `get_all_tasks`: changed `task.overdue == overdue` to `task.overdue != overdue` (invert the filter match). Test file unchanged. |
| Mutated-source command/result | Same command → `1 failed`: `AssertionError` at `tests/test_due_dates.py:115` — `?overdue=true` returned the 3 non-overdue tasks (`Left contains 2 more items`) instead of `[late]`. Status `200` still passed. |
| Why failure is semantic | Inverting the match makes the filter return the **complement** of the overdue set; the test asserts it returns exactly the overdue task. It fails on the precise filtering behavior, not a syntax error. (Collateral: `test_overdue_filter_false_excludes_overdue`, `test_overdue_filter_no_matches_returns_200_and_empty_list` also fail — filter path well-covered.) |
| Source restoration | `git checkout -- app/storage.py` (restores `== overdue`). |
| Restored command/result | Same command → `1 passed`; full suite `.venv/bin/python -m pytest -q` → `41 passed, 3 warnings`. |
| Final Git proof | `git diff` empty and `git status --short` empty after restore — no temporary mutation remains. |

## 7. Break Test evidence — required test 2 (Feature 2)

| Step | Evidence |
|---|---|
| Selected test | `tests/test_search_filters.py::test_search_matches_description_only` |
| Why important | Protects F2-US1's core rule that text search covers the **description** field, not only the title. Dropping the description clause would make description-only matches silently disappear. |
| Clean checkpoint | `HEAD 35bd28c`, tree clean; `git diff -- app/storage.py` empty before mutation. |
| Correct-source command/result | `pytest tests/test_search_filters.py::test_search_matches_description_only` → `1 passed`. |
| Approved temporary source mutation | `app/storage.py`, `get_all_tasks` search block: removed ` or term in task.description.lower()` so search became `term in task.title.lower()` only. Test file unchanged. |
| Mutated-source command/result | Same command → `1 failed`: `AssertionError: assert set() == {'Standup'}` at `tests/test_search_filters.py:40`. |
| Why failure is semantic | With title-only search, the term `roadmap` (present only in a description) matches nothing → `[]`; the test requires `{Standup}`. It fails on the exact "search covers description" rule — not a syntax error. (Collateral: `test_search_matches_title_or_description` also fails, confirming the rule is well-covered.) |
| Source restoration | `git checkout -- app/storage.py` (restores the `or … description` clause). |
| Restored command/result | Same command → `1 passed`; full suite `.venv/bin/python -m pytest -q` → `60 passed, 3 warnings`. |
| Final Git proof | `git diff` empty and `git status --short` empty after restore — no temporary mutation remains. |

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
