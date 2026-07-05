# Task Tracker API

A minimal FastAPI skeleton for a Task Tracker REST API.

**Module 1 scope:** the app boots locally and exposes a single `GET /health`
endpoint plus auto-generated Swagger docs at `/docs`. Task CRUD is intentionally
not implemented yet.

## Project layout

```
task-tracker/
├── app/
│   ├── __init__.py
│   ├── main.py        # FastAPI app + /health
│   └── schemas.py     # Task domain models (defined, not yet wired to routes)
├── tests/
│   └── test_health.py # /health smoke test
├── docs/
│   ├── user-stories.md
│   ├── adr-0001-stack.md
│   └── reflection-log.md
├── requirements.txt
├── .gitignore
└── README.md
```

## Setup

Requires Python 3.11+ (developed on 3.12).

```bash
python3 -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

## Run locally

From the project root (`task-tracker/`):

```bash
uvicorn app.main:app --reload
```

Then verify:

- Health check: <http://127.0.0.1:8000/health> → `{"status":"ok"}` (HTTP 200)
- Swagger docs: <http://127.0.0.1:8000/docs>
- OpenAPI schema: <http://127.0.0.1:8000/openapi.json>

Quick check from another terminal:

```bash
curl -i http://127.0.0.1:8000/health
```

## Run tests

```bash
pytest
```

## Not in scope for Module 1

No authentication, no user accounts, no external database, no Docker, no cloud
deployment, no frontend, and no full CRUD. Those come in later modules.
