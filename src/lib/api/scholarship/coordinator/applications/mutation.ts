import { db, eq } from "@/server/db";
import { applications as ApplicationsTable } from "@/server/db/schema/scholarship";
import { sendEmail } from "@/services/email";
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
