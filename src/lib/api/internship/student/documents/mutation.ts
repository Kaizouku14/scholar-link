import type { documentsType } from "@/constants/documents";
import { generateUUID } from "@/lib/utils";
import { db, eq, and } from "@/server/db";
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
    const documentExist = await db
      .select({
        documentType: internDocumentsTable.documentType,
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
      await db
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
    }
  } catch (error) {
    console.error("Insert error:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to insert document," + (error as Error).message,
    });
  }
};
