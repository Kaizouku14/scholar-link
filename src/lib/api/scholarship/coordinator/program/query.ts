import { db, desc } from "@/server/db";
import { scholarshipProgram as ProgramTable } from "@/server/db/schema/scholarship";
import { TRPCError } from "@trpc/server";

export const getAllPrograms = async () => {
  try {
    const response = await db
      .select({
        programId: ProgramTable.programId,
        name: ProgramTable.name,
        imageUrl: ProgramTable.imageUrl,
        isActive: ProgramTable.isActive,
        slots: ProgramTable.slots,
        deadline: ProgramTable.deadline,
        type: ProgramTable.type,
        description: ProgramTable.description,
        section: ProgramTable.section,
        submissionType: ProgramTable.submissionType,
      })
      .from(ProgramTable)
      .orderBy(desc(ProgramTable.deadline))
      .execute();

    return response;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Failed to get all scholarship programs," + (error as Error).message,
    });
  }
};

export const getAllScholarshipType = async () => {
  try {
    const response = await db
      .select({ type: ProgramTable.type })
      .from(ProgramTable)
      .execute();

    return response.map((type) => type.type);
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Failed to fetch scholarships program types," +
        (error as Error).message,
    });
  }
};
