import type { submissionType } from "@/constants/scholarship/submittion-type";
import type { ScholarshipPrograms } from "@/interfaces/scholarship/program";
import type { Requirement } from "@/interfaces/scholarship/requirements";
import { generateUUID } from "@/lib/utils";
import { db, eq, sql, and } from "@/server/db";
import {
  scholarshipProgram as ProgramTable,
  programCoodinators as ProgramCoordinatorTable,
  requirements as RequirementsTable,
  applications as ApplicationsTable,
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

export const updateProgramStatus = async ({
  programId,
  deadline,
  submissionType,
  slots,
  requirements,
}: {
  programId: string;
  deadline: Date;
  submissionType: submissionType;
  slots: number;
  requirements?: Requirement[];
}) => {
  try {
    await db.transaction(async (tx) => {
      await tx
        .update(ProgramTable)
        .set({
          deadline,
          submissionType,
          slots,
          isActive: true,
        })
        .where(eq(ProgramTable.programId, programId));

      await tx
        .insert(RequirementsTable)
        .values(
          requirements!.map((r) => ({
            requirementId: r.requirementId,
            programId,
            label: r.label,
            description: r.description,
            isRequired: r.isRequired,
          })),
        )
        .onConflictDoUpdate({
          target: [RequirementsTable.requirementId],
          set: {
            label: sql`excluded.label`,
            description: sql`excluded.description`,
            isRequired: sql`excluded.is_required`,
          },
        });

      await tx
        .update(ApplicationsTable)
        .set({
          status: "for-renewal",
        })
        .where(
          and(
            eq(ApplicationsTable.programId, programId),
            eq(ApplicationsTable.status, "active"),
          ),
        )
        .execute();
    });
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Failed to update scholarship program availability," +
        (error as Error).message,
    });
  }
};
