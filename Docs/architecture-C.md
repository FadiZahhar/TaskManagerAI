# Task Tracker Architecture

## 1. What the app does

The application exposes a FastAPI service for creating, listing, retrieving, updating, and deleting tasks. Tasks can be filtered by status, priority, overdue state, assignee, and title/description search. A health router is also registered, but its behavior is **not visible from the files I read**.

## 2. Data model

The central entity is `Task`, represented by three Pydantic models:

- `TaskCreate`: title, description, status, priority, assignee, and due date.
- `TaskUpdate`: optional versions of the same editable fields.
- `TaskResponse`: editable fields plus UUID string ID, UTC creation/update timestamps, and a computed `overdue` value.

Status values are `ToDo`, `InProgress`, and `Done`; priority values are `Low`, `Medium`, and `High`. A task is overdue when its due date is earlier than the current UTC date and its status is not `Done`.

## 3. Request flow

For task creation, `POST /tasks` accepts a `TaskCreate` payload. Model validation rejects unknown fields, trims the title, rejects blank titles, and limits titles to 200 characters. The route passes the validated payload to `storage.add_task`, which generates a UUID, assigns UTC timestamps, constructs a `TaskResponse`, stores it in a module-level dictionary, and returns it with HTTP 201.

## 4. Key files

- `app/main.py` — Configures FastAPI, CORS, routers, task endpoints, and HTTP 404 handling.
- `app/models.py` — Defines task models, enums, title validation, and overdue calculation.
- `app/storage.py` — Implements in-memory CRUD operations and combined task filtering.
- `app/api/routes/health.py` — Imported and registered; implementation is **not visible from the files I read**.
- `app/business_rules.py` — Supplies status-transition validation; the allowed transitions are **not visible from the files I read**.

## 5. Conventions

- Validation uses typed Pydantic request models, enumerated status and priority values, and forbidden unknown fields.
- Storage uses a module-level dictionary keyed by UUID strings.
- Missing tasks produce explicit HTTP 404 responses in the API routes.
- Status changes are delegated to a business-rule validator; its failure behavior is **not visible from the files I read**.
- List filters are applied sequentially, giving them AND behavior.
- Assignee matching is trimmed, case-insensitive, and exact; search is trimmed, case-insensitive substring matching over title and description.
- CORS permits `GET`, `POST`, `PATCH`, and `DELETE` from two local origins on port 5500. The frontend implementation and its actual requests are **not visible from the files I read**.

## 6. Not visible or assumptions

Authentication, authorization, durable persistence, concurrency handling, deployment topology, frontend behavior, test coverage, and runtime observations are **not visible from the files I read**. The health endpoint and exact status-transition rules are also **not visible from the files I read**. The application metadata describes a minimal skeleton even though task routes are present; the intended current description is **not visible from the files I read**.
