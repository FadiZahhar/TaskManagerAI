# AI Prompt Log

> Complete this file from the actual Claude sessions. Keep prompts and response summaries concise. Do not paste entire transcripts or invent decisions.

## Tools used

| Tool | Purpose | Why selected |
|---|---|---|
| Claude Code | Repository inspection, planning, focused implementation, test drafting, diff review, and evidence-based debugging | Single agent that inspects the real repo, runs pytest/`py_compile`/`node --check`, and makes focused edits under the phased workflow. |
| `[OTHER TOOL, IF USED]` | `[PURPOSE]` | `[REASON]` |

## Weak prompt rewritten into a stronger prompt

### Weak prompt

```text
Add due dates and filters to my task app and test everything.
```

### Why it is weak

- It combines two features and every development phase.
- It does not name the repository contract, files, edge cases, or scope boundaries.
- It invites a large rewrite and invented architecture.
- “Test everything” is not measurable.

### Stronger rewrite

```text
Read AGENTS.md, CLAUDE.md, the actual task schemas/routes, existing pytest tests, and the current frontend. Work read-only first.

For Feature 1 only, produce a repository-grounded implementation plan for an optional date-only due_date field and overdue filtering. Confirm exact files, completed-status value, nullable-field convention, current task-list route, test fixtures, and frontend modal/card functions. Use this target overdue rule unless the repository proves a conflict: due_date is before today and status is not completed; due today is not overdue.

Return acceptance criteria, exact likely files/symbols, risks, proposed targeted tests, browser evidence, and the smallest phase order. Do not edit code, add dependencies, or plan Feature 2 yet. Mark assumptions separately from repository facts and stop after the plan.
```

---

## Feature 1 — Due Dates + Overdue Filtering

### F1-P1 — Repository-grounded feature plan

**Prompt used:** See Prompt 03 in `claude-prompts.md` or paste the exact final prompt here.

```text
[PASTE EXACT PROMPT SENT]
```

**AI response summary:** Read-only plan (Prompt 03). Proposed `due_date: Optional[date]` on the three models following the `assignee` nullable precedent; `overdue` as a derived Pydantic computed field (not stored) backed by one predicate `is_overdue(due_date, status, today)`; an `overdue` query filter on the existing `GET /tasks`; and the frontend modal/card/toggle touchpoints. Flagged the missing `mini-adr.md` and two decisions to ratify.

**Human review:**

- Accepted: the plan as written (models/storage/route boundary; derived overdue; filter on the existing endpoint).
- Edited: none.
- Rejected: none.
- Corrected AI assumption: rejected the naive "required datetime + stored `overdue` boolean" in favour of an optional date-only field with overdue derived per response (ADR-2); "today" fixed to UTC for consistency with existing timestamps.

**Evidence produced:** Prompt 03 plan (facts vs assumptions, files/symbols, test matrix, phase order); `Docs/midcourse/mini-adr.md` (ADR-1..4).

### F1-P2 — Backend implementation

**Prompt used:** See Prompt 04 (implemented together with Prompt 06 after the user chose "Backend first, then frontend").

**AI response summary:** Added `due_date` to `TaskCreate/Update/Response`, the `is_overdue` predicate, the `overdue` computed field, `due_date` persistence in `storage.add_task`, and the `overdue` filter in `storage.get_all_tasks` + `list_tasks`. `update_task` left unchanged (its `exclude_unset=True` already gives clear-via-null).

**Human review:**

- Accepted: the full backend diff.
- Edited: none.
- Rejected: none.

**Verification:** `py_compile` OK; `.venv/bin/python -m pytest -q` → `25 passed`; ad-hoc TestClient smoke → 20/20 assertions PASS.

### F1-P3 — Focused pytest coverage

**Prompt used:** See Prompt 05 (completed after Prompt 07, when the user asked to close the remaining gaps).

**AI response summary:** Added `tests/test_due_dates.py` — 16 focused tests using the shared `client`/`created_task` fixtures and autouse reset: valid/absent create, invalid-date 422 (×2), update + clear-via-null with unrelated fields intact, overdue semantics (past incomplete, due-today, Done past-due, InProgress past-due), overdue filter (true/false/empty/invalid-bool), unfiltered regression, and a clock-independent `is_overdue` unit test. Deterministic via UTC-relative dates (no frozen clock, no new dependency).

**Human review:**

- Accepted test cases: all 16.
- Assertions strengthened or setup edited: assert status **plus** meaningful body/state (ids, unchanged fields, `overdue` flag), never status alone.
- Rejected test or weak assertion: none.

**Verification:** `pytest tests/test_due_dates.py` → `16 passed`; full suite `.venv/bin/python -m pytest -q` → `41 passed, 3 warnings`.

### F1-P4 — Frontend integration and browser contract

**Prompt used:** See Prompt 06.

**AI response summary:** Added the modal due-date input, edit prefill, null-clear payload rule, timezone-safe `formatDueDate`, card date display + accessible overdue badge, and an "Overdue only" toggle wired through `buildTaskQuery()` (server-side filtering; no client-side filtering). Existing columns/sorting/drag/modal/banner preserved.

**Human review:**

- Accepted: the frontend diff.
- Edited: none.
- Rejected: none.

**Browser evidence:** PASS — 16/16 UI checks via headless Google Chrome 150 driven over the Chrome DevTools Protocol (real fetch + CORS from the `:5500` origin) against the running servers. Covers create/edit/clear, due-date display, overdue badge (with `aria-label`), due-today/Done-past-due semantics, and the overdue filter/clear. Recorded in `verification.md` §3.

### F1-P5 — Break Test and debugging evidence

**Prompt used:** See Prompts 08A and 08B.

```text
[PASTE EXACT PROMPT(S) SENT]
```

**AI response summary:** `[COMPLETE]`

**Human decision:** `[WHY THE MUTATION WAS SAFE AND WHY THE FAILURE PROVED THE TEST]`

---

## Feature 2 — Search + Combined Filters

### F2-P1 — Repository-grounded feature plan

**Prompt used:** See Prompt 09.

```text
[PASTE EXACT PROMPT SENT]
```

**AI response summary:** A 4-perspective design workflow (backend / test-matrix / frontend / adversarial), grounded in the repo, proposed query params `search` (case-insensitive substring over title AND description, trimmed, blank→omitted) and `assignee` (case-insensitive EXACT, both sides trimmed, None-safe); all filters compose with logical AND in `storage.get_all_tasks`; unchanged 422 enum validation; server-side only. Frontend: a compact filter bar via `URLSearchParams`, a sequence-id stale guard, debounce, and a Clear button.

**Human review:**

- Accepted: extend the existing `GET /tasks` endpoint; `search`/`assignee` names; server-side filtering.
- Edited: none at plan time.
- Rejected: none.
- Corrected AI assumption: rejected the naive "fetch all tasks once and filter in JavaScript" approach in favour of extending `GET /tasks` and testing query behavior; the client only sends filters and renders the server result.

### F2-P2 — Backend filtering implementation

**Prompt used:** See Prompt 10.

**AI response summary:** Added `search` + `assignee` params to `list_tasks` and `get_all_tasks` as two AND-composed comprehension blocks; search is case-insensitive substring over title OR description, trimmed, blank→omitted; assignee is case-insensitive exact, both sides trimmed and None-safe. Applied one adversarial-review hardening (trim the stored assignee too). No model/frontend/test change.

**Human review:**

- Accepted: the full backend diff + the symmetric-assignee-trim hardening.
- Edited: none.
- Rejected: none.

**Verification:** import OK; nearest tests 13 passed; full suite 41 passed; ad-hoc TestClient smoke confirmed search / AND / assignee / invalid-enum-422 / no-mutation.

### F2-P3 — Focused pytest coverage

**Prompt used:** See Prompt 11.

**AI response summary:** Added `tests/test_search_filters.py` — 19 tests (shared fixtures, public-API setup, set-based assertions): search title / description-only / title-or-description, case-insensitive, whitespace-trim, blank & empty → no search, no-match 200 `[]`, regex-metachar matches literally (no ReDoS/500), status+priority / search+status / search+overdue AND, assignee exact CI, assignee-not-substring, invalid status/priority 422, combined invalid-enum+search 422, unfiltered regression, no mutation.

**Human review:**

- Accepted test cases: all 19.
- Assertions strengthened or setup edited: set-based (order-insensitive) assertions; assert status **plus** meaningful body.
- Rejected test or weak assertion: none.

### F2-P4 — Frontend search/filter bar

**Prompt used:** See Prompt 12.

**AI response summary:** Added the compact filter bar (search input, status/priority selects carrying enum VALUES, assignee input, overdue checkbox, Clear). `buildTaskQuery` uses `URLSearchParams` (encoding), omits blank/empty, and never sends `overdue=false`. `loadBoard` gained a sequence-id stale-response guard; text inputs are debounced; Clear resets controls + one unfiltered fetch. No new dependency; single-file change.

**Human review:**

- Accepted: the frontend diff.
- Edited: none.
- Rejected: none.

**Browser evidence:** PASS — 22/22 headless-Chrome (CDP, Network-captured) checks; see `verification.md` §4.

### F2-P5 — Break Test and debugging evidence

**Prompt used:** See Prompts 14A and 14B.

```text
[PASTE EXACT PROMPT(S) SENT]
```

**AI response summary:** `[COMPLETE]`

**Human decision:** `[COMPLETE]`

---

## Refactor prompt and decision

**Prompt used:** See Prompts 16A and 16B.

**Selected area:** `[FILTER HELPER / QUERY BUILDER / RENDER FUNCTION / OTHER]`

**Behavior risks named before refactor:** `[COMPLETE]`

**AI changes accepted/edited/rejected:** `[COMPLETE]`

**Before/after contract result:** `[COMPLETE]`

## Evidence-based debugging entry

**Failure:** `[ONE REAL FAILURE]`

**Evidence supplied to AI:** `[STATUS, RESPONSE, TRACEBACK, CONSOLE, NETWORK, OR DIFF]`

**AI diagnosis:** `[SUMMARY]`

**Decision:** `ACCEPTED / EDITED / REJECTED` — `[WHY]`

**Result:** `[TARGETED + FULL VERIFICATION]`
