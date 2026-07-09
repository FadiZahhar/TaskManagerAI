You are a senior Python developer writing pytest tests for a FastAPI app.

Context files:
@app/main.py
@app/models.py
@app/storage.py
@app/business_rules.py

Generate TWO files. Output only two code blocks, each preceded by:
# FILE: tests/conftest.py
# FILE: tests/test_tasks.py

============================================================
FILE 1 - tests/conftest.py
============================================================

Use:
- pytest
- fastapi.testclient.TestClient
- app.main import app
- app import storage

Fixtures:
1. _reset_storage autouse fixture
   - calls storage._reset() before and after each test
2. client fixture
   - returns TestClient(app)
3. created_task fixture
   - posts {"title": "fixture task"}
   - asserts status_code == 201
   - returns response JSON

============================================================
FILE 2 - tests/test_tasks.py
============================================================

Generate these named tests:

POST /tasks:
- test_create_task_valid_returns_201_with_full_body
- test_create_task_missing_title_returns_422
- test_create_task_blank_title_returns_422
- test_create_task_invalid_priority_returns_422
- test_create_task_unknown_field_returns_422

GET /tasks:
- test_list_tasks_empty_returns_200_and_empty_list
- test_list_tasks_filter_by_status_no_match_returns_200_and_empty_list
- test_list_tasks_filter_by_priority_returns_only_matches

GET /tasks/{id}:
- test_get_task_by_id_returns_task
- test_get_task_by_id_not_found_returns_404_with_detail

PATCH /tasks/{id}:
- test_patch_partial_update_keeps_other_fields
- test_patch_not_found_returns_404
- test_patch_valid_transition_todo_to_inprogress_returns_200
- test_patch_invalid_transition_todo_to_done_returns_422
- test_patch_same_status_returns_422

DELETE /tasks/{id}:
- test_delete_existing_returns_204_no_body
- test_delete_missing_returns_404

Hard constraints:
- Use TestClient only. Do not use AsyncClient.
- Do not mock storage. Use the real in-memory storage with the reset fixture.
- Do not call r.json() on a 204 response; assert r.content == b"".
- Do not skip or rename the listed tests.
- Do not add tests unrelated to Module 2.
- Use the exact route paths from the app.

Output only the two files.


run bash test
pytest