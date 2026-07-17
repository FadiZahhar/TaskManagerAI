# Documentation Claim-vs-Reality Log

Verified on 2026-07-17, branch `module-4-devops`, against source + the live OpenAPI schema.
Documentation change was **behavior-neutral**: `git diff app/` = 93 insertions, 0 logic changes
(docstrings only); `pytest` → 25 passed before and after.

| ID | Documentation claim | Source checked | Actual behavior | Classification | Resolution |
|---|---|---|---|---|---|
| 1 | `POST /tasks` returns **201** (create_task docstring + README) | [app/main.py:40](../../../app/main.py#L40) `status_code=HTTP_201_CREATED`; test_tasks.py:12 | 201 on valid create | Accurate | none |
| 2 | `DELETE /tasks/{id}` returns **204** with no body | [app/main.py:72](../../../app/main.py#L72); test_tasks.py:151-154 (`content == b""`) | 204, empty body | Accurate | none |
| 3 | Invalid status transition → **422** | [app/business_rules.py:16-21](../../../app/business_rules.py#L16-L21); test_tasks.py:113 | 422 with allowed-transitions detail | Accurate | none |
| 4 | Validation errors (unknown field, bad enum, blank title) → **422** | [app/models.py](../../../app/models.py) `extra="forbid"` + validators; test_tasks.py:24-41 | 422 | Accurate | none |
| 5 | App is **API-only**; frontend served separately (README Docker section) | no `StaticFiles` mount in `app/`; Docker image `/app` has no `frontend/` | container serves API, not UI | Accurate | none |
| 6 | CI uses **Python 3.9** (README CI section) | [.github/workflows/ci.yml](../../../.github/workflows/ci.yml) `python-version: "3.9"` | 3.9 | Accurate | none |

## Docstrings manually verified

### Function or route 1 — create data
- **File / Handler:** `app/main.py` / `create_task`
- **Claims checked:** "Create a task and return it"; "`title` is required"; "HTTP 201".
- **Result:** Accurate — `status_code=HTTP_201_CREATED`; `title` required by `TaskCreate`; returns `storage.add_task(payload)`.
- **Corrections:** none.

### Function or route 2 — update / status change
- **File / Handler:** `app/main.py` / `patch_task`
- **Claims checked:** "only present fields change"; "404 if missing"; "422 if transition not allowed".
- **Result:** Accurate — `model_dump(exclude_unset=True)` in storage; 404 raised for missing id (checked before and by `update_task`); `validate_status_transition` raises 422.
- **Corrections:** none.

### Function or route 3 — error behavior
- **File / Handler:** `app/main.py` / `delete_task`
- **Claims checked:** "204 (no body) on success"; "404 if no task has this id".
- **Result:** Accurate — `status_code=HTTP_204_NO_CONTENT`; raises 404 when `storage.delete_task` returns `False`.
- **Corrections:** none.

## `/docs` comparison

Generated from `app.openapi()` (what Swagger renders), post-edit:

| Method | Path | Declared responses |
|---|---|---|
| GET | `/health` | 200 |
| POST | `/tasks` | 201, 422 |
| GET | `/tasks` | 200, 422 |
| GET | `/tasks/{task_id}` | 200, 422 |
| PATCH | `/tasks/{task_id}` | 200, 422 |
| DELETE | `/tasks/{task_id}` | 204, 422 |

- **Routes compared:** all 6 — match source and the Phase 0 baseline.
- **Schema mismatches found:** none.
- **Status-code mismatches found:** none. (Runtime 404s from `HTTPException` are documented in docstrings but, as expected, are not auto-listed by FastAPI in the OpenAPI `responses`.)
- **Corrections made:** none needed.

## README clean-run check

Verified by re-running commands in this working tree (not a fresh clone):

- **Setup command worked:** Yes — `python3 -m venv .venv` + `pip install -r requirements.txt`.
- **Test command worked:** Yes — `pytest` → 25 passed.
- **Run command worked:** Yes — verified in Phase 0 (`/health` 200, `/docs` 200).
- **Docker instructions worked:** Yes — `docker build` + `docker run` + `/health` 200 + `whoami` → `app` (Phase 3).
- **Problems found and corrected:** README previously claimed "no Docker/deployment configuration" in Known limitations — corrected, since a `Dockerfile` now exists.
- **Fresh-clone run (guide Step 4.8):** **NOT RUN** — not executed in a separate clone directory this session.
