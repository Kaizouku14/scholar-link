import { db, eq, and, sum, gte, lte } from "@/server/db";
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
  await db.transaction(async (tx) => {
    const internship = await tx
      .select({
        internshipId: InternshipTable.internshipId,
        totalRequiredHours: InternshipTable.totalOfHoursRequired,
        currentHours: sum(ProgressLogTable.hours).as("currentHours"),
      })
      .from(InternshipTable)
      .leftJoin(
        ProgressLogTable,
        eq(InternshipTable.internshipId, ProgressLogTable.internshipId),
      )
      .where(eq(InternshipTable.userId, userId))
      .groupBy(
        InternshipTable.internshipId,
        InternshipTable.totalOfHoursRequired,
      );

    if (!internship.length) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message:
          "You need to contact your coordinator to create an internship.",
      });
    }

    if (!internship[0]) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internship data is missing.",
      });
    }

    const { internshipId, totalRequiredHours, currentHours } = internship[0];
    const completedHours = Number(currentHours ?? 0);

    if (completedHours >= totalRequiredHours) {
      await tx
        .update(InternshipTable)
        .set({ status: "completed" })
        .where(eq(InternshipTable.internshipId, internshipId));

      throw new TRPCError({
        code: "CONFLICT",
        message: "You have already completed your required hours.",
      });
    }

    // compare date ranges
    const inputDate = new Date(logDate);

    // Get start and end of the day for the input date
    const startOfDay = new Date(inputDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(inputDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingLog = await tx
      .select()
      .from(ProgressLogTable)
      .where(
        and(
          eq(ProgressLogTable.internshipId, internshipId),
          gte(ProgressLogTable.logDate, startOfDay),
          lte(ProgressLogTable.logDate, endOfDay),
        ),
      )
      .limit(1);

    if (existingLog.length > 0) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "You’ve already logged your progress for this date.",
      });
    }

    await tx.insert(ProgressLogTable).values({
      progressId: generateUUID(),
      internshipId,
      logDate,
      hours,
    });

    const newTotalHours = completedHours + hours;
    if (newTotalHours >= totalRequiredHours) {
      await tx
        .update(InternshipTable)
        .set({ status: "completed" })
        .where(eq(InternshipTable.internshipId, internshipId));
    }
  });
};
