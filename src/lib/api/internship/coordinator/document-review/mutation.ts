import type { documentsType } from "@/constants/internship/documents";
import { db, eq } from "@/server/db";
import { document as DocumentTable } from "@/server/db/schema/internship";
import { TRPCError } from "@trpc/server";

export const postDocument = async ({
  documentType,
  deadline,
}: {
  documentType: documentsType;
  deadline: Date;
}) => {
  await db
    .transaction(async (tx) => {
      const documentExist = await tx
        .select({ documentType: DocumentTable.documentType })
        .from(DocumentTable)
        .where(eq(DocumentTable.documentType, documentType))
        .limit(1)
        .execute();

      if (documentExist.length > 0) {
        await tx
          .update(DocumentTable)
          .set({ deadline })
          .where(eq(DocumentTable.documentType, documentType))
          .execute();
      } else {
        await tx
          .insert(DocumentTable)
          .values({ documentType, deadline })
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
