# Decision Plan: Comments on Tasks

## 1. Feature brief

A comment has:

- `id`: string UUID
- `task_id`: string task reference
- `author`: required string, 1–100 characters
- `body`: required string, 1–2000 characters
- `created_at`: server-generated UTC datetime

This document is a reviewed plan only. Comments are **not implemented** in
Module 5. Creating and listing immutable comments is a proposed minimum scope,
not a ratified product requirement; retrieval, editing, deletion, ordering,
task-deletion behavior, and whitespace rules remain open decisions.

## 2. Planning experiment

The generic baseline was generated in a context with no repository access and
was frozen unchanged at `Docs/module-5/comments-plan-generic.md`. The grounded
draft was then produced in a separate fresh repository thread that was
explicitly instructed not to read the generic baseline. Its self-critique was
run in that same grounded-planning thread.

The generic plan is evidence of what can be proposed without repository
context. This document keeps only grounded claims that were manually checked
against the current branch and labels unresolved choices as proposals.

## 3. Repository evidence

| Area | File(s) checked | Existing convention | Impact on comments plan |
|---|---|---|---|
| Models | `app/models.py:33-94` | Request and response models are centralized; request models use `ConfigDict(extra="forbid")`; title validation uses an explicit `field_validator`; annotations remain Python 3.9 compatible | Proposed comment request/response models would belong in this file and should follow the same validation and extra-field rules |
| Routes | `app/main.py:40-88`; `app/api/routes/health.py` | Product task routes are inline in `app/main.py`; the separate router contains only health; task routes use a `tasks` tag and explicit response models/statuses | Proposed comment endpoints should follow the inline route style unless a later architecture decision deliberately changes it |
| Parent lookup and errors | `app/main.py:62-80`; `app/storage.py:59-60` | Routes use `storage.get_task_by_id()` and return HTTP 404 with `Task with id {task_id} not found` for missing tasks | Any nested comment route must define and test missing-parent behavior; reusing the current task wording is the grounded default |
| Storage | `app/storage.py:9-84`; `README.md:152-158` | Module-level in-memory dictionary, string UUIDs, UTC timestamps, single process, reset on restart, no persistence or concurrency guarantee | A separate in-memory comment collection is a proposed course-scale shape; it must be cleared by `_reset()` and must not be presented as durable or transactionally atomic |
| Tests | `tests/conftest.py:8-24`; `tests/test_due_dates.py`; `tests/test_search_filters.py` | Autouse storage reset, shared `client` and `created_task` fixtures, public-API setup, feature-specific files, descriptive behavior/result names | Proposed tests belong in `tests/test_comments.py`, should use existing fixtures, and must finalize decision-dependent assertions only after contracts are ratified |
| Frontend | `frontend/index.html:627-683`; `frontend/index.html:833-906`; `frontend/index.html:1175-1194` | All HTML, CSS, and JavaScript live in one file; cards have action controls; the task modal keeps values on request failure; dynamic task text uses text nodes/`textContent` | A comments experience would remain in this file, preserve current task behavior, render comment text safely, and show honest loading/empty/error states |
| Runtime and dependencies | `README.md:72-79`; `requirements.txt` | Python 3.9+ compatibility, existing FastAPI/Pydantic stack, and no comments-specific dependency | Planning should use `typing.Optional`-compatible syntax and add no framework, parser, or persistence dependency without a later decision |
| Architecture | `Docs/adr-0001-stack.md:19-24` | In-memory data loss and lack of concurrency safety are accepted only for the local learning project | Future database notes are speculative guidance, not a Module 5 migration design |

Manual verification also confirmed that no startup seeding exists in the
current application tree and that `Docs/decisions/` contained no decision-note
file on this branch before this document was added. The IDE's previously open
Module 4 decision tab was not evidence for this branch.

## 4. Repository-grounded plan

### 4.1 Data Model

If implementation is later authorized, the grounded placement is
`app/models.py` beside `TaskCreate`, `TaskUpdate`, and `TaskResponse`.

Proposed request model:

- `CommentCreate`
  - `author: str`, required, maximum 100 characters
  - `body: str`, required, maximum 2,000 characters
  - `ConfigDict(extra="forbid")`
  - no client-owned `id`, `task_id`, or `created_at`

Proposed response model:

- `CommentResponse`
  - `id: str`
  - `task_id: str`
  - `author: str`
  - `body: str`
  - `created_at: datetime`
  - `ConfigDict(extra="forbid")`

Grounded recommendations:

- Generate `id` with the repository's existing string-UUID pattern.
- Generate `created_at` on the server with a timezone-aware UTC datetime.
- Take `task_id` from the route path rather than the request body.
- Keep comments outside `TaskResponse` initially to avoid changing current
  task-list/filter/frontend contracts.

Decisions still required before model tests are finalized:

- whether surrounding whitespace is stored or normalized;
- whether minimum/maximum length is applied before or after normalization;
- whether body line breaks and outer whitespace are preserved;
- whether comments remain separate from task responses.

### 4.2 API Routes

The following is a proposed minimum API, not a settled scope:

| Method | Path | Request | Response | Proposed success status | Proposed error cases |
|---|---|---|---|---|---|
| POST | `/tasks/{task_id}/comments` | `CommentCreate` with `author` and `body` | One `CommentResponse` | 201 | 404 missing parent; 422 missing, blank, oversized, incorrectly typed, or unknown fields |
| GET | `/tasks/{task_id}/comments` | No body | List of `CommentResponse` | 200 | 404 missing parent; an existing task with no comments returns `[]` |

Grounded route notes:

- The current parent lookup is `storage.get_task_by_id()`.
- The path is the proposed authoritative source for `task_id`; request models
  should reject a client-supplied task reference.
- Current CORS methods already include GET and POST, so these two proposed
  operations would not require a method-list change.
- Individual GET, PATCH, and DELETE routes remain outside the minimum proposal
  until the product scope and authorship/ownership rules are decided.
- Using the current `tasks` OpenAPI tag is a grounded default, not a fixed
  requirement.
- Missing-parent behavior, list ordering, and lifecycle operations must be
  ratified before these routes become a contract.

### 4.3 Storage relationship

The course-scale proposal is a separate module-level comments dictionary keyed
by comment ID while `_tasks` remains unchanged. Planned storage responsibilities
would be:

- create a comment after its parent task is confirmed;
- list comments that reference one task;
- preserve the ratified deterministic ordering contract;
- clear both task and comment state in `_reset()`;
- apply the ratified task-deletion rule in the same delete operation.

This design would scan the in-memory collection by `task_id`, which is
acceptable only for the current small educational scope. It does not provide a
transactional or concurrency guarantee. A future persistent design would need
an indexed task relationship, but that is guidance rather than a current
migration decision.

### 4.4 Tests

The proposed file is `tests/test_comments.py`, following the repository's
feature-specific test pattern. Tests should use `client` and `created_task`,
establish state through public API calls, and assert status plus meaningful
response/state.

#### Stable happy-path proposals

- `test_create_comment_valid_returns_201_with_full_body`
- `test_create_comment_generates_uuid_id_and_utc_created_at`
- `test_comment_task_id_comes_from_route_parent`
- `test_list_comments_for_existing_task_with_none_returns_200_and_empty_list`
- `test_comments_are_scoped_to_their_parent_task`

#### Stable validation-boundary proposals

- `test_create_comment_missing_author_returns_422`
- `test_create_comment_blank_author_returns_422`
- `test_create_comment_author_at_100_characters_returns_201`
- `test_create_comment_author_over_100_characters_returns_422`
- `test_create_comment_missing_body_returns_422`
- `test_create_comment_blank_body_returns_422`
- `test_create_comment_body_at_2000_characters_returns_201`
- `test_create_comment_body_over_2000_characters_returns_422`
- `test_create_comment_unknown_field_returns_422`
- Parameterized cases that separately reject client-supplied `id`, `task_id`,
  and `created_at`

#### Parent-scope proposals

- `test_create_comment_for_missing_task_returns_404`
- `test_list_comments_for_missing_task_returns_404`
- `test_comment_for_one_task_does_not_appear_under_another_task`
- `test_storage_reset_removes_comments_between_tests`

#### Decision-dependent tests to finalize later

- list ordering;
- surrounding whitespace and internal line-break preservation;
- whether comments change task responses or expose a count;
- task-deletion cascade, retention, or deletion blocking;
- individual retrieval, editing, or deletion;
- any authentication/authorization behavior introduced in a later scope.

The repository currently has no identity system, so this plan does not invent
401/403 behavior. Until that changes, `author` would only be an unverified
display string.

### 4.5 Frontend Changes

All changes would remain in `frontend/index.html`; no frontend framework or
dependency is proposed.

Grounded proposal:

- Add an accessible comments action beside existing card actions.
- Open an independent comments dialog for the selected task so the existing
  create/edit modal remains focused on task fields.
- Load comments on demand when the dialog opens rather than extending every
  `TaskResponse` or issuing one request per board card.
- Display task context, author, creation time, comment body, and a clear empty
  state.
- Provide required author and body controls with the ratified length rules.
- Keep values and show an inline error when submission fails, matching current
  modal behavior.
- Prevent duplicate submissions while a create request is pending.
- Insert author/body using `textContent` or text nodes; treat bodies as plain
  text unless a later product decision accepts the sanitization implications of
  richer content.
- Preserve the three columns, filtering, drag-and-drop, existing modal states,
  and backend-authoritative rendering.

The separate dialog, on-demand loading, plain-text format, and absence of a
comment count are recommendations to grade, not repository facts.

### 4.6 Migration or data-shape notes

No database, persistent comment records, startup seed, or migration framework
exists on this branch. For the proposed in-memory shape:

- initialize comment storage empty;
- do not backfill or alter existing task records;
- extend `_reset()` to clear comment state if comments are implemented;
- implement the chosen task-deletion behavior in the same storage operation;
- keep task responses unchanged unless the count/embedding question is later
  decided differently.

For a future durable design—not for Module 5—a comments table or equivalent
would need a UUID identifier, indexed task reference, author, body, UTC creation
timestamp, and a deliberately chosen foreign-key deletion rule. No migration
should be designed until a persistent storage architecture and compatibility
requirements exist.

### 4.7 Open Questions

1. Is the initial API create/list only, or must it include individual retrieval,
   editing, or deletion?
2. What happens to comments when their task is deleted: remove them in the same
   operation, retain them, or block task deletion?
3. Is `author` a free-form unverified display value, or should comments wait for
   an authenticated identity model?
4. Are comments ordered oldest first, newest first, or by another explicit
   stable rule?
5. How are surrounding whitespace, blank-after-trim validation, internal line
   breaks, and maximum length defined for author and body?
6. Should tasks expose no comment metadata, a comment count, or embedded
   comments?
7. Are bodies plain text only, or is a richer format worth its parsing and
   sanitization requirements?
8. Should individual comment operations use the existing `tasks` tag or a new
   `comments` tag?

### 4.8 Suggested implementation order

If a later module authorizes implementation:

1. Ratify operation scope, deletion behavior, ordering, authorship, whitespace,
   body format, response shape, and OpenAPI tag.
2. Finalize the request/response and error contract, then finalize only tests
   that assert those decisions.
3. Add request/response models in `app/models.py`.
4. Add isolated comment storage, reset behavior, and the selected deletion rule
   in `app/storage.py`.
5. Add the approved nested routes in `app/main.py`.
6. Run focused comment tests and the complete existing regression suite.
7. Add the approved on-demand comments UI in `frontend/index.html`.
8. Manually verify create/list behavior, task isolation, validation failures,
   loading/empty/error states, network failures, and approved lifecycle behavior.
9. Update documentation using observed results only.

## 5. Section critique and final grades

| Section | Final label | Evidence | Minimal correction approved |
|---|---|---|---|
| Data Model | **Right** | Correct placement and existing Pydantic, extra-field, UUID, UTC, and Python 3.9 patterns | Label whitespace, body preservation, naming, and separate storage as proposed decisions |
| API Routes | **Missing** | Nested routes fit the inline task-route style, but operation scope, ordering, missing-parent list behavior, and tag choice were presented before approval | Keep the two routes as a proposed minimum and retain lifecycle/error/order decisions as open |
| Tests | **Needs-Resequencing** | Names and fixtures are grounded, but some tests encoded ordering, cascade, whitespace, and response-shape choices before those contracts were ratified | Ratify contracts first; then finalize decision-dependent tests and separate/parameterize server-owned-field cases |
| Frontend Changes | **Right** | Correct single-file location, card action area, modal error behavior, and safe text rendering pattern | Label the separate dialog, on-demand loading, plain text, and no-count behavior as recommendations |
| Migration Notes | **Right** | Correct in-memory/no-migration/storage-reset evidence | Replace transactional wording with “same delete operation” and label future database notes speculative |
| Open Questions | **Right** | Contains genuine unresolved product, data, identity, ordering, and rendering decisions | Keep unresolved until the implementation scope is authorized |
| Suggested Implementation Order | **Right** | Begins with decisions and contracts, then backend, verification, frontend, browser evidence, and documentation | State that every implementation step requires later authorization |

## 6. Generic versus repository-grounded comparison

- **Biggest difference:** The generic plan lists possible architectures and assumptions, while the grounded plan identifies the actual model, route, storage, fixture, and single-file frontend conventions.
- **Plan I would hand to a teammate and why:** I would hand over the corrected repository-grounded plan because it is actionable in this codebase and clearly separates observed facts from unapproved product decisions.
- **Task where generic chat is enough:** Generic chat is sufficient for early requirements discovery and identifying open questions before repository-specific design begins.

## 7. Assumptions still to verify

- The operation scope and immutability decision.
- Whitespace normalization and length-boundary semantics.
- Missing-parent behavior for comment listing.
- Comment ordering.
- Task-deletion behavior.
- Free-text authorship versus future authenticated identity.
- Plain-text versus formatted content.
- Separate responses versus counts or embedding.
- `tasks` versus `comments` OpenAPI tag.
- Whether future scale requires pagination or indexed retrieval.

## 8. Non-implementation confirmation

- No application models were added.
- No routes were added.
- No storage collection was added.
- No tests were added.
- No frontend controls were added.
- No migration was performed.
- No dependency or configuration was changed.
- Browser verification: **NOT RUN — planning-only phase**.
- Application test suite: **NOT RUN — documentation-only change**.
