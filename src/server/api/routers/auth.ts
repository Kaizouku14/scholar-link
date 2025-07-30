import { COURSES } from "@/constants/courses";
import { DEPARTMENTS } from "@/constants/departments";
import { GENDERS } from "@/constants/genders";
import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
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
});
