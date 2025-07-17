import { text, integer } from "drizzle-orm/sqlite-core";
import { createTable } from "../schema";
import { user } from "./auth";
import { sql } from "drizzle-orm";

export const mailTable = createTable("mail", {
  id: text("id").primaryKey(),
  sender: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  senderName: text("sender_name").notNull(),
  senderEmail: text("sender_email").notNull(),
  senderProfile: text("sender_avatar"),
  receiver: text("receiver_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  isRead: integer("is_read", { mode: "boolean" }).default(false),
  imageKeys: text("image_file_key").default("[]"),
  imageUrls: text("image_file_url").default("[]"),
  fileKeys: text("file_key").default("[]"),
  fileUrls: text("file_url").default("[]"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
});
