You are a senior Python backend engineer. Add ONE route to my existing FastAPI app.

Context files:
@app/main.py
@app/models.py
@app/storage.py

Generate ONLY the DELETE /tasks/{task_id} route.

Exact specification:
- Route: DELETE /tasks/{task_id}
- Decorator status_code: status.HTTP_204_NO_CONTENT
- Tags: ["tasks"]
- Behavior:
  - call storage.delete_task(task_id)
  - if True, return an empty 204 response
  - if False, raise HTTPException with status_code=404 and detail="Task with id {task_id} not found"

Imports to add only if missing:
from fastapi import HTTPException, status
from app import storage

DO NOT:
- DO NOT return a JSON body on success.
- DO NOT call r.json() in verification for a 204 response.
- DO NOT modify other routes.
- DO NOT create a new FastAPI() instance.

Output only the imports to add and the new route function in one code block.

Expected success: 204 No Content with empty body.