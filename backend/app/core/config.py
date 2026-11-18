"""Конфигурация приложения. Все значения читаются из переменных окружения."""

from functools import lru_cache
from typing import Literal

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "ADA API"
    app_env: Literal["development", "production", "test"] = "development"
    debug: bool = False

    # --- HTTP ---
    api_prefix: str = "/api"
    cors_origins: str = "http://localhost:3000,http://127.0.0.1:3000"
    trust_proxy_headers: bool = False
    max_request_bytes: int = 64_000

    # --- База данных ---
    # PostgreSQL в production, SQLite допустим для локальной разработки и тестов
    database_url: str = "sqlite+aiosqlite:///./data/app.db"
    database_echo: bool = False
    auto_create_schema: bool = False

    # --- Rate limiting ---
    rate_limit_leads: int = 5
    rate_limit_window_seconds: int = 600
    rate_limit_chat: int = 30
    duplicate_window_seconds: int = 600
    min_form_fill_ms: int = 1500

    # --- Telegram ---
    telegram_bot_token: str = ""
    telegram_chat_id: str = ""
    telegram_timeout_seconds: float = 8.0

    # --- LLM ---
    llm_provider: Literal["openai", "anthropic", "disabled"] = "openai"
    llm_api_key: str = ""
    llm_base_url: str = "https://api.openai.com/v1"
    llm_model: str = "gpt-4o-mini"
    llm_temperature: float = 0.3
    llm_max_tokens: int = 900
    llm_timeout_seconds: float = 60.0
    llm_max_history_messages: int = 16

    # --- Админ ---
    admin_token: str = ""

    # --- Логирование ---
    log_level: str = "INFO"

    @field_validator("llm_provider", mode="before")
    @classmethod
    def normalize_llm_provider(cls, value: object) -> object:
        """«openai_compatible» — псевдоним OpenAI-совместимого API (OpenRouter, Polza и др.)."""
        if isinstance(value, str):
            normalized = value.strip().lower()
            if normalized in {"openai_compatible", "openai-compatible", "openai_compat", "compatible"}:
                return "openai"
        return value

    @field_validator("llm_base_url")
    @classmethod
    def strip_base_url(cls, value: str) -> str:
        return value.rstrip("/")

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    @property
    def llm_configured(self) -> bool:
        return self.llm_provider != "disabled" and bool(self.llm_api_key)

    @property
    def telegram_configured(self) -> bool:
        return bool(self.telegram_bot_token and self.telegram_chat_id)

    @property
    def is_production(self) -> bool:
        return self.app_env == "production"


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
