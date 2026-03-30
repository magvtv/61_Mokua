# 61_Mokua

## Overview

pnpm workspace monorepo using TypeScript. This is the **Mokua Literary Platform** — a full-stack literary publishing PWA for Nicolas Mokua, featuring short stories, poetry, essays, and reviews.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (ESM bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express 5 API server (all routes)
│   └── web/                # React + Vite public literary platform (PWA)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml     # pnpm workspace
├── tsconfig.base.json      # Shared TS options
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## Typography System

- **Display font**: Playfair Display (hero titles, headings, pull quotes)
- **Body font**: Source Serif 4 (long-form prose reading)
- **UI font**: DM Sans (nav, labels, buttons)
- **Mono font**: JetBrains Mono (code in essays)
- **Prose width**: 68ch max, 1.8 line-height, 1.125rem base

## Database Schema (lib/db/src/schema/)

- `authors` — author profiles with social links
- `categories` — post categories (Stories, Poetry, Essays, Reviews)
- `tags` — post tags with many-to-many relationship
- `posts` — literary content with content type enum, status, SEO fields, and full-text search
- `postTags` — junction table for posts ↔ tags
- `submissions` — guest submission inbox with lifecycle status
- `newsletterSubscribers` — email newsletter subscribers

## API Routes (artifacts/api-server/src/routes/)

- `GET /api/posts` — paginated posts with category/type filters
- `GET /api/posts/featured` — featured/hero post
- `GET /api/posts/search` — full-text search (ilike)
- `GET /api/posts/:slug` — post detail
- `GET /api/posts/:slug/related` — related posts (same category)
- `GET /api/categories` — all categories with post counts
- `GET /api/authors` — all authors
- `GET /api/authors/:id` — author detail
- `GET /api/authors/:id/posts` — paginated author posts
- `GET /api/tags` — all tags
- `POST /api/submissions` — guest submission with honeypot spam protection
- `POST /api/newsletter` — newsletter subscription
- `POST /api/contact` — contact form (honeypot protected)

## Frontend Pages (artifacts/web/src/pages/)

- `/` — Homepage: featured hero, latest posts grid, category filter strip, newsletter signup
- `/posts/:slug` — Post/article detail: prose or poetry layout, reading progress, reading mode toggle
- `/category/:slug` — Category filtered view
- `/authors/:id` — Author profile with post grid
- `/search` — Full-text search with debounce
- `/submit` — Guest submission form
- `/about` — About page
- `/contact` — Contact form

## Features

- Dark/light mode with localStorage persistence
- Reading mode (hides nav/footer, sepia or dark background, larger text)
- Poetry-specific layout (pre-wrap, no progress bar)
- Social sharing via Web Share API with clipboard fallback
- Related posts (same category)
- Honeypot spam protection on all public forms

## Key Commands

- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm --filter @workspace/web run dev` — run the web frontend
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API client from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes
- `pnpm run typecheck` — full type check

## Seed Data

Seeded with 6 rich literary posts (2 stories, 2 poems, 1 essay, 1 review), 3 authors, 4 categories, 10 tags, with proper relations.
