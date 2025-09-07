import { adminRoute, createTRPCRouter, publicProcedure } from "../../trpc";
import z from "zod";
import { SUBMISSION_TYPE } from "@/constants/scholarship/submittion-type";
import {
  disableScholarshipProgram,
  updateProgramAvailability,
} from "@/lib/api/scholarship/programs/mutation";
import {
  getAllActivePrograms,
  getAllPrograms,
  getAllScholarshipType,
  getProgramById,
} from "@/lib/api/scholarship/programs/query";
import { cacheData } from "@/lib/redis";

export const scholarshipRouter = createTRPCRouter({
  disableScholarshipProgram: adminRoute
    .input(
      z.object({
        programId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await disableScholarshipProgram(input);
    }),
  updateProgramAvailability: adminRoute
    .input(
      z.object({
        programId: z.string(),
        deadline: z.date(),
        submissionType: z.enum(SUBMISSION_TYPE),
        slots: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      return await updateProgramAvailability(input);
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
