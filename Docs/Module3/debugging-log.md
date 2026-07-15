# Module 3 Debugging Log

## Entry 1 — Deliberate-breakage proof: `test_patch_transition_inprogress_to_done_returns_200`

**1. Bug or failure**
Deliberate breakage exercise (not a real bug): temporarily removed
`(TaskStatus.IN_PROGRESS, TaskStatus.DONE)` from `VALID_TRANSITIONS` in
`app/business_rules.py` to prove the new X11 test actually exercises the
transition rule rather than passing vacuously.

**2. Evidence**
- Action performed: `PATCH /tasks/{id}` with `{"status": "InProgress"}`, then
  `PATCH /tasks/{id}` with `{"status": "Done"}` on the same task.
- Failing test: `tests/test_tasks.py::test_patch_transition_inprogress_to_done_returns_200`
- Status code: `422` (expected `200`)
- Response body / traceback line: `AssertionError: assert 422 == 200` at
  `tests/test_tasks.py:103`, with pytest showing `<Response [422 Unprocessable
  Entity]>.status_code`
- Relevant request URL and method: `PATCH /tasks/{task_id}`

**3. AI diagnosis**
Root cause (deliberately introduced): removing the `(IN_PROGRESS, DONE)` pair
from the `VALID_TRANSITIONS` frozenset in `app/business_rules.py` makes
`validate_status_transition` treat that transition as disallowed, so the
route raises 422 instead of applying the update. No fix proposed — this was
a controlled, temporary mutation for test verification, immediately reverted.

**4. Decision**
`ACCEPTED` (as a successful breakage proof, not as a real fix) — the test
failed for the exact expected semantic reason (transition wrongly rejected),
not from a crash, import error, or fixture/setup problem. This confirms the
test genuinely protects the `InProgress → Done` transition rule rather than
passing regardless of source correctness.

**Verification after the decision**
- Targeted check: `pytest -k test_patch_transition_inprogress_to_done_returns_200 -v` → PASS (after restoring `app/business_rules.py` to its exact original content)
- Full suite: `pytest -q` → 20 passed
- Browser contract item(s): N/A (backend-only test, no frontend behavior touched)
- Restoration proof: `git diff app/business_rules.py` → empty (file matches its last committed state exactly)

## Entry 2 — Deliberate-breakage proof: `test_patch_transition_inprogress_to_todo_rejected`

**1. Bug or failure**
Deliberate breakage exercise: temporarily added
`(TaskStatus.IN_PROGRESS, TaskStatus.TODO)` to `VALID_TRANSITIONS` in
`app/business_rules.py`, which should wrongly legalize a transition the
business rule is supposed to forbid.

**2. Evidence**
- Action performed: `PATCH` status→`InProgress`, then `PATCH` status→`ToDo` on the same task.
- Failing test: `tests/test_tasks.py::test_patch_transition_inprogress_to_todo_rejected`
- Status code: `200` (expected `422`)
- Response body / traceback line: `AssertionError: assert 200 == 422`
- Relevant request URL and method: `PATCH /tasks/{task_id}`

**3. AI diagnosis**
Root cause (deliberately introduced): adding the `(IN_PROGRESS, TODO)` pair
to `VALID_TRANSITIONS` makes `validate_status_transition` accept a reverse
transition that should be rejected. No fix proposed — controlled temporary
mutation, immediately reverted.

**4. Decision**
`ACCEPTED` — failed for the exact expected semantic reason (transition
wrongly allowed), not a crash or setup issue.

**Verification after the decision**
- Targeted check: PASS after restoring `app/business_rules.py`
- Restoration proof: `git diff app/business_rules.py` → empty

## Entry 3 — Deliberate-breakage proof: `test_patch_nonexistent_id_with_status_returns_404_not_500`

**1. Bug or failure**
Deliberate breakage exercise: removed the inner
`if existing is None: raise HTTPException(404, ...)` check inside the
`if payload.status is not None:` branch of `patch_task` (`app/main.py`).

**2. Evidence**
- Action performed: `PATCH /tasks/not-real-id` with `{"status": "Done"}`.
- Failing test: `tests/test_tasks.py::test_patch_nonexistent_id_with_status_returns_404_not_500`
- Status code: unhandled exception (test never got a response to assert on)
- Response body / traceback line: `AttributeError: 'NoneType' object has no attribute 'status'` at `app/main.py:62`, inside `validate_status_transition(existing.status, payload.status)`
- Relevant request URL and method: `PATCH /tasks/{task_id}`

**3. AI diagnosis**
Root cause (deliberately introduced): without the existence check,
`storage.get_task_by_id` returning `None` for an unknown id flows straight
into `validate_status_transition`, which unconditionally accesses
`current.status` — a hard crash rather than a clean 404. No fix proposed —
controlled temporary mutation, immediately reverted.

**4. Decision**
`ACCEPTED` — this is the most significant proof in this batch: it shows the
test protects against an actual unhandled 500 crash, not merely a wrong
status code. The failure trace clearly attributes the crash to the missing
existence check, not to test setup/fixtures.

**Verification after the decision**
- Targeted check: PASS after restoring `app/main.py`
- Restoration proof: `git diff app/main.py` → only the pre-existing X5 CORS diff remains; no trace of this mutation

## Entry 4 — Deliberate-breakage proof: `test_patch_unsupported_status_value_returns_422`

**1. Bug or failure**
Deliberate breakage exercise: widened `TaskUpdate.status` from
`Optional[TaskStatus]` to `Optional[str]` in `app/models.py`.

**2. Evidence**
- Action performed: `PATCH /tasks/{id}` with `{"status": "Archived"}`.
- Failing test: `tests/test_tasks.py::test_patch_unsupported_status_value_returns_422`
- Status code: unhandled exception (not the predicted 200 pass-through)
- Response body / traceback line: `AttributeError: 'str' object has no attribute 'value'` at `app/business_rules.py:20`, while building the rejection message's `new.value`
- Relevant request URL and method: `PATCH /tasks/{task_id}`

**3. AI diagnosis**
Root cause (deliberately introduced): with `status` typed as a bare `str`,
Pydantic no longer coerces/validates `"Archived"` into a `TaskStatus`
member, so it reaches `validate_status_transition` as a raw string;
`(current, new) not in VALID_TRANSITIONS` still correctly evaluates true,
but the error-message builder assumes `new` is a `TaskStatus` and calls
`.value` on it, crashing. The failure mode differed from the initial
prediction (a crash instead of a silent 200), but is still directly and
correctly attributable to the mutation. No fix proposed — controlled
temporary mutation, immediately reverted.

**4. Decision**
`ACCEPTED` — the test still fails for a reason directly caused by the
mutation (not import/setup damage), even though the specific failure mode
differed from the initial one-line prediction. Noted honestly rather than
silently claiming the prediction was exact.

**Verification after the decision**
- Targeted check: PASS after restoring `app/models.py`
- Restoration proof: `git diff app/models.py` → empty

## Entry 5 — Deliberate-breakage proof: `test_patch_invalid_priority_returns_422`

**1. Bug or failure**
Deliberate breakage exercise: widened `TaskUpdate.priority` from
`Optional[TaskPriority]` to `Optional[str]` in `app/models.py`.

**2. Evidence**
- Action performed: `PATCH /tasks/{id}` with `{"priority": "Urgent"}`.
- Failing test: `tests/test_tasks.py::test_patch_invalid_priority_returns_422`
- Status code: `200` (expected `422`)
- Response body / traceback line: `AssertionError: assert 200 == 422`, plus a Pydantic `UserWarning: PydanticSerializationUnexpectedValue` flagging the type mismatch
- Relevant request URL and method: `PATCH /tasks/{task_id}`

**3. AI diagnosis**
Root cause (deliberately introduced): unlike `status`, `priority` has no
downstream business-rule check — it's stored directly — so widening its
type to `str` lets an invalid value silently persist instead of being
rejected. No fix proposed — controlled temporary mutation, immediately
reverted.

**4. Decision**
`ACCEPTED` — failed for the exact expected semantic reason (invalid value
silently accepted), matching the prediction exactly this time.

**Verification after the decision**
- Targeted check: PASS after restoring `app/models.py`
- Restoration proof: `git diff app/models.py` → empty

## Entry 6 — Deliberate-breakage proof: `test_patch_empty_body_is_noop_returns_200`

**1. Bug or failure**
Deliberate breakage exercise: changed `if not updates: return existing` to
`if not updates: return None` in `app/storage.py::update_task`.

**2. Evidence**
- Action performed: `PATCH /tasks/{id}` with `{}` (empty body) on an existing task.
- Failing test: `tests/test_tasks.py::test_patch_empty_body_is_noop_returns_200`
- Status code: `404` (expected `200`)
- Response body / traceback line: `AssertionError: assert 404 == 200`
- Relevant request URL and method: `PATCH /tasks/{task_id}`

**3. AI diagnosis**
Root cause (deliberately introduced): returning `None` for a no-op update
makes the route treat a real, existing task as not found, since the route's
final check (`if updated is None: raise 404`) can't distinguish "task
missing" from "task unchanged." No fix proposed — controlled temporary
mutation, immediately reverted.

**4. Decision**
`ACCEPTED` — failed for the exact expected semantic reason (spurious 404 on
an existing task).

**Verification after the decision**
- Targeted check: PASS after restoring `app/storage.py`
- Restoration proof: `git diff app/storage.py` → empty
- Full suite after all six entries: `pytest -q` → 25 passed

---

# Reflection

- Which AI tool was used for each phase, and why?
- Which suggestion was rejected, and why?
- What evidence was most useful: diff, browser, network, console, response body, or pytest output?
- What would be added to `AGENTS.md` or `CLAUDE.md` to prevent a repeated mistake?
