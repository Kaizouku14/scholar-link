import { text, integer } from "drizzle-orm/sqlite-core";
import { createTable } from "../schema";
import { user } from "./auth";

export const mailTable = createTable("mail", {
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  sender: text("sender").notNull(),
  senderEmail: text("sender_email").notNull(),
  content: text("content").notNull(),
  date: text("date").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  isRead: integer("is_read", { mode: "boolean" }).notNull().default(false),
  
});
