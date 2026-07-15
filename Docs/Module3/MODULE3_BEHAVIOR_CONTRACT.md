# Module 3 Behavior Contract

Use this checklist before refactoring and again after every accepted refactor. Record objective evidence, not impressions.

| # | Contract item | Acceptance evidence | Before refactor | After refactor |
|---|---|---|---|---|
| 1 | The board renders exactly the three API states `ToDo`, `InProgress`, and `Done`, while display labels may use spaces. Counts or clear empty placeholders are visible. | Browser view and DOM/data attributes. | ☐ (not observed — no browser available pre-refactor) | ☑ Confirmed live: three columns, correct labels/counts, "No tasks" placeholders. |
| 2 | Initial loading uses `GET /tasks`; the UI has loading, ready, per-column empty, and request-error behavior. | Network panel plus screenshots or manual notes for all four states. | ☐ (not observed) | ☑ Confirmed live: loading message seen, board populated correctly, empty state observed on fresh storage. |
| 3 | Cards are grouped by status and sorted `High → Medium → Low`, with a deterministic tie-break such as ascending id. | Seeded High/Medium/Low tasks and observed order. | ☐ (not observed) | ☑ Confirmed live: new High-priority task sorted above existing Medium/Low cards in the same column. |
| 4 | Dropping a card into its current column causes no status PATCH and no misleading success state. | Network panel shows no unnecessary PATCH. | ☐ (not observed) | ☑ Confirmed live via Network tab: zero requests fired on a same-column drop. |
| 5 | A valid cross-column drag sends `PATCH /tasks/{id}`, succeeds, appears in the correct column, and remains there after refresh. | PATCH request/response and refreshed browser state. | ☐ (not observed) | ☑ Confirmed live: card moved and stayed in the new column after a full page refresh. |
| 6 | A server-rejected or network-failed drag shows a useful error and restores server truth by reverting or re-fetching. | 422/network failure evidence and final card position. | ☐ (not observed) | ☑ Confirmed live: invalid transition → 422, red error banner shown, card remained in its correct column. |
| 7 | Create mode trims the title, sends no request for blank input, uses `POST /tasks` for valid input, then closes/resets and refreshes the board on success. | Empty-title network check plus successful POST and sorted card placement. | ☐ (not observed) | ☑ Confirmed live: blank title blocked client-side (no request), valid High-priority create appeared correctly sorted. |
| 8 | Edit mode prefills the task, uses `PATCH /tasks/{task_id}`, keeps the modal open with the server message on 422, updates/reorders on success, and all dismissal paths clear stale values/errors. | Successful edit, rejected edit, Cancel, X, Escape, and overlay-click evidence. | ☐ (not observed) | ☑ Confirmed live: title-only edit saved (no spurious 422), invalid-transition edit kept modal open with the real server message, and Escape/Cancel/X/backdrop-click all dismissed correctly (inside-clicks did not), with stale form state cleared on every dismissal. |

## Result

- Contract status before refactor: `0 / 8 PASS` (no browser was available at that time — all items were logic-verified via Node against the live backend only, not browser-observed)
- Contract status after refactor: `8 / 8 PASS` — every item above confirmed through live, interactive manual browser testing
- Regressions found and corrected: **None caused by the X9 refactor itself** (that refactor only touched column-heading label rendering). However, real manual testing surfaced one pre-existing bug from X7, unrelated to the refactor: the card `dragstart` handler crashed with `Uncaught TypeError: event.target.closest is not a function` when a drag gesture started exactly on a text node inside the card. Root cause and fix are recorded in `Docs/Module3/debugging-log.md`, Entry 7. Fixed and re-confirmed live (no crash, correct behavior) as part of this same testing pass.
