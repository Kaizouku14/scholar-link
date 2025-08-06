import { integer, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { createTable } from "../schema";
import { DEPARTMENTS } from "@/constants/departments";
import { STATUS, INTERNSHIP_STATUS } from "@/constants/status";
import { DOCUMENTS } from "@/constants/documents";
import { sql } from "drizzle-orm";

export const internship = createTable("internship", {
  internshipId: text("internship_id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  companyId: text("company_id")
    .notNull()
    .references(() => company.companyId, { onDelete: "cascade" }),
  progressId: text("progress_id")
    .notNull()
    .references(() => studentProgress.progressId, { onDelete: "cascade" }),
  startDate: integer("start_date", { mode: "timestamp" }).notNull(),
  endDate: integer("end_date", { mode: "timestamp" }), //Add value when internship is completed
  totalOfHoursRequired: integer("total_of_hours_required").notNull(), //Values i.e(450, 600)
  status: text("status", { enum: INTERNSHIP_STATUS })
    .notNull()
    .default("pending"),
});

export const studentProgress = createTable("student_progress", {
  progressId: text("progress_id").primaryKey(),
  progressDate: integer("progress_date", { mode: "timestamp" }).notNull(),
  completedHours: integer("completed_hours").notNull().default(0),
});

export const company = createTable("company", {
  companyId: text("company_id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  contactPerson: text("contact_person").notNull(),
  contactEmail: text("contact_email"),
  contactNo: text("contact_no").notNull(),
});

export const document = createTable("document", {
  documentType: text("document_type", { enum: DOCUMENTS })
    .notNull()
    .primaryKey(),
  deadline: integer("deadline", { mode: "timestamp" }).notNull(),
});

export const internDocuments = createTable("intern_documents", {
  documentsId: text("documents_id").primaryKey(),
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
