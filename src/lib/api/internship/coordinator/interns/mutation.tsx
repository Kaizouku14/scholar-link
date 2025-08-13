import type { departmentType } from "@/constants/departments";
import { generateUUID } from "@/lib/utils";
import { db, eq, or } from "@/server/db";
import { TRPCError } from "@trpc/server";
import {
  internship as InternshipTable,
  company as CompanyTable,
  supervisor as SupervisorTable,
} from "@/server/db/schema/internship";
import { departmentHoursMap } from "@/constants/hours";

export const createStudentInternship = async ({
  userId,
  department,
  name,
  address,
  contactPerson,
  contactEmail,
  contactNo,
  startDate,
  endDate,
}: {
  userId: string;
  department: departmentType;
  name: string;
  address: string;
  contactPerson: string;
  contactEmail: string;
  contactNo: string;
  startDate: Date;
  endDate: Date;
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
      message: "This student already has an internship.",
    });
  }

  await db.transaction(async (tx) => {
    let companyId: string;
    const supervisorId = generateUUID();
    const internshipId = generateUUID();
    const totalHoursRequired = departmentHoursMap[department];

    const [companyExist] = await tx
      .select({ companyId: CompanyTable.companyId })
      .from(CompanyTable)
      .where(or(eq(CompanyTable.name, name), eq(CompanyTable.companyId, name)))
      .limit(1);

    if (!companyExist) {
      companyId = generateUUID();
      await tx.insert(CompanyTable).values({
        companyId,
        name,
        address,
      });
    } else {
      companyId = companyExist.companyId;
    }

    await tx.insert(SupervisorTable).values({
      supervisorId,
      name: contactPerson,
      email: contactEmail,
      contactNo,
    });

    await tx.insert(InternshipTable).values({
      internshipId,
      userId,
      companyId,
      supervisorId,
      startDate,
      endDate,
      totalOfHoursRequired: totalHoursRequired,
    });

    await tx
      .update(InternshipTable)
      .set({ status: "in-progress" })
      .where(eq(InternshipTable.internshipId, internshipId));
  });
};
