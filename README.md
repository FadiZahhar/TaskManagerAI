# Task Tracker

A FastAPI task-tracking API with a vanilla HTML/CSS/JS Kanban frontend,
built incrementally across three modules: a running skeleton (Module 1),
full task CRUD with status-transition rules (Module 2), and a drag-and-drop
Kanban board with create/edit/delete (Module 3).

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
├── .github/
│   └── workflows/
│       └── ci.yml               # CI: pytest on push / PR to main
├── Dockerfile                   # Multi-stage, non-root, API-only image
├── .dockerignore
├── requirements.txt
├── pytest.ini
└── README.md
```

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements-dev.txt   # runtime + tests (Docker uses runtime-only requirements.txt)
```

Requires Python 3.9+ (this project's venv is tested on 3.9.6 — avoid `X | None`
union-type syntax in new code, which needs 3.10+; use `typing.Optional[X]`
instead).

Dependencies are managed with `pip-tools`. Edit the sources (`requirements.in`,
`requirements-dev.in`) and regenerate the pinned, hashed lock files on Python 3.9:

```bash
pip-compile --generate-hashes --output-file=requirements.txt requirements.in
pip-compile --generate-hashes --output-file=requirements-dev.txt requirements-dev.in
```

`requirements.txt` is the runtime lock (used by the Docker image);
`requirements-dev.txt` adds the test stack. Because the locks pin the
3.9-resolved wheels, install them on Python 3.9.

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
25 tests covering health, full task CRUD, validation, and the status-transition
matrix (including several proven via deliberate source breakage — see
`Docs/Module3/debugging-log.md`).

## Verify

- Health check: <http://127.0.0.1:8000/health> → `{"status": "ok", "timestamp": "..."}`
- Swagger UI: <http://127.0.0.1:8000/docs>
- OpenAPI schema: <http://127.0.0.1:8000/openapi.json>
- Kanban board: <http://127.0.0.1:5500> — create, edit, delete, and drag tasks
  between To Do / In Progress / Done

```bash
curl -i http://127.0.0.1:8000/health
```

## Docker

Run the API as a container. The image is multi-stage, runs as a non-root
`app` user, and is API-only (the frontend is served separately):

```bash
docker build -t task-tracker:dev .
docker run --rm -d -p 8000:8000 --name tt-dev task-tracker:dev
curl -i http://127.0.0.1:8000/health   # -> 200 {"status": "ok", ...}
docker exec tt-dev whoami              # -> app
docker stop tt-dev
```

Based on `python:3.9-slim`. See `Docs/Module4/evidence/docker-security-log.md`
for the runtime and non-root verification.

## Continuous Integration

`.github/workflows/ci.yml` runs the test suite on every push and on pull
requests targeting `main`: it sets up Python 3.9, installs `requirements.txt`,
and runs `pytest -v`. A failing test fails the workflow — there is no
failure-masking (`continue-on-error`, `|| true`, `--exit-zero`).

## Technical Decisions

- [In-Memory Dict as the Task Storage Layer](Docs/decisions/in-memory-task-storage.md)

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
on restart), no pagination, no deployment automation, single process only.
(A local `Dockerfile` is provided for running the API in a container — see the
Docker section above — but there is no orchestration or deployment pipeline.)
These are explicitly out of scope for this course project; see
`Docs/adr-0001-stack.md` for the reasoning and the risk this carries as the
project grows.
