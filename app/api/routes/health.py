"""Health check route."""

from datetime import datetime, timezone

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(tags=["System"])


class HealthResponse(BaseModel):
    """Shape of the health check response (typed so it shows up in /docs)."""

    status: str
    timestamp: str


@router.get("/health", response_model=HealthResponse, summary="Health check")
def health() -> HealthResponse:
    """Report service liveness with the current UTC time in ISO 8601 format."""
    return HealthResponse(
        status="ok",
        timestamp=datetime.now(timezone.utc).isoformat(),
    )
