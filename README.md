# Mokua Literary Blog

A modern, responsive literary blog built with React, TypeScript, and Material-UI. Features a clear frontend/backend separation with Strapi CMS for content management.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm (built-in with Node.js)
- PostgreSQL (for Strapi CMS) or SQLite (for development)
- MongoDB (for newsletter subscriptions - optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 61_Mokua
   ```

2. **Install dependencies** (run in each app directory)
   ```bash
   cd frontend && npm install && cd ..
   cd backend/api-server && npm install && cd ../..
   cd backend/strapi && npm install && cd ../..
   ```

3. **Set up environment variables**
   
   **Frontend** (`frontend/.env`):
   ```env
   VITE_API_URL=http://localhost:3001
   VITE_STRAPI_URL=http://localhost:1337
   VITE_SHOW_COMING_SOON=false
   VITE_ENABLE_NEWSLETTER_SIGNUP=true
   ```
   
   **API Server** (`backend/api-server/.env`):
   ```env
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/mokua
   ```
   
   **Strapi** (`backend/strapi/.env`):
   ```env
   HOST=0.0.0.0
   PORT=1337
   DATABASE_CLIENT=sqlite
   DATABASE_FILENAME=.tmp/data.db
   ```

4. **Initialize Strapi CMS** (first time only)
   ```bash
   cd backend/strapi
   npx create-strapi-app@latest . --quickstart --no-run
   ```

5. **Start development servers** (run each in its own terminal)
   ```bash
   cd frontend && npm run dev           # Frontend on :5173
   cd backend/api-server && npm run dev # API Server on :3001
   cd backend/strapi && npm run develop # Strapi CMS on :1337
   ```

## 🏗️ Architecture

### Frontend/Backend Separation
This project follows a **monorepo structure** with clear separation:

- **Single Repository**: All code in one place for easy maintenance
- **Feature-Based Organization**: Each feature has its own folder
- **Shared Infrastructure**: Common components, utilities, and API endpoints
- **Feature Flags**: Environment-based feature toggling

### Project Structure
```
61_Mokua/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── types/         # TypeScript types
│   ├── public/            # Static assets
│   └── package.json
│
├── backend/
│   ├── api-server/        # Express API (newsletter, etc.)
│   │   ├── src/
│   │   └── package.json
│   │
│   └── strapi/            # Strapi CMS
│       ├── config/
│       ├── src/
│       └── package.json
│
└── docs/                  # Documentation
```

See `PROJECT_STRUCTURE.md` for detailed structure documentation.

## 🎛️ Feature Flags

The application uses feature flags to control functionality:

### `VITE_SHOW_COMING_SOON`
- **`true`**: Shows the coming soon page (landing page with newsletter signup)
- **`false`**: Shows the full blog application with routing

### `VITE_ENABLE_NEWSLETTER_SIGNUP`
- **`true`**: Newsletter signup functionality is available
- **`false`**: Newsletter signup is disabled

### `VITE_ENABLE_SEARCH`
- **`true`**: Search functionality is available
- **`false`**: Search is disabled

### `VITE_ENABLE_SUBMISSIONS`
- **`true`**: Content submission functionality is available
- **`false`**: Submissions are disabled

## 🚀 Deployment Scenarios

### Development
```bash
VITE_SHOW_COMING_SOON=false
VITE_ENABLE_NEWSLETTER_SIGNUP=true
VITE_ENABLE_SEARCH=true
VITE_ENABLE_SUBMISSIONS=true
```

### Staging (Coming Soon)
```bash
VITE_SHOW_COMING_SOON=true
VITE_ENABLE_NEWSLETTER_SIGNUP=true
VITE_ENABLE_SEARCH=false
VITE_ENABLE_SUBMISSIONS=false
```

### Production (Full Blog)
```bash
VITE_SHOW_COMING_SOON=false
VITE_ENABLE_NEWSLETTER_SIGNUP=true
VITE_ENABLE_SEARCH=true
VITE_ENABLE_SUBMISSIONS=true
```

## 🛠️ Development

### Available Scripts

Run from each directory:

**Frontend** (`frontend/`):
- `npm run dev` - Start dev server
- `npm run build` - Build for production

**API Server** (`backend/api-server/`):
- `npm run dev` - Start API server

**Strapi** (`backend/strapi/`):
- `npm run develop` - Start Strapi CMS

### Adding New Features

1. **Create feature components** in `src/components/`
2. **Add feature flags** in `src/utils/featureFlags.ts`
3. **Update routing** in `src/App.tsx` if needed
4. **Document changes** in `docs/`

## 📚 Key Features

### Coming Soon Mode
- Newsletter signup with MongoDB integration
- Responsive design with custom fonts
- Content management via JSON files
- Rate limiting and error handling

### Blog Mode
- Full-featured literary blog
- Article management and categorization
- Author profiles and pages
- Search functionality
- Contact and submission forms
- Dark/light theme toggle

## 🔧 Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: Material-UI (MUI)
- **State Management**: Zustand
- **Styling**: Tailwind CSS + MUI
- **Backend API**: Express.js, Mongoose
- **CMS**: Strapi v4 (Headless CMS)
- **Database**: MongoDB (API), PostgreSQL/SQLite (Strapi)
- **Deployment**: Vercel (Frontend), Railway/Render (Backend)

## 📖 Documentation

- [Project Structure](./PROJECT_STRUCTURE.md) - Overview of frontend/backend structure
- [Strapi Setup Guide](./docs/STRAPI_SETUP.md) - CMS configuration and setup
- [Migration Guide](./docs/MIGRATION_GUIDE.md) - Moving to new structure
- [Frontend/Backend Setup](./docs/FRONTEND_BACKEND_SETUP.md) - Setup instructions
- [Feature Flags Configuration](./docs/FEATURE_FLAGS.md)
- [Architecture Decisions](./docs/ARCHITECTURE_DECISIONS.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Email Subscription System](./docs/EMAIL_SUBSCRIPTION.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.