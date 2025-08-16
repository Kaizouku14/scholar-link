import type { departmentType } from "@/constants/departments";
import { countDistinct, db, eq, sql } from "@/server/db";
import { user as UserTable } from "@/server/db/schema/auth";
import { internship as InternshipTable } from "@/server/db/schema/internship";
import { TRPCError } from "@trpc/server";

//TODO: TO CONSIDER
export const getCoordinatorDashboardStats = async ({
  department,
}: {
  department: departmentType;
}) => {
  try {
    const [counts] = await db
      .select({
        studentCount: countDistinct(InternshipTable.userId).as("studentCount"),
        pendingCount: sql<number>`COUNT(DISTINCT ${InternshipTable.userId}) FILTER (WHERE ${InternshipTable.status} = 'pending')`,
        completedCount: sql<number>`COUNT(DISTINCT ${InternshipTable.userId}) FILTER (WHERE ${InternshipTable.status} = 'completed')`,
        inProgressCount: sql<number>`COUNT(DISTINCT ${InternshipTable.userId}) FILTER (WHERE ${InternshipTable.status} = 'in-progress')`,
      })
      .from(InternshipTable)
      .innerJoin(UserTable, eq(InternshipTable.userId, UserTable.id))
      .where(eq(UserTable.department, department))
      .groupBy(InternshipTable.status)
      .execute();

    return {
      counts,
      department,
    };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: (error as Error).message,
    });
  }
};
