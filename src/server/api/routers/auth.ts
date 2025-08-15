import { COURSES } from "@/constants/courses";
import { DEPARTMENTS } from "@/constants/departments";
import { GENDERS } from "@/constants/genders";
import z from "zod";
import { createTRPCRouter, protectedRoute, publicProcedure } from "../trpc";
import { checkStudentOnBoarded } from "@/lib/api/auth/mutation";
import { gellAllInternshipAccounts } from "@/lib/api/auth/query";

export const authRouter = createTRPCRouter({
  checkStudendIsOnBoarded: protectedRoute
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await checkStudentOnBoarded(input);
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

  getAllInternshipAccounts: protectedRoute.query(async ({ ctx }) => {
    return await gellAllInternshipAccounts();
  }),
});
