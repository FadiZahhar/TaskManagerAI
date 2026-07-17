# Decision: In-Memory Dict as the Task Storage Layer

> Status: Accepted · Date: 2026-07-17 · Scope: Task Tracker (Modules 2–4)

## Context

Module 2 introduced task CRUD, which needed somewhere to hold tasks between
requests. [ADR-0001](../adr-0001-stack.md) had deliberately deferred persistence in
Module 1 — keeping the skeleton to `GET /health` and `/docs` — while noting the
project "can grow into an in-memory repository for CRUD in Module 2 without
today's code needing to change." The project is a local learning exercise: no
users, no deployment, and no requirement to survive a restart.

*(Facts cited from `Docs/adr-0001-stack.md`, `README.md`, and `app/storage.py`.
The reading of "what problem this solves" is my interpretation.)*

## Decision

Tasks live in a single module-level Python dict in `app/storage.py`:
`_tasks: dict[str, TaskResponse] = {}`, keyed by a generated `uuid4` string
([app/storage.py:9-26](../../app/storage.py#L9-L26)). All access goes through small
module functions — `add_task`, `get_all_tasks`, `get_task_by_id`, `update_task`,
`delete_task` — and a private `_reset()` clears the dict for test isolation
([app/storage.py:65-66](../../app/storage.py#L65-L66)). The API layer
([app/main.py](../../app/main.py)) never touches the dict directly.

## Alternatives Considered

### Alternative 1 — JSON-file-backed store
Realistic: persists across restarts with no external service. Not selected —
ADR-0001 rejected it for introducing "file I/O, path handling, and
test-isolation cleanup for zero benefit at this stage." A dict keeps tests
hermetic through a one-line `_reset()`.

### Alternative 2 — SQLite via SQLModel
Realistic: a real embedded database, still zero-infrastructure. Not selected —
ADR-0001 judged it "premature … schema/session/migration ceremony before there
is a single field to persist." For a CRUD learning exercise the ceremony
outweighs the benefit.

## Trade-offs

### Benefits
- Zero dependencies / infrastructure — the dict is standard library.
- Trivial, deterministic test isolation: the autouse `_reset()` fixture in
  [tests/conftest.py](../../tests/conftest.py) gives every test a clean store.
- Keeps the code centered on the module's real learning goals (routing,
  validation, status-transition rules).
- Clean seam: because all access is behind `storage` functions, swapping to a
  real store later is a single-module change.

### Costs and limitations
- All data is lost on every restart / process exit (`README.md` "Known
  limitations"; ADR-0001 accepted risk).
- No concurrency safety — a module-level dict mutated by request handlers is
  not safe across threads or processes (ADR-0001: "no concurrency safety
  across requests").
- Single-process only: multiple Uvicorn workers would each hold a separate,
  divergent store.
- No real querying — `get_all_tasks` filters Python lists in memory.

## Consequences

- **Codebase:** storage is one small module; models and business rules carry no
  database concerns.
- **Local development:** no setup — run Uvicorn and the store exists in memory.
- **Testing:** the `_reset()` fixture makes tests deterministic with no DB teardown.
- **Runtime:** the Phase-3 Docker image runs a single Uvicorn process; restarting
  the container empties all tasks — expected for this project.
- **Future work:** adding persistence means implementing the same storage
  function signatures against SQLite/SQLModel (or similar) plus concurrency
  handling; the API layer should be largely unaffected.

## Open Questions

- What is the concrete trigger to migrate — first real user, first deploy, or
  first multi-worker run?
- Should the `storage` functions become an explicit `Protocol`/interface now, so
  the eventual swap is mechanical?
- How will concurrency be handled once persistence arrives — database
  transactions, or an application-level lock?

## Reflection

I would do this differently if the project were meant to outlive a single run: I
would define the storage seam as an explicit interface from the start and back it
with SQLite even for the learning phase, so that persistence, concurrency, and
migration were exercised early rather than deferred to a future "must replace
before real users" note. For this specific course project, though, the in-memory
dict was the right amount of machinery — and the thing I would keep is routing all
access through `storage` functions, because that single seam is what makes the
deferral safe to reverse later.
