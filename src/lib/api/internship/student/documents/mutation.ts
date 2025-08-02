import type { documentsType } from "@/constants/documents";
import { generateUUID } from "@/lib/utils";
import { db } from "@/server/db";
import { submission as SubmissionTable } from "@/server/db/schema/internship";
import { TRPCError } from "@trpc/server";

export const insertDocument = async ({
  userId,
  documentType,
  documentUrl,
  documentKey,
}: {
  userId: string;
  documentType: documentsType;
  documentUrl: string;
  documentKey: string;
}) => {
  try {
    const response = await db
      .insert(SubmissionTable)
      .values({
        submissionId: generateUUID(),
        internId: userId,
        documentType: documentType,
        documentUrl: documentUrl,
        documentKey: documentKey,
      })
      .returning()
      .execute();
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to insert document," + (error as Error).message,
    });
  }
};
