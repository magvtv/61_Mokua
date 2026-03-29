import { pgTable, integer, primaryKey } from "drizzle-orm/pg-core";
import { postsTable } from "./posts";
import { tagsTable } from "./tags";

export const postTagsTable = pgTable("post_tags", {
  postId: integer("post_id").references(() => postsTable.id, { onDelete: "cascade" }).notNull(),
  tagId: integer("tag_id").references(() => tagsTable.id, { onDelete: "cascade" }).notNull(),
}, (table) => [
  primaryKey({ columns: [table.postId, table.tagId] }),
]);

export type PostTag = typeof postTagsTable.$inferSelect;
