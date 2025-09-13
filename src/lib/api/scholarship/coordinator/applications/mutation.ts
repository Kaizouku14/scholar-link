import { db, eq } from "@/server/db";
import {
  applications as ApplicationsTable,
  scholarsDocuments as ScholarsDocumentTable,
} from "@/server/db/schema/scholarship";
import { sendEmail } from "@/services/email";
import { QualifiedApplicationTemplate } from "@/services/email-templates/qualifiedTemplate";
import { RejectApplicationTemplate } from "@/services/email-templates/rejectApplicationTemplate";
import { TRPCError } from "@trpc/server";

export const rejectApplication = async ({
  applicationId,
  email,
  programName,
  name,
}: {
  applicationId: string;
  email: string;
  programName: string;
  name: string;
}) => {
  try {
    await db
      .update(ApplicationsTable)
      .set({ status: "rejected" })
      .where(eq(ApplicationsTable.applicationsId, applicationId))
      .execute();

    await sendEmail({
      to: email,
      subject: "Scholarship Application Rejected",
      html: RejectApplicationTemplate({ programName, name }),
    });
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to reject application," + (error as Error).message,
    });
  }
};

export const markApplicationAsQualified = async ({
  applicationId,
  name,
  email,
  programName,
}: {
  applicationId: string;
  name: string;
  email: string;
  programName: string;
}) => {
  try {
    await db
      .update(ApplicationsTable)
      .set({ status: "qualified" })
      .where(eq(ApplicationsTable.applicationsId, applicationId))
      .execute();

    await sendEmail({
      to: email,
      subject: `Congratulations! You’re Qualified for the ${programName}`,
      html: QualifiedApplicationTemplate({ programName, name }),
    });
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Failed to mark application as qualified," + (error as Error).message,
    });
  }
};

export const markDocumentAsReviewed = async ({
  documentId,
  reviewStatus,
}: {
  documentId: string;
  reviewStatus: boolean;
}) => {
  try {
    await db
      .update(ScholarsDocumentTable)
      .set({ reviewStatus })
      .where(eq(ScholarsDocumentTable.id, documentId))
      .execute();
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Failed to mark document as reviewed," + (error as Error).message,
    });
  }
};
