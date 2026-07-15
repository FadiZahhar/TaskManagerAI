# User Stories and Acceptance Criteria

## Feature 1 — Due Dates + Overdue Filtering

### F1-US1 — Create a task with an optional due date

**As a** Task Tracker user,  
**I want** to assign an optional due date when creating a task,  
**so that** I can see when the work should be completed.

**Acceptance criteria**

- The create form includes a date-only due-date field.
- A valid date is sent using the API's documented ISO date representation.
- Leaving the field empty creates a task with `due_date: null` or the repository-equivalent absent value.
- The created task response and card preserve the selected due date.
- An invalid date value is rejected by backend validation with the repository-defined validation response.
- Existing create behavior for title, description, status, priority, and assignee remains unchanged.

### F1-US2 — Edit or clear a task due date

**As a** Task Tracker user,  
**I want** to add, replace, or remove a due date while editing a task,  
**so that** the deadline remains accurate.

**Acceptance criteria**

- Edit mode is prefilled with the existing due date.
- Saving a different valid date persists after board refresh.
- Clearing the date sends the backend-approved nullable representation and removes it after refresh.
- Updating only the due date does not unintentionally change unrelated task fields.
- Backend validation errors remain visible and do not produce a false success state.

### F1-US3 — See due dates and overdue state on task cards

**As a** Task Tracker user,  
**I want** due dates and overdue tasks to be visually identifiable,  
**so that** I can prioritize late work.

**Acceptance criteria**

- A task with a due date displays a readable date on its card.
- A task with no due date does not display misleading placeholder data.
- Target overdue rule: `due_date < today` and status is not the repository's completed status.
- A task due today is not overdue.
- A completed task is not marked overdue even when its due date is in the past.
- The indicator is readable and does not remove existing priority/status information.

### F1-US4 — Filter the board to overdue tasks

**As a** Task Tracker user,  
**I want** an overdue filter,  
**so that** I can focus only on late incomplete work.

**Acceptance criteria**

- The filter uses backend-owned overdue semantics.
- Activating the filter returns/displays only overdue tasks.
- All Kanban columns remain visible even when a column has no matching tasks.
- An empty result is a successful empty state, not an error.
- Clearing the filter restores the unfiltered board.
- Existing sorting and drag/edit behavior remain functional for displayed tasks.

**AI assumption corrected for Feature 1**

- **Likely AI assumption:** use a required timestamp/datetime field and persist an `overdue` boolean.
- **Correction:** use an optional date-only field. Overdue is derived from due date, current date, and completed status; it is not independently stored. Confirm exact status strings and schema conventions from the repository before coding.

---

## Feature 2 — Search + Combined Filters

### F2-US1 — Search task title and description

**As a** Task Tracker user,  
**I want** to search task text,  
**so that** I can quickly locate relevant work.

**Acceptance criteria**

- The list endpoint accepts an optional text-search query parameter using the repository-approved name.
- Search checks both title and description.
- Matching is case-insensitive and uses substring semantics.
- Leading/trailing search whitespace is trimmed.
- A blank or whitespace-only search behaves as no text search.
- No matches returns HTTP 200 with an empty list.

### F2-US2 — Combine task filters

**As a** Task Tracker user,  
**I want** to combine search with status, priority, assignee, and overdue filters,  
**so that** I can narrow the board precisely.

**Acceptance criteria**

- Omitted filters preserve the existing `GET /tasks` result.
- Multiple supplied filters use logical AND.
- Existing exact status and priority values are used; display labels are never sent as invented API values.
- Invalid validated filter values return the backend-defined validation response, normally 422 for FastAPI enums.
- Filter combinations are deterministic and do not modify stored tasks.

### F2-US3 — Use a compact filter bar without losing board context

**As a** Task Tracker user,  
**I want** search and filters above the board,  
**so that** filtering does not replace the Kanban workflow.

**Acceptance criteria**

- A compact search/filter area appears above the existing board.
- Existing columns remain visible while filters are active.
- Per-column empty placeholders remain clear and truthful.
- Request errors are distinguishable from valid zero-match results.
- The UI prevents avoidable duplicate requests where practical without introducing a new framework or dependency.

### F2-US4 — Clear all filters

**As a** Task Tracker user,  
**I want** a single reset action,  
**so that** I can return to the normal board quickly.

**Acceptance criteria**

- Clear/reset returns every filter control to its default state.
- The unfiltered task list is fetched/rendered again.
- Existing sorting, card actions, drag-and-drop, and modal flows still work.
- Reset does not create, edit, or delete task data.

**AI assumption corrected for Feature 2**

- **Likely AI assumption:** fetch all tasks once and implement filtering only in JavaScript.
- **Correction:** extend the backend list endpoint and test query behavior. The frontend sends filters and renders the server result. Client-only filtering would under-demonstrate the backend/testing competencies in the brief.

---

## Repository reconciliation checklist

Before these stories are marked final, replace assumptions with facts from the actual repository:

- [ ] Exact task-list route and method.
- [ ] Exact create and update routes/methods.
- [ ] Exact completed status value.
- [ ] Exact status and priority enums.
- [ ] Existing optional-field/null convention.
- [ ] Actual frontend file/component locations.
- [ ] Actual pytest fixtures and state-reset pattern.
- [ ] Actual validation response expectations.
