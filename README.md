# Task Tracker

A FastAPI task-tracking API with a vanilla HTML/CSS/JS Kanban frontend,
built incrementally across three modules: a running skeleton (Module 1),
full task CRUD with status-transition rules (Module 2), and a drag-and-drop
Kanban board with create/edit/delete (Module 3).

## Mid-Course Project: Task Tracker Enhancements

The `mid-course-project` branch adds two scoped, end-to-end features on top of
Modules 1–3:

1. **Due dates + overdue filtering** — an optional date-only `due_date`, a derived
   (never stored) `overdue` flag, and an overdue filter on `GET /tasks` and the board.
2. **Search + combined filters** — case-insensitive substring search over title and
   description, combined with status / priority / assignee / overdue filters (logical
   AND), plus a compact filter bar above the board.

Setup, backend, frontend, and test commands are unchanged — see [Setup](#setup),
[Run](#run), and [Test](#test) below. In short:

```bash
python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt
uvicorn app.main:app --reload                                  # backend  → http://127.0.0.1:8000
python3 -m http.server 5500 --directory frontend               # frontend → http://127.0.0.1:5500
pytest                                                         # full suite (60 tests)
pytest tests/test_due_dates.py tests/test_search_filters.py    # the new feature tests
```

The human-owned, AI-assisted workflow evidence lives in `docs/midcourse/`:

- User stories & acceptance criteria — `docs/midcourse/user-stories.md`
- Decision record (ADRs) — `docs/midcourse/mini-adr.md`
- AI prompt & decision log — `docs/midcourse/prompt-log.md`
- Verification & Break Test evidence — `docs/midcourse/verification.md`
- Reflection — `docs/midcourse/reflection.md`

## Project structure

```
.
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app, CORS, all routes
│   ├── models.py                # TaskStatus/TaskPriority enums, TaskCreate/Update/Response
│   ├── storage.py               # In-memory task storage (module-level dict)
│   ├── business_rules.py        # Status-transition validation
│   └── api/
│       ├── __init__.py
│       └── routes/
│           ├── __init__.py
│           └── health.py       # GET /health
├── frontend/
│   └── index.html               # Kanban board: fetch/render, drag-and-drop, create/edit modal
├── tests/
│   ├── __init__.py
│   ├── conftest.py              # client / created_task fixtures, autouse storage reset
│   ├── test_health.py
│   └── test_tasks.py            # Full CRUD + transition-matrix + edge-case coverage
├── Docs/
│   ├── user-stories.md, adr-0001-stack.md, reflection-log.md   # Module 1 artifacts
│   ├── Module2/                 # Module 2 prompts, prompt-comparison-log.md, reflection-log.md
│   └── Module3/                 # Module 3 prompts, behavior contract, debugging log
├── requirements.txt
├── pytest.ini
└── README.md
```

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

Requires Python 3.9+ (this project's venv is tested on 3.9.6 — avoid `X | None`
union-type syntax in new code, which needs 3.10+; use `typing.Optional[X]`
instead).

## Run

Two servers: the API backend, and a static file server for the frontend.

**Terminal 1 — backend:**
```bash
source .venv/bin/activate
uvicorn app.main:app --reload
```
Serves the API at `http://127.0.0.1:8000`.

**Terminal 2 — frontend:**
```bash
python3 -m http.server 5500 --directory frontend
```
Serves the board at `http://127.0.0.1:5500`.

Open `http://127.0.0.1:5500` in a browser. The backend's CORS policy
(`app/main.py`) only allows requests from `http://127.0.0.1:5500` and
`http://localhost:5500` — if you serve the frontend from a different port,
add it to `allow_origins` in `app/main.py` or the browser will block the API
calls.

## Test

```bash
pytest
```
60 tests covering health, full task CRUD, validation, the status-transition
matrix, due dates + overdue filtering, and search + combined filters (several
proven via deliberate source breakage — see `docs/midcourse/verification.md`
§6–7 and `Docs/Module3/debugging-log.md`).

## Verify

- Health check: <http://127.0.0.1:8000/health> → `{"status": "ok", "timestamp": "..."}`
- Swagger UI: <http://127.0.0.1:8000/docs>
- OpenAPI schema: <http://127.0.0.1:8000/openapi.json>
- Kanban board: <http://127.0.0.1:5500> — create, edit, delete, and drag tasks
  between To Do / In Progress / Done

```bash
curl -i http://127.0.0.1:8000/health
```

## What each module added

**Module 1 — running skeleton.** `GET /health`, Swagger docs, minimal project
structure. No CRUD, no auth, no database. Artifacts: `Docs/user-stories.md`,
`Docs/adr-0001-stack.md`, `Docs/reflection-log.md`.

**Module 2 — task CRUD + business rules.** Full `POST/GET/PATCH/DELETE /tasks`,
Pydantic validation (`app/models.py`), in-memory storage (`app/storage.py`),
and a status-transition rule restricting tasks to `ToDo → InProgress → Done`
(plus `Done → InProgress`) — anything else, including same-status no-ops, is
rejected with `422` (`app/business_rules.py`). Artifacts:
`Docs/Module2/api-reference.md`, a ready-to-import Postman collection
(`Docs/Module2/task-tracker.postman_collection.json`), and
`Docs/Module2/prompt-comparison-log.md`.

**Module 3 — Kanban frontend.** `frontend/index.html`: fetches and renders
tasks grouped by status and sorted by priority, native HTML5 drag-and-drop to
change status (with rejection/network-failure recovery), a create/edit modal,
delete with confirmation, and CORS scoped in `app/main.py` to the local
frontend origin. Visually redesigned with a dark-mode-aware design system,
icon-based actions, and status/priority color coding. Verified through live
manual browser testing (not just simulated) — see
`Docs/Module3/MODULE3_BEHAVIOR_CONTRACT.md` (8/8 items confirmed) and
`Docs/Module3/debugging-log.md` for the real bug found and fixed during that
testing.

## Known limitations

No authentication, no persistent database (all data is in-memory and reset
on restart), no pagination, no Docker/deployment configuration, single
process only. These are explicitly out of scope for this course project;
see `Docs/adr-0001-stack.md` for the reasoning and the risk this carries as
the project grows.
