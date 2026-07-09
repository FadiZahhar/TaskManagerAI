Add status-transition validation to my existing PATCH /tasks/{task_id} route.

Context files:
@app/main.py
@app/models.py
@app/storage.py

Create a new module and modify only the existing PATCH route.

============================================================
FILE 1 - app/business_rules.py
============================================================

Use these imports:
from fastapi import HTTPException, status
from app.models import TaskStatus

Create this constant:
VALID_TRANSITIONS: frozenset[tuple[TaskStatus, TaskStatus]] = frozenset({
    (TaskStatus.TODO, TaskStatus.IN_PROGRESS),
    (TaskStatus.IN_PROGRESS, TaskStatus.DONE),
    (TaskStatus.DONE, TaskStatus.IN_PROGRESS),
})

Create this function:
def validate_status_transition(current: TaskStatus, new: TaskStatus) -> None:
    # Same -> same is invalid. Anything not in VALID_TRANSITIONS is invalid.
    if (current, new) not in VALID_TRANSITIONS:
        allowed = sorted({f"{f.value}->{t.value}" for f, t in VALID_TRANSITIONS})
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Invalid status transition from {current.value} to {new.value}. Allowed transitions: {allowed}",
        )

============================================================
FILE 2 - app/main.py
============================================================

Modify the existing PATCH /tasks/{task_id} route only.

Add this import if missing:
from app.business_rules import validate_status_transition

PATCH behavior:
1. If payload.status is None, skip transition validation and allow other partial updates.
2. If payload.status is provided:
   a. Get the existing task with storage.get_task_by_id(task_id).
   b. If it does not exist, raise the existing 404 behavior.
   c. Call validate_status_transition(existing.status, payload.status).
3. Then call storage.update_task(task_id, payload) and return the updated task.

DO NOT:
- DO NOT validate only whether the new status is a valid enum. The rule depends on the (current, new) pair.
- DO NOT allow ToDo -> Done, Done -> ToDo, or same -> same.
- DO NOT validate when payload.status is None.
- DO NOT inline the rules with if/elif chains; use the frozenset.
- DO NOT modify POST, GET, or DELETE routes.

Output two code blocks:
# FILE: app/business_rules.py
# PATCH ROUTE ONLY FROM app/main.py

