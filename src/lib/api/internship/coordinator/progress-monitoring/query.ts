import { db, eq, and, sql, desc } from "@/server/db";
import {
  user as UserTable,
  student as StudentTable,
} from "@/server/db/schema/auth";
import {
  progressLog as ProgressTable,
  internship as InternshipTable,
  company as CompanyTable,
} from "@/server/db/schema/internship";
import { TRPCError } from "@trpc/server";
import { getCoordinatorInfo } from "../query";
import type {
  ProgressLogs,
  progressMonitoring,
} from "@/interfaces/internship/progress";

export const getStudentProgressBySection = async ({
  userId,
}: {
  userId: string;
}) => {
  try {
    const { coordinatorSections, coordinatorDepartment, coordinatorCourse } =
      await getCoordinatorInfo({ userId });

    const response = await db
      .select({
        id: InternshipTable.internshipId,
        name: UserTable.name,
        profile: UserTable.profile,
        section: UserTable.section,
        course: UserTable.course,
        companyName: CompanyTable.name,
        totalRequiredHours: InternshipTable.totalOfHoursRequired,
        status: InternshipTable.status,
        logs: sql<string>`
                json_group_array(
                    json_object(
                    'date', ${ProgressTable.logDate},
                    'hours', ${ProgressTable.hours},
                    'activity', ${ProgressTable.description}
                    )
                )
                `.as("logs"),
      })
      .from(InternshipTable)
      .leftJoin(
        ProgressTable,
        eq(ProgressTable.internshipId, InternshipTable.internshipId),
      )
      .innerJoin(StudentTable, eq(StudentTable.id, InternshipTable.userId))
      .innerJoin(
        CompanyTable,
        eq(CompanyTable.companyId, InternshipTable.companyId),
      )
      .innerJoin(UserTable, eq(UserTable.id, InternshipTable.userId))
      .where(
        and(
          eq(UserTable.course, coordinatorCourse!),
          eq(UserTable.department, coordinatorDepartment!),
          sql`EXISTS (
                SELECT 1
                FROM json_each(${UserTable.section})
                WHERE value IN (${sql.join(coordinatorSections, sql`,`)})
            )`,
        ),
      )
      .groupBy(InternshipTable.internshipId)
      .orderBy(desc(ProgressTable.hours))
      .execute();

    const logs = response.map((r) => ({
      ...r,
      logs: JSON.parse(r.logs) as ProgressLogs[],
    }));

    return logs as progressMonitoring[];
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get student progress: " + (error as Error).message,
    });
  }
};
