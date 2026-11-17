# ADA — сайт команды разработки

Коммерческий сайт технологической команды: разработка сайтов, backend, AI-агентов,
автоматизация и голосовые ассистенты. Включает AI-консультанта со стримингом,
систему заявок с уведомлениями в Telegram и полноценную SEO-архитектуру.

---

## 1. Что внутри

```
.
├── frontend/                  # Next.js 15 (App Router, SSG), TypeScript, Tailwind 4, Framer Motion
│   ├── src/app/               # страницы, sitemap, robots, OG-изображение, 404
│   ├── src/components/        # layout, sections, ui, forms, ai
│   ├── src/config/            # ЕДИНЫЙ конфиг: цены, услуги, контакты, портфолио
│   └── src/content/blog.ts    # статьи блога
├── backend/                   # FastAPI, SQLAlchemy 2 (async), PostgreSQL, Alembic
│   ├── app/api/routes/        # leads, chat (SSE), admin, health
│   ├── app/services/          # LLM-адаптеры, Telegram, антиспам, лимиты, промпт
│   ├── app/content/catalog.py # база знаний AI-консультанта
│   ├── alembic/               # миграции
│   └── tests/                 # pytest: API, заявки, стриминг, парсер маркера, синк цен
├── nginx/                     # конфигурация reverse proxy
├── docker-compose.yml         # db + backend + frontend + nginx
└── .env.example               # шаблон переменных окружения
```

### Как устроен AI-консультант

1. Браузер отправляет диалог на `POST /api/chat/stream`.
2. Backend собирает системный промпт из каталога услуг, цен и портфолио,
   добавляет контекст страницы, с которой пришёл пользователь.
3. Ответ модели стримится в браузер через Server-Sent Events.
4. Когда клиент соглашается на заявку, модель добавляет служебный блок
   `<<<LEAD {...}>>>`. Backend вырезает его из текста, валидирует данные,
   сохраняет заявку в PostgreSQL и отправляет уведомление в Telegram.

Такой протокол не зависит от наличия function calling у провайдера, поэтому
сменить модель можно одной переменной окружения.

---

## 2. Быстрый запуск (production, Docker)

Требования: Docker + Docker Compose, 2 ГБ RAM.

```bash
cp .env.example .env
# Заполните минимум: POSTGRES_PASSWORD, NEXT_PUBLIC_SITE_URL, TELEGRAM_*, LLM_*
docker compose up -d --build
```

Сайт: `http://<ip-сервера>/`, API: `/api`, документация: `/api/docs`.

Проверка:

```bash
curl -s http://localhost/api/health/ready
docker compose ps
docker compose logs -f backend
```

Остановка: `docker compose down` (данные БД сохраняются в volume `pgdata`).

### Обновление

```bash
git pull
docker compose up -d --build
```

Миграции применяются автоматически при старте backend (`alembic upgrade head`).

---

## 3. Локальная разработка

### Backend

```bash
cd backend
python -m venv .venv
# Windows: .\.venv\Scripts\activate
# Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt

cp ../.env.example .env    # для локального запуска задайте DATABASE_URL
# DATABASE_URL=sqlite+aiosqlite:///./data/app.db  (быстро, без PostgreSQL)
# или postgresql+asyncpg://ada:password@localhost:5432/ada

alembic upgrade head       # для SQLite можно AUTO_CREATE_SCHEMA=true
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev          # http://localhost:3000
```

В development Next.js проксирует `/api/*` на `http://127.0.0.1:8000`
(см. `next.config.ts`, переменная `BACKEND_INTERNAL_URL`).

### Тесты backend

```bash
cd backend
pytest -q
```

Тесты используют отдельную SQLite-базу и не требуют PostgreSQL, LLM и Telegram.

---

## 4. Настройка

### Цены

Единственный источник для интерфейса — `frontend/src/config/pricing.ts`.
Те же позиции продублированы в `backend/app/content/catalog.py` (контекст для AI).
Тест `tests/test_catalog_sync.py` не даст им разойтись: если меняете цену,
обновите оба файла.

### Контакты и домен

`frontend/src/config/site.ts`: Telegram, email, домен по умолчанию.
Домен также задаётся переменной `NEXT_PUBLIC_SITE_URL` (используется в canonical,
sitemap, OG). После изменения публичных переменных нужна пересборка frontend:

```bash
docker compose build frontend && docker compose up -d frontend
```

### AI-провайдер

| Провайдер | `LLM_PROVIDER` | `LLM_BASE_URL` | `LLM_MODEL` |
|---|---|---|---|
| OpenAI | `openai` | `https://api.openai.com/v1` | `gpt-4o-mini` |
| OpenRouter | `openai` | `https://openrouter.ai/api/v1` | любая модель провайдера |
| DeepSeek | `openai` | `https://api.deepseek.com/v1` | `deepseek-chat` |
| Anthropic | `anthropic` | `https://api.anthropic.com/v1` | `claude-3-5-sonnet-latest` |
| Локальная модель | `openai` | `http://host:11434/v1` | имя модели |

Ключ хранится только в `.env` на сервере. В клиентский бандл он не попадает —
запросы идут на backend. Если ключ не задан, `GET /api/chat/status` вернёт
`enabled: false`, а виджет покажет понятное сообщение и ссылку на форму.

### Telegram

1. Создайте бота через `@BotFather`, скопируйте токен в `TELEGRAM_BOT_TOKEN`.
2. Напишите боту любое сообщение и откройте
   `https://api.telegram.org/bot<TOKEN>/getUpdates` — возьмите `chat.id`.
3. Для группового чата добавьте бота и укажите `TELEGRAM_CHAT_ID=-100...`.

Если Telegram не настроен, заявки всё равно сохраняются в базе
(`telegram_sent = false`), а в логах появляется предупреждение.

### Аналитика и Search Console

`NEXT_PUBLIC_YANDEX_METRIKA_ID`, `NEXT_PUBLIC_GA_ID`,
`NEXT_PUBLIC_GSC_VERIFICATION`, `NEXT_PUBLIC_YANDEX_VERIFICATION` в `.env`.
Скрипты подключаются только при непустых значениях.

---

## 5. Администрирование

Полноценная панель не входит в первую версию, но API готово:

```bash
# Список заявок
curl -H "Authorization: Bearer $ADMIN_TOKEN" "http://localhost/api/admin/leads?limit=20"

# Сменa статуса (new | in_progress | contacted | won | lost | spam)
curl -X PATCH -H "Authorization: Bearer $ADMIN_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"status":"contacted"}' \
     http://localhost/api/admin/leads/ADA-ABCDEF

# Сводка по статусам
curl -H "Authorization: Bearer $ADMIN_TOKEN" http://localhost/api/admin/stats
```

Модель `Lead` содержит поля для будущей CMS: статус, источник, страница,
хэш IP, флаг и ошибка Telegram. Управление услугами и портфолио вынесено в
конфигурацию frontend, поэтому панель можно добавить без переписывания страниц.

---

## 6. Развёртывание на VPS

Проверено на Ubuntu 22.04/24.04, 2 ГБ RAM, 20 ГБ диска.

### 6.1. Подготовка сервера

```bash
apt update && apt upgrade -y
apt install -y curl git ufw
curl -fsSL https://get.docker.com | sh
ufw allow OpenSSH && ufw allow 80 && ufw allow 443 && ufw --force enable
```

Проверьте, что свободной памяти достаточно: `free -h`.

### 6.2. Код и окружение

```bash
git clone <repo-url> /opt/ada && cd /opt/ada
cp .env.example .env
nano .env
```

Обязательно задайте:

- `POSTGRES_PASSWORD` — случайный пароль (`openssl rand -base64 24`);
- `NEXT_PUBLIC_SITE_URL=https://ваш-домен`;
- `ADMIN_TOKEN` (`openssl rand -hex 32`);
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`;
- `LLM_API_KEY`, `LLM_PROVIDER`, `LLM_MODEL`.

### 6.3. Запуск

```bash
docker compose up -d --build
docker compose ps
curl -s http://127.0.0.1/api/health/ready
```

### 6.4. Домен

В DNS-панели создайте `A`-запись домена (и `www`) на IP сервера,
дождитесь применения (до 24 часов, обычно быстрее).

### 6.5. HTTPS (Let's Encrypt)

HTTP-конфиг уже отдаёт ACME-challenge. Дальше:

```bash
mkdir -p certbot/conf certbot/www
docker run --rm -v "$PWD/certbot/conf:/etc/letsencrypt" \
  -v "$PWD/certbot/www:/var/www/certbot" \
  certbot/certbot certonly --webroot -w /var/www/certbot \
  -d ada-ai.ru -d www.ada-ai.ru --email you@example.ru --agree-tos --no-eff-email
```

Затем:

```bash
cp nginx/conf.d/app-ssl.conf.example nginx/conf.d/app-ssl.conf
# замените example.ru на свой домен
nano nginx/conf.d/app.conf      # включите return 301 на https
docker compose restart nginx
```

Обновление сертификата (cron):

```cron
0 3 * * 1 cd /opt/ada && docker run --rm -v "$PWD/certbot/conf:/etc/letsencrypt" -v "$PWD/certbot/www:/var/www/certbot" certbot/certbot renew --webroot -w /var/www/certbot --quiet && docker compose restart nginx
```

### 6.6. Бэкапы

```bash
docker compose exec -T db pg_dump -U ada ada | gzip > backup-$(date +%F).sql.gz
```

Рекомендуется ежедневный cron и ротация 7 дней. Заявки также доступны через
`/api/admin/leads`.

### 6.7. Ресурсы

В compose заданы ограничения: `db` 512 МБ, `backend` 512 МБ, `frontend` 512 МБ,
`nginx` 128 МБ, логи с ротацией 10 МБ × 3. PostgreSQL настроен на небольшой объём
памяти (`shared_buffers=128MB`, `max_connections=40`). Этого достаточно для
сайта-визитки с заявками; при росте нагрузки увеличьте лимиты осознанно.

---

## 7. API

Документация OpenAPI: `http://<host>/api/docs`.

| Метод | Путь | Назначение |
|---|---|---|
| GET | `/api/health` | liveness |
| GET | `/api/health/ready` | проверка БД и конфигурации |
| POST | `/api/leads` | создание заявки (валидация, антиспам, лимиты) |
| GET | `/api/chat/status` | доступность AI-консультанта |
| POST | `/api/chat/stream` | SSE-поток ответа, создание заявки из диалога |
| GET | `/api/admin/leads` | список заявок (Bearer `ADMIN_TOKEN`) |
| PATCH | `/api/admin/leads/{public_id}` | смена статуса |
| GET | `/api/admin/stats` | сводка по статусам |

Пример заявки:

```bash
curl -X POST http://localhost/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Иван",
    "contact": "@ivan",
    "direction": "ai-development",
    "description": "Нужен AI-агент для первичной обработки обращений",
    "budget": "50 000 – 150 000 ₽",
    "deadline": "В течение месяца",
    "consent": true,
    "started_at": 1700000000000
  }'
```

---

## 8. Безопасность

- LLM-ключи и токен Telegram хранятся только на сервере (`.env`), не в бандле.
- Валидация всех входящих данных через Pydantic, ограничение длины запроса (64 КБ).
- Rate limiting: заявки — 5 за 10 минут с IP, чат — 30 сообщений за 10 минут,
  плюс ограничение на уровне nginx.
- Антиспам: honeypot-поле, проверка минимального времени заполнения, лимит ссылок,
  отсев повторов по отпечатку контакта и текста.
- IP не хранится в открытом виде — только SHA-256 хэш для аудита.
- CORS ограничен списком доменов из `CORS_ORIGINS`; админ-API требует Bearer-токен.
- Security-заголовки на уровне Next.js и nginx, HTTPS с HSTS в production.
- SQL-инъекции исключены: все запросы через SQLAlchemy с параметрами.

---

## 9. SEO

- Уникальные `title`/`description` на каждой странице (`src/lib/seo.ts`).
- Один H1, иерархия H2/H3, ЧПУ, хлебные крошки.
- `sitemap.xml` и `robots.txt` генерируются динамически.
- JSON-LD: `ProfessionalService`, `Service`, `FAQPage`, `BreadcrumbList`, `BlogPosting`.
- Open Graph и Twitter Cards, динамическое OG-изображение `/opengraph-image`.
- 404 с корректным статусом, canonical на всех страницах, alt у изображений.
- Блог: 6 оригинальных статей, готовых к расширению (`src/content/blog.ts`).

Проверка:

```bash
curl -s http://localhost/sitemap.xml | head
curl -s -o /dev/null -w "%{http_code}\n" http://localhost/does-not-exist   # 404
```

---

## 10. Известные ограничения

- AI-консультант требует валидного ключа LLM. Без него виджет честно сообщает,
  что сервис не настроен, и предлагает форму.
- Telegram-уведомления требуют токена бота и chat_id; без них заявки сохраняются
  в базе, но уведомление не отправляется.
- Админ-панель представлена API и подготовленной моделью данных, интерфейс — следующий этап.
- Скриншоты портфолио заменены схемами интерфейсов: публичных демо-версий нет.
