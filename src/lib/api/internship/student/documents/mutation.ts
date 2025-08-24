import { generateUUID } from "@/lib/utils";
import { db, eq, and } from "@/server/db";
import { internDocuments as internDocumentsTable } from "@/server/db/schema/internship";
import { deleteFileIfExists } from "@/server/api/uploadthing";
import { TRPCError } from "@trpc/server";

export const insertDocument = async ({
  userId,
  documentType,
  documentUrl,
  documentKey,
}: {
  userId: string;
  documentType: string;
  documentUrl: string;
  documentKey: string;
}) => {
  let oldFileKeyToDelete: string | null = null;

  await db.transaction(async (tx) => {
    const documentExist = await tx
      .select({
        documentKey: internDocumentsTable.documentKey,
      })
      .from(internDocumentsTable)
      .where(
        and(
          eq(internDocumentsTable.documentType, documentType),
          eq(internDocumentsTable.internId, userId),
        ),
      )
      .execute();

    if (documentExist.length > 0) {
      const oldFileKey = documentExist[0]?.documentKey;
      if (oldFileKey && oldFileKey !== documentKey) {
        oldFileKeyToDelete = oldFileKey;
      }

      await tx
        .update(internDocumentsTable)
        .set({
          documentKey,
          documentUrl,
          submittedAt: new Date(),
        })
        .where(
          and(
            eq(internDocumentsTable.documentType, documentType),
            eq(internDocumentsTable.internId, userId),
          ),
        )
        .execute();
    } else {
      await tx
        .insert(internDocumentsTable)
        .values({
          documentId: generateUUID(),
          internId: userId,
          documentType,
          documentUrl,
          documentKey,
          submittedAt: new Date(),
        })
        .execute();
    }
  });

  if (oldFileKeyToDelete) {
    try {
      await deleteFileIfExists(oldFileKeyToDelete);
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete old file" + (error as Error).message,
      });
    }
  }
};
