# Mokua Project Structure

## Overview

This project follows a monorepo structure with clear separation between frontend and backend.

```
61_Mokua/
├── frontend/                 # React frontend application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── api-server/          # Express API Gateway (for Vercel serverless functions)
│   │   ├── src/
│   │   └── package.json
│   │
│   └── strapi/              # Strapi CMS backend
│       ├── config/
│       ├── src/
│       └── package.json
│
├── api/                      # Vercel serverless functions (deployed separately)
│   ├── subscribe.ts
│   ├── subscribers.ts
│   └── unsubscribe.ts
│
├── docs/                     # Project documentation
├── package.json             # Root workspace configuration
├── pnpm-workspace.yaml      # pnpm workspace config
└── .gitignore
```

## Directory Responsibilities

### Frontend (`frontend/`)
- React + TypeScript + Vite application
- Consumes Strapi CMS API
- Deployed to Vercel
- Port: 5173 (dev)

### Backend API Server (`backend/api-server/`)
- Express.js API Gateway
- Handles newsletter subscriptions
- Rate limiting and middleware
- Can be used for local development
- Port: 3001 (dev)

### Backend Strapi CMS (`backend/strapi/`)
- Strapi v4 headless CMS
- Content management and admin dashboard
- REST/GraphQL API
- Port: 1337 (dev)

### Vercel Functions (`api/`)
- Serverless functions for production
- Newsletter subscription endpoints
- Deployed automatically by Vercel

## Development Workflow

### Start All Services
```bash
pnpm dev:all
```

### Start Individual Services
```bash
# Frontend only
pnpm --filter frontend dev

# API Server only
pnpm --filter api-server dev

# Strapi CMS only
pnpm --filter strapi develop
```

## Environment Variables

Each service has its own `.env` file:
- `frontend/.env`
- `backend/api-server/.env`
- `backend/strapi/.env`

See individual README files for required variables.
