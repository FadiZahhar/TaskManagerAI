# Mini-ADR — Mid-Course Task Tracker

Short architecture decision records for the two mid-course features. Each entry
records the decision actually implemented, its context, the alternatives
considered, and the consequences. Backend is the source of truth.

---

## ADR-1 — Optional date-only `due_date`

**Status:** Accepted (Feature 1).

**Context.** Tasks need an optional deadline. The existing models use Pydantic v2
with `ConfigDict(extra="forbid")` and an `Optional[str]` nullable precedent
(`assignee`). Target platform runs Python 3.9.6, so `X | None` union syntax is
unavailable.

**Decision.** Add `due_date: Optional[date] = None` to `TaskCreate`,
`TaskUpdate`, and `TaskResponse` in `app/models.py`, mirroring the `assignee`
nullable convention. `datetime.date` gives date-only semantics; Pydantic v2
serializes it as an ISO calendar date (`2026-07-31`) and rejects malformed
values with HTTP 422 at the request boundary. Absent/`null` is the "no due date"
representation — no empty-string coercion (that is `description`'s convention,
not this field's).

**Alternatives.** A required `datetime` timestamp (rejected: the feature is a
calendar deadline, not an instant, and required would break existing create
flows). A separate parallel model (rejected: unnecessary duplication).

**Consequences.** Existing create/update paths keep working because the field
defaults to `None`. `storage.update_task` already distinguishes "field omitted"
(unchanged) from "field explicitly `null`" (cleared) via
`model_dump(exclude_unset=True)`, so clear-vs-omit needs no new code.

---

## ADR-2 — `overdue` is derived, never stored

**Status:** Accepted (Feature 1).

**Context.** The board must show and filter overdue tasks. AGENTS.md requires
overdue to be backend-owned and forbids persisting a mutable `overdue` flag.

**Decision.** Expose `overdue` as a Pydantic v2 `@computed_field` on
`TaskResponse`, backed by one pure predicate:

```python
def is_overdue(due_date, status, today) -> bool:
    if due_date is None or status == TaskStatus.DONE:
        return False
    return due_date < today          # strict '<' → due today is NOT overdue
```

The same predicate powers the list filter, so the reported field and the filter
can never disagree. `overdue` is computed on serialization and is not part of
storage, `TaskCreate`, or `TaskUpdate`.

**Predicate rules.**
- Overdue = has a `due_date`, `due_date < today`, and `status != Done`.
- Due **today** is not overdue (strict less-than).
- A **Done** task is never overdue, even if its `due_date` is in the past.
- Only `Done` counts as completed; an **InProgress** past-due task **is** overdue.

**"Today" source.** `datetime.now(timezone.utc).date()`, matching the UTC
`created_at`/`updated_at` already used across the app. Documented so tests and
reviewers use the same reference. Edge note: a task exactly at the UTC
day-boundary flips at UTC midnight, not local midnight.

**Alternatives.** Frontend-computed overdue (rejected: would duplicate the rule
and let client and server diverge). A stored boolean (rejected by the brief and
because it would go stale as the date advances).

**Consequences.** `extra="forbid"` governs input only, so the computed output
field is compatible. Responses gain an additive `overdue` key; existing tests do
not assert exact response shape, so they remain green.

---

## ADR-3 — Overdue filtering on the existing list endpoint

**Status:** Accepted (Feature 1).

**Context.** F1-US4 needs an overdue filter. `GET /tasks` already filters by
`status` and `priority` in `storage.get_all_tasks`.

**Decision.** Extend the existing endpoint with an optional
`overdue: Optional[bool] = None` query parameter rather than adding a parallel
route. `None` preserves current behavior; `true`/`false` filters using the
`is_overdue` predicate. Filters compose with logical AND (consistent with the
existing `status`/`priority` behavior). No match returns `200` with `[]`.

**Consequences.** Unfiltered `GET /tasks` is unchanged. The frontend adds the
`overdue` query param only when the filter is active.

---

## ADR-4 — Optional case-insensitive text search on the list endpoint

**Status:** Accepted (Feature 2).

**Context.** Users need to find tasks by text. `GET /tasks` already filters by
status/priority/overdue as sequential AND comprehensions over the in-memory dict.

**Decision.** Add an optional `search: Optional[str] = None` query parameter to
`list_tasks` → `storage.get_all_tasks`. Case-insensitive **substring** match over
**both** `title` and `description` (`term in title.lower() or term in
description.lower()`); the term is `.strip()`-ed and a blank/whitespace-only value
is treated as omitted. Matching uses Python `in` (no regex). No new field, model,
or dependency.

**Alternatives.** Regex search (rejected: ReDoS and a 500 on metacharacters like
`[`); a separate `/search` endpoint (rejected: the brief says extend the existing
list endpoint); tokenized/fuzzy search (rejected: out of scope).

**Consequences.** Omitted/blank search preserves the unfiltered list; no match →
`200` with `[]`; metacharacters match literally. `.lower()` is adequate for the
brief's ASCII scope (`.casefold()` would be more Unicode-correct — noted, not
required).

## ADR-5 — Assignee filter, AND composition, and the frontend filter bar

**Status:** Accepted (Feature 2).

**Decision.** Add `assignee: Optional[str] = None` to the list endpoint —
case-insensitive **exact** match with **both** the query and the stored value
trimmed, None-safe (an unassigned task never matches a value); blank → omitted. All
filters (status, priority, overdue, assignee, search) compose with **logical AND**
as independent sequential comprehensions; each `None`/blank filter is skipped so
omitted filters preserve current behavior. Filtering builds new lists and never
mutates `_tasks`. Invalid validated enum values keep FastAPI's `422`.

**Why exact (not substring) assignee.** It is the dedicated "filter to this person"
dimension, distinct from the free-text `search` over title/description; substring
assignee would add noise (e.g. `an` matching many names). Case-insensitive and
trimmed for usability and robustness against un-normalized stored values.

**Frontend.** A compact filter bar (search input; status/priority `<select>`s
carrying the enum **values**, not display labels; assignee input; the existing
overdue checkbox; a Clear button) builds the query with `URLSearchParams` (correct
encoding), omits blank/empty params (an empty enum like `?status=` would be a 422),
never sends `overdue=false`, guards against stale responses with a monotonic
sequence id, and debounces the text inputs — no framework or debounce library.
