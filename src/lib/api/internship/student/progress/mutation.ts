import { db, eq } from "@/server/db";
import { TRPCError } from "@trpc/server";
import {
  internship as InternshipTable,
  progressLog as ProgressLogTable,
} from "@/server/db/schema/internship";
import { generateUUID } from "@/lib/utils";

export const insertStudentProgress = async ({
  userId,
  logDate,
  hours,
}: {
  userId: string;
  logDate: Date;
  hours: number;
}) => {
  try {
    const internship = await db
      .select({
        internshipId: InternshipTable.internshipId,
      })
      .from(InternshipTable)
      .where(eq(InternshipTable.userId, userId));

    if (!internship.length) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "User must be assigned to a company before logging progress.",
      });
    }

    const id = generateUUID();
    await db.insert(ProgressLogTable).values({
      progressId: id,
      internshipId: internship[0]!.internshipId,
      logDate,
      hours,
    });
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to insert student progress," + (error as Error).message,
    });
  }
};

// //Arrow function
// export const createStudentProgress2 = () => {

// }
