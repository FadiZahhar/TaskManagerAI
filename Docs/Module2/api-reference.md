# Task Tracker API — Module 2 Reference

Base URL (local): `http://127.0.0.1:8000`

Interactive docs: `http://127.0.0.1:8000/docs` (Swagger UI) or `/openapi.json`.

Storage is in-memory (`app/storage.py`) — all data is lost on restart, and
there is no persistence, auth, or database. See [ADR-0001](adr-0001-stack.md)
in Module 1's docs for why.

## Domain model

### TaskStatus
`"ToDo"` | `"InProgress"` | `"Done"`

### TaskPriority
`"Low"` | `"Medium"` | `"High"`

### Task fields

| Field | Type | Notes |
|---|---|---|
| `id` | string | Server-generated UUID4. Client-supplied `id` is ignored/rejected (see `extra="forbid"` below). |
| `title` | string | Required on create. Whitespace is stripped; blank (after stripping) or over 200 characters → `422`. |
| `description` | string | Optional, defaults to `""`. |
| `status` | `TaskStatus` | Defaults to `"ToDo"` on create. |
| `priority` | `TaskPriority` | Defaults to `"Medium"` on create. |
| `assignee` | string or `null` | Optional, defaults to `null`. |
| `created_at` | ISO 8601 UTC datetime | Set once, on create. |
| `updated_at` | ISO 8601 UTC datetime | Bumped on every successful update. |

All three request/response models use `extra="forbid"` — any unrecognized
field in a request body is rejected with `422`, it is never silently ignored.

## Endpoints

### `GET /health`

Liveness check. No auth, no parameters.

- **200** → `{"status": "ok", "timestamp": "<ISO 8601 UTC>"}`

---

### `POST /tasks`

Create a task.

**Request body** (`TaskCreate`):
```json
{
  "title": "Write report",
  "description": "Quarterly report",
  "status": "ToDo",
  "priority": "High",
  "assignee": "Alex"
}
```
Only `title` is required; every other field is optional with the defaults above.

**Responses**

| Status | When |
|---|---|
| `201` | Created. Body is the full `TaskResponse` (see fields above). |
| `422` | Missing/blank/whitespace-only title; title over 200 characters; invalid `status`/`priority` enum value; unknown field in the body. |

---

### `GET /tasks`

List tasks, optionally filtered.

**Query parameters** (both optional, combine with AND):

| Param | Type | Notes |
|---|---|---|
| `status` | `TaskStatus` | Invalid value (not one of the three) → `422`. |
| `priority` | `TaskPriority` | Invalid value → `422`. |

**Responses**

| Status | When |
|---|---|
| `200` | Always, even with zero matches — body is `[]`, never a `404`. |
| `422` | `status` or `priority` query value isn't a valid enum member. |

---

### `GET /tasks/{task_id}`

Fetch one task.

| Status | When |
|---|---|
| `200` | Task found — full `TaskResponse` body. |
| `404` | No task with that id. Body: `{"detail": "Task with id {task_id} not found"}`. |

---

### `PATCH /tasks/{task_id}`

Partially update a task. Only send the fields you want to change.

**Request body** (`TaskUpdate`, all fields optional): `title`, `description`,
`status`, `priority`, `assignee`.

**Behavior**

1. If the body omits `status` entirely, the transition rule below is skipped
   — other fields update freely.
2. If `status` is present, the task must exist (checked first) and the
   transition must be one of the allowed pairs below, or the whole request
   is rejected — no partial application.
3. `updated_at` is refreshed on every successful change.

**Status-transition rule** (`app/business_rules.py`)

Only these transitions are allowed:

```
ToDo       -> InProgress
InProgress -> Done
Done       -> InProgress
```

Everything else — including `ToDo -> Done`, any reverse transition not
listed, and setting a status to its own current value (no-op) — is rejected.

**Responses**

| Status | When |
|---|---|
| `200` | Update applied. Full updated `TaskResponse` body. |
| `404` | No task with that id. |
| `422` | Invalid field value (bad enum, bad title) **or** a disallowed status transition. Transition-rejection body includes the allowed list, e.g. `{"detail": "Invalid status transition from Done to ToDo. Allowed transitions: ['Done->InProgress', 'InProgress->Done', 'ToDo->InProgress']"}`. |

---

### `DELETE /tasks/{task_id}`

Delete a task.

| Status | When |
|---|---|
| `204` | Deleted. **Empty body** — do not parse it as JSON. |
| `404` | No task with that id (including a task already deleted). |

## Error shape

Every error response (404, 422) is:
```json
{"detail": "<human-readable message>"}
```
except Pydantic's own `422` validation errors, which use FastAPI's default
`{"detail": [{"loc": [...], "msg": "...", "type": "..."}]}` array shape.

## Known limitations (in scope for later modules, not bugs)

- No authentication — every endpoint is open.
- No persistence — restarting the process clears all tasks.
- No pagination on `GET /tasks` — it returns the entire in-memory set.
- Single-process only — no concurrency guarantees across workers.
