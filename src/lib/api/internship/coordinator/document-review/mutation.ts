import type { documentsType } from "@/constants/documents";
import { db, eq } from "@/server/db";
import { document as DocumentTable } from "@/server/db/schema/internship";

export const createDocument = async ({
  documentType,
  deadline,
}: {
  documentType: documentsType;
  deadline: Date;
}) => {
  await db.transaction(async (tx) => {
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
  });
};
