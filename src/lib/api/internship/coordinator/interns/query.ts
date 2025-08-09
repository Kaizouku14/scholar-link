import type { departmentType } from "@/constants/departments";
import { db, eq, countDistinct, sum } from "@/server/db";
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
        companyName: CompanyTable.name,
        supervisor: CompanyTable.contactPerson,
        supervisorEmail: CompanyTable.contactEmail,
        studentCount: countDistinct(InternshipTable.userId).as("studentCount"),
        totalProgressHours: sum(ProgressTable.hours).as("totalProgressHours"),
      })
      .from(CompanyTable)
      .innerJoin(
        InternshipTable,
        eq(CompanyTable.companyId, InternshipTable.companyId),
      )
      .innerJoin(UserTable, eq(UserTable.id, InternshipTable.userId))
      .leftJoin(
        ProgressTable,
        eq(ProgressTable.internshipId, InternshipTable.internshipId),
      )
      .where(eq(UserTable.department, department))
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
