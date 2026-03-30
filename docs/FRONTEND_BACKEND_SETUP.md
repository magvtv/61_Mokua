# Frontend/Backend Setup Complete

## ✅ What's Been Configured

### 1. Project Structure
- ✅ Created `frontend/` directory for React app
- ✅ Created `backend/api-server/` for Express API
- ✅ Created `backend/strapi/` for Strapi CMS
- ✅ Set up pnpm workspace configuration
- ✅ Updated root package.json with workspace scripts

### 2. Configuration Files Created
- ✅ `pnpm-workspace.yaml` - Workspace configuration
- ✅ `frontend/package.json` - Frontend dependencies
- ✅ `frontend/vite.config.ts` - Vite configuration with Strapi proxy
- ✅ `frontend/tsconfig.json` - TypeScript configuration
- ✅ `backend/api-server/package.json` - API server dependencies
- ✅ `backend/api-server/tsconfig.json` - TypeScript configuration

### 3. Documentation
- ✅ `PROJECT_STRUCTURE.md` - Project structure overview
- ✅ `docs/STRAPI_SETUP.md` - Strapi setup guide
- ✅ `docs/MIGRATION_GUIDE.md` - Migration instructions

## 🚀 Next Steps

### Step 1: Move Existing Files

You need to manually move files to complete the migration:

```bash
cd /home/pharoh/Desktop/61_Mokua

# Move frontend files
mv src frontend/src
mv public frontend/public
mv index.html frontend/
mv tailwind.config.ts frontend/
mv postcss.config.js frontend/

# Move backend files
mv server backend/api-server
```

### Step 2: Install Dependencies

```bash
pnpm install
```

This will install dependencies for all workspaces.

### Step 3: Initialize Strapi

```bash
cd backend/strapi
npx create-strapi-app@latest . --quickstart --no-run
```

Or follow the detailed guide in `docs/STRAPI_SETUP.md`.

### Step 4: Create Environment Files

**frontend/.env:**
```env
VITE_API_URL=http://localhost:3001
VITE_STRAPI_URL=http://localhost:1337
```

**backend/api-server/.env:**
```env
PORT=3001
MONGODB_URI=your-mongodb-uri
```

**backend/strapi/.env:**
```env
HOST=0.0.0.0
PORT=1337
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

### Step 5: Start Development

```bash
# Start all services
pnpm dev:all

# Or individually
pnpm dev:frontend    # Frontend on :5173
pnpm dev:api        # API server on :3001
pnpm dev:strapi      # Strapi on :1337
```

## 📁 Current Structure

```
61_Mokua/
├── frontend/              # ✅ Created (needs files moved)
│   ├── package.json       # ✅ Created
│   ├── vite.config.ts     # ✅ Created
│   └── tsconfig.json      # ✅ Created
│
├── backend/
│   ├── api-server/        # ✅ Created (needs files moved)
│   │   ├── package.json   # ✅ Created
│   │   └── tsconfig.json  # ✅ Created
│   │
│   └── strapi/            # ✅ Created (needs initialization)
│
├── api/                   # ✅ Existing (unchanged)
├── docs/                  # ✅ Updated with new guides
├── package.json           # ✅ Updated with workspace scripts
├── pnpm-workspace.yaml    # ✅ Created
└── PROJECT_STRUCTURE.md   # ✅ Created
```

## 🔧 Available Scripts

### Root Level
- `pnpm dev:all` - Start all services (frontend, API, Strapi)
- `pnpm dev:frontend` - Start frontend only
- `pnpm dev:api` - Start API server only
- `pnpm dev:strapi` - Start Strapi CMS only
- `pnpm build:frontend` - Build frontend
- `pnpm build:api` - Build API server
- `pnpm build:all` - Build all services
- `pnpm install:all` - Install all dependencies

### Frontend
- `pnpm --filter frontend dev` - Start dev server
- `pnpm --filter frontend build` - Build for production
- `pnpm --filter frontend lint` - Run linter

### API Server
- `pnpm --filter api-server dev` - Start dev server
- `pnpm --filter api-server start` - Start production server

### Strapi
- `pnpm --filter strapi develop` - Start development mode
- `pnpm --filter strapi start` - Start production mode

## 🎯 What's Next?

1. **Complete File Migration** - Move existing files to new structure
2. **Initialize Strapi** - Set up Strapi CMS with content types
3. **Configure Content Types** - Create Post, Author, Category, Tag, Guest Submission
4. **Set Up Roles** - Configure Super Admin, Editor, Contributor, Guest roles
5. **Integrate Frontend** - Connect React app to Strapi API
6. **Test Everything** - Verify all services work together

## 📚 Documentation

- `PROJECT_STRUCTURE.md` - Overview of project structure
- `docs/STRAPI_SETUP.md` - Detailed Strapi setup guide
- `docs/MIGRATION_GUIDE.md` - Step-by-step migration instructions
- `docs/FRONTEND_BACKEND_SETUP.md` - This file

## ⚠️ Important Notes

1. **Don't delete old files yet** - Keep them until migration is verified
2. **Update import paths** - Some imports may need updating after moving files
3. **Environment variables** - Create `.env` files for each service
4. **Database** - Strapi can use SQLite for dev, PostgreSQL for production

## 🆘 Troubleshooting

### Workspace not found
```bash
pnpm install
```

### Port conflicts
- Frontend: 5173
- API Server: 3001
- Strapi: 1337

Change ports in respective config files if needed.

### Import errors after migration
Update import paths to reflect new directory structure.
