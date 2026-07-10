"""Tests for the Module 1 health endpoint."""

from datetime import datetime

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_returns_200_and_status_ok():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_health_timestamp_is_iso_utc():
    response = client.get("/health")
    timestamp = response.json()["timestamp"]
    # Must parse as ISO 8601 and carry timezone info (UTC).
    parsed = datetime.fromisoformat(timestamp)
    assert parsed.tzinfo is not None
