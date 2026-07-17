# Claude Code Project Instructions

Read and follow `AGENTS.md` before every change.

This repository is being prepared for the mandatory mid-course Task Tracker checkpoint. The assessed skill is the human-owned AI-assisted workflow, not raw feature volume.

## Persistent priorities

- Inspect the real repository and tests before making assumptions.
- Work only on `mid-course-project`.
- Implement exactly two scoped features: due dates/overdue filtering and search/combined filters, unless the repository audit proves a material conflict and the user approves a revision.
- Work in small phases. Plan first for multi-file or contract changes.
- Keep diffs focused; do not rewrite whole files or add dependencies without approval.
- Preserve existing behavior from Modules 1–3.
- Use the backend as the source of truth.
- Run targeted tests, then the full suite at milestones.
- Record browser-only work as `NOT RUN` unless actually observed.
- Update `docs/midcourse/` from observed evidence.
- Never fabricate results.
- Do not commit, push, open a pull request, or mutate correct source for a Break Test without explicit user authorization.

Before implementation, read:

- `docs/midcourse/user-stories.md`
- `docs/midcourse/mini-adr.md`
- `docs/midcourse/behavior-contract.md`
- the current phase in `docs/midcourse/claude-prompts.md`

After each phase, use the handoff format required by `AGENTS.md` and stop.

---

## Task Tracker — Project Reference (Module 4 project memory)

> Added for Module 4 (DevOps). Project facts verified against source files on 2026-07-17.
> This reference is track-neutral; the mid-course rules above still govern the `mid-course-project` track. Module 4 is driven by `Docs/Module4/step_by_step_guide.md`.

### Project Purpose

A minimal FastAPI task-tracking API with a vanilla HTML/CSS/JS Kanban frontend, built across Modules 1–3: health-check skeleton (M1), task CRUD + status-transition rules (M2), and a drag-and-drop Kanban board (M3). In-memory only; no database, no auth. (`README.md`)

### Technology Stack

- Python: **3.9** declared (`README.md` — "3.9+ … tested on 3.9.6"); **no pinned version file** exists.
- FastAPI, Pydantic **v2** (`app/models.py` uses `ConfigDict`/`field_validator`), Uvicorn, pytest, httpx (backs the test client). (`requirements.txt`)
- Frontend: single static file `frontend/index.html`, served separately — **not** by FastAPI.

### Setup / Run / Test

```bash
# setup
python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements-dev.txt
# run backend  -> http://127.0.0.1:8000
uvicorn app.main:app --reload
# run frontend -> http://127.0.0.1:5500
python3 -m http.server 5500 --directory frontend
# test
pytest
```

(`README.md`; `pytest.ini` → `testpaths = tests`)

### Repository Architecture

- `app/main.py` — FastAPI app, CORS, task routes (`/tasks` CRUD).
- `app/models.py` — `TaskStatus`/`TaskPriority` enums; `TaskCreate`/`TaskUpdate`/`TaskResponse` (all `extra="forbid"`).
- `app/storage.py` — in-memory `_tasks: dict` + CRUD helpers; `_reset()` for tests.
- `app/business_rules.py` — `validate_status_transition`.
- `app/api/routes/health.py` — `GET /health` (APIRouter, included in `main.py`).
- `frontend/index.html` — Kanban UI (calls the API at `http://127.0.0.1:8000`).
- `tests/` — `test_health.py`, `test_tasks.py`, `conftest.py` (autouse storage reset).

### API and Business Rules

- **Statuses:** `ToDo`, `InProgress`, `Done`. **Priorities:** `Low`, `Medium`, `High`. (`app/models.py`)
- **Allowed transitions:** `ToDo→InProgress`, `InProgress→Done`, `Done→InProgress`. (`app/business_rules.py`)
- **Disallowed:** everything else, including same→same and unknown values → **HTTP 422** with a detail listing allowed transitions.
- **Invalid update / validation:** unknown fields, blank / >200-char title, bad enum → **422** (Pydantic).
- **Missing task:** `GET`/`PATCH`/`DELETE` on an unknown id → **404** with `detail`.
- **Success codes:** `POST /tasks` → **201**; `GET` → **200**; `PATCH` → **200**; `DELETE` → **204** (no body).
- **Filters:** `GET /tasks?status=&priority=` (in-memory filter in `app/storage.get_all_tasks`).

### UI States

Kanban board with **To Do / In Progress / Done** columns; drag-and-drop to change status (rejected transitions recovered); create/edit modal; delete with confirmation; priority/status color coding. (`README.md`, `frontend/index.html`)

### CORS and Local Development

- Backend `http://127.0.0.1:8000`; frontend `http://127.0.0.1:5500`.
- `allow_origins`: `http://127.0.0.1:5500`, `http://localhost:5500`; `allow_methods`: GET, POST, PATCH, DELETE; `allow_headers`: `Content-Type`. (`app/main.py`)

### Do-Not Rules (project-level)

- No authentication, no database, no deployment automation, no unrelated UI changes, no secrets.
- Do not change business rules (statuses, transitions, status codes) without explicit approval.
- Do not commit or push without explicit approval.
- Never mask test failures (`continue-on-error`, `|| true`, `--exit-zero`).

### Verification Expectations

- Inspect source before editing; plan first for multi-file or contract changes.
- Read the diff before accepting; run `pytest` after changes.
- Record browser-only checks as `NOT RUN` unless actually observed.
