#!/bin/sh
set -e

echo "[entrypoint] applying database migrations"
alembic upgrade head

echo "[entrypoint] starting api"
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --proxy-headers --forwarded-allow-ips="*" --workers "${WEB_CONCURRENCY:-1}"
