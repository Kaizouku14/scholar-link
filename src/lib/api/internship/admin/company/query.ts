import { countDistinct, db, eq } from "@/server/db";
import { TRPCError } from "@trpc/server";
import {
  company as CompanyTable,
  internship as InternshipTable,
  supervisor as SupervisorTable,
} from "@/server/db/schema/internship";

export const getAllCompany = async () => {
  try {
    const response = await db
      .select({
        companyId: CompanyTable.companyId,
        companyName: CompanyTable.name,
        address: CompanyTable.address,
        contactPerson: SupervisorTable.name,
        contactPersonEmail: SupervisorTable.email,
        contactPersonNo: SupervisorTable.contactNo,
        internCount: countDistinct(InternshipTable.userId),
      })
      .from(CompanyTable)
      .leftJoin(
        InternshipTable,
        eq(CompanyTable.companyId, InternshipTable.companyId),
      )
      //   .where(eq(InternshipTable.status, "on-going"))
      .groupBy(CompanyTable.companyId)
      .execute();

    return response ?? [];
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get all company," + (error as Error).message,
    });
  }
};
