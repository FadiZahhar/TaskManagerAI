# Reflection Log — Module 1

> Draft to edit in your own voice after you have run and tested the skeleton.

**Date:** 2026-07-06

**What I set out to do:** Produce reviewed user stories with acceptance criteria,
a one-paragraph ADR, and a minimal FastAPI skeleton that runs locally, serves
`GET /health` (HTTP 200), and exposes Swagger docs at `/docs`.

**What I built:** A small FastAPI app (`app/main.py`) with a single health route
and OpenAPI metadata, plus domain schemas (`app/schemas.py`) defining the Task
model and the `Status`/`Priority` enums for future CRUD. Added a pytest smoke
test for `/health` and a README with setup/run/verify steps.

**Decisions and trade-offs:** Kept routes to just `/health` to honour the "no
CRUD yet" scope, but defined the Task schema early so the data shape is agreed
before Module 2. Chose in-memory state (deferred) over any database to stay
minimal. Used `>=` version pins in `requirements.txt` for simplicity — worth
switching to exact pins later for reproducibility.

**How I verified it (fill in after running):**
- [ ] `uvicorn app.main:app --reload` starts without errors
- [ ] `GET /health` returns 200 and `{"status":"ok"}`
- [ ] `/docs` loads the Swagger UI
- [ ] `pytest` passes

**What I'd revisit / questions:** Whether `/health` should report more (e.g.
version, dependency checks); response codes to standardise for CRUD (201 vs 200,
404 shape); when to introduce persistence.

**Next module:** Wire the Task schema into CRUD routes (US-1 through US-5) with
in-memory storage and tests.
