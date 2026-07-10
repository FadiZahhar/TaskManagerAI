# Prompt Comparison Log — Module 2 (POST /tasks)

## Weak prompt

> Write a POST /tasks endpoint using FastAPI.

## Weak output observations

- No status code specified, so it would default to FastAPI's generic `200 OK`
  instead of the semantically correct `201 Created` for a resource-creation
  endpoint.
- No `response_model` specified, so the response shape isn't locked down or
  documented in `/docs` — whatever the handler returns (e.g. a raw dict, or an
  ORM object) leaks its exact fields to clients.
- No instruction to reuse the existing `storage`/`models` modules, so a
  generic answer is likely to invent its own in-memory list, its own ad-hoc
  validation, or even suggest a database — none of which matches this
  project's actual `app/storage.py` / `app/models.py` split.
- No error-handling contract, so a generic answer is likely to add manual
  `if not title: raise HTTPException(...)` checks instead of trusting
  Pydantic's built-in validation — duplicating logic that `TaskCreate`
  already enforces.
- No constraint against creating a second `FastAPI()` instance or duplicating
  routes, so a generic answer commonly hands back a full mini-app rather than
  a single route to drop into the existing one.

## Improved prompt

> Add ONE route to my existing FastAPI app. Context files: `@app/main.py`,
> `@app/models.py`, `@app/storage.py`. Generate ONLY the route handler for
> `POST /tasks`: status code `201 Created` via `status.HTTP_201_CREATED`,
> tags `["tasks"]`, request body `TaskCreate`, response model `TaskResponse`,
> behavior is `storage.add_task(payload)` returned directly, and all
> validation errors (missing/blank/overlong title, invalid status/priority,
> unknown fields) must come from Pydantic — not manual checks. Do not create
> a new `FastAPI()` instance, generate ids/timestamps in the route, add
> try/except, or add any other route. Output only the imports and the route
> function.

## Improved output observations

- Produced the exact decorator specified —
  `@app.post("/tasks", response_model=TaskResponse, status_code=status.HTTP_201_CREATED, tags=["tasks"])`
  — verified live to return `201` with a full `TaskResponse` body, not a
  generic `200`.
- Reused `storage.add_task(payload)` directly with no reimplementation of
  storage or id/timestamp generation inside the route, keeping the layering
  (`route → storage → model`) intact instead of collapsing it into one file.
- All three required 422 cases (blank title, invalid `status`, unknown field)
  came from Pydantic/`TaskCreate` alone — verified with real `curl` calls
  returning `422` — with zero manual `if` validation added to the route.
- No second `FastAPI()` instance and no other routes were touched, so the
  diff applied cleanly on top of the existing `/health` route with nothing
  to review beyond the three new lines.

## Comparison

| Prompt difference | Weak output risk | Improved output benefit | What I learned for future prompts |
|---|---|---|---|
| No status code specified vs. explicit `status.HTTP_201_CREATED` | Endpoint silently returns `200` for a create action, which is a REST semantics bug that's easy to miss in manual testing since the request still "works." | Correct `201 Created` verified by an actual `curl -i` check, not just assumed. | Always name the exact status code and the constant to use (`status.HTTP_xxx`), not just "the right one" — otherwise the model picks the path of least resistance (`200`). |
| No `response_model` vs. explicit `TaskResponse` | Response shape is undocumented and unstable — `/docs` shows nothing useful, and any field the handler happens to return leaks to clients. | `/docs` (Swagger) auto-documents the exact response shape, verified live to return `200` when loaded. | Always pin the `response_model` explicitly when one already exists — don't let the model infer the shape from the handler body. |
| No context files vs. `@app/main.py @app/models.py @app/storage.py` | Generic answer invents its own storage (in-memory list, dict, or even a database suggestion) instead of the project's actual `storage.add_task`, creating a second parallel implementation to reconcile later. | Directly called the existing `storage.add_task(payload)` — zero duplicate logic, verified the same task ids/timestamps are generated exactly once, in `storage.py`. | Always attach the actual files as context when a project already exists — "using FastAPI" alone gives the model no reason to reuse anything. |
| No validation contract vs. "validation errors must come from Pydantic, not manual checks" | Generic answer commonly adds redundant `if not payload.title` checks in the route, duplicating (and risking drifting from) the `TaskCreate` validator's actual rules (200-char limit, whitespace strip). | Zero manual validation in the route — all three 422 cases (blank title, bad enum, unknown field) verified to come from `TaskCreate` alone. | State explicitly which layer owns validation ("rely on Pydantic," "DO NOT add manual checks") — otherwise defensive code gets duplicated across layers. |
| No scope constraint vs. "ONLY this route, no other routes, no new `FastAPI()` instance" | Generic answer often hands back a full mini-app (its own `FastAPI()`, extra routes, extra imports) that has to be manually stripped down to the one thing you actually needed. | Output was exactly one route and its imports — a clean, reviewable diff verified against the running app with no unrelated changes. | Bound the blast radius explicitly ("generate ONLY X," "DO NOT touch other routes") — it's the difference between a one-line diff and a merge conflict. |
