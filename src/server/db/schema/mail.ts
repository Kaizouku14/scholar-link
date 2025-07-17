import { text, integer } from "drizzle-orm/sqlite-core";
import { createTable } from "../schema";
import { user } from "./auth";
import { sql } from "drizzle-orm";

export const mailTable = createTable("mail", {
  id: text("id").primaryKey(),
  sender: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  receiver: text("receiver_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  senderEmail: text("sender_email").notNull(),
  content: text("content").notNull(),
  date: integer("date", { mode: "timestamp" }).notNull(),
  isRead: integer("is_read", { mode: "boolean" }).notNull().default(false),
  imageKeys: text("image_file_key").default("[]"),
  imageUrls: text("image_file_url").default("[]"),
  fileKeys: text("file_key").default("[]"),
  fileUrls: text("file_url").default("[]"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});
