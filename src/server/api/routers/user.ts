import { z } from "zod";
import { createTRPCRouter, protectedRoute, publicProcedure } from "../trpc";
import {
  checkStudentNoAvailability,
  insertStudentInfo,
  insertStudentProfile,
} from "@/lib/api/user/mutation";
import { COURSES } from "@/constants/users/courses";
import { GENDERS } from "@/constants/users/genders";
import { YEAR_LEVEL } from "@/constants/users/year-level";

export const userRouter = createTRPCRouter({
  createStudentInfo: publicProcedure
    .input(
      z.object({
        id: z.string(),
        course: z.enum(COURSES),
      }),
    )
    .mutation(async ({ input }) => {
      return await insertStudentInfo(input);
    }),

  checkStudentNoAvailability: publicProcedure
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
        studentNo: z.string(),
        yearLevel: z.enum(YEAR_LEVEL),
      }),
    )
    .mutation(async ({ input }) => {
      return await insertStudentProfile({ data: input });
    }),
});
