import { pgTable, serial, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { contentTypeEnum } from "./posts";

export const submissionStatusEnum = pgEnum("submission_status", ["submitted", "under_review", "approved", "rejected"]);

export const submissionsTable = pgTable("submissions", {
  id: serial("id").primaryKey(),
  submitterName: text("submitter_name").notNull(),
  submitterEmail: text("submitter_email").notNull(),
  title: text("title").notNull(),
  contentType: contentTypeEnum("content_type").notNull(),
  content: text("content").notNull(),
  status: submissionStatusEnum("status").notNull().default("submitted"),
  editorNotes: text("editor_notes"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  reviewedAt: timestamp("reviewed_at"),
});

export const insertSubmissionSchema = createInsertSchema(submissionsTable).omit({ id: true, submittedAt: true, reviewedAt: true, status: true, editorNotes: true });
export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;
export type Submission = typeof submissionsTable.$inferSelect;
