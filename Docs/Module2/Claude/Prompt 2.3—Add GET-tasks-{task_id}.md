You are a senior Python backend engineer. Add ONE route to my existing FastAPI app.

Context files:
@app/main.py
@app/models.py
@app/storage.py

Generate ONLY the GET /tasks/{task_id} route.

Exact specification:
- Route: GET /tasks/{task_id}
- Tags: ["tasks"]
- Response model: TaskResponse
- Behavior:
  - call storage.get_task_by_id(task_id)
  - if found, return the task
  - if missing, raise HTTPException with status_code=404 and detail="Task with id {task_id} not found"

Imports to add only if missing:
from fastapi import HTTPException
from app.models import TaskResponse
from app import storage

DO NOT:
- DO NOT wrap the storage call in try/except.
- DO NOT return None for a missing task.
- DO NOT create a new FastAPI() instance.
- DO NOT modify other routes.

Output only the imports to add and the new route function in one code block.

Verify missing ID: batch
curl -i http://127.0.0.1:8000/tasks/not-real-id

Expected: 404 Not Found.

