import z from "zod";
import { createTRPCRouter, protectedRoute } from "../trpc";
import { sendMailTo } from "@/lib/api/mail/mutation";
import { TRPCError } from "@trpc/server";
import { generateUUID } from "@/lib/utils";

export const mailRouter = createTRPCRouter({
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
        const id = generateUUID();
        if (!ctx.session) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "User is not authenticated",
          });
        }

        const mailToSend = {
          id,
          sender: ctx.session.user.id,
          senderName: ctx.session.user.name,
          senderEmail: ctx.session.user.email,
          senderProfile: ctx.session.user.image ?? null,
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
