# Migration Guide: Reorganizing to Frontend/Backend Structure

This guide helps migrate the existing project to the new frontend/backend structure.

## New Structure

```
61_Mokua/
├── frontend/              # React frontend (moved from src/)
├── backend/
│   ├── api-server/       # Express API (moved from server/)
│   └── strapi/           # Strapi CMS (new)
├── api/                   # Vercel functions (unchanged)
└── docs/                  # Documentation (unchanged)
```

## Migration Steps

### Step 1: Backup Current State

```bash
cd /home/pharoh/Desktop/61_Mokua
git add .
git commit -m "Backup before migration to frontend/backend structure"
```

### Step 2: Move Frontend Files

```bash
# Move src/ to frontend/src/
mv src frontend/src

# Move public/ to frontend/public/
mv public frontend/public

# Move frontend config files
mv index.html frontend/
mv vite.config.ts frontend/
mv tailwind.config.ts frontend/
mv postcss.config.ts frontend/
mv tsconfig.app.json frontend/tsconfig.json
mv tsconfig.node.json frontend/
```

### Step 3: Move Backend API Server

```bash
# Move server/ to backend/api-server/
mv server backend/api-server
```

### Step 4: Update Import Paths

Update imports in frontend files that reference root-level files:

```bash
# In frontend/src files, update any imports from:
# '../server/' -> '../../backend/api-server/'
# '../api/' -> '../../api/'
```

### Step 5: Update Environment Variables

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:3001
VITE_STRAPI_URL=http://localhost:1337
```

Create `backend/api-server/.env`:
```env
PORT=3001
MONGODB_URI=your-mongodb-uri
```

### Step 6: Update Vercel Configuration

Update `vercel.json` if needed to point to new frontend directory:

```json
{
  "buildCommand": "cd frontend && pnpm build",
  "outputDirectory": "frontend/dist",
  "devCommand": "cd frontend && pnpm dev"
}
```

### Step 7: Install Dependencies

```bash
# Install all workspace dependencies
pnpm install

# Or install individually
pnpm --filter frontend install
pnpm --filter api-server install
```

### Step 8: Test Everything

```bash
# Start all services
pnpm dev:all

# Or individually
pnpm dev:frontend    # Frontend on :5173
pnpm dev:api        # API server on :3001
pnpm dev:strapi     # Strapi on :1337
```

## Automated Migration Script

Create `scripts/migrate-structure.sh`:

```bash
#!/bin/bash

echo "Starting migration to frontend/backend structure..."

# Create directories
mkdir -p frontend/src frontend/public backend/api-server/src backend/strapi

# Move frontend files
echo "Moving frontend files..."
mv src frontend/src 2>/dev/null || echo "src/ already moved or doesn't exist"
mv public frontend/public 2>/dev/null || echo "public/ already moved or doesn't exist"
mv index.html frontend/ 2>/dev/null || echo "index.html already moved or doesn't exist"
mv vite.config.ts frontend/ 2>/dev/null || echo "vite.config.ts already moved or doesn't exist"
mv tailwind.config.ts frontend/ 2>/dev/null || echo "tailwind.config.ts already moved or doesn't exist"
mv postcss.config.js frontend/ 2>/dev/null || echo "postcss.config.js already moved or doesn't exist"

# Move backend files
echo "Moving backend files..."
mv server backend/api-server 2>/dev/null || echo "server/ already moved or doesn't exist"

echo "Migration complete! Run 'pnpm install' to install dependencies."
```

Make it executable:
```bash
chmod +x scripts/migrate-structure.sh
./scripts/migrate-structure.sh
```

## Verification Checklist

- [ ] Frontend files moved to `frontend/`
- [ ] Backend files moved to `backend/api-server/`
- [ ] `frontend/package.json` created
- [ ] `backend/api-server/package.json` created
- [ ] `pnpm-workspace.yaml` created
- [ ] Root `package.json` updated with workspace scripts
- [ ] Environment variables updated
- [ ] Import paths updated
- [ ] All services start correctly
- [ ] Frontend connects to API server
- [ ] Frontend connects to Strapi

## Rollback

If something goes wrong:

```bash
git reset --hard HEAD
```

Or manually reverse the moves.

## Post-Migration

1. Update README.md with new structure
2. Update deployment documentation
3. Test all functionality
4. Update CI/CD pipelines if needed
