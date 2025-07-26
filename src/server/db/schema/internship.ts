import { integer, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { createTable } from "../schema";
import { DEPARTMENTS } from "@/constants/departments";

export const internship = createTable("internship", {
  internshipId: text("internship_id").primaryKey(),
  companyId: text("company_id")
    .notNull()
    .references(() => company.companyId, { onDelete: "cascade" }),
  departmentId: text("department_id")
    .notNull()
    .references(() => department.departmentId, { onDelete: "cascade" }),
  supervisorId: text("supervisor_id")
    .notNull()
    .references(() => supervisor.supervisorId, { onDelete: "cascade" }),
  startDate: integer("start_date", { mode: "timestamp" }).notNull(),
  endDate: integer("end_date", { mode: "timestamp" }).notNull(),
  totalOfHoursRequired: integer("total_of_hours_required").notNull(), //Possible to become enum
  status: text("status").notNull(), //ENUM (ie. pending, ongoing, completed, cancelled)
});

export const interns = createTable("interns", {
  internsId: text("interns_id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  internshipId: text("internship_id").notNull(), //Reference to internship Table
  applicationDate: integer("application_date", { mode: "timestamp" }).notNull(),
  approvalStatus: text("approval_status").notNull(), // ENUM
  completedHours: integer("completed_hours").notNull().default(0),
});

export const internship_submissions = createTable("submissions", {
  submissionId: text("submission_id").primaryKey(),
  internId: text("intern_id")
    .notNull()
    .references(() => interns.internsId, { onDelete: "cascade" }),
  documentType: text("documentType").notNull(), //ENUM
  submittedAt: integer("submitted_at", { mode: "timestamp" }).notNull(),
  //   documentUrl: text('document_url').notNull(),
  //   reviewStatus: text('review-status').notNull(), //ENUM
});

export const department = createTable("department", {
  departmentId: text("department_id").primaryKey(),
  name: text("name", { enum: DEPARTMENTS }).notNull(),
  headOfDepartment: text("head_of_department").notNull(),
  //   requiredHours: integer("required_hours").notNull(), //TO CONSIDER
});

export const company = createTable("company", {
  companyId: text("company_id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  contactPerson: text("contact_person").notNull(),
  contactNo: text("contact_no").notNull(),
});

export const supervisor = createTable("supervisor", {
  supervisorId: text("supervisor_id").primaryKey(),
  companyId: text("company_id")
    .notNull()
    .references(() => company.companyId, { onDelete: "cascade" }),
  name: text("name").notNull(),
  position: text("position").notNull(),
  email: text("email").notNull(),
  contactNo: text("contact_no").notNull(),
});
