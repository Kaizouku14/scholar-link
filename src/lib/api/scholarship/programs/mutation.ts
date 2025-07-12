import type { submissionType } from "@/constants/submittion-type";
import { generateUUID } from "@/lib/utils";
import { db, eq } from "@/server/db";
import { scholarshipProgram } from "@/server/db/schema/scholarship";
import type {
  FormFieldProps,
  ScholarshipFormData,
} from "@/types/scholarship-form";
import { TRPCError } from "@trpc/server";

export const createScholarshipProgram = async ({
  basicInfo,
  formFields,
  additionalInfo,
}: {
  basicInfo: ScholarshipFormData;
  formFields: FormFieldProps[];
  additionalInfo: string;
}) => {
  const programId = generateUUID();

  try {
    const [scholarshipResponse] = await db
      .insert(scholarshipProgram)
      .values({
        programId: programId,
        ...basicInfo,
        requirements: formFields, //TODO: FIX TYPE ERROR
        additionalInfo: JSON.parse(additionalInfo),
      })
      .returning();

    console.log(scholarshipResponse);

    if (!scholarshipResponse) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Failed to create scholarship program!",
      });
    }
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Failed to create scholarship program," + (error as Error).message,
    });
  }
};

export const disableScholarshipProgram = async ({
  programId,
}: {
  programId: string;
}) => {
  try {
    const response = await db
      .update(scholarshipProgram)
      .set({ isActive: false })
      .where(eq(scholarshipProgram.programId, programId));

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
      .update(scholarshipProgram)
      .set({
        deadline,
        submissionType,
        slots,
        isActive: true,
      })
      .where(eq(scholarshipProgram.programId, programId));

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
