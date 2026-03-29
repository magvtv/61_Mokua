import { pgTable, serial, text, integer, boolean, timestamp, pgEnum, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { authorsTable } from "./authors";
import { categoriesTable } from "./categories";

export const contentTypeEnum = pgEnum("content_type", ["story", "poem", "essay", "review"]);
export const postStatusEnum = pgEnum("post_status", ["draft", "scheduled", "published"]);

export const postsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  contentType: contentTypeEnum("content_type").notNull(),
  content: text("content").notNull().default(""),
  excerpt: text("excerpt"),
  featuredImageUrl: text("featured_image_url"),
  authorId: integer("author_id").references(() => authorsTable.id).notNull(),
  categoryId: integer("category_id").references(() => categoriesTable.id).notNull(),
  readingTime: integer("reading_time").notNull().default(1),
  status: postStatusEnum("status").notNull().default("draft"),
  isFeatured: boolean("is_featured").notNull().default(false),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  seoOgImageUrl: text("seo_og_image_url"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("posts_status_published_at_idx").on(table.status, table.publishedAt),
  index("posts_category_idx").on(table.categoryId),
  index("posts_author_idx").on(table.authorId),
]);

export const insertPostSchema = createInsertSchema(postsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof postsTable.$inferSelect;
