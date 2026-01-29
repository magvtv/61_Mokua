# Migrating from Mock Data to Strapi CMS

This guide explains how to migrate from the current mock data system to Strapi CMS.

## Current State

Currently, the frontend uses mock data from:
- `frontend/src/services/mockData.ts` - Contains mock posts, authors, categories
- `frontend/src/services/contentService.ts` - Service layer that uses mock data

## Migration Steps

### 1. Set Up Strapi Content Types

First, create the content types in Strapi (see `STRAPI_SETUP.md`):
- Post
- Author
- Category
- Tag
- Guest Submission

### 2. Import Mock Data to Strapi

Create a seed script to import existing mock data:

```typescript
// scripts/seed-strapi.ts
import axios from 'axios';
import { mockAuthors, mockCategories, mockPosts } from '../frontend/src/services/mockData';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    Authorization: `Bearer ${STRAPI_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

async function seedAuthors() {
  console.log('Seeding authors...');
  for (const author of mockAuthors) {
    try {
      await api.post('/authors', {
        data: {
          name: author.name,
          slug: author.slug,
          bio: author.bio,
          avatar: author.avatar,
          socialLinks: author.socialLinks,
        },
      });
      console.log(`✓ Created author: ${author.name}`);
    } catch (error) {
      console.error(`✗ Failed to create author: ${author.name}`, error);
    }
  }
}

async function seedCategories() {
  console.log('Seeding categories...');
  for (const category of mockCategories) {
    try {
      await api.post('/categories', {
        data: {
          name: category.name,
          slug: category.slug,
          description: category.description,
          color: category.color,
        },
      });
      console.log(`✓ Created category: ${category.name}`);
    } catch (error) {
      console.error(`✗ Failed to create category: ${category.name}`, error);
    }
  }
}

async function seedPosts() {
  console.log('Seeding posts...');
  
  // Get existing authors and categories
  const authorsRes = await api.get('/authors');
  const categoriesRes = await api.get('/categories');
  
  const authors = authorsRes.data.data;
  const categories = categoriesRes.data.data;
  
  for (const post of mockPosts) {
    try {
      // Find matching author and category
      const author = authors.find((a: any) => a.attributes.slug === post.author.slug);
      const category = categories.find((c: any) => c.attributes.slug === post.category.slug);
      
      if (!author || !category) {
        console.warn(`Skipping post "${post.title}" - author or category not found`);
        continue;
      }
      
      await api.post('/posts', {
        data: {
          title: post.title,
          slug: post.slug,
          content: post.content,
          excerpt: post.excerpt,
          author: author.id,
          category: category.id,
          tags: post.tags.map(tag => ({ name: tag })),
          publishedAt: post.publishedAt,
          readingTime: post.readingTime,
          featured: post.featured || false,
          seo: post.seo,
        },
      });
      console.log(`✓ Created post: ${post.title}`);
    } catch (error) {
      console.error(`✗ Failed to create post: ${post.title}`, error);
    }
  }
}

async function main() {
  console.log('Starting Strapi data migration...\n');
  
  await seedAuthors();
  console.log('');
  
  await seedCategories();
  console.log('');
  
  await seedPosts();
  console.log('');
  
  console.log('Migration complete!');
}

main().catch(console.error);
```

Run the seed script:
```bash
tsx scripts/seed-strapi.ts
```

### 3. Update Content Service

Replace mock data calls with Strapi API calls:

```typescript
// frontend/src/services/contentService.ts
import axios from 'axios';
import { Post, Author, Category, SearchFilters, PaginationParams } from '../types';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const contentService = {
  async getPosts(
    pagination?: PaginationParams,
    filters?: SearchFilters
  ): Promise<{ posts: Post[]; total: number }> {
    const params: any = {
      populate: ['author', 'category', 'tags', 'featuredImage'],
      sort: ['publishedAt:desc'],
    };

    if (pagination) {
      params.pagination = {
        page: pagination.page,
        pageSize: pagination.limit,
      };
    }

    if (filters?.query) {
      params.filters = {
        $or: [
          { title: { $containsi: filters.query } },
          { excerpt: { $containsi: filters.query } },
          { content: { $containsi: filters.query } },
        ],
      };
    }

    if (filters?.category) {
      params.filters = {
        ...params.filters,
        category: { slug: { $eq: filters.category } },
      };
    }

    const response = await api.get('/posts', { params });
    
    return {
      posts: response.data.data.map(transformPost),
      total: response.data.meta.pagination.total,
    };
  },

  async getPost(slug: string): Promise<Post | null> {
    const response = await api.get('/posts', {
      params: {
        filters: { slug: { $eq: slug } },
        populate: ['author', 'category', 'tags', 'featuredImage', 'seo'],
      },
    });

    if (response.data.data.length === 0) return null;
    return transformPost(response.data.data[0]);
  },

  async getFeaturedPosts(limit: number = 3): Promise<Post[]> {
    const response = await api.get('/posts', {
      params: {
        filters: { featured: { $eq: true } },
        populate: ['author', 'category', 'featuredImage'],
        pagination: { pageSize: limit },
        sort: ['publishedAt:desc'],
      },
    });

    return response.data.data.map(transformPost);
  },

  // ... other methods
};

// Transform Strapi response to match our Post interface
function transformPost(strapiPost: any): Post {
  const { id, attributes } = strapiPost;
  
  return {
    id: id.toString(),
    title: attributes.title,
    slug: attributes.slug,
    content: attributes.content,
    excerpt: attributes.excerpt,
    featuredImage: attributes.featuredImage?.data?.attributes?.url,
    author: transformAuthor(attributes.author.data),
    category: transformCategory(attributes.category.data),
    tags: attributes.tags?.data?.map((t: any) => t.attributes.name) || [],
    publishedAt: attributes.publishedAt,
    readingTime: attributes.readingTime,
    featured: attributes.featured,
    seo: attributes.seo,
  };
}

function transformAuthor(strapiAuthor: any): Author {
  const { id, attributes } = strapiAuthor;
  
  return {
    id: id.toString(),
    name: attributes.name,
    slug: attributes.slug,
    bio: attributes.bio,
    avatar: attributes.avatar?.data?.attributes?.url,
    socialLinks: attributes.socialLinks || [],
    postsCount: attributes.postsCount,
  };
}

function transformCategory(strapiCategory: any): Category {
  const { id, attributes } = strapiCategory;
  
  return {
    id: id.toString(),
    name: attributes.name,
    slug: attributes.slug,
    description: attributes.description,
    color: attributes.color,
    postsCount: attributes.postsCount,
  };
}
```

### 4. Update Frontend Components

No changes needed to components - they already use the `contentService` abstraction.

### 5. Testing

1. Start Strapi: `pnpm dev:strapi`
2. Create admin user
3. Run seed script to import data
4. Start frontend: `pnpm dev:frontend`
5. Verify all pages work with Strapi data

### 6. Deprecate Mock Data

Once everything works:
1. Keep `mockData.ts` for reference/backup
2. Add comment noting it's deprecated
3. Eventually remove when Strapi is fully stable

## Rollback Plan

If issues arise, revert `contentService.ts` to use mock data:

```typescript
// Temporarily use mock data
import { mockPosts, mockAuthors, mockCategories } from './mockData';
```

## Benefits of Migration

1. **Real CMS**: Edit content through admin UI
2. **Roles & Permissions**: Control who can create/edit content
3. **Media Management**: Upload images through Strapi
4. **API Performance**: Strapi handles pagination, filtering, search
5. **Scalability**: Database-backed instead of in-memory
6. **Guest Submissions**: Manage submissions through admin panel

## Notes

- Keep mock data file for now as fallback
- Test thoroughly before deploying to production
- Consider adding error handling for API failures
- May want to add caching layer for better performance
