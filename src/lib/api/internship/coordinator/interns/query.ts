import type { departmentType } from "@/constants/departments";
import { ROLES } from "@/constants/roles";
import { db, eq, countDistinct, sum, and, max, ne } from "@/server/db";
import {
  user as UserTable,
  student as StudentTable,
} from "@/server/db/schema/auth";
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
        address: max(CompanyTable.address),
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

export const getAllUserAccountByDept = async ({
  department,
}: {
  department: departmentType;
}) => {
  try {
    const response = await db
      .select({
        id: UserTable.id,
        studentNo: StudentTable.studentNo,
      })
      .from(UserTable)
      .leftJoin(StudentTable, eq(UserTable.id, StudentTable.id))
      .where(
        and(eq(UserTable.department, department), eq(UserTable.role, ROLES[0])),
      )
      .execute();

    console.log(response);

    return response ?? [];
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: (error as Error).message,
    });
  }
};
