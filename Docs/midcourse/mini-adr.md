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

## ADR-4 — Feature 2 (search + combined filters)

**Status:** Deferred — not yet designed or implemented. To be completed under the
Feature 2 prompts (09+). No decisions recorded here yet.
