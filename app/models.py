"""Pydantic models for the Task domain (Module 2)."""

from datetime import date, datetime, timezone
from enum import Enum
from typing import Optional

from pydantic import BaseModel, ConfigDict, computed_field, field_validator


class TaskStatus(str, Enum):
    TODO = "ToDo"
    IN_PROGRESS = "InProgress"
    DONE = "Done"


class TaskPriority(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"


def is_overdue(due_date: Optional[date], status: TaskStatus, today: date) -> bool:
    """Single source of truth for overdue semantics (see ADR-2).

    Overdue means the task has a due date strictly before ``today`` and is not
    completed. A task due today is not overdue; a Done task is never overdue.
    """
    if due_date is None or status == TaskStatus.DONE:
        return False
    return due_date < today


class TaskCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: str
    description: Optional[str] = ""
    status: TaskStatus = TaskStatus.TODO
    priority: TaskPriority = TaskPriority.MEDIUM
    assignee: Optional[str] = None
    due_date: Optional[date] = None

    @field_validator("title")
    @classmethod
    def validate_title(cls, value: str) -> str:
        stripped = value.strip()
        if not stripped:
            raise ValueError("title must not be blank")
        if len(stripped) > 200:
            raise ValueError("title must be 200 characters or fewer")
        return stripped

    @field_validator("title", "description", "status", "priority")
    @classmethod
    def reject_explicit_null(cls, value: object) -> object:
        # These four fields must never be sent as an explicit JSON ``null``. An
        # omitted field keeps its model default (validators are skipped for
        # defaults), so create defaults still apply; a field supplied as ``null``
        # reaches this validator and is rejected with HTTP 422.
        if value is None:
            raise ValueError("must not be null")
        return value


class TaskUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None
    priority: Optional[TaskPriority] = None
    assignee: Optional[str] = None
    due_date: Optional[date] = None

    @field_validator("title")
    @classmethod
    def validate_title(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value
        stripped = value.strip()
        if not stripped:
            raise ValueError("title must not be blank")
        if len(stripped) > 200:
            raise ValueError("title must be 200 characters or fewer")
        return stripped

    @field_validator("title", "description", "status", "priority")
    @classmethod
    def reject_explicit_null(cls, value: object) -> object:
        # Partial updates may OMIT a field (it stays unchanged: the default
        # ``None`` skips validators and is dropped by ``exclude_unset``). But
        # explicitly sending ``null`` for one of these four fields reaches this
        # validator and is rejected with HTTP 422 instead of corrupting the
        # stored task. ``assignee`` and ``due_date`` are intentionally excluded:
        # a null there legitimately clears the value.
        if value is None:
            raise ValueError("must not be null; omit the field to leave it unchanged")
        return value


class TaskResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str
    title: str
    description: str
    status: TaskStatus
    priority: TaskPriority
    assignee: Optional[str]
    due_date: Optional[date] = None
    created_at: datetime
    updated_at: datetime

    @computed_field  # type: ignore[prop-decorator]
    @property
    def overdue(self) -> bool:
        """Derived overdue flag (ADR-2); never stored, computed per response."""
        return is_overdue(self.due_date, self.status, datetime.now(timezone.utc).date())
