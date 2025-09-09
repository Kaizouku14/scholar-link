import { createTRPCRouter, publicProcedure } from "../../trpc";
import z from "zod";
import {
  getAllActivePrograms,
  getAllPrograms,
  getAllScholarshipType,
  getProgramById,
} from "@/lib/api/scholarship/programs/query";
import { cacheData } from "@/lib/redis";
import { GENDERS } from "@/constants/users/genders";
import { COURSES } from "@/constants/users/courses";
import { DEPARTMENTS } from "@/constants/users/departments";
import { SECTIONS } from "@/constants/users/sections";
import { YEAR_LEVEL } from "@/constants/users/year-level";
import { createApplication } from "@/lib/api/scholarship/programs/mutation";

export const scholarshipRouter = createTRPCRouter({
  sendApplication: publicProcedure
    .input(
      z.object({
        programId: z.string(),
        name: z.string(),
        sex: z.enum(GENDERS),
        dateOfBirth: z.date(),
        email: z.string(),
        contact: z.string(),
        address: z.string(),
        course: z.enum(COURSES),
        yearLevel: z.enum(YEAR_LEVEL),
        section: z.enum(SECTIONS),
        department: z.enum(DEPARTMENTS),
        studentNo: z.string(),
        requirements: z.record(
          z.string(),
          z.object({
            key: z.string(),
            url: z.string().url(),
          }),
        ),
      }),
    )
    .mutation(async ({ input }) => {
      await createApplication({ application: input });
    }),

  //Query Routes
  getAllActivePrograms: publicProcedure.query(() => {
    return cacheData(
      "active-programs",
      async () => await getAllActivePrograms(),
    );
  }),
  getAllPrograms: publicProcedure.query(async () => {
    return await getAllPrograms();
  }),
  getAllScholarshipType: publicProcedure.query(async () => {
    return await getAllScholarshipType();
  }),
  getScholarshipProgramById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return cacheData(
        `program-${input.id}`,
        async () => await getProgramById(input.id),
      );
    }),
});
