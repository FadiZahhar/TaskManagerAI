# Task Tracker Architecture and Context-Engineering Comparison

## Final architecture document

### What the app does

Task Tracker is a local task-management application with a FastAPI CRUD API
and a single-page vanilla JavaScript Kanban board. Users can create, edit,
delete, filter, search, and move tasks among `ToDo`, `InProgress`, and `Done`.
Tasks may also have due dates and a derived overdue state
(`README.md:1-17`; `frontend/index.html:707-728`).

### Data model

`Task` is the visible domain entity. Its response fields are `id`, `title`,
`description`, `status`, `priority`, `assignee`, `due_date`, `created_at`,
`updated_at`, and the computed `overdue` value. Status and priority use fixed
enums. Create and partial-update requests use models separate from the response
model. `overdue` is derived from the current UTC date, due date, and status; it
is not stored (`app/models.py:10-94`).

### Request flow: create a task

The frontend trims the title, constructs JSON, and sends `POST /tasks` to
`http://127.0.0.1:8000`. FastAPI parses the body as `TaskCreate`, whose Pydantic
validation trims the title, rejects blank or overlong titles, validates enums
and the date, and rejects unknown fields. The route delegates to
`storage.add_task`, which generates a UUID, assigns UTC timestamps, constructs
a `TaskResponse`, and stores it in the module-level dictionary. The API returns
HTTP 201; the frontend then closes the modal, reloads the current list, and
rerenders the board (`frontend/index.html:1139-1201`; `app/main.py:40-42`;
`app/models.py:33-51`; `app/storage.py:12-27`).

### Key files

| File | Role |
|---|---|
| `app/main.py` | FastAPI application, local CORS configuration, health-router registration, and task routes. |
| `app/models.py` | Task enums, request/response models, title validation, due dates, and overdue calculation. |
| `app/storage.py` | Process-local in-memory CRUD operations and combined server-side filtering. |
| `app/business_rules.py` | Permitted task-status transitions and transition errors. |
| `app/api/routes/health.py` | Typed `GET /health` endpoint. |
| `frontend/index.html` | Kanban UI, API client, rendering, task form, filters, and drag-and-drop. |
| `tests/conftest.py` | Shared API client, created-task fixture, and automatic storage reset. |
| `tests/test_tasks.py` | CRUD, validation, error, and transition coverage. |
| `tests/test_due_dates.py` | Due-date and overdue coverage. |
| `tests/test_search_filters.py` | Search and combined-filter coverage. |

### Conventions

- Request models reject unknown fields. Titles are trimmed, must not be blank,
  and are limited to 200 characters (`app/models.py:33-74`).
- Missing tasks produce HTTP 404. Invalid request data and forbidden status
  transitions produce HTTP 422 (`app/main.py:62-88`;
  `app/business_rules.py:7-20`).
- Allowed status changes are `ToDo -> InProgress`, `InProgress -> Done`, and
  `Done -> InProgress`; same-status changes are rejected
  (`app/business_rules.py:7-20`).
- List filters combine with logical AND. Assignee matching is trimmed,
  case-insensitive, and exact; search is a trimmed, case-insensitive literal
  substring match over title and description (`app/storage.py:30-56`).
- The frontend calls `http://127.0.0.1:8000`, and CORS permits the two documented
  local frontend origins (`frontend/index.html:724-728`; `app/main.py:27-35`).

### Not visible, assumptions, and known conflict

- Storage is a module-level dictionary, and the README documents a
  single-process, non-durable design. The resulting multi-process and
  concurrent-write risks are architectural inferences, not observed runtime
  failures (`app/storage.py:9-80`; `README.md:152-157`).
- The module docstring and FastAPI description in `app/main.py` still describe
  a Module 1 health-only skeleton even though the same file defines task CRUD
  routes. This is a stale metadata conflict; this documentation records it but
  does not change application code (`app/main.py:1-5`; `app/main.py:18-24`;
  `app/main.py:40-88`).
- The README documents no authentication, persistent database, pagination, or
  Docker/deployment configuration (`README.md:152-157`).
- Runtime and browser behavior were not exercised while producing any of the
  three architecture drafts: **NOT RUN**.

## Context-strategy comparison

| Strategy | What it got right | What it got wrong, missed, or invented | Appropriate uncertainty | Best task shape |
|---|---|---|---|---|
| A - Minimal context with repository inspection | Most complete, specific, and concise whole-system account; directly cited files and lines and covered frontend flow, routes, models, storage, and tests. | Missed the stale Module 1 metadata conflict. Its concurrency statement was an architectural inference, not an observed failure. The approved scorecard identified no fabricated claim. | Correctly marked runtime and browser behavior **NOT RUN** and separated unavailable production and persistence details. | Broad architecture summaries where direct repository inspection is permitted. |
| B - Structured context | Accurate system-contract summary from trusted curated context; captured validation, storage, filtering, and frontend conventions without opening application source. | Missed the exact frontend create flow and stale metadata conflict. Absence statements depended on supplied context rather than independent inspection. The approved scorecard identified no fabricated claim. | Clearly disclosed source-inspection and browser-observation limits. | Repeatable documentation from trusted, verified structured context. |
| C - Targeted three-file context | Precise backend account, clean three-file boundary, and unique identification of the stale Module 1 metadata conflict. | Could not verify health behavior, transition rules, frontend behavior, tests, deployment information, or runtime conventions. These were intentional context limits, not inventions. | Used the strongest uncertainty discipline, repeatedly marking unsupported areas as not visible. | Bounded backend reviews where context access must be tightly controlled. |

## Corrections made before finalizing

| Draft | Original claim or omission | Problem | Repository evidence | Final correction |
|---|---|---|---|---|
| A | "Multi-process behavior and concurrent-write guarantees are not defined." | Useful architectural inference, but not an observed runtime failure. | `app/storage.py:9-80`; `README.md:152-157` | Identified the single-process, process-local design and explicitly labeled concurrency risk as inference; runtime remained **NOT RUN**. |
| A | No mention of stale Module 1 metadata. | The architecture missed a conflict between application metadata and implemented routes. | `app/main.py:1-5`; `app/main.py:18-24`; `app/main.py:40-88` | Added the conflict to the final architecture without changing application code. |
| B | Absence claims were stated for the documented branch. | Strategy B used curated context rather than direct application-source inspection. | Approved scorecard and the preserved Strategy B draft. | Treated those statements as claims from supplied context, not independent inspection evidence. |
| C | Health, transition, frontend, test, and deployment details were marked not visible. | No correction needed within C's approved context boundary. | Preserved Strategy C draft and approved scorecard. | Retained C's uncertainty as appropriate and carried its stale-metadata detection into the final architecture. |

## Verdict

I selected Strategy A as the final architecture baseline because it produced
the most complete, specific, directly cited whole-system account. I kept its
concurrency limitation as an explicit inference and carried forward Strategy
C's stale-metadata detection, so choosing A does not erase the useful
correction found by the narrower strategy.

## My context-engineering rule

For broad architecture summaries where direct repository inspection is allowed, I use Strategy A because it produces the most complete, specific, and directly cited whole-system account. For bounded backend reviews where context access must be tightly controlled, I use Strategy C because it stays precise within its approved anchors and explicitly marks unavailable evidence.
