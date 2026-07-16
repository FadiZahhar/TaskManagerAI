"""Feature 1 — due dates + overdue filtering (mid-course).

Deterministic dates: every date is computed relative to the same UTC "today" the
application uses (``datetime.now(timezone.utc).date()`` — see
``app.models.TaskResponse.overdue``), so these tests need no frozen clock and no
new dependency. State is built through the public API and reset per test by the
autouse ``_reset_storage`` fixture in ``conftest.py``.
"""

from datetime import date, datetime, timedelta, timezone

from app.models import TaskStatus, is_overdue


def _today() -> date:
    return datetime.now(timezone.utc).date()


def _iso(offset_days: int) -> str:
    return (_today() + timedelta(days=offset_days)).isoformat()


# --- create with / without a due date -------------------------------------

def test_create_task_with_valid_due_date_returns_201_and_echoes_iso(client):
    due = _iso(7)
    response = client.post("/tasks", json={"title": "Ship it", "due_date": due})
    assert response.status_code == 201
    body = response.json()
    assert body["due_date"] == due
    assert body["overdue"] is False


def test_create_task_without_due_date_defaults_null_and_not_overdue(client):
    response = client.post("/tasks", json={"title": "No date"})
    assert response.status_code == 201
    body = response.json()
    assert body["due_date"] is None
    assert body["overdue"] is False


def test_create_task_invalid_due_date_month_returns_422(client):
    response = client.post("/tasks", json={"title": "Bad", "due_date": "2026-13-40"})
    assert response.status_code == 422


def test_create_task_non_date_due_date_returns_422(client):
    response = client.post("/tasks", json={"title": "Bad", "due_date": "not-a-date"})
    assert response.status_code == 422


# --- update and clear -----------------------------------------------------

def test_update_sets_due_date_persists_and_keeps_other_fields(client, created_task):
    due = _iso(3)
    response = client.patch(f"/tasks/{created_task['id']}", json={"due_date": due})
    assert response.status_code == 200
    body = response.json()
    assert body["due_date"] == due
    assert body["title"] == created_task["title"]
    assert body["status"] == created_task["status"]
    assert body["priority"] == created_task["priority"]
    assert body["assignee"] == created_task["assignee"]


def test_update_clears_due_date_via_null_keeps_other_fields(client):
    created = client.post("/tasks", json={"title": "Has date", "due_date": _iso(5)}).json()
    assert created["due_date"] is not None
    response = client.patch(f"/tasks/{created['id']}", json={"due_date": None})
    assert response.status_code == 200
    body = response.json()
    assert body["due_date"] is None
    assert body["title"] == "Has date"
    assert body["overdue"] is False


# --- overdue predicate semantics (via the API) ----------------------------

def test_past_due_incomplete_task_is_overdue(client):
    body = client.post("/tasks", json={"title": "Late", "due_date": _iso(-1)}).json()
    assert body["overdue"] is True


def test_due_today_is_not_overdue(client):
    body = client.post("/tasks", json={"title": "Today", "due_date": _iso(0)}).json()
    assert body["overdue"] is False


def test_completed_past_due_is_not_overdue(client):
    body = client.post(
        "/tasks",
        json={"title": "Done late", "due_date": _iso(-2), "status": "Done"},
    ).json()
    assert body["overdue"] is False


def test_inprogress_past_due_is_overdue(client):
    body = client.post(
        "/tasks",
        json={"title": "WIP late", "due_date": _iso(-3), "status": "InProgress"},
    ).json()
    assert body["overdue"] is True


# --- overdue filtering on GET /tasks --------------------------------------

def test_overdue_filter_returns_only_past_due_incomplete(client):
    late = client.post("/tasks", json={"title": "late todo", "due_date": _iso(-1)}).json()
    client.post("/tasks", json={"title": "due today", "due_date": _iso(0)})
    client.post("/tasks", json={"title": "future", "due_date": _iso(2)})
    client.post("/tasks", json={"title": "done late", "due_date": _iso(-1), "status": "Done"})

    response = client.get("/tasks", params={"overdue": "true"})
    assert response.status_code == 200
    assert [t["id"] for t in response.json()] == [late["id"]]


def test_overdue_filter_false_excludes_overdue(client):
    client.post("/tasks", json={"title": "late", "due_date": _iso(-1)})
    not_late = client.post("/tasks", json={"title": "future", "due_date": _iso(1)}).json()
    response = client.get("/tasks", params={"overdue": "false"})
    assert response.status_code == 200
    body = response.json()
    assert all(t["overdue"] is False for t in body)
    assert not_late["id"] in [t["id"] for t in body]


def test_overdue_filter_no_matches_returns_200_and_empty_list(client):
    client.post("/tasks", json={"title": "future", "due_date": _iso(5)})
    response = client.get("/tasks", params={"overdue": "true"})
    assert response.status_code == 200
    assert response.json() == []


def test_invalid_overdue_query_value_returns_422(client):
    response = client.get("/tasks", params={"overdue": "notabool"})
    assert response.status_code == 422


def test_unfiltered_list_still_returns_all_tasks(client):
    client.post("/tasks", json={"title": "a"})
    client.post("/tasks", json={"title": "b", "due_date": _iso(-1)})
    response = client.get("/tasks")
    assert response.status_code == 200
    assert len(response.json()) == 2


# --- pure predicate (clock-independent) -----------------------------------

def test_is_overdue_predicate_rules():
    ref = date(2026, 7, 16)
    assert is_overdue(date(2026, 7, 15), TaskStatus.TODO, ref) is True          # past + incomplete
    assert is_overdue(date(2026, 7, 16), TaskStatus.TODO, ref) is False         # due today
    assert is_overdue(date(2026, 7, 17), TaskStatus.TODO, ref) is False         # future
    assert is_overdue(date(2026, 7, 1), TaskStatus.DONE, ref) is False          # completed
    assert is_overdue(date(2026, 7, 1), TaskStatus.IN_PROGRESS, ref) is True    # in-progress past
    assert is_overdue(None, TaskStatus.TODO, ref) is False                      # no due date
