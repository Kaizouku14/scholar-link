import { text, integer } from "drizzle-orm/sqlite-core";
import { createTable } from "../schema";
import { user } from "./auth";
import { sql } from "drizzle-orm";

export const mailTable = createTable("mail", {
  id: text("id").primaryKey(),
  threadId: text("thread_id").notNull(),
  parentId: text("parent_id"),
  sender: text("sender_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  receiver: text("receiver_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  date: integer("date", { mode: "timestamp" }).notNull(),
  isRead: integer("is_read", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
});
