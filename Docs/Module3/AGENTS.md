# Module 3 Task Tracker — Agent Instructions

## Scope

Complete Module 3 in the existing Module 2 Task Tracker repository. The work must add a browser frontend while preserving the FastAPI backend contract and existing tests.

## Source of truth

1. Inspect the repository before making assumptions.
2. `app/main.py`, imported schemas/models, and the existing tests define the actual API contract.
3. The backend owns validation and status-transition rules. The frontend may present those rules, but must not bypass or redefine them.
4. If the repository contradicts a task assumption, report the conflict before changing behavior.

## Required frontend behavior

- Use a simple vanilla HTML/CSS/JavaScript frontend, normally in `frontend/index.html`, unless the repository already uses another clearly established location.
- Render exactly three API statuses: `ToDo`, `InProgress`, and `Done`.
- Display labels may be `To Do`, `In Progress`, and `Done`, but requests must use the exact API values.
- Load tasks from `GET /tasks`.
- Sort cards within each column by `High`, then `Medium`, then `Low`; use a deterministic secondary order such as ascending task id.
- Support loading, ready, per-column empty, and request-error states.
- Use browser-native drag-and-drop; do not add a drag-and-drop dependency.
- A cross-column drop sends `PATCH /tasks/{id}` with the new status.
- A same-column drop sends no PATCH request.
- On a rejected move or network failure, restore server truth by reverting or refreshing and show a useful error.
- Add create and edit modal flows with title, description, status, priority, and assignee, adjusted only if the actual schema differs.
- Create uses `POST /tasks`; edit uses `PATCH /tasks/{id}`.
- Trim the title before validation. A blank or whitespace-only title must not trigger a network request.
- Convert an empty optional assignee to `null` when that matches the backend schema.
- A server 422 must keep the modal open and show the server message.
- Successful create/edit clears errors, closes the modal, resets stale state, and refreshes the board.
- Cancel, close button, Escape, and overlay click must dismiss the modal and clear stale state.

## Working protocol

1. Work in small, reviewable phases. Do not implement the entire module in one change.
2. Before editing, identify the exact files and symbols involved and state a focused plan.
3. Prefer the smallest change that satisfies the current phase.
4. Do not perform a whole-file rewrite unless it is unavoidable and explicitly justified.
5. Preserve API paths, HTTP methods, exact enum strings, selectors, data attributes, title `.trim()` validation, 422 handling, and error/revert paths.
6. Inspect the diff after every phase.
7. Run the smallest relevant checks after each change and the full test suite at milestone boundaries.
8. Do not claim browser behavior was verified unless it was actually observed. Otherwise provide exact manual verification steps and mark them `NOT RUN`.
9. Do not use destructive Git commands or create commits unless explicitly authorized.
10. Do not weaken tests, remove assertions, suppress exceptions, or change expected status codes merely to make tests pass.

## Testing protocol

- Brainstorm PATCH edge cases before writing test code.
- Add one focused pytest test at a time using the repository's existing fixture pattern.
- Run the targeted test first.
- Prove at least one new test through deliberate source breakage: pass on correct code, fail for the expected reason after a minimal temporary mutation, restore the source, then pass again.
- Deliberate breakage requires a clean checkpoint and explicit approval before changing correct source code.
- Candidate cases include unsupported status, invalid priority, invalid backward transition, valid forward transition, missing task id, and backend-defined behavior for an empty or unsupported update body.

## Debugging protocol

Use evidence, not vague descriptions. Record:

1. Bug or failure.
2. Evidence: failing test, status code, response body, console output, network request, or traceback.
3. Root-cause diagnosis and the smallest proposed source fix.
4. Decision: accept or reject, explaining whether it fixes the cause or only suppresses the symptom.

## Required handoff after every task

Report:

1. Files inspected and files changed.
2. What changed and why.
3. Commands run and their results.
4. Verification completed, with `PASS`, `FAIL`, or `NOT RUN`.
5. Remaining risks or manual checks.
6. The next smallest recommended step.
