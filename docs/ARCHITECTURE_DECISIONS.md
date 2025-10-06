# 🏗️ Architecture Decisions

This document explains the key architectural decisions made for the Mokua Literary Blog project.

## 📁 **Folder Structure Decisions**

### **Why `api/` stays in root, not in `server/`**

The `api/` folder contains **Vercel serverless functions** and must remain in the root directory for Vercel to properly detect and deploy them.

```
✅ CORRECT (Current)
mokua-literary/
├── api/              # Vercel serverless functions
│   ├── subscribe.ts
│   ├── subscribers.ts
│   └── unsubscribe.ts
├── server/           # Express server for local dev
│   └── src/
└── src/              # Frontend React app

❌ INCORRECT
mokua-literary/
├── server/
│   ├── api/          # Vercel won't detect these
│   └── src/
└── src/
```

**Vercel Requirements:**
- Serverless functions must be in `/api/` at the root level
- Cannot be nested in subdirectories
- Each `.ts` file becomes an API endpoint

### **Why `server/` exists separately**

The `server/` directory contains the **Express server** for local development:

- **Faster development** with hot reload
- **Better debugging** with full server logs
- **Database connections** that persist between requests
- **Middleware testing** in a real server environment

## 🔄 **Shared Code Strategy**

### **The Problem We Solved**

Before:
```
❌ Code Duplication
├── server.ts          # Express server logic
├── api/subscribe.ts   # Vercel function logic (duplicated)
└── api/unsubscribe.ts # Vercel function logic (duplicated)
```

After:
```
✅ Shared Code
├── server/src/        # Shared business logic
│   ├── models/       # Database models
│   ├── routes/       # Route handlers
│   └── utils/        # Utilities
├── server/src/index.ts # Express server (imports shared code)
└── api/              # Vercel functions (import shared code)
```

### **Benefits of This Approach**

1. **Single Source of Truth**: Business logic lives in one place
2. **DRY Principle**: No code duplication
3. **Type Safety**: Shared TypeScript interfaces
4. **Easy Testing**: Can test business logic independently
5. **Flexible Deployment**: Choose Express for dev, Vercel for production

## 🎯 **Development vs Production Workflow**

### **Development Environment**
```bash
# Terminal 1: Frontend
pnpm dev              # Vite dev server on :5173

# Terminal 2: Backend  
pnpm server:dev       # Express server on :3001
```

**Benefits:**
- Hot reload for both frontend and backend
- Full server logs and debugging
- Persistent database connections
- Real-time error reporting

### **Production Environment**
```bash
# Frontend: Vercel static hosting
# Backend: Vercel serverless functions
# Database: MongoDB Atlas
```

**Benefits:**
- Automatic scaling
- Edge network distribution
- Zero server maintenance
- Pay-per-use pricing

## 📦 **Package Management Strategy**

### **Root `package.json`**
- Frontend dependencies (React, Vite, etc.)
- Development tools (ESLint, Prettier, etc.)
- Scripts for running both frontend and backend

### **`server/package.json`**
- Backend-specific dependencies (Express, Mongoose, etc.)
- Server development tools (tsx, TypeScript, etc.)
- Server-specific scripts

### **Why Separate Package Files?**

1. **Clean Dependencies**: Each part only installs what it needs
2. **Faster Installs**: Smaller dependency trees
3. **Clear Boundaries**: Frontend and backend are truly separate
4. **Deployment Flexibility**: Can deploy frontend and backend independently

## 🔧 **Environment Variables Strategy**

### **Shared Variables**
```env
MONGODB_URI=your_mongodb_connection_string
```

### **Frontend Variables**
```env
VITE_API_URL=http://localhost:3001/api  # Development
VITE_API_URL=https://your-app.vercel.app/api  # Production
```

### **Backend Variables**
```env
PORT=3001                    # Express server only
NODE_ENV=development         # Environment detection
```

## 🚀 **Deployment Strategy**

### **Vercel Deployment**
1. **Frontend**: Automatically builds and deploys from `src/`
2. **Backend**: Automatically deploys serverless functions from `api/`
3. **Shared Code**: Gets bundled with each function

### **Local Development**
1. **Frontend**: Vite dev server with hot reload
2. **Backend**: Express server with full debugging
3. **Database**: Same MongoDB instance for both environments

## 🎯 **Key Takeaways**

1. **`api/` stays in root** - Vercel requirement
2. **`server/` for local dev** - Better development experience
3. **Shared code in `server/src/`** - Single source of truth
4. **Separate package files** - Clean dependency management
5. **Environment-specific configs** - Flexible deployment

This architecture gives you the best of both worlds: excellent development experience with Express and scalable production deployment with Vercel serverless functions. 