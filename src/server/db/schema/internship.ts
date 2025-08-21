import { integer, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { createTable } from "../schema";
import { STATUS, INTERNSHIP_STATUS } from "@/constants/users/status";
import { DOCUMENTS } from "@/constants/internship/documents";
import { sql } from "drizzle-orm";

export const internship = createTable("internship", {
  internshipId: text("internship_id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  companyId: text("company_id")
    .notNull()
    .references(() => company.companyId, { onDelete: "cascade" }),
  supervisorId: text("supervisor_id")
    .notNull()
    .references(() => supervisor.supervisorId, { onDelete: "cascade" }),
  startDate: integer("start_date", { mode: "timestamp" }).notNull(),
  endDate: integer("end_date", { mode: "timestamp" }).notNull(),
  totalOfHoursRequired: integer("total_of_hours_required").notNull(), //Values i.e(450, 600)
  status: text("status", { enum: INTERNSHIP_STATUS })
    .notNull()
    .default("pending"),
});

export const progressLog = createTable("student_progress", {
  progressId: text("progress_id").primaryKey(),
  internshipId: text("internship_id")
    .notNull()
    .references(() => internship.internshipId, { onDelete: "cascade" }),
  description: text("description").notNull(),
  logDate: integer("log_date", { mode: "timestamp" }).notNull(),
  hours: integer("hours").notNull().default(0),
});

export const company = createTable("company", {
  companyId: text("company_id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
});

export const supervisor = createTable("supervisor", {
  supervisorId: text("supervisor_id").primaryKey(),
  name: text("name").notNull(),
  contactNo: text("contact_no").notNull(),
  email: text("email").notNull(),
});

export const document = createTable("document", {
  documentType: text("document_type", { enum: DOCUMENTS })
    .notNull()
    .primaryKey(),
  deadline: integer("deadline", { mode: "timestamp" }).notNull(),
});

export const internDocuments = createTable("intern_documents", {
  documentId: text("documents_id").primaryKey(),
  internId: text("intern_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),
  documentType: text("document_type", { enum: DOCUMENTS })
    .notNull()
    .references(() => document.documentType, { onDelete: "cascade" }),
  submittedAt: integer("submitted_at", { mode: "timestamp" }),
  documentUrl: text("document_url"),
  documentKey: text("document_key"),
  reviewStatus: text("review_status", { enum: STATUS }).default("pending"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdateFn(
    () => new Date(),
  ),
});
