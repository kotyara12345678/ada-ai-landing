from __future__ import annotations

import time
import uuid
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import text

from app.api.router import api_router
from app.core.config import settings
from app.core.logging import configure_logging, get_logger
from app.db.session import create_all, engine

configure_logging(settings.log_level)
logger = get_logger("app")


@asynccontextmanager
async def lifespan(_: FastAPI):
    logger.info("app_start", extra={"event": "startup"})
    if settings.auto_create_schema:
        await create_all()
    if not settings.llm_configured:
        logger.warning("llm_not_configured", extra={"event": "startup"})
    if not settings.telegram_configured:
        logger.warning("telegram_not_configured", extra={"event": "startup"})
    yield
    await engine.dispose()
    logger.info("app_stop", extra={"event": "shutdown"})


app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    description=(
        "API сайта команды разработки. "
        "Заявки, AI-консультант со стримингом, интеграция с Telegram."
    ),
    docs_url="/api/docs",
    redoc_url=None,
    openapi_url="/api/openapi.json",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=False,
    allow_methods=["GET", "POST", "PATCH", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
    max_age=600,
)


@app.middleware("http")
async def request_context(request: Request, call_next):
    request_id = request.headers.get("x-request-id") or uuid.uuid4().hex[:12]
    started = time.perf_counter()

    content_length = request.headers.get("content-length")
    if content_length and content_length.isdigit() and int(content_length) > settings.max_request_bytes:
        return JSONResponse(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            content={"detail": "Слишком большой запрос"},
        )

    response = await call_next(request)
    duration_ms = round((time.perf_counter() - started) * 1000, 1)

    response.headers["X-Request-ID"] = request_id
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
    if request.url.path.startswith(settings.api_prefix):
        response.headers["Cache-Control"] = "no-store"

    if request.method != "OPTIONS":
        logger.info(
            "request",
            extra={
                "request_id": request_id,
                "path": request.url.path,
                "method": request.method,
                "status": response.status_code,
                "duration_ms": duration_ms,
            },
        )
    return response


@app.exception_handler(RequestValidationError)
async def validation_error_handler(_: Request, exc: RequestValidationError) -> JSONResponse:
    messages = []
    for error in exc.errors():
        field = ".".join(str(part) for part in error["loc"] if part not in ("body", "query"))
        message = error.get("msg", "Некорректное значение")
        messages.append(f"{field}: {message}" if field else message)

    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": messages[0] if messages else "Проверьте заполнение полей"},
    )


app.include_router(api_router, prefix=settings.api_prefix)


@app.get("/api", include_in_schema=False)
async def api_root() -> dict[str, str]:
    return {"service": settings.app_name, "docs": "/api/docs", "health": "/api/health"}


@app.get("/", include_in_schema=False)
async def root() -> dict[str, str]:
    return {"status": "ok", "service": settings.app_name}
