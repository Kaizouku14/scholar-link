import { db, eq, or, desc } from "@/server/db";
import { mailTable } from "@/server/db/schema/mail";
import { TRPCError } from "@trpc/server";

export const getAllMails = async ({ userId }: { userId: string }) => {
  try {
    const response = await db
      .select()
      .from(mailTable)
      .where(or(eq(mailTable.sender, userId), eq(mailTable.receiver, userId)))
      .orderBy(desc(mailTable.createdAt))
      .execute();

    return response;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get all mails," + (error as Error).message,
    });
  }
};
