import { countDistinct, db, eq } from "@/server/db";
import { TRPCError } from "@trpc/server";
import {
  company as CompanyTable,
  supervisor as SupervisorTable,
  internship as InternshipTable,
} from "@/server/db/schema/internship";

export const getAllCompany = async () => {
  try {
    const response = await db
      .select({
        companyId: CompanyTable.companyId,
        name: CompanyTable.name,
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
      .leftJoin(
        SupervisorTable,
        eq(InternshipTable.supervisorId, SupervisorTable.supervisorId),
      )
      .where(eq(InternshipTable.status, "in-progress"))
      .execute();

    return response ?? [];
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get all company," + (error as Error).message,
    });
  }
};

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
      .execute();

    return response ?? [];
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get all company," + (error as Error).message,
    });
  }
};
