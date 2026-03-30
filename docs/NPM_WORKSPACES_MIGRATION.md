# Migration from pnpm to npm Workspaces

## Overview

This project has been migrated from **pnpm workspaces** to **npm workspaces** for package management.

## What Changed

### 1. Package Manager Configuration

**Before (pnpm):**
- Used `pnpm-workspace.yaml` for workspace definition
- Used `pnpm-lock.yaml` for dependency locking
- Had `packageManager` field specifying pnpm version

**After (npm):**
- Uses `workspaces` field in root `package.json`
- Uses `package-lock.json` for dependency locking
- No `packageManager` field needed (uses system npm)

### 2. Root package.json Changes

**Added:**
```json
"workspaces": [
  "frontend",
  "backend/api-server",
  "backend/strapi"
]
```

**Updated Scripts:**
- `pnpm --filter <workspace>` → `npm run <script> --workspace=<workspace>`
- `pnpm install` → `npm install`

### 3. Files Removed

- ✅ Deleted `pnpm-workspace.yaml`
- ✅ Deleted `pnpm-lock.yaml`

### 4. Files to Generate

- ⏳ Will create `package-lock.json` on first `npm install`

## Script Changes

| Command | Before (pnpm) | After (npm) |
|---------|--------------|-------------|
| Dev all | `pnpm dev:all` | `npm run dev:all` |
| Dev frontend | `pnpm dev:frontend` | `npm run dev:frontend` |
| Dev API | `pnpm dev:api` | `npm run dev:api` |
| Dev Strapi | `pnpm dev:strapi` | `npm run dev:strapi` |
| Build all | `pnpm build:all` | `npm run build:all` |
| Build frontend | `pnpm build:frontend` | `npm run build:frontend` |
| Build API | `pnpm build:api` | `npm run build:api` |
| Install all | `pnpm install:all` | `npm run install:all` |
| Lint | `pnpm lint` | `npm run lint` |

## How npm Workspaces Work

### Workspace Structure

```
mokua-rise-above/
├── package.json (root with workspaces field)
├── package-lock.json (single lock file for all workspaces)
├── node_modules/ (hoisted dependencies)
├── frontend/
│   ├── package.json (workspace package)
│   └── node_modules/ (workspace-specific deps)
├── backend/
    ├── api-server/
    │   └── package.json (workspace package)
    └── strapi/
        └── package.json (workspace package)
```

### Key Features

1. **Dependency Hoisting**: Common dependencies are installed at the root
2. **Single Lock File**: One `package-lock.json` for the entire monorepo
3. **Workspace Linking**: Workspaces can reference each other
4. **Efficient Installation**: Shared dependencies aren't duplicated

### Running Commands

**Root Level:**
```bash
# Install all workspace dependencies
npm install

# Run script in specific workspace
npm run dev --workspace=frontend

# Run script in all workspaces
npm run build --workspaces

# Install dependency in specific workspace
npm install axios --workspace=frontend
```

**Inside Workspace:**
```bash
# Navigate to workspace
cd frontend

# Run scripts normally
npm run dev
npm run build
npm install axios
```

## Migration Steps (Already Completed)

✅ 1. Added `workspaces` field to root `package.json`
✅ 2. Updated all scripts to use npm workspace syntax
✅ 3. Removed `packageManager` field
✅ 4. Deleted `pnpm-workspace.yaml`
✅ 5. Deleted `pnpm-lock.yaml`

## Next Steps

1. **Install dependencies with npm:**
   ```bash
   npm install
   ```
   This will:
   - Install all workspace dependencies
   - Create `package-lock.json`
   - Hoist shared dependencies to root
   - Link workspace packages

2. **Verify installation:**
   ```bash
   npm run dev:frontend
   ```

3. **Update .gitignore (if needed):**
   Ensure these are ignored:
   ```
   node_modules/
   package-lock.json
   pnpm-lock.yaml
   ```

## Differences from pnpm

### Advantages of npm Workspaces

1. **Built-in**: No additional package manager to install
2. **Familiar**: Uses standard npm commands
3. **Widely Supported**: Better CI/CD integration
4. **Simpler**: One less tool to manage

### What pnpm Had (that npm doesn't)

1. **Stricter Dependency Resolution**: pnpm prevents phantom dependencies
2. **Disk Space Efficiency**: pnpm uses content-addressable storage
3. **Faster Installs**: pnpm's algorithm can be faster in some cases
4. **Shorter Command Syntax**: `pnpm --filter` vs `npm run --workspace=`

## Troubleshooting

### Installation Issues

**Problem**: Dependencies not installing correctly
**Solution**: 
```bash
# Clean install
rm -rf node_modules package-lock.json
rm -rf */node_modules */*/node_modules
npm install
```

### Workspace Not Found

**Problem**: `npm ERR! No workspaces found`
**Solution**: Ensure workspace paths in root `package.json` match actual directories

### Script Failures

**Problem**: Scripts not running in workspaces
**Solution**: Check workspace package names match:
```bash
# List all workspaces
npm ls --workspaces --depth=0
```

## Comparison Table

| Feature | pnpm | npm |
|---------|------|-----|
| Workspace Config | `pnpm-workspace.yaml` | `workspaces` in `package.json` |
| Lock File | `pnpm-lock.yaml` | `package-lock.json` |
| Run Script | `pnpm --filter <ws> <cmd>` | `npm run <cmd> --workspace=<ws>` |
| Install Dependency | `pnpm add <pkg> --filter <ws>` | `npm install <pkg> --workspace=<ws>` |
| Install All | `pnpm install` | `npm install` |
| Disk Storage | Content-addressable (efficient) | Standard (duplicates) |
| Speed | Very fast | Fast |
| CI/CD Support | Good | Excellent |

## Additional Resources

- [npm Workspaces Documentation](https://docs.npmjs.com/cli/v10/using-npm/workspaces)
- [npm Workspace Commands](https://docs.npmjs.com/cli/v10/commands/npm-workspace)
- [Migrating from Lerna/pnpm to npm Workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces#migrating-from-lerna)

## Notes

- npm workspaces require npm v7.0.0 or higher
- All workspace packages share the same `node_modules` structure
- Workspace names in scripts come from package.json `name` field, not directory names
- Use `--workspace=<name>` for single workspace, `--workspaces` for all workspaces
