import { countDistinct, db, eq, sql, max } from "@/server/db";
import {
  company as CompanyTable,
  internship as InternshipTable,
  supervisor as SupervisorTable,
  progressLog as ProgressTable,
} from "@/server/db/schema/internship";
import {
  user as UserTable,
  student as StudentTable,
} from "@/server/db/schema/auth";
import type { CompanyInterns } from "@/interfaces/internship/hte";

export const getAllCompany = async () => {
  const response = await db.transaction(async (tx) => {
    const baseQuery = tx
      .select({
        companyId: CompanyTable.companyId,
        companyName: max(CompanyTable.name),
        address: max(CompanyTable.address),
        supervisor: max(SupervisorTable.name),
        supervisorEmail: max(SupervisorTable.email),
        supervisorNo: max(SupervisorTable.contactNo),
        studentCount: countDistinct(InternshipTable.userId),
        interns: sql<string>`
            json_group_array(
              DISTINCT json_object(
                'name', ${UserTable.name},
                'profile', ${UserTable.profile},
                'email', ${UserTable.email},
                'section', ${UserTable.section},
                'status', ${InternshipTable.status}
              )
            )
          `.as("interns"),
      })
      .from(CompanyTable)
      .innerJoin(
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
      .groupBy(CompanyTable.companyId)
      .execute();

    return baseQuery;
  });

  return response.map((row) => ({
    ...row,
    interns: row.interns ? (JSON.parse(row.interns) as CompanyInterns[]) : [],
  }));
};
