import { generateUUID } from "@/lib/utils";
import { db } from "@/server/db";
import { progressLog as ProgressLogTable } from "@/server/db/schema/internship";
import { TRPCError } from "@trpc/server";

export const markAsExcused = async ({
  internshipId,
}: {
  internshipId: string;
}) => {
  try {
    const progressId = generateUUID();

    await db
      .insert(ProgressLogTable)
      .values({
        progressId,
        internshipId,
        logDate: new Date(),
        hours: 0,
        description: "Absent (Excused)",
      })
      .execute();
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: (error as Error).message,
    });
  }
};
