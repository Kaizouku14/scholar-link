import type { eligibilityType } from "@/constants/scholarship/eligiblity-type";
import type { submissionType } from "@/constants/scholarship/submittion-type";
import type { ScholarshipPrograms } from "@/interfaces/scholarship/program";
import type { Requirement } from "@/interfaces/scholarship/requirements";
import type { UpdateProgram } from "@/interfaces/scholarship/scholarship-card";
import { generateUUID } from "@/lib/utils";
import { deleteFilesIfExist } from "@/server/api/uploadthing";
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
  const fileKey = data.imageKey;

  try {
    await db.transaction(async (tx) => {
      const programId = generateUUID();

      await tx.insert(ProgramTable).values({
        programId: programId,
        name: data.name,
        description: data.description,
        section: data.section,
        slots: data.slots,
        type: data.type,
        eligibilityType: data.eligibilityType,
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
  } catch (error) {
    if (fileKey) {
      await deleteFilesIfExist(fileKey);
    }

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create program" + (error as Error).message,
    });
  }
};

export const updateProgram = async ({ data }: { data: UpdateProgram }) => {
  try {
    await db.transaction(async (tx) => {
      await tx
        .update(ProgramTable)
        .set({
          name: data.name,
          description: data.description,
          section: data.section,
          slots: data.slots,
          type: data.type,
          eligibilityType: data.eligibilityType,
          submissionType: data.submissionType,
          imageUrl: data.imageUrl,
          imageKey: data.imageKey,
          deadline: data.deadline,
        })
        .where(eq(ProgramTable.programId, data.programId));

      await tx
        .insert(RequirementsTable)
        .values(
          data.requirements.map((r) => ({
            requirementId: r.requirementId!,
            programId: data.programId,
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
    });
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to update program" + (error as Error).message,
    });
  }
};

export const updateProgramStatus = async ({
  programId,
  deadline,
  eligibilityType,
  submissionType,
  slots,
  requirements,
}: {
  programId: string;
  deadline: Date;
  eligibilityType: eligibilityType;
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
          eligibilityType,
          submissionType,
          slots,
          isActive: true,
          announcements: "",
        })
        .where(eq(ProgramTable.programId, programId));

      await tx
        .insert(RequirementsTable)
        .values(
          requirements!.map((r) => ({
            requirementId: r.requirementId!,
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

export const PostProgramAnnouncements = async ({
  programId,
  announcements,
}: {
  programId: string;
  announcements: string;
}) => {
  try {
    await db
      .update(ProgramTable)
      .set({
        announcements,
      })
      .where(eq(ProgramTable.programId, programId))
      .execute();
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to post program announcement" + (error as Error).message,
    });
  }
};

export const EditProgramSection = async ({
  programId,
  overview,
}: {
  programId: string;
  overview: string;
}) => {
  try {
    await db
      .update(ProgramTable)
      .set({
        section: overview,
      })
      .where(eq(ProgramTable.programId, programId))
      .execute();
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to Update" + (error as Error).message,
    });
  }
};
