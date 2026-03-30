# Strapi CMS Setup Guide

## Overview

Strapi v4 serves as the headless CMS backend for Mokua's literary platform, providing:
- Content management (Posts, Authors, Categories, Tags)
- Admin dashboard for content curation
- Role-based access control (RBAC)
- REST and GraphQL APIs
- Guest submission management

## Quick Start

### 1. Initialize Strapi

```bash
cd backend/strapi
npx create-strapi-app@latest . --quickstart --no-run
```

Or manually:

```bash
cd backend/strapi
npm create strapi-app@latest . --quickstart
```

### 2. Project Structure

```
backend/strapi/
├── config/
│   ├── database.js          # Database configuration
│   ├── server.js            # Server configuration
│   ├── admin.js             # Admin panel config
│   └── plugins.js           # Plugin configuration
├── src/
│   ├── api/                 # Content types
│   │   ├── post/
│   │   ├── author/
│   │   ├── category/
│   │   ├── tag/
│   │   └── guest-submission/
│   ├── components/          # Reusable components
│   │   └── shared/
│   │       ├── seo.json
│   │       └── social-link.json
│   ├── extensions/          # Custom extensions
│   └── index.js             # Bootstrap file
├── .env                     # Environment variables
└── package.json
```

## Environment Configuration

Create `backend/strapi/.env`:

```env
HOST=0.0.0.0
PORT=1337

# App Keys (generate with: openssl rand -base64 32)
APP_KEYS=your-app-keys-here
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret

# Database (PostgreSQL recommended)
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=mokua_cms
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-password
DATABASE_SSL=false

# Or use SQLite for development
# DATABASE_CLIENT=sqlite
# DATABASE_FILENAME=.tmp/data.db

# External Auth Provider (Clerk/Supabase/Auth0)
EXTERNAL_AUTH_PROVIDER=clerk
CLERK_SECRET_KEY=your-clerk-secret-key
CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key

# Media Storage (Cloudinary)
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_KEY=your-cloudinary-key
CLOUDINARY_SECRET=your-cloudinary-secret
```

## Database Configuration

Edit `backend/strapi/config/database.js`:

```javascript
module.exports = ({ env }) => ({
  connection: {
    client: env('DATABASE_CLIENT', 'postgres'),
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'mokua_cms'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', ''),
      ssl: env.bool('DATABASE_SSL', false) && {
        rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
      },
    },
    pool: {
      min: env.int('DATABASE_POOL_MIN', 2),
      max: env.int('DATABASE_POOL_MAX', 10),
    },
  },
});
```

## Content Types

See `docs/STRAPI_CONTENT_TYPES.md` for detailed content type schemas.

### Quick Setup via Admin UI

1. Start Strapi: `pnpm --filter strapi develop`
2. Access admin: `http://localhost:1337/admin`
3. Create first admin user
4. Go to Content-Type Builder
5. Create content types:
   - Post
   - Author
   - Category
   - Tag
   - Guest Submission

## Roles & Permissions

### Role Configuration

After creating content types, configure roles in Settings > Users & Permissions > Roles:

#### Super Admin (Mokua)
- Full access to all content types
- Can manage users and roles
- Can configure settings

#### Editor
- **Posts**: find, findOne, create, update, delete
- **Authors**: find, findOne, update
- **Categories**: find, findOne, update
- **Tags**: find, findOne, update
- **Guest Submissions**: find, findOne, update (approve/reject)

#### Contributor
- **Posts**: find, findOne, create, update (own posts only, draft)
- **Authors**: find, findOne
- **Categories**: find, findOne
- **Tags**: find, findOne
- Cannot publish posts

#### Guest (Public)
- **Guest Submissions**: create
- **Posts**: find, findOne (published only)

## External Authentication Integration

### Clerk Integration

Install Clerk SDK:
```bash
cd backend/strapi
npm install @clerk/clerk-sdk-node
```

Create middleware: `backend/strapi/src/middlewares/clerk-auth.js`

```javascript
const { clerkClient } = require('@clerk/clerk-sdk-node');

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const token = ctx.request.header.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return ctx.unauthorized('No token provided');
    }

    try {
      const clerkUser = await clerkClient.verifyToken(token);
      
      // Find or create Strapi user
      let user = await strapi
        .query('plugin::users-permissions.user')
        .findOne({ where: { clerkId: clerkUser.sub } });

      if (!user) {
        user = await strapi
          .query('plugin::users-permissions.user')
          .create({
            data: {
              username: clerkUser.username || clerkUser.email,
              email: clerkUser.email,
              clerkId: clerkUser.sub,
              role: 2, // Contributor role ID
            },
          });
      }

      ctx.state.user = user;
      await next();
    } catch (error) {
      return ctx.unauthorized('Invalid token');
    }
  };
};
```

Register middleware in `backend/strapi/config/middlewares.js`:

```javascript
module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  'global::clerk-auth', // Add custom middleware
];
```

## API Configuration

### CORS Setup

Edit `backend/strapi/config/middlewares.js`:

```javascript
module.exports = [
  // ... other middlewares
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'http://localhost:5173', // Frontend dev
        'https://mokua.co.ke',    // Production
      ],
      headers: ['Content-Type', 'Authorization'],
    },
  },
];
```

### API Permissions

Configure in Admin UI:
1. Settings > Users & Permissions > Roles
2. Select role
3. Configure permissions for each content type
4. Save

## Running Strapi

```bash
# Development
pnpm --filter strapi develop

# Production
pnpm --filter strapi start
```

Access admin panel: `http://localhost:1337/admin`

## API Endpoints

### REST API

- Posts: `GET /api/posts`
- Single Post: `GET /api/posts/:id`
- Authors: `GET /api/authors`
- Categories: `GET /api/categories`
- Tags: `GET /api/tags`
- Guest Submissions: `POST /api/guest-submissions`

### GraphQL API

Enable GraphQL plugin and access: `http://localhost:1337/graphql`

## Next Steps

1. ✅ Initialize Strapi
2. ✅ Configure database
3. ✅ Create content types
4. ✅ Set up roles and permissions
5. ⏳ Integrate with frontend
6. ⏳ Configure Cloudinary for media
7. ⏳ Set up production deployment
