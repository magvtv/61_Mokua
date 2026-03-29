import { Router, type IRouter } from "express";
import { z } from "zod";

const router: IRouter = Router();

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10),
  honeypot: z.string().optional(),
});

router.post("/", async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.message });
    return;
  }

  const { honeypot } = parsed.data;
  if (honeypot && honeypot.length > 0) {
    res.json({ success: true, message: "Message sent successfully." });
    return;
  }

  res.json({ success: true, message: "Your message has been received. We will get back to you soon." });
});

export default router;
