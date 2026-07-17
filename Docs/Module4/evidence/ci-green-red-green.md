# CI Green → Red → Green Evidence

> Run results below were **observed via the GitHub Actions API** (public repo) on 2026-07-18
> and cross-checked against locally observed `pytest` exit codes. Nothing here is fabricated.
> Actions: `https://github.com/FadiZahhar/TaskManagerAI/actions`

## Workflow

- **File:** `.github/workflows/ci.yml`
- **Python version:** `3.9`
- **Test command:** `pytest -v`
- **Push trigger:** yes (`on: push:`, all branches)
- **Pull-request trigger:** yes (`pull_request: branches: [main]`)
- **Failure-masking review:** None found (`continue-on-error` / `|| true` / `--exit-zero` → none)

## Run 1 — Initial green

- **Branch:** `module-4-devops`
- **Commit:** `f85d58d` ("Phase 2 (partial: workflow built & verified locally)")
- **Run URL:** <https://github.com/FadiZahhar/TaskManagerAI/actions/runs/29605195947>
- **Date:** 2026-07-17T18:48:36Z
- **Result (CI):** **success (green)**
- **Evidence (local):** `pytest -q` → `25 passed`, exit `0`.

## Run 2 — Intentional red

- **Proof branch:** `ci-proof-green-red-green` (cut from `module-4-devops` @ `f85d58d`)
- **Commit:** `0d49f19` ("test: intentionally break assertion for CI proof")
- **Test intentionally changed:** `tests/test_tasks.py::test_create_task_valid_returns_201_with_full_body` — assertion `== 201` → `== 200` (route actually returns `201`).
- **Actual local failure (observed):** `1 failed, 24 passed`; **pytest exit code `1`**.
- **Run URL:** <https://github.com/FadiZahhar/TaskManagerAI/actions/runs/29605365072>
- **Result (CI):** **failure (red)** — the workflow caught the broken assertion.

## Run 3 — Restored green

- **Revert commit:** `41e06a0` (`Revert "test: intentionally break assertion for CI proof"`)
- **Local test result (observed):** `25 passed`, **pytest exit code `0`**; deliberate assertion removed.
- **Run URL:** <https://github.com/FadiZahhar/TaskManagerAI/actions/runs/29605647698>
- **Result (CI):** **success (green)**
- **Workflow changed to hide failure:** No — only the test assertion was reverted; `ci.yml` unchanged.

## Branch hygiene

- Proof branch `ci-proof-green-red-green` is **NOT merged** into `module-4-devops`.
- Proof-branch history: `f85d58d` (green) → `0d49f19` (red) → `41e06a0` (green).

## All `module-4-devops` runs (every phase push is green)

| Commit | Conclusion | Run |
|---|---|---|
| `f85d58d` | ✅ success | 29605195947 |
| `d8dfef4` | ✅ success | 29606149074 |
| `a625a4e` | ✅ success | 29606999408 |
| `a44cf85` | ✅ success | 29608643237 |
| `d0bf8d2` | ✅ success | 29608909594 |
| `dcf3bee` | ✅ success | 29610931268 |
| `6fba06b` | ✅ success | 29611110016 |
| `4bc870d` (R1) | ✅ success | 29612249104 |
| `e20cac7` (R2) | ✅ success | 29613005832 |

## Conclusion

The intentional-red run (`0d49f19`) proves the workflow is meaningful: one wrong assertion
made `pytest` exit non-zero and, with no failure-masking in `ci.yml`, that failed the `test`
job. Reverting the assertion (`41e06a0`) returned CI to green without touching the workflow.
Every subsequent `module-4-devops` push, including the R1/R2 fixes, is green.
