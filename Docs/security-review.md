# Security Review

## 1. Scope and method

| Item | Review value |
|---|---|
| Repository / branch | `TaskManagerAI` / `module-5-governance` |
| Commit reviewed | `c40fc8c4d864048325d498967bd89bb43ce03ffa` |
| Date | 2026-07-18 |
| Review mode | Read-only source review and non-persistent `TestClient` probes |
| Application files modified | None |
| Browser verification | **NOT RUN** |

The review covered API routes, models and validation, status-transition rules,
in-memory storage, frontend rendering and CORS assumptions, tests,
dependencies, delivery configuration, documentation, and common
secret-bearing file indicators. The ungraded AI output is preserved in
`Docs/module-5/security-audit-raw.md`; the grades below are the decisions
confirmed during the student review.

## 2. AI-generated findings and my grades

| ID | AI severity | File / location | Finding | My grade | Evidence checked | Final reason | Disposition |
|---|---|---|---|---|---|---|---|
| S1 | Medium | `app/models.py:54-74`; `app/storage.py:63-72` | Explicit `null` updates can replace required stored values and trigger later HTTP 500 responses. | **Valid** | Source path from `TaskUpdate` through `model_dump(exclude_unset=True)` and `model_copy(update=...)`; targeted runtime probes | This is reproducible current behavior that damages task integrity and availability. | **Backlog + tests** |
| S2 | High if deployed | `app/main.py:40-88`; `README.md:152-158` | Task routes have no authentication or authorization. | **Valid** | Route definitions and documented known limitations | It is intentional course scope, but any untrusted client could access or modify all tasks if the service were exposed. | **Backlog + documentation** |
| S3 | Medium outside local course use | `app/models.py:33-51`; `app/storage.py:9`; `app/main.py:40-59` | Descriptions, assignees, task accumulation, and list responses lack explicit resource bounds. | **Valid** | Source validation and a successful HTTP 201 probe with 10,000-character description and assignee values | The risk is limited in trusted local use but becomes real when untrusted clients can create or list tasks. | **Backlog** |
| S4 | Medium outside course scope | `app/storage.py:9,63-72`; `Docs/adr-0001-stack.md:19-23` | Storage is not durable and has no explicit concurrency-safe write strategy. | **Valid** | Storage implementation, ADR, and README limitations | This is an accepted educational limitation, not a hidden capability, but it would risk loss or conflicting updates in production. | **Documentation + backlog** |
| S5 | Medium delivery risk; Low local risk | `requirements.txt:1-7`; repository root | Lower-bound dependencies and the absence of a lockfile, CI, and dependency scanning reduce reproducibility and automated assurance. | **Noise** | Requirement declarations, repository configuration, installed versions, and successful `pip check`; no CVE scan was available | The process gaps are real, but the finding combines general maturity improvements without evidence of a broken or vulnerable dependency. | **No security action now** |

## 3. Manual scan findings

The independent scan was prompted across inputs and models, routes and errors,
authentication, storage, frontend and CORS behavior, dependencies and delivery,
and secrets/data. No genuine evidence-backed finding remained that was both
distinct from the AI findings and appropriate to record as You-only. This
column is left empty rather than inventing a finding to satisfy the table.

| ID | Severity | File / location | My finding | Evidence | Disposition |
|---|---|---|---|---|---|
| — | — | — | No additional You-only finding retained | Manual-scan result confirmed after reviewing the required categories | No invented action |

## 4. Reconciliation

| Agreement | AI-only | You-only |
|---|---|---|
| No issue was recorded as independently identified before the AI finding was considered. | S1 explicit-null update corruption; S2 missing authentication; S3 missing resource bounds; S4 in-memory durability/concurrency limitation; S5 delivery-assurance gaps. | None retained. The manual scan did not produce a genuine additional evidence-backed finding. |

## 5. Observation about AI coverage

The AI scan was broad and strongest where it connected concrete source paths to
reproducible behavior, especially the partial-update validation problem.
My manual pass did not add a distinct issue, so in future reviews I should make
my independent checklist more systematic before relying on AI classifications.

## 6. Top-three security backlog

Only findings graded Valid are eligible for this backlog.

| Rank | Finding | Why it matters | Owner | Next action | Verification of completion |
|---|---|---|---|---|---|
| 1 | S1 — explicit `null` corrupts required task fields | It is a reproducible defect in current behavior and can turn valid follow-up requests into server errors. | Backend | Define field-specific nullability, reject or normalize invalid `null` values, revalidate the stored response model, and add regression tests. | Focused PATCH tests show intended clearing/rejection semantics; affected follow-up requests do not return 500; full suite passes. |
| 2 | S2 — no authentication or authorization | Any network exposure would permit unauthorized reading and modification of all tasks. | Course/project owner + backend | Keep local-only during the course; define identities, permissions, and authorization tests before shared deployment. | Anonymous protected requests are rejected and role/ownership tests pass in the future production design. |
| 3 | S3 — no explicit resource limits or pagination | Untrusted clients could consume memory and produce increasingly large list responses. | Backend | Choose evidence-based field/request limits and a pagination contract before broader exposure. | Boundary tests reject oversized input and pagination tests prove bounded responses. |

## 7. Course-scope versus production risk

| Item | Course decision | Production implication | Current treatment |
|---|---|---|---|
| Authentication and authorization | Intentionally out of scope and documented | Every reachable client can access and modify all tasks | Keep local-only; Valid production backlog item |
| In-memory storage | Intentionally selected for a small single-process learning project | Restart data loss and no reliable multi-process/concurrent-write behavior | Accepted limitation; Valid production backlog item |
| Resource controls and pagination | Not required for the local course application | Memory and response-size risk grows with untrusted or sustained use | Valid backlog item before exposure |
| CI, lockfile, and dependency scanning | Not present on this branch | Less reproducible delivery and weaker automated dependency assurance | S5 graded Noise as a security finding; revisit as delivery governance grows |

## 8. Optional minimal fix

- **Finding:** S1
- **Decision:** Backlog; no fix applied in Module 5
- **Reason:** A correct fix must decide separate semantics for omitted fields,
  nullable fields (`assignee` and `due_date`), and required fields. It also
  needs targeted regression tests and is larger than the permitted optional
  one-line security fix.
- **Diff:** None
- **Verification:** Not applicable; no application code changed

## 9. Review limitations

- `pip-audit` was unavailable, so no current-CVE claim was made.
- Secret review covered the current tracked tree and common indicators, not the
  full Git history.
- No live server, browser, proxy, load, or concurrency test was run.
- Browser behavior is **NOT RUN**, not PASS.
- Runtime probes used Python 3.14.2; Python 3.9 was not run in this phase.
- External deployment controls and request limits were not visible.
- The empty You-only column is an honest result, not proof that the manual scan
  or AI scan was exhaustive.
