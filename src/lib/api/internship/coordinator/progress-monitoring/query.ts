import type { SectionType } from "@/constants/users/sections";
import { db, eq, sum, and, sql } from "@/server/db";
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

export const getStudentProgressBySection = async ({
  userId,
}: {
  userId: string;
}) => {
  return db
    .transaction(async (tx) => {
      const [coordinator] = await tx
        .select({
          section: UserTable.section,
          department: UserTable.department,
        })
        .from(UserTable)
        .where(eq(UserTable.id, userId))
        .limit(1);

      const coordinatorSections: SectionType[] = coordinator?.section ?? [];
      const coordinatorDeparment = coordinator?.department;

      const response = await db
        .select({
          id: InternshipTable.internshipId,
          name: UserTable.name,
          profile: UserTable.profile,
          section: UserTable.section,
          course: StudentTable.course,
          yearLevel: StudentTable.yearLevel,
          companyName: CompanyTable.name,
          progress: sum(ProgressTable.hours),
          totalRequiredHours: InternshipTable.totalOfHoursRequired,
          status: InternshipTable.status,
        })
        .from(ProgressTable)
        .innerJoin(
          InternshipTable,
          eq(InternshipTable.internshipId, ProgressTable.internshipId),
        )
        .innerJoin(StudentTable, eq(StudentTable.id, InternshipTable.userId))
        .innerJoin(
          CompanyTable,
          eq(CompanyTable.companyId, InternshipTable.companyId),
        )
        .innerJoin(UserTable, eq(UserTable.id, InternshipTable.userId))
        .where(
          and(
            eq(UserTable.department, coordinatorDeparment!),
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
          UserTable.section,
          StudentTable.course,
        )
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
