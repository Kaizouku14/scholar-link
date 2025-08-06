import { db, eq, and } from "@/server/db";
import { TRPCError } from "@trpc/server";
import {
  internship as InternshipTable,
  progressLog as ProgressLogTable,
  company as CompanyTable,
} from "@/server/db/schema/internship";
import { generateUUID } from "@/lib/utils";
import type { departmentType } from "@/constants/departments";

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

  const internshipId = internship[0]!.internshipId;

  // Check if progress for the same date already exists
  const existingLog = await db
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

  await db.insert(ProgressLogTable).values({
    progressId: generateUUID(),
    internshipId,
    logDate,
    hours,
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
  department: string;
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

  const departmentHoursMap: Record<departmentType, number> = {
    ITDS: 600,
    BEED: 450,
    GATE: 450,
  };

  const totalHoursRequired = departmentHoursMap[department as departmentType];

  await db.transaction(async (tx) => {
    const newCompanyId = generateUUID();
    const newInternshipId = generateUUID();

    await tx.insert(CompanyTable).values({
      companyId: newCompanyId,
      name,
      address,
      contactPerson,
      contactEmail,
      contactNo,
    });

    await tx.insert(InternshipTable).values({
      internshipId: newInternshipId,
      userId,
      companyId: newCompanyId,
      startDate: new Date(),
      totalOfHoursRequired: totalHoursRequired,
    });
  });
};
