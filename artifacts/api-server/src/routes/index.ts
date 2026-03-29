import { Router } from "express";
import healthRouter from "./health.js";
import postsRouter from "./posts.js";
import categoriesRouter from "./categories.js";
import authorsRouter from "./authors.js";
import tagsRouter from "./tags.js";
import submissionsRouter from "./submissions.js";
import newsletterRouter from "./newsletter.js";
import contactRouter from "./contact.js";

const router = Router();

router.use(healthRouter);
router.use("/posts", postsRouter);
router.use("/categories", categoriesRouter);
router.use("/authors", authorsRouter);
router.use("/tags", tagsRouter);
router.use("/submissions", submissionsRouter);
router.use("/newsletter", newsletterRouter);
router.use("/contact", contactRouter);

export default router;
