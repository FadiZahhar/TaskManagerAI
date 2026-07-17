# Module 5 Setup and Grounding Evidence

## Repository

| Item | Observed value |
|---|---|
| Evidence date | 2026-07-18 00:49:48 EEST (+0300) |
| Repository root | `/Users/apple/Documents/GitHub/TaskManagerAI` |
| Branch | `module-5-governance` |
| Original base commit | `c2a369ee552fe328c21602f6ed44c9c4675d01e7` |
| Current HEAD observed during final review | `e4c7414a7532b572634bc9b1ce3ba7c1b842e194` (`first commit module 5`) |
| Module 5 instructions | Root `AGENTS.md`, with `CLAUDE.md` as a compatible wrapper |

The `e4c7414` checkpoint was created by the repository owner at 00:48:07 EEST
and pushed to `origin/mid-course-project` at 00:48:10 EEST while the Phase 1
read-only checks were running. It added the Module 5 guide, prompt-library PDF,
and Phase 0 evidence index. Codex did not create or push this commit, and no
attempt was made to undo it.

After the grounding checks, the repository owner approved removal of the stale
mid-course directions from `CLAUDE.md`. The replacement now defers to the root
Module 5 `AGENTS.md`, uses the active branch and `Docs/` casing, and repeats no
separate application-feature contract.

## AGENTS.md verification

| Claim or instruction | Source checked | Result | Correction made |
|---|---|---|---|
| The application is a FastAPI API with a single-file vanilla frontend. | `README.md`, `app/main.py`, `frontend/index.html` | Confirmed | Replaced the completed mid-course implementation objective with the Module 5 review objective. |
| The supported setup, run, and test commands are repository-specific. | `README.md`, `requirements.txt`, `pytest.ini` | Confirmed | Recorded both the documented activated-environment command and the explicit `.venv/bin/python -m pytest` command observed in Phase 0. |
| Statuses, priorities, title validation, due-date behavior, filtering, errors, and transitions match the current code. | `app/models.py`, `app/storage.py`, `app/main.py`, `app/business_rules.py`, active tests | Confirmed | Converted the old target contracts into confirmed current behavior and stated where limits are not visible. |
| Module 5 is docs-first, read-only by default, and permits comments planning but not implementation. | `Docs/Module5/module_5_step_by_step_guide.md` | Confirmed | Added the Module 5 branch, artifact, fresh-thread, write-approval, and student-ownership guardrails. |
| No Dockerfile or GitHub Actions workflow exists on this branch. | Tracked-file inventory and repository root inspection | Confirmed | Marked both as absent rather than carrying claims from `module-4-devops`. |
| Browser behavior is PASS only when observed. | Existing root instructions and Module 5 guide | Confirmed | Preserved the rule and required `NOT RUN` when no observation occurred. |
| Commits and pushes require explicit approval after diff and checks. | Existing root instructions and Module 5 guide | Confirmed | Preserved and broadened the rule to reset, deletion, and history rewriting. |

## Project-evidence smoke test

Exactly five repository-specific claims were checked.

| Claim | Evidence file and location | Evidence summary | Confidence | Assumption to verify |
|---|---|---|---|---|
| The API exposes health plus create, list, get, patch, and delete task routes, with local frontend CORS. | `app/main.py:27-88`, `app/api/routes/health.py:18-24` | The route decorators and CORS middleware name the supported methods, paths, response models, and local origins. | High | None |
| Task statuses and priorities are closed enums; titles are trimmed and limited to 200 characters; due dates are optional; overdue is derived from UTC today. | `app/models.py:10-94` | The enums, validators, optional date fields, `is_overdue`, and computed response field directly define the contract. | High | None |
| Tasks are kept in a module-level dictionary and list filters compose sequentially without mutating storage. | `app/storage.py:9-84` | CRUD functions operate on `_tasks`; status, priority, overdue, assignee, and search each narrow a local list. | High | Multi-process behavior is not exercised and durable persistence is absent. |
| Only `ToDo -> InProgress`, `InProgress -> Done`, and `Done -> InProgress` are allowed; other transitions raise HTTP 422. | `app/business_rules.py:7-21`, `app/main.py:70-81` | `VALID_TRANSITIONS` contains exactly three pairs and `patch_task` invokes the validator before storage update. | High | None |
| The frontend keeps three columns visible and sends server-side filter/search queries to the hard-coded local API. | `frontend/index.html:685-725`, `frontend/index.html:789-813`, `frontend/index.html:930-980`, `frontend/index.html:1204-1227` | The markup defines all columns and controls; JavaScript builds `URLSearchParams`, fetches `/tasks`, renders per-column empty states, and reloads on filter changes. | High for code structure | Runtime browser behavior was not observed in Phase 1. |

## Manual confirmation of cited evidence

| Cited source | Detail opened manually | Result |
|---|---|---|
| `app/models.py` | Enum values, title validators, optional `due_date`, and computed `overdue` field | Confirmed |
| `app/storage.py` | Module dictionary and all five filter branches | Confirmed |
| `app/main.py` and `app/business_rules.py` | Route decorators, missing-task handling, and three transition pairs | Confirmed |
| `frontend/index.html` | Filter controls, three columns, query builder, empty states, error handling, and reset behavior | Confirmed as code; runtime not observed |

## Recent-files smoke test

The files were selected with filesystem modification metadata only. Git history
and Git status were not used to identify them. Each selected file was opened
before its contents were described.

| File | Filesystem modified time | Inspected content | Confidence |
|---|---|---|---|
| `AGENTS.md` | 2026-07-18 00:48:50 +0300 | Module 5 objective, active branch/base, verified project contract, artifacts, governance rules, and bounded workflow. | High |
| `Docs/module-5/evidence-index.md` | 2026-07-18 00:36:43 +0300 | Phase 0 branch, test baseline, environment, path decision, and not-started phase statuses. | High |
| `.gitignore` | 2026-07-18 00:34:46 +0300 | Ignores `.venv/`, Python cache files, pytest cache, and `.DS_Store`. | High |

The third timestamp was tied by multiple files written during branch checkout.
Sorting the equal timestamps by path selected `.gitignore`; no claim is made
that it was modified after the other files in the tie.

## Commands and observed results

- Full Phase 0 baseline: `.venv/bin/python -m pytest` — **60 passed, 4 warnings in 0.25s**.
- `git diff --check` after writing `AGENTS.md` — **PASS**, no output.
- Placeholder scan of `AGENTS.md` — **PASS**, no unresolved placeholder pattern found.
- Filesystem recent-file query — **PASS**, modification times were available.
- Project evidence check — **PASS**, all five claims had directly inspected repository evidence.

## Conclusion

- Codex is grounded in the intended repository and branch: **Yes**.
- `AGENTS.md` is repository-specific and aligned with Module 5: **Yes**.
- Application files changed in Phase 1: **No**.
- External commit observed during Phase 1: **Yes — `e4c7414`; recorded above**.
- Browser verification: **NOT RUN — Phase 1 verified repository grounding, not live UI behavior**.
- Remaining uncertainty: Python 3.9 was not rerun locally and live browser
  behavior was not re-observed.
