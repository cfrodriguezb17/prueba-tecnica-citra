#!/bin/bash
echo "Running database migrations..."
docker compose exec backend php artisan migrate

echo "Running database seeders..."
docker compose exec backend php artisan db:seed

echo "Database setup complete."