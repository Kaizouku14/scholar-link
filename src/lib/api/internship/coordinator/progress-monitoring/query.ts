import type { departmentType } from "@/constants/departments";
import { db, eq, sum } from "@/server/db";
import {
  user as UserTable,
  student as StudentTable,
} from "@/server/db/schema/auth";
import {
  progressLog as ProgressTable,
  internship as InternshipTable,
  company as CompanyTable,
} from "@/server/db/schema/internship";
import { TRPCError } from "@trpc/server";

export const getStudentProgressByDept = async ({
  department,
}: {
  department: departmentType;
}) => {
  try {
    const response = await db
      .select({
        internId: InternshipTable.userId,
        internName: UserTable.name,
        profile: UserTable.profile,
        section: StudentTable.section,
        course: StudentTable.course,
        yearLevel: StudentTable.yearLevel,
        companyName: CompanyTable.name,
        progress: sum(ProgressTable.hours),
        totalRequiredHours: InternshipTable.totalOfHoursRequired,
        status: InternshipTable.status,
      })
      .from(ProgressTable)
      .innerJoin(
        InternshipTable,
        eq(InternshipTable.internshipId, ProgressTable.internshipId),
      )
      .innerJoin(StudentTable, eq(InternshipTable.userId, StudentTable.id))
      .innerJoin(
        CompanyTable,
        eq(InternshipTable.companyId, CompanyTable.companyId),
      )
      .innerJoin(UserTable, eq(UserTable.id, InternshipTable.userId))
      .where(eq(UserTable.department, department))
      .groupBy(StudentTable.section)
      .execute();

    return response ?? [];
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get student progress: " + (error as Error).message,
    });
  }
};
