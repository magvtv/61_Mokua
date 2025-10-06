export interface Post {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featuredImage?: string;
    author: Author;
    category: Category;
    tags: string[];
    publishedAt: string;
    readingTime: number;
    featured?: boolean;
    seo?: SEOData;
  }
  
  export interface Author {
    id: string;
    name: string;
    slug: string;
    bio: string;
    avatar?: string;
    socialLinks: SocialLink[];
    postsCount?: number;
  }
  
  export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    color: string;
    postsCount?: number;
  }
  
  export interface SocialLink {
    platform: 'twitter' | 'instagram' | 'linkedin' | 'website';
    url: string;
  }
  
  export interface SEOData {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
  }
  
  export interface NewsletterSubscription {
    email: string;
  }
  
  export interface ContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
  }
  
  export interface GuestSubmission {
    authorName: string;
    email: string;
    title: string;
    content: string;
    category: string;
    bio: string;
  }
  
  export interface SearchFilters {
    query?: string;
    category?: string;
    author?: string;
    tags?: string[];
    dateRange?: {
      start: Date;
      end: Date;
    };
  }
  
  export interface PaginationParams {
    page: number;
    limit: number;
    total?: number;
  }