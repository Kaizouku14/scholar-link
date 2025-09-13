import z from "zod";
import { createTRPCRouter, adminRoute } from "../../trpc";
import { SCHOLARSHIP_TYPES } from "@/constants/scholarship/scholarship-types";
import { SUBMISSION_TYPE } from "@/constants/scholarship/submittion-type";
import {
  createScholarshipProgram,
  disableProgram,
  updateProgramStatus,
} from "@/lib/api/scholarship/coordinator/program/mutation";
import { cacheData } from "@/lib/redis";
import { clearNotifications } from "@/lib/api/user/mutation";
import { getCoordProgramApplications } from "@/lib/api/scholarship/coordinator/applications/query";
import {
  getAllPrograms,
  getAllScholarshipType,
} from "@/lib/api/scholarship/coordinator/program/query";

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
              description: z.string().optional().nullish(),
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
      return await disableProgram(input);
    }),
  updateProgramAvailability: adminRoute
    .input(
      z.object({
        programId: z.string(),
        deadline: z.date(),
        submissionType: z.enum(SUBMISSION_TYPE),
        slots: z.number(),
        requirements: z
          .array(
            z.object({
              requirementId: z.string(),
              label: z.string().min(1, "Requirement label is required"),
              description: z.string().optional().nullish(),
              isRequired: z.boolean(),
            }),
          )
          .optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await updateProgramStatus(input);
    }),

  //Queries
  fetchAllProgram: adminRoute.query(async () => {
    return await getAllPrograms();
  }),
  fetchAllProgramType: adminRoute.query(async () => {
    return await getAllScholarshipType();
  }),
  getAllScholarsApplications: adminRoute.query(async ({ ctx }) => {
    const userId = ctx.session!.user.id;

    await clearNotifications(userId);

    return cacheData(
      `${userId}-applications`,
      async () =>
        await getCoordProgramApplications({
          userId,
        }),
    );
  }),
});
