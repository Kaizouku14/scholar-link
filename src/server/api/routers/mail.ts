import z from "zod";
import { createTRPCRouter, protectedRoute } from "../trpc";
import {
  deleteMail,
  markAllAsRead,
  markAsRead,
  sendMailTo,
} from "@/lib/api/mail/mutation";
import { TRPCError } from "@trpc/server";
import { generateUUID } from "@/lib/utils";
import { getAllMails } from "@/lib/api/mail/query";

export const mailRouter = createTRPCRouter({
  getAllUserMail: protectedRoute.query(async ({ ctx }) => {
    if (!ctx.session) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated",
      });
    }

    const { id } = ctx.session.user;
    return await getAllMails({ userId: id });
  }),

  markMailAsRead: protectedRoute
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await markAsRead({ id: input.id });
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
          date: new Date(),
        };

        return await sendMailTo({ mail: mailToSend });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send mail," + (error as Error).message,
        });
      }
    }),
});
