"""
Domain schemas for the Task Tracker.

These are defined now so the shape of a Task is agreed early, but they are
NOT yet used by any endpoint. Wiring them into CRUD routes is deferred to a
later module (per Module 1 scope: no full CRUD yet).
"""

from enum import Enum

from pydantic import BaseModel, Field


class Status(str, Enum):
    """Allowed lifecycle states for a task."""

    todo = "ToDo"
    in_progress = "InProgress"
    done = "Done"


class Priority(str, Enum):
    """Allowed priority levels for a task."""

    low = "Low"
    medium = "Medium"
    high = "High"


class Task(BaseModel):
    """A single task in the tracker."""

    id: int = Field(..., description="Unique identifier for the task.")
    title: str = Field(..., description="Short, human-readable task title.")
    description: str | None = Field(
        None, description="Optional longer description of the work."
    )
    status: Status = Field(Status.todo, description="Current lifecycle state.")
    priority: Priority = Field(Priority.medium, description="Relative importance.")
    assignee: str | None = Field(
        None, description="Name or handle of the person responsible."
    )
