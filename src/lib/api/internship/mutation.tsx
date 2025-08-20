import { generateUUID } from "@/lib/utils";
import { db, eq, or } from "@/server/db";
import { TRPCError } from "@trpc/server";
import {
  internship as InternshipTable,
  company as CompanyTable,
  supervisor as SupervisorTable,
} from "@/server/db/schema/internship";
import { departmentHoursMap } from "@/constants/internship/hours";
import type { createInternship } from "@/interfaces/internship/internship";

export const createStudentInternship = async ({
  data,
}: {
  data: createInternship;
}) => {
  const internship = await db
    .select({
      internshipId: InternshipTable.internshipId,
      companyId: InternshipTable.companyId,
    })
    .from(InternshipTable)
    .where(eq(InternshipTable.userId, data.userId))
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
    const totalHoursRequired = departmentHoursMap[data.department];

    const [companyExist] = await tx
      .select({ companyId: CompanyTable.companyId })
      .from(CompanyTable)
      .where(
        or(
          eq(CompanyTable.name, data.name),
          eq(CompanyTable.companyId, data.name),
        ),
      )
      .limit(1);

    if (!companyExist) {
      companyId = generateUUID();
      await tx.insert(CompanyTable).values({
        companyId,
        name: data.name,
        address: data.address,
      });
    } else {
      companyId = companyExist.companyId;
    }

    await tx.insert(SupervisorTable).values({
      supervisorId,
      name: data.contactPerson,
      email: data.contactEmail,
      contactNo: data.contactEmail,
    });

    await tx.insert(InternshipTable).values({
      internshipId,
      userId: data.userId,
      companyId,
      supervisorId,
      startDate: data.startDate,
      endDate: data.endDate,
      totalOfHoursRequired: totalHoursRequired,
    });

    await tx
      .update(InternshipTable)
      .set({ status: "in-progress" })
      .where(eq(InternshipTable.internshipId, internshipId));
  });
};
