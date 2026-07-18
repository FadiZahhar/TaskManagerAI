# Security Hardening Notes

Follow-up branch: `security-hardening` (branched from the submitted
`final-project` release). This branch applies the security findings that
`Docs/final-ai-review.md` recorded as **owned backlog** items. The submitted
`final-project` branch is unchanged; merge this branch only if you want the
fixes in the graded submission (see "Ownership note" below).

## What changed and why

### S1 + S2 — explicit-`null` corruption and transition-guard bypass (`app/models.py`)

- **Before:** `TaskUpdate` accepted an explicit JSON `null` for `title`,
  `description`, `status`, or `priority`. `model_dump(exclude_unset=True)` kept
  the `null`, and `model_copy(update=…)` wrote `None` into non-optional
  `TaskResponse` fields without re-validation. A single `PATCH {"title": null}`
  returned **200** and corrupted the stored task, so a later `GET /tasks?search=…`
  returned **500**. An explicit `{"status": null}` also skipped
  `validate_status_transition` (S2).
- **Fix:** a `@model_validator(mode="before")` on `TaskUpdate` rejects an
  explicit `null` for the non-nullable fields (`title`, `description`, `status`,
  `priority`) with a **422**. `assignee` and `due_date` stay nullable — an
  explicit `null` still clears them. No storage or route change was needed.

### S3 — unbounded string input (`app/models.py`)

- **Before:** only `title` had a length cap (200). `description` and `assignee`
  were unbounded (a 10,000-char value was accepted).
- **Fix:** `Field(max_length=…)` on both `TaskCreate` and `TaskUpdate` —
  `description` ≤ `DESCRIPTION_MAX_LENGTH` (2000), `assignee` ≤
  `ASSIGNEE_MAX_LENGTH` (100). Over-length input returns **422**. The bounds are
  module constants in `app/models.py`; adjust them if the product needs
  different limits.

### S4 — frontend swallowed 422 field errors (`frontend/index.html`)

- **Before:** error handling used `typeof body.detail === "string"`, but
  FastAPI request-validation (422) returns `detail` as an **array** of
  `{loc, msg}` objects, so the specific field error was lost and the user saw a
  generic "Request failed…".
- **Fix:** a small `errorDetail(body, status)` helper normalizes both the string
  form (404 / invalid transition) and the array form (422) into a readable
  message, used in all three error paths (create/edit submit, drag, delete).

## Verification

- Full suite: **74 passed** (60 original + 14 new) on Python 3.9.6 —
  `.venv/bin/python -m pytest`. No regression; the original 60 still pass.
- New tests: `tests/test_security_hardening.py` cover explicit-null rejection on
  each non-nullable field, that a rejected null leaves the task intact and
  `search` stays 200 (the old 500 path), the null-status transition bypass, that
  `assignee`/`due_date` null still clear, the description/assignee length bounds,
  and that valid updates (and an empty-body no-op) still succeed.
- Targeted probes against the running app confirmed: `PATCH` null
  title/description/status/priority → **422**; `GET /tasks?search=…` after a
  rejected null → **200** (was 500); `assignee`/`due_date` null → **200**;
  over-length description/assignee → **422**; valid title update and
  `ToDo → InProgress` transition → **200**.
- Frontend `errorDetail` was logic-tested with Node against **real** captured
  422 bodies: over-length → `"description: String should have at most 2000
  characters"`; invalid enum → `"priority: Input should be 'Low', 'Medium' or
  'High'"`; business-rule string detail passes through; empty body → generic
  fallback.
- Browser visual confirmation of the new error text in the modal: **NOT RUN**
  (no browser automation) — reproduce by submitting an over-length description
  and confirming the field-specific message appears.

## Ownership note

`final-project`'s owner-approved ownership statement says these limitations were
kept as **documented backlog** rather than rushing a fix, and its evidence
records `app/`/`frontend/` as unchanged. That submission remains internally
consistent. If you merge this branch into `final-project`, update the ownership
statement and the S1–S4 dispositions in `Docs/final-ai-review.md` (and the
`app/`/`frontend/` "changed: No" lines in `Docs/release-evidence.md`) so the
evidence stays truthful.
