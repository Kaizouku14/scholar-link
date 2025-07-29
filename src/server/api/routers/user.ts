import { z } from "zod";
import { createTRPCRouter, protectedRoute, publicProcedure } from "../trpc";
import { GENDERS } from "@/constants/genders";
import { DEPARTMENTS } from "@/constants/departments";
import { COURSES } from "@/constants/courses";
import { getAllUserEmail } from "@/lib/api/user/query";
import { TRPCError } from "@trpc/server";
import {
  checkStudentNoAvailability,
  createdStudentNo,
} from "@/lib/api/auth/mutation";

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

  register: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        confirmPassword: z.string(),
        contact_no: z.string(),
        address: z.string(),
        gender: z.enum(GENDERS),
        department: z.enum(DEPARTMENTS),

        //Students
        studentNumber: z.string().optional(),
        course: z.enum(COURSES).optional(),
        yearLevel: z.string().optional(),
        profilePicture: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      console.log(input);
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
