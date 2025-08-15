import type { departmentType } from "@/constants/departments";
import { ROLES } from "@/constants/roles";
import { db, eq, countDistinct, sum, and, max, isNull, sql } from "@/server/db";
import {
  user as UserTable,
  student as StudentTable,
} from "@/server/db/schema/auth";
import {
  internship as InternshipTable,
  company as CompanyTable,
  supervisor as SupervisorTable,
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
        supervisor: max(SupervisorTable.name),
        supervisorEmail: max(SupervisorTable.email),
        studentCount: countDistinct(InternshipTable.userId),
        totalProgressHours: sum(ProgressTable.hours),
        department: UserTable.department,
        interns: sql`
            json_group_array(
                DISTINCT json_object(
                'name', ${UserTable.name},
                'middleName', ${UserTable.middleName},
                'surname', ${UserTable.surname},
                'email', ${UserTable.email},
                'course', ${StudentTable.course},
                'yearLevel', ${StudentTable.yearLevel},
                'section', ${StudentTable.section},
                'studentNo', ${StudentTable.studentNo},
                'status', ${InternshipTable.status}
                )
            )
        `.as("interns"),
      })
      .from(CompanyTable)
      .leftJoin(
        InternshipTable,
        eq(InternshipTable.companyId, CompanyTable.companyId),
      )
      .leftJoin(
        SupervisorTable,
        eq(InternshipTable.supervisorId, SupervisorTable.supervisorId),
      )
      .leftJoin(
        UserTable,
        and(
          eq(UserTable.id, InternshipTable.userId),
          eq(UserTable.department, department),
        ),
      )
      .leftJoin(StudentTable, eq(UserTable.id, StudentTable.id))
      .leftJoin(
        ProgressTable,
        eq(ProgressTable.internshipId, InternshipTable.internshipId),
      )
      .where(eq(UserTable.id, InternshipTable.userId))
      .groupBy(CompanyTable.companyId)
      .execute();

    return response.map((row) => ({
      ...row,
      interns: row.interns ? JSON.parse(row.interns as string) : [],
    }));
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
        userId: UserTable.id,
        name: UserTable.name,
        middleName: UserTable.middleName,
        surname: UserTable.surname,
        studentNo: StudentTable.studentNo,
        course: StudentTable.course,
        section: StudentTable.section,
        yearLevel: StudentTable.yearLevel,
      })
      .from(UserTable)
      .leftJoin(StudentTable, eq(UserTable.id, StudentTable.id))
      .leftJoin(InternshipTable, eq(UserTable.id, InternshipTable.userId))
      .where(
        and(
          eq(UserTable.department, department),
          eq(UserTable.role, ROLES[0]),
          isNull(InternshipTable.userId),
        ),
      )
      .execute();

    return response ?? [];
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: (error as Error).message,
    });
  }
};

export const getCompanyRecords = async () => {
  try {
    const response = await db
      .select({
        id: CompanyTable.companyId,
        name: CompanyTable.name,
        address: CompanyTable.address,
      })
      .from(CompanyTable)
      .execute();

    return response;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: (error as Error).message,
    });
  }
};
