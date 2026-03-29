import { Router, type IRouter } from "express";
import { db, newsletterSubscribersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { z } from "zod";

const router: IRouter = Router();

const subscribeSchema = z.object({
  email: z.string().email(),
  name: z.string().optional().nullable(),
});

router.post("/", async (req, res) => {
  const parsed = subscribeSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid email address", details: parsed.error.message });
    return;
  }

  const { email, name } = parsed.data;
  const existing = await db.select().from(newsletterSubscribersTable)
    .where(eq(newsletterSubscribersTable.email, email)).limit(1);

  if (existing.length > 0) {
    if (existing[0].isActive) {
      res.status(409).json({ error: "You are already subscribed to the newsletter.", details: null });
      return;
    }
    await db.update(newsletterSubscribersTable)
      .set({ isActive: true })
      .where(eq(newsletterSubscribersTable.id, existing[0].id));
    res.json({ success: true, message: "Welcome back! Your subscription has been reactivated." });
    return;
  }

  await db.insert(newsletterSubscribersTable).values({ email, name: name ?? null });
  res.json({ success: true, message: "You have been subscribed to the Mokua newsletter." });
});

export default router;
