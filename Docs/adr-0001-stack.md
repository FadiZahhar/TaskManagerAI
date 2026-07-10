# ADR-0001: Module 1 stack and scope

**Status:** Accepted · **Date:** 2026-07-10

For Module 1 I chose FastAPI (with Pydantic models and Uvicorn as the local
ASGI server) over the two alternatives I considered — a JSON-file-backed
store and SQLite via SQLModel — because a health-check-only skeleton has no
persistence needs yet, and both alternatives would have solved a problem the
project doesn't have this early: JSON-file storage was rejected because it
introduces file I/O, path handling, and test-isolation cleanup for zero
benefit at this stage, and SQLite/SQLModel was rejected as premature because
it adds schema/session/migration ceremony before there is a single field to
persist; I also rejected the assumption that Module 1 needs any task storage
at all, since the module's actual deliverable is a runnable service boundary
(`GET /health`, `/docs`), not the product. FastAPI wins here because it gives
automatic OpenAPI/Swagger docs, first-class Pydantic validation, and a
low-ceremony path to a runnable skeleton, so it can grow into an in-memory
repository for CRUD in Module 2 without today's code needing to change. The
risk I'm accepting and will need to revisit as the project grows: once
in-memory task storage is introduced, all data is lost on every restart and
there is no concurrency safety across requests — this is fine for a local
learning skeleton but must be replaced with SQLite/SQLModel (or another
persistent store) before the project has any real users or needs to survive a
deploy.
