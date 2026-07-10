# Task Tracker API — Module 1 Skeleton

A minimal FastAPI skeleton. Module 1 exposes a single health check and
auto-generated Swagger docs. No database, no auth, no task CRUD yet.

## Project structure

```
.
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app + router registration
│   └── api/
│       ├── __init__.py
│       └── routes/
│           ├── __init__.py
│           └── health.py       # GET /health
├── tests/
│   ├── __init__.py
│   └── test_health.py
├── Docs/
│   ├── user-stories.md
│   ├── adr-0001-stack.md
│   └── reflection-log.md
├── requirements.txt
├── pytest.ini
└── README.md
```

## Setup

Requires Python 3.11+ (developed on 3.12).

```bash
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

## Run

From the project root:

```bash
uvicorn app.main:app --reload
```

## Test

```bash
pytest
```

## Verify

- Health check: <http://127.0.0.1:8000/health>
  returns HTTP 200 with `{"status": "ok", "timestamp": "<ISO 8601 UTC>"}`
- Swagger UI: <http://127.0.0.1:8000/docs>
- OpenAPI schema: <http://127.0.0.1:8000/openapi.json>

From a second terminal:

```bash
curl -i http://127.0.0.1:8000/health
```

## Out of scope for Module 1

No authentication, user accounts, database, Docker, deployment, logging
configuration, frontend, or task CRUD. Those arrive in later modules.
