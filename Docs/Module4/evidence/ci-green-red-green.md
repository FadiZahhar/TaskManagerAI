# CI Green → Red → Green Evidence

> **Observation boundary:** `gh` CLI is not available in the agent environment, so the
> **GitHub Actions run URLs and CI results below are `NOT RUN` from the agent's side** and
> must be filled in by observing the Actions tab. All **local** pytest results were directly
> observed and are recorded as such. Nothing here is fabricated.
> Actions URL: `https://github.com/FadiZahhar/TaskManagerAI/actions`

## Workflow

- **File:** `.github/workflows/ci.yml`
- **Python version:** `3.9` (matches README "tested on 3.9.6")
- **Test command:** `pytest -v`
- **Push trigger:** yes (`on: push:`, all branches)
- **Pull-request trigger:** yes (`pull_request: branches: [main]`)
- **Failure-masking review:** None found (grep for `continue-on-error` / `|| true` / `--exit-zero` → none)

## Run 1 — Initial green

- **Branch:** `module-4-devops`
- **Commit:** `f85d58d` ("Phase 2 (partial: workflow built & verified locally)")
- **Run URL:** _TBD — observe in Actions_
- **Date:** 2026-07-17
- **Result (CI):** _NOT RUN (agent) — expected green_
- **Tests executed:** 25 (local baseline)
- **Evidence (local):** `.venv/bin/python -m pytest -q` → `25 passed`, exit `0`.

## Run 2 — Intentional red

- **Proof branch:** `ci-proof-green-red-green` (cut from `module-4-devops` @ `f85d58d`)
- **Commit:** `0d49f19` ("test: intentionally break assertion for CI proof")
- **Test intentionally changed:** `tests/test_tasks.py::test_create_task_valid_returns_201_with_full_body` — assertion changed from `== 201` to `== 200` (route actually returns `201`).
- **Expected local failure:** that one test fails; command exits non-zero.
- **Actual local failure (observed):** `1 failed, 24 passed`; **pytest exit code `1`** (verified directly, not via a piped `tail`).
- **Run URL:** _TBD — observe in Actions_
- **Actual CI failure:** _NOT RUN (agent) — expected red_
- **Evidence that workflow caught it:** local non-zero exit proves the `pytest -v` step would fail the job (no failure masking in the workflow).

## Run 3 — Restored green

- **Revert commit:** `41e06a0` (`Revert "test: intentionally break assertion for CI proof"`)
- **Local test result (observed):** `25 passed`, **pytest exit code `0`**; deliberate assertion removed (line 12 back to `== 201`).
- **Run URL:** _TBD — observe in Actions_
- **CI result:** _NOT RUN (agent) — expected green_
- **Workflow changed to hide failure:** No — only the test assertion was reverted; `ci.yml` was never modified.

## Branch hygiene

- Proof branch `ci-proof-green-red-green` is **NOT merged** into `module-4-devops` (verified via `git branch --merged`).
- `module-4-devops` working tree is clean; application/test source is unchanged from `f85d58d`.
- Proof-branch history: `f85d58d` (green) → `0d49f19` (red) → `41e06a0` (green).

## Conclusion

The intentional-red run proves the workflow is meaningful: a single wrong assertion makes
`pytest` exit non-zero, and because the workflow contains no failure-masking, that must fail
the `test` job. Restoring the assertion returns the suite to green without touching `ci.yml`.
**Remaining human step:** open the Actions tab, confirm Run 1 & Run 3 are green and Run 2 is
red, and paste the three run URLs above.
