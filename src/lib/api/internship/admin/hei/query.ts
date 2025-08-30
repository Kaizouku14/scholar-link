import { db, eq, countDistinct, sum, max, sql, isNotNull } from "@/server/db";
import type {
  AdminIntern,
  AdminSectionData,
} from "@/interfaces/internship/hei";
import {
  user as UserTable,
  student as StudentTable,
} from "@/server/db/schema/auth";
import {
  internship as InternshipTable,
  company as CompanyTable,
  progressLog as ProgressTable,
  supervisor as SupervisorTable,
} from "@/server/db/schema/internship";

export const getAdminSections = async (): Promise<AdminSectionData[]> => {
  return await db.transaction(async (tx) => {
    const response = await tx
      .select({
        section: UserTable.section,
        course: UserTable.course,
        department: max(UserTable.department),
        studentCount: countDistinct(InternshipTable.userId),
        totalProgressHours: sum(ProgressTable.hours),
        interns: sql<string>`
          json_group_array(
            DISTINCT json_object(
              'name', ${UserTable.name},
              'profile', ${UserTable.profile},
              'email', ${UserTable.email},
              'section', ${UserTable.section},
              'course', ${UserTable.course},
              'status', ${InternshipTable.status},
              'companyName', ${CompanyTable.name},
              'companyAddress', ${CompanyTable.address},
              'supervisorName', ${SupervisorTable.name},
              'supervisorEmail', ${SupervisorTable.email},
              'supervisorContactNo', ${SupervisorTable.contactNo}
            )
          )
        `.as("interns"),
      })
      .from(UserTable)
      .innerJoin(InternshipTable, eq(UserTable.id, InternshipTable.userId))
      .innerJoin(StudentTable, eq(InternshipTable.userId, StudentTable.id))
      .leftJoin(
        CompanyTable,
        eq(InternshipTable.companyId, CompanyTable.companyId),
      )
      .leftJoin(
        SupervisorTable,
        eq(InternshipTable.supervisorId, SupervisorTable.supervisorId),
      )
      .leftJoin(
        ProgressTable,
        eq(ProgressTable.internshipId, InternshipTable.internshipId),
      )
      .where(isNotNull(InternshipTable.userId))
      .groupBy(UserTable.section, UserTable.course);

    return response.map((row) => ({
      ...row,
      interns: row.interns ? (JSON.parse(row.interns) as AdminIntern[]) : [],
    }));
  });
};
