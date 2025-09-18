import { db } from "@/server/db";
import {
  applications as ApplicationsTable,
  scholarshipProgram as ProgramTable,
  requirements as RequirementsTable,
} from "@/server/db/schema/scholarship";
import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";

export const checkIfUserAlreadyApplied = async ({
  email,
}: {
  email: string;
}) => {
  try {
    const [application] = await db
      .select({ id: ApplicationsTable.applicationsId })
      .from(ProgramTable)
      .where(eq(ProgramTable.programId, programId))
      .limit(1)
      .execute();

    return !!application;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Failed to fetch scholarships program," + (error as Error).message,
    });
  }
};

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
