# Release Evidence

Concise, factual evidence for the final-project release. Commands were run and
observed on the operator's machine; results are summarized, not fabricated.

## Release identity

- Repository: `https://github.com/FadiZahhar/TaskManagerAI` (public)
- Source branch: `module-5-governance`
- Source commit: `46b62cd1ad945640b26c53fcf99cf8275deca7de`
- Final branch: `final-project`
- Verified release-candidate commit: `7065c9188a3f40515a6b4ee416aab0af08298025`
  (CI green — 60 passed)
- Verification date: 2026-07-18

## Scope control

- New product features added: **No**
- Authentication added: **No**
- Production database added: **No**
- Notifications added: **No**
- Comments added: **No**
- Unrelated UI changes added: **No**
- `app/` changes during final project: **None** (unchanged from source commit)
- `frontend/` changes during final project: **None** (unchanged from source commit)

## Baseline before final edits

### Tests

- Command: `.venv/bin/python -m pytest`
- Result: **PASS**
- Tests collected: 60
- Passed: 60
- Failed: 0
- Skipped: 0
- Pre-existing failures: None
- Environment: Python 3.9.6; 3 deprecation warnings (Starlette
  `HTTP_422_UNPROCESSABLE_ENTITY`), non-failing.

### Backend

- Run command: `.venv/bin/python -m uvicorn app.main:app --host 127.0.0.1 --port 8000`
- Health command: `curl -i http://127.0.0.1:8000/health`
- HTTP status: **200 OK**
- Response summary: `{"status":"ok","timestamp":"2026-07-18T00:26:55.800784+00:00"}`; `GET /tasks` → `200 []`
- Result: **PASS**

### Frontend

- Run/open command: `python3 -m http.server 5500 --directory frontend`
- Automated check: **PASS** — `GET /` → HTTP 200 (38019 bytes); served HTML
  contains the three status columns (`data-status="ToDo|InProgress|Done"`),
  `#new-task-btn`, `#task-modal`, `#filter-search`, and
  `API_BASE = "http://127.0.0.1:8000"`.
- Visual owner check: **PASS (owner-confirmed 2026-07-18)** — the owner opened
  <http://127.0.0.1:5500> and confirmed the three columns render, "New Task"
  creates a task, edit and delete-with-confirm work, and cards drag between
  columns. (No browser automation is installed; this is the owner's own
  observation.)
- Result: **PASS** (automated/static + owner visual)

## Final test verification

- Command: `.venv/bin/python -m pytest`
- Result: **PASS** (no `app/`, `frontend/`, or `tests/` change was made, so the
  baseline result stands; re-confirmed in the final verification matrix).
- Tests collected: 60
- Passed: 60
- Failed: 0
- Skipped: 0

## CI evidence

- Workflow file: `.github/workflows/ci.yml`
- Push trigger: **Yes** (`on: push`)
- Pull-request trigger: **Yes** (`on: pull_request`)
- Python version: `3.9` (consistent with README prerequisites and the Dockerfile
  base image)
- Dependency-install command: `pip install -r requirements.txt`
- Test command: `pytest -v` (real full suite)
- Shortcut scan: **Clean** — no `continue-on-error`, `|| true`, `--exit-zero`,
  skipped/commented pytest, or zero-test success; least-privilege
  `permissions: contents: read` and a 10-minute timeout are set.
- Latest run result: **PASS (success)** — `60 passed, 3 warnings` on GitHub
  Actions (ubuntu-latest, Python 3.9); every step (checkout, setup-python,
  install dependencies, Run tests) succeeded. Confirmed the suite collected and
  ran 60 tests (not a zero-test success).
- Latest run link: <https://github.com/FadiZahhar/TaskManagerAI/actions/runs/29623937262> (run id 29623937262)
- Verified commit: `7065c9188a3f40515a6b4ee416aab0af08298025`
- Note: the follow-up commit that records this CI evidence is documentation-only
  and does not change the test surface; the release-candidate commit above is
  the code/infra commit CI validated green.

## Docker evidence

- Dockerfile: multi-stage `python:3.9-slim` (builder + runtime); base image
  pinned (not `latest`)
- `.dockerignore`: excludes `.git`, `.github`, `.venv`, caches, `.env`/`.env.*`,
  `tests`, `frontend`, `Docs`, `*.md`, and `Dockerfile`/`.dockerignore`
- Image tag: `task-tracker:final` (273 MB)
- Build command: `docker build --no-cache -t task-tracker:final .`
- Build result: **PASS** (exit 0)
- Run command: `docker run -d --name task-tracker-final -p 8000:8000 task-tracker:final`
- Container state: **Up**, `0.0.0.0:8000->8000/tcp`
- Health command: `curl -i http://127.0.0.1:8000/health`
- Health HTTP status: **200 OK**
- Health response summary: `{"status":"ok","timestamp":"2026-07-18T00:32:50.301065+00:00"}`
- Runtime user: **`app` uid=10001 gid=10001 (non-root)** (`docker exec … id`)
- Reload-mode check: **Clean** — `CMD ["uvicorn","app.main:app","--host","0.0.0.0","--port","8000"]`, no `--reload`
- Build-context secret check: **Clean** — no `.env`, credentials, keys, logs, or
  personal data in the context; `.dockerignore` excludes local/secret paths
- Result: **PASS**

## Documentation claim-vs-reality log

| ID | Claim checked | Evidence used | Actual result | Classification | Change made |
|---|---|---|---|---|---|
| D1 | README: "full suite (60 tests)" | `.venv/bin/python -m pytest` → `60 passed` | Exactly 60 tests, all passing | Accurate | None |
| D2 | README/health: `GET /health` → `200 {"status":"ok","timestamp":...}` | `curl -i` against running backend | 200 with the documented JSON shape | Accurate | None |
| D3 | README Final Project: "Docker image builds and runs as a non-root user, with `/health` returning HTTP 200" | `docker build`, `docker run`, `docker exec … id`, `curl` | Build OK; container Up; user `app` uid 10001; `/health` 200 | Accurate | None |
| D4 | AGENTS.md/README: container command has no `--reload` | `docker inspect … .Config.Cmd` | CMD has no `--reload` | Accurate | None |
| D5 | README Known limitations: "no Docker/deployment configuration" | Repository now adds `Dockerfile` + `.github/workflows/ci.yml` | The old text was outdated for this branch | Inaccurate | Corrected the limitation to "no production deployment/hosting; a local Docker build and CI are provided" |

## Repository hygiene

- Current-tree secret scan: **Clean** (conservative git-aware scan; `gitleaks`
  not installed — noted as a limitation)
- Git-history secret scan: **Clean** — no `.env`/key material found anywhere in
  history
- `.env` tracked: **No**
- Credentials/private keys tracked: **No**
- Production logs tracked: **No**
- Personal/customer data found: **No**
- Remaining blocker: **None**
- Note: `CLAUDE_FINAL_PROJECT_AUTOPILOT.md` is untracked operator input and is
  intentionally not committed (per its own instructions); it contains no secrets.

## Final release result

- Local tests: **PASS** (60 passed, Python 3.9.6)
- Backend health: **PASS** (HTTP 200)
- Frontend automated check: **PASS** (static/DOM markers)
- Frontend owner visual check: **PASS** (owner-confirmed 2026-07-18 — board
  renders; create/edit/drag/delete work)
- CI: **PASS (green)** — run 29623937262, 60 passed (GitHub Actions, Python 3.9)
- Docker build: **PASS**
- Docker health: **PASS** (HTTP 200, non-root)
- Repository hygiene: **PASS (clean)**
- Remaining known limitations (documented course scope): no authentication, no
  persistent database (in-memory, reset on restart), no pagination/resource
  bounds, single process; `pip-audit`/CVE scan not run. Security findings S1–S4
  are owned, documented backlog items (see `Docs/final-ai-review.md`).
- Owner validation: **complete (2026-07-18)** — frontend visual PASS, public
  repository/branch confirmed, all AI code-review and security grades confirmed,
  ownership statement approved.
- Verified release-candidate commit: `7065c9188a3f40515a6b4ee416aab0af08298025`
- Technical status: **READY FOR SUBMISSION**
