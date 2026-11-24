#!/usr/bin/env bash
#
# Деплой ADA на VPS: переносит текущий коммит, пересобирает контейнеры
# и вычищает мусор, который накапливается между выкладками.
#
#   bash scripts/deploy.sh
#
# Переменные (необязательно): SSH_KEY, HOST, REMOTE_DIR.

set -euo pipefail

SSH_KEY="${SSH_KEY:-$HOME/.ssh/mca_vps}"
HOST="${HOST:-root@178.212.15.6}"
REMOTE_DIR="${REMOTE_DIR:-/opt/ada}"

# Сервер собирает только frontend и backend; исходники витрин и прочее ему не нужны.
ARCHIVE_PATHS=(frontend backend nginx scripts docker-compose.yml README.md .gitattributes)

SSH=(ssh -i "$SSH_KEY" -o BatchMode=yes -o StrictHostKeyChecking=accept-new "$HOST")

echo "==> Проверяю доступ к $HOST"
"${SSH[@]}" 'echo ok' >/dev/null

deploy_failed=0
revision="$(git rev-parse --short HEAD)"
echo "==> Переношу коммит $revision"
git archive --format=tar HEAD "${ARCHIVE_PATHS[@]}" \
  | "${SSH[@]}" "rm -rf /tmp/ada-deploy && mkdir -p /tmp/ada-deploy && tar -x -C /tmp/ada-deploy"

echo "==> Собираю и перезапускаю контейнеры"
if ! "${SSH[@]}" 'bash -s' <<REMOTE
set -uo pipefail
cd "$REMOTE_DIR"
cp -a /tmp/ada-deploy/. .
rm -rf /tmp/ada-deploy
echo "===== deploy \$(date -u +%FT%TZ) $revision =====" >> deploy.log
# nginx из compose не поднимаем: 80/443 на хосте держит Caddy, он же терминирует TLS.
docker compose up -d --build frontend backend >> deploy.log 2>&1
status=\$?
docker compose rm -f nginx >> deploy.log 2>&1 || true
exit \$status
REMOTE
then
  echo "!! Сборка или запуск не удались, всё равно чищу диск и смотрю статус"
  deploy_failed=1
fi

echo "==> Чищу мусор"
"${SSH[@]}" 'bash -s' <<'REMOTE'
set -uo pipefail

before=$(df -m / | awk 'NR==2 {print $4}')

# Docker: только кэш сборки и неиспользуемые «висячие» слои.
# Работающие контейнеры, их образы и тома не затрагиваются — на сервере
# живут сторонние проекты (mca-*, narsan, ai_engine).
docker builder prune -af >/dev/null 2>&1 || true
docker image prune -f >/dev/null 2>&1 || true

# Пакетный менеджер и журналы.
apt-get clean >/dev/null 2>&1 || true
rm -rf /var/lib/apt/lists/* 2>/dev/null || true
journalctl --vacuum-size=50M >/dev/null 2>&1 || true
: > /var/log/btmp 2>/dev/null || true
: > /var/log/btmp.1 2>/dev/null || true
: > /var/log/caddy/access.log 2>/dev/null || true

# Кэши сборки и временные выкладки.
rm -rf /tmp/ada-deploy /root/.cache/pip /root/.cache/go-build /root/.cargo/registry/cache 2>/dev/null || true

# Старые резервные копии конфигов: держим две последние.
ls -1t /root/ada-config-backup-*.tar.gz 2>/dev/null | tail -n +3 | xargs -r rm -f

after=$(df -m / | awk 'NR==2 {print $4}')
echo "cleanup: +$((after - before)) MB свободно (${before} -> ${after} MB)"
REMOTE

echo "==> Проверяю сервис"
set +e
"${SSH[@]}" 'bash -s' <<'REMOTE'
set -uo pipefail
for i in $(seq 1 30); do
  code=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:8000/api/health/ready || true)
  [ "$code" = "200" ] && break
  sleep 5
done
docker compose ps --format 'table {{.Service}}\t{{.Status}}'
echo "health: $code"
df -h / | tail -1
REMOTE

exit "$deploy_failed"
