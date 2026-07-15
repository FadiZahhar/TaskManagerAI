# Verification Evidence

> Record only observed output. Use concise excerpts rather than huge logs. Optional screenshots belong in `docs/midcourse/evidence/`.

## 1. Baseline check

| Item | Evidence |
|---|---|
| Date/time | `[YYYY-MM-DD HH:MM TZ]` |
| Branch before work | `[BRANCH]` |
| Required branch created/switched | `mid-course-project — PASS/FAIL` |
| Starting commit | `[HASH]` |
| Git status | `[CLEAN OR DESCRIBE EXISTING CHANGES]` |
| Backend start command | `[COMMAND]` |
| Frontend start/open command | `[COMMAND]` |
| Baseline pytest command | `[COMMAND]` |
| Baseline pytest result | `[N PASSED / FAILURES / DURATION]` |
| Baseline app/API smoke check | `[OBSERVATION OR NOT RUN]` |
| Baseline browser check | `[OBSERVATION OR NOT RUN]` |

Existing failures, if any, before feature work:

```text
[PASTE CONCISE REAL OUTPUT OR WRITE NONE]
```

## 2. New backend tests

Use one row per new test. The assignment requires at least four new pytest tests; the recommended target is at least eight meaningful tests across the two features.

| Feature | Test name | Behavior protected | Targeted command | Result |
|---|---|---|---|---|
| Due dates | `[TEST]` | Valid create due date | `[COMMAND]` | NOT RUN |
| Due dates | `[TEST]` | Invalid due date rejected | `[COMMAND]` | NOT RUN |
| Due dates | `[TEST]` | Update/clear due date | `[COMMAND]` | NOT RUN |
| Due dates | `[TEST]` | Overdue predicate/filter | `[COMMAND]` | NOT RUN |
| Search/filters | `[TEST]` | Title/description search | `[COMMAND]` | NOT RUN |
| Search/filters | `[TEST]` | Case-insensitive matching | `[COMMAND]` | NOT RUN |
| Search/filters | `[TEST]` | Combined status + priority | `[COMMAND]` | NOT RUN |
| Search/filters | `[TEST]` | No matches or invalid filter | `[COMMAND]` | NOT RUN |

### Full suite after Feature 1

```text
Command: [COMMAND]
Result: [REAL SUMMARY]
```

### Full suite after Feature 2

```text
Command: [COMMAND]
Result: [REAL SUMMARY]
```

### Final full suite

```text
Command: [COMMAND]
Result: [REAL SUMMARY]
```

## 3. Manual browser checks — Feature 1

| Check | Exact action | Expected | Evidence | Status |
|---|---|---|---|---|
| Create with date | Create a task with a future date. | POST succeeds; date appears and persists after refresh. | `[NETWORK/SCREENSHOT/NOTE]` | NOT RUN |
| Create without date | Create with empty date field. | Task is created without a misleading date. | `[EVIDENCE]` | NOT RUN |
| Edit date | Change the date, save, refresh. | New date persists; unrelated fields stay unchanged. | `[EVIDENCE]` | NOT RUN |
| Clear date | Remove date in edit mode. | Date remains cleared after refresh. | `[EVIDENCE]` | NOT RUN |
| Overdue indicator | View a past-due incomplete task. | Overdue marker is visible. | `[EVIDENCE]` | NOT RUN |
| Due today | View a task due today. | It is not marked overdue. | `[EVIDENCE]` | NOT RUN |
| Completed past due | View a completed task with a past date. | It is not marked overdue. | `[EVIDENCE]` | NOT RUN |
| Overdue filter | Activate then clear filter. | Only overdue tasks display; columns remain; clear restores. | `[EVIDENCE]` | NOT RUN |

## 4. Manual browser checks — Feature 2

| Check | Exact action | Expected | Evidence | Status |
|---|---|---|---|---|
| Search title | Enter a unique title fragment. | Matching task displays. | `[EVIDENCE]` | NOT RUN |
| Search description | Enter a description-only fragment. | Matching task displays. | `[EVIDENCE]` | NOT RUN |
| Case-insensitive | Search with different case. | Same matching task displays. | `[EVIDENCE]` | NOT RUN |
| Combined filters | Choose status + priority and optional assignee/overdue. | Only tasks satisfying every criterion display. | `[EVIDENCE]` | NOT RUN |
| No matches | Enter a known non-match. | 200/empty result; columns and empty states remain. | `[EVIDENCE]` | NOT RUN |
| Clear/reset | Click clear/reset. | Controls reset and unfiltered board reloads. | `[EVIDENCE]` | NOT RUN |
| Request error | Stop backend or use observed failure safely. | Visible error; no false “no matches” state. | `[EVIDENCE]` | NOT RUN |

## 5. Behavior contract before refactor

Copy the completed statuses from `behavior-contract.md` and add evidence references.

- Result: `[__ / 16 PASS]`
- Failures corrected before checkpoint: `[COMPLETE]`
- Commit/checkpoint: `[HASH AND MESSAGE]`

## 6. Break Test evidence — required test 1 (Feature 1)

| Step | Evidence |
|---|---|
| Selected test | `[TEST NAME]` |
| Why important | `[BEHAVIOR/BUG IT PROTECTS]` |
| Clean checkpoint | `[HASH / GIT STATUS]` |
| Correct-source command/result | `[COMMAND + PASS]` |
| Approved temporary source mutation | `[EXACT SMALL CHANGE; DO NOT CHANGE TEST]` |
| Mutated-source command/result | `[COMMAND + EXPECTED FAILURE EXCERPT]` |
| Why failure is semantic | `[EXPLAIN]` |
| Source restoration | `[HOW RESTORED]` |
| Restored command/result | `[COMMAND + PASS]` |
| Final Git proof | `[git diff/status RESULT]` |

## 7. Break Test evidence — required test 2 (Feature 2)

| Step | Evidence |
|---|---|
| Selected test | `[TEST NAME]` |
| Why important | `[BEHAVIOR/BUG IT PROTECTS]` |
| Clean checkpoint | `[HASH / GIT STATUS]` |
| Correct-source command/result | `[COMMAND + PASS]` |
| Approved temporary source mutation | `[EXACT SMALL CHANGE; DO NOT CHANGE TEST]` |
| Mutated-source command/result | `[COMMAND + EXPECTED FAILURE EXCERPT]` |
| Why failure is semantic | `[EXPLAIN]` |
| Source restoration | `[HOW RESTORED]` |
| Restored command/result | `[COMMAND + PASS]` |
| Final Git proof | `[git diff/status RESULT]` |

## 8. Focused refactor and behavior preservation

| Item | Evidence |
|---|---|
| Working checkpoint before refactor | `[HASH]` |
| Refactor target | `[ONE FUNCTION/SECTION]` |
| Reason | `[READABILITY/DUPLICATION/STRUCTURE]` |
| Files/symbols changed | `[COMPLETE]` |
| AI proposal accepted/edited/rejected | `[COMPLETE]` |
| Targeted checks | `[COMMANDS + RESULTS]` |
| Full pytest result | `[RESULT]` |
| Browser contract result | `[RESULT]` |

## 9. Behavior contract after refactor

- Result: `[__ / 16 PASS]`
- Regressions found: `[NONE OR DESCRIBE]`
- Corrections made: `[COMPLETE]`
- Remaining `NOT RUN` items: `[COMPLETE]`

## 10. Final repository hygiene

| Check | Status/evidence |
|---|---|
| Branch is exactly `mid-course-project` | NOT RUN |
| Working tree contains no temporary Break Test mutation | NOT RUN |
| No secrets/credentials/private data | NOT RUN |
| No debug prints or temporary sample data | NOT RUN |
| No unrelated generated files | NOT RUN |
| Required docs complete with no brackets/TBD | NOT RUN |
| README commands verified | NOT RUN |
| Public remote branch pushed | NOT RUN |
| Repository URL ready for submission | `[URL]` |
