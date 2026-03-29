import { Router, type IRouter } from "express";
import { db, tagsTable, postTagsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (_req, res) => {
  const tags = await db.select().from(tagsTable).orderBy(tagsTable.name);
  const withCounts = await Promise.all(tags.map(async (t) => {
    const count = await db.select({ count: sql<number>`count(*)` }).from(postTagsTable)
      .where(eq(postTagsTable.tagId, t.id));
    return { ...t, postCount: Number(count[0]?.count ?? 0) };
  }));
  res.json({ tags: withCounts });
});

export default router;
