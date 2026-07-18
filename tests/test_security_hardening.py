"""Regression tests for the final-project security hardening.

Covers findings from Docs/final-ai-review.md:
- S1: explicit-null partial update corrupted required fields (200, then a later
  list/search 500). Explicit null on a non-nullable field is now rejected (422).
- S2: an explicit-null status bypassed the transition guard. Now rejected (422).
- S3: description/assignee were unbounded. Now length-capped (422 when over).

Nullable fields (assignee, due_date) still accept an explicit null to clear them.
"""

import pytest

from app.models import ASSIGNEE_MAX_LENGTH, DESCRIPTION_MAX_LENGTH


# --- S1: explicit null on a non-nullable field is rejected -------------------

@pytest.mark.parametrize("field", ["title", "description", "status", "priority"])
def test_patch_explicit_null_on_non_nullable_field_returns_422(client, created_task, field):
    response = client.patch(f"/tasks/{created_task['id']}", json={field: None})
    assert response.status_code == 422


def test_rejected_null_leaves_stored_task_intact_and_search_still_works(client, created_task):
    # The corrupting PATCH is refused...
    assert client.patch(f"/tasks/{created_task['id']}", json={"title": None}).status_code == 422
    # ...and the previously-crashing list/search path stays healthy (was 500).
    search = client.get("/tasks", params={"search": "fixture"})
    assert search.status_code == 200
    assert search.json()[0]["title"] == created_task["title"]  # unchanged


# --- S2: explicit-null status does not bypass the transition guard ------------

def test_null_status_does_not_bypass_transition_and_is_not_applied(client, created_task):
    assert created_task["status"] == "ToDo"
    assert client.patch(f"/tasks/{created_task['id']}", json={"status": None}).status_code == 422
    # Status is unchanged; no invalid null was persisted.
    assert client.get(f"/tasks/{created_task['id']}").json()["status"] == "ToDo"


# --- Nullable fields still accept an explicit null to clear them --------------

def test_patch_null_assignee_clears_it(client):
    tid = client.post("/tasks", json={"title": "t", "assignee": "Alice"}).json()["id"]
    response = client.patch(f"/tasks/{tid}", json={"assignee": None})
    assert response.status_code == 200
    assert response.json()["assignee"] is None


def test_patch_null_due_date_clears_it(client):
    tid = client.post("/tasks", json={"title": "t", "due_date": "2999-01-01"}).json()["id"]
    response = client.patch(f"/tasks/{tid}", json={"due_date": None})
    assert response.status_code == 200
    assert response.json()["due_date"] is None


# --- S3: description / assignee length bounds --------------------------------

def test_create_rejects_over_max_description(client):
    r = client.post("/tasks", json={"title": "t", "description": "a" * (DESCRIPTION_MAX_LENGTH + 1)})
    assert r.status_code == 422


def test_create_accepts_max_length_description(client):
    r = client.post("/tasks", json={"title": "t", "description": "a" * DESCRIPTION_MAX_LENGTH})
    assert r.status_code == 201


def test_create_rejects_over_max_assignee(client):
    r = client.post("/tasks", json={"title": "t", "assignee": "a" * (ASSIGNEE_MAX_LENGTH + 1)})
    assert r.status_code == 422


def test_create_accepts_max_length_assignee(client):
    r = client.post("/tasks", json={"title": "t", "assignee": "a" * ASSIGNEE_MAX_LENGTH})
    assert r.status_code == 201


def test_patch_rejects_over_max_description(client, created_task):
    r = client.patch(f"/tasks/{created_task['id']}", json={"description": "a" * (DESCRIPTION_MAX_LENGTH + 1)})
    assert r.status_code == 422


# --- Guard against over-correction: valid updates still succeed --------------

def test_valid_updates_still_succeed(client, created_task):
    assert client.patch(f"/tasks/{created_task['id']}", json={"title": "renamed"}).status_code == 200
    assert client.patch(f"/tasks/{created_task['id']}", json={"status": "InProgress"}).status_code == 200
    empty = client.patch(f"/tasks/{created_task['id']}", json={})
    assert empty.status_code == 200  # empty body is still a no-op, not a null-rejection
