import type { departmentType } from "@/constants/users/departments";
import { ROLE, ROLES, type roleType } from "@/constants/users/roles";
import {
  db,
  eq,
  countDistinct,
  sum,
  and,
  max,
  isNull,
  sql,
  isNotNull,
} from "@/server/db";
import {
  user as UserTable,
  student as StudentTable,
} from "@/server/db/schema/auth";
import {
  internship as InternshipTable,
  company as CompanyTable,
  supervisor as SupervisorTable,
  progressLog as ProgressTable,
  internDocuments as InternDocumentsTable,
} from "@/server/db/schema/internship";
import { TRPCError } from "@trpc/server";

export const getAllInternships = async ({
  role,
  department,
}: {
  role: roleType;
  department: departmentType;
}) => {
  try {
    let baseQuery = db
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
              'profile', ${UserTable.profile},
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
      .leftJoin(UserTable, eq(UserTable.id, InternshipTable.userId))
      .leftJoin(StudentTable, eq(UserTable.id, StudentTable.id))
      .leftJoin(
        ProgressTable,
        eq(ProgressTable.internshipId, InternshipTable.internshipId),
      )
      .groupBy(CompanyTable.companyId);

    let query;
    if (role === ROLE.INTERNSHIP_COORDINATOR) {
      query = baseQuery.where(
        and(
          isNotNull(InternshipTable.userId), // Only companies with interns
          eq(UserTable.department, department),
        ),
      );
    } else {
      query = baseQuery.where(isNotNull(InternshipTable.userId));
    }

    const response = await query.execute();
    return response.map((row) => ({
      ...row,
      interns: row.interns ? JSON.parse(row.interns as string) : [],
    }));
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get interns: " + (error as Error).message,
    });
  }
};

export const getAllUserAccount = async ({
  role,
  department,
}: {
  role: roleType;
  department: departmentType;
}) => {
  try {
    const conditions = [
      eq(UserTable.role, ROLE.INTERNSHIP_STUDENT),
      isNull(InternshipTable.userId),
    ];

    if (role === ROLE.INTERNSHIP_COORDINATOR) {
      conditions.push(eq(UserTable.department, department));
    }

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
      .where(and(...conditions))
      .execute();

    return response;
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
