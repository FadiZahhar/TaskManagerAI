"""Task Tracker API — application entrypoint (Module 1).

Only a health check is wired up here. Task CRUD, storage, and models are
intentionally left for later modules. Routes are registered from router
modules rather than defined inline.
"""

from fastapi import FastAPI

from app.api.routes import health

app = FastAPI(
    title="Task Tracker API",
    description=(
        "Minimal Module 1 skeleton. Exposes a health check and Swagger docs; "
        "task CRUD arrives in later modules."
    ),
    version="0.1.0",
)

app.include_router(health.router)
