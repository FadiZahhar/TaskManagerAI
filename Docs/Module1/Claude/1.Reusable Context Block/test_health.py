"""Smoke test for the Module 1 health endpoint."""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_returns_200():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_openapi_docs_available():
    # Swagger UI is served at /docs and should load.
    response = client.get("/docs")
    assert response.status_code == 200
