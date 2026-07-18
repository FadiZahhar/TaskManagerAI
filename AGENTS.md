# Task Tracker — Agent Instructions (Final Project)

## Project purpose

Task Tracker is a small FastAPI task-tracking API with a single-file vanilla
HTML/CSS/JavaScript Kanban frontend, built incrementally across the course
(running skeleton → task CRUD with status-transition rules → drag-and-drop
Kanban board → mid-course due-dates and search/filter features).

The **final project** is a release-hardening and evidence exercise on the
`final-project` branch. It proves the existing application still works, that a
teammate can run it from exact instructions (local, tests, CI, Docker), and that
AI assistance was reviewed against real repository evidence rather than accepted
blindly. **It does not add product features.**

> Working rule: AI proposes; the human owner verifies and grades. The
> repository, tests, and observed evidence are the source of truth. Report
> conflicts before changing behavior or documentation.

## Active baseline

- Work only on branch `final-project`.
- `final-project` is based on the completed Module 5 branch `module-5-governance`
  at `46b62cd1ad945640b26c53fcf99cf8275deca7de`.
- Use the existing tracked `Docs/` directory, with uppercase `D`. (On a
  case-insensitive filesystem `docs/` resolves to the same directory; keep the
  tracked casing `Docs/`.)
- The observed baseline is **60 passing tests** on Python 3.9.6.

## Actual stack

- Python 3.9-compatible source syntax (avoid `X | None` unions; use
  `typing.Optional[X]`).
- FastAPI and Pydantic v2 models.
- In-memory Python dictionary storage (module-level `dict`).
- Pytest and FastAPI `TestClient` (httpx-backed).
- Vanilla HTML, CSS, and JavaScript in `frontend/index.html`.
- Container: `python:3.9-slim`, multi-stage, non-root runtime user.
- CI: GitHub Actions running the full pytest suite on push and pull request.

## Exact commands (verified on this branch)

```bash
# Setup
python3 -m venv .venv
source .venv/bin/activate            # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Backend  -> http://127.0.0.1:8000
uvicorn app.main:app --reload

# Frontend -> http://127.0.0.1:5500  (served separately; the API does not serve it)
python3 -m http.server 5500 --directory frontend

# Tests (full suite; 60 tests)
pytest

# When the venv is not activated, the verified equivalent is:
.venv/bin/python -m pytest

# Docker (API only; the frontend is a separate static server)
docker build -t task-tracker:final .
docker run -d --name task-tracker-final -p 8000:8000 task-tracker:final
curl -i http://127.0.0.1:8000/health          # expect HTTP 200 {"status":"ok",...}
docker rm -f task-tracker-final
```

The backend health endpoint is `GET /health` and returns HTTP 200 with
`{"status": "ok", "timestamp": "<UTC ISO 8601>"}`.

## Repository structure (important files)

- `app/main.py` — FastAPI app, local CORS configuration, task CRUD routes.
- `app/models.py` — enums, request/response models, title validation, optional
  due dates, derived `overdue` predicate.
- `app/storage.py` — module-level in-memory storage and server-side filtering.
- `app/business_rules.py` — allowed status transitions.
- `app/api/routes/health.py` — `GET /health`.
- `tests/conftest.py`, `tests/test_tasks.py`, `tests/test_due_dates.py`,
  `tests/test_search_filters.py`, `tests/test_health.py` — full suite.
- `frontend/index.html` — complete Kanban UI, modal, drag-and-drop, due-date
  display, overdue indicator, server-backed filter bar.
- `.github/workflows/ci.yml` — CI test workflow.
- `Dockerfile`, `.dockerignore` — container build.
- `Docs/` — course + release evidence (see Deliverables).

Do not invent a file or substitute a conventional FastAPI path for an actual
repository path.

## Confirmed business rules and task statuses

- Status values are exactly `ToDo`, `InProgress`, `Done`.
- Priority values are exactly `Low`, `Medium`, `High`.
- Create requires a title; titles are trimmed, non-blank, and ≤ 200 characters.
- Unknown request fields are rejected (`extra="forbid"`).
- `due_date` is optional and date-only (ISO calendar date or `null`); create and
  update can set and clear it.
- `overdue` is derived on `TaskResponse`, never stored: a task is overdue when
  its due date is strictly before the current UTC date and its status is not
  `Done`. Due today is not overdue; a `Done` task is never overdue.
- `GET /tasks` filters (status, priority, overdue, assignee, search) combine
  with logical AND; search is a trimmed, case-insensitive substring over title
  or description; assignee is a trimmed, case-insensitive exact match; blank
  values mean "no filter"; no matches returns HTTP 200 `[]`.
- Allowed transitions: `ToDo -> InProgress`, `InProgress -> Done`,
  `Done -> InProgress`. All others, including same-status updates, are rejected
  with HTTP 422.
- IDs are server-generated UUID strings; timestamps are UTC; data is lost on
  restart; single-process, not concurrency-safe.

## Frontend behavior that must not regress

- Three Kanban columns (To Do / In Progress / Done) stay visible.
- Create/edit modal, delete-with-confirm, and drag-and-drop status changes work.
- Filtering is server-side; the board renders server truth.
- API base is `http://127.0.0.1:8000`; CORS allows only the documented local
  frontend origins (`http://127.0.0.1:5500`, `http://localhost:5500`).
- Task-controlled text is rendered with `textContent` / text nodes (no
  task-controlled `innerHTML`); do not introduce an HTML-injection path.

## Final-project scope

Allowed changes:

1. Create required missing release deliverables (CI, Docker, evidence docs).
2. Documentation-accuracy corrections.
3. CI corrections.
4. Docker/runtime corrections.
5. Test corrections that fix a verified problem.
6. A minimal, verified bug or security correction.

Prohibited (out of scope — reject):

- Adding comments, authentication, notifications, a production database,
  deployment infrastructure, pagination, or unrelated UI changes.
- Replacing in-memory storage, migrating the frontend framework, broad visual
  redesign, mass reformatting of unrelated files, or opportunistic dependency
  modernization not tied to a failing requirement.

## Guardrails

- Begin investigations read-only; read the repository and docs before editing.
- Keep normal writes within `Docs/`, `AGENTS.md`, `README.md`, and the release
  infrastructure (`.github/`, `Dockerfile`, `.dockerignore`).
- **Protect `app/` and `frontend/`.** Change them only for a small, verified fix,
  and explain every such change in `Docs/final-ai-review.md`.
- Plan before multi-file edits; make the smallest change; review the focused
  diff (`git status --short`, `git diff`, `git diff --check`).
- Run the smallest relevant check first, then the full pytest suite when
  code/config behavior changed.
- Record browser/runtime behavior as `PASS` only when observed; otherwise use
  `NOT RUN` or `NEEDS OWNER VALIDATION` with exact manual steps. Never convert
  `NOT RUN` into `PASS`. Never claim a check passed without running it.
- Never paste or commit credentials, tokens, private keys, `.env` files,
  production logs, or real personal/customer data. Describe a sensitive category
  without copying its value.
- No destructive Git commands (no force-push, `reset --hard`, `clean -fd`,
  history rewrite, branch deletion).
- No commit, push, merge, or pull request outside `final-project` without
  explicit owner authorization after diff and verification review.
- `CLAUDE_FINAL_PROJECT_AUTOPILOT.md`, if present, is temporary operator input:
  do not stage or commit it, and exclude it from final placeholder scans.
- Preserve human ownership of security grades, review grades, manual findings,
  and the ownership statement. AI may draft and recommend; the owner decides.

## Deliverables

- `AGENTS.md`, `README.md` (with a Final Project section)
- `.github/workflows/ci.yml`, `Dockerfile`, `.dockerignore`
- `app/`, `frontend/`, `tests/`
- `Docs/release-evidence.md`, `Docs/final-ai-review.md`, `Docs/ai-playbook.md`
- Existing Module 1–5 and mid-course evidence under `Docs/` (retained).
