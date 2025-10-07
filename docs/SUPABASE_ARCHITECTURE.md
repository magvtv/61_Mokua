# Supabase Backend Architecture for Rise Above Blog

## Overview
This document outlines the migration from MongoDB to Supabase (PostgreSQL) for the Rise Above literary blog platform.

## Database Schema Design

### 1. Authors Table
```sql
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  posts_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- Social links as JSONB for flexibility
ALTER TABLE authors ADD COLUMN social_links JSONB DEFAULT '[]';
-- Example: [{"platform": "twitter", "url": "..."}]

CREATE INDEX idx_authors_slug ON authors(slug);
CREATE INDEX idx_authors_email ON authors(email);
```

### 2. Categories Table
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR(7), -- HEX color
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  posts_count INT DEFAULT 0,
  display_order INT DEFAULT 0
);

CREATE INDEX idx_categories_slug ON categories(slug);
```

### 3. Tags Table
```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  posts_count INT DEFAULT 0
);

CREATE INDEX idx_tags_slug ON tags(slug);
```

### 4. Posts Table
```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'draft', -- draft, published, scheduled, archived
  published_at TIMESTAMPTZ,
  scheduled_for TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  reading_time INT, -- minutes
  views_count INT DEFAULT 0,
  likes_count INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  -- SEO fields
  meta_title VARCHAR(255),
  meta_description TEXT,
  meta_keywords TEXT[]
);

CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_category ON posts(category_id);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX idx_posts_featured ON posts(is_featured) WHERE is_featured = true;
```

### 5. Post-Tags Junction Table
```sql
CREATE TABLE post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

CREATE INDEX idx_post_tags_post ON post_tags(post_id);
CREATE INDEX idx_post_tags_tag ON post_tags(tag_id);
```

### 6. Subscribers Table
```sql
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  source VARCHAR(50), -- footer, coming-soon, popup
  is_active BOOLEAN DEFAULT true,
  confirmed_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

CREATE INDEX idx_subscribers_email ON subscribers(email);
CREATE INDEX idx_subscribers_active ON subscribers(is_active) WHERE is_active = true;
```

### 7. Comments Table (Future)
```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  author_name VARCHAR(255) NOT NULL,
  author_email VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending', -- pending, approved, spam, deleted
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_comments_post ON comments(post_id);
CREATE INDEX idx_comments_status ON comments(status);
```

### 8. Post Views/Analytics Table
```sql
CREATE TABLE post_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ DEFAULT NOW(),
  user_ip INET,
  user_agent TEXT,
  referrer TEXT
);

CREATE INDEX idx_post_views_post ON post_views(post_id);
CREATE INDEX idx_post_views_date ON post_views(viewed_at DESC);
```

## Storage Estimates

### Content Storage Calculation

**Assumptions:**
- Average post: 3,000 words × 6 bytes/char = ~18 KB
- Featured image: 200 KB (optimized)
- Author avatar: 50 KB
- Total per post: ~268 KB

**Projected Needs (Year 1):**
- 100 posts: 26.8 MB
- 20 authors: 1 MB
- 10 categories: < 1 KB
- 200 tags: < 50 KB
- 5,000 subscribers: 1 MB
- Images (100 posts): 20 MB
- **Total: ~50 MB**

**Projected Needs (3 Years):**
- 500 posts: 134 MB
- 50 authors: 2.5 MB
- 1,000 tags: 250 KB
- 20,000 subscribers: 4 MB
- Images: 100 MB
- **Total: ~250 MB**

### Supabase Plan Recommendation

**Free Tier Limits:**
- 500 MB database space ✅
- 1 GB file storage ✅
- 50,000 monthly active users ✅
- 2 GB bandwidth ✅
- Unlimited API requests ✅

**Recommendation:** Start with **Free Tier**
- Easily handles 3 years of projected content
- Upgrade to Pro ($25/mo) only when:
  - Database > 500 MB (5+ years out)
  - Need custom domain auth
  - Need advanced features

## Row-Level Security (RLS) Policies

### Posts Table Policies
```sql
-- Public read access for published posts
CREATE POLICY "Public posts are viewable by everyone"
ON posts FOR SELECT
USING (status = 'published' AND published_at <= NOW());

-- Authors can manage their own posts
CREATE POLICY "Authors can insert their own posts"
ON posts FOR INSERT
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own posts"
ON posts FOR UPDATE
USING (auth.uid() = author_id);
```

### Subscribers Table Policies
```sql
-- Only service role can read subscribers
CREATE POLICY "Service role can manage subscribers"
ON subscribers FOR ALL
USING (auth.role() = 'service_role');
```

## API Structure

### Supabase Client Integration

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Content Service Migration

```typescript
// src/services/contentService.ts
import { supabase } from '../lib/supabase';

export const contentService = {
  // Get published posts with pagination
  async getPosts({ page = 1, limit = 10 }, filters = {}) {
    let query = supabase
      .from('posts')
      .select(`
        *,
        author:authors(*),
        category:categories(*),
        tags:post_tags(tag:tags(*))
      `, { count: 'exact' })
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (filters.category) {
      query = query.eq('category.slug', filters.category);
    }

    const { data, error, count } = await query;
    
    return {
      posts: data || [],
      total: count || 0,
      page,
      limit
    };
  },

  // Get single post by slug
  async getPostBySlug(slug: string) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:authors(*),
        category:categories(*),
        tags:post_tags(tag:tags(*))
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    // Increment view count
    if (data) {
      await supabase.rpc('increment_post_views', { post_id: data.id });
    }

    return data;
  },

  // Subscribe to newsletter
  async subscribe(email: string, name: string, source: string) {
    const { data, error } = await supabase
      .from('subscribers')
      .insert({ email, name, source })
      .select()
      .single();

    return { data, error };
  }
};
```

## Migration Steps

1. **Setup Supabase Project**
   - Create project at supabase.com
   - Note project URL and anon key
   - Enable email auth (for future admin)

2. **Run SQL Migrations**
   - Execute schema SQL in Supabase SQL editor
   - Set up RLS policies
   - Create database functions (view counter, etc.)

3. **Migrate Data**
   - Export existing MongoDB data
   - Transform to PostgreSQL format
   - Bulk insert via Supabase client

4. **Update Frontend**
   - Install `@supabase/supabase-js`
   - Update contentService.ts
   - Update environment variables
   - Test all queries

5. **Remove Old Backend**
   - Archive `/server` folder
   - Remove MongoDB dependencies
   - Update deployment config

## Performance Optimizations

### Database Functions
```sql
-- Increment view count efficiently
CREATE OR REPLACE FUNCTION increment_post_views(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts SET views_count = views_count + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Update posts_count for authors
CREATE OR REPLACE FUNCTION update_author_posts_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE authors SET posts_count = posts_count + 1 WHERE id = NEW.author_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE authors SET posts_count = posts_count - 1 WHERE id = OLD.author_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER author_posts_count_trigger
AFTER INSERT OR DELETE ON posts
FOR EACH ROW EXECUTE FUNCTION update_author_posts_count();
```

### Indexes for Common Queries
- Full-text search on posts (title, content)
- Compound index on (status, published_at)
- GIN index on meta_keywords array

## Future Enhancements

1. **File Storage**
   - Use Supabase Storage for images
   - CDN integration for performance
   - Image optimization pipeline

2. **Real-time Features**
   - Live comment updates
   - View count streaming
   - Admin dashboard real-time stats

3. **Authentication**
   - Author/admin login via Supabase Auth
   - Protected admin routes
   - Role-based access control

4. **Advanced Features**
   - Full-text search with PostgreSQL
   - Related posts via embedding similarity
   - Newsletter automation with Supabase Edge Functions

## Cost Projection

| Tier | Monthly Cost | Includes | When to Upgrade |
|------|-------------|----------|-----------------|
| Free | $0 | 500MB DB, 1GB storage | Start here |
| Pro | $25 | 8GB DB, 100GB storage | After 5+ years or 10K+ users |
| Team | $599 | 50GB DB, 500GB storage | Enterprise scale |

**Recommendation:** Free tier is sufficient for 3-5 years of growth.
