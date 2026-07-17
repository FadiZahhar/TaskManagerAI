# Raw AI Security Audit

This file preserves the read-only AI audit that preceded human grading. It is
supporting evidence, not the final Module 5 security deliverable. Final grades
and dispositions are recorded in `Docs/security-review.md`.

## Audit context

| Item | Observed value |
|---|---|
| Date | 2026-07-18 |
| Repository | `TaskManagerAI` |
| Branch | `module-5-governance` |
| Commit inspected | `c40fc8c4d864048325d498967bd89bb43ce03ffa` |
| Audit mode | Read-only source review plus non-persistent `TestClient` probes |
| Repository files changed by the audit | None |
| Browser verification | **NOT RUN** |

## AI-generated findings before grading

| ID | Severity | File / location | Finding | Evidence | Suggested next step | Confidence |
|---|---|---|---|---|---|---|
| S1 | Medium | `app/models.py:54-74`; `app/storage.py:63-72`; `app/main.py:70-81`; `app/storage.py:50-55`; `app/business_rules.py:14-20` | An explicit JSON `null` in a partial update can replace fields that `TaskResponse` otherwise requires, leaving an invalid task in storage and causing later requests to fail. | `TaskUpdate` types `title`, `description`, `status`, and `priority` as optional. `model_dump(exclude_unset=True)` retains an explicitly supplied `None`, and `model_copy(update=updates)` does not validate the resulting model. Runtime probes returned 200 and stored `None` for all four fields. A later search returned 500 after `title=null` or `description=null`; a later status transition returned 500 after `status=null`. | Define the intended `null` behavior separately from omission, reject or normalize invalid `null` values, revalidate the final stored model, and add focused regression tests. | High |
| S2 | High if deployed | `app/main.py:40-88`; `README.md:152-158` | All task CRUD routes are accessible without authentication or authorization. | No route has an identity or permission dependency. The README explicitly lists authentication as outside course scope. If the API were reachable by untrusted clients, any client could read or modify every task. | Keep the limitation explicit for the course project. Require authentication and authorization before any production or shared deployment. | High |
| S3 | Medium outside local course use | `app/models.py:33-51`; `app/storage.py:9`; `app/main.py:40-59`; `README.md:152-158` | Descriptions and assignees have no explicit length bounds, task creation is unbounded, and list retrieval has no pagination or application-level resource controls. | The title alone has a 200-character validator. A `TestClient` probe submitted a 10,000-character description and a 10,000-character assignee and received HTTP 201 with both values preserved. Tasks accumulate in the module-level dictionary, and `GET /tasks` returns the full matching list. | Add evidence-based request limits and pagination before exposing the service beyond trusted local use. | High |
| S4 | Medium outside course scope | `app/storage.py:9,63-72`; `Docs/adr-0001-stack.md:19-23`; `README.md:152-158` | In-memory storage provides neither durable persistence nor an explicit concurrency-safe write strategy. | All tasks live in one module-level dictionary. Updates use a read-copy-write sequence. The ADR and README explicitly accept restart data loss, single-process use, and the absence of a persistent database for the course project. | Retain as a documented course limitation; design durable, concurrency-safe persistence before production use. | High |
| S5 | Medium delivery risk; Low local risk | `requirements.txt:1-7`; repository root | Dependency declarations use lower bounds only, and the current branch has no lockfile, CI workflow, or dependency-security scan configuration. | The four direct requirements use `>=`. `pip check` reported no broken requirements in the observed environment. Installed versions were FastAPI 0.139.2, Pydantic 2.13.4, Uvicorn 0.51.0, HTTPX 0.28.1, and pytest 9.1.1. `pip-audit` was not installed. No current CVE was established. | Treat reproducibility and automated scanning as delivery-process improvements; do not claim a current vulnerable dependency without a vulnerability-database scan. | Medium |

## Runtime probe observations

The probes used `fastapi.testclient.TestClient` with
`raise_server_exceptions=False`. Storage was reset before each case and at the
end of the process.

| Probe | Observed result |
|---|---|
| `PATCH {"title": null}` | HTTP 200; stored title was `None`; later search returned HTTP 500 |
| `PATCH {"description": null}` | HTTP 200; stored description was `None`; later description-only search returned HTTP 500 |
| `PATCH {"status": null}` | HTTP 200; stored status was `None`; later transition returned HTTP 500 |
| `PATCH {"priority": null}` | HTTP 200; stored priority was `None` |
| Create with 10,000-character description and assignee | HTTP 201; both returned lengths were 10,000 |
| `.venv/bin/python -m pip check` | `No broken requirements found.` |
| `.venv/bin/python -m pip_audit --version` | **NOT RUN — module not installed** |

## Files inspected

- `AGENTS.md`
- `CLAUDE.md`
- `app/main.py`
- `app/models.py`
- `app/storage.py`
- `app/business_rules.py`
- `frontend/index.html`
- `tests/conftest.py`
- `tests/test_health.py`
- `tests/test_tasks.py`
- `tests/test_due_dates.py`
- `tests/test_search_filters.py`
- `requirements.txt`
- `.gitignore`
- `README.md`
- `Docs/adr-0001-stack.md`

The current tracked tree was also checked for CI, Docker, and common
secret-file names. No CI workflow, Docker configuration, tracked `.env` file,
or tracked private-key file was found.

## Categories where no issue was found

- CORS is restricted to the two documented local frontend origins, the four
  used HTTP methods, and the `Content-Type` header.
- Status and priority enums, boolean/date parsing, forbidden extra body fields,
  and nonblank/maximum-length title validation are enforced. The exception is
  the explicit-`null` partial-update behavior in S1.
- Search uses literal, case-insensitive substring matching; no regex execution
  or regex denial-of-service path was found.
- Dynamic task and error text is written with `textContent` or text nodes. The
  observed `innerHTML` assignments either clear containers or insert static
  icon constants; no task-controlled HTML injection path was found.
- Task IDs are server-generated UUID strings, and timestamps are generated by
  the server in UTC.
- No broad backend exception handler that returns raw exception text was found.
- No obvious credential, token, private-key file, tracked environment file, or
  real-user dataset was identified in the current tracked tree.
- No Docker or CI configuration existed on this branch, so configuration
  details such as container user and CI failure masking were not applicable to
  the files inspected.

## Audit assumptions and limits

- No internet-backed CVE database scan was performed because `pip-audit` was
  unavailable. S5 therefore does not claim a known vulnerable package.
- Secret review covered the current tracked tree and common indicators, not a
  full Git-history secret scan.
- No live Uvicorn server, browser, reverse proxy, load test, or concurrency test
  was run.
- Runtime probes used Python 3.14.2 rather than the repository's documented
  Python 3.9 compatibility target.
- Deployment topology, proxy-level request limits, network exposure, and
  external access controls were not visible in this branch.
- Severity for S2-S4 assumes use beyond the documented local course setting.

## Findings that may be course-scope decisions

- **S2:** Authentication is explicitly excluded from the course project, but it
  remains a prerequisite for production or shared deployment.
- **S3:** Pagination and production resource controls are documented as absent;
  explicit input bounds still matter if the service becomes exposed.
- **S4:** In-memory, single-process storage is an accepted educational design
  decision rather than an accidental claim of production durability.
- **S5:** CI and security-scanning automation are delivery-maturity concerns,
  not proof of a currently exploitable application vulnerability.
