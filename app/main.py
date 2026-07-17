"""Task Tracker API — application entrypoint (Module 1).

Only a health check is wired up here. Task CRUD, storage, and models are
intentionally left for later modules. Routes are registered from router
modules rather than defined inline.
"""

from typing import Optional

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import health
from app.business_rules import validate_status_transition
from app.models import TaskCreate, TaskPriority, TaskResponse, TaskStatus, TaskUpdate
from app import storage

app = FastAPI(
    title="Task Tracker API",
    description=(
        "Minimal Module 1 skeleton. Exposes a health check and Swagger docs; "
        "task CRUD arrives in later modules."
    ),
    version="0.1.0",
)

# Module 3 frontend (frontend/index.html) is served locally on a different
# origin than this API. Restricted to the actual local dev origins used to
# serve it; no wildcard.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500", "http://localhost:5500"],
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Content-Type"],
)

app.include_router(health.router)


@app.post("/tasks", response_model=TaskResponse, status_code=status.HTTP_201_CREATED, tags=["tasks"])
def create_task(payload: TaskCreate) -> TaskResponse:
    """Create a task and return it.

    Args:
        payload: The task fields to create; ``title`` is required.

    Returns:
        The created task (HTTP 201).
    """
    return storage.add_task(payload)


@app.get("/tasks", response_model=list[TaskResponse], tags=["tasks"])
def list_tasks(status: Optional[TaskStatus] = None, priority: Optional[TaskPriority] = None) -> list[TaskResponse]:
    """List tasks, optionally filtered.

    Args:
        status: If given, keep only tasks with this status.
        priority: If given, keep only tasks with this priority.

    Returns:
        Matching tasks (HTTP 200); ``[]`` when none match. Filters combine with AND.
    """
    return storage.get_all_tasks(status=status, priority=priority)


@app.get("/tasks/{task_id}", response_model=TaskResponse, tags=["tasks"])
def get_task(task_id: str) -> TaskResponse:
    """Return a single task by id.

    Args:
        task_id: Identifier of the task to fetch.

    Returns:
        The task (HTTP 200).

    Raises:
        HTTPException: 404 if no task has this id.
    """
    task = storage.get_task_by_id(task_id)
    if task is None:
        raise HTTPException(status_code=404, detail=f"Task with id {task_id} not found")
    return task


@app.patch("/tasks/{task_id}", response_model=TaskResponse, tags=["tasks"])
def patch_task(task_id: str, payload: TaskUpdate) -> TaskResponse:
    """Partially update a task.

    Only the fields present in ``payload`` are changed; omitted fields are left
    as-is. A requested status change is validated against the allowed
    transitions before it is applied.

    Args:
        task_id: Identifier of the task to update.
        payload: Fields to change; any omitted field is left unchanged.

    Returns:
        The updated task (HTTP 200).

    Raises:
        HTTPException: 404 if the task does not exist; 422 if a requested
            status transition is not allowed.
    """
    if payload.status is not None:
        existing = storage.get_task_by_id(task_id)
        if existing is None:
            raise HTTPException(status_code=404, detail=f"Task with id {task_id} not found")
        validate_status_transition(existing.status, payload.status)

    updated = storage.update_task(task_id, payload)
    if updated is None:
        raise HTTPException(status_code=404, detail=f"Task with id {task_id} not found")
    return updated


@app.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["tasks"])
def delete_task(task_id: str) -> None:
    """Delete a task by id.

    Args:
        task_id: Identifier of the task to delete.

    Returns:
        Nothing; responds with HTTP 204 (no body) on success.

    Raises:
        HTTPException: 404 if no task has this id.
    """
    deleted = storage.delete_task(task_id)
    if not deleted:
        raise HTTPException(status_code=404, detail=f"Task with id {task_id} not found")
