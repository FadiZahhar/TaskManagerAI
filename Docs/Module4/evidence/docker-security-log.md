# Docker Security and Runtime Verification Log

> All results below were **directly observed** during Phase 3 on 2026-07-17
> (Docker Engine 29.1.2), branch `module-4-devops`.

## Image

- **Tag:** `task-tracker:dev`
- **Build command:** `docker build -t task-tracker:dev .`
- **Build result:** Success.
- **Runtime base:** `python:3.9-slim` → Python **3.9.25**, Debian GNU/Linux 13 (trixie) slim. Explicit slim tag; **no `latest`**.
- **Image size:** 255 MB disk usage / 55.3 MB content size (after the R1 runtime/dev
  dependency split; was 274 MB / 59.1 MB when test deps were bundled).
- **Design:** multi-stage — `builder` installs deps with `pip --prefix=/install`; `runtime` copies `/install` → `/usr/local` and `app/` only.

## Non-root user

- **Command:** `docker exec tt-dev whoami`
- **Result:** `app`
- **Expected:** `app`
- **`id`:** `uid=10001(app) gid=10001(app) groups=10001(app)`
- **Pass/Fail:** **PASS**

## Runtime behavior

- **Run command:** `docker run --rm -d -p 8000:8000 --name tt-dev task-tracker:dev`
- **Health command:** `curl -i http://127.0.0.1:8000/health`
- **Health status:** `200 OK`
- **Health body:** `{"status":"ok","timestamp":"2026-07-17T19:12:34.567218+00:00"}`
- **`/docs`:** `200` (Swagger served)
- **Container stayed running:** Yes (`Up`, uvicorn log: "Application startup complete", "Uvicorn running on http://0.0.0.0:8000")

## No baked secrets

Reviewed: `Dockerfile`, `.dockerignore`. Image filesystem inspected via `docker exec`.

Confirmed **absent** from the image (`/app`):

- `.env` and variants: absent
- `.git`: absent
- virtual environments (`.venv`): absent (in `.dockerignore`)
- caches (`__pycache__`, `.pytest_cache`): excluded by `.dockerignore`
- build artifacts (`dist`, `build`): excluded
- `tests/`: absent (not copied; also in `.dockerignore`)
- `frontend/`: absent (app does not serve it — API-only image)
- `Docs/`: absent
- credentials/tokens: none present in build context or Dockerfile

Image `/app` contains only the `app/` package (`main.py`, `models.py`, `storage.py`, `business_rules.py`, `api/routes/health.py`, `__init__.py`s).

## Production-like command

- **Host:** `0.0.0.0`
- **Port:** `8000`
- **`--reload` absent:** Yes
- **`USER app` before `CMD`:** Yes (`USER app` then `CMD ["uvicorn", ...]`)

## Remaining risks or limitations

- **Test deps in runtime image — RESOLVED (R1).** `requirements.txt` is now runtime-only; test deps moved to `requirements-dev.txt`. Verified in the rebuilt image: `import pytest` and `import httpx` → `ModuleNotFoundError`, while `fastapi`/`uvicorn` import fine and `/health` still returns 200. Image shrank to 255 MB / 55.3 MB.
- **Patch version drift.** `python:3.9-slim` provides Python **3.9.25**; the repo README says "tested on 3.9.6". Same minor line (3.9), newer patch.
- **No image vulnerability scan** was run (out of scope for this phase).
