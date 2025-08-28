import { db, eq, desc } from "@/server/db";
import {
  progressLog as ProgressLogTable,
  internship as InternshipTable,
  company as CompanyTable,
} from "@/server/db/schema/internship";

export const getStudentLogProgress = async ({ userId }: { userId: string }) => {
  const progress = await db
    .select({
      dateLogs: ProgressLogTable.logDate,
      hoursLog: ProgressLogTable.hours,
      description: ProgressLogTable.description,
    })
    .from(ProgressLogTable)
    .innerJoin(
      InternshipTable,
      eq(ProgressLogTable.internshipId, InternshipTable.internshipId),
    )
    .where(eq(InternshipTable.userId, userId))
    .orderBy(desc(ProgressLogTable.logDate))
    .execute();

  const [internshipDetails] = await db
    .select({
      companyName: CompanyTable.name,
      companyAddress: CompanyTable.address,
      totalHoursRequired: InternshipTable.totalOfHoursRequired,
      duration: InternshipTable.duration,
    })
    .from(InternshipTable)
    .innerJoin(
      CompanyTable,
      eq(CompanyTable.companyId, InternshipTable.companyId),
    )
    .where(eq(InternshipTable.userId, userId))
    .limit(1)
    .execute();

  return {
    progress,
    internshipDetails,
  };
};
