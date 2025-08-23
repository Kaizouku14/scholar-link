import { db } from "@/server/db";
import { company as CompanyTable } from "@/server/db/schema/internship";
import { TRPCError } from "@trpc/server";

export const getAllCompanyRecords = async () => {
  try {
    const response = await db
      .select({
        id: CompanyTable.companyId,
        name: CompanyTable.name,
        address: CompanyTable.address,
      })
      .from(CompanyTable)
      .execute();

    return response;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: (error as Error).message,
    });
  }
};
