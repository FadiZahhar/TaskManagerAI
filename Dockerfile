# syntax=docker/dockerfile:1

# ---------- builder: install dependencies into an isolated prefix ----------
FROM python:3.9-slim AS builder

ENV PIP_NO_CACHE_DIR=1 \
    PYTHONDONTWRITEBYTECODE=1

WORKDIR /build
COPY requirements.txt .
RUN python -m pip install --upgrade pip && \
    pip install --prefix=/install -r requirements.txt

# ---------- runtime: slim image, non-root, app code only ----------
FROM python:3.9-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Non-root runtime user.
RUN useradd --create-home --uid 10001 app

WORKDIR /app

# Installed Python packages from the builder (lands on the default sys.path).
COPY --from=builder /install /usr/local

# Application package only — no tests, frontend, docs, or local files.
COPY --chown=app:app app/ ./app/

USER app

EXPOSE 8000

# Production-style command: no --reload. Binds to 0.0.0.0 so the port is
# reachable when the container port is published.
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
