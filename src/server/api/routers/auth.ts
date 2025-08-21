import z from "zod";
import { createTRPCRouter, protectedRoute, publicProcedure } from "../trpc";
import {
  authorizeEmail,
  checkStudentOnBoarded,
  createUserAccount,
  isEmailAuthorized,
  revokeAuthorizedEmail,
} from "@/lib/api/auth/mutation";
import { gellAllInternshipAccounts } from "@/lib/api/auth/query";
import { COURSES } from "@/constants/users/courses";
import { DEPARTMENTS } from "@/constants/users/departments";
import { GENDERS } from "@/constants/users/genders";
import { ROLES } from "@/constants/users/roles";
import { SECTIONS } from "@/constants/users/sections";
import { YEAR_LEVEL } from "@/constants/users/year-level";

export const authRouter = createTRPCRouter({
  isEmailAuthorized: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input }) => {
      return await isEmailAuthorized(input);
    }),
  authorizeEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input }) => {
      return await authorizeEmail(input);
    }),
  revokeAuthorizedEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input }) => {
      return await revokeAuthorizedEmail(input);
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

  register: protectedRoute
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        surname: z.string().min(1, "Surname is required"),
        middleName: z.string().min(1, "Middle name is required"),
        email: z.string().email("Invalid email address"),
        profile: z.string().optional(),
        profileKey: z.string().optional(),
        contact: z.string().min(1, "Contact is required"),
        address: z.string().min(1, "Address is required"),
        dateOfBirth: z.date({ required_error: "Date of birth is required" }),
        gender: z.enum(GENDERS),
        department: z.enum(DEPARTMENTS),
        role: z.enum(ROLES),
        studentNo: z.string().optional(),
        course: z.enum(COURSES).optional(),
        section: z.array(z.enum(SECTIONS)),
        yearLevel: z.enum(YEAR_LEVEL).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await createUserAccount({ data: input });
    }),

  getAllInternshipAccounts: protectedRoute.query(async () => {
    return await gellAllInternshipAccounts();
  }),
});
