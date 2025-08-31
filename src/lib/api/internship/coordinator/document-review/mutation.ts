import { generateUUID, slugify } from "@/lib/utils";
import { db, eq } from "@/server/db";
import {
  document as DocumentTable,
  internDocuments as InternDocumentsTable,
} from "@/server/db/schema/internship";
import { mailTable } from "@/server/db/schema/mail";
import { TRPCError } from "@trpc/server";

export const postDocument = async ({
  documentType,
  deadline,
}: {
  documentType: string;
  deadline: Date;
}) => {
  await db
    .transaction(async (tx) => {
      const document = slugify(documentType);
      const documentExist = await tx
        .select({ documentType: DocumentTable.documentType })
        .from(DocumentTable)
        .where(eq(DocumentTable.documentType, document))
        .limit(1)
        .execute();

      if (documentExist.length > 0) {
        await tx
          .update(DocumentTable)
          .set({ deadline })
          .where(eq(DocumentTable.documentType, document))
          .execute();
      } else {
        await tx
          .insert(DocumentTable)
          .values({ documentType: document, deadline })
          .execute();
      }
    })
    .catch((error) => {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to post document," + (error as Error).message,
      });
    });
};

export const approvedDocument = async ({
  documentId,
}: {
  documentId: string;
}) => {
  try {
    await db
      .update(InternDocumentsTable)
      .set({ reviewStatus: "approved" })
      .where(eq(InternDocumentsTable.documentId, documentId))
      .execute();
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to approved document," + (error as Error).message,
    });
  }
};

export const rejectDocument = async ({
  documentId,
  userId,
  receiverId,
  subject,
  reason,
}: {
  documentId: string;
  userId: string;
  receiverId: string;
  subject: string;
  reason: string;
}) => {
  return await db
    .transaction(async (tx) => {
      const id = generateUUID();
      const threadId = generateUUID();

      await tx
        .update(InternDocumentsTable)
        .set({ reviewStatus: "rejected" })
        .where(eq(InternDocumentsTable.documentId, documentId))
        .execute();

      await tx.insert(mailTable).values({
        id,
        threadId,
        sender: userId,
        receiver: receiverId,
        subject,
        content: reason,
        date: new Date(),
      });
    })
    .catch((error) => {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to reject document," + (error as Error).message,
      });
    });
};
