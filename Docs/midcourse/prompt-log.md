# AI Prompt Log

> Complete this file from the actual Claude sessions. Keep prompts and response summaries concise. Do not paste entire transcripts or invent decisions.

## Tools used

| Tool | Purpose | Why selected |
|---|---|---|
| Claude Code | Repository inspection, planning, focused implementation, test drafting, diff review, and evidence-based debugging | `[COMPLETE]` |
| `[OTHER TOOL, IF USED]` | `[PURPOSE]` | `[REASON]` |

## Weak prompt rewritten into a stronger prompt

### Weak prompt

```text
Add due dates and filters to my task app and test everything.
```

### Why it is weak

- It combines two features and every development phase.
- It does not name the repository contract, files, edge cases, or scope boundaries.
- It invites a large rewrite and invented architecture.
- “Test everything” is not measurable.

### Stronger rewrite

```text
Read AGENTS.md, CLAUDE.md, the actual task schemas/routes, existing pytest tests, and the current frontend. Work read-only first.

For Feature 1 only, produce a repository-grounded implementation plan for an optional date-only due_date field and overdue filtering. Confirm exact files, completed-status value, nullable-field convention, current task-list route, test fixtures, and frontend modal/card functions. Use this target overdue rule unless the repository proves a conflict: due_date is before today and status is not completed; due today is not overdue.

Return acceptance criteria, exact likely files/symbols, risks, proposed targeted tests, browser evidence, and the smallest phase order. Do not edit code, add dependencies, or plan Feature 2 yet. Mark assumptions separately from repository facts and stop after the plan.
```

---

## Feature 1 — Due Dates + Overdue Filtering

### F1-P1 — Repository-grounded feature plan

**Prompt used:** See Prompt 03 in `claude-prompts.md` or paste the exact final prompt here.

```text
[PASTE EXACT PROMPT SENT]
```

**AI response summary:** `[WHAT CLAUDE FOUND AND PROPOSED]`

**Human review:**

- Accepted: `[ITEMS]`
- Edited: `[ITEMS AND WHY]`
- Rejected: `[ITEMS AND WHY]`
- Corrected AI assumption: `[REQUIRED — AT LEAST ONE FOR THIS FEATURE]`

**Evidence produced:** `[FILES, PLAN, COMMANDS, OR DIFF]`

### F1-P2 — Backend implementation

**Prompt used:** See Prompt 04.

```text
[PASTE EXACT PROMPT SENT]
```

**AI response summary:** `[COMPLETE]`

**Human review:**

- Accepted: `[COMPLETE]`
- Edited: `[COMPLETE]`
- Rejected: `[COMPLETE]`

**Verification:** `[TARGETED COMMAND + RESULT]`

### F1-P3 — Focused pytest coverage

**Prompt used:** See Prompt 05.

```text
[PASTE EXACT PROMPT SENT]
```

**AI response summary:** `[COMPLETE]`

**Human review:**

- Accepted test cases: `[COMPLETE]`
- Assertions strengthened or setup edited: `[COMPLETE]`
- Rejected test or weak assertion: `[COMPLETE]`

**Verification:** `[TARGETED/FULL COMMANDS + RESULTS]`

### F1-P4 — Frontend integration and browser contract

**Prompt used:** See Prompt 06.

```text
[PASTE EXACT PROMPT SENT]
```

**AI response summary:** `[COMPLETE]`

**Human review:**

- Accepted: `[COMPLETE]`
- Edited: `[COMPLETE]`
- Rejected: `[COMPLETE]`

**Browser evidence:** `[PASS/FAIL/NOT RUN + LOCATION]`

### F1-P5 — Break Test and debugging evidence

**Prompt used:** See Prompts 08A and 08B.

```text
[PASTE EXACT PROMPT(S) SENT]
```

**AI response summary:** `[COMPLETE]`

**Human decision:** `[WHY THE MUTATION WAS SAFE AND WHY THE FAILURE PROVED THE TEST]`

---

## Feature 2 — Search + Combined Filters

### F2-P1 — Repository-grounded feature plan

**Prompt used:** See Prompt 09.

```text
[PASTE EXACT PROMPT SENT]
```

**AI response summary:** `[WHAT CLAUDE FOUND AND PROPOSED]`

**Human review:**

- Accepted: `[ITEMS]`
- Edited: `[ITEMS AND WHY]`
- Rejected: `[ITEMS AND WHY]`
- Corrected AI assumption: `[REQUIRED — AT LEAST ONE FOR THIS FEATURE]`

### F2-P2 — Backend filtering implementation

**Prompt used:** See Prompt 10.

```text
[PASTE EXACT PROMPT SENT]
```

**AI response summary:** `[COMPLETE]`

**Human review:**

- Accepted: `[COMPLETE]`
- Edited: `[COMPLETE]`
- Rejected: `[COMPLETE]`

**Verification:** `[TARGETED COMMAND + RESULT]`

### F2-P3 — Focused pytest coverage

**Prompt used:** See Prompt 11.

```text
[PASTE EXACT PROMPT SENT]
```

**AI response summary:** `[COMPLETE]`

**Human review:**

- Accepted test cases: `[COMPLETE]`
- Assertions strengthened or setup edited: `[COMPLETE]`
- Rejected test or weak assertion: `[COMPLETE]`

### F2-P4 — Frontend search/filter bar

**Prompt used:** See Prompt 12.

```text
[PASTE EXACT PROMPT SENT]
```

**AI response summary:** `[COMPLETE]`

**Human review:**

- Accepted: `[COMPLETE]`
- Edited: `[COMPLETE]`
- Rejected: `[COMPLETE]`

**Browser evidence:** `[PASS/FAIL/NOT RUN + LOCATION]`

### F2-P5 — Break Test and debugging evidence

**Prompt used:** See Prompts 14A and 14B.

```text
[PASTE EXACT PROMPT(S) SENT]
```

**AI response summary:** `[COMPLETE]`

**Human decision:** `[COMPLETE]`

---

## Refactor prompt and decision

**Prompt used:** See Prompts 16A and 16B.

**Selected area:** `[FILTER HELPER / QUERY BUILDER / RENDER FUNCTION / OTHER]`

**Behavior risks named before refactor:** `[COMPLETE]`

**AI changes accepted/edited/rejected:** `[COMPLETE]`

**Before/after contract result:** `[COMPLETE]`

## Evidence-based debugging entry

**Failure:** `[ONE REAL FAILURE]`

**Evidence supplied to AI:** `[STATUS, RESPONSE, TRACEBACK, CONSOLE, NETWORK, OR DIFF]`

**AI diagnosis:** `[SUMMARY]`

**Decision:** `ACCEPTED / EDITED / REJECTED` — `[WHY]`

**Result:** `[TARGETED + FULL VERIFICATION]`
