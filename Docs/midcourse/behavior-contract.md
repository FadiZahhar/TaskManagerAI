# Mid-Course Behavior Contract

Use this contract before the focused refactor and again after it. Record objective evidence. Browser-dependent items cannot be marked `PASS` from code inspection alone.

| # | Contract item | Acceptance evidence | Before refactor | After refactor |
|---|---|---|---|---|
| 1 | Existing Module 1–3 pytest suite still passes. | Full pytest command and summary. | **PASS** | NOT RUN |
| 2 | Existing unfiltered `GET /tasks` behavior remains compatible. | Regression test or before/after response comparison. | **PASS** | NOT RUN |
| 3 | Existing create/edit/drag/status behavior remains usable. | Relevant tests plus browser/Network observations. | **PASS** | NOT RUN |
| 4 | A task can be created with a valid optional due date and the value persists after refresh. | POST response plus refreshed card. | **PASS** | NOT RUN |
| 5 | A due date can be updated and cleared without altering unrelated fields. | PATCH response and refreshed task state. | **PASS** | NOT RUN |
| 6 | Invalid due-date input is rejected by backend validation. | Targeted pytest response/status/body. | **PASS** | NOT RUN |
| 7 | Overdue semantics match the ADR: past date, not completed; due today and completed past-due tasks are not overdue. | Focused tests with controlled dates/statuses. | **PASS** | NOT RUN |
| 8 | The board visibly displays due dates and a truthful overdue indicator. | Browser observation or screenshot. | **PASS** | NOT RUN |
| 9 | Overdue filtering returns only overdue tasks and a valid empty list when there are none. | API test plus UI observation. | **PASS** | NOT RUN |
| 10 | Text search matches title and description case-insensitively. | Focused pytest tests. | **PASS** | NOT RUN |
| 11 | Combined filters use logical AND and omitted filters preserve normal behavior. | Combination and unfiltered regression tests. | **PASS** | NOT RUN |
| 12 | Invalid validated filter values return the backend-defined validation response. | Targeted pytest status/body. | **PASS** | NOT RUN |
| 13 | No-match search/filter results return 200 with `[]`; the UI shows valid empty states, not an error. | API response plus browser observation. | **PASS** | NOT RUN |
| 14 | Search/filter controls keep all Kanban columns visible and reset restores the unfiltered board. | Browser and Network observations. | **PASS** | NOT RUN |
| 15 | HTTP/network failures remain visible and do not leave false UI success. | Browser/Network failure check. | **PASS** | NOT RUN |
| 16 | At least two Break Tests show pass → expected source-failure → restored pass, with clean Git state. | `verification.md` evidence. | **PASS** | NOT RUN |

## Result

- Before-refactor contract: `16 / 16 PASS`, `0 FAIL`, `0 NOT RUN`
- After-refactor contract: `___ / 16 PASS`, `___ FAIL`, `___ NOT RUN` (pending Prompt 16B)
- Regressions discovered and corrected: `None — no FAIL found in the pre-refactor audit`
- Manual checks still outstanding: `None — F1 browser 53/53 (verification.md §3), F2 browser 22/22 (§4), evidence per item in §5`
