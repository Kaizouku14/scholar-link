import { db } from "@/server/db";
import {
  scholarshipProgram as ProgramTable,
  requirements as RequirementsTable,
} from "@/server/db/schema/scholarship";
import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";

export const getAllActivePrograms = async () => {
  try {
    const response = await db
      .select({
        programId: ProgramTable.programId,
        name: ProgramTable.name,
        imageUrl: ProgramTable.imageUrl,
        slots: ProgramTable.slots,
        deadline: ProgramTable.deadline,
        description: ProgramTable.description,
        submissionType: ProgramTable.submissionType,
      })
      .from(ProgramTable)
      .where(eq(ProgramTable.isActive, true))
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

export const getProgramById = async (programId: string) => {
  try {
    const [program] = await db
      .select()
      .from(ProgramTable)
      .where(eq(ProgramTable.programId, programId))
      .limit(1)
      .execute();

    const requirements = await db
      .select()
      .from(RequirementsTable)
      .where(eq(RequirementsTable.programId, programId))
      .execute();

    return {
      program,
      requirements,
    };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Failed to fetch scholarships program," + (error as Error).message,
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
