import { z } from "zod";
import { createTRPCRouter, protectedRoute, publicProcedure } from "../trpc";
import { getAllUserEmail } from "@/lib/api/user/query";
import { TRPCError } from "@trpc/server";
import {
  checkStudentNoAvailability,
  createdStudentNo,
  insertStudentProfile,
} from "@/lib/api/user/mutation";
import { COURSES } from "@/constants/courses";
import { GENDERS } from "@/constants/genders";
import { SECTIONS } from "@/constants/sections";
import { YEAR_LEVEL } from "@/constants/year-level";

export const userRouter = createTRPCRouter({
  createStudentNo: protectedRoute
    .input(
      z.object({
        id: z.string(),
        studentNo: z.string(),
        course: z.enum(COURSES),
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

  insertStudentProfile: protectedRoute
    .input(
      z.object({
        id: z.string(),
        profile: z.string(),
        profileKey: z.string(),
        contact: z.string(),
        address: z.string(),
        gender: z.enum(GENDERS),
        dateOfBirth: z.date(),
        section: z.enum(SECTIONS),
        yearLevel: z.enum(YEAR_LEVEL),
      }),
    )
    .mutation(async ({ input }) => {
      return await insertStudentProfile({ data: input });
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
