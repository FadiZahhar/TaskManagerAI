# Module 4 — Repo-Specific Placeholder Values

Resolves every `<PLACEHOLDER>` in [step_by_step_guide.md](step_by_step_guide.md) to its
actual value in **this** repository, with the source file that proves it. Use this as the
substitution sheet when running the guide.

> **Provenance:** Produced by a read-only repository audit on 2026-07-17.
> Repo `main` @ commit `8b6248c`. Values below are verified against the files cited;
> anything not provable from a repo file is marked explicitly.

---

## 1. Guide §3 placeholders

| Placeholder | Value for this repo | Source / evidence |
|---|---|---|
| `<DEFAULT_BRANCH>` | `main` | `git branch --show-current`; `origin/HEAD -> origin/main` |
| `<MODULE_BRANCH>` | `module-4-devops` (to be created — does not exist yet) | `git branch -a`. ⚠ See §5 governance caveat |
| `<REPO_URL>` | `https://github.com/FadiZahhar/TaskManagerAI.git` | `git remote get-url origin` |
| `<PYTHON_VERSION>` | **`3.9`** (README: "3.9+ … tested on 3.9.6"). No pinned version file exists. | [README.md:47-49](../../README.md#L47-L49). ⚠ See §5 |
| `<TEST_COMMAND>` | `pytest` (discovers `tests/`) | [pytest.ini](../../pytest.ini) (`testpaths = tests`) |
| `<RUN_COMMAND>` | `uvicorn app.main:app --reload` (serves `http://127.0.0.1:8000`) | [README.md:58-60](../../README.md#L58-L60). Guide's `--port 8000` is equivalent (8000 is the default) |
| `<REQUIREMENTS_FILE>` | `requirements.txt` (single file — includes test deps) | [requirements.txt](../../requirements.txt). No `requirements-dev.txt` exists |
| `<DECISION_SLUG>` | `in-memory-task-storage` (valid topic) | [app/storage.py:9](../../app/storage.py#L9) (`_tasks: dict[str, TaskResponse] = {}`) |

## 2. Other placeholders used in the guide body

| Placeholder | Value for this repo | Notes |
|---|---|---|
| `<INTENTIONALLY_CHANGED_TEST_FILE>` (Phase 2 break test) | `tests/test_tasks.py` (or `tests/test_health.py`) | Pick one assertion to flip. Requires your approval before mutating |
| `<RUN_ID>`, `<COMMIT_SHA>`, `<RUN_URL>` | runtime values — no static answer | Fill from GitHub Actions / `git` at execution time |
| `<INSERT DECISION TOPIC>` (P18) | e.g. "In-Memory Dict as the Task Storage Layer" | Matches the recommended slug above |

## 3. Verified repository facts (what the guide tells you to confirm)

**Entry point / layout**
- FastAPI app object: `app` in [app/main.py:18](../../app/main.py#L18) (`app.main:app`).
- Schemas/models: [app/models.py](../../app/models.py) (no separate `schemas.py`).
- Status-transition rule enforced in [app/business_rules.py](../../app/business_rules.py), called from `patch_task` at [app/main.py:64](../../app/main.py#L64).
- Storage: module-level in-memory dict, [app/storage.py:9](../../app/storage.py#L9).
- **Health handler lives in [app/api/routes/health.py:18](../../app/api/routes/health.py#L18)**, not `main.py`; it is `include_router`-ed at [app/main.py:37](../../app/main.py#L37).

**Routes & status codes** (source: [app/main.py](../../app/main.py), [app/api/routes/health.py](../../app/api/routes/health.py))

| Method | Path | Success | Errors | Handler |
|---|---|---|---|---|
| GET | `/health` | 200 | — | `health` (router) |
| POST | `/tasks` | **201** | 422 validation | `create_task` |
| GET | `/tasks` | 200 | 422 (bad `status`/`priority` query enum) | `list_tasks` (filters: `status`, `priority`) |
| GET | `/tasks/{id}` | 200 | 404 | `get_task` |
| PATCH | `/tasks/{id}` | 200 | 404, **422** invalid transition | `patch_task` |
| DELETE | `/tasks/{id}` | **204** | 404 | `delete_task` |

**Domain values** ([app/models.py:10-19](../../app/models.py#L10-L19))
- `TaskStatus`: `ToDo`, `InProgress`, `Done`
- `TaskPriority`: `Low`, `Medium`, `High`
- Models use `extra="forbid"` → unknown fields → 422. Blank/`>200`-char title → 422.

**Allowed status transitions** ([app/business_rules.py:7-11](../../app/business_rules.py#L7-L11))
- `ToDo → InProgress`, `InProgress → Done`, `Done → InProgress`.
- Same-status and everything else → **HTTP 422** (`app`-level, not just Pydantic).

**Health contract** ([app/api/routes/health.py:11-24](../../app/api/routes/health.py#L11-L24))
- `200` → `{"status": "ok", "timestamp": "<ISO-8601 UTC>"}`.

**CORS / ports** ([app/main.py:30-35](../../app/main.py#L30-L35), [README.md:53-72](../../README.md#L53-L72))
- Backend: `http://127.0.0.1:8000`. Frontend: `http://127.0.0.1:5500` (served separately via `python3 -m http.server 5500 --directory frontend`).
- `allow_origins`: `http://127.0.0.1:5500`, `http://localhost:5500`. `allow_methods`: GET, POST, PATCH, DELETE. `allow_headers`: `Content-Type`.
- The FastAPI app does **not** serve the frontend (no `StaticFiles` mount).

## 4. Live baseline evidence (observed this audit)

- **Command:** `.venv/bin/python -m pytest -v`
- **Result:** `25 passed, 4 warnings`, exit code `0`.
- **Test count:** 25 (2 in `test_health.py`, 23 in `test_tasks.py`) — matches [README.md:79](../../README.md#L79).
- **Environment (as run):** Python **3.14.2**; fastapi 0.139.2, pydantic 2.13.4, starlette 1.3.1, httpx 0.28.1, pytest 9.1.1.
- **Warnings (version-drift artifacts, not present on the repo's tested 3.9.6):**
  1. `StarletteDeprecationWarning: Using httpx with starlette.testclient is deprecated` (FastAPI TestClient).
  2. `StarletteDeprecationWarning: 'HTTP_422_UNPROCESSABLE_ENTITY' is deprecated` — fires from [app/main.py:64](../../app/main.py#L64) via `app/business_rules.py`.
- **Not run:** deliberate green→red→green break check (Phase 2), live `curl`/browser `/docs`, Docker — all require separate approval / a browser.

## 5. Caveats & open items

1. **Python version has no authoritative pin.** The only evidence is README prose (`3.9+`, tested `3.9.6`); there is no `.python-version`, `pyproject.toml`, `setup.cfg`, or `runtime.txt`. Phase 2 (CI) and Phase 3 (Docker) demand an "exact version confirmed by repository evidence" — the defensible pin is **3.9**, not the guide's `3.11` example. Running on 3.14 (as this audit did) produces the warnings in §4.
2. **`docs/` vs `Docs/` case collision.** The guide writes evidence to lowercase `docs/…`; this repo's tracked directory is capital `Docs/`. Same directory on case-insensitive macOS, **different** on case-sensitive Linux/CI. This sheet lives in `Docs/Module4/` to match the real repo. Prefer `Docs/` consistently, or the guide-writer should reconcile.
3. **Two independent tracks (not a conflict).** [CLAUDE.md](../../CLAUDE.md) and [AGENTS.md](../../AGENTS.md) govern a **standalone** mid-course project (due dates + search on the `mid-course-project` branch), which is **unrelated to Module 4**. Module 4 proceeds from the Module 3 state on `main`; branch `module-4-devops` from `main`.
4. **`requirements.txt` mixes runtime + test deps** (`pytest`, `httpx` alongside `fastapi`/`uvicorn`). A Docker runtime image built from it will install test libraries even though `.dockerignore` excludes `tests/`.
