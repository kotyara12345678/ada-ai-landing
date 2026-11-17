"""Простой in-memory rate limiter со скользящим окном.

Для одного инстанса этого достаточно: заявки и чат идут через один backend.
При горизонтальном масштабировании достаточно заменить хранилище на Redis,
интерфейс останется тем же.
"""

from __future__ import annotations

import asyncio
import time
from collections import defaultdict, deque


class SlidingWindowLimiter:
    def __init__(self, limit: int, window_seconds: int) -> None:
        self.limit = limit
        self.window = window_seconds
        self._hits: dict[str, deque[float]] = defaultdict(deque)
        self._lock = asyncio.Lock()

    async def check(self, key: str) -> tuple[bool, int]:
        """Возвращает (разрешено, сколько_секунд_ждать)."""
        now = time.monotonic()
        async with self._lock:
            bucket = self._hits[key]
            while bucket and now - bucket[0] > self.window:
                bucket.popleft()

            if len(bucket) >= self.limit:
                retry_after = int(self.window - (now - bucket[0])) + 1
                return False, max(retry_after, 1)

            bucket.append(now)
            return True, 0

    async def reset(self) -> None:
        async with self._lock:
            self._hits.clear()
