# User Stories — Task Tracker

Format: each story uses the "As a … I want … so that …" pattern with
Given/When/Then acceptance criteria. Scope tags mark what belongs to Module 1
versus later modules.

> **Review note:** These stories describe the *eventual* product. Only US-0
> (the skeleton) is implemented in Module 1. The CRUD stories are captured now
> so the domain (fields, status/priority values) is agreed before coding.

---

## US-0 — Service health check `[Module 1]`

**As a** developer,
**I want** a health endpoint,
**so that** I can confirm the service is running before doing anything else.

**Acceptance criteria**
- **Given** the API is running locally, **when** I send `GET /health`, **then** I receive HTTP 200.
- **Given** the API is running, **when** I open `/docs`, **then** the Swagger UI loads and lists the health endpoint.

---

## US-1 — Create a task `[Later module]`

**As a** user,
**I want** to create a task,
**so that** I can track a piece of work.

**Acceptance criteria**
- **Given** a valid title, **when** I `POST` a task, **then** it is stored and returned with a generated `id` and HTTP 201.
- **Given** no `status`/`priority` supplied, **when** the task is created, **then** it defaults to `ToDo` and `Medium`.
- **Given** an invalid `status` or `priority`, **when** I `POST`, **then** I receive HTTP 422 with a validation error.
- **Given** a missing title, **when** I `POST`, **then** I receive HTTP 422.

---

## US-2 — List tasks `[Later module]`

**As a** user,
**I want** to list all tasks,
**so that** I can see everything I am tracking.

**Acceptance criteria**
- **Given** tasks exist, **when** I `GET` the tasks collection, **then** I receive them all with HTTP 200.
- **Given** no tasks exist, **when** I `GET` the collection, **then** I receive an empty list with HTTP 200.

---

## US-3 — Retrieve a single task `[Later module]`

**As a** user,
**I want** to fetch one task by id,
**so that** I can view its details.

**Acceptance criteria**
- **Given** a task with a known `id`, **when** I `GET` it by id, **then** I receive that task with HTTP 200.
- **Given** an unknown `id`, **when** I `GET` it, **then** I receive HTTP 404.

---

## US-4 — Update a task `[Later module]`

**As a** user,
**I want** to update a task's fields,
**so that** I can reflect progress and changes.

**Acceptance criteria**
- **Given** a task exists, **when** I update its `status` to a valid value, **then** the change persists and HTTP 200 is returned.
- **Given** an invalid field value, **when** I update, **then** I receive HTTP 422.
- **Given** an unknown `id`, **when** I update, **then** I receive HTTP 404.

---

## US-5 — Delete a task `[Later module]`

**As a** user,
**I want** to delete a task,
**so that** I can remove work I no longer track.

**Acceptance criteria**
- **Given** a task exists, **when** I delete it, **then** it is removed and HTTP 200 (or 204) is returned.
- **Given** the task is deleted, **when** I fetch it again, **then** I receive HTTP 404.
- **Given** an unknown `id`, **when** I delete, **then** I receive HTTP 404.

---

## Domain reference

- **Task fields:** `id`, `title`, `description`, `status`, `priority`, `assignee`.
- **Status values:** `ToDo`, `InProgress`, `Done`.
- **Priority values:** `Low`, `Medium`, `High`.
