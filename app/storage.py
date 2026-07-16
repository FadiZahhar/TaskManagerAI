"""In-memory task storage (Module 2)."""

import uuid
from datetime import datetime, timezone
from typing import Optional

from app.models import TaskCreate, TaskPriority, TaskResponse, TaskStatus, TaskUpdate

_tasks: dict[str, TaskResponse] = {}


def add_task(payload: TaskCreate) -> TaskResponse:
    task_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    task = TaskResponse(
        id=task_id,
        title=payload.title,
        description=payload.description or "",
        status=payload.status,
        priority=payload.priority,
        assignee=payload.assignee,
        due_date=payload.due_date,
        created_at=now,
        updated_at=now,
    )
    _tasks[task_id] = task
    return task


def get_all_tasks(
    status: Optional[TaskStatus] = None,
    priority: Optional[TaskPriority] = None,
    overdue: Optional[bool] = None,
    assignee: Optional[str] = None,
    search: Optional[str] = None,
) -> list[TaskResponse]:
    tasks = list(_tasks.values())
    if status is not None:
        tasks = [task for task in tasks if task.status == status]
    if priority is not None:
        tasks = [task for task in tasks if task.priority == priority]
    if overdue is not None:
        tasks = [task for task in tasks if task.overdue == overdue]
    # Assignee: case-insensitive exact match; a blank/whitespace value is treated
    # as omitted (no filtering). Tasks with no assignee never match a value.
    if assignee is not None:
        needle = assignee.strip().lower()
        if needle:
            tasks = [task for task in tasks if (task.assignee or "").strip().lower() == needle]
    # Search: case-insensitive substring over title and description; a blank/
    # whitespace-only term is treated as omitted (no text search).
    if search is not None:
        term = search.strip().lower()
        if term:
            tasks = [task for task in tasks if term in task.title.lower() or term in task.description.lower()]
    return tasks


def get_task_by_id(task_id: str) -> Optional[TaskResponse]:
    return _tasks.get(task_id)


def update_task(task_id: str, payload: TaskUpdate) -> Optional[TaskResponse]:
    existing = _tasks.get(task_id)
    if existing is None:
        return None
    updates = payload.model_dump(exclude_unset=True)
    if not updates:
        return existing
    updated = existing.model_copy(update=updates)
    updated.updated_at = datetime.now(timezone.utc)
    _tasks[task_id] = updated
    return updated


def delete_task(task_id: str) -> bool:
    if task_id not in _tasks:
        return False
    del _tasks[task_id]
    return True


def _reset() -> None:
    _tasks.clear()
