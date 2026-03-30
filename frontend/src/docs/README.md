# 📚 Mokua Literary Blog Web App

A modern literary publishing platform built as a **Progressive Web Application (PWA)** for [mokua.co.ke](https://mokua.co.ke). Inspired by the storytelling style of [magunga.com](https://www.magunga.com), this project serves as a digital stage for stories, poems, essays, reviews, and guest submissions.

---

## ✨ Vision

To build a clean, performance-first, mobile-optimized literary hub for Mokua—a storyteller, thinker, and reviewer. This PWA will provide a seamless reading and publishing experience for both writers and literary enthusiasts.

---

## 🔧 Tech Stack

### 📦 Frontend
- **React** (Vite)
- **pnpm** (monorepo support)
- **Material UI** + MUI Icons
- **React Router DOM**
- **React Helmet Async** (SEO)
- **Tailwind CSS** *(optional, for typography and whitespace control)*

### 🗂️ Backend CMS
- **Strapi** *(or Sanity.io as alternative)*
- **PostgreSQL** *(via Supabase or hosted on Railway)*
- **Cloudinary** (image uploads)
- **REST or GraphQL API**

### 🌐 Infrastructure & Services
- **Vercel** (frontend hosting)
- **Railway/Render** (backend)
- **Cloudflare** (SSL, DNS, CDN)
- **Mailchimp or Resend API** (newsletter & email alerts)
- **Google Analytics + Search Console**
- **Disqus** or **Firebase** (comments, optional)
- **Stripe** (premium content monetization, future)

---

## 🏗️ High-Level Architecture

```
Client (React + Vite + MUI Icons)
│
├── API Gateway (REST or GraphQL)
│ └── Handles authentication, SEO tags, routing
│
├── Backend CMS (Strapi or Sanity.io)
│ ├── Content Types: Posts, Categories, Tags, Authors, Submissions
│ ├── Publishing: Drafts, Scheduling, Publishing
│ └── SEO + Metadata + Sitemap Management
│
├── Database: PostgreSQL
├── Media CDN: Cloudinary
├── Email Service: Mailchimp / Resend
├── Deployment: Vercel + Railway
└── Optional:
├── Comments System: Disqus / Firebase
└── Auth: Clerk / Supabase / Auth0
```


---

## ✅ Core Features (MVP)

### Admin & CMS
- CRUD operations for Posts, Categories, Tags, Authors
- Role-based permissions (Admin, Contributor)
- Guest submission moderation flow
- Hero images + responsive image handling
- SEO (Meta tags, Open Graph, Sitemap.xml)
- RSS Feed generation

### Frontend User Experience
- Homepage: Featured + recent content
- Category Pages: Stories, Poetry, Reviews, Essays, etc.
- Single Post: Hero image, reading time, print-optimized
- Author Profiles
- Search Functionality
- Reading Time Estimator
- Contact + About Pages
- Responsive Design (mobile-first)
- Dark/Light Mode toggle (optional)

---

## 🚀 Planned Enhancements (Phase 2+)

- 📅 Editorial calendar integration
- 📬 Email newsletter signup (Mailchimp/ConvertKit)
- 🗣️ Reader login and comment system
- 🔐 Premium content access via Stripe
- 📖 Bookstore with affiliate links (Amazon, KenyaLit)
- 📊 Analytics & SEO Performance (Web Vitals, GA4)
- 🌍 Internationalization (English/Swahili UI)
- 📱 Save-to-home Progressive Web App features
- 🧾 Print-friendly styles for stories & poems
- 🧠 “Reading Mode” distraction-free toggle

---

## 📂 Folder Structure (pnpm Monorepo)

```
mokua-blog/
├── apps/
│ ├── frontend/ # React + Vite frontend
│ └── backend/ # Strapi CMS instance
├── packages/
│ └── shared/ # Shared types, utils
├── .github/
├── README.md
├── pnpm-workspace.yaml
└── turbo.json # Optional: turbo for caching/CI speed
```
---

## 🧰 Developer Setup

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/mokua-blog.git
cd mokua-blog
pnpm install
```

# Frontend
cd apps/frontend
pnpm dev

# Backend (Strapi)
cd apps/backend
pnpm develop

