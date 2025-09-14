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
import {
  updateApplicationStatus,
  markDocumentAsReviewed,
} from "@/lib/api/scholarship/coordinator/applications/mutation";
import { SCHOLARSHIP_STATUS } from "@/constants/users/status";
import { AcceptanceApplicationTemplate } from "@/services/email-templates/acceptanceApplicationTemplate";
import { QualifiedApplicationTemplate } from "@/services/email-templates/qualifiedTemplate";
import { RejectApplicationTemplate } from "@/services/email-templates/rejectApplicationTemplate";
import { getScholarsByProgram } from "@/lib/api/scholarship/coordinator/scholars/query";

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

  //Applications
  updateStudentApplication: adminRoute
    .input(
      z.object({
        applicationId: z.string(),
        name: z.string(),
        email: z.string(),
        programName: z.string(),
        status: z.enum(SCHOLARSHIP_STATUS),
        subject: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const templates = {
        active: AcceptanceApplicationTemplate,
        qualified: QualifiedApplicationTemplate,
        rejected: RejectApplicationTemplate,
      };

      const templateFn = templates[input.status as keyof typeof templates];
      await updateApplicationStatus({ ...input, template: templateFn });
    }),
  markAsReiviewed: adminRoute
    .input(
      z.object({
        documentId: z.string(),
        reviewStatus: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      await markDocumentAsReviewed(input);
    }),

  //Queries
  fetchAllProgram: adminRoute.query(({ ctx }) => {
    const userId = ctx.session!.user.id;
    return cacheData(
      `${userId}-programs`,
      async () => await getAllPrograms({ userId }),
    );
  }),
  fetchAllProgramType: adminRoute.query(async ({ ctx }) => {
    const userId = ctx.session!.user.id;
    return cacheData(
      `${userId}-types`,
      async () => await getAllScholarshipType({ userId }),
    );
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
  getAllScholarsByProgram: adminRoute.query(async ({ ctx }) => {
    const userId = ctx.session!.user.id;
    return cacheData(
      `${userId}-scholars`,
      async () => await getScholarsByProgram({ userId }),
    );
  }),
});
