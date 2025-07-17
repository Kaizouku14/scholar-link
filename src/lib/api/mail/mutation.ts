import { generateUUID } from "@/lib/utils";
import { db, type InferSelectModel } from "@/server/db";
import { mailTable } from "@/server/db/schema/mail";
import { TRPCError } from "@trpc/server";

type mailType = InferSelectModel<typeof mailTable>;

export const sendMailTo = async ({ mail }: { mail: mailType }) => {
  try {
    const response = await db
      .insert(mailTable)
      .values({
        ...mail,
      })
      .execute();

    if (!response) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to send mail",
      });
    }
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to send mail," + (error as Error).message,
    });
  }
};
