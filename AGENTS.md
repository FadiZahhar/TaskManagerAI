# Mid-Course Task Tracker — Agent Instructions

## Assignment objective

Extend the existing Task Tracker from Modules 1–3 with exactly two small, end-to-end features while demonstrating a disciplined AI-assisted engineering workflow.

Selected target features:

1. **Due dates + overdue filtering**
2. **Search + combined filters**

The repository, existing tests, and assignment brief are the source of truth. If this file conflicts with the actual code or course brief, report the conflict before changing behavior.

## Non-negotiable setup

- Work only on the branch `mid-course-project`.
- Inspect the actual repository before proposing architecture or code.
- Preserve all existing routes, enum values, status-transition rules, test fixtures, frontend states, and run commands unless a selected feature requires a narrowly justified extension.
- Do not invent filenames, request fields, response shapes, commands, or framework conventions.
- Do not discard, overwrite, or reformat unrelated work.
- Do not use destructive Git commands.
- Do not commit unless the user explicitly authorizes the commit after reviewing the diff and checks.

## Source-of-truth rules

1. Backend schemas, routes, validation, and tests define the API contract.
2. The frontend displays and invokes the backend contract; it must not silently weaken or redefine validation.
3. A generated diff is a proposal. Accept it only after inspection and verification.
4. A green test is evidence only when the test asserts meaningful behavior and can be shown to fail after a controlled source mutation.
5. Browser behavior is `PASS` only when observed. Otherwise record `NOT RUN` and provide exact manual steps.

## Feature 1 target contract — due dates + overdue filtering

The exact implementation must follow existing repository architecture, but the intended behavior is:

- `due_date` is optional and date-only.
- API representation should be an ISO calendar date such as `2026-07-31`, or `null` when absent.
- Create and update flows support setting, replacing, and clearing the due date.
- Invalid date input is rejected through backend validation with the repository-appropriate validation response, normally HTTP 422 in FastAPI.
- Overdue semantics are backend-owned and documented. Target rule: a task is overdue when its due date is earlier than the current date and its status is not the repository's completed/done status.
- A task due today is not overdue.
- A completed task is not shown as overdue even if its due date is in the past.
- The frontend adds a due-date input to the existing create/edit flow, displays the date on cards, and shows an overdue indicator.
- The frontend exposes an overdue filter and preserves the existing board columns and empty/error states.
- Do not persist a separate mutable `overdue` flag; it is derived behavior.

## Feature 2 target contract — search + combined filters

- Extend the existing task-list endpoint rather than adding a parallel endpoint unless the repository proves that is necessary.
- Support text search over title and description using a documented, case-insensitive substring rule.
- Support combinations of relevant existing filters, targeting status, priority, and assignee, plus overdue when Feature 1 is available.
- Combined filters use logical AND.
- Omitted filters preserve existing `GET /tasks` behavior.
- A blank or whitespace-only search term behaves like no text search.
- Invalid enum-like filter values are rejected by backend validation rather than silently ignored.
- No matches returns HTTP 200 with an empty list.
- The frontend adds a compact filter/search area above the board, keeps all columns visible, preserves per-column empty states, and includes a clear/reset action.
- Prefer server-side filtering. Do not implement only client-side filtering because the assignment assesses backend and test work.

## Scope controls

Reject or request approval before:

- introducing a database or migration system when the existing repository does not use one;
- adding a frontend framework, state-management library, date library, or search dependency;
- splitting a simple existing single-file frontend into a new architecture;
- adding comments, activity logs, authentication, pagination, saved views, bulk operations, themes, or animations;
- performing a whole-file rewrite;
- changing existing business rules merely to simplify the new features.

## Required workflow for every phase

1. Inspect the exact files and symbols involved.
2. State a narrow plan and acceptance evidence.
3. Make the smallest coherent change.
4. Show a focused diff summary.
5. Run the smallest relevant check first.
6. Run the broader relevant suite at a milestone.
7. Verify the app or provide explicit manual checks marked `NOT RUN`.
8. Update the relevant file in `docs/midcourse/` with observed evidence only.
9. Stop at the requested phase; do not continue automatically.

## Testing protocol

- Follow the repository's existing pytest fixture and naming conventions.
- Establish state through public API calls when practical.
- Keep one primary behavior per test.
- Assert both the status code and a meaningful response or state property.
- Add at least four new tests total; target at least four useful tests per selected feature.
- Run targeted tests before the full suite.
- Do not weaken assertions or change a correct expected result to match broken source code.

Suggested Feature 1 cases, subject to the actual contract:

- create with a valid due date;
- invalid date format/value is rejected;
- update and clear a due date;
- overdue filtering returns only past-due, non-completed tasks;
- a due-today task is not overdue;
- a completed past-due task is not overdue.

Suggested Feature 2 cases, subject to the actual contract:

- search matches title;
- search matches description;
- search is case-insensitive;
- status + priority combination uses AND;
- no match returns `200` and `[]`;
- invalid status or priority filter returns the backend-defined validation response.

## Break Test protocol

Complete at least two controlled Break Tests: one important test for each feature.

Before each Break Test:

- confirm a clean checkpoint;
- identify one minimal temporary source mutation;
- explain why the selected test should fail;
- do not modify the test;
- obtain explicit approval for the mutation.

Execution sequence:

1. Correct source: targeted test passes.
2. Apply only the approved source mutation.
3. Targeted test fails for the expected semantic reason.
4. Capture the relevant failure output.
5. Restore the exact source.
6. Targeted test passes again.
7. Confirm with `git diff`/`git status` that no accidental mutation remains.
8. Record the pass → fail → restored pass evidence in `docs/midcourse/verification.md`.

## Documentation contract

Required files live in `docs/midcourse/`:

- `user-stories.md`
- `mini-adr.md`
- `prompt-log.md`
- `verification.md`
- `reflection.md`

Supporting files in this pack are also expected to be maintained:

- `behavior-contract.md`
- `claude-prompts.md`
- `submission-checklist.md`
- `evidence/README.md`

Never fabricate a prompt response, test result, browser observation, commit hash, screenshot, or failure. Use `TBD`, `NOT RUN`, or a clearly marked placeholder until observed.

## Required handoff after every Claude task

Report:

1. Files inspected.
2. Files changed.
3. What changed and why.
4. Diff risks or assumptions.
5. Commands run and exact results.
6. Verification status as `PASS`, `FAIL`, or `NOT RUN`.
7. Documentation updated.
8. Remaining risks.
9. Next smallest recommended step.
