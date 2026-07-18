# Task Tracker Architecture

## What the app does

The Task Tracker is a local Kanban application with a FastAPI backend and a single-file vanilla HTML, CSS, and JavaScript frontend. Users can create, view, update, delete, search, and filter tasks across `ToDo`, `InProgress`, and `Done` columns. Filtering is performed by the backend.

## Data model

The documented domain entity is a task. Task data includes:

- A server-generated UUID string identifier.
- A required, trimmed title of no more than 200 characters.
- Description and assignee fields; no backend length limit for either is confirmed.
- Priority: `Low`, `Medium`, or `High`.
- Status: `ToDo`, `InProgress`, or `Done`.
- An optional date-only `due_date`, which can be set or cleared.
- UTC creation and update timestamps.
- A response-only `overdue` value derived from the due date, current UTC date, and status; it is not stored.

A task is overdue only when its due date is before the current UTC date and its status is not `Done`.

## Request flow

When a client creates a task, it sends `POST /tasks`. The request model validates the submitted fields, rejects unknown fields, trims the title, and rejects blank or overlong titles and invalid enum values. Validation failures normally return HTTP 422.

For a valid request, the backend generates a UUID and UTC timestamps and places the task in the module-level in-memory dictionary. The response model derives the current `overdue` value, and the route returns the created task with HTTP 201. Because storage is process-local, the task is lost when the backend process restarts.

## Key files

- `app/main.py` — creates the FastAPI application, configures local CORS, and defines the task CRUD routes.
- `app/models.py` — defines task enums, request and response models, title validation, due dates, and overdue derivation.
- `app/storage.py` — owns the module-level task dictionary and applies combined server-side filters.
- `app/business_rules.py` — defines the allowed task-status transitions.
- `app/api/routes/health.py` — provides `GET /health`.
- `frontend/index.html` — contains the complete Kanban interface, task modal, drag-and-drop behavior, due-date display, overdue indicator, and filter bar.
- `tests/conftest.py` — provides the shared API client and resets in-memory storage between tests.
- `tests/test_tasks.py` — covers task CRUD, validation, errors, and status transitions.
- `tests/test_due_dates.py` — covers due-date and overdue behavior.
- `tests/test_search_filters.py` — covers search and combined filtering.

## Conventions

Pydantic v2 request models enforce task validation and reject unknown fields. Invalid request data and forbidden status transitions return HTTP 422; missing task identifiers return HTTP 404. Status changes are limited to `ToDo → InProgress`, `InProgress → Done`, and `Done → InProgress`.

Storage is an in-memory dictionary designed for one process, without durable or concurrency-safe persistence. List filters combine with logical AND and do not mutate stored tasks.

The frontend calls the backend at `http://127.0.0.1:8000`, while CORS permits only the documented local frontend origins. All three Kanban columns remain visible, and filtering is server-backed.

## Not visible or assumptions

Authentication, authorization, production hosting, and operational monitoring are not confirmed by the supplied context. No database, migration system, frontend framework, Dockerfile, or GitHub Actions workflow is present on the documented branch. The exact browser-side sequence that constructs and submits a create request was not inspected, and browser behavior was not run or observed.
