# Migration Guide: MongoDB to Supabase PostgreSQL

## Pre-Migration Checklist

- [ ] Create Supabase account and project
- [ ] Backup existing MongoDB data
- [ ] Review schema design in `SUPABASE_ARCHITECTURE.md`
- [ ] Install Supabase dependencies
- [ ] Configure environment variables

## Step 1: Supabase Project Setup

### 1.1 Create Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization
4. Set project name: `rise-above-blog`
5. Set database password (save securely!)
6. Choose region: `Southeast Asia (Singapore)` or closest to Kenya
7. Click "Create new project"

### 1.2 Get Credentials
Navigate to Project Settings > API:
- Project URL: `https://xxxxx.supabase.co`
- Anon/Public Key: `eyJhbGciOiJ...`
- Service Role Key: `eyJhbGciOiJ...` (keep secret!)

### 1.3 Add to Environment Variables
```bash
# .env.local
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# For server-side operations only
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## Step 2: Install Dependencies

```bash
# Remove MongoDB dependencies
npm uninstall mongoose mongodb

# Install Supabase client
npm install @supabase/supabase-js

# Install date utilities if needed
npm install date-fns
```

## Step 3: Create Database Schema

### 3.1 Run SQL Migrations
1. Open Supabase Dashboard > SQL Editor
2. Create new query
3. Copy schema from `SUPABASE_ARCHITECTURE.md`
4. Run each CREATE TABLE statement
5. Run all CREATE INDEX statements
6. Create database functions

### 3.2 Enable Row Level Security
```sql
-- Enable RLS on all tables
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Apply policies from SUPABASE_ARCHITECTURE.md
```

## Step 4: Seed Initial Data

### 4.1 Create Seed Script
```typescript
// scripts/seed-supabase.ts
import { createClient } from '@supabase/supabase-js';
import { mockAuthors, mockCategories, mockPosts } from '../src/services/mockData';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  console.log('🌱 Seeding database...');

  // 1. Insert authors
  const { data: authors, error: authorsError } = await supabase
    .from('authors')
    .insert(mockAuthors.map(a => ({
      name: a.name,
      slug: a.slug,
      bio: a.bio,
      avatar_url: a.avatar,
      social_links: a.socialLinks
    })))
    .select();

  if (authorsError) throw authorsError;
  console.log(`✅ Inserted ${authors.length} authors`);

  // 2. Insert categories
  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .insert(mockCategories.map((c, i) => ({
      name: c.name,
      slug: c.slug,
      description: c.description,
      color: c.color,
      display_order: i
    })))
    .select();

  if (categoriesError) throw categoriesError;
  console.log(`✅ Inserted ${categories.length} categories`);

  // 3. Insert posts
  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .insert(mockPosts.map(p => ({
      title: p.title,
      slug: p.slug,
      content: p.content,
      excerpt: p.excerpt,
      featured_image_url: p.featuredImage,
      author_id: authors.find(a => a.slug === p.author.slug)?.id,
      category_id: categories.find(c => c.slug === p.category.slug)?.id,
      status: 'published',
      published_at: p.publishedAt,
      reading_time: p.readingTime,
      is_featured: p.featured || false,
      meta_title: p.seo?.metaTitle,
      meta_description: p.seo?.metaDescription,
      meta_keywords: p.seo?.keywords
    })))
    .select();

  if (postsError) throw postsError;
  console.log(`✅ Inserted ${posts.length} posts`);

  // 4. Insert tags and post-tags relationships
  const allTags = [...new Set(mockPosts.flatMap(p => p.tags))];
  
  const { data: tags, error: tagsError } = await supabase
    .from('tags')
    .insert(allTags.map(name => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-')
    })))
    .select();

  if (tagsError) throw tagsError;
  console.log(`✅ Inserted ${tags.length} tags`);

  // Create post-tag relationships
  const postTagRelations = mockPosts.flatMap(post => {
    const dbPost = posts.find(p => p.slug === post.slug);
    return post.tags.map(tagName => ({
      post_id: dbPost?.id,
      tag_id: tags.find(t => t.name === tagName)?.id
    }));
  }).filter(r => r.post_id && r.tag_id);

  const { error: postTagsError } = await supabase
    .from('post_tags')
    .insert(postTagRelations);

  if (postTagsError) throw postTagsError;
  console.log(`✅ Created ${postTagRelations.length} post-tag relations`);

  console.log('🎉 Database seeded successfully!');
}

seed().catch(console.error);
```

### 4.2 Run Seed Script
```bash
# Add to package.json scripts
"seed": "tsx scripts/seed-supabase.ts"

# Run
npm run seed
```

## Step 5: Update Content Service

### 5.1 Create Supabase Client
```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions
export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string;
          // ... other fields
        };
        Insert: {
          // ... insert types
        };
        Update: {
          // ... update types
        };
      };
      // ... other tables
    };
  };
};
```

### 5.2 Migrate Content Service
Replace `src/services/contentService.ts` with Supabase queries (see SUPABASE_ARCHITECTURE.md for examples).

## Step 6: Testing

### 6.1 Test Queries
```typescript
// Test in browser console or create test file
import { supabase } from './lib/supabase';

// Test getting posts
const { data: posts, error } = await supabase
  .from('posts')
  .select('*, author:authors(*)')
  .limit(5);

console.log(posts);
```

### 6.2 Manual Testing Checklist
- [ ] Homepage loads posts correctly
- [ ] Category filtering works
- [ ] Single post page displays
- [ ] Author pages show author posts
- [ ] Search functionality
- [ ] Newsletter signup
- [ ] Calendar shows correct post dates

## Step 7: Clean Up

### 7.1 Archive Old Backend
```bash
# Move old server folder
mkdir -p archive
mv server archive/server-mongodb-backup
mv api archive/api-mongodb-backup
```

### 7.2 Update Dependencies
```bash
# Remove unused packages
npm uninstall mongoose body-parser cors express dotenv

# Clean install
rm -rf node_modules package-lock.json
npm install
```

### 7.3 Update Documentation
- Update README.md with Supabase setup instructions
- Document environment variables
- Update deployment guides

## Step 8: Deployment

### 8.1 Vercel Environment Variables
In Vercel dashboard, add:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### 8.2 Deploy
```bash
git add .
git commit -m "feat(backend): migrate to Supabase PostgreSQL"
git push origin main
```

## Rollback Plan

If issues arise:
1. Revert git commit: `git revert HEAD`
2. Restore `/server` from archive
3. Switch environment variables back
4. Redeploy

## Post-Migration Tasks

- [ ] Monitor Supabase dashboard for errors
- [ ] Check performance metrics
- [ ] Set up database backups
- [ ] Configure alerts
- [ ] Update API documentation
- [ ] Train team on Supabase dashboard

## Common Issues & Solutions

### Issue: RLS blocking queries
**Solution:** Ensure policies allow public read access for published posts

### Issue: Slow queries
**Solution:** Check indexes are created, use `explain analyze` in SQL editor

### Issue: CORS errors
**Solution:** Supabase handles CORS automatically, check environment variables

### Issue: Image uploads not working
**Solution:** Set up Supabase Storage buckets and update image URLs

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
