import { roleVisibility, type roleType } from "@/constants/users/roles";
import { db, eq, or, desc, ne, and, inArray } from "@/server/db";
import { user } from "@/server/db/schema/auth";
import { mailTable } from "@/server/db/schema/mail";
import { TRPCError } from "@trpc/server";
import { alias } from "drizzle-orm/sqlite-core";

const sender = alias(user, "sender-user");
const receiver = alias(user, "receiver-user");

const baseMailQuery = () =>
  db
    .select({
      id: mailTable.id,
      threadId: mailTable.threadId,
      parentId: mailTable.parentId,
      sender: mailTable.sender,
      senderName: sender.name,
      senderEmail: sender.email,
      senderProfile: sender.profile,
      receiver: mailTable.receiver,
      receiverName: receiver.name,
      receiverEmail: receiver.email,
      receiverProfile: receiver.profile,
      subject: mailTable.subject,
      content: mailTable.content,
      date: mailTable.date,
      isRead: mailTable.isRead,
      createdAt: mailTable.createdAt,
    })
    .from(mailTable)
    .leftJoin(receiver, eq(mailTable.receiver, receiver.id))
    .leftJoin(sender, eq(mailTable.sender, sender.id));

export const getAllMails = async ({ userId }: { userId: string }) => {
  try {
    const response = await baseMailQuery()
      .where(or(eq(mailTable.sender, userId), eq(mailTable.receiver, userId)))
      .orderBy(desc(mailTable.createdAt))
      .execute();

    return response;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get all mails, " + (error as Error).message,
    });
  }
};

export const getAllUserEmail = async ({
  email,
  role,
}: {
  email: string;
  role: roleType;
}) => {
  try {
    const allowedRoles = roleVisibility[role];

    const conditions = [ne(user.email, email)];

    if (allowedRoles.length === 1) {
      conditions.push(eq(user.role, allowedRoles[0]!));
    } else if (allowedRoles.length > 1) {
      conditions.push(inArray(user.role, allowedRoles));
    }

    const response = await db
      .select({
        id: user.id,
        email: user.email,
        role: user.role,
      })
      .from(user)
      .where(and(...conditions));

    if (!response) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get all user email",
      });
    }

    return response;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get all user email, " + (error as Error).message,
    });
  }
};
