import { text, integer } from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { createTable } from "../schema";
import { SUBMISSION_TYPE } from "@/constants/scholarship/submittion-type";
import { SCHOLARSHIP_TYPES } from "@/constants/scholarship/scholarship-types";
import { STATUS } from "@/constants/users/status";

export const scholarshipProgram = createTable("programs", {
  programId: text("program_id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  slots: integer("slots").notNull(),
  location: text("location").notNull(),
  type: text("type", { enum: SCHOLARSHIP_TYPES }).notNull(),
  submissionType: text("submission_type", { enum: SUBMISSION_TYPE })
    .default("online")
    .notNull(),
  imageUrl: text("image_url"),
  imageKey: text("image_key"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(false),
  deadline: integer("deadline", { mode: "timestamp" }).notNull(),
  requirements: text("requirements"),
  additionalInfo: text("additional_info"),
});

export const applicants = createTable("applicants", {
  applicantId: text("applicant_id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  programId: text("program_id")
    .notNull()
    .references(() => scholarshipProgram.programId, { onDelete: "cascade" }),
  appliedAt: integer("appliedAt", { mode: "timestamp" }).notNull(),
  status: text("status", { enum: STATUS }).default("pending"),
});

export const submissions = createTable("submissions", {
  submissions: text("submissions").primaryKey(),
  applicantId: text("applicant_id")
    .notNull()
    .references(() => applicants.applicantId, { onDelete: "cascade" }),
  submittedAt: integer("submitted_at", { mode: "timestamp" }).notNull(),
  submissionData: text("submission_data"),
  reviewNotes: text("review_notes"),
});
