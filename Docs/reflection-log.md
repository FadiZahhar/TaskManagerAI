# Reflection Log — Module 1

## Activity 1: Reviewed user stories

- **What AI got right:** The Given/When/Then acceptance criteria were specific
  and testable (e.g. distinguishing HTTP 422 for invalid values vs 409 for
  illegal status transitions in US-8), which made them directly usable as a
  Module 2 test plan.
- **What I corrected:** The first draft included the health check as a formal
  product user story (US-0). I removed it — a liveness check is an
  operational concern, not a user-facing capability — and folded it into the
  skeleton's scope notes instead, leaving 8 clean product stories.
- **Assumption AI made:** AI assumed a `Done` task's non-status fields should
  stay editable once the transition is locked. I flagged this as an open
  design decision to confirm rather than accepting it silently.

## Activity 2: Architecture Decision Record

- **What AI got right:** The comparison between in-memory, JSON-file, and
  SQLite/SQLModel storage correctly identified that persistence work would be
  premature for a health-check-only skeleton.
- **What I corrected:** The original one-paragraph draft explained what was
  *deferred* (auth, database, Docker) but never explained what was *rejected
  and why*. I rewrote it to explicitly name the two rejected alternatives and
  the reasoning, and to state one concrete risk (in-memory data loss on
  restart) instead of a vague "revisited later" line.
- **Assumption AI made:** AI assumed FastAPI's benefits (auto docs, Pydantic
  validation) were self-evidently worth the choice without weighing them
  against the alternatives it had just laid out — the ADR now makes that
  comparison explicit.

## Activity 3: FastAPI skeleton build and verification

- **What AI got right:** The `/health` route itself was correct — a typed
  Pydantic response model with an ISO 8601 UTC timestamp, registered through
  an `APIRouter` rather than defined inline, which is good structure for a
  project that will add more routers later.
- **What I corrected:** This was the most significant fix. The generated
  `main.py` imported `from app.api.routes import health`, but the files had
  been left as loose modules at the project root with no `app/` package to
  import from — the app could not start. I moved everything into a real
  `app/api/routes/` package, added a `tests/` package, installed the pinned
  dependencies into a virtualenv (previously never installed), and added a
  `pytest.ini` scoping test collection to `tests/` because pytest was
  otherwise colliding on duplicate `test_health.py` files left in the
  `Docs/Module1/` exploration folders.
- **Assumption AI made:** AI assumed that because the code *looked* complete
  and the README described a working structure, the skeleton had actually
  been run and verified. It hadn't — the previous reflection log was still an
  unfilled template with unchecked verification boxes. I only marked this
  activity complete after actually running `uvicorn`, confirming `GET
  /health` returns 200, confirming `/docs` returns 200, and confirming
  `pytest` passes (2/2).

## Verification performed

- [x] `uvicorn app.main:app --reload` starts without errors
- [x] `GET /health` returns 200 and `{"status":"ok","timestamp":"..."}`
- [x] `/docs` loads the Swagger UI (HTTP 200)
- [x] `pytest` passes (2 passed)

## What I'd revisit / questions

Whether `/health` should report more (e.g. version, dependency checks);
response codes to standardize for CRUD (201 vs 200, 404 shape); when to
introduce persistence (see ADR risk).

## Next module

Wire the Task schema into CRUD routes (US-1 through US-8) with in-memory
storage and tests, including the status-transition validation from US-8.
