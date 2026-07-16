"""Feature 2 — search + combined filters (mid-course).

Server-side filtering on GET /tasks: case-insensitive substring search over
title and description, plus AND-composed status/priority/assignee/overdue
filters. State is built through the public API and reset per test by the autouse
``_reset_storage`` fixture in conftest.py. Multi-match assertions use sets
because storage returns dict-insertion order (the frontend re-sorts).
"""

from datetime import datetime, timedelta, timezone


def _seed(client, tasks):
    for t in tasks:
        assert client.post("/tasks", json=t).status_code == 201


def _titles(client, **params):
    resp = client.get("/tasks", params=params)
    assert resp.status_code == 200
    return {t["title"] for t in resp.json()}


# --- search: title / description / case-insensitivity ---------------------

def test_search_matches_title(client):
    _seed(client, [
        {"title": "Write quarterly report", "description": "numbers"},
        {"title": "Email the vendor", "description": "say hi"},
    ])
    assert _titles(client, search="report") == {"Write quarterly report"}


def test_search_matches_description_only(client):
    _seed(client, [
        {"title": "Standup", "description": "discuss the roadmap"},
        {"title": "Lunch", "description": "tacos"},
    ])
    # 'roadmap' is present only in a description, in no title
    assert _titles(client, search="roadmap") == {"Standup"}


def test_search_is_case_insensitive(client):
    _seed(client, [{"title": "Deploy API", "description": "prod"}])
    assert _titles(client, search="api") == {"Deploy API"}
    assert _titles(client, search="DEPLOY") == {"Deploy API"}


def test_search_matches_title_or_description(client):
    _seed(client, [
        {"title": "Report draft", "description": "x"},
        {"title": "Email", "description": "attach the report"},
        {"title": "Nope", "description": "y"},
    ])
    assert _titles(client, search="report") == {"Report draft", "Email"}


def test_search_trims_surrounding_whitespace(client):
    _seed(client, [{"title": "Pipeline fix", "description": ""}])
    assert _titles(client, search="   pipeline   ") == {"Pipeline fix"}


def test_blank_search_behaves_as_no_search(client):
    _seed(client, [{"title": "A"}, {"title": "B"}])
    assert _titles(client, search="   ") == {"A", "B"}


def test_empty_search_param_behaves_as_no_search(client):
    _seed(client, [{"title": "A"}, {"title": "B"}])
    assert _titles(client, search="") == {"A", "B"}


def test_search_no_match_returns_200_and_empty_list(client):
    _seed(client, [{"title": "Alpha"}, {"title": "Beta"}])
    resp = client.get("/tasks", params={"search": "zzzz"})
    assert resp.status_code == 200
    assert resp.json() == []


def test_search_metacharacter_is_literal_substring(client):
    # A regex-based search would treat 'a.c' as 'a<any>c' (matching 'abc') and
    # raise on '[' -> 500. Substring matching keeps it literal and safe.
    _seed(client, [
        {"title": "a.c file", "description": ""},
        {"title": "abc file", "description": ""},
    ])
    assert _titles(client, search="a.c") == {"a.c file"}
    assert client.get("/tasks", params={"search": "["}).status_code == 200


# --- combined filters compose with logical AND ----------------------------

def test_status_and_priority_use_and(client):
    _seed(client, [
        {"title": "match", "status": "ToDo", "priority": "High"},
        {"title": "wrong-priority", "status": "ToDo", "priority": "Low"},
        {"title": "wrong-status", "status": "InProgress", "priority": "High"},
    ])
    assert _titles(client, status="ToDo", priority="High") == {"match"}


def test_search_and_status_use_and(client):
    _seed(client, [
        {"title": "report todo", "status": "ToDo"},
        {"title": "report done", "status": "Done"},
    ])
    assert _titles(client, search="report", status="ToDo") == {"report todo"}


def test_search_and_overdue_use_and(client):
    today = datetime.now(timezone.utc).date()
    past = (today - timedelta(days=2)).isoformat()
    future = (today + timedelta(days=3)).isoformat()
    _seed(client, [
        {"title": "urgent bug", "due_date": past},      # matches + overdue
        {"title": "urgent later", "due_date": future},  # matches, not overdue
        {"title": "calm bug", "due_date": past},         # overdue, no 'urgent'
    ])
    assert _titles(client, search="urgent", overdue="true") == {"urgent bug"}


def test_assignee_filter_exact_case_insensitive(client):
    _seed(client, [
        {"title": "T1", "assignee": "Alex Kim"},
        {"title": "T2", "assignee": "alex kim"},
        {"title": "T3", "assignee": "Bob"},
        {"title": "T4"},  # no assignee (None) — must never match a value
    ])
    assert _titles(client, assignee="ALEX KIM") == {"T1", "T2"}


def test_assignee_filter_is_exact_not_substring(client):
    _seed(client, [{"title": "T1", "assignee": "Alexander"}])
    assert _titles(client, assignee="Alex") == set()


# --- validation + unfiltered regression -----------------------------------

def test_invalid_status_filter_returns_422(client):
    assert client.get("/tasks", params={"status": "Nope"}).status_code == 422


def test_invalid_priority_filter_returns_422(client):
    assert client.get("/tasks", params={"priority": "Urgent"}).status_code == 422


def test_invalid_enum_with_valid_search_still_returns_422(client):
    # enum coercion must occur before filtering; a valid search must not swallow it
    assert client.get("/tasks", params={"status": "Nope", "search": "x"}).status_code == 422


def test_unfiltered_list_remains_compatible(client):
    _seed(client, [{"title": "A"}, {"title": "B"}, {"title": "C"}])
    resp = client.get("/tasks")
    assert resp.status_code == 200
    assert {t["title"] for t in resp.json()} == {"A", "B", "C"}


def test_filtering_does_not_mutate_stored_tasks(client):
    _seed(client, [{"title": "keep", "description": "the report", "assignee": "Dana"}])
    before = client.get("/tasks").json()
    client.get("/tasks", params={"search": "report"})
    client.get("/tasks", params={"assignee": "Dana", "status": "Done"})
    client.get("/tasks", params={"overdue": "true"})
    assert client.get("/tasks").json() == before
