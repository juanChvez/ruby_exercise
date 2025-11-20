#!/bin/bash
set -e

echo "Waiting for database..."
until bundle exec rails runner "ActiveRecord::Base.connection.execute('SELECT 1')" &>/dev/null; do
  sleep 2
done

echo "Database ready!"

if [ "$RUN_MIGRATIONS" = "true" ]; then
  echo "Running migrations..."
  bundle exec rails db:migrate
fi

exec "$@"