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
  const internship = await db
    .select({
      internshipId: InternshipTable.internshipId,
    })
    .from(InternshipTable)
    .where(eq(InternshipTable.userId, userId));

  if (!internship.length) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message:
        "You need to log a company first before you can record your progress.",
    });
  }

  const id = generateUUID();
  await db.insert(ProgressLogTable).values({
    progressId: id,
    internshipId: internship[0]!.internshipId,
    logDate,
    hours,
  });
};

// //Arrow function
// export const createStudentProgress2 = () => {

// }
