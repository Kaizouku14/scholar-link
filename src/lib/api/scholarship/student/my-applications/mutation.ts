import type { UploadedRequirement } from "@/interfaces/scholarship/application";
import { generateUUID } from "@/lib/utils";
import { deleteFilesIfExist } from "@/server/api/uploadthing";
import { db, eq, and } from "@/server/db";
import {
  scholarsDocuments as ScholarsDocumentsTable,
  applications as ApplicationsTable,
} from "@/server/db/schema/scholarship";
import { TRPCError } from "@trpc/server";

export const submitRenewalApplication = async ({
  applicationId,
  requirements,
}: {
  applicationId: string;
  requirements: Record<string, UploadedRequirement>;
}) => {
  try {
    await db.transaction(async (tx) => {
      for (const values of Object.values(requirements)) {
        const { label, url, key } = values;

        const existingDocs = await tx
          .select({
            id: ScholarsDocumentsTable.id,
            documentKey: ScholarsDocumentsTable.documentKey,
          })
          .from(ScholarsDocumentsTable)
          .where(
            and(
              eq(ScholarsDocumentsTable.documentName, label),
              eq(ScholarsDocumentsTable.applicationsId, applicationId),
            ),
          );

        if (existingDocs.length > 0) {
          await deleteFilesIfExist(
            existingDocs.map((d) => d.documentKey) as string[],
          );

          await tx
            .update(ScholarsDocumentsTable)
            .set({
              documentKey: key,
              documentUrl: url,
              updatedAt: new Date(),
              reviewed: false,
            })
            .where(eq(ScholarsDocumentsTable.id, existingDocs[0]!.id));
        } else {
          await tx.insert(ScholarsDocumentsTable).values({
            id: generateUUID(),
            applicationsId: applicationId,
            submittedAt: new Date(),
            documentName: label,
            documentKey: key,
            documentUrl: url,
          });
        }

        await tx
          .update(ApplicationsTable)
          .set({ status: "renewal" })
          .where(eq(ApplicationsTable.applicationsId, applicationId));
      }
    });
  } catch (error) {
    const uploadedFileKeys = Object.values(requirements).map((req) => req.key);

    if (uploadedFileKeys.length > 0) {
      await deleteFilesIfExist(uploadedFileKeys);
    }

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Failed to submit renewal application," + (error as Error).message,
    });
  }
};
