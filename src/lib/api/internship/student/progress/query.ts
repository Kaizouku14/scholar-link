import { db, eq, sum } from "@/server/db";
import {
  progressLog as ProgressLogTable,
  internship as InternshipTable,
} from "@/server/db/schema/internship";

export const getStudentLogProgress = async ({ userId }: { userId: string }) => {
  const response = await db
    .select({
      totalHoursRequired: InternshipTable.totalOfHoursRequired,
      dateLogs: ProgressLogTable.logDate,
      hoursLog: ProgressLogTable.hours,
    })
    .from(ProgressLogTable)
    .innerJoin(
      InternshipTable,
      eq(ProgressLogTable.internshipId, InternshipTable.internshipId),
    )
    .where(eq(InternshipTable.userId, userId))
    .execute();

  return response;
};
