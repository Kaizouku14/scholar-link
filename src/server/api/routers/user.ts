import { z } from "zod";
import { createTRPCRouter, protectedRoute, publicProcedure } from "../trpc";
import {
  checkStudentNoAvailability,
  createdStudentNo,
  insertStudentProfile,
} from "@/lib/api/user/mutation";
import { COURSES } from "@/constants/users/courses";
import { GENDERS } from "@/constants/users/genders";
import { SECTIONS } from "@/constants/users/sections";
import { YEAR_LEVEL } from "@/constants/users/year-level";

export const userRouter = createTRPCRouter({
  createStudentNo: publicProcedure
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
        section: z.enum(SECTIONS),
        yearLevel: z.enum(YEAR_LEVEL),
      }),
    )
    .mutation(async ({ input }) => {
      return await insertStudentProfile({ data: input });
    }),
});
