# Youth Football Academy Portal

> A management system for sports clubs. Features schedule management for practices, a secure parent portal for fee payments, and a media gallery for uploading match highlights and player statistics.

<div dir="rtl"><b>بوابة إدارة أكاديميات كرة القدم للشباب</b> — نظام إدارة متكامل للأندية والأكاديميات الرياضية. يتميز بإدارة جداول التدريب، وبوابة آمنة لأولياء الأمور لدفع الرسوم، ومعرض وسائط لرفع أبرز لقطات المباريات وإحصائيات اللاعبين.</div>

`youth-football-academy-portal` · fitness · 41 files · generated from the CodeSky template gallery

## What this is

This template is a management system for youth football academies handling players, coaches, teams, and training sessions. It is designed for sports clubs that need a central portal to track rosters, schedule practices, and monitor day-to-day operations. The description mentions a parent portal for fee payments and a media gallery for match highlights, but the actual codebase focuses on CRUD operations for core entities without implementing payment or media upload features yet.

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 18.2.0 + Vite |
| Backend | Node + Express |
| Database | SQL schema included |
| Tests | none |
| Container | none |

## Architecture

The frontend is a React application built with Vite and styled with Tailwind CSS. It presents pages for academies, coaches, players, teams, and training schedules, fetching data through an Axios-based API client that can toggle between live endpoints and mock data for development. Navigation is handled by a sidebar and header component, and all UI state lives client-side with no routing library in evidence.

The backend is an Express server written in TypeScript that exposes REST endpoints for creating, reading, updating, and deleting records across six database tables: academies, activities, coaches, players, teams, and training_sessions. Data persists in a MySQL database configured through environment variables, with schema and seed scripts provided in the database folder. The server includes middleware for compression, CORS, and Helmet security headers, and environment configuration references bcrypt, JWT, SMTP, and AWS S3 credentials, though none of those integrations appear in the controller logic or routes.

### Layout

```
backend/.env.example
backend/README.md
backend/package.json
backend/src/app.ts
backend/src/config/database.ts
backend/src/controllers/academiesController.ts
backend/src/controllers/coachesController.ts
backend/src/controllers/dashboardController.ts
backend/src/controllers/playersController.ts
backend/src/controllers/teamsController.ts
backend/src/controllers/trainingSessionsController.ts
backend/src/models/index.ts
backend/src/routes/index.ts
backend/src/server.ts
backend/tsconfig.json
database/README.md
database/schema.sql
database/seed.sql
frontend/index.html
frontend/package.json
frontend/postcss.config.js
frontend/src/App.tsx
frontend/src/api/client.ts
frontend/src/api/mockData.ts
frontend/src/components/Header.tsx
frontend/src/components/Sidebar.tsx
frontend/src/index.css
frontend/src/main.tsx
frontend/src/pages/AcademiesPage.tsx
frontend/src/pages/CoachesPage.tsx
frontend/src/pages/Dashboard.tsx
frontend/src/pages/PlayersPage.tsx
frontend/src/pages/TeamsPage.tsx
frontend/src/pages/TrainingSchedulePage.tsx
frontend/src/services/apiService.ts
frontend/src/types/index.ts
frontend/src/utils/rtl.ts
frontend/tailwind.config.js
frontend/tsconfig.json
frontend/tsconfig.node.json
… and 1 more files
```

### Data model

Tables defined in the SQL schema:

- `academies`
- `activities`
- `coaches`
- `players`
- `teams`
- `training_sessions`

### API surface

```
DELETE /academies/:id
DELETE /coaches/:id
DELETE /players/:id
DELETE /teams/:id
DELETE /training-sessions/:id
GET    /
GET    /academies
GET    /academies/:id
GET    /coaches
GET    /coaches/:id
GET    /dashboard/activities
GET    /dashboard/stats
GET    /health
GET    /players
GET    /players/:id
GET    /teams
GET    /teams/:id
GET    /training-sessions
GET    /training-sessions/:id
POST   /academies
POST   /coaches
POST   /players
POST   /teams
POST   /training-sessions
PUT    /academies/:id
PUT    /coaches/:id
PUT    /players/:id
PUT    /teams/:id
PUT    /training-sessions/:id
```

## Running it

```bash
# frontend
cd frontend && npm install && npm run dev

# backend
cd backend && npm install && npm run dev
```

Configuration is read from an `.env` file. Copy `.env.example` and set:

- `AWS_ACCESS_KEY_ID`
- `AWS_REGION`
- `AWS_S3_BUCKET`
- `AWS_SECRET_ACCESS_KEY`
- `BCRYPT_SALT_ROUNDS`
- `DB_HOST`
- `DB_NAME`
- `DB_PASSWORD`
- `DB_USER`
- `FRONTEND_URL`
- `HOST`
- `JWT_SECRET`
- `LOG_FILE`
- `LOG_LEVEL`
- `MAX_FILE_SIZE`
- `NODE_ENV`
- `PORT`
- `SMTP_HOST`
- `SMTP_PASS`
- `SMTP_PORT`
- `SMTP_USER`
- `UPLOAD_LIMIT`

## What is next

1. **Implement authentication and authorization** — The template includes JWT_SECRET and bcrypt dependencies but no login, signup, or token validation middleware, so the API is currently open to anyone.
2. **Add payment processing for parent portal** — The description promises fee payments, but no payment gateway integration, transaction tables, or billing endpoints exist in the codebase.
3. **Build media gallery with S3 uploads** — AWS S3 credentials are defined in the environment and multer is installed, but no upload routes or file-handling logic are implemented.
4. **Write unit and integration tests** — No test files or test runner configuration exist, leaving the application without automated verification of functionality.
5. **Containerize with Docker** — No Dockerfile or docker-compose.yml is present, so local setup requires manual installation of Node and MySQL.
6. **Replace seed data with production-ready schemas** — The seed.sql file populates the database with placeholder records that should be cleared before real use.
7. **Set up CI/CD pipeline** — No GitHub Actions, GitLab CI, or other automation config exists to build, test, and deploy the application on commit.

---

<sub>Exported from the CodeSky template gallery. Generated code — review before production use. <a href="https://codesky.ai">codesky.ai</a></sub>
