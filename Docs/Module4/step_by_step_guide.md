# Module 4 — Step-by-Step Delivery Guide

**Module:** DevOps, CI/CD, Documentation & Team Workflows with AI  
**Project:** Existing FastAPI Task Tracker  
**Primary tool:** Claude Code in the terminal  
**Purpose:** Complete Module 4 in the required sequence, generate every expected artifact, and collect evidence that each artifact is correct.

---

## 1. What “done properly” means

Module 4 is not a feature-development assignment. Do not add authentication, a database, deployment infrastructure, or unrelated user-interface changes. The goal is to wrap the existing Task Tracker in the engineering artifacts needed for sharing, testing, maintenance, review, and future delivery.

The working loop throughout the module is:

> **Ask → inspect → run → test → refine**

The three non-negotiable rules are:

1. **Read the diff before approving.**
2. **Verify before moving on.**
3. **AI never approves the work; you do.**

A generated file is not evidence. A passing command, a failing command at the correct time, a source-code comparison, a runtime check, or a reviewed diff is evidence.

---

## 2. Expected Module 4 deliverables

By the end, the repository should contain or reference the following:

| Part | Required output | Required evidence |
|---|---|---|
| 4.1 Claude Code setup | `CLAUDE.md` | Correct repository opened, project-specific content, two Claude answers verified against source files |
| 4.2 CI | `.github/workflows/ci.yml` | Green → intentional red → restored green GitHub Actions runs |
| 4.3 Docker | `Dockerfile`, `.dockerignore` | Image builds, container runs, `/health` succeeds, `whoami` returns `app` |
| 4.3 security record | Docker security log | Non-root user, explicit slim runtime, no baked secrets |
| 4.4 Documentation | Verified docstrings and updated `README.md` | At least three docstrings checked, `/docs` comparison, claim-vs-reality log |
| 4.5 AI-assisted review | Annotated review log | Every Claude comment classified as **Useful**, **Noise**, or **Wrong** |
| 4.6 Technical note | `docs/decisions/<short-name>.md` | Six required sections, working README link, own voice, required reflection |
| Reflection | Tool-fit reflection | Comparison of Copilot, Cursor, and Claude Code based on scope and verification needs |

Recommended evidence files:

```text
docs/
├── decisions/
│   └── <short-name>.md
└── module-4/
    ├── evidence-index.md
    ├── baseline.md
    ├── claude-verification.md
    ├── ci-green-red-green.md
    ├── docker-security-log.md
    ├── claim-vs-reality.md
    ├── ai-review-log.md
    └── tool-fit-reflection.md
```

The lecture does not require every recommended filename above. They make the work easier to demonstrate and assess.

> **⚠ This repository uses `Docs/` (capital D), not `docs/`.** The tracked documentation directory is `Docs/` (`git ls-files`). This guide writes evidence under lowercase `docs/…`; on case-insensitive macOS that lands in the same `Docs/` folder, but on case-sensitive Linux (GitHub Actions) `docs/` and `Docs/` are **different** directories. Use `Docs/module-4/` and `Docs/decisions/` throughout this guide to stay consistent with the repo and avoid CI path breakage.

---

## 3. Placeholders used in this guide

Replace these placeholders before running commands:

| Placeholder | Meaning | Example |
|---|---|---|
| `<DEFAULT_BRANCH>` | Main integration branch | `main` |
| `<MODULE_BRANCH>` | Your Module 4 working branch | `module-4-devops` |
| `<REPO_URL>` | GitHub repository URL | Your repository URL |
| `<PYTHON_VERSION>` | Exact project Python version | `3.9` — README says tested on 3.9.6; **no pinned version file exists** |
| `<TEST_COMMAND>` | Exact test command used by the repository | `pytest -v` |
| `<RUN_COMMAND>` | Exact local app command | `uvicorn app.main:app --reload --port 8000` |
| `<REQUIREMENTS_FILE>` | Dependency file | `requirements.txt` |
| `<DECISION_SLUG>` | Technical note filename | `in-memory-task-storage` |

> **Repo-specific values sheet:** A verified substitution table for every placeholder above lives at `Docs/Module4/placeholder-values.md`.
>
> **Python version has no pin in this repo.** The only evidence is `README.md` ("3.9+ … tested on 3.9.6"); there is no `.python-version`, `pyproject.toml`, `setup.cfg`, or `runtime.txt`. Wherever later phases require "the exact Python version confirmed by repository evidence" (CI in Phase 2, Docker in Phase 3), that evidence is the README. Pin `3.9`, and consider adding a version file so CI and Docker have an authoritative source.

Commands below assume Bash, Zsh, Git Bash, WSL, or a similar shell. On Windows PowerShell, some activation and file-listing commands differ, but the verification logic is the same.

---

# 4. Prompt discipline for Claude Code

## 4.1 Reusable safety header

Paste this at the beginning of any large Claude Code request:

```text
You are working in the existing Task Tracker repository for Module 4.

Operating rules:
1. Inspect the repository before proposing changes.
2. Use plan mode first for any multi-file or configuration change.
3. Do not edit files or run write, destructive, commit, push, or deployment commands until I explicitly approve.
4. Keep scope limited to the requested Module 4 artifact.
5. Do not add authentication, a database, deployment automation, unrelated UI changes, new product features, or secrets.
6. Do not change business rules unless I explicitly approve a separate behavior change.
7. Base factual claims on exact repository files and identify the source files used.
8. Never hide failures with continue-on-error, || true, --exit-zero, or equivalent behavior.
9. After implementation, do not commit or push. Show git status, git diff --stat, and the relevant git diff.
10. State assumptions clearly and stop if repository evidence contradicts the request.
```

## 4.2 Reusable implementation approval prompt

Use this only after reviewing and accepting Claude’s plan:

```text
Approved. Implement only the accepted plan.

Constraints:
- Keep the change minimal.
- Do not modify unrelated files.
- Do not add features outside Module 4.
- Do not commit or push.
- Run only the verification commands required for this step.
- At the end, show:
  1. git status --short
  2. git diff --stat
  3. the complete relevant diff
  4. commands run and their results
  5. any remaining uncertainty
```

## 4.3 Reusable correction prompt

Use this when Claude’s first output is inaccurate or too broad:

```text
Revise the proposal using only verified repository evidence.

Remove:
- unsupported assumptions,
- unrelated changes,
- invented routes, errors, schemas, or business rules,
- deployment steps,
- failure-masking behavior,
- unnecessary dependencies.

Show the corrected plan first. Do not edit files yet.
```

## 4.4 Reusable read-only audit prompt

```text
Perform a read-only audit. Do not edit files, install packages, commit, push, or run destructive commands.

For every finding:
- identify the exact file,
- explain the evidence,
- state whether it is confirmed or uncertain,
- explain how I can verify it manually.

Separate:
1. confirmed defects,
2. possible risks,
3. style-only observations,
4. unsupported assumptions.
```

Do not paste every prompt in this guide at once. Run them in sequence and complete each human verification gate before continuing.

---

# 5. Phase 0 — Prepare a trustworthy baseline

## Objective

Confirm that the existing Task Tracker works before introducing Module 4 changes.

## Step 0.1 — Open the correct repository

```bash
cd /path/to/your/task-tracker
pwd
git rev-parse --show-toplevel
git status
git branch --show-current
```

The output of `pwd` and `git rev-parse --show-toplevel` should identify the Task Tracker repository root.

Do not start Claude Code from:

- the directory that contains several repositories;
- a nested `app/` directory;
- your home directory;
- a folder containing unrelated projects.

## Step 0.2 — Start from a clean branch

> **Note — two independent tracks.** This repository also contains a **standalone** mid-course project (`CLAUDE.md` / `AGENTS.md`: due dates + search on the `mid-course-project` branch). It is **unrelated to Module 4**. Module 4 continues from the Module 3 state on the main line — create the `module-4-devops` branch from `main` (Module 3), not from `mid-course-project`.

First inspect:

```bash
git status --short
```

If the repository is clean:

```bash
git switch <DEFAULT_BRANCH>
git pull
git switch -c <MODULE_BRANCH>
```

Example:

```bash
git switch main
git pull
git switch -c module-4-devops
```

Do not discard existing uncommitted work. Commit it appropriately, stash it, or ask the instructor how it should be handled.

## Step 0.3 — Inspect the repository structure

```bash
find . -maxdepth 3 -type f | sort
```

Identify:

- FastAPI entry point;
- models and schemas;
- business logic;
- tests;
- frontend files;
- dependency file;
- README;
- existing CI or Docker files;
- health endpoint;
- Python version declaration.

Useful checks:

```bash
python --version
git ls-files
grep -R "FastAPI(" -n app . 2>/dev/null
grep -R "health" -n app tests . 2>/dev/null
```

Do not treat the commands above as authoritative on every operating system. The goal is to locate the actual source files.

## Step 0.4 — Create or activate the project environment

Use the repository’s existing instructions. A typical sequence is:

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r <REQUIREMENTS_FILE>
```

PowerShell activation is usually:

```powershell
.venv\Scripts\Activate.ps1
```

Do not create a new dependency strategy if the project already uses one.

## Step 0.5 — Run the existing tests

Use the exact repository command. Common examples:

```bash
pytest -v
```

or:

```bash
python -m pytest -v
```

Record:

- command used;
- test count;
- passed/failed result;
- warnings;
- any pre-existing failures.

Do not begin Module 4 with an unexplained failing baseline.

## Step 0.6 — Run the application

Use the repository’s exact run command. The lecture example is:

```bash
uvicorn app.main:app --reload --port 8000
```

In another terminal:

```bash
curl -i http://localhost:8000/health
```

Open:

```text
http://localhost:8000/docs
```

Record the health response and confirm that Swagger/OpenAPI documentation loads.

## Copy/paste prompt P0 — Repository discovery

```text
You are in the existing Task Tracker repository.

Perform a read-only repository discovery. Do not edit files or run installation, commit, push, or destructive commands.

Identify and report:
1. repository root;
2. current branch and whether the working tree is clean;
3. exact Python version required by repository evidence;
4. dependency installation method;
5. exact test command;
6. exact local run command;
7. FastAPI entry point;
8. model/schema files;
9. test locations;
10. frontend location;
11. health endpoint implementation;
12. current task statuses and where transition rules are enforced;
13. any existing CI, Docker, or documentation artifacts.

For each answer, name the exact source file used. Mark anything uncertain instead of guessing.
```

## Baseline evidence template

Create `docs/module-4/baseline.md` after the directory exists:

```markdown
# Module 4 Baseline

- Date:
- Repository:
- Branch:
- Commit SHA:
- Python version:
- Dependency installation command:
- Test command:
- Test result:
- Tests passed:
- Warnings:
- Run command:
- Health URL:
- Health result:
- `/docs` loaded: Yes / No
- Pre-existing issues:
```

Get the current commit:

```bash
git rev-parse HEAD
```

## Phase 0 exit gate

Do not continue until:

- [ ] You are in the correct repository root.
- [ ] The working tree is understood.
- [ ] The Module 4 branch exists.
- [ ] The project Python version is known.
- [ ] Dependencies install successfully.
- [ ] Existing tests pass, or failures are documented as pre-existing.
- [ ] The application starts.
- [ ] `/health` succeeds.
- [ ] `/docs` loads.
- [ ] Baseline evidence is recorded.

---

# 6. Phase 1 — Set up Claude Code and create reliable project memory

## Objective

Make Claude Code understand this specific Task Tracker before allowing it to perform repository-wide work.

## Step 1.1 — Start Claude Code in the repository root

Launch Claude Code from the directory confirmed in Phase 0.

Inside Claude Code, run:

```text
/status
```

Confirm:

- working directory;
- repository context;
- current branch;
- session state.

Use `/model` only if the course environment requires it.

## Step 1.2 — Generate the initial `CLAUDE.md`

Run:

```text
/init
```

Do not commit the generated draft immediately.

## Step 1.3 — Audit and correct `CLAUDE.md`

It should describe this exact project, not a generic FastAPI application.

Required content:

1. **Project purpose**
2. **Stack**
3. **Exact setup, run, and test commands**
4. **Repository architecture**
5. **Task statuses**
6. **Allowed and disallowed transitions**
7. **Invalid update behavior**
8. **Missing-task behavior**
9. **UI states or task columns**
10. **CORS and local development assumptions**
11. **Do-not rules**
12. **Verification expectations**

### Recommended `CLAUDE.md` structure

````markdown
# Task Tracker Project Guidance

## Project Purpose
Describe the actual project in one concise paragraph.

## Technology Stack
- Python: <verified version>
- FastAPI
- Pydantic: <verified major version>
- Uvicorn
- pytest
- httpx, if verified
- Frontend: <verified implementation>

## Setup
```bash
<exact setup commands>
```

## Run
```bash
<exact local run command>
```

## Test
```bash
<exact test command>
```

## Repository Architecture
- `app/...`: ...
- `tests/...`: ...
- frontend files: ...
- configuration files: ...

## API and Business Rules
- Task statuses:
- Allowed transitions:
- Disallowed transitions:
- Invalid update behavior:
- Missing task behavior:
- Validation rules:
- Success status codes:
- Error status codes:

## UI States
- ...

## CORS and Local Development
- Backend URL:
- Frontend URL:
- Allowed origins:
- Ports:

## Working Rules
- Inspect before editing.
- Use plan mode for multi-file changes.
- Read the diff before accepting.
- Run the relevant test suite after changes.
- Do not hide failures.
- Do not add authentication unless explicitly requested.
- Do not introduce a database unless explicitly requested.
- Do not add deployment automation.
- Do not make unrelated UI changes.
- Do not add or expose secrets.
- Do not change business rules without explicit approval.
- Do not commit or push unless explicitly requested.
````

Use the template as a starting point, then replace every placeholder with verified repository facts.

## Copy/paste prompt P1 — Audit `CLAUDE.md`

```text
Use plan mode and perform a read-only audit of the generated CLAUDE.md against the actual repository.

Check these areas:
1. project purpose;
2. Python and package versions;
3. setup, run, and test commands;
4. architecture and file locations;
5. task statuses;
6. allowed and disallowed transitions;
7. invalid update behavior;
8. missing-task behavior;
9. UI states;
10. CORS and local ports;
11. do-not rules.

For every CLAUDE.md statement:
- identify the source file that confirms it,
- mark unsupported claims,
- identify missing project-specific facts,
- propose the smallest correction.

Do not edit files yet.
```

After reviewing the plan, use the reusable implementation approval prompt.

## Step 1.4 — Inspect the diff

```bash
git status --short
git diff -- CLAUDE.md
```

Read every line.

Reject generic statements such as:

- “Uses a modern Python stack”;
- “May use a database”;
- “Supports normal CRUD behavior”;
- “Returns appropriate status codes”;
- “Allows standard status updates.”

Replace them with verified, specific facts.

## Step 1.5 — Demonstrate plan mode safely

The lecture suggests planning a small `/version` endpoint without editing files.

## Copy/paste prompt P2 — Plan-only `/version` exercise

```text
Enter plan mode.

Inspect the current repository and propose the exact steps required to add a GET /version endpoint.

Requirements:
- Do not edit files.
- Do not run write commands.
- Identify every file that would change.
- Explain the response shape and where the version value would come from.
- Identify tests required.
- Identify documentation impact.
- Identify any design uncertainty.
- Do not implement the endpoint unless I give a separate approval.

Keep the proposal consistent with the current architecture and conventions.
```

The exercise proves that you can use plan mode. Unless the instructor explicitly requires the endpoint, do not implement it.

## Step 1.6 — Ask and verify two project questions

### Copy/paste prompt P3 — Business-rule question

```text
Using @app/main.py, @app/models.py, @app/business_rules.py, and any directly relevant service or test files, explain the actual task status transition rules.

Report:
1. all valid status values;
2. allowed transitions;
3. disallowed transitions;
4. where the rule is enforced;
5. behavior and status code for an invalid transition;
6. tests that prove the behavior.

Do not edit files. Do not infer behavior that is not visible in the repository. Name the source files used.
```

Adapt file references if your repository uses different paths.

### Copy/paste prompt P4 — Route and status-code question

```text
Using @app/main.py, @app/api/routes/health.py, and the relevant schema and test files, create a route table for the Task Tracker API.

For each route include:
- HTTP method;
- path;
- request model;
- response model or body shape;
- success status code;
- important error status codes;
- source file;
- test coverage.

Do not edit files. Do not invent undocumented behavior.
```

## Step 1.7 — Verify the two answers manually

Open the referenced files and compare each claim with code and tests.

Use this template in `docs/module-4/claude-verification.md`:

```markdown
# Claude Project Understanding Verification

## Question 1 — Status transitions

### Claude answer summary
...

### Files checked
- ...
- ...

### Verified facts
- ...

### Errors or unsupported claims
- ...

### Corrections
- ...

### Final judgment
Accurate / Partly accurate / Inaccurate

---

## Question 2 — Routes and status codes

### Claude answer summary
...

### Files checked
- ...
- ...

### Verified facts
- ...

### Errors or unsupported claims
- ...

### Corrections
- ...

### Final judgment
Accurate / Partly accurate / Inaccurate
```

## Step 1.8 — Run tests and commit project memory

```bash
<TEST_COMMAND>
git status --short
git diff --check
git diff -- CLAUDE.md docs/module-4/
git add CLAUDE.md docs/module-4/baseline.md docs/module-4/claude-verification.md
git commit -m "docs: add Claude project guidance and Module 4 baseline"
```

Do not use `git add .` without reviewing every changed file.

## Phase 1 exit gate

- [ ] `/status` confirmed the correct repository.
- [ ] `/init` was used.
- [ ] `CLAUDE.md` was manually corrected.
- [ ] Stack and commands are exact.
- [ ] Business rules are specific and verified.
- [ ] CORS and UI state information is verified.
- [ ] Do-not rules are present.
- [ ] Plan mode was demonstrated without editing.
- [ ] Two Claude answers were checked against actual files.
- [ ] Diff was read.
- [ ] Tests still pass.
- [ ] `CLAUDE.md` and verification evidence are committed.

---

# 7. Phase 2 — Create CI and prove green → red → green

## Objective

Create a minimal GitHub Actions test workflow and prove that it both passes good code and rejects a deliberate test failure.

## Step 2.1 — Confirm local test truth

Run:

```bash
<TEST_COMMAND>
```

Confirm:

- all required test dependencies are installed;
- the command exits non-zero on a real failure;
- the command discovers the expected tests.

Inspect dependency files:

```bash
cat <REQUIREMENTS_FILE>
```

If the project separates production and development dependencies, identify both files.

## Copy/paste prompt P5 — CI plan

```text
Use plan mode.

Inspect this repository and propose a minimal GitHub Actions CI test workflow.

Requirements:
- File path: .github/workflows/ci.yml
- Run on push to branches.
- Run on pull requests targeting the default branch.
- Use one job named test.
- Use ubuntu-latest.
- Use the exact Python version confirmed by repository evidence.
- Install all application and test dependencies.
- Run the repository's real test command.
- A failing test must cause the workflow to fail.
- Do not add deployment steps.
- Do not add caching unless there is a clear project need.
- Do not use continue-on-error, || true, --exit-zero, or any equivalent failure masking.
- Do not change application code.

Before editing:
1. show the proposed YAML structure;
2. identify the dependency source;
3. identify the exact test command;
4. list assumptions and risks;
5. explain how the green-red-green proof will be performed safely.

Do not edit files yet.
```

Review the plan.

## Copy/paste prompt P6 — Implement CI

```text
Approved. Create only .github/workflows/ci.yml according to the accepted plan.

After creating it:
1. inspect the YAML for syntax and indentation;
2. run the local test command;
3. show git status --short;
4. show git diff --stat;
5. show the complete workflow diff;
6. explicitly confirm that no failure-masking behavior exists.

Do not commit or push.
```

## Step 2.2 — Inspect the workflow line by line

Required minimum:

| Area | Expected |
|---|---|
| Location | `.github/workflows/ci.yml` |
| Push trigger | Present |
| Pull request trigger | Targets `<DEFAULT_BRANCH>` |
| Job | One job named `test` |
| Runner | `ubuntu-latest` |
| Python | Exact verified version |
| Dependency installation | Includes test dependencies |
| Test command | Real command with normal non-zero failure |
| Deployment | None |

Reject immediately:

```text
continue-on-error
|| true
--exit-zero
```

Also reject:

- vague or floating Python versions;
- missing push trigger;
- missing pull-request trigger;
- wrong dependency file;
- commands that silently skip tests;
- deployment steps;
- workflow saved outside `.github/workflows/`;
- a test command that passes when zero tests run.

Useful inspection:

```bash
sed -n '1,240p' .github/workflows/ci.yml
git diff -- .github/workflows/ci.yml
grep -nE "continue-on-error|\|\| true|exit-zero" .github/workflows/ci.yml || true
```

The final `|| true` above is used only in a local inspection command so `grep` can report “not found” without stopping a shell script. It must not appear inside the CI workflow’s test execution.

## Step 2.3 — Test locally, commit, and push

```bash
<TEST_COMMAND>
git diff --check
git add .github/workflows/ci.yml
git commit -m "ci: add automated test workflow"
git push -u origin <MODULE_BRANCH>
```

Open GitHub Actions and confirm the first normal run is green.

Optional GitHub CLI checks:

```bash
gh run list --workflow ci.yml --limit 10
gh run view <RUN_ID> --log
```

## Step 2.4 — Record the initial green run

Capture:

- run URL;
- branch;
- commit SHA;
- date/time;
- job result;
- number of tests shown in the log;
- screenshot if required by the course.

## Step 2.5 — Create a safe proof branch

Do not deliberately break the main branch or the final Module 4 branch.

```bash
git switch <MODULE_BRANCH>
git pull
git switch -c ci-proof-green-red-green
```

## Step 2.6 — Create the intentional red result

Choose one existing test and change one assertion to an obviously incorrect expected value.

Examples of safe deliberate breaks:

- expect `200` where the verified route returns `201`;
- expect a wrong task status;
- expect a wrong response field value.

Do not:

- corrupt application code;
- delete the entire test suite;
- modify the workflow to fail artificially;
- add syntax errors;
- use a flaky timing failure;
- expose secrets.

Run locally:

```bash
<TEST_COMMAND>
```

Confirm that exactly the intended test fails for the intended reason.

Then commit and push:

```bash
git status --short
git diff -- tests/
git add <INTENTIONALLY_CHANGED_TEST_FILE>
git commit -m "test: intentionally break assertion for CI proof"
git push -u origin ci-proof-green-red-green
```

Confirm that GitHub Actions is red and the log shows the same failure observed locally.

## Step 2.7 — Restore green truthfully

On the proof branch:

```bash
git revert --no-edit HEAD
<TEST_COMMAND>
git push
```

Confirm:

- local tests pass;
- GitHub Actions returns to green;
- the workflow was not changed to hide the failure.

Return to the actual Module 4 branch:

```bash
git switch <MODULE_BRANCH>
```

Do not merge the proof branch into the working branch. Keep the branch or its run links long enough for assessment.

## Copy/paste prompt P7 — Diagnose a real CI failure

Use only if normal CI fails unexpectedly:

```text
Perform a read-only diagnosis of the latest CI failure.

Compare:
- the GitHub Actions workflow,
- repository dependency files,
- the local test command,
- the failing log I provide,
- project Python version.

Classify the cause as one of:
1. workflow configuration error;
2. missing dependency;
3. environment mismatch;
4. genuine test/application failure;
5. uncertain.

Propose the smallest truthful fix. Do not hide or bypass the failure. Do not edit files yet.
```

Paste the relevant log excerpt after the prompt. Do not paste secrets or tokens.

## CI evidence template

Create `docs/module-4/ci-green-red-green.md`:

```markdown
# CI Green → Red → Green Evidence

## Workflow
- File: `.github/workflows/ci.yml`
- Python version:
- Test command:
- Push trigger:
- Pull-request trigger:
- Failure-masking review: None found / Findings:

## Run 1 — Initial green
- Branch:
- Commit:
- Run URL:
- Date:
- Result:
- Tests executed:
- Evidence:

## Run 2 — Intentional red
- Proof branch:
- Commit:
- Test intentionally changed:
- Expected local failure:
- Actual local failure:
- Run URL:
- Actual CI failure:
- Evidence that workflow caught it:

## Run 3 — Restored green
- Revert commit:
- Local test result:
- Run URL:
- CI result:
- Workflow changed to hide failure: No

## Conclusion
Explain why these three runs prove the workflow is meaningful.
```

## Phase 2 exit gate

- [ ] Workflow is in the correct path.
- [ ] It runs on push.
- [ ] It runs on pull requests to the default branch.
- [ ] Job is named `test`.
- [ ] Runner is `ubuntu-latest`.
- [ ] Python version is exact.
- [ ] Test dependencies are installed.
- [ ] Failed tests return a failed workflow.
- [ ] No deployment steps exist.
- [ ] No failure-masking shortcuts exist.
- [ ] Initial green run is recorded.
- [ ] Intentional red run is recorded.
- [ ] Restored green run is recorded.
- [ ] Broken proof commit is not merged into the Module 4 branch.
- [ ] CI evidence file is complete.

Commit the evidence file after run URLs are available:

```bash
git add docs/module-4/ci-green-red-green.md
git commit -m "docs: record CI green red green verification"
git push
```

---

# 8. Phase 3 — Containerize the application safely

## Objective

Create a multi-stage Docker image that runs the real app, excludes sensitive local files, and runs as a non-root user.

## Step 3.1 — Inspect runtime requirements

Before generating files, confirm:

- FastAPI import path;
- runtime dependency source;
- frontend assets required at runtime;
- working directory;
- application port;
- health endpoint;
- whether native build tools are needed;
- whether tests are needed in the runtime image.

> **⚠ This app does not serve the frontend.** There is no `StaticFiles` mount anywhere in `app/` (verified). The Kanban UI (`frontend/index.html`) is served out-of-process by `python3 -m http.server 5500 --directory frontend` and calls the API at `http://127.0.0.1:8000`. Build an **API-only** image: do **not** copy `frontend/` into it. The container will pass `/health` but will not serve the UI — that is expected and correct for this repo.

## Copy/paste prompt P8 — Docker read-only analysis

```text
Perform a read-only Docker readiness analysis of this Task Tracker repository.

Identify:
1. exact Python version;
2. application import path;
3. runtime dependency file;
4. runtime files and directories that must be copied;
5. frontend/static/template files required by the app;
6. port;
7. health endpoint;
8. files that must not enter the image;
9. whether dependencies require build tools;
10. risks related to file ownership and a non-root runtime user.

Name the exact source files used. Do not edit files.
```

## Copy/paste prompt P9 — Docker plan

```text
Use plan mode.

Propose:
1. a multi-stage Dockerfile;
2. a .dockerignore file.

Requirements:
- Use the exact verified Python version.
- Use an explicit slim Python base; do not use latest.
- Use a builder stage for dependency preparation.
- Use a separate runtime stage.
- Copy only files required to run the application.
- Create a non-root user named app.
- Set ownership so the app user can read and run required files.
- Ensure USER app appears before CMD.
- Run uvicorn app.main:app with --host 0.0.0.0 --port 8000.
- Do not use --reload.
- Do not copy .env, credentials, tokens, Git history, virtual environments, caches, tests, build artifacts, or local-machine files into the image.
- Do not change application behavior.
- Do not add deployment orchestration.

Before editing, show:
1. proposed stages;
2. files copied in each stage;
3. dependency installation approach;
4. final command;
5. non-root strategy;
6. .dockerignore entries;
7. assumptions and possible failure points.

Do not edit files yet.
```

## Copy/paste prompt P10 — Implement Docker files

```text
Approved. Implement only:
- Dockerfile
- .dockerignore

Use the accepted plan.

Then:
1. inspect both complete files;
2. build the image as task-tracker:dev;
3. do not run the container if the build fails;
4. if the build succeeds, report the build result;
5. show git status --short;
6. show git diff --stat;
7. show the complete Dockerfile and .dockerignore diff;
8. identify any unverified runtime assumption.

Do not commit or push.
```

You may prefer to run Docker commands yourself instead of authorizing Claude to run them. That is acceptable and often safer.

## Step 3.2 — Inspect `Dockerfile`

Verify:

- [ ] More than one `FROM` stage is present.
- [ ] Runtime image is an explicit slim Python image.
- [ ] No `latest` tag is used.
- [ ] Build dependencies are not unnecessarily retained in runtime.
- [ ] Runtime dependencies are available.
- [ ] Required app and frontend files are copied.
- [ ] Unneeded files are not copied.
- [ ] User `app` is created.
- [ ] Ownership and permissions are correct.
- [ ] `USER app` appears before `CMD`.
- [ ] Uvicorn binds to `0.0.0.0`.
- [ ] Port is `8000`.
- [ ] `--reload` is absent.
- [ ] No secret values are present.
- [ ] Application behavior is not changed.

Inspection commands:

```bash
sed -n '1,260p' Dockerfile
grep -n "^FROM" Dockerfile
grep -nE "USER|CMD|ENTRYPOINT|reload|latest|0\.0\.0\.0|8000" Dockerfile
```

## Step 3.3 — Inspect `.dockerignore`

It should normally exclude:

```text
.env
.env.*
.git
.gitignore
.venv
venv
__pycache__
*.pyc
.pytest_cache
.mypy_cache
.coverage
htmlcov
dist
build
node_modules
tests
```

Only exclude `tests` if tests are not required in the runtime image.

> **Note for this repo:** `requirements.txt` bundles test dependencies (`pytest`, `httpx`) with runtime ones (`fastapi`, `uvicorn`). Excluding `tests/` via `.dockerignore` does **not** remove those libraries from the image — they are still installed from `requirements.txt`. Either accept this, or record it as a known limitation in the Docker security log. There is no separate `requirements-dev.txt`.

Inspect:

```bash
sed -n '1,240p' .dockerignore
```

## Step 3.4 — Build the image

Use the lecture command:

```bash
docker build -t task-tracker:dev .
```

For a final clean verification later, use `--no-cache`. During development, a normal build is faster.

Record:

- build success;
- any warnings;
- final image name;
- image size.

```bash
docker image ls task-tracker:dev
```

## Step 3.5 — Run the container

```bash
docker run --rm -d -p 8000:8000 --name tt-dev task-tracker:dev
```

Confirm it remains running:

```bash
docker ps --filter name=tt-dev
```

If it exits:

```bash
docker ps -a --filter name=tt-dev
docker logs tt-dev
```

## Step 3.6 — Verify runtime behavior

```bash
curl -i http://localhost:8000/health
```

The response should be successful and match the actual application’s health contract.

Inspect logs:

```bash
docker logs tt-dev
```

## Step 3.7 — Verify the non-root user

```bash
docker exec tt-dev whoami
```

Expected:

```text
app
```

Unacceptable:

```text
root
```

Optionally verify numeric identity:

```bash
docker exec tt-dev id
```

## Step 3.8 — Stop the container

```bash
docker stop tt-dev
```

Because `--rm` was used, the stopped container should be removed automatically.

## Copy/paste prompt P11 — Diagnose Docker failure

```text
Perform a read-only diagnosis of the Docker failure using:
- Dockerfile,
- .dockerignore,
- application entry point,
- dependency files,
- the build or runtime log I provide.

Classify the problem as:
1. build-context problem;
2. missing dependency;
3. missing runtime file;
4. incorrect import path;
5. file-permission or ownership problem;
6. port/host problem;
7. application failure;
8. uncertain.

Propose the smallest fix that preserves:
- multi-stage design,
- explicit slim runtime,
- non-root app user,
- no secrets,
- no --reload.

Do not edit files yet.
```

## Docker security log template

Create `docs/module-4/docker-security-log.md`:

```markdown
# Docker Security and Runtime Verification Log

## Image
- Tag: `task-tracker:dev`
- Build command:
- Build result:
- Runtime base:
- Image size:

## Non-root user
- Command: `docker exec tt-dev whoami`
- Result:
- Expected: `app`
- Pass/Fail:

## Runtime behavior
- Run command:
- Health command:
- Health status:
- Health body:
- Container stayed running: Yes / No

## No baked secrets
Reviewed:
- `Dockerfile`
- `.dockerignore`

Confirmed excluded:
- `.env` and variants:
- `.git`:
- virtual environments:
- caches:
- build artifacts:
- credentials/tokens:
- local-machine files:

## Production-like command
- Host:
- Port:
- `--reload` absent: Yes / No
- `USER app` before `CMD`: Yes / No

## Remaining risks or limitations
- ...
```

## Step 3.9 — Commit Docker artifacts and evidence

```bash
<TEST_COMMAND>
git diff --check
git status --short
git diff -- Dockerfile .dockerignore docs/module-4/docker-security-log.md
git add Dockerfile .dockerignore docs/module-4/docker-security-log.md
git commit -m "build: add secure multi-stage Docker image"
git push
```

## Phase 3 exit gate

- [ ] Multi-stage Dockerfile exists.
- [ ] Explicit slim Python base is used.
- [ ] Image builds.
- [ ] Container remains running.
- [ ] `/health` succeeds.
- [ ] `whoami` returns `app`.
- [ ] `USER app` appears before `CMD`.
- [ ] Uvicorn binds to `0.0.0.0:8000`.
- [ ] `--reload` is absent.
- [ ] `.dockerignore` excludes secrets and local artifacts.
- [ ] Image size is recorded.
- [ ] Docker security log is complete.
- [ ] Tests still pass.
- [ ] Diff was inspected.
- [ ] Docker files are committed and pushed.
- [ ] CI remains green.

---

# 9. Phase 4 — Generate and verify documentation

## Objective

Use AI to draft documentation, then validate every important claim against source code, tests, and the running API.

## Step 4.1 — Inventory documentation claims before editing

## Copy/paste prompt P12 — Documentation claim inventory

```text
Perform a read-only documentation inventory for the Task Tracker.

Inspect public functions and route handlers under app/, the current README, schemas, tests, and FastAPI route declarations.

Report:
1. public functions and route handlers that need docstrings;
2. current README sections;
3. exact setup, run, test, Docker, and CI commands supported by the repository;
4. task statuses and transition rules;
5. route success status codes;
6. important error and validation status codes;
7. response shapes;
8. claims that are easy to document incorrectly;
9. any current documentation drift.

For every claim, identify the source file. Do not edit files.
```

## Step 4.2 — Ask for constrained documentation changes

## Copy/paste prompt P13 — Generate docstrings and README updates

```text
Use plan mode first.

Prepare a minimal documentation-only change.

Scope:
1. Add Google-style docstrings to every public function and route handler under app/.
2. Update README.md with:
   - project overview;
   - prerequisites and exact Python version;
   - setup;
   - run;
   - test;
   - API documentation URL;
   - Docker build and run;
   - health verification;
   - CI behavior;
   - project conventions;
   - technical decision-note link section.

Docstring requirements:
- concise summary;
- Args only where parameters exist;
- Returns with the actual type or response shape;
- Raises only for exceptions that truly occur;
- route examples only when verified;
- actual status codes only.

Constraints:
- Do not change application logic.
- Do not change route decorators.
- Do not change schemas.
- Do not change status codes.
- Do not add validation.
- Do not add exceptions.
- Do not rename functions.
- Do not alter business rules.
- Do not add unsupported features.
- Do not edit the technical decision note yet.

Before editing, list every proposed file and the claims that require manual verification.
```

Review the plan, then approve with the reusable implementation approval prompt.

## Step 4.3 — Inspect the documentation diff before tests

```bash
git status --short
git diff --stat
git diff -- app README.md
```

Confirm no application behavior changed.

Check specifically for changes to:

- function signatures;
- `if` conditions;
- return values;
- route decorators;
- response models;
- status codes;
- exceptions;
- validation;
- business-rule data structures.

A documentation task that changes logic has exceeded scope. Revert the logic change or separate it into an explicitly justified behavior fix with tests.

## Step 4.4 — Verify at least three docstrings manually

Choose at least:

1. one route handler that creates data;
2. one route handler that updates or changes status;
3. one route handler or function with error behavior.

For each, compare the full function body with the docstring.

Use this checklist:

- [ ] Summary matches actual behavior.
- [ ] Parameters are complete.
- [ ] Parameter types are accurate.
- [ ] Return type or response shape is accurate.
- [ ] Success status code is accurate.
- [ ] Documented exceptions really occur.
- [ ] Error status codes are accurate.
- [ ] No validation is claimed unless implemented.
- [ ] Examples match actual schemas.
- [ ] Business rules match code.

## Step 4.5 — Generate a read-only route verification table

## Copy/paste prompt P14 — Route verification matrix

```text
Perform a read-only route verification.

Create a table for every FastAPI route with:
- method;
- path;
- handler name;
- request model;
- response model or body shape;
- declared success status code;
- possible application-level error status codes;
- FastAPI/Pydantic validation behavior;
- source file;
- relevant test.

Do not rely on README or docstrings as the source of truth. Use route declarations, implementation, schemas, and tests. Mark uncertainty explicitly. Do not edit files.
```

Use this table as a guide, then verify it yourself in source code.

## Step 4.6 — Compare with the running `/docs`

Run:

```bash
<RUN_COMMAND>
```

Open:

```text
http://localhost:8000/docs
```

Compare:

- paths;
- methods;
- request schemas;
- required fields;
- optional fields;
- enumerated status values;
- response schemas;
- success status codes;
- validation behavior.

Pay special attention to common documentation errors:

- POST documented as `200` when implementation returns `201`;
- DELETE documented as returning JSON when implementation returns `204 No Content`;
- invalid request documented as `400` when FastAPI/Pydantic returns `422`;
- free status movement documented when transitions are restricted;
- missing task documented incorrectly;
- fields described as optional when schemas require them.

## Step 4.7 — Run actual API checks where useful

Use routes confirmed in `/docs`. Do not paste the examples below blindly; adapt payloads and paths to the actual schemas.

Typical pattern:

```bash
curl -i http://localhost:8000/health
curl -i http://localhost:8000/tasks
```

For create/update/delete routes, use the verified request body and task identifier.

Record response:

- status line;
- body;
- headers if relevant.

## Step 4.8 — Test README from a clean-user perspective

Ideally use a fresh clone in another directory:

```bash
cd ..
git clone <REPO_URL> task-tracker-module4-check
cd task-tracker-module4-check
git switch <MODULE_BRANCH>
```

Then follow only `README.md`:

1. create environment;
2. install dependencies;
3. run tests;
4. start app;
5. check `/health`;
6. build Docker image;
7. run container;
8. check container health;
9. stop container.

If a fresh clone is impractical, create a fresh virtual environment and follow the README without relying on remembered commands.

## Step 4.9 — Create the claim-vs-reality log

Create `docs/module-4/claim-vs-reality.md`:

```markdown
# Documentation Claim-vs-Reality Log

| ID | AI/documentation claim | Source checked | Actual behavior | Classification | Resolution |
|---|---|---|---|---|---|
| 1 | ... | ... | ... | Accurate / Inaccurate / Unsupported | ... |
| 2 | ... | ... | ... | Accurate / Inaccurate / Unsupported | ... |
| 3 | ... | ... | ... | Accurate / Inaccurate / Unsupported | ... |

## Docstrings manually verified

### Function or route 1
- File:
- Handler:
- Claims checked:
- Result:
- Corrections:

### Function or route 2
- File:
- Handler:
- Claims checked:
- Result:
- Corrections:

### Function or route 3
- File:
- Handler:
- Claims checked:
- Result:
- Corrections:

## `/docs` comparison
- Routes compared:
- Schema mismatches found:
- Status-code mismatches found:
- Corrections made:

## README clean-run check
- Setup command worked:
- Test command worked:
- Run command worked:
- Docker instructions worked:
- Problems found and corrected:
```

Your log must contain inaccuracies or confirmations from your actual repository. Do not copy lecture examples as if you discovered them.

## Copy/paste prompt P15 — Documentation consistency audit

```text
Perform a read-only consistency audit after the documentation changes.

Compare:
- README.md;
- all newly added or changed docstrings;
- route declarations;
- function bodies;
- schemas;
- tests;
- Dockerfile;
- .github/workflows/ci.yml.

Report only:
1. confirmed contradictions;
2. unsupported claims;
3. commands that do not match repository reality;
4. missing required documentation;
5. claims that require runtime verification.

For every finding, cite the exact files. Do not edit anything.
```

Verify each finding before acting.

## Step 4.10 — Run tests and commit documentation

```bash
<TEST_COMMAND>
git diff --check
git status --short
git diff -- app README.md docs/module-4/claim-vs-reality.md
git add app README.md docs/module-4/claim-vs-reality.md
git commit -m "docs: add verified API and project documentation"
git push
```

Only stage files actually intended for the documentation commit.

## Phase 4 exit gate

- [ ] Documentation change is behavior-neutral.
- [ ] Public functions and route handlers have appropriate Google-style docstrings.
- [ ] At least three docstrings were manually checked.
- [ ] Status transitions match source code.
- [ ] Route status codes match implementation.
- [ ] `/docs` was compared.
- [ ] README commands work.
- [ ] Docker instructions work.
- [ ] CI description matches workflow behavior.
- [ ] Claim-vs-reality log exists.
- [ ] Unsupported claims were removed.
- [ ] Tests pass.
- [ ] Diff was inspected.
- [ ] Documentation is committed and pushed.
- [ ] CI is green.

---

# 10. Phase 5 — Perform AI-assisted code review as triage

## Objective

Review a meaningful diff, capture every AI comment, classify each one, and compare Claude’s findings with your own review.

## Step 5.1 — Choose a real diff

Recommended choices:

- the full Module 4 branch against `main`;
- Dockerfile and `.dockerignore` addition;
- CI workflow addition;
- documentation changes;
- a meaningful Module 3 refactor;
- new tests.

Use:

```bash
git diff <DEFAULT_BRANCH>...HEAD
git diff --stat <DEFAULT_BRANCH>...HEAD
```

If the branch is large, review one coherent commit:

```bash
git show --stat <COMMIT_SHA>
git show <COMMIT_SHA>
```

Do not use a trivial one-line toy diff.

## Copy/paste prompt P16 — Structured AI review

```text
Review the current branch diff against the default branch. Do not edit files.

Focus on:
1. correctness;
2. regression risk;
3. missing or weak tests;
4. security;
5. CI failure masking or trigger problems;
6. Docker build/runtime problems;
7. non-root and secret-handling problems;
8. documentation drift;
9. maintainability issues with concrete project impact.

For every finding provide:
- unique ID;
- severity: Critical / High / Medium / Low;
- file and exact location;
- concise description;
- concrete failure scenario;
- evidence from the code;
- manual verification step;
- suggested remediation.

Do not report generic style preferences unless they violate an existing repository convention.
Do not modify files.
Separate confirmed findings from uncertain hypotheses.
```

If `/review` is available, you may run it first, then use the structured prompt to make the output easier to log.

## Step 5.2 — Copy every comment into the review log

Create `docs/module-4/ai-review-log.md`:

```markdown
# AI-Assisted Review Log

## Diff reviewed
- Base:
- Head:
- Commit range:
- Files:
- Date:

## Claude findings

| ID | Claude finding | File/location | Severity | Classification | Verification performed | Decision | Justification |
|---|---|---|---|---|---|---|---|
| R1 | ... | ... | ... | Useful / Noise / Wrong | ... | Fix / Follow-up / No action | ... |
| R2 | ... | ... | ... | Useful / Noise / Wrong | ... | ... | ... |

## Classification definitions

- **Useful:** Real bug, risk, missing test, misleading documentation, or meaningful maintainability issue.
- **Noise:** Technically reasonable but not worth acting on in this project, often a non-required style preference.
- **Wrong:** Misreads code, invents a problem, or ignores relevant context.

## Human review findings not raised by Claude

| ID | Human finding | File/location | Severity | Verification | Decision |
|---|---|---|---|---|---|
| H1 | ... | ... | ... | ... | ... |

## Comparison
- What Claude found that I missed:
- What I found that Claude missed:
- Which comments required cross-file context:
- Which comments were noise:
- Which comments were wrong:
- What I changed after verification:

## Personal AI-review rule
I will use Claude review for broad first-pass coverage, but I will only act after verifying each comment against the code, tests, or runtime behavior.
```

## Step 5.3 — Verify each finding

For every AI comment:

1. Open the cited file.
2. Read surrounding context.
3. Search related files.
4. Check tests.
5. Reproduce behavior where possible.
6. Classify exactly once.

### Useful

A real issue with evidence. Verify it, then fix it or create a documented follow-up.

### Noise

Not factually wrong, but low-value or outside project conventions. Record why no action is taken.

### Wrong

The comment contradicts code or ignores context. Do not “fix” an imaginary issue.

## Copy/paste prompt P17 — Challenge one review finding

Use this for any uncertain comment:

```text
Re-evaluate review finding <FINDING_ID> only.

Do not defend the original conclusion automatically.

Read the cited file and all directly relevant files. Then report:
1. exact claim;
2. evidence supporting it;
3. evidence contradicting it;
4. whether it is Confirmed, Context-dependent, Style-only, or Wrong;
5. a manual reproduction or verification procedure.

Do not edit files.
```

## Step 5.4 — Perform your own human review

Use this checklist independently:

### CI
- triggers correct;
- Python exact;
- dependencies complete;
- tests cannot be masked;
- no deployment.

### Docker
- multi-stage;
- correct runtime files;
- explicit slim image;
- non-root;
- correct command;
- no secrets;
- no reload.

### Documentation
- no logic changes;
- commands accurate;
- routes and status codes accurate;
- decision link valid.

### General
- no secrets;
- no unrelated files;
- no accidental generated artifacts;
- tests cover important behavior;
- error handling is consistent;
- naming follows repository conventions.

## Step 5.5 — Fix only verified Useful findings

For each fix:

```bash
git diff
<TEST_COMMAND>
```

Then update the review log with the evidence and decision.

Commit fixes and the completed log:

```bash
git add <VERIFIED_FIX_FILES> docs/module-4/ai-review-log.md
git commit -m "chore: address verified review findings"
git push
```

If there are no code fixes, commit only the review log.

## Phase 5 exit gate

- [ ] A real diff was reviewed.
- [ ] Every Claude comment was copied into the log.
- [ ] Every comment has one classification.
- [ ] Useful findings were verified before changes.
- [ ] Noise was justified.
- [ ] Wrong findings were rejected, not “fixed.”
- [ ] A separate human review was completed.
- [ ] Human-only findings were recorded.
- [ ] Personal AI-review rule is present.
- [ ] Tests pass after any fixes.
- [ ] Final review log is committed and pushed.
- [ ] CI is green.

---

# 11. Phase 6 — Write the technical decision note and reflections

## Objective

Record why a project decision exists, in your own voice, with explicit trade-offs, consequences, and open questions.

## Step 6.1 — Choose one specific decision

Good topics:

- use of an in-memory dictionary for task storage;
- task status-transition rules;
- CI limited to tests;
- multi-stage Docker design;
- non-root Docker runtime;
- a Module 3 refactor approach;
- architecture choice for the Task Tracker.

Choose a decision with real repository evidence and meaningful trade-offs.

Recommended lecture-aligned topic:

```text
In-Memory Dict as the Task Storage Layer
```

## Step 6.2 — Gather evidence before drafting

Read the relevant files:

```bash
sed -n '1,260p' app/main.py
sed -n '1,260p' app/models.py
sed -n '1,260p' Dockerfile
sed -n '1,260p' .github/workflows/ci.yml
sed -n '1,320p' README.md
find tests -type f -maxdepth 3 -print
```

Adapt paths to the repository.

Separate:

- facts visible in code;
- your interpretation;
- assumptions;
- future possibilities.

## Copy/paste prompt P18 — Decision evidence analysis

```text
Perform a read-only evidence analysis for a technical decision note about:

<INSERT DECISION TOPIC>

Read only the directly relevant repository files.

Report:
1. confirmed implementation facts;
2. the project context that makes this decision relevant;
3. realistic alternatives;
4. benefits of the current decision;
5. costs and limitations;
6. consequences for developers, users, tests, and future architecture;
7. open questions that are not answered by the repository;
8. claims that would be generic or unsupported.

For each confirmed fact, identify the source file. Do not draft polished prose yet. Do not edit files.
```

## Step 6.3 — Draft the six required sections

The file must be saved at:

```text
docs/decisions/<DECISION_SLUG>.md
```

Required sections:

1. Context
2. Decision
3. Alternatives Considered
4. Trade-offs
5. Consequences
6. Open Questions

## Copy/paste prompt P19 — Technical note first draft

```text
Use the verified evidence already gathered to draft a technical decision note at:

docs/decisions/<DECISION_SLUG>.md

Required structure:
# Decision: <CLEAR TITLE>

## Context
## Decision
## Alternatives Considered
## Trade-offs
## Consequences
## Open Questions

Requirements:
- distinguish repository facts from interpretation;
- use specific project evidence;
- avoid generic architecture language;
- include realistic alternatives;
- state both benefits and disadvantages;
- do not claim future work is already implemented;
- do not add unsupported performance, security, or scalability claims;
- keep the note concise enough for a teammate to read;
- include a final reflection paragraph beginning exactly:
  "I would do this differently..."

Do not modify README yet.
Show the draft for my review before writing the file.
```

Review the draft carefully. Rewrite Trade-offs, Open Questions, and the reflection in your own words.

Then approve writing the file:

```text
Approved to write only docs/decisions/<DECISION_SLUG>.md using the revised text.

Do not modify other files.
Do not commit or push.
After writing, show the complete diff.
```

## Technical note template

```markdown
# Decision: <Decision title>

## Context

Explain the actual project situation that created the need for this decision. Refer to the current architecture and constraints without turning the section into a general tutorial.

## Decision

State the chosen approach clearly and directly.

## Alternatives Considered

### Alternative 1 — <Name>
Explain why it was realistic and why it was not selected now.

### Alternative 2 — <Name>
Explain why it was realistic and why it was not selected now.

## Trade-offs

### Benefits
- ...

### Costs and limitations
- ...

## Consequences

Explain what this decision changes for:
- the codebase;
- local development;
- testing;
- runtime behavior;
- future work.

## Open Questions

- ...
- ...
- ...

## Reflection

I would do this differently...
```

## Step 6.4 — Add a working README link

Add a section such as:

```markdown
## Technical Decisions

- [<Decision title>](docs/decisions/<DECISION_SLUG>.md)
```

Check the path:

```bash
test -f docs/decisions/<DECISION_SLUG>.md && echo "Decision note exists"
```

Open the README preview or click the link on GitHub after pushing.

## Copy/paste prompt P20 — README link only

```text
Add one minimal README section named "Technical Decisions" if it does not already exist.

Add a relative link to:
docs/decisions/<DECISION_SLUG>.md

Use the decision note's exact title as the link text.

Do not change any other README content.
Do not edit the decision note.
Do not commit or push.
Show the complete README diff.
```

## Step 6.5 — Write the tool-fit reflection

The module compares tools by scope, not by declaring one universally best.

Create `docs/module-4/tool-fit-reflection.md`:

```markdown
# Tool-Fit Reflection

## Copilot / Autocomplete

### Best fit in this project
Describe line-level help, small functions, familiar patterns, or repetitive code.

### Main limitation
Explain why it is not ideal for repository-wide CI, Docker, Git, and command-driven work.

### Verification rule
State how you inspect inserted code.

## Cursor / IDE Chat

### Best fit in this project
Describe file-level or visible project edits, explanations, and editor-based diffs.

### Main limitation
Explain why terminal-heavy workflows still require direct command verification.

### Verification rule
State how you inspect diffs and run the project.

## Claude Code / Terminal Agent

### Best fit in this project
Describe repository-level analysis, plan mode, multi-file changes, tests, Docker, Git, and review.

### Main limitation
Explain the risk of broad permissions and repository-wide scope.

### Verification rule
State how CLAUDE.md, plan mode, command approval, diffs, tests, and evidence control the risk.

## My conclusion

Explain which tool you would choose for:
- a one-line implementation;
- a file-level refactor;
- CI or Docker work;
- code review;
- documentation verification.

## Required reflection

I would do this differently...
```

Write this in your own voice. Use project examples rather than generic claims.

## Copy/paste prompt P21 — Reflection outline

```text
Create a read-only outline for a tool-fit reflection comparing:
- Copilot/autocomplete,
- Cursor/IDE chat,
- Claude Code/terminal agent.

Base the comparison on:
1. scope of work;
2. best-fit tasks in this Task Tracker;
3. risks;
4. required verification;
5. examples from Module 4.

Do not write the final reflection in my voice. Give me questions and bullet-point evidence that I can use to write it myself.
```

## Step 6.6 — Verify note quality

Check:

- [ ] Context is project-specific.
- [ ] Decision is unambiguous.
- [ ] Alternatives are realistic.
- [ ] Trade-offs include benefits and costs.
- [ ] Consequences describe actual effects.
- [ ] Open Questions are genuine.
- [ ] Unsupported claims are absent.
- [ ] The note sounds like your reasoning.
- [ ] Reflection begins with “I would do this differently...”
- [ ] README link works.
- [ ] Tool-fit reflection compares all three tools.

## Step 6.7 — Commit the note and reflection

```bash
git diff --check
git diff -- README.md docs/decisions/ docs/module-4/tool-fit-reflection.md
git add README.md docs/decisions/<DECISION_SLUG>.md docs/module-4/tool-fit-reflection.md
git commit -m "docs: record technical decision and tool-fit reflection"
git push
```

## Phase 6 exit gate

- [ ] Note is under `docs/decisions/`.
- [ ] All six required sections exist.
- [ ] Evidence comes from the repository.
- [ ] Trade-offs are specific.
- [ ] Open questions are your own.
- [ ] Required reflection sentence is present.
- [ ] README link works.
- [ ] Tool-fit reflection compares Copilot, Cursor, and Claude Code.
- [ ] Diff was inspected.
- [ ] Tests still pass.
- [ ] Note and reflection are committed and pushed.
- [ ] CI is green.

---

# 12. Phase 7 — Final integration audit

## Objective

Prove that the final repository is clean, reproducible, documented, tested, and ready for assessment.

## Step 7.1 — Inspect Git state

```bash
git status
git branch --show-current
git log --oneline --decorate -n 20
git diff <DEFAULT_BRANCH>...HEAD --stat
git diff <DEFAULT_BRANCH>...HEAD
```

Look for:

- unrelated feature work;
- secrets;
- `.env`;
- virtual environments;
- caches;
- temporary files;
- intentional broken test;
- generated logs that should not be committed;
- incorrect file paths;
- documentation drift.

## Step 7.2 — Run the complete local test suite

```bash
<TEST_COMMAND>
```

Record final result.

## Step 7.3 — Run the application

```bash
<RUN_COMMAND>
```

In another terminal:

```bash
curl -i http://localhost:8000/health
```

Open:

```text
http://localhost:8000/docs
```

Confirm documented routes and schemas still match.

## Step 7.4 — Rebuild Docker from final state

Stop any conflicting container first:

```bash
docker rm -f tt-final 2>/dev/null || true
```

Then:

```bash
docker build --no-cache -t task-tracker:final .
docker run --rm -d -p 8000:8000 --name tt-final task-tracker:final
curl -i http://localhost:8000/health
docker exec tt-final whoami
docker image ls task-tracker:final
docker stop tt-final
```

Expected user:

```text
app
```

## Step 7.5 — Confirm final CI

Check the latest normal Module 4 commit:

- workflow is green;
- tests executed;
- no intentional failure remains;
- no workflow bypass was added.

## Step 7.6 — Verify README from top to bottom

Confirm:

- project purpose;
- supported Python version;
- setup;
- test;
- run;
- `/docs`;
- Docker build;
- Docker run;
- health check;
- CI explanation;
- project conventions;
- technical decision link.

## Step 7.7 — Verify evidence completeness

Recommended evidence index:

Create `docs/module-4/evidence-index.md`:

```markdown
# Module 4 Evidence Index

## Baseline
- [Baseline](baseline.md)

## Claude Code setup
- `CLAUDE.md`
- [Claude verification](claude-verification.md)

## CI
- `.github/workflows/ci.yml`
- [Green → red → green evidence](ci-green-red-green.md)

## Docker
- `Dockerfile`
- `.dockerignore`
- [Docker security log](docker-security-log.md)

## Documentation
- `README.md`
- Verified docstrings under `app/`
- [Claim-vs-reality log](claim-vs-reality.md)

## AI-assisted review
- [Annotated AI review log](ai-review-log.md)

## Technical decision and reflection
- [Technical decision note](../decisions/<DECISION_SLUG>.md)
- [Tool-fit reflection](tool-fit-reflection.md)

## Final verification
- Final test result:
- Final CI run:
- Final Docker health result:
- Final Docker user:
- Final commit:
```

## Copy/paste prompt P22 — Final read-only Module 4 audit

```text
Perform a final read-only audit of the Module 4 branch against the default branch.

Evaluate only these expectations:

1. CLAUDE.md
- project-specific;
- exact commands;
- business rules;
- CORS/UI states;
- do-not rules.

2. CI
- correct path;
- push and pull-request triggers;
- one test job on ubuntu-latest;
- exact Python version;
- complete test dependencies;
- real failing exit behavior;
- no deployment or failure masking.

3. Docker
- multi-stage;
- explicit slim runtime;
- non-root app user;
- USER before CMD;
- correct host and port;
- no --reload;
- .dockerignore excludes secrets and local artifacts.

4. Documentation
- docstrings and README;
- no behavior changes;
- commands match repository;
- route/status/schema claims match code.

5. Review evidence
- every AI comment classified as Useful, Noise, or Wrong;
- human review present.

6. Decision and reflection
- note under docs/decisions/;
- six required sections;
- README link;
- reflection begins "I would do this differently...";
- tool-fit comparison covers Copilot, Cursor, and Claude Code.

7. Repository hygiene
- no secrets;
- no caches or virtual environments;
- no intentional broken test;
- no unrelated feature additions.

For each item, report:
- Pass;
- Fail;
- Needs human runtime evidence.

Identify exact files. Do not edit, commit, or push.
```

Do not treat Claude’s “Pass” as final approval. Use it as a last triage pass and verify the findings yourself.

## Step 7.8 — Final commit

After completing evidence files:

```bash
git status --short
git diff --check
<TEST_COMMAND>
git add docs/module-4/evidence-index.md
git commit -m "docs: complete Module 4 evidence index"
git push
```

Confirm final CI is green.

---

# 13. Final definition-of-done checklist

## Repository baseline

- [ ] Correct repository and branch used.
- [ ] Initial test result recorded.
- [ ] Initial app and `/health` verified.
- [ ] No unexplained pre-existing failures.

## Claude Code setup

- [ ] `/status` confirmed repository context.
- [ ] `/init` generated `CLAUDE.md`.
- [ ] `CLAUDE.md` was corrected manually.
- [ ] Stack and versions are exact.
- [ ] Run and test commands are exact.
- [ ] Architecture is repository-specific.
- [ ] Business rules are verified.
- [ ] UI states and CORS are verified.
- [ ] Do-not rules are present.
- [ ] Plan mode was demonstrated.
- [ ] Two Claude answers were independently verified.

## CI

- [ ] `.github/workflows/ci.yml` exists.
- [ ] Push trigger exists.
- [ ] Pull request to default branch trigger exists.
- [ ] One `test` job runs on `ubuntu-latest`.
- [ ] Exact Python version is used.
- [ ] Test dependencies are installed.
- [ ] Real test command runs.
- [ ] Failures are not masked.
- [ ] No deployment steps exist.
- [ ] Initial green run exists.
- [ ] Intentional red run exists.
- [ ] Restored green run exists.
- [ ] Broken proof commit is not in the final branch.

## Docker

- [ ] `Dockerfile` is multi-stage.
- [ ] Explicit slim runtime image is used.
- [ ] `.dockerignore` exists.
- [ ] Secrets and local artifacts are excluded.
- [ ] Image builds.
- [ ] Container runs.
- [ ] `/health` succeeds.
- [ ] `whoami` returns `app`.
- [ ] `USER app` appears before `CMD`.
- [ ] Uvicorn uses `0.0.0.0:8000`.
- [ ] `--reload` is absent.
- [ ] Image size is recorded.
- [ ] Security log exists.

## Documentation

- [ ] Public functions and handlers have appropriate docstrings.
- [ ] At least three docstrings were checked manually.
- [ ] README setup command works.
- [ ] README run command works.
- [ ] README test command works.
- [ ] README Docker commands work.
- [ ] README CI description is accurate.
- [ ] `/docs` was compared.
- [ ] Status and error claims match code.
- [ ] Claim-vs-reality log exists.
- [ ] Documentation edits did not change behavior.

## Review

- [ ] A real diff was reviewed.
- [ ] Every Claude finding is logged.
- [ ] Every finding is classified exactly once.
- [ ] Useful findings were verified.
- [ ] Noise is justified.
- [ ] Wrong findings were rejected.
- [ ] Human review was performed.
- [ ] Personal review rule is written.

## Technical note and reflection

- [ ] Note exists under `docs/decisions/`.
- [ ] Context section exists.
- [ ] Decision section exists.
- [ ] Alternatives Considered section exists.
- [ ] Trade-offs section exists.
- [ ] Consequences section exists.
- [ ] Open Questions section exists.
- [ ] README link works.
- [ ] Note is rewritten in your own voice.
- [ ] “I would do this differently...” is present.
- [ ] Tool-fit reflection compares Copilot, Cursor, and Claude Code.

## Final quality

- [ ] Final local tests pass.
- [ ] Final CI is green.
- [ ] Final Docker build succeeds without cache.
- [ ] Final container health succeeds.
- [ ] Final container user is `app`.
- [ ] No secrets are committed.
- [ ] No virtual environments or caches are committed.
- [ ] No unrelated product features were added.
- [ ] All diffs were read before approval.

---

# 14. Recommended final repository structure

```text
Task-Tracker/
├── .github/
│   └── workflows/
│       └── ci.yml
├── app/
│   └── ...
├── docs/
│   ├── decisions/
│   │   └── <DECISION_SLUG>.md
│   └── module-4/
│       ├── evidence-index.md
│       ├── baseline.md
│       ├── claude-verification.md
│       ├── ci-green-red-green.md
│       ├── docker-security-log.md
│       ├── claim-vs-reality.md
│       ├── ai-review-log.md
│       └── tool-fit-reflection.md
├── tests/
│   └── ...
├── .dockerignore
├── CLAUDE.md
├── Dockerfile
├── README.md
└── <REQUIREMENTS_FILE>
```

---

# 15. Suggested commit sequence

A clean history helps demonstrate the work:

```text
docs: add Claude project guidance and Module 4 baseline
ci: add automated test workflow
docs: record CI green red green verification
build: add secure multi-stage Docker image
docs: add verified API and project documentation
chore: address verified review findings
docs: record technical decision and tool-fit reflection
docs: complete Module 4 evidence index
```

The proof branch can contain:

```text
test: intentionally break assertion for CI proof
Revert "test: intentionally break assertion for CI proof"
```

Do not merge the proof branch.

---

# 16. Suggested live demonstration sequence

Use this order when presenting Module 4:

1. **Objective and rules**  
   Explain that the module adds the engineering layer around the existing Task Tracker. State the three rules.

2. **Baseline**  
   Show the passing local test suite and `/health`.

3. **Claude project memory**  
   Open `CLAUDE.md`. Show its project-specific stack, commands, business rules, and do-not rules. Show one verified Claude answer and the source file used.

4. **CI proof**  
   Show the green run, intentional red run, and restored green run. Explain why the red run proves the workflow is meaningful.

5. **Docker proof**  
   Show the build, running container, `/health`, `whoami -> app`, runtime base, and `.dockerignore`.

6. **Documentation verification**  
   Show one claim that was checked against code or `/docs`, including any correction recorded in the claim-vs-reality log.

7. **AI-assisted review**  
   Show one Useful, one Noise, and one Wrong comment if available. Explain the evidence behind each classification.

8. **Technical decision note**  
   Open it from the README link. Explain the decision, alternatives, trade-offs, consequences, and open questions.

9. **Tool-fit reflection**  
   Explain why Copilot fits line-level work, Cursor fits IDE/file-level work, and Claude Code fits repo-level terminal work—with stricter verification as scope grows.

10. **Final ownership statement**  
    State that AI accelerated the work, but every artifact was accepted only after independent inspection and verification.

---

# 17. Troubleshooting guide

## CI workflow appears green but no tests ran

Check:

- test discovery path;
- command spelling;
- working directory;
- dependency installation;
- log for “collected 0 items”;
- shell commands that suppress errors.

Do not accept a green run with zero expected tests.

## CI cannot import `pytest` or `httpx`

The dependency file may not contain test dependencies. Fix dependency truthfully. Do not install ad hoc packages in CI without making the repository’s dependency instructions consistent.

## Workflow is in the wrong folder

Required path:

```text
.github/workflows/ci.yml
```

Anything else will not behave as expected.

## Docker build succeeds but container exits

Run:

```bash
docker ps -a
docker logs <container-name>
```

Common causes:

- wrong import path;
- missing runtime file;
- missing dependency;
- incorrect working directory;
- file ownership problem;
- command syntax problem.

## Docker health check cannot connect

Check:

- container is running;
- Uvicorn uses `--host 0.0.0.0`;
- port mapping is correct;
- host port is not already occupied;
- app started successfully.

## `whoami` returns `root`

Check:

- user creation;
- ownership;
- `USER app`;
- order of Dockerfile instructions;
- whether the command overrides the user.

Do not accept the image until runtime identity is non-root.

## Documentation prompt changes code behavior

Stop. Inspect the diff. Revert logic changes. Ask Claude to perform a documentation-only revision.

## Claude review produces many style comments

Classify them as Noise when they do not violate project conventions or create concrete risk. Do not inflate the review log by treating preferences as defects.

## Claude review claims an issue that related files disprove

Classify it as Wrong, record the overlooked context, and do not modify correct code.

## Technical note sounds generic

Rewrite:

- Context;
- Trade-offs;
- Consequences;
- Open Questions;
- Reflection.

Add project-specific evidence and remove claims that could describe any FastAPI tutorial.

---

# 18. Submission summary template

Use this in the submission message or final report:

```markdown
# Module 4 Submission Summary

## Repository and branch
- Repository:
- Branch:
- Final commit:

## 4.1 Claude Code setup
- `CLAUDE.md`:
- Two verified interactions:
- Evidence:

## 4.2 CI
- Workflow:
- Initial green:
- Intentional red:
- Restored green:
- Evidence:

## 4.3 Docker
- Dockerfile:
- `.dockerignore`:
- Health result:
- Runtime user:
- Image size:
- Security log:

## 4.4 Documentation
- Docstrings:
- README:
- `/docs` comparison:
- Claim-vs-reality log:

## 4.5 AI-assisted review
- Diff reviewed:
- Useful:
- Noise:
- Wrong:
- Human-only findings:
- Review log:

## 4.6 Technical decision and reflection
- Decision note:
- README link:
- Required reflection:
- Tool-fit reflection:

## Final verification
- Local tests:
- Final CI:
- Final Docker build:
- Final Docker health:
- Final container user:
- Repository hygiene:
```

---

# 19. Final principle

The correct Module 4 deliverable is not a collection of polished files generated by AI. It is a collection of engineering artifacts whose claims and behavior you have personally verified.

For every artifact, be able to answer:

1. What did AI propose?
2. What changed?
3. What did I inspect?
4. What command or source proved it?
5. What did I correct?
6. Why did I approve the final result?

That evidence is the real objective of Module 4.
