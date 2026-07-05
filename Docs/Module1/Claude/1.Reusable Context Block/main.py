"""
Task Tracker API — application entrypoint.

Module 1 scope: this app intentionally exposes ONLY a health check.
CRUD routes for tasks arrive in a later module. The domain models that
those routes will use are defined in `app/schemas.py` but are not wired
to any endpoint yet.
"""

from fastapi import FastAPI

app = FastAPI(
    title="Task Tracker API",
    description=(
        "A minimal Task Tracker REST API. "
        "Module 1 exposes only a health check; task CRUD arrives in later modules."
    ),
    version="0.1.0",
)


@app.get("/health", tags=["System"], summary="Health check")
def health() -> dict[str, str]:
    """Report service liveness.

    Returns HTTP 200 with a small JSON body. Used for local smoke tests
    and, later, CI/CD readiness checks.
    """
    return {"status": "ok"}
