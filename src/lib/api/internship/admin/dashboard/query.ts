import { countDistinct, db, eq, sql } from "@/server/db";
import { user as UserTable } from "@/server/db/schema/auth";
import {
  internship as InternshipTable,
  company as CompanyTable,
} from "@/server/db/schema/internship";

export const getAdminDashboardStats = async () => {
  return db
    .transaction(async (tx) => {
      const [overview] = await tx
        .select({
          totalInternship: countDistinct(InternshipTable.userId),
          totalActiveInterns: sql<number>`COUNT(DISTINCT ${InternshipTable.userId}) FILTER (WHERE ${InternshipTable.status} = 'on-going')`,
          totalCompletedInterns: sql<number>`COUNT(DISTINCT ${InternshipTable.userId}) FILTER (WHERE ${InternshipTable.status} = 'completed')`,
          pendingInterns: sql<number>`COUNT(DISTINCT ${InternshipTable.userId}) FILTER (WHERE ${InternshipTable.status} = 'pending')`,
        })
        .from(InternshipTable)
        .execute();

      const internshipStats = await tx
        .select({
          name: CompanyTable.name,
          count: countDistinct(InternshipTable.userId).as("internCount"),
        })
        .from(CompanyTable)
        .innerJoin(
          InternshipTable,
          eq(CompanyTable.companyId, InternshipTable.companyId),
        )
        .groupBy(CompanyTable.name)
        .orderBy(sql`internCount DESC`)
        .limit(5)
        .execute();

      const departmentStats = await tx
        .select({
          name: UserTable.department,
          count: countDistinct(InternshipTable.userId).as("internCount"),
        })
        .from(UserTable)
        .innerJoin(InternshipTable, eq(UserTable.id, InternshipTable.userId))
        .groupBy(UserTable.department)
        .orderBy(sql`internCount DESC`)
        .limit(5)
        .execute();

      return {
        overview,
        internshipStats,
        departmentStats,
      };
    })
    .catch((error) => console.log(error));
};
