import { Router, type IRouter } from "express";
import { db, postsTable, authorsTable, categoriesTable, tagsTable, postTagsTable } from "@workspace/db";
import { eq, desc, and, or, ilike, sql, lt, inArray } from "drizzle-orm";

const router: IRouter = Router();

function calcReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

async function formatPost(post: typeof postsTable.$inferSelect) {
  const author = await db.select().from(authorsTable).where(eq(authorsTable.id, post.authorId)).limit(1);
  const category = await db.select().from(categoriesTable).where(eq(categoriesTable.id, post.categoryId)).limit(1);
  const postTagRows = await db.select({ tagId: postTagsTable.tagId }).from(postTagsTable).where(eq(postTagsTable.postId, post.id));
  const tagIds = postTagRows.map(r => r.tagId);
  const tags = tagIds.length > 0 ? await db.select().from(tagsTable).where(inArray(tagsTable.id, tagIds)) : [];

  const postCountByAuthor = await db.select({ count: sql<number>`count(*)` }).from(postsTable).where(and(eq(postsTable.authorId, post.authorId), eq(postsTable.status, "published")));
  const postCountByCategory = await db.select({ count: sql<number>`count(*)` }).from(postsTable).where(and(eq(postsTable.categoryId, post.categoryId), eq(postsTable.status, "published")));

  const a = author[0];
  const c = category[0];

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? null,
    contentType: post.contentType,
    content: post.content,
    featuredImageUrl: post.featuredImageUrl ?? null,
    readingTime: post.readingTime,
    publishedAt: post.publishedAt?.toISOString() ?? new Date().toISOString(),
    seoTitle: post.seoTitle ?? null,
    seoDescription: post.seoDescription ?? null,
    seoOgImageUrl: post.seoOgImageUrl ?? null,
    author: a ? {
      id: a.id,
      name: a.name,
      bio: a.bio,
      avatarUrl: a.avatarUrl ?? null,
      twitterHandle: (a.socialLinks as any)?.twitter ?? null,
      instagramHandle: (a.socialLinks as any)?.instagram ?? null,
      website: (a.socialLinks as any)?.website ?? null,
      postCount: Number(postCountByAuthor[0]?.count ?? 0),
    } : null,
    category: c ? {
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description ?? null,
      postCount: Number(postCountByCategory[0]?.count ?? 0),
    } : null,
    tags: tags.map(t => ({
      id: t.id,
      name: t.name,
      slug: t.slug,
      postCount: 0,
    })),
  };
}

async function formatPostSummary(post: typeof postsTable.$inferSelect) {
  const full = await formatPost(post);
  const { content: _c, seoTitle: _st, seoDescription: _sd, seoOgImageUrl: _so, ...summary } = full;
  return summary;
}

router.get("/", async (req, res) => {
  const page = Math.max(1, parseInt(String(req.query.page ?? "1")));
  const limit = Math.min(50, Math.max(1, parseInt(String(req.query.limit ?? "12"))));
  const offset = (page - 1) * limit;
  const category = req.query.category as string | undefined;
  const contentType = req.query.contentType as string | undefined;

  const conditions = [eq(postsTable.status, "published")];
  if (contentType) {
    conditions.push(eq(postsTable.contentType, contentType as any));
  }
  if (category) {
    const cats = await db.select({ id: categoriesTable.id }).from(categoriesTable).where(eq(categoriesTable.slug, category));
    if (cats.length > 0) {
      conditions.push(eq(postsTable.categoryId, cats[0].id));
    }
  }

  const [totalResult, posts] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(postsTable).where(and(...conditions)),
    db.select().from(postsTable).where(and(...conditions)).orderBy(desc(postsTable.publishedAt)).limit(limit).offset(offset),
  ]);

  const total = Number(totalResult[0]?.count ?? 0);
  const formattedPosts = await Promise.all(posts.map(p => formatPostSummary(p)));

  res.json({
    posts: formattedPosts,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    nextCursor: null,
  });
});

router.get("/featured", async (req, res) => {
  const featured = await db.select().from(postsTable)
    .where(and(eq(postsTable.status, "published"), eq(postsTable.isFeatured, true)))
    .orderBy(desc(postsTable.publishedAt))
    .limit(1);

  if (featured.length === 0) {
    const latest = await db.select().from(postsTable)
      .where(eq(postsTable.status, "published"))
      .orderBy(desc(postsTable.publishedAt))
      .limit(1);
    if (latest.length === 0) {
      res.status(404).json({ error: "No posts found" });
      return;
    }
    const formatted = await formatPost(latest[0]);
    res.json(formatted);
    return;
  }

  const formatted = await formatPost(featured[0]);
  res.json(formatted);
});

router.get("/search", async (req, res) => {
  const q = String(req.query.q ?? "").trim();
  const page = Math.max(1, parseInt(String(req.query.page ?? "1")));
  const limit = Math.min(50, Math.max(1, parseInt(String(req.query.limit ?? "12"))));
  const offset = (page - 1) * limit;
  const contentType = req.query.contentType as string | undefined;

  if (!q) {
    res.json({ posts: [], total: 0, page, limit, totalPages: 0, nextCursor: null });
    return;
  }

  const searchCondition = or(
    ilike(postsTable.title, `%${q}%`),
    ilike(postsTable.excerpt, `%${q}%`),
    ilike(postsTable.content, `%${q}%`),
  );

  const conditions = [eq(postsTable.status, "published"), searchCondition!];
  if (contentType) {
    conditions.push(eq(postsTable.contentType, contentType as any));
  }

  const [totalResult, posts] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(postsTable).where(and(...conditions)),
    db.select().from(postsTable).where(and(...conditions)).orderBy(desc(postsTable.publishedAt)).limit(limit).offset(offset),
  ]);

  const total = Number(totalResult[0]?.count ?? 0);
  const formattedPosts = await Promise.all(posts.map(p => formatPostSummary(p)));

  res.json({
    posts: formattedPosts,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    nextCursor: null,
  });
});

router.get("/:slug/related", async (req, res) => {
  const { slug } = req.params;
  const post = await db.select().from(postsTable).where(eq(postsTable.slug, slug)).limit(1);
  if (post.length === 0) {
    res.json({ posts: [] });
    return;
  }
  const p = post[0];
  const related = await db.select().from(postsTable)
    .where(and(
      eq(postsTable.status, "published"),
      eq(postsTable.categoryId, p.categoryId),
      sql`${postsTable.id} != ${p.id}`,
    ))
    .orderBy(desc(postsTable.publishedAt))
    .limit(3);

  const formatted = await Promise.all(related.map(r => formatPostSummary(r)));
  res.json({ posts: formatted });
});

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  const posts = await db.select().from(postsTable)
    .where(and(eq(postsTable.slug, slug), eq(postsTable.status, "published")))
    .limit(1);

  if (posts.length === 0) {
    res.status(404).json({ error: "Post not found", details: null });
    return;
  }

  const formatted = await formatPost(posts[0]);
  res.json(formatted);
});

export default router;
