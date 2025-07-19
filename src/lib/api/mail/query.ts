import { db, eq } from "@/server/db";
import { mailTable } from "@/server/db/schema/mail";
import { TRPCError } from "@trpc/server";

export const getAllMails = async (userId: string) => {
  try {
    const response = await db
      .select()
      .from(mailTable)
      .where(eq(mailTable.receiver, userId))
      .execute();

    return response;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get all mails," + (error as Error).message,
    });
  }
};
