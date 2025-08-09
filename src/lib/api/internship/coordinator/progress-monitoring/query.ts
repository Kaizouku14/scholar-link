import type { departmentType } from "@/constants/departments";
import { db, eq } from "@/server/db";
import { user as UserTable } from "@/server/db/schema/auth";
import {
  progressLog as ProgressTable,
  internship as InternshipTable,
} from "@/server/db/schema/internship";
import { TRPCError } from "@trpc/server";

export const getStudentProgressByDept = async ({
  department,
}: {
  department: departmentType;
}) => {
  try {
    const response = await db
      .select({})
      .from(ProgressTable)
      .innerJoin(
        InternshipTable,
        eq(InternshipTable.internshipId, ProgressTable.internshipId),
      )
      .innerJoin(UserTable, eq(UserTable.id, InternshipTable.userId))
      .where(eq(UserTable.department, department))
      .execute();

    return response ?? [];
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get student progress: " + (error as Error).message,
    });
  }
};
