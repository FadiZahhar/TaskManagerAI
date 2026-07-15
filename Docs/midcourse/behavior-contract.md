# Mid-Course Behavior Contract

Use this contract before the focused refactor and again after it. Record objective evidence. Browser-dependent items cannot be marked `PASS` from code inspection alone.

| # | Contract item | Acceptance evidence | Before refactor | After refactor |
|---|---|---|---|---|
| 1 | Existing Module 1–3 pytest suite still passes. | Full pytest command and summary. | NOT RUN | NOT RUN |
| 2 | Existing unfiltered `GET /tasks` behavior remains compatible. | Regression test or before/after response comparison. | NOT RUN | NOT RUN |
| 3 | Existing create/edit/drag/status behavior remains usable. | Relevant tests plus browser/Network observations. | NOT RUN | NOT RUN |
| 4 | A task can be created with a valid optional due date and the value persists after refresh. | POST response plus refreshed card. | NOT RUN | NOT RUN |
| 5 | A due date can be updated and cleared without altering unrelated fields. | PATCH response and refreshed task state. | NOT RUN | NOT RUN |
| 6 | Invalid due-date input is rejected by backend validation. | Targeted pytest response/status/body. | NOT RUN | NOT RUN |
| 7 | Overdue semantics match the ADR: past date, not completed; due today and completed past-due tasks are not overdue. | Focused tests with controlled dates/statuses. | NOT RUN | NOT RUN |
| 8 | The board visibly displays due dates and a truthful overdue indicator. | Browser observation or screenshot. | NOT RUN | NOT RUN |
| 9 | Overdue filtering returns only overdue tasks and a valid empty list when there are none. | API test plus UI observation. | NOT RUN | NOT RUN |
| 10 | Text search matches title and description case-insensitively. | Focused pytest tests. | NOT RUN | NOT RUN |
| 11 | Combined filters use logical AND and omitted filters preserve normal behavior. | Combination and unfiltered regression tests. | NOT RUN | NOT RUN |
| 12 | Invalid validated filter values return the backend-defined validation response. | Targeted pytest status/body. | NOT RUN | NOT RUN |
| 13 | No-match search/filter results return 200 with `[]`; the UI shows valid empty states, not an error. | API response plus browser observation. | NOT RUN | NOT RUN |
| 14 | Search/filter controls keep all Kanban columns visible and reset restores the unfiltered board. | Browser and Network observations. | NOT RUN | NOT RUN |
| 15 | HTTP/network failures remain visible and do not leave false UI success. | Browser/Network failure check. | NOT RUN | NOT RUN |
| 16 | At least two Break Tests show pass → expected source-failure → restored pass, with clean Git state. | `verification.md` evidence. | NOT RUN | NOT RUN |

## Result

- Before-refactor contract: `___ / 16 PASS`, `___ FAIL`, `___ NOT RUN`
- After-refactor contract: `___ / 16 PASS`, `___ FAIL`, `___ NOT RUN`
- Regressions discovered and corrected: `[COMPLETE]`
- Manual checks still outstanding: `[COMPLETE]`
