import z from "zod";
import { createTRPCRouter, protectedRoute, publicProcedure } from "../trpc";
import {
  authorizeEmail,
  checkEmailIfExists,
  checkStudentOnBoarded,
  createUserAccount,
  isEmailAuthorized,
  revokeAuthorizedEmail,
} from "@/lib/api/auth/mutation";
import { gellAllInternshipAccounts } from "@/lib/api/auth/query";
import { COURSES } from "@/constants/users/courses";
import { DEPARTMENTS } from "@/constants/users/departments";
import { ROLES } from "@/constants/users/roles";
import { SECTIONS } from "@/constants/users/sections";

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
  checkEmailIfExists: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input }) => {
      return await checkEmailIfExists(input);
    }),
  register: protectedRoute
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        password: z.string().optional(),
        profile: z.string().optional(),
        profileKey: z.string().optional(),
        contact: z.string().min(1, "Contact is required"),
        address: z.string().min(1, "Address is required"),
        department: z.enum(DEPARTMENTS),
        role: z.enum(ROLES),
        course: z.enum(COURSES).optional(),
        studentNo: z.string().optional(),
        section: z.array(z.enum(SECTIONS)),
      }),
    )
    .mutation(async ({ input }) => {
      return await createUserAccount({ data: input });
    }),

  getAllInternshipAccounts: protectedRoute.query(async ({ ctx }) => {
    const userId = ctx.session!.user.id;
    return await gellAllInternshipAccounts({ userId });
  }),
});
