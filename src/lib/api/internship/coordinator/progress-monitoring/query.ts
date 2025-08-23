import type { departmentType } from "@/constants/users/departments";
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
        id: InternshipTable.internshipId,
        name: UserTable.name,
        middleName: UserTable.middleName,
        surname: UserTable.surname,
        profile: UserTable.profile,
        section: UserTable.section,
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
      .innerJoin(StudentTable, eq(StudentTable.id, InternshipTable.userId))
      .innerJoin(
        CompanyTable,
        eq(CompanyTable.companyId, InternshipTable.companyId),
      )
      .innerJoin(UserTable, eq(UserTable.id, InternshipTable.userId))
      .where(eq(UserTable.department, department))
      .groupBy(
        InternshipTable.internshipId,
        UserTable.name,
        UserTable.surname,
        UserTable.section,
        StudentTable.course,
        StudentTable.yearLevel,
        CompanyTable.name,
        InternshipTable.status,
      )
      .execute();

    return response ?? [];
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get student progress: " + (error as Error).message,
    });
  }
};
