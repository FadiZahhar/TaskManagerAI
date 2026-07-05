# User Stories — Task Tracker

Eight stories covering Module 1 scope: CRUD, filtering, validation, and the
Done-lock transition rule. Each is small enough to build and test in isolation.

**Status/priority values:** `status` ∈ {`ToDo`, `InProgress`, `Done`};
`priority` ∈ {`Low`, `Medium`, `High`}.
**Task fields:** `id`, `title`, `description`, `status`, `priority`, `assignee`.

> **Review note:** These describe the eventual product. Module 1 builds the
> skeleton (`GET /health`, Swagger at `/docs`); the CRUD/filter/validation
> behavior below is implemented across this and later modules. Out of scope:
> auth, users, roles, teams, multi-tenancy, notifications, real-time, frontend,
> production database, Docker, deployment.

| ID | User Story | Acceptance Criteria | Notes / Edge Cases |
|----|------------|---------------------|--------------------|
| US-1 | As a user, I want to create a task so that I can track a piece of work. | Given a valid title, when I `POST /tasks`, then the task is stored and returned with a generated `id` and HTTP 201. Given no `status`/`priority`, when I create, then they default to `ToDo` / `Medium`. Response echoes all fields: `id`, `title`, `description`, `status`, `priority`, `assignee`. | Title is required and non-empty (reject `""` / whitespace-only → 422). `description` and `assignee` are optional/nullable. Client-supplied `id` is ignored; server generates it. |
| US-2 | As a user, I want to retrieve a single task by id so that I can view its details. | Given a task with a known `id`, when I `GET /tasks/{id}`, then I receive that task with HTTP 200. Given an unknown `id`, when I `GET`, then I receive HTTP 404 with a clear error message. | **Missing-task behavior:** unknown id → 404, not 500 or empty 200. Non-integer id (e.g. `/tasks/abc`) → 422 from path validation. |
| US-3 | As a user, I want to list all tasks so that I can see everything I'm tracking. | Given tasks exist, when I `GET /tasks`, then I receive all of them with HTTP 200. Given no tasks exist, when I `GET /tasks`, then I receive an empty list `[]` with HTTP 200. | Empty state returns `[]`, never 404. Response is always a JSON array. |
| US-4 | As a user, I want to update a task so that I can correct details and reflect changes. | Given a task exists, when I `PUT`/`PATCH /tasks/{id}` with valid fields, then the changes persist and HTTP 200 is returned with the updated task. Given an unknown `id`, when I update, then I receive HTTP 404. | Invalid `status`/`priority` on update → 422 (see US-7). Updating to an empty title → 422. Status changes are additionally subject to the transition rule in US-8. |
| US-5 | As a user, I want to delete a task so that I can remove work I no longer track. | Given a task exists, when I `DELETE /tasks/{id}`, then it is removed and HTTP 204 (or 200) is returned. Given the task is then fetched, then I receive HTTP 404. Given an unknown `id`, when I delete, then I receive HTTP 404. | **Missing-task behavior:** deleting a non-existent id → 404. Decide 204 (no body) vs 200 (confirmation body) and keep it consistent. |
| US-6 | As a user, I want to filter tasks by status and priority so that I can focus on a subset. | Given a valid `status` query param, when I `GET /tasks?status=ToDo`, then only matching tasks are returned (HTTP 200). Given both `status` and `priority`, then results match both (AND). Given no filters, then all tasks are returned. | Invalid filter value (e.g. `?status=Archived`) → 422, not a silent empty list. A valid filter matching nothing → empty list `[]` + 200 (success, not 404). Filtering is case-sensitive against the enum values. |
| US-7 | As a user, I want my task data validated so that only well-formed tasks are stored. | Given an invalid `status` (not `ToDo`/`InProgress`/`Done`), when I create/update, then I receive HTTP 422 with a field-level error. Given an invalid `priority` (not `Low`/`Medium`/`High`), then HTTP 422. Given a missing/empty required title, then HTTP 422. Given a wrong type (e.g. numeric title), then HTTP 422. | **Invalid status / invalid priority behavior** enforced on both create and update. Enum validation via Pydantic; error should name the offending field. Extra/unknown fields: decide to ignore or reject, and document it. |
| US-8 | As a user, I want a task in `Done` to stay done so that completed work isn't accidentally reopened. | Given a task with `status = Done`, when I update its `status` to `ToDo` or `InProgress`, then the change is rejected with HTTP 409 (Conflict) and the task stays `Done`. Given a `Done` task, when I set `status = Done` again (no-op), then it succeeds with 200. Given a non-`Done` task, then normal transitions (`ToDo`↔`InProgress`, →`Done`) are allowed. | **Done-lock rule:** `Done → ToDo` and `Done → InProgress` are forbidden. Use 409 to distinguish "valid value, illegal transition" from 422 "invalid value." Editing other fields (title, assignee, etc.) on a `Done` task is still allowed unless you decide otherwise — worth confirming. |

## Design decisions to confirm

- **409 vs 422 for the Done-lock (US-8):** 422 = value isn't a valid status; 409 = valid status but illegal *transition*. Collapse to one code if your course expects it, but the split is the more correct REST design and cleanly testable.
- **Whether a `Done` task's non-status fields stay editable:** currently allowed (only the status transition is locked). If Done tasks should be fully frozen, tighten US-4 and US-8.