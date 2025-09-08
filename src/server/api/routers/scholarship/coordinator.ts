import z from "zod";
import { createTRPCRouter, adminRoute } from "../../trpc";
import { SCHOLARSHIP_TYPES } from "@/constants/scholarship/scholarship-types";
import { REQUIREMENT_TYPES } from "@/constants/scholarship/requirements";
import { createScholarshipProgram } from "@/lib/api/scholarship/programs/mutation";
import { SUBMISSION_TYPE } from "@/constants/scholarship/submittion-type";

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
    .mutation(async ({ input }) => {
      await createScholarshipProgram({ data: input });
    }),
});
