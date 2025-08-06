# Mokua Literary Blog

A modern, responsive literary blog built with React, TypeScript, and Material-UI. Features a modular monolith architecture with feature flags for easy deployment management.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- MongoDB (for newsletter subscriptions)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 61_Mokua
   ```

2. **Install dependencies**
   ```bash
   pnpm install:all
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```bash
   # Feature Flags
   VITE_SHOW_COMING_SOON=false
   VITE_ENABLE_NEWSLETTER_SIGNUP=true
   VITE_ENABLE_SEARCH=true
   VITE_ENABLE_SUBMISSIONS=true
   
   # API Configuration
   VITE_API_BASE_URL=http://localhost:3001
   
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/mokua
   ```

4. **Start development servers**
   ```bash
   pnpm start:all
   ```

## 🏗️ Architecture

### Modular Monolith
This project follows a **modular monolith** architecture pattern:

- **Single Repository**: All code in one place for easy maintenance
- **Feature-Based Organization**: Each feature has its own folder
- **Shared Infrastructure**: Common components, utilities, and API endpoints
- **Feature Flags**: Environment-based feature toggling

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components (Header, Footer, etc.)
│   ├── home/           # Home page specific components
│   ├── layout/         # Layout components
│   └── post/           # Post-related components
├── pages/              # Page components
├── stores/             # State management (Zustand)
├── services/           # API and data services
├── utils/              # Utility functions and feature flags
└── types/              # TypeScript type definitions
```

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

- `pnpm dev` - Start frontend development server
- `pnpm server:dev` - Start backend development server
- `pnpm start:all` - Start both frontend and backend
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm preview` - Preview production build

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
- **Backend**: Express.js, Mongoose
- **Database**: MongoDB
- **Deployment**: Vercel

## 📖 Documentation

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