import { z } from "zod";
import { createTRPCRouter, protectedRoute, publicProcedure } from "../trpc";
import {
  insertStudentInfo,
  insertStudentProfile,
} from "@/lib/api/user/mutation";
import { GENDERS } from "@/constants/users/genders";
import { YEAR_LEVEL } from "@/constants/users/year-level";
import { COURSES } from "@/constants/users/courses";
import { getStudentInfo } from "@/lib/api/user/query";

export const userRouter = createTRPCRouter({
  createStudentInfo: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await insertStudentInfo(input);
    }),

  //   checkStudentNoAvailability: publicProcedure
  //     .input(
  //       z.object({
  //         studentNo: z.string(),
  //       }),
  //     )
  //     .mutation(async ({ input }) => {
  //       return await checkStudentNoAvailability(input);
  //     }),
  insertStudentProfile: protectedRoute
    .input(
      z.object({
        profile: z.string(),
        profileKey: z.string(),
        contact: z.string(),
        address: z.string(),
        gender: z.enum(GENDERS),
        dateOfBirth: z.date(),
        studentNo: z.string(),
        yearLevel: z.enum(YEAR_LEVEL),
        course: z.enum(COURSES),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session!.user.id;
      return await insertStudentProfile({ data: input, userId });
    }),
  getUserInformation: protectedRoute.query(async ({ ctx }) => {
    const userId = ctx.session!.user.id;
    return await getStudentInfo(userId);
  }),
});
