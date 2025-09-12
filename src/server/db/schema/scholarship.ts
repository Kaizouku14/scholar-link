import { text, integer, index } from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { createTable } from "../schema";
import { SUBMISSION_TYPE } from "@/constants/scholarship/submittion-type";
import { SCHOLARSHIP_TYPES } from "@/constants/scholarship/scholarship-types";
import { SCHOLARSHIP_STATUS, STATUS } from "@/constants/users/status";
import { sql } from "drizzle-orm";

export const scholarshipProgram = createTable("programs", {
  programId: text("program_id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  section: text("section").notNull(),
  slots: integer("slots").notNull(),
  type: text("type", { enum: SCHOLARSHIP_TYPES }).notNull(),
  submissionType: text("submission_type", { enum: SUBMISSION_TYPE })
    .default("online")
    .notNull(),
  imageUrl: text("image_url"),
  imageKey: text("image_key"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(false),
  deadline: integer("deadline", { mode: "timestamp" }).notNull(),
  announcements: text("announcements"),
});

export const programCoodinators = createTable(
  "program_coordinators",
  {
    id: text("id").primaryKey(),
    programId: text("program_id")
      .notNull()
      .references(() => scholarshipProgram.programId, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    assignedAt: integer("assigned_at", { mode: "timestamp" }).default(
      sql`(unixepoch())`,
    ),
  },
  (table) => [index("idx_coordinators_program").on(table.programId)],
);

export const requirements = createTable("requirements", {
  requirementId: text("requirement_id").primaryKey(),
  programId: text("program_id")
    .notNull()
    .references(() => scholarshipProgram.programId, { onDelete: "cascade" }),
  label: text("label").notNull(),
  description: text("description"),
  isRequired: integer("is_required", { mode: "boolean" })
    .notNull()
    .default(true),
});

export const applications = createTable(
  "applications",
  {
    applicationsId: text("applications_id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    programId: text("program_id")
      .notNull()
      .references(() => scholarshipProgram.programId, { onDelete: "cascade" }),
    appliedAt: integer("appliedAt", { mode: "timestamp" }).notNull(),
    status: text("status", { enum: SCHOLARSHIP_STATUS }).default("pending"),
  },
  (table) => [
    index("idx_applications_user_status").on(table.userId, table.status),
    index("idx_applications_program").on(table.programId),
  ],
);

export const scholars_documents = createTable(
  "scholars_documents",
  {
    id: text("document_id").primaryKey(),
    applicationsId: text("applications_id")
      .notNull()
      .references(() => applications.applicationsId, { onDelete: "cascade" }),
    submittedAt: integer("submitted_at", { mode: "timestamp" }).notNull(),
    documentUrl: text("document_url"),
    documentKey: text("document_key"),
    documentName: text("document_name"),
    reviewStatus: text("review_status", { enum: STATUS }).default("pending"),
    createdAt: integer("created_at", { mode: "timestamp" }).default(
      sql`(unixepoch())`,
    ),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdateFn(
      () => new Date(),
    ),
  },
  (table) => [index("idx_documents_applications_id").on(table.applicationsId)],
);
