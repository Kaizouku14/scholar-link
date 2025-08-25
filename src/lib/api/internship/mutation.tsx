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
import {
  authorizedEmail as AuthorizedEmailTable,
  user as UserTable,
} from "@/server/db/schema/auth";
import { isEmailAuthorized } from "../auth/mutation";

export const insertStudentInternship = async ({
  data,
}: {
  data: createInternship;
}) => {
  await db.transaction(async (tx) => {
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

    const internshipId = generateUUID();
    const supervisorId = generateUUID();
    const authorizedEmailId = generateUUID();
    const totalHoursRequired = departmentHoursMap[data.department];

    let companyId: string;
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
      contactNo: data.contactNo,
      email: data.contactEmail,
    });

    await tx.insert(InternshipTable).values({
      internshipId,
      userId: data.userId,
      supervisorId,
      companyId,
      duration: data.duration,
      totalOfHoursRequired: totalHoursRequired,
    });

    const [user] = await tx
      .select({ email: UserTable.email })
      .from(UserTable)
      .where(eq(UserTable.id, data.userId))
      .limit(1);

    const isAuthorized = await isEmailAuthorized({ email: user!.email });
    if (user && !isAuthorized) {
      await tx.insert(AuthorizedEmailTable).values({
        id: authorizedEmailId,
        email: user.email,
      });
    }
  });
};
