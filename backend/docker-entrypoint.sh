#!/bin/bash
set -e

echo "Waiting for database..."
echo "DATABASE_URL: ${DATABASE_URL}"

# Retry logic with visible errors
max_attempts=30
attempt=0

until bundle exec rails db:prepare; do
  attempt=$((attempt + 1))
  if [ $attempt -eq $max_attempts ]; then
    echo "Failed to connect to database after $max_attempts attempts"
    exit 1
  fi
  echo "Database not ready yet (attempt $attempt/$max_attempts), waiting..."
  sleep 2
done

echo "Database ready!"

if [ "$RUN_MIGRATIONS" = "true" ]; then
  echo "Running migrations..."
  bundle exec rails db:migrate
fi

exec "$@"