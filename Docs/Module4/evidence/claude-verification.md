# Claude Project Understanding Verification

Two project questions answered from source, then verified by opening the cited files
(and cross-checked against the live `/openapi.json` during Phase 0). Date: 2026-07-17.
Branch `module-4-devops` @ `e1cc640`.

## Question 1 — Status transitions

### Answer summary

- Valid statuses: `ToDo`, `InProgress`, `Done`.
- Allowed transitions: `ToDo→InProgress`, `InProgress→Done`, `Done→InProgress`.
- Everything else — including same→same (e.g. `ToDo→ToDo`) and unknown values — is rejected.
- Rejection is **HTTP 422** with a `detail` string listing the allowed transitions.
- The rule is enforced in `validate_status_transition`, called from `patch_task` **only when the update includes a `status`**; a missing task is caught first as **404**.

### Files checked

- [app/business_rules.py:7-21](../../../app/business_rules.py#L7-L21) — `VALID_TRANSITIONS` frozenset + 422 raise.
- [app/main.py:58-69](../../../app/main.py#L58-L69) — `patch_task` calls `validate_status_transition` after a 404 existence check.
- [app/models.py:10-13](../../../app/models.py#L10-L13) — `TaskStatus` enum values.
- [tests/test_tasks.py:100-134](../../../tests/test_tasks.py#L100-L134) — transition matrix tests.

### Verified facts

- The three allowed pairs match `VALID_TRANSITIONS` exactly.
- Same→same is invalid: `test_patch_same_status_returns_422` (line 125) passes.
- Unknown status value rejected & state unchanged: `test_patch_unsupported_status_value_returns_422` (line 130).
- `InProgress→ToDo` rejected with matching detail: `test_patch_transition_inprogress_to_todo_rejected` (line 118).
- 404-before-422 ordering for a missing id with status: `test_patch_nonexistent_id_with_status_returns_404_not_500` (line 94).

### Errors or unsupported claims

- None.

### Corrections

- None required.

### Final judgment

**Accurate.**

---

## Question 2 — Routes and status codes

### Answer summary

| Method | Path | Request model | Response / body | Success | Errors | Source | Test |
|---|---|---|---|---|---|---|---|
| GET | `/health` | — | `{status, timestamp}` | 200 | — | [health.py:18](../../../app/api/routes/health.py#L18) | [test_health.py](../../../tests/test_health.py) |
| POST | `/tasks` | `TaskCreate` | `TaskResponse` | **201** | 422 validation | [main.py:40](../../../app/main.py#L40) | test_tasks.py:1 |
| GET | `/tasks` | query `status`,`priority` | `list[TaskResponse]` | 200 | 422 bad enum | [main.py:45](../../../app/main.py#L45) | test_tasks.py:44-64 |
| GET | `/tasks/{task_id}` | — | `TaskResponse` | 200 | 404 | [main.py:50](../../../app/main.py#L50) | test_tasks.py:67-76 |
| PATCH | `/tasks/{task_id}` | `TaskUpdate` | `TaskResponse` | 200 | 404, **422** invalid transition | [main.py:58](../../../app/main.py#L58) | test_tasks.py:79-148 |
| DELETE | `/tasks/{task_id}` | — | empty | **204** | 404 | [main.py:72](../../../app/main.py#L72) | test_tasks.py:151-159 |

### Files checked

- [app/main.py](../../../app/main.py) — route declarations, `status_code=` args, `HTTPException` codes.
- [app/api/routes/health.py](../../../app/api/routes/health.py) — health route + `HealthResponse`.
- [app/models.py](../../../app/models.py) — `TaskCreate`/`TaskUpdate`/`TaskResponse`, `extra="forbid"`.
- [tests/test_tasks.py](../../../tests/test_tasks.py) — per-route status assertions.

### Verified facts

- `POST` returns **201** (`status.HTTP_201_CREATED`, main.py:40) — confirmed by `test_create_task_valid_returns_201_with_full_body`.
- `DELETE` returns **204** with empty body (main.py:72) — `test_delete_existing_returns_204_no_body` asserts `response.content == b""`.
- Validation errors are **422** (Pydantic `extra="forbid"` + `field_validator`), not 400 — confirmed by four `..._returns_422` create tests.
- All six paths and methods match the live `/openapi.json` captured in Phase 0.

### Errors or unsupported claims

- None.

### Corrections

- None required.

### Final judgment

**Accurate.**
