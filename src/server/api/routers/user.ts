import { z } from "zod";
import { createTRPCRouter, protectedRoute, publicProcedure } from "../trpc";
import { getAllUserEmail } from "@/lib/api/user/query";
import { TRPCError } from "@trpc/server";
import {
  checkStudentNoAvailability,
  checkStudentOnBoarded,
  createdStudentNo,
} from "@/lib/api/user/mutation";

export const userRouter = createTRPCRouter({
  createStudentNo: protectedRoute
    .input(
      z.object({
        email: z.string().email(),
        studentNo: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await createdStudentNo(input);
    }),

  checkStudentNoAvailability: protectedRoute
    .input(
      z.object({
        studentNo: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await checkStudentNoAvailability(input);
    }),
  checkStudendIsOnBoarded: protectedRoute
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await checkStudentOnBoarded(input);
    }),

  getAllUserEmail: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated",
      });
    }
    const { email } = ctx.session.user;

    return await getAllUserEmail({ email });
  }),
});
