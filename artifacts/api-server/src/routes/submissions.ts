import { Router, type IRouter } from "express";
import { db, submissionsTable } from "@workspace/db";
import { z } from "zod";

const router: IRouter = Router();

const submitSchema = z.object({
  submitterName: z.string().min(2).max(100),
  submitterEmail: z.string().email(),
  title: z.string().min(2).max(200),
  contentType: z.enum(["story", "poem", "essay", "review"]),
  content: z.string().min(50),
  honeypot: z.string().optional(),
});

router.post("/", async (req, res) => {
  const parsed = submitSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.message });
    return;
  }

  const { submitterName, submitterEmail, title, contentType, content, honeypot } = parsed.data;

  if (honeypot && honeypot.length > 0) {
    res.status(201).json({ id: 0, message: "Submission received. We will review it shortly." });
    return;
  }

  const [submission] = await db.insert(submissionsTable).values({
    submitterName,
    submitterEmail,
    title,
    contentType,
    content,
  }).returning({ id: submissionsTable.id });

  res.status(201).json({
    id: submission.id,
    message: "Thank you for your submission! We will review it and get back to you shortly.",
  });
});

export default router;
