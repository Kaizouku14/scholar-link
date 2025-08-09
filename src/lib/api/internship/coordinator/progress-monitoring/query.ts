import { db, eq } from "@/server/db";
import { user as UserTable } from "@/server/db/schema/auth";
import {
  progressLog as ProgressTable,
  internship as InternshipTable,
} from "@/server/db/schema/internship";

export const getStudentProgressByDept = async ({
  department,
}: {
  deparment: string;
}) => {
  const response = await db
    .select({})
    .from(ProgressTable)
    .innerJoin(
      InternshipTable,
      eq(InternshipTable.internshipId, ProgressTable.internshipId),
    )
    .innerJoin(UserTable, eq(UserTable.id, InternshipTable.userId))
    .where(eq(UserTable.department, department));
};
