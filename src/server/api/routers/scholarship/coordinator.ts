import z from "zod";
import { createTRPCRouter, adminRoute } from "../../trpc";
import { SCHOLARSHIP_TYPES } from "@/constants/scholarship/scholarship-types";
import { REQUIREMENT_TYPES } from "@/constants/scholarship/requirements";
import { SUBMISSION_TYPE } from "@/constants/scholarship/submittion-type";
import {
  createScholarshipProgram,
  disableScholarshipProgram,
  updateProgramAvailability,
} from "@/lib/api/scholarship/coordinator/program/mutation";
import { getCoordProgramApplications } from "@/lib/api/scholarship/coordinator/program/query";
import { cacheData } from "@/lib/redis";

export const scholarshipCoordinatorRouter = createTRPCRouter({
  createProgram: adminRoute
    .input(
      z.object({
        name: z.string(),
        type: z.enum(SCHOLARSHIP_TYPES),
        description: z.string(),
        section: z.string(),
        slots: z.number(),
        submissionType: z.enum(SUBMISSION_TYPE),
        deadline: z.date(),
        imageUrl: z.string().optional(),
        imageKey: z.string().optional(),
        requirements: z
          .array(
            z.object({
              label: z.string(),
              type: z.enum(REQUIREMENT_TYPES),
              description: z.string().optional(),
              isRequired: z.boolean(),
            }),
          )
          .optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session!.user.id;
      await createScholarshipProgram({ data: input, userId });
    }),

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

  //Queries
  getAllScholarsApplications: adminRoute.query(({ ctx }) => {
    const userId = ctx.session!.user.id;
    return cacheData(
      `${userId}-applications`,
      async () =>
        await getCoordProgramApplications({
          userId,
        }),
    );
  }),
});
