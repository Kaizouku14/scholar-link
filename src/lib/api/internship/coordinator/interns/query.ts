import type { departmentType } from "@/constants/departments";
import { db, eq, countDistinct, sum, and, max } from "@/server/db";
import { user as UserTable } from "@/server/db/schema/auth";
import {
  internship as InternshipTable,
  company as CompanyTable,
  progressLog as ProgressTable,
} from "@/server/db/schema/internship";
import { TRPCError } from "@trpc/server";

export const getAllInternByDept = async ({
  department,
}: {
  department: departmentType;
}) => {
  try {
    const response = await db
      .select({
        companyId: CompanyTable.companyId,
        companyName: max(CompanyTable.name),
        supervisor: max(CompanyTable.contactPerson),
        supervisorEmail: max(CompanyTable.contactEmail),
        studentCount: countDistinct(InternshipTable.userId),
        totalProgressHours: sum(ProgressTable.hours),
        department: UserTable.department,
      })
      .from(CompanyTable)
      .leftJoin(
        InternshipTable,
        eq(InternshipTable.companyId, CompanyTable.companyId),
      )
      .leftJoin(
        UserTable,
        and(
          eq(UserTable.id, InternshipTable.userId),
          eq(UserTable.department, department),
        ),
      )
      .leftJoin(
        ProgressTable,
        eq(ProgressTable.internshipId, InternshipTable.internshipId),
      )
      .groupBy(CompanyTable.name)
      .execute();

    return response ?? [];
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get interns," + (error as Error).message,
    });
  }
};
