import type { scholarshipStatusType } from "@/constants/users/status";
import { db, eq } from "@/server/db";
import {
  applications as ApplicationsTable,
  scholarsDocuments as ScholarsDocumentTable,
} from "@/server/db/schema/scholarship";
import { sendEmail } from "@/services/email";
import { TRPCError } from "@trpc/server";
import { authorizeEmail, isEmailAuthorized } from "../../../auth/mutation";

export const updateApplicationStatus = async ({
  applicationId,
  name,
  email,
  programName,
  status,
  subject,
  template,
}: {
  applicationId: string;
  name: string;
  email: string;
  programName: string;
  status: scholarshipStatusType;
  subject: string;
  template: (args: { programName: string; name: string }) => string;
}) => {
  try {
    await db
      .update(ApplicationsTable)
      .set({ status })
      .where(eq(ApplicationsTable.applicationsId, applicationId))
      .execute();

    await sendEmail({
      to: email,
      subject,
      html: template({ programName, name }),
    });

    if (status === "active") {
      const isAuthorized = await isEmailAuthorized({ email });
      if (!isAuthorized) await authorizeEmail({ email });
    }
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Failed to update application status: ${(error as Error).message}`,
    });
  }
};

export const markDocumentAsReviewed = async ({
  documentId,
  reviewed,
}: {
  documentId: string;
  reviewed: boolean;
}) => {
  try {
    await db
      .update(ScholarsDocumentTable)
      .set({ reviewed })
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
