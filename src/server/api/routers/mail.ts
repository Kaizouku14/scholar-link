import z from "zod";
import { createTRPCRouter, protectedRoute, publicProcedure } from "../trpc";
import {
  deleteMail,
  markAllAsRead,
  markAsRead,
  sendOrReplyMail,
} from "@/lib/api/mail/mutation";
import { TRPCError } from "@trpc/server";
import { generateUUID } from "@/lib/utils";
import { getAllMails, getAllUserEmail } from "@/lib/api/mail/query";
import { cacheData } from "@/lib/redis";

export const mailRouter = createTRPCRouter({
  getAllUserEmail: publicProcedure.query(async ({ ctx }) => {
    const session = ctx.session!;
    const { email } = session.user;

    return await getAllUserEmail({ email });
  }),
  getAllUserMail: protectedRoute.query(({ ctx }) => {
    if (!ctx.session) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated",
      });
    }

    const { id } = ctx.session.user;
    return cacheData(
      `mails-${id}`,
      async () => await getAllMails({ userId: id }),
    );
  }),
  markMailAsRead: protectedRoute
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      return await markAsRead({ ids: input.ids });
    }),
  markAllMailAsRead: protectedRoute.mutation(async () => {
    return await markAllAsRead();
  }),
  deleteMail: protectedRoute
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return deleteMail({ id: input.id });
    }),
  sendMailTo: protectedRoute
    .input(
      z.object({
        reciever: z.string(),
        subject: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        if (!ctx.session) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "User is not authenticated",
          });
        }

        const mailToSend = {
          id: generateUUID(),
          threadId: generateUUID(),
          parentId: null,
          sender: ctx.session.user.id,
          receiver: input.reciever,
          subject: input.subject,
          content: input.content,
          isRead: false,
          date: new Date(),
        };

        return await sendOrReplyMail({ mail: mailToSend, omitCreatedAt: true });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send mail," + (error as Error).message,
        });
      }
    }),
  replyToMail: protectedRoute
    .input(
      z.object({
        threadId: z.string(),
        parentId: z.string(),
        sender: z.string(),
        receiver: z.string(),
        subject: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const mailToReply = {
          id: generateUUID(),
          threadId: input.threadId,
          parentId: input.parentId,
          sender: input.sender,
          receiver: input.receiver,
          subject: input.subject,
          content: input.content,
          isRead: true,
          date: new Date(),
        };

        return await sendOrReplyMail({
          mail: mailToReply,
          omitCreatedAt: true,
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to reply to this mail," + (error as Error).message,
        });
      }
    }),
});
