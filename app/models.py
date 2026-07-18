"""Pydantic models for the Task domain (Module 2)."""

from datetime import date, datetime, timezone
from enum import Enum
from typing import Optional

from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
    computed_field,
    field_validator,
    model_validator,
)

# Field length bounds. `title` keeps its original 200-char cap; `description`
# and `assignee` were previously unbounded (security finding S3).
TITLE_MAX_LENGTH = 200
DESCRIPTION_MAX_LENGTH = 2000
ASSIGNEE_MAX_LENGTH = 100


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
    description: Optional[str] = Field(default="", max_length=DESCRIPTION_MAX_LENGTH)
    status: TaskStatus = TaskStatus.TODO
    priority: TaskPriority = TaskPriority.MEDIUM
    assignee: Optional[str] = Field(default=None, max_length=ASSIGNEE_MAX_LENGTH)
    due_date: Optional[date] = None

    @field_validator("title")
    @classmethod
    def validate_title(cls, value: str) -> str:
        stripped = value.strip()
        if not stripped:
            raise ValueError("title must not be blank")
        if len(stripped) > TITLE_MAX_LENGTH:
            raise ValueError(f"title must be {TITLE_MAX_LENGTH} characters or fewer")
        return stripped


class TaskUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: Optional[str] = None
    description: Optional[str] = Field(default=None, max_length=DESCRIPTION_MAX_LENGTH)
    status: Optional[TaskStatus] = None
    priority: Optional[TaskPriority] = None
    assignee: Optional[str] = Field(default=None, max_length=ASSIGNEE_MAX_LENGTH)
    due_date: Optional[date] = None

    @model_validator(mode="before")
    @classmethod
    def _reject_explicit_null(cls, data: object) -> object:
        # An explicit JSON null for a non-nullable field would otherwise be
        # written into storage without re-validation and corrupt the task —
        # turning a later list/search/transition into a 500 (findings S1/S2).
        # Reject it with a 422. `assignee` and `due_date` stay nullable, so an
        # explicit null still clears them.
        if isinstance(data, dict):
            nulled = [
                field
                for field in ("title", "description", "status", "priority")
                if field in data and data[field] is None
            ]
            if nulled:
                raise ValueError(
                    "these fields may not be null: " + ", ".join(sorted(nulled))
                )
        return data

    @field_validator("title")
    @classmethod
    def validate_title(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value
        stripped = value.strip()
        if not stripped:
            raise ValueError("title must not be blank")
        if len(stripped) > TITLE_MAX_LENGTH:
            raise ValueError(f"title must be {TITLE_MAX_LENGTH} characters or fewer")
        return stripped


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
