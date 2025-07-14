# 📚 Mokua Literary Blog - MVP

A modern, responsive literary blog platform built with React, TypeScript, and Material UI. This MVP showcases contemporary literature, poetry, and essays with a focus on exceptional reading experience and clean design.

## ✨ Features

### 🏠 Core Functionality
- **Homepage** with hero section, featured posts carousel, and recent articles
- **Post Detail Pages** with reading progress indicator and social sharing
- **Author Profiles** with biographical information and curated post collections
- **Category Pages** with filtered content and pagination
- **Advanced Search** with debounced input and category filtering
- **Contact Form** with validation and success states
- **Guest Submission Form** for writers to submit their work

### 🎨 Design & UX
- **Literary-inspired design** with elegant typography (Playfair Display + Inter)
- **Responsive layout** optimized for mobile, tablet, and desktop
- **Dark/Light theme** switching with smooth transitions
- **Reading-focused typography** with optimal line spacing and contrast
- **Smooth animations** using Framer Motion
- **Accessibility compliant** (WCAG AA standards)

### 🛠️ Technical Features
- **Modern React 18** with TypeScript and Vite
- **Material UI v5** with custom theme and components
- **State management** with Zustand for global state
- **Data fetching** with TanStack Query and caching
- **Form handling** with React Hook Form and Zod validation
- **SEO optimized** with dynamic meta tags and structured data
- **Performance optimized** with lazy loading and code splitting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mokua-literary-blog
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production
```bash
pnpm build
pnpm preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Generic components (LoadingSpinner, SEOHead, etc.)
│   ├── home/           # Homepage specific components
│   ├── layout/         # Layout components (Header, Footer, AppLayout)
│   └── post/           # Post-related components
├── pages/              # Page components and routing
├── services/           # API integration layer with mock data
├── stores/             # Zustand state management
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── hooks/              # Custom React hooks
└── theme/              # Material UI theme configuration
```

## 🎨 Design System

### Color Palette
- **Primary**: Deep Teal (#2E7D8A) - Professional, literary feel
- **Secondary**: Warm Amber (#FF8F00) - Highlights and accents
- **Tertiary**: Soft Coral (#FF6B6B) - Call-to-action elements
- **Background**: Cream (#FFF8E1) / Dark Charcoal (#1A202C)

### Typography
- **Headings**: Playfair Display (serif, elegant)
- **Body Text**: Inter (sans-serif, highly readable)
- **Reading optimized** with 1.6-1.8 line height

### Components
- **8px spacing system** for consistent layouts
- **Card-based design** for content organization
- **Subtle shadows and borders** for depth
- **Smooth transitions** for interactive elements

## 🔌 Backend Integration Ready

The frontend is architected for seamless backend integration:

### Service Layer
- **Abstract API calls** in `/src/services/`
- **Mock data** for development in `mockData.ts`
- **TypeScript interfaces** for all data structures
- **Error handling patterns** established

### Integration Points
- **Content Management**: Posts, authors, categories
- **Authentication**: User login/registration flow structure
- **Forms**: Contact and submission handling
- **Media**: Image upload and management ready
- **Email**: Newsletter and notification services

### Environment Variables
```env
VITE_API_URL=http://localhost:1337/api
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_SITE_URL=http://localhost:3000
```

## 📱 Responsive Design

- **Mobile-first approach** with breakpoints at 600px, 900px, 1200px
- **Touch-optimized** navigation and interactions
- **Flexible grid system** using Material UI's responsive utilities
- **Optimized typography** scaling across devices

## 🔍 SEO & Performance

### SEO Features
- **Dynamic meta tags** with react-helmet-async
- **Open Graph tags** for social media sharing
- **Structured data** for search engines
- **Canonical URLs** and proper heading hierarchy

### Performance Optimizations
- **Code splitting** with React.lazy()
- **Image optimization** with proper sizing and lazy loading
- **Bundle optimization** with Vite's tree shaking
- **Caching strategy** with TanStack Query

## 🧪 Development Tools

- **ESLint + Prettier** for code quality
- **TypeScript** for type safety
- **Vite** for fast development and building
- **React DevTools** compatible
- **Material UI DevTools** for theme debugging

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Build Commands
```bash
# Build
pnpm build

# Preview build locally
pnpm preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Material UI** for the excellent component library
- **Framer Motion** for smooth animations
- **TanStack Query** for powerful data fetching
- **Pexels** for high-quality stock images
- **Google Fonts** for beautiful typography

---

**Built with ❤️ for the literary community**