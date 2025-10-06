# 📚 Mokua Literary Blog

A modern literary publishing platform built as a **Progressive Web Application (PWA)** for [mokua.co.ke](https://mokua.co.ke). This project serves as a digital stage for stories, poems, essays, reviews, and guest submissions.

## 🏗️ **Project Architecture**

This project follows a **clean separation** between frontend and backend:

```
mokua-literary/
├── 📱 Frontend (React + Vite)
│   ├── src/           # React components & pages
│   ├── public/        # Static assets
│   └── package.json   # Frontend dependencies
│
├── 🖥️ Backend (Express + Vercel)
│   ├── server/        # Local Express server
│   │   └── src/       # Shared business logic
│   └── api/           # Vercel serverless functions
│
└── 📦 Shared
    ├── models/        # Database models
    ├── utils/         # Shared utilities
    └── types/         # TypeScript interfaces
```

## 🚀 **Quick Start**

### **Frontend Development**
```bash
# Install dependencies
pnpm install

# Start frontend dev server
pnpm dev

# Build for production
pnpm build
```

### **Backend Development**
```bash
# Install server dependencies
pnpm server:install

# Start local Express server
pnpm server:dev

# Or start both frontend and backend
pnpm dev          # Frontend on :5173
pnpm server:dev   # Backend on :3001
```

## 🔄 **Development vs Production**

| Environment | Backend | Frontend | Database |
|-------------|---------|----------|----------|
| **Development** | Express Server (`server/`) | Vite Dev Server | MongoDB Local/Cloud |
| **Production** | Vercel Functions (`api/`) | Vercel Static | MongoDB Cloud |

## 📁 **Folder Structure**

### **Frontend (`src/`)**
- `components/` - Reusable UI components
- `pages/` - Page components
- `hooks/` - Custom React hooks
- `stores/` - State management (Zustand)
- `services/` - API service layer
- `types/` - TypeScript interfaces
- `utils/` - Helper functions

### **Backend (`server/` + `api/`)**
- `server/src/` - Express server & shared logic
- `api/` - Vercel serverless functions
- Shared models, utilities, and business logic

## 🎯 **Why This Architecture?**

1. **Clean Separation**: Frontend and backend concerns are completely separated
2. **Shared Logic**: Business logic is shared between Express and Vercel
3. **Flexible Deployment**: Choose local dev (Express) or production (Vercel)
4. **Type Safety**: Full TypeScript support across the entire stack
5. **Easy Testing**: Can test business logic independently

## 🔧 **Environment Variables**

Create a `.env` file in the root:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Server
PORT=3001
NODE_ENV=development

# Frontend
VITE_API_URL=http://localhost:3001/api
```

## 📦 **Tech Stack**

### **Frontend**
- React 18 + TypeScript
- Vite (build tool)
- Material-UI + MUI Icons
- React Router DOM
- Zustand (state management)
- React Query (data fetching)
- Framer Motion (animations)

### **Backend**
- Express.js (local development)
- Vercel Functions (production)
- Mongoose (MongoDB ODM)
- TypeScript
- Rate limiting & validation

### **Infrastructure**
- Vercel (hosting & deployment)
- MongoDB Atlas (database)
- Cloudinary (media storage)

## 🚀 **Deployment**

### **Frontend**
- Automatically deployed to Vercel
- Static files served from CDN
- Progressive Web App features

### **Backend**
- Vercel serverless functions
- Automatic scaling
- Edge network distribution

## 📚 **Documentation**

- [System Architecture](./docs/SYSTEM_ARCHITECTURE.md)
- [API Documentation](./docs/API.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

---

**Built with ❤️ for the literary community**