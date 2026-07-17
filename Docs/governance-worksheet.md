# AI Governance Worksheet

## 1. Scope and evidence

This retrospective uses repository evidence from Modules 1–3 and the
mid-course project. Module 4 evidence is not present on the
`module-5-governance` branch, so no Module 4 sharing event is invented. Risk
classifications, ownership answers, and personal rules were reviewed and
approved by the student on 2026-07-18.

Risk rubric:

- **Low:** Public or educational toy-project material with no secrets,
  personal data, or proprietary logic.
- **Medium:** Private but non-sensitive implementation details, broad
  repository context, or diagnostic data whose provenance is uncertain.
- **High:** Credentials, secrets, production configuration, real user data,
  regulated data, or code that was not authorized for sharing.

## 2. What I Shared

| ID | Module / task | AI tool | What I shared | Public or private? | Secrets / PII? | Final risk | Why | Safer future version |
|---|---|---|---|---|---|---|---|---|
| G1 | Module 1 requirements, user stories, architecture, and skeleton | ChatGPT and Claude | Task Tracker course objectives, task fields and enums, scope exclusions, user-story drafts, architecture choices, and skeleton requirements | Course toy-project context; repository visibility at the time is not established | None evidenced | **Low** | The content was educational project material without production configuration, credentials, or real-user data. | Share only the requirement and small design excerpt needed for the current question. |
| G2 | Module 2 models, CRUD routes, tests, and debugging | Claude | Relevant backend files, model and validation contracts, expected API behavior, pytest failures, and actual/expected values | Course toy-project source | None evidenced; full tracebacks can still reveal unrelated local paths | **Low** | The material was course code and focused diagnostic evidence, not production or customer information. | Share only the failing test, smallest relevant functions, and a redacted traceback excerpt. |
| G3 | Module 3 frontend and browser debugging | Codex | Repository instructions, backend contract, frontend code, behavior contract, browser console error, and reproduction steps | Course toy-project source and diagnostic output | None evidenced | **Low** | The console error and code were relevant to the educational application and contained no identified credentials or real-user data. | Share the failing handler, exact console error, and minimal reproduction instead of broad frontend context. |
| G4 | Mid-course repository inspection, planning, and implementation | Claude Code | Broad repository context covering models, storage, routes, tests, frontend, documentation, and Git state | Complete repository context; visibility at the time of sharing is not established by this branch | None evidenced | **Medium** | Even without secrets, complete repository context exposed more non-public implementation detail than some focused tasks required. | Approve a short list of anchor files for each task and summarize other behavior without sharing the whole repository. |
| G5 | Mid-course browser-verification debugging | Claude Code | A captured DOM snapshot, request URLs, assertion details, seed data, and relevant refresh/date/overdue code paths | Focused diagnostic artifacts; seed-data provenance is not independently confirmed here | No secret evidenced; real-versus-synthetic data provenance is uncertain | **Medium** | The evidence was useful, but uncertainty about data provenance justifies a conservative classification. | Reproduce with clearly synthetic tasks, redact local identifiers, and share only the failing DOM and request fragments. |

### Classification observations

- No High-risk sharing is evidenced in the available repository history.
- G4 and G5 are Medium because uncertainty is recorded rather than silently
  treated as safe.
- The current-tree security review found no tracked `.env` or private-key file,
  but that does not prove what every historical prompt contained.
- Module 4 remains unavailable in this branch and is not represented by a
  fictional clean row.

## 3. What I Received

| Module / task | AI output | Where used | Reviewed how? | Accepted, modified, or rejected? |
|---|---|---|---|---|
| Module 1 stories and architecture | Given/When/Then stories, architecture alternatives, an ADR draft, and a FastAPI skeleton | `Docs/user-stories.md`, `Docs/adr-0001-stack.md`, and the initial application structure | Compared the stories with product scope; started Uvicorn; checked `/health` and `/docs`; ran pytest | **Modified:** removed the health check as a product story, rewrote ADR tradeoffs, and repaired the generated package structure before accepting it |
| Module 2 CRUD implementation | Pydantic models, in-memory storage, CRUD routes, transition validation, and pytest coverage | `app/models.py`, `app/storage.py`, `app/main.py`, `app/business_rules.py`, and `tests/test_tasks.py` | Import and functional checks, live endpoint checks, 19-test suite, and a controlled Break Test | **Accepted with correction:** kept the scoped implementation but replaced Python 3.10 union syntax that failed in the documented Python 3.9 environment |
| Module 3 frontend | Single-file Kanban UI, fetch/render states, drag-and-drop, modal behavior, verification guidance, and a text-node drag fix | `frontend/index.html`, behavior contract, and debugging log | Static checks, pytest regression checks, and live browser confirmation | **Accepted after verification:** a real browser exposed the `event.target.closest` assumption, and the focused type-normalization fix was accepted |
| Mid-course due-date feature | Repository-grounded plan, backend and frontend implementation, 16 focused tests, and Break Test proposals | Models, storage, routes, frontend, tests, ADR, prompt log, and verification evidence | Targeted and full pytest runs, TestClient smoke checks, browser/Network checks, and controlled mutations | **Accepted and modified through human decisions:** rejected a stored overdue flag and required optional date-only input with a derived overdue rule |
| Mid-course search and combined filters | Backend filters, frontend filter bar, 19 tests, stale-response guard, refactor proposal, and debugging analysis | `app/main.py`, `app/storage.py`, `frontend/index.html`, `tests/test_search_filters.py`, and mid-course evidence | Targeted/full tests, browser Network capture, Break Test, and before/after refactor checks | **Mixed:** accepted server-side filtering and the query-helper refactor; rejected client-only filtering and the higher-risk backend filter-chain refactor |

## 4. One Generated Block I Must Own

### Source and context

- **Module:** Mid-course Feature 2 — search and combined filters
- **Tool:** Claude Code
- **File:** `frontend/index.html:965-982`
- **Generation evidence:** `Docs/midcourse/prompt-log.md` records that the
  frontend filter-bar output added a sequence-id stale-response guard.
- **Why I selected this block:** It is small enough to trace exactly, but it
  depends on asynchronous request ordering rather than simple top-to-bottom
  execution.

### Exact code block

```javascript
let loadSeq = 0;
async function loadBoard() {
  const seq = ++loadSeq;
  setBannerState("loading", "Loading tasks…");
  let tasks;
  try {
    tasks = await fetchTasks();
  } catch (error) {
    if (seq === loadSeq) setBannerState("error", `Couldn't load tasks: ${error.message}`);
    return;
  }
  if (seq !== loadSeq) return; // a newer load started; drop this stale result
  renderBoard(tasks);
  setBannerState("ready", "");
}
```

### Line-by-line trace

| Line(s) | What it does | Why it exists | What could break | Assumption or check | Do I own this yet? |
|---|---|---|---|---|---|
| 968 | Creates one counter shared by every `loadBoard()` call. | Calls need a common definition of which load is newest. | A counter local to each call would always restart and could not identify stale work. | Check that `loadSeq` is declared outside `loadBoard()`. | **Yes** |
| 969 | Declares an asynchronous board-loading function. | The function must wait for a network request without blocking later UI events. | Removing `async` makes `await fetchTasks()` invalid. | Confirm all filter event handlers reference this function. | **Yes** |
| 970 | Increments the shared counter and saves this call's sequence number. | Every call needs a unique value that can later be compared with the newest call. | If it copied without incrementing, competing calls could share an identifier and both render. | In a two-call example, confirm the local values become 1 and 2 while `loadSeq` remains 2. | **Yes** |
| 971 | Shows the loading banner immediately. | The user receives honest feedback while the request is pending. | Removing it hides progress; moving it after `await` shows it too late. | Trigger a filter change and observe the loading state if browser testing is performed. | **Yes** |
| 972-974 | Declares `tasks`, starts error handling, and waits for `fetchTasks()`. | `tasks` must remain available after the `try`; `await` is the point where a newer load can start and finish first. | Declaring `tasks` only inside the block would make it unavailable to `renderBoard`; omitting error handling would create an unhandled rejection. | Verify `fetchTasks()` throws on non-OK responses and JSON/network failures. | **Yes** |
| 975-978 | Handles a failure, shows it only when this call is still newest, and stops this call. | A stale failure must not replace a newer successful board with an old error. | Removing the equality check can display a stale error; removing `return` lets execution continue without valid tasks. | Delay two requests so an older one fails after a newer success and confirm the old error is ignored. | **Yes** |
| 979 | Stops a successful response if a newer load has started. | Only the newest filter result should control the board. | Removing this guard lets a slow old response overwrite the current filter result. | Invert response timing and confirm only the second request renders. | **Yes** |
| 980-981 | Renders the newest tasks and clears the loading state. | These are the visible success effects protected by the sequence check. | Moving them before line 979 defeats the guard; omitting the ready state leaves a stale loading banner. | Confirm render and ready updates occur only after the stale-result check. | **Yes** |

### Check questions and my answers

1. **If request A receives sequence 1, request B receives sequence 2, B
   finishes first, and A finishes last, which result is rendered and why?**
   - **My answer:** Request B renders because it has sequence number 2, which
     matches the latest `loadSeq` value. When request A finishes later, its
     sequence number 1 no longer matches, so its older result is ignored.

2. **Why is `if (seq === loadSeq)` needed inside the error handler?**
   - **My answer:** Without the error sequence check, an older failed request
     could replace the result of a newer successful request with an incorrect
     error banner.

3. **Which paths use the guarded loader, and what limitation does that reveal?**
   - **My answer:** Filter changes use `loadBoard()`, while create, edit, drop,
     and delete operations use `refreshBoard()`. Therefore, the sequence guard
     protects competing filter loads but does not coordinate every refresh path
     in the application.

### Ownership conclusion

I mark this block **Yes — owned** because I can explain the counter, walk
through reversed response order, describe what each guard prevents, and state
the guard's scope limitation. A future browser race test would provide stronger
runtime evidence; it was **NOT RUN** during this documentation phase.

## 5. My Three AI Usage Rules

| Rule category | Final rule | Course evidence | How a teammate can test compliance |
|---|---|---|---|
| What I will never paste | I will never paste credentials, tokens, private keys, unredacted environment files, production configuration, or real personal/customer data into an AI tool. I will remove sensitive and unrelated content before sharing code or diagnostic output. | The Module 5 audit found no tracked secret-bearing files, while G4 and G5 show that broad context and uncertain diagnostic data still deserve conservative treatment. | Before a prompt is sent, inspect its attachments and text; the rule passes only if sensitive values are absent and unrelated context has been removed. |
| What I will always verify | Before accepting AI-generated code, I will inspect the exact diff, run the smallest relevant test, run the broader relevant suite, and directly observe browser behavior when the change affects the UI. If a check was not performed, I will record it as `NOT RUN`. | Module 1's generated package layout did not start, Module 2 included Python 3.10-only syntax in a Python 3.9 project, and Module 3's drag bug appeared only in a real browser. | Check the task evidence for a reviewed diff, targeted result, broader result, and browser result or an honest `NOT RUN`. |
| How I will record AI contributions | I will record the AI tool, task or prompt summary, context and files shared, files changed, whether I accepted, edited, or rejected the output, and the commands and observed verification results in the project prompt log or evidence index. | `Docs/midcourse/prompt-log.md` records tools, prompt summaries, accepted/edited/rejected decisions, files, and verification evidence. | Select any AI-assisted change and confirm that every listed field can be found in its prompt-log or evidence-index entry. |

## 6. Reflection

- **The highest-risk thing I shared was:** Complete repository context and
  detailed browser-debugging evidence, because some tasks could have been
  completed with fewer files and smaller sanitized excerpts.
- **The main habit I will change is:** Share only the smallest relevant files,
  functions, and sanitized error excerpts instead of broad repository context.
- **One generated artifact I now understand better is:** The `loadBoard()`
  stale-response guard. It assigns each load a sequence number and prevents an
  older response or error from overwriting the newest board state.

## 7. Review limitations

- This worksheet reconstructs sharing from tracked course artifacts rather
  than complete chat-provider export logs.
- Module 4 artifacts are unavailable on this branch.
- Repository visibility at the exact time of G4 is not established here.
- G5 is conservatively Medium because the tracked evidence does not
  independently prove that every seed value was synthetic.
- No secrets are reproduced in this worksheet.
- No browser or application test was required or run for this documentation
  phase.
