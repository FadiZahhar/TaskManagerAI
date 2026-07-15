# Module 3 Behavior Contract

Use this checklist before refactoring and again after every accepted refactor. Record objective evidence, not impressions.

| # | Contract item | Acceptance evidence | Before refactor | After refactor |
|---|---|---|---|---|
| 1 | The board renders exactly the three API states `ToDo`, `InProgress`, and `Done`, while display labels may use spaces. Counts or clear empty placeholders are visible. | Browser view and DOM/data attributes. | ☐ | ☐ |
| 2 | Initial loading uses `GET /tasks`; the UI has loading, ready, per-column empty, and request-error behavior. | Network panel plus screenshots or manual notes for all four states. | ☐ | ☐ |
| 3 | Cards are grouped by status and sorted `High → Medium → Low`, with a deterministic tie-break such as ascending id. | Seeded High/Medium/Low tasks and observed order. | ☐ | ☐ |
| 4 | Dropping a card into its current column causes no status PATCH and no misleading success state. | Network panel shows no unnecessary PATCH. | ☐ | ☐ |
| 5 | A valid cross-column drag sends `PATCH /tasks/{id}`, succeeds, appears in the correct column, and remains there after refresh. | PATCH request/response and refreshed browser state. | ☐ | ☐ |
| 6 | A server-rejected or network-failed drag shows a useful error and restores server truth by reverting or re-fetching. | 422/network failure evidence and final card position. | ☐ | ☐ |
| 7 | Create mode trims the title, sends no request for blank input, uses `POST /tasks` for valid input, then closes/resets and refreshes the board on success. | Empty-title network check plus successful POST and sorted card placement. | ☐ | ☐ |
| 8 | Edit mode prefills the task, uses `PATCH /tasks/{id}`, keeps the modal open with the server message on 422, updates/reorders on success, and all dismissal paths clear stale values/errors. | Successful edit, rejected edit, Cancel, X, Escape, and overlay-click evidence. | ☐ | ☐ |

## Result

- Contract status before refactor: `___ / 8 PASS`
- Contract status after refactor: `___ / 8 PASS`
- Regressions found and corrected: `________________________________________`
