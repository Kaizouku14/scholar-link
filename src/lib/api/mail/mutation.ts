import { db, type InferSelectModel, eq } from "@/server/db";
import { mailTable } from "@/server/db/schema/mail";
import { TRPCError } from "@trpc/server";

type mailType = InferSelectModel<typeof mailTable>;

export const sendMailTo = async ({
  mail,
}: {
  mail: Omit<mailType, "createdAt" | "isRead">;
}) => {
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

export const markAsRead = async ({ id }: { id: string }) => {
  try {
    const response = await db
      .update(mailTable)
      .set({ isRead: true })
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
