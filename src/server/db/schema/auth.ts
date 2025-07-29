import { createTable } from "../schema";
import { text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { ROLES } from "@/constants/roles";
import { COURSES } from "@/constants/courses";
import { DEPARTMENTS } from "@/constants/departments";
import { SECTIONS } from "@/constants/sections";
import { YEAR_LEVEL } from "@/constants/year-level";
import { GENDERS } from "@/constants/genders";

export const user = createTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  surname: text("surname"),
  middleName: text("middle_name"),
  email: text("email").unique(),
  profilePicture: text("profile_picture"),
  contact: text("contact"),
  address: text("address"),
  gender: text("gender", { enum: GENDERS }),
  department: text("department", { enum: DEPARTMENTS }),
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
  course: text("course", { enum: COURSES }),
  section: text("section", { enum: SECTIONS }),
  yearLevel: text("year_level", { enum: YEAR_LEVEL }),
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
});

export const authorizedEmail = createTable("authorized_email", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
});
