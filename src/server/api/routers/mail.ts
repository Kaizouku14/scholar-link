import z from "zod";
import { createTRPCRouter, protectedRoute } from "../trpc";

export const mailRouter = createTRPCRouter({
  sendMailTo: protectedRoute
    .input(z.object({}))
    .mutation(async ({ input }) => {}),
});
