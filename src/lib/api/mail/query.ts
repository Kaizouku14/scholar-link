import { db, eq, or } from "@/server/db";
import { mailTable } from "@/server/db/schema/mail";
import { TRPCError } from "@trpc/server";

export const getAllMails = async ({ userId }: { userId: string }) => {
  try {
    const response = await db
      .select()
      .from(mailTable)
      //   .where(eq(mailTable.receiver, userId))
      .where(or(eq(mailTable.sender, userId), eq(mailTable.receiver, userId)))
      .execute();

    console.log(response);

    return response;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get all mails," + (error as Error).message,
    });
  }
};
