# ADR-0001: Module 1 stack and scope

**Status:** Accepted · **Date:** 2026-07-06

For Module 1 we will build the Task Tracker as a Python 3.11+ service using
FastAPI for the web layer, Pydantic for request/response models and enum-based
validation of the `status` and `priority` fields, and Uvicorn as the local ASGI
server; we choose FastAPI because it gives us automatic OpenAPI/Swagger docs at
`/docs` for free, first-class Pydantic validation, and a low-ceremony path to a
runnable skeleton, and we deliberately defer authentication, user accounts, an
external database, Docker, cloud deployment, a frontend, and full CRUD to later
modules so this module stays a minimal, verifiable foundation exposing only a
`GET /health` check, with in-memory state to be introduced alongside CRUD when
that work begins. The main trade-off we accept is that nothing is persisted or
secured yet, which is appropriate for a local learning skeleton and revisited in
subsequent ADRs as scope grows.
