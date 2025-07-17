import z from "zod";
import { createTRPCRouter, protectedRoute } from "../trpc";
import { sendMailTo } from "@/lib/api/mail/mutation";
import { generateUUID } from "@/lib/utils";
import { TRPCError } from "@trpc/server";

export const mailRouter = createTRPCRouter({
  sendMailTo: protectedRoute
    .input(z.object({}))
    .mutation(async ({ ctx, input }) => {
      try {
        const mailId = generateUUID();
        if (!ctx.session) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "User is not authenticated",
          });
        }

        // return await sendMailTo();
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send mail," + (error as Error).message,
        });
      }
    }),
});
