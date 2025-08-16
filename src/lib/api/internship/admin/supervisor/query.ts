import { countDistinct, db, eq } from "@/server/db";
import {
  company as CompanyTable,
  supervisor as SupervisorTable,
  internship as InternshipTable,
} from "@/server/db/schema/internship";
import { TRPCError } from "@trpc/server";

export const getAllSupervisor = async () => {
  try {
    const response = await db
      .select({
        supervisorId: SupervisorTable.supervisorId,
        supervisorName: SupervisorTable.name,
        supervisorEmail: SupervisorTable.email,
        supervisorContactNo: SupervisorTable.contactNo,
        companyName: CompanyTable.name,
        companyAddress: CompanyTable.address,
        internCount: countDistinct(InternshipTable.userId),
      })
      .from(SupervisorTable)
      .leftJoin(
        InternshipTable,
        eq(SupervisorTable.supervisorId, InternshipTable.supervisorId),
      )
      .leftJoin(
        CompanyTable,
        eq(InternshipTable.companyId, CompanyTable.companyId),
      )
      .where(eq(InternshipTable.status, "in-progress"))
      .groupBy(SupervisorTable.supervisorId)
      .execute();

    return response ?? [];
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get all company," + (error as Error).message,
    });
  }
};
