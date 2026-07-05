from fastapi import FastAPI, status

app = FastAPI(
    title="Task Tracker API",
    version="0.1.0",
    description="Minimal Module 1 skeleton for a future task-tracking REST API.",
)


@app.get("/health", status_code=status.HTTP_200_OK, tags=["System"])
def health_check() -> dict[str, str]:
    """Return service health for local verification."""
    return {"status": "ok"}
