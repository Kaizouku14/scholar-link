import type { scholarshipStatusType } from "@/constants/users/status";
import { authorizeEmail, revokeAuthorizedEmail } from "@/lib/api/auth/mutation";
import { db, eq } from "@/server/db";
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
      await authorizeEmail({ email });
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
