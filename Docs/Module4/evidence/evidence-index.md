# Module 4 Evidence Index

Branch `module-4-devops` (base `main` @ `e1cc640`). Final integration audit: 2026-07-17.

## Baseline
- [Baseline](baseline.md)

## Claude Code setup
- `CLAUDE.md` — "Task Tracker — Project Reference" section (project memory)
- [Claude verification](claude-verification.md) — two answers verified (status transitions, routes/codes)

## CI
- `.github/workflows/ci.yml`
- [Green → red → green evidence](ci-green-red-green.md) — **CI run URLs pending observation** (no `gh` in agent env)

## Docker
- `Dockerfile` (multi-stage, non-root `app`)
- `.dockerignore`
- [Docker security log](docker-security-log.md)

## Documentation
- `README.md` (Docker + CI + Technical Decisions sections added)
- Verified docstrings under `app/` (behavior-neutral)
- [Claim-vs-reality log](claim-vs-reality.md)

## AI-assisted review
- [Annotated AI review log](ai-review-log.md) — 8 findings classified Useful/Noise/Wrong + 3 human-only

## Technical decision and reflection
- [Technical decision note](../../decisions/in-memory-task-storage.md)
- [Tool-fit reflection](tool-fit-reflection.md) — *reflection/voice sections are drafts to rewrite*

## Final verification (observed 2026-07-17)

| Check | Result |
|---|---|
| Final local test result | `pytest` → **25 passed**, exit 0 |
| Final CI run | **green** — `module-4-devops` @ `56f8c92`, run [29613887663](https://github.com/FadiZahhar/TaskManagerAI/actions/runs/29613887663) (observed via the Actions API); green→red→green proof in `ci-green-red-green.md` |
| Final Docker build | `docker build --no-cache -t task-tracker:final .` → **success** |
| Final Docker health | `curl /health` → **200** `{"status":"ok",...}` |
| Final Docker user | `whoami` → **`app`** (uid 10001) |
| Final image size | 274 MB disk / 59.1 MB content |
| Repository hygiene | no secrets / `.venv` / caches tracked; `.env`/`.git`/`tests`/`frontend` absent from image |
| CI-verified commit | `56f8c92` (full hashed lockfile + CI URLs) — its CI run is green |

## Open follow-ups (from the review)
- **R1 — RESOLVED.** Runtime/dev requirements split (`requirements-dev.txt`); the image no longer installs `pytest`/`httpx` (255/55.3 MB, down from 274/59.1). Verified by `import pytest` → ModuleNotFoundError + `/health` 200.
- **R2 — RESOLVED (full lockfile).** `pip-tools` hashed lockfile: `requirements.in`/`requirements-dev.in` → `pip-compile --generate-hashes` on Python 3.9 → fully-pinned, hashed `requirements.txt` (all transitive deps) + `requirements-dev.txt`. Verified on a 3.9 container (25 passed) + hashed runtime image build.
- **Voice** — reflection paragraphs in the decision note and tool-fit reflection are drafts to rewrite in your own words.
- **CI URLs** — DONE: real run URLs recorded in `ci-green-red-green.md` (green `f85d58d`, red `0d49f19`, green `41e06a0`; latest `56f8c92` green).
