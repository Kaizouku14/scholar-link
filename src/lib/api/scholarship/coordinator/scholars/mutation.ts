import type { scholarshipStatusType } from "@/constants/users/status";
import {
  authorizeEmail,
  isEmailAuthorized,
  revokeAuthorizedEmail,
} from "@/lib/api/auth/mutation";
import { db, eq, inArray } from "@/server/db";
import { authorizedEmail as AuthorizedEmailTable } from "@/server/db/schema/auth";
import { applications as ApplicationsTable } from "@/server/db/schema/scholarship";
import { sendEmail } from "@/services/email";
import { DocumentRenewalTemplate } from "@/services/email-templates/document-renewal-template";
import { TRPCError } from "@trpc/server";

export const updateActiveApplication = async ({
  applicationId,
  email,
  status,
}: {
  applicationId: string;
  email: string;
  status: scholarshipStatusType;
}) => {
  try {
    await db
      .update(ApplicationsTable)
      .set({ status })
      .where(eq(ApplicationsTable.applicationsId, applicationId))
      .execute();

    if (status === "inactive") {
      await revokeAuthorizedEmail({ email });
    } else {
      const authorized = await isEmailAuthorized({ email });
      if (!authorized) await authorizeEmail({ email });
    }
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Failed to update scholarship program status," +
        (error as Error).message,
    });
  }
};

export const bulkUpdate = async ({
  applicationIds,
  emails,
  names,
  status,
  message,
  programName,
}: {
  applicationIds: string[];
  emails: string[];
  names?: string[];
  status: scholarshipStatusType;
  message?: string;
  programName?: string;
}) => {
  try {
    await db.transaction(async (tx) => {
      if (status === "inactive") {
        await tx
          .update(ApplicationsTable)
          .set({ status })
          .where(inArray(ApplicationsTable.applicationsId, applicationIds))
          .execute();

        await tx
          .delete(AuthorizedEmailTable)
          .where(inArray(AuthorizedEmailTable.email, emails))
          .execute();
      } else {
        await tx
          .update(ApplicationsTable)
          .set({ status })
          .where(inArray(ApplicationsTable.applicationsId, applicationIds))
          .execute();

        await Promise.all(
          emails.map((email, i) =>
            sendEmail({
              to: email,
              subject: "Document Renewal Notice",
              html: DocumentRenewalTemplate({
                programName: programName ?? "Your Scholarship Program",
                name: names?.[i],
                message:
                  message ??
                  "Please renew your documents at the earliest convenience.",
              }),
            }),
          ),
        );
      }
    });
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Failed to update scholarship program status," +
        (error as Error).message,
    });
  }
};
