# Dashboard Monitoring General

## Installation

This repo contains two apps:

```
/frontend   → Next.js + TypeScript
/backend    → NestJS + TypeORM + PostgreSQL
```

### Prerequisites

#### Global tools

- **Node.js & npm**
- **Docker Desktop**
- **Git**

#### Clone project

```bash
git clone git@github.com:khlkarim/dashboard-monitoring-general.git dashboard-monitoring-general

cd dashboard-monitoring-general
cp .env.example .env

cd backend
cp .env.example .env
npm install

cd ../frontend
cp .env.example .env
npm install
```

---

## Running the project

### Run it using manually

#### Frontend (Next.js)

```sh
cd frontend
npm run dev
```

#### Backend (NestJS)

```sh
docker compose up -d postgres adminer maildev

cd backend
npm run migration:run
npm run seed:run:relational
npm run start:dev
```

### Run it using docker

```bash
docker compose up -d
```

---

# Fun Facts

The backend swagger api is at http://localhost:3001/docs.

The frontend is at http://localhost:3000/.

Login creds:

```bash
admin@example.com
secret
```

Email verification links are sent to the maildev server.
