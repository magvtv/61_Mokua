# ✅ Frontend/Backend Setup Complete

## What's Been Done

### 1. Project Structure Reorganized

```
61_Mokua/
├── api/                      # Vercel serverless functions (unchanged)
├── backend/
│   ├── api-server/          # Express API server (moved from server/)
│   │   ├── src/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .env.example
│   │
│   └── strapi/              # Strapi CMS (ready for initialization)
│       └── .env.example
│
├── frontend/                # React frontend (moved from root)
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── eslint.config.js
│   └── .env.example
│
├── docs/                    # Documentation
│   ├── STRAPI_SETUP.md
│   ├── MIGRATION_GUIDE.md
│   ├── FRONTEND_BACKEND_SETUP.md
│   ├── STRAPI_CONTENT_MIGRATION.md
│   └── ... (other docs)
│
├── package.json            # Root workspace config
├── pnpm-workspace.yaml     # pnpm workspace definition
├── README.md               # Updated readme
└── vercel.json            # Deployment config
```

### 2. Files Moved/Cleaned

✅ **Moved to Frontend:**
- `src/` → `frontend/src/`
- `public/` → `frontend/public/`
- `index.html` → `frontend/index.html`
- `vite.config.ts` → `frontend/vite.config.ts`
- `tailwind.config.ts` → `frontend/tailwind.config.ts`
- `postcss.config.js` → `frontend/postcss.config.js`
- `eslint.config.js` → `frontend/eslint.config.js`
- All tsconfig files → `frontend/`

✅ **Moved to Backend:**
- `server/` → `backend/api-server/`
- `tsconfig.server.json` → `backend/api-server/`

✅ **Cleaned Up:**
- Deleted `dist/` (build artifacts)
- Deleted `package-lock.json` (using pnpm)
- Removed duplicate config files from root

### 3. Configuration Files Created

✅ **Workspace:**
- `pnpm-workspace.yaml` - Workspace configuration
- Updated root `package.json` with workspace scripts

✅ **Frontend:**
- `frontend/package.json` - Frontend dependencies
- `frontend/.env.example` - Environment template
- `frontend/vite.config.ts` - Updated with Strapi proxy
- `frontend/tsconfig.json` - TypeScript config

✅ **Backend API Server:**
- `backend/api-server/package.json` - API server dependencies
- `backend/api-server/.env.example` - Environment template
- `backend/api-server/tsconfig.json` - TypeScript config

✅ **Backend Strapi:**
- `backend/strapi/.env.example` - Strapi environment template

### 4. Documentation Created

✅ **Setup Guides:**
- `PROJECT_STRUCTURE.md` - Project overview
- `docs/STRAPI_SETUP.md` - Strapi CMS setup guide
- `docs/MIGRATION_GUIDE.md` - Migration instructions
- `docs/FRONTEND_BACKEND_SETUP.md` - Complete setup guide
- `docs/STRAPI_CONTENT_MIGRATION.md` - Mock data to Strapi migration

✅ **Updated:**
- `README.md` - Updated with new structure
- `.gitignore` - Added frontend/backend ignores

## Next Steps

### 1. Create Environment Files

Copy the example files and fill in your values:

```bash
# Frontend
cp frontend/.env.example frontend/.env

# API Server
cp backend/api-server/.env.example backend/api-server/.env

# Strapi (after initialization)
cp backend/strapi/.env.example backend/strapi/.env
```

### 2. Install Dependencies

```bash
pnpm install
```

This installs dependencies for all workspaces (frontend, api-server).

### 3. Initialize Strapi CMS

```bash
cd backend/strapi
npx create-strapi-app@latest . --quickstart --no-run
```

This creates a new Strapi instance in the `backend/strapi/` directory.

### 4. Configure Strapi

Follow the detailed guide in `docs/STRAPI_SETUP.md`:
1. Start Strapi: `pnpm dev:strapi`
2. Access admin panel: `http://localhost:1337/admin`
3. Create first admin user (Mokua - Super Admin)
4. Create content types (Post, Author, Category, Tag, Guest Submission)
5. Configure roles and permissions
6. Set up external authentication (Clerk/Supabase/Auth0)

### 5. Start Development

```bash
# Start all services
pnpm dev:all

# Or individually
pnpm dev:frontend    # http://localhost:5173
pnpm dev:api        # http://localhost:3001
pnpm dev:strapi     # http://localhost:1337
```

### 6. Migrate Content to Strapi

Once Strapi is configured, migrate mock data:
1. Review `docs/STRAPI_CONTENT_MIGRATION.md`
2. Create seed script to import mock data
3. Update `contentService.ts` to use Strapi API
4. Test all frontend pages

## Available Commands

### Root Level
```bash
pnpm dev:all          # Start all services
pnpm dev:frontend     # Frontend only
pnpm dev:api          # API server only
pnpm dev:strapi       # Strapi only
pnpm build:all        # Build all services
pnpm install:all      # Install all dependencies
```

### Frontend
```bash
pnpm --filter frontend dev      # Start dev server
pnpm --filter frontend build    # Build for production
pnpm --filter frontend lint     # Run linter
```

### API Server
```bash
pnpm --filter api-server dev    # Start dev server
pnpm --filter api-server build  # Build for production
```

### Strapi
```bash
pnpm --filter strapi develop    # Start development mode
pnpm --filter strapi start      # Start production mode
pnpm --filter strapi build      # Build admin panel
```

## Environment Variables

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:3001
VITE_STRAPI_URL=http://localhost:1337
VITE_SHOW_COMING_SOON=false
VITE_ENABLE_NEWSLETTER_SIGNUP=true
```

### API Server (`backend/api-server/.env`)
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/mokua
CORS_ORIGIN=http://localhost:5173
```

### Strapi (`backend/strapi/.env`)
```env
HOST=0.0.0.0
PORT=1337
DATABASE_CLIENT=sqlite  # or postgres for production
DATABASE_FILENAME=.tmp/data.db
APP_KEYS=generate-with-openssl
# ... other secrets
```

## Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

### API Server (Railway/Render)
Deploy `backend/api-server/` directory

### Strapi (Railway/Render)
Deploy `backend/strapi/` directory

## Troubleshooting

### Port conflicts
- Frontend: 5173
- API Server: 3001
- Strapi: 1337

Change ports in respective config files if needed.

### Import errors
If you see import errors after moving files:
1. Clear node_modules: `rm -rf node_modules frontend/node_modules backend/api-server/node_modules`
2. Clear lock files: `rm -rf pnpm-lock.yaml frontend/pnpm-lock.yaml`
3. Reinstall: `pnpm install`

### Workspace not found
```bash
pnpm install
```

## Documentation

- `PROJECT_STRUCTURE.md` - Overview
- `docs/STRAPI_SETUP.md` - Strapi guide
- `docs/MIGRATION_GUIDE.md` - Migration steps
- `docs/FRONTEND_BACKEND_SETUP.md` - Setup details
- `docs/STRAPI_CONTENT_MIGRATION.md` - Content migration

## Status

✅ Project structure reorganized
✅ Configuration files created
✅ Documentation complete
✅ Dependencies ready
⏳ Strapi initialization (your next step)
⏳ Content migration (after Strapi setup)
⏳ External auth setup (after Strapi setup)

## Summary

Your project is now organized with:
- **Clear separation** between frontend and backend
- **Monorepo structure** with pnpm workspaces
- **Strapi CMS** ready for initialization
- **Complete documentation** for all setup steps

Follow the "Next Steps" section above to complete the setup!
