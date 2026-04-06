# AGENTS.md

## Project Structure

- `/backend` - Laravel 13 API (PHP 8.3)
- `/frontend` - Original Next.js 16 app with shadcn/ui
- `/frontend-2` - Second Next.js 16 app (has React Query, different module structure)
- `docker-compose.yml` - MySQL 8.0 + Adminer (port 8081)

## Developer Commands

```bash
# Database
docker compose up -d

# Backend
cd backend && composer install
cp .env.example .env && php artisan key:generate
php artisan migrate
php artisan db:seed --class=RolSeeder
php artisan serve  # http://localhost:8000

# Frontend (primary)
cd frontend && npm install && npm run dev  # http://localhost:3000

# Frontend-2 (alternative)
cd frontend-2 && npm install && npm run dev

# Test Laravel
cd backend && composer test
```

## Database Config (docker-compose.yml)

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_db
DB_USERNAME=laravel_user
DB_PASSWORD=secret_password
```

## Important Notes

- Backend uses Laravel Sanctum for API auth
- Frontend uses `shadcn` components (add with `npx shadcn@latest add <component>`)
- Frontend-2 uses `@tanstack/react-query` for data fetching
- Both frontends use Tailwind CSS 4.x
- Run lint/typecheck: `npm run lint && npm run typecheck`
- Backend has `composer run dev` that runs all services concurrently