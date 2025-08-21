import { db, eq, desc } from "@/server/db";
import {
  progressLog as ProgressLogTable,
  internship as InternshipTable,
  company as CompanyTable,
} from "@/server/db/schema/internship";

export const getStudentLogProgress = async ({ userId }: { userId: string }) => {
  const response = await db
    .select({
      progressId: ProgressLogTable.progressId,
      dateLogs: ProgressLogTable.logDate,
      hoursLog: ProgressLogTable.hours,
      description: ProgressLogTable.description,

      companyName: CompanyTable.name,
      companyAddress: CompanyTable.address,
      //   startDate: InternshipTable.startDate,
      //   endDate: InternshipTable.endDate,
    })
    .from(ProgressLogTable)
    .innerJoin(
      InternshipTable,
      eq(ProgressLogTable.internshipId, InternshipTable.internshipId),
    )
    .innerJoin(
      CompanyTable,
      eq(CompanyTable.companyId, InternshipTable.companyId),
    )
    .where(eq(InternshipTable.userId, userId))
    .orderBy(desc(ProgressLogTable.logDate))
    .execute();

  return response;
};
