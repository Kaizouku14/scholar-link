import { countDistinct, db, eq, sql } from "@/server/db";
import {
  internship as InternshipTable,
  progressLog as ProgressLogTable,
} from "@/server/db/schema/internship";
import { TRPCError } from "@trpc/server";

export const getAdminDashboardStats = async () => {
  try {
    const [response] = await db
      .select({
        totalInternship: countDistinct(InternshipTable.userId),
        totalActiveInterns: countDistinct(InternshipTable.userId),
        totalPendingInterns: sql<number>`COUNT(DISTINCT ${InternshipTable.userId}) FILTER (WHERE ${InternshipTable.status} = 'in-progress')`,
        totalCompletedInterns: sql<number>`COUNT(DISTINCT ${InternshipTable.userId}) FILTER (WHERE ${InternshipTable.status} = 'completed')`,
        monthlyLogs: sql<number>`
            SUM(${ProgressLogTable.hours})
            FILTER (
                WHERE date(${ProgressLogTable.logDate}, 'unixepoch') >= date('now','start of month')
            )`,
        prevMonthlyLogs: sql<number>`
            COALESCE(
                SUM(
                CASE
                    WHEN date(${ProgressLogTable.logDate}, 'unixepoch')
                    BETWEEN date('now','start of month','-1 month')
                    AND date('now','start of month','-1 day')
                    THEN ${ProgressLogTable.hours}
                    ELSE 0
                END
                ),
                0
            )`,
      })
      .from(InternshipTable)
      .innerJoin(
        ProgressLogTable,
        eq(InternshipTable.internshipId, ProgressLogTable.internshipId),
      )
      .execute();

    return response;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get dashboard stats," + (error as Error).message,
    });
  }
};
