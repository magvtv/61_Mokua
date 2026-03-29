import { Router, type IRouter } from "express";
import { db, categoriesTable, postsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (_req, res) => {
  const categories = await db.select().from(categoriesTable).orderBy(categoriesTable.name);
  const withCounts = await Promise.all(categories.map(async (c) => {
    const count = await db.select({ count: sql<number>`count(*)` }).from(postsTable)
      .where(eq(postsTable.categoryId, c.id));
    return {
      ...c,
      description: c.description ?? null,
      postCount: Number(count[0]?.count ?? 0),
    };
  }));
  res.json({ categories: withCounts });
});

export default router;
