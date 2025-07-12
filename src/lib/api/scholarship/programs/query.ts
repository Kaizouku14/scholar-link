import { db } from "@/server/db";
import { scholarshipProgram } from "@/server/db/schema/scholarship";
import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";

export const getAllActivePrograms = async () => {
  try {
    const response = await db
      .select({
        programId: scholarshipProgram.programId,
        name: scholarshipProgram.name,
        imageUrl: scholarshipProgram.imageUrl,
        slots: scholarshipProgram.slots,
        deadline: scholarshipProgram.deadline,
        location: scholarshipProgram.location,
        description: scholarshipProgram.description,
        submissionType: scholarshipProgram.submissionType,
      })
      .from(scholarshipProgram)
      .where(eq(scholarshipProgram.isActive, true))
      .orderBy(desc(scholarshipProgram.deadline))
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
        programId: scholarshipProgram.programId,
        name: scholarshipProgram.name,
        imageUrl: scholarshipProgram.imageUrl,
        isActive: scholarshipProgram.isActive,
        slots: scholarshipProgram.slots,
        deadline: scholarshipProgram.deadline,
        location: scholarshipProgram.location,
        type: scholarshipProgram.type,
        description: scholarshipProgram.description,
        submissionType: scholarshipProgram.submissionType,
      })
      .from(scholarshipProgram)
      .orderBy(desc(scholarshipProgram.deadline))
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
    const response = await db
      .select()
      .from(scholarshipProgram)
      .where(eq(scholarshipProgram.programId, programId))
      .limit(1)
      .execute();

    return response[0] ?? null;
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
      .select({ type: scholarshipProgram.type })
      .from(scholarshipProgram)
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
