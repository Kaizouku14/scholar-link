import { db, eq, and } from "@/server/db";
import { TRPCError } from "@trpc/server";
import {
  internship as InternshipTable,
  progressLog as ProgressLogTable,
  company as CompanyTable,
} from "@/server/db/schema/internship";
import { generateUUID } from "@/lib/utils";
import type { departmentType } from "@/constants/departments";
import { departmentHoursMap } from "@/constants/hours";

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

    const internshipId = internship[0]!.internshipId;

    const existingLog = await tx
      .select()
      .from(ProgressLogTable)
      .where(
        and(
          eq(ProgressLogTable.internshipId, internshipId),
          eq(ProgressLogTable.logDate, logDate),
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

    await tx
      .update(InternshipTable)
      .set({ status: "in-progress" })
      .where(eq(InternshipTable.internshipId, internshipId));
  });
};

export const createStudentInternship = async ({
  userId,
  department,
  name,
  address,
  contactPerson,
  contactEmail,
  contactNo,
}: {
  userId: string;
  department: departmentType;
  name: string;
  address: string;
  contactPerson: string;
  contactEmail: string;
  contactNo: string;
}) => {
  const internship = await db
    .select({
      internshipId: InternshipTable.internshipId,
      companyId: InternshipTable.companyId,
    })
    .from(InternshipTable)
    .where(eq(InternshipTable.userId, userId))
    .limit(1);

  if (internship.length > 0 && internship[0]!.companyId) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "You already have a company linked to your internship.",
    });
  }

  await db.transaction(async (tx) => {
    const companyId = generateUUID();
    const internshipId = generateUUID();
    const totalHoursRequired = departmentHoursMap[department];
    const startDate = new Date();

    await tx.insert(CompanyTable).values({
      companyId,
      name,
      address,
      contactPerson,
      contactEmail,
      contactNo,
    });

    await tx.insert(InternshipTable).values({
      internshipId,
      userId,
      companyId,
      startDate,
      totalOfHoursRequired: totalHoursRequired,
    });
  });
};
