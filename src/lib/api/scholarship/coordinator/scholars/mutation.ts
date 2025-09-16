import type { scholarshipStatusType } from "@/constants/users/status";
import {
  authorizeEmail,
  isEmailAuthorized,
  revokeAuthorizedEmail,
} from "@/lib/api/auth/mutation";
import { db, eq, inArray } from "@/server/db";
import { authorizedEmail as AuthorizedEmailTable } from "@/server/db/schema/auth";
import { applications as ApplicationsTable } from "@/server/db/schema/scholarship";
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

export const bulkDeactivation = async ({
  applicationIds,
  emails,
}: {
  applicationIds: string[];
  emails: string[];
}) => {
  try {
    await db.transaction(async (tx) => {
      await tx
        .update(ApplicationsTable)
        .set({ status: "inactive" })
        .where(inArray(ApplicationsTable.applicationsId, applicationIds))
        .execute();

      await tx
        .select()
        .from(AuthorizedEmailTable)
        .where(inArray(AuthorizedEmailTable.email, emails))
        .execute();
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
