import { db, eq, and, isNull, desc, gt, sql } from "@/server/db";
import { TRPCError } from "@trpc/server";
import {
  document as DocumentsTable,
  internDocuments as InternDocumentsTable,
} from "@/server/db/schema/internship";

export const getAllDocumentsAvailable = async () => {
  try {
    const response = await db
      .select({
        documentType: DocumentsTable.documentType,
      })
      .from(DocumentsTable)
      .execute();
    return response;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get documents," + (error as Error).message,
    });
  }
};

export const getAllUpcomingDeadlines = async ({
  userId,
}: {
  userId: string;
}) => {
  try {
    const now = Math.floor(Date.now() / 1000);

    const response = await db
      .select({
        name: DocumentsTable.documentType,
        deadline: DocumentsTable.deadline,
      })
      .from(DocumentsTable)
      .leftJoin(
        InternDocumentsTable,
        and(
          eq(DocumentsTable.documentType, InternDocumentsTable.documentType),
          eq(InternDocumentsTable.internId, userId),
        ),
      )
      .where(
        and(
          isNull(InternDocumentsTable.submittedAt),
          gt(DocumentsTable.deadline, sql`${now}`),
        ),
      )
      .orderBy(desc(DocumentsTable.deadline));

    return response ?? [];
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Failed to get all upcoming deadlines," + (error as Error).message,
    });
  }
};

export const getAllUploadedDocuments = async ({
  userId,
}: {
  userId: string;
}) => {
  try {
    const response = await db
      .select({
        documentId: InternDocumentsTable.documentId,
        documentType: InternDocumentsTable.documentType,
        documentUrl: InternDocumentsTable.documentUrl,
        submittedAt: InternDocumentsTable.submittedAt,
        status: InternDocumentsTable.reviewStatus,
      })
      .from(InternDocumentsTable)
      .where(eq(InternDocumentsTable.internId, userId))
      .execute();

    return response ?? [];
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get documents," + (error as Error).message,
    });
  }
};
