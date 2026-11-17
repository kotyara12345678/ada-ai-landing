"""Разбор служебного блока заявки в потоке ответа модели.

Модель добавляет в конец сообщения блок вида:
    <<<LEAD {"name": "...", "contact": "..."} >>>
Задача парсера — не показать этот блок пользователю и вернуть данные заявки.
"""

from __future__ import annotations

from app.services.prompt import LEAD_MARKER_END, LEAD_MARKER_START


class LeadMarkerParser:
    """Инкрементальный парсер: текст отдаётся по мере поступления, маркер вырезается."""

    def __init__(self) -> None:
        self._buffer = ""

    def feed(self, chunk: str) -> tuple[str, list[str]]:
        """Возвращает (безопасный_текст, найденные_пейлоады_маркеров)."""
        self._buffer += chunk
        payloads: list[str] = []
        visible = ""

        while True:
            start = self._buffer.find(LEAD_MARKER_START)
            if start == -1:
                # Оставляем хвост, который может оказаться началом маркера
                keep = len(LEAD_MARKER_START) - 1
                if len(self._buffer) > keep:
                    visible += self._buffer[:-keep]
                    self._buffer = self._buffer[-keep:]
                break

            visible += self._buffer[:start]
            end = self._buffer.find(LEAD_MARKER_END, start)
            if end == -1:
                # Маркер ещё не завершён — ждём следующий чанк
                self._buffer = self._buffer[start:]
                break

            payloads.append(self._buffer[start + len(LEAD_MARKER_START) : end])
            self._buffer = self._buffer[end + len(LEAD_MARKER_END) :]

        return visible, payloads

    def flush(self) -> str:
        """Сбрасывает остаток буфера при завершении потока."""
        remainder = self._buffer
        self._buffer = ""
        if LEAD_MARKER_START in remainder:
            # Незавершённый маркер не показываем
            return remainder.split(LEAD_MARKER_START)[0]
        return remainder
