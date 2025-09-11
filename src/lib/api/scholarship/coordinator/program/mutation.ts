import type { submissionType } from "@/constants/scholarship/submittion-type";
import type { ScholarshipPrograms } from "@/interfaces/scholarship/program";
import { generateUUID } from "@/lib/utils";
import { db, eq } from "@/server/db";
import {
  scholarshipProgram as ProgramTable,
  programCoodinators as ProgramCoordinatorTable,
  requirements as RequirementsTable,
} from "@/server/db/schema/scholarship";
import { TRPCError } from "@trpc/server";

export const createScholarshipProgram = async ({
  data,
  userId,
}: {
  data: ScholarshipPrograms;
  userId: string;
}) => {
  await db.transaction(async (tx) => {
    const programId = generateUUID();

    await tx.insert(ProgramTable).values({
      programId: programId,
      name: data.name,
      description: data.description,
      section: data.section,
      slots: data.slots,
      type: data.type,
      submissionType: data.submissionType,
      imageUrl: data.imageUrl,
      imageKey: data.imageKey,
      deadline: data.deadline,
      isActive: true,
    });

    await tx.insert(ProgramCoordinatorTable).values({
      id: generateUUID(),
      programId,
      userId,
    });

    if (data.requirements && data.requirements?.length > 0) {
      for (const requirement of data.requirements) {
        await tx.insert(RequirementsTable).values({
          requirementId: generateUUID(),
          programId: programId,
          label: requirement.label,
          description: requirement.description,
          isRequired: requirement.isRequired,
        });
      }
    }
  });
};

export const disableScholarshipProgram = async ({
  programId,
}: {
  programId: string;
}) => {
  try {
    const response = await db
      .update(ProgramTable)
      .set({ isActive: false })
      .where(eq(ProgramTable.programId, programId));

    if (!response) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Failed to disable scholarship program status!",
      });
    }
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Failed to update scholarship program status," +
        (error as Error).message,
    });
  }
};

export const updateProgramAvailability = async ({
  programId,
  deadline,
  submissionType,
  slots,
}: {
  programId: string;
  deadline: Date;
  submissionType: submissionType;
  slots: number;
}) => {
  try {
    const response = await db
      .update(ProgramTable)
      .set({
        deadline,
        submissionType,
        slots,
        isActive: true,
      })
      .where(eq(ProgramTable.programId, programId));

    if (!response) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Failed to udpate scholarship program",
      });
    }
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Failed to update scholarship program availability," +
        (error as Error).message,
    });
  }
};
