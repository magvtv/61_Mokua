import { Router, type IRouter } from "express";
import { db, authorsTable, postsTable, categoriesTable, tagsTable, postTagsTable } from "@workspace/db";
import { eq, sql, desc, and, inArray } from "drizzle-orm";

const router: IRouter = Router();

async function formatPostSummary(post: typeof postsTable.$inferSelect) {
  const author = await db.select().from(authorsTable).where(eq(authorsTable.id, post.authorId)).limit(1);
  const category = await db.select().from(categoriesTable).where(eq(categoriesTable.id, post.categoryId)).limit(1);
  const postTagRows = await db.select({ tagId: postTagsTable.tagId }).from(postTagsTable).where(eq(postTagsTable.postId, post.id));
  const tagIds = postTagRows.map(r => r.tagId);
  const tags = tagIds.length > 0 ? await db.select().from(tagsTable).where(inArray(tagsTable.id, tagIds)) : [];

  const a = author[0];
  const c = category[0];

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? null,
    contentType: post.contentType,
    featuredImageUrl: post.featuredImageUrl ?? null,
    readingTime: post.readingTime,
    publishedAt: post.publishedAt?.toISOString() ?? new Date().toISOString(),
    author: a ? {
      id: a.id,
      name: a.name,
      bio: a.bio,
      avatarUrl: a.avatarUrl ?? null,
      twitterHandle: (a.socialLinks as any)?.twitter ?? null,
      instagramHandle: (a.socialLinks as any)?.instagram ?? null,
      website: (a.socialLinks as any)?.website ?? null,
      postCount: 0,
    } : null,
    category: c ? {
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description ?? null,
      postCount: 0,
    } : null,
    tags: tags.map(t => ({ id: t.id, name: t.name, slug: t.slug, postCount: 0 })),
  };
}

async function formatAuthor(a: typeof authorsTable.$inferSelect, postCount: number) {
  return {
    id: a.id,
    name: a.name,
    bio: a.bio,
    avatarUrl: a.avatarUrl ?? null,
    twitterHandle: (a.socialLinks as any)?.twitter ?? null,
    instagramHandle: (a.socialLinks as any)?.instagram ?? null,
    website: (a.socialLinks as any)?.website ?? null,
    postCount,
  };
}

router.get("/", async (_req, res) => {
  const authors = await db.select().from(authorsTable).orderBy(authorsTable.name);
  const withCounts = await Promise.all(authors.map(async (a) => {
    const count = await db.select({ count: sql<number>`count(*)` }).from(postsTable)
      .where(and(eq(postsTable.authorId, a.id), eq(postsTable.status, "published")));
    return formatAuthor(a, Number(count[0]?.count ?? 0));
  }));
  res.json({ authors: await Promise.all(withCounts) });
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(404).json({ error: "Author not found", details: null });
    return;
  }
  const authors = await db.select().from(authorsTable).where(eq(authorsTable.id, id)).limit(1);
  if (authors.length === 0) {
    res.status(404).json({ error: "Author not found", details: null });
    return;
  }
  const count = await db.select({ count: sql<number>`count(*)` }).from(postsTable)
    .where(and(eq(postsTable.authorId, id), eq(postsTable.status, "published")));
  res.json(await formatAuthor(authors[0], Number(count[0]?.count ?? 0)));
});

router.get("/:id/posts", async (req, res) => {
  const id = parseInt(req.params.id);
  const page = Math.max(1, parseInt(String(req.query.page ?? "1")));
  const limit = Math.min(50, Math.max(1, parseInt(String(req.query.limit ?? "12"))));
  const offset = (page - 1) * limit;

  if (isNaN(id)) {
    res.status(404).json({ error: "Author not found", details: null });
    return;
  }

  const [totalResult, posts] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(postsTable)
      .where(and(eq(postsTable.authorId, id), eq(postsTable.status, "published"))),
    db.select().from(postsTable)
      .where(and(eq(postsTable.authorId, id), eq(postsTable.status, "published")))
      .orderBy(desc(postsTable.publishedAt))
      .limit(limit).offset(offset),
  ]);

  const total = Number(totalResult[0]?.count ?? 0);
  const formatted = await Promise.all(posts.map(p => formatPostSummary(p)));

  res.json({
    posts: formatted,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    nextCursor: null,
  });
});

export default router;
