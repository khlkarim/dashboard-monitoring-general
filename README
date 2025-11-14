# Dashboard Monitoring General

## Installation

```bash
git clone git@github.com:khlkarim/dashboard-monitoring-general.git dashboard-monitoring-general

cd dashboard-monitoring-general
mv .env.example .env

cd backend 
mv .env.example .env
npm install

cd ../frontend
mv .env.example .env
npm install
```

## Usage

### Run it manually
```bash
docker compose up -d postgres adminer maildev

cd backend 
npm run migration:run
npm run seed:run
npm run start:dev

cd ../frontend
npm run dev
```

### Run it using docker
```bash
docker compose up -d
```

The backend swagger api is at http://localhost:3001/docs.
The frontend is at http://localhost:3000/.
Login creds:
    admin@example.com  
    secret
Email verification links are sent to the maildev server.
