# Module 5 Task Tracker — Agent Instructions

## Assignment objective

Complete Module 5 as a repository-grounded review, governance, planning, and
context-engineering exercise.

Module 5 does not add a new application feature. The comments-on-tasks work is
planning and critique only. Do not implement comment models, routes, storage,
tests, frontend controls, or migrations.

The central working rule is:

> AI proposes; the student grades.

The repository, tests, course materials, and observed evidence are the source
of truth. Report conflicts before changing behavior or documentation.

## Active baseline

- Work only on branch `module-5-governance`.
- This branch is based on `origin/mid-course-project` at
  `c2a369ee552fe328c21602f6ed44c9c4675d01e7`.
- Use the existing tracked `Docs/` directory, with uppercase `D`.
- The Phase 0 baseline is recorded in `Docs/module-5/evidence-index.md`.
- The observed baseline is 60 passing tests with four warnings.
- `module-4-devops` was not merged into this branch.
- `CLAUDE.md` is a short Module 5 wrapper that defers to this file and adds no
  separate branch or feature-development contract.

## Project summary and stack

This repository contains a FastAPI Task Tracker API and a single-file vanilla
HTML/CSS/JavaScript Kanban frontend.

Confirmed stack:

- Python 3.9-compatible source syntax.
- FastAPI and Pydantic v2 models.
- In-memory Python dictionary storage.
- Pytest and FastAPI `TestClient`.
- Vanilla HTML, CSS, and JavaScript in `frontend/index.html`.
- No database, migration system, frontend framework, Dockerfile, or GitHub
  Actions workflow is present on this branch.

Supported setup and run commands from `README.md`:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
python3 -m http.server 5500 --directory frontend
pytest
```

When the virtual environment is not activated, the verified equivalent test
command is:

```bash
.venv/bin/python -m pytest
```

The backend runs at `http://127.0.0.1:8000`. The frontend is served at
`http://127.0.0.1:5500`.

## Important repository files

- `app/main.py` — FastAPI application, local CORS configuration, and task CRUD
  routes.
- `app/models.py` — task enums, request/response models, title validation,
  optional due dates, and the derived overdue predicate.
- `app/storage.py` — module-level in-memory storage and server-side combined
  filtering.
- `app/business_rules.py` — allowed task-status transitions.
- `app/api/routes/health.py` — `GET /health`.
- `tests/conftest.py` — shared API client, created-task fixture, and automatic
  storage reset.
- `tests/test_tasks.py` — original CRUD, validation, error, and transition tests.
- `tests/test_due_dates.py` — due-date and overdue behavior tests.
- `tests/test_search_filters.py` — search and combined-filter tests.
- `frontend/index.html` — complete Kanban UI, task modal, drag-and-drop, due-date
  display, overdue indicator, and server-backed filter bar.
- `Docs/midcourse/` — completed mid-course requirements and evidence.
- `Docs/Module5/` — Module 5 guide and prompt-library source material.
- `Docs/module-5/` — Module 5 evidence generated during the current work.

Do not invent a file or substitute a conventional FastAPI path for an actual
repository path.

## Confirmed API and business contract

### Task values and validation

- Status values are exactly `ToDo`, `InProgress`, and `Done`.
- Priority values are exactly `Low`, `Medium`, and `High`.
- Create requires a title.
- Titles are trimmed, must not be blank, and must contain no more than 200
  characters.
- Unknown request fields are rejected because request models use
  `extra="forbid"`.
- No backend length limit is currently visible for description or assignee; do
  not claim one exists.
- `due_date` is optional and date-only. It is represented as an ISO calendar
  date or `null`.
- Create and update support setting and clearing `due_date`.
- Request-model and enum validation normally produces FastAPI HTTP 422
  responses.

### Overdue behavior

- `overdue` is derived on `TaskResponse`; it is never stored.
- A task is overdue when it has a due date earlier than the current UTC date and
  its status is not `Done`.
- A task due today is not overdue.
- A completed past-due task is not overdue.
- An `InProgress` past-due task is overdue.

### Search and filters

`GET /tasks` accepts optional status, priority, overdue, assignee, and search
filters.

- Filters combine with logical AND.
- Omitted filters preserve normal list behavior.
- Search is a trimmed, case-insensitive literal substring match over title or
  description.
- Blank search behaves as no search.
- Assignee is a trimmed, case-insensitive exact match.
- Blank assignee behaves as no assignee filter.
- Invalid status, priority, or boolean filter values are rejected by FastAPI.
- No matches returns HTTP 200 with `[]`.
- Filtering does not mutate stored tasks.

### Routes and errors

- `POST /tasks` creates a task and returns HTTP 201.
- `GET /tasks` lists tasks and returns HTTP 200.
- `GET /tasks/{task_id}` returns HTTP 200 or HTTP 404.
- `PATCH /tasks/{task_id}` returns HTTP 200, HTTP 404 for a missing task, or
  HTTP 422 for invalid input or an invalid status transition.
- `DELETE /tasks/{task_id}` returns HTTP 204 or HTTP 404.
- Allowed transitions are:
  - `ToDo -> InProgress`
  - `InProgress -> Done`
  - `Done -> InProgress`
- All other transitions, including same-status updates, are rejected.

### Storage and frontend behavior

- Tasks are stored in a module-level dictionary.
- IDs are server-generated UUID strings.
- Created and updated timestamps use UTC.
- Data is lost when the process restarts.
- The design assumes one process and does not provide durable or
  concurrency-safe persistence.
- The frontend keeps all three Kanban columns visible.
- Filtering is server-side.
- The frontend uses `http://127.0.0.1:8000` as its API base.
- CORS allows only the documented local frontend origins.
- Browser behavior is confirmed only when actually observed.

## Module 5 deliverables

Core expected artifacts are:

- `AGENTS.md`
- `Docs/security-review.md`
- `Docs/governance-worksheet.md`
- `Docs/decisions/comments-feature-plan.md`
- `Docs/architecture-A.md`
- `Docs/architecture-B.md`
- `Docs/architecture-C.md`
- `Docs/architecture.md`
- `Docs/ai-playbook.md`
- `Docs/module-5/evidence-index.md`

Supporting evidence may be placed under `Docs/module-5/`.

## Module 5 guardrails

- Begin investigations read-only.
- Keep normal Module 5 writes within `AGENTS.md` and `Docs/`.
- Do not modify `app/`, `tests/`, `frontend/`, dependencies, configuration, or
  prior-module evidence unless the user approves one exact change after
  reviewing its proposed diff.
- A security fix is optional. It requires a confirmed Valid finding, a minimal
  proposed diff, explicit approval, focused verification, and full-suite
  verification.
- Do not implement the comments feature.
- Do not merge `module-4-devops` or another branch without explicit approval.
- Do not add a database, dependency, framework, authentication system,
  pagination, deployment system, or new product feature.
- Do not rewrite or reformat unrelated files.
- Use one bounded task per phase and stop at the requested phase.
- Use fresh threads where the Module 5 experiment requires independent context.
- The generic comments plan must be produced without repository context.
- Architecture Strategies A, B, and C must remain separate; preserve their
  original drafts before comparison.
- Strategy C may read only its approved anchor files.
- Codex may scaffold or review the personal playbook, but the student writes the
  final rules, Decision Card, judgments, and reflection.
- Do not commit, push, open a pull request, reset, delete, or rewrite Git history
  without explicit user authorization after diff and verification review.

## Evidence and governance rules

- Cite exact repository files and line numbers when available.
- Distinguish confirmed facts, inferences, assumptions, and unavailable context.
- Remove claims based only on framework convention.
- Never fabricate a prompt response, test result, browser observation, failure,
  screenshot, commit hash, or security finding.
- Use `NOT RUN` when browser or runtime behavior was not observed.
- Working evidence may say `Not started` or `NOT RUN`; final submitted artifacts
  must contain no unresolved placeholders.
- Never expose or reproduce credentials, tokens, secrets, personal data,
  production data, or private configuration.
- Describe a sensitive-data category without copying its value.
- Security grades, manual findings, priorities, governance classifications,
  ownership answers, plan grades, context-strategy choice, and playbook rules
  remain student decisions.
- Treat known educational limitations separately from production
  vulnerabilities.
- Do not invent a You-only security finding merely to fill a table.

## Required workflow

For every bounded phase:

1. Inspect the exact files and symbols involved.
2. State the narrow task, planned files, and acceptance evidence.
3. Work read-only until the draft has been reviewed.
4. Request approval for the exact write.
5. Modify only the approved file or files.
6. Show `git status --short`, a focused diff, and `git diff --check`.
7. Run the smallest relevant check first.
8. Run the broader relevant suite at a milestone.
9. Record browser verification as PASS only when observed; otherwise use NOT RUN
   with exact manual steps.
10. Update `Docs/module-5/evidence-index.md` using observed evidence only.
11. Stop for review; do not continue automatically.

Before an approved write, report:

1. Files inspected.
2. Proposed target.
3. Draft content or diff.
4. Assumptions and unsupported claims.
5. Verification planned.

After the write, report:

1. Files inspected.
2. Files changed.
3. What changed and why.
4. Diff risks or assumptions.
5. Commands run and exact results.
6. Verification status as PASS, FAIL, or NOT RUN.
7. Documentation updated.
8. Remaining risks.
9. Next smallest recommended step.
