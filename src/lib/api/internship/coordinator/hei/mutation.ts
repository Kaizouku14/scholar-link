import { TRPCError } from "@trpc/server";
import { db, inArray } from "@/server/db";
import { parseInternshipXLSX } from "./coordinatorParseCSV";
import {
  internship as InternshipTable,
  company as CompanyTable,
  supervisor as SupervisorTable,
} from "@/server/db/schema/internship";
import {
  user as UserTable,
  student as StudentTable,
  authorizedEmail as AuthorizedEmailTable,
} from "@/server/db/schema/auth";
import { generateUUID, getCompanyKey } from "@/lib/utils";
import { ROLE } from "@/constants/users/roles";
import { departmentHoursMap } from "@/constants/internship/hours";
import type { departmentType } from "@/constants/users/departments";
import type {
  RowWithOptionalSupervisorEmail,
  NewAuthorizedEmail,
  NewCompany,
  NewInternship,
  NewStudent,
  NewSupervisor,
  NewUser,
} from "@/interfaces/internship/csv-headers";
import type { SectionType } from "@/constants/users/sections";
import type { GenderType } from "@/constants/users/genders";
import type { courseType } from "@/constants/users/courses";

export const insertInternshipsXLSX = async ({
  file,
  department,
}: {
  file: File;
  department: string;
}) => {
  if (!file) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "No file uploaded" });
  }

  if (!file.name.endsWith(".xlsx")) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "File must be an XLSX file. File type: " + file.type,
    });
  }

  const fileArrayBuffer = await file.arrayBuffer();

  try {
    const rows = await parseInternshipXLSX(fileArrayBuffer);

    if (rows.validRows.length === 0) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No valid data rows found to insert.",
      });
    }

    const deptKey = department as departmentType;
    const hoursRequired = departmentHoursMap[deptKey];
    const dataRows =
      rows.validRows as ReadonlyArray<RowWithOptionalSupervisorEmail>;

    // Batch collections
    const users: NewUser[] = [];
    const students: NewStudent[] = [];
    const companies: NewCompany[] = [];
    const supervisors: NewSupervisor[] = [];
    const internships: NewInternship[] = [];
    const authorizedEmails: NewAuthorizedEmail[] = [];

    // Optional: dedupe authorized emails to avoid duplicates
    const seenEmails = new Set<string>();
    const insertErrors: Array<{ studentNo: string; error: string }> = [];

    const existingCompanies = await db.select().from(CompanyTable);
    const companyMap = new Map<string, string>();
    for (const comp of existingCompanies) {
      const key = getCompanyKey(comp.name!, comp.address!);
      companyMap.set(key, comp.companyId);
    }

    for (const row of dataRows) {
      try {
        const userId = generateUUID();
        const internshipId = generateUUID();
        const supervisorId = generateUUID();
        const authorizedEmailId = generateUUID();
        let companyId: string;

        users.push({
          id: userId,
          name: row[
            "NAME OF STUDENT INTERNSHIPS (First Name, Middle Inital & Last Name)"
          ],
          email: row.EMAIL,
          contact: row["CONTACT NO."],
          gender: row.SEX as GenderType,
          department: department as departmentType,
          section: [row.SECTION as SectionType],
          role: ROLE.INTERNSHIP_STUDENT,
        });

        students.push({
          id: userId,
          studentNo: row["STUDENT NO."],
          course: row[
            "FULL TITLE OF THE PROGRAM ENROLLED IN (DO NOT ABBREVIATE)"
          ].replace(/\s+/g, " ") as courseType,
          yearLevel: "4th",
        });

        if (!seenEmails.has(row.EMAIL)) {
          seenEmails.add(row.EMAIL);
          authorizedEmails.push({
            id: authorizedEmailId,
            email: row.EMAIL,
          });
        }

        const companyKey = getCompanyKey(
          row["PARTNER HOST TRAINING ESTABLISHMENTS (HTEs)"],
          row.ADDRESS,
        );

        if (companyMap.has(companyKey)) {
          companyId = companyMap.get(companyKey)!;
        } else {
          // New company
          companyId = generateUUID();
          companyMap.set(companyKey, companyId);

          companies.push({
            companyId,
            name: row["PARTNER HOST TRAINING ESTABLISHMENTS (HTEs)"],
            address: row.ADDRESS,
          });
        }

        supervisors.push({
          supervisorId,
          name: row["SUPERVISOR NAME"],
          contactNo: row["SUPERVISOR NO."],
          email: row["SUPERVISOR EMAIL"] ?? "",
        });

        internships.push({
          internshipId,
          userId,
          companyId,
          supervisorId,
          duration: row["DATES OF DURATION OF THE INTERNSHIP"],
          totalOfHoursRequired: hoursRequired,
        });
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Unknown error";
        insertErrors.push({
          studentNo: row["STUDENT NO."],
          error: errorMsg,
        });
      }
    }

    let insertedCount = 0;

    await db.transaction(async (tx) => {
      if (users.length > 0) {
        await tx.insert(UserTable).values(users).execute();
      }
      if (students.length > 0) {
        await tx.insert(StudentTable).values(students).execute();
      }
      if (authorizedEmails.length > 0) {
        await tx
          .insert(AuthorizedEmailTable)
          .values(authorizedEmails)
          .execute();
      }
      if (companies.length > 0) {
        await tx.insert(CompanyTable).values(companies).execute();
      }
      if (supervisors.length > 0) {
        await tx.insert(SupervisorTable).values(supervisors).execute();
      }
      if (internships.length > 0) {
        await tx.insert(InternshipTable).values(internships).execute();
        insertedCount = internships.length;
      }
    });

    return {
      message: `Processed ${rows.validRows.length} rows. Inserted ${insertedCount}, ${insertErrors.length} failed, ${rows.invalidRows.length} invalid.`,
    };
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        error instanceof Error
          ? error.message
          : "Unknown error occurred during insertion",
    });
  }
};

export const cancelInternship = async (internshipId: string[]) => {
  try {
    await db
      .update(InternshipTable)
      .set({ status: "canceled" })
      .where(inArray(InternshipTable.internshipId, internshipId))
      .execute();
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: (error as Error).message,
    });
  }
};

export const deleteInternship = async (internshipId: string[]) => {
  try {
    await db
      .delete(InternshipTable)
      .where(inArray(InternshipTable.internshipId, internshipId))
      .execute();
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: (error as Error).message,
    });
  }
};
