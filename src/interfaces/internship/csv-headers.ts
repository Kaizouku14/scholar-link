import type {
  internship as InternshipTable,
  company as CompanyTable,
  supervisor as SupervisorTable,
} from "@/server/db/schema/internship";
import type {
  user as UserTable,
  student as StudentTable,
  authorizedEmail as AuthorizedEmailTable,
} from "@/server/db/schema/auth";
import type { InferInsertModel } from "drizzle-orm";

export type NewUser = InferInsertModel<typeof UserTable>;
export type NewStudent = InferInsertModel<typeof StudentTable>;
export type NewCompany = InferInsertModel<typeof CompanyTable>;
export type NewSupervisor = InferInsertModel<typeof SupervisorTable>;
export type NewInternship = InferInsertModel<typeof InternshipTable>;
export type NewAuthorizedEmail = InferInsertModel<typeof AuthorizedEmailTable>;

export type RowWithOptionalSupervisorEmail = CoordinatorInternshipHeaders &
  Partial<Record<"SUPERVISOR EMAIL", string>>;

export interface CoordinatorInternshipHeaders {
  "STUDENT NO.": string;
  "NAME OF STUDENT INTERNSHIPS (First Name, Middle Inital & Last Name)": string;
  EMAIL: string;
  "CONTACT NO.": string;
  SEX: string;
  SECTION: string;
  "FULL TITLE OF THE PROGRAM ENROLLED IN (DO NOT ABBREVIATE)": string;
  "DATES OF DURATION OF THE INTERNSHIP": string;
  "PARTNER HOST TRAINING ESTABLISHMENTS (HTEs)": string;
  ADDRESS: string;
  "SUPERVISOR NAME": string;
  "SUPERVISOR EMAIL": string;
  "SUPERVISOR NO.": string;
}

// COLUMN MAPPING - Adjust these column numbers to match your Excel file
export const manualHeaderMap = new Map<string, number>([
  ["STUDENT NO.", 1],
  ["NAME OF STUDENT INTERNSHIPS (First Name, Middle Inital & Last Name)", 2],
  ["EMAIL", 3],
  ["CONTACT NO.", 4],
  ["SEX", 5],
  ["SECTION", 6],
  ["DATES OF DURATION OF THE INTERNSHIP", 7],
  ["PARTNER HOST TRAINING ESTABLISHMENTS (HTEs)", 8],
  ["ADDRESS", 9],
  ["SUPERVISOR NAME", 10],
  ["SUPERVISOR EMAIL", 11],
  ["SUPERVISOR NO.", 12],
]);
