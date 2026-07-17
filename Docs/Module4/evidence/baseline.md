# Module 4 Baseline

- **Date:** 2026-07-17
- **Repository:** TaskManagerAI (`github.com/FadiZahhar/TaskManagerAI`)
- **Branch:** `module-4-devops` (cut from `main`)
- **Commit SHA:** `e1cc640`
- **Python version:** 3.9 declared ([README.md:47-49](../../../README.md#L47-L49): "3.9+ … tested on 3.9.6"). **No pinned version file** exists. This baseline was run on **3.14.2** (local venv) — see caveat below.
- **Dependency installation command:** `python3 -m venv .venv && .venv/bin/python -m pip install -r requirements.txt`
- **Test command:** `pytest` ([pytest.ini](../../../pytest.ini) → `testpaths = tests`)
- **Test result:** PASS
- **Tests passed:** 25 / 25
- **Warnings:** 4 — Starlette deprecation warnings (version-drift artifacts on Python 3.14 / starlette 1.3.1; not present on the tested 3.9.6). One originates from application code: `HTTP_422_UNPROCESSABLE_ENTITY` at [app/main.py:64](../../../app/main.py#L64) (via `app/business_rules.py`).
- **Run command:** `uvicorn app.main:app` (documented command adds `--reload`; baseline run bound to `127.0.0.1:8000`)
- **Health URL:** `http://127.0.0.1:8000/health`
- **Health result:** `200 OK` → `{"status":"ok","timestamp":"2026-07-17T17:17:00.350640+00:00"}`
- **`/docs` loaded:** Yes — `GET /docs` → `200`, `GET /openapi.json` → `200` (Swagger UI served). **Visual browser view: NOT RUN** (verified via HTTP status only).
- **Pre-existing issues:** None blocking. Known gaps: (1) Python version is unpinned — CI/Docker will need an explicit choice; (2) baseline environment (3.14.2) differs from the repo's tested 3.9.6, which is the source of the 4 warnings.

## Routes confirmed live (from `/openapi.json`)

| Method | Path |
|---|---|
| GET | `/health` |
| POST | `/tasks` |
| GET | `/tasks` |
| GET | `/tasks/{task_id}` |
| PATCH | `/tasks/{task_id}` |
| DELETE | `/tasks/{task_id}` |

## Evidence provenance

Observed during Phase 0 execution on 2026-07-17:

- `python3 -m venv .venv` + `pip install -r requirements.txt` → fastapi 0.139.2, pydantic 2.13.4, starlette 1.3.1, httpx 0.28.1, uvicorn 0.51.0, pytest 9.1.1 (Python 3.14.2).
- `.venv/bin/python -m pytest -q` → `25 passed, 4 warnings`, exit code `0`.
- `curl -i http://127.0.0.1:8000/health` → `200`, body above.
- `curl -o /dev/null -w %{http_code}` on `/docs` and `/openapi.json` → `200`, `200`.

See [placeholder-values.md](../placeholder-values.md) for the full resolved-values sheet and repo-fit caveats.
