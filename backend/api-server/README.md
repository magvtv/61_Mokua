# 🖥️ Mokua Server

This directory contains the backend server code that can run both as a standalone Express server and as Vercel serverless functions.

## 📁 Structure

```
server/
├── src/
│   ├── index.ts          # Main Express server entry point
│   ├── models/           # Mongoose models
│   │   └── Subscriber.ts
│   ├── routes/           # Route handlers (shared between Express & Vercel)
│   │   └── subscribe.ts
│   └── utils/            # Shared utilities
│       ├── database.ts   # MongoDB connection utilities
│       └── rateLimiter.ts
├── package.json          # Server-specific dependencies
└── README.md
```

## 🚀 Development

### Local Development (Express Server)
```bash
cd backend/api-server
npm install
npm run dev  # Runs with hot reload
```

### Production (Vercel Functions)
The `api/` folder in the root contains Vercel serverless functions that import and use the shared code from `server/src/`.

## 🔄 Shared Code Strategy

**Why this approach works:**

1. **Single Source of Truth**: All business logic lives in `server/src/`
2. **DRY Principle**: No code duplication between Express and Vercel
3. **Type Safety**: Shared TypeScript interfaces and models
4. **Easy Testing**: Can test business logic independently
5. **Flexible Deployment**: Choose Express for local dev, Vercel for production

## 📦 Dependencies

The server has its own `package.json` with only the dependencies it needs:
- Express & related middleware
- Mongoose for MongoDB
- TypeScript tooling

## 🔧 Environment Variables

Both Express and Vercel functions use the same environment variables:
- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (Express only)

## 🎯 Benefits

1. **Clean Separation**: Frontend and backend concerns are separated
2. **Shared Logic**: Database models, validation, and business logic are shared
3. **Easy Maintenance**: Changes to business logic only need to be made in one place
4. **Type Safety**: Full TypeScript support across the entire backend
5. **Flexible Deployment**: Can run locally or deploy to Vercel seamlessly 