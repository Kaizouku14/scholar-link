import { createTable } from "../schema";
import { text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { ROLES } from "@/constants/users/roles";
import { COURSES } from "@/constants/users/courses";
import { DEPARTMENTS } from "@/constants/users/departments";
import { type SectionType } from "@/constants/users/sections";
import { YEAR_LEVEL } from "@/constants/users/year-level";
import { GENDERS } from "@/constants/users/genders";

export const user = createTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  middleName: text("middle_name").notNull(),
  email: text("email").unique().notNull(),
  profile: text("profile"),
  profileKey: text("profile_key"),
  contact: text("contact"),
  address: text("address"),
  dateOfBirth: integer("date_of_birth", { mode: "timestamp" }),
  gender: text("gender", { enum: GENDERS }),
  department: text("department", { enum: DEPARTMENTS }),
  section: text("section", { mode: "json" })
    .$type<SectionType[]>()
    .default(sql`(json_array())`),
  role: text("role", { enum: ROLES }),
  emailVerified: integer("email_verified", { mode: "boolean" }),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdateFn(
    () => new Date(),
  ),
});

export const student = createTable("student", {
  id: text("id")
    .notNull()
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  studentNo: text("student_no").unique().notNull(),
  course: text("course", { enum: COURSES }).notNull(),
  yearLevel: text("year_level", { enum: YEAR_LEVEL }).notNull(),
  onboarded: integer("onboarded", { mode: "boolean" }).default(false),
});

export const session = createTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("user_agent"),
});

export const account = createTable("account", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  expiresAt: integer("expires_at", { mode: "timestamp" }),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdateFn(
    () => new Date(),
  ),
});

export const verification = createTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdateFn(
    () => new Date(),
  ),
});

export const authorizedEmail = createTable("authorized_email", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
});
