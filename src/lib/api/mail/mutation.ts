import { db, type InferSelectModel, eq, inArray } from "@/server/db";
import { mailTable } from "@/server/db/schema/mail";
import { TRPCError } from "@trpc/server";

type mailType = InferSelectModel<typeof mailTable>;

type MailInsert = Omit<mailType, "createdAt">;

export const sendOrReplyMail = async ({
  mail,
  omitCreatedAt = false,
  errorMessage = "Failed to send mail",
}: {
  mail: MailInsert;
  omitCreatedAt?: boolean;
  errorMessage?: string;
}) => {
  try {
    const values = omitCreatedAt
      ? (mail as Omit<mailType, "createdAt" | "isRead">)
      : mail;

    const response = await db.insert(mailTable).values(values).execute();

    if (!response) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: errorMessage,
      });
    }
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `${errorMessage}, ${(error as Error).message}`,
    });
  }
};

export const markAsRead = async ({ ids }: { ids: string[] }) => {
  try {
    const response = await db
      .update(mailTable)
      .set({ isRead: true })
      .where(inArray(mailTable.id, ids))
      .execute();

    if (!response) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unexpected Error happened.",
      });
    }
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to send mail," + (error as Error).message,
    });
  }
};

export const markAllAsRead = async () => {
  try {
    const response = await db
      .update(mailTable)
      .set({ isRead: true })
      .where(eq(mailTable.isRead, false))
      .execute();

    if (!response) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unexpected Error happened.",
      });
    }
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to mark as read," + (error as Error).message,
    });
  }
};

export const deleteMail = async ({ id }: { id: string }) => {
  try {
    const response = await db
      .delete(mailTable)
      .where(eq(mailTable.id, id))
      .execute();

    if (!response) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unexpected Error happened.",
      });
    }
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to delete mail," + (error as Error).message,
    });
  }
};
