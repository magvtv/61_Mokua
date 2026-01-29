import { Post, Author, Category, SearchFilters, PaginationParams } from '../types';
import { mockPosts, mockAuthors, mockCategories } from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const contentService = {
  async getPosts(pagination?: PaginationParams, filters?: SearchFilters): Promise<{ posts: Post[], total: number }> {
    await delay(300);
    
    let filteredPosts = [...mockPosts];
    
    if (filters?.query) {
      const query = filters.query.toLowerCase();
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    if (filters?.category) {
      filteredPosts = filteredPosts.filter(post => 
        post.category.slug === filters.category
      );
    }
    
    if (filters?.author) {
      filteredPosts = filteredPosts.filter(post => 
        post.author.slug === filters.author
      );
    }
    
    if (filters?.tags?.length) {
      filteredPosts = filteredPosts.filter(post =>
        filters.tags!.some(tag => post.tags.includes(tag))
      );
    }
    
    // Sort by publish date (newest first)
    filteredPosts.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    
    const total = filteredPosts.length;
    
    if (pagination) {
      const start = (pagination.page - 1) * pagination.limit;
      const end = start + pagination.limit;
      filteredPosts = filteredPosts.slice(start, end);
    }
    
    return { posts: filteredPosts, total };
  },

  async getPost(slug: string): Promise<Post | null> {
    await delay(200);
    return mockPosts.find(post => post.slug === slug) || null;
  },

  async getFeaturedPosts(limit: number = 3): Promise<Post[]> {
    await delay(250);
    return mockPosts
      .filter(post => post.featured)
      .slice(0, limit);
  },

  async getAuthors(): Promise<Author[]> {
    await delay(200);
    return mockAuthors;
  },

  async getAuthor(slug: string): Promise<Author | null> {
    await delay(200);
    return mockAuthors.find(author => author.slug === slug) || null;
  },

  async getPostsByAuthor(authorSlug: string, limit?: number): Promise<Post[]> {
    await delay(250);
    const posts = mockPosts.filter(post => post.author.slug === authorSlug);
    return limit ? posts.slice(0, limit) : posts;
  },

  async getCategories(): Promise<Category[]> {
    await delay(150);
    return mockCategories;
  },

  async getCategory(slug: string): Promise<Category | null> {
    await delay(200);
    return mockCategories.find(category => category.slug === slug) || null;
  },

  async getPostsByCategory(categorySlug: string, limit?: number): Promise<Post[]> {
    await delay(250);
    const posts = mockPosts.filter(post => post.category.slug === categorySlug);
    return limit ? posts.slice(0, limit) : posts;
  },

  async getRelatedPosts(postId: string, limit: number = 3): Promise<Post[]> {
    await delay(200);
    const currentPost = mockPosts.find(post => post.id === postId);
    if (!currentPost) return [];
    
    // Find posts with similar tags or same category
    const relatedPosts = mockPosts
      .filter(post => post.id !== postId)
      .map(post => ({
        post,
        score: (
          (post.category.id === currentPost.category.id ? 2 : 0) +
          (post.tags.filter(tag => currentPost.tags.includes(tag)).length)
        )
      }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.post)
      .slice(0, limit);
    
    return relatedPosts;
  },

  async searchPosts(query: string): Promise<Post[]> {
    await delay(300);
    const searchQuery = query.toLowerCase();
    return mockPosts.filter(post =>
      post.title.toLowerCase().includes(searchQuery) ||
      post.excerpt.toLowerCase().includes(searchQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery)) ||
      post.author.name.toLowerCase().includes(searchQuery)
    );
  }
};