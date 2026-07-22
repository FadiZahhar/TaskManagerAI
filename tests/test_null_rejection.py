"""Regression tests for explicit-``null`` rejection on required request fields.

The reviewer-reported defect: ``title``, ``description``, ``status``, and
``priority`` accepted an explicit JSON ``null``. On update that silently
corrupted the stored task (and a ``null`` status also bypassed the
status-transition guard). These tests pin the fix:

* an explicit ``null`` for any of the four fields returns HTTP 422 (create and
  update);
* a rejected update does not modify the stored task;
* omitting a field in a partial update stays valid (it leaves the field
  unchanged);
* ``assignee`` and ``due_date`` are intentionally out of scope — an explicit
  ``null`` still clears them.

State is built through the public API and reset per test by the autouse
``_reset_storage`` fixture in ``conftest.py``.
"""

import pytest

# The four required fields that must reject an explicit JSON null.
NULL_REJECTED_FIELDS = ["title", "description", "status", "priority"]


@pytest.fixture
def full_task(client):
    """Create a task with every field populated and return its response body."""
    response = client.post(
        "/tasks",
        json={
            "title": "Original title",
            "description": "Original description",
            "status": "ToDo",
            "priority": "High",
            "assignee": "Alex",
            "due_date": "2026-01-01",
        },
    )
    assert response.status_code == 201
    return response.json()


@pytest.mark.parametrize("field", NULL_REJECTED_FIELDS)
def test_create_rejects_explicit_null(client, field):
    payload = {"title": "Valid title"}
    payload[field] = None

    response = client.post("/tasks", json=payload)

    assert response.status_code == 422
    # The rejected create must not have added a task to storage.
    listing = client.get("/tasks")
    assert listing.status_code == 200
    assert listing.json() == []


@pytest.mark.parametrize("field", NULL_REJECTED_FIELDS)
def test_update_rejects_explicit_null_without_modifying_task(client, full_task, field):
    original = client.get(f"/tasks/{full_task['id']}").json()

    response = client.patch(f"/tasks/{full_task['id']}", json={field: None})

    assert response.status_code == 422

    after = client.get(f"/tasks/{full_task['id']}").json()
    # The whole persisted representation is unchanged...
    assert after == original
    # ...including every meaningful field (spelled out for a clear failure).
    for key in (
        "title",
        "description",
        "status",
        "priority",
        "assignee",
        "due_date",
        "created_at",
        "updated_at",
    ):
        assert after[key] == original[key]


def test_update_omitted_fields_still_allowed(client, full_task):
    # A partial update that OMITS the four fields must still succeed and leave
    # them unchanged (this is the behavior explicit-null rejection preserves).
    response = client.patch(f"/tasks/{full_task['id']}", json={"assignee": "Bob"})

    assert response.status_code == 200
    body = response.json()
    assert body["assignee"] == "Bob"
    assert body["title"] == "Original title"
    assert body["description"] == "Original description"
    assert body["status"] == "ToDo"
    assert body["priority"] == "High"


def test_update_due_date_null_still_clears(client, full_task):
    # due_date is intentionally out of scope: an explicit null must still clear it.
    response = client.patch(f"/tasks/{full_task['id']}", json={"due_date": None})

    assert response.status_code == 200
    assert response.json()["due_date"] is None


def test_update_assignee_null_still_clears(client, full_task):
    # assignee is intentionally out of scope: an explicit null must still clear it.
    response = client.patch(f"/tasks/{full_task['id']}", json={"assignee": None})

    assert response.status_code == 200
    assert response.json()["assignee"] is None
