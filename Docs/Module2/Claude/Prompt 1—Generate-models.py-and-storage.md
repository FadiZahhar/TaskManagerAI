You are a senior Python backend engineer. Generate TWO files for a FastAPI Task Tracker REST API.

Context:
- This project currently has a working /health endpoint from Module 1.
- This module uses in-memory storage only.
- Optional context from Module 1 user stories:
[OPTIONAL: PASTE 2-3 RELEVANT USER STORIES HERE. Treat them as context only; do not change the required Module 2 model spec.]

============================================================
FILE 1 - app/models.py
============================================================

Use Pydantic v2 syntax only.

Define these enums:
- TaskStatus(str, Enum): TODO = "ToDo", IN_PROGRESS = "InProgress", DONE = "Done"
- TaskPriority(str, Enum): LOW = "Low", MEDIUM = "Medium", HIGH = "High"

Define these models:

1. TaskCreate
- model_config = ConfigDict(extra="forbid")
- title: str, required, 1..200 characters after strip
- description: Optional[str] = ""
- status: TaskStatus = TaskStatus.TODO
- priority: TaskPriority = TaskPriority.MEDIUM
- assignee: Optional[str] = None
- Include a field_validator for title that strips whitespace, rejects blank titles, and rejects titles over 200 characters.

2. TaskUpdate
- model_config = ConfigDict(extra="forbid")
- all editable fields optional: title, description, status, priority, assignee
- use the same title validator behavior only when title is provided.
- DO NOT include id, created_at, or updated_at.

3. TaskResponse
- model_config = ConfigDict(extra="forbid")
- id: str
- title: str
- description: str
- status: TaskStatus
- priority: TaskPriority
- assignee: Optional[str]
- created_at: datetime
- updated_at: datetime

============================================================
FILE 2 - app/storage.py
============================================================

Use an in-memory module-level dictionary:
_tasks: dict[str, TaskResponse] = {}

Define exactly these functions:
- add_task(payload: TaskCreate) -> TaskResponse
- get_all_tasks(status=None, priority=None) -> list[TaskResponse]
- get_task_by_id(task_id: str) -> Optional[TaskResponse]
- update_task(task_id: str, payload: TaskUpdate) -> Optional[TaskResponse]
  - use payload.model_dump(exclude_unset=True)
  - update updated_at when a task changes
- delete_task(task_id: str) -> bool
- _reset() -> None
  - clears _tasks for tests only

HARD CONSTRAINTS:
- DO NOT use SQLAlchemy, SQLModel, Alembic, a database, or an ORM.
- DO NOT use Pydantic v1 syntax: no @validator, no class Config, no .dict().
- DO NOT include id, created_at, or updated_at in TaskCreate or TaskUpdate.
- DO NOT add print or logging statements.
- DO NOT create API routes in this step.
- DO NOT wrap the answer in long explanation.

Output only two code blocks, each preceded by:
# FILE: app/models.py
# FILE: app/storage.py


After this, run:
python -m tests.verify_a

or at least run an import check: bash
python -c "from app.models import TaskCreate, TaskUpdate, TaskResponse, TaskStatus, TaskPriority; from app.storage import add_task, get_all_tasks, get_task_by_id, update_task, delete_task, _reset; print('imports ok')"