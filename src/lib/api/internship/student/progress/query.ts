import { db, eq, desc } from "@/server/db";
import {
  progressLog as ProgressLogTable,
  internship as InternshipTable,
} from "@/server/db/schema/internship";

export const getStudentLogProgress = async ({ userId }: { userId: string }) => {
  const response = await db
    .select({
      dateLogs: ProgressLogTable.logDate,
      hoursLog: ProgressLogTable.hours,
      description: ProgressLogTable.description,
      startDate: InternshipTable.startDate,
      endDate: InternshipTable.endDate,
    })
    .from(ProgressLogTable)
    .innerJoin(
      InternshipTable,
      eq(ProgressLogTable.internshipId, InternshipTable.internshipId),
    )
    .where(eq(InternshipTable.userId, userId))
    .orderBy(desc(ProgressLogTable.logDate))
    .execute();

  return response;
};
