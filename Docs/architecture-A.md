# Task Tracker Architecture

## 1. What the app does

Task Tracker is a local task-management application with a FastAPI CRUD API and a single-page vanilla JavaScript Kanban board. Users can create, edit, delete, filter, search, and move tasks among `ToDo`, `InProgress`, and `Done`; tasks may also have due dates and a derived overdue state. (`README.md:1–17`; `frontend/index.html:725–728`)

## 2. Data model

`Task` is the only visible domain entity. Important fields are `id`, `title`, `description`, `status`, `priority`, `assignee`, `due_date`, `created_at`, and `updated_at`. Status and priority use fixed enums. `overdue` is computed from the current UTC date, due date, and status rather than stored. Create and partial-update request models are separate from the response model. (`app/models.py:10–94`)

## 3. Request flow

When a user submits the task form, the frontend trims the title, constructs JSON, and sends `POST /tasks` to `http://127.0.0.1:8000`. FastAPI parses the body as `TaskCreate`; Pydantic validates the title, enums, date, and permitted fields. The route delegates to `storage.add_task`, which generates a UUID, assigns UTC timestamps, constructs a `TaskResponse`, and stores it in the module-level dictionary. The API returns HTTP 201, after which the frontend closes the modal, fetches the current task list again, and rerenders the board. (`frontend/index.html:1139–1201`; `app/main.py:40–42`; `app/storage.py:12–27`)

## 4. Key files

- `app/main.py` — FastAPI application, CORS policy, health router, and task routes.
- `app/models.py` — Task enums, request/response schemas, title validation, and overdue calculation.
- `app/storage.py` — In-memory CRUD operations and combined server-side filtering.
- `app/business_rules.py` — Permitted task-status transitions and transition errors.
- `app/api/routes/health.py` — Typed `GET /health` endpoint.
- `frontend/index.html` — Complete Kanban UI, API client, rendering, forms, filters, and drag-and-drop.
- `tests/test_tasks.py` — CRUD, validation, errors, and transition coverage.
- `tests/test_due_dates.py` — Due-date and overdue behavior coverage.
- `tests/test_search_filters.py` — Search and combined-filter coverage.

## 5. Conventions

Pydantic request models reject unknown fields; titles are trimmed, nonblank, and limited to 200 characters. Invalid request data and status transitions produce HTTP 422, while missing task IDs produce HTTP 404. Storage is a process-local dictionary, so data is not durable. Filters are executed by the backend and combined with logical AND. The frontend uses JSON over HTTP, depends on a fixed local API address, and is permitted by CORS only from the documented local frontend origins. (`app/models.py:33–74`; `app/business_rules.py:7–20`; `app/storage.py:9–80`; `app/main.py:27–35`)

## 6. Not visible or assumptions

No authentication, authorization, persistent database, migration system, pagination, or production deployment design is visible in the inspected implementation. Multi-process behavior and concurrent-write guarantees are not defined. Runtime and browser behavior were not exercised for this draft: **NOT RUN**.
