import type { documentsType } from "@/constants/documents";
import { generateUUID } from "@/lib/utils";
import { db } from "@/server/db";
import { internDocuments as internDocumentsTable } from "@/server/db/schema/internship";
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
    await db
      .insert(internDocumentsTable)
      .values({
        documentsId: generateUUID(),
        internId: userId,
        documentType,
        documentUrl,
        documentKey,
        submittedAt: new Date(),
      })
      .execute();
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to insert document," + (error as Error).message,
    });
  }
};
