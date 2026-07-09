One endpoint verification failed.

Endpoint being tested:
[PASTE METHOD AND PATH]

Command or Swagger action:
[PASTE COMMAND OR DESCRIPTION]

Expected result:
[PASTE EXPECTED STATUS/BODY]

Actual result:
[PASTE ACTUAL STATUS/BODY]

Relevant files:
@app/main.py
@app/models.py
@app/storage.py

Fix only the route responsible for this endpoint unless the failure clearly proves a model or storage issue.

Constraints:
- Preserve the existing FastAPI app instance.
- Preserve all other routes.
- Use the existing storage helper names.
- Use Pydantic/FastAPI validation instead of manual validation for request bodies and enum values.
- DO NOT add try/except as a workaround.

Output only the changed route function and any imports that must be added.

