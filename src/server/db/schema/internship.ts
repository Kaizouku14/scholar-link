import { integer, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { createTable } from "../schema";
import { DEPARTMENTS } from "@/constants/departments";
import { STATUS } from "@/constants/status";
import { DOCUMENTS } from "@/constants/documents";
import { sql } from "drizzle-orm";

export const internship = createTable("internship", {
  internshipId: text("internship_id").primaryKey(),
  companyId: text("company_id")
    .notNull()
    .references(() => company.companyId, { onDelete: "cascade" }),
  department: text("department", { enum: DEPARTMENTS }).notNull(),
  startDate: integer("start_date", { mode: "timestamp" }).notNull(),
  endDate: integer("end_date", { mode: "timestamp" }).notNull(),
  totalOfHoursRequired: integer("total_of_hours_required").notNull(), //Values i.e(450, 600)
  status: text("status", { enum: STATUS }).notNull(),
});

export const intern = createTable("interns", {
  internsId: text("interns_id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  internshipId: text("internship_id")
    .notNull()
    .references(() => internship.internshipId, { onDelete: "cascade" }),
  applicationDate: integer("application_date", { mode: "timestamp" }).notNull(), //To Consider
  approvalStatus: text("approval_status", { enum: STATUS }).notNull(),
  completedHours: integer("completed_hours").notNull().default(0),
});

export const document = createTable("document", {
  documentType: text("document_type", { enum: DOCUMENTS }).primaryKey(),
  deadline: integer("deadline", { mode: "timestamp" }).notNull(),
});

export const submission = createTable("submission", {
  submissionId: text("submission_id").primaryKey(),
  internId: text("intern_id").references(() => intern.internsId, {
    onDelete: "cascade",
  }),
  documentType: text("document_type", { enum: DOCUMENTS })
    .notNull()
    .references(() => document.documentType, { onDelete: "cascade" }),
  submittedAt: integer("submitted_at", { mode: "timestamp" }),
  documentUrl: text("document_url"),
  documentKey: text("document_key"),
  reviewStatus: text("review-status", { enum: STATUS }),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdateFn(
    () => new Date(),
  ),
});

export const company = createTable("company", {
  companyId: text("company_id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  contactPerson: text("contact_person").notNull(),
  contactEmail: text("contact_email"),
  contactNo: text("contact_no").notNull(),
});
