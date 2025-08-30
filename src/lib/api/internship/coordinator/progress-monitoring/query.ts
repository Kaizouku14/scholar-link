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

export const getStudentProgressBySection = async ({
  userId,
}: {
  userId: string;
}) => {
  const { coordinatorSections, coordinatorDepartment, coordinatorCourse } =
    await getCoordinatorInfo({ userId });

  return await db
    .transaction(async (tx) => {
      const response = await tx
        .select({
          id: InternshipTable.internshipId,
          name: UserTable.name,
          profile: UserTable.profile,
          section: UserTable.section,
          course: UserTable.course,
          companyName: CompanyTable.name,
          progress: sql<string>`COALESCE(SUM(${ProgressTable.hours}), 0)`.as(
            "progress",
          ),
          totalRequiredHours: InternshipTable.totalOfHoursRequired,
          status: InternshipTable.status,
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
        .groupBy(
          InternshipTable.internshipId,
          UserTable.name,
          UserTable.profile,
          UserTable.section,
          UserTable.course,
          StudentTable.yearLevel,
          CompanyTable.name,
          InternshipTable.totalOfHoursRequired,
          InternshipTable.status,
        )
        .orderBy(desc(ProgressTable.hours))
        .execute();

      return response;
    })
    .catch((error) => {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get student progress: " + (error as Error).message,
      });
    });
};
