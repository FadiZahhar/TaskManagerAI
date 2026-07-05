# Task Tracker API — Module 1 Skeleton

This repository is a minimal FastAPI skeleton for Module 1 of an AI-assisted coding course.

## Module 1 scope

Included:

- Reviewed user stories with acceptance criteria
- One-paragraph Architecture Decision Record
- Minimal FastAPI project skeleton
- Local run instructions
- `GET /health` returning HTTP 200
- Swagger docs at `/docs`
- Short reflection log

Explicitly excluded from Module 1:

- Full task CRUD implementation
- Authentication
- User accounts
- External production database
- Docker
- Cloud deployment
- Frontend

## Project structure

```text
task-tracker-module1/
├── app/
│   ├── __init__.py
│   └── main.py
├── docs/
│   ├── adr-001-fastapi-module1.md
│   ├── reflection-log.md
│   └── user-stories.md
├── tests/
│   └── test_health.py
├── .gitignore
├── pytest.ini
├── requirements-dev.txt
├── requirements.txt
└── README.md
```

## Run locally

Create and activate a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate
```

On Windows PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
python -m pip install --upgrade pip
python -m pip install -r requirements-dev.txt
```

Start the API:

```bash
fastapi dev app/main.py
```

Alternative:

```bash
uvicorn app.main:app --reload
```

## Verify

Health endpoint:

```bash
curl -i http://127.0.0.1:8000/health
```

Expected result:

- HTTP status: `200 OK`
- JSON body: `{"status":"ok"}`

Swagger docs:

```text
http://127.0.0.1:8000/docs
```

Run tests:

```bash
pytest
```
