import { adminRoute, createTRPCRouter, publicProcedure } from "../trpc";
import z from "zod";
import { SUBMISSION_TYPE } from "@/constants/scholarship/submittion-type";
import { SCHOLARSHIP_TYPES } from "@/constants/scholarship/scholarship-types";
import { FIELD_TYPES } from "@/constants/scholarship/field-type";
import {
  createScholarshipProgram,
  disableScholarshipProgram,
  updateProgramAvailability,
} from "@/lib/api/scholarship/programs/mutation";
import {
  getAllActivePrograms,
  getAllPrograms,
  getAllScholarshipType,
  getProgramById,
} from "@/lib/api/scholarship/programs/query";

export const scholarshipRouter = createTRPCRouter({
  createScholarshipProgram: adminRoute
    .input(
      z.object({
        //Basic Information
        basicInfo: z.object({
          name: z.string(),
          description: z.string(),
          slots: z.number(),
          location: z.string(),
          type: z.enum(SCHOLARSHIP_TYPES),
          submissionType: z.enum(SUBMISSION_TYPE),
          deadline: z.date(),
          imageUrl: z.string().optional(),
          imageKey: z.string().optional(),
        }),
        //form fields
        formFields: z.array(
          z.object({
            id: z.string(),
            type: z.enum(FIELD_TYPES),
            label: z.string(),
            placeholder: z.string(),
            description: z.string(),
            required: z.boolean(),
          }),
        ),
        // Additional Info (stored in JSONB)
        additionalInfo: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await createScholarshipProgram({
        ...input,
      });
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

  //Query Routes
  getAllActivePrograms: publicProcedure.query(async () => {
    return await getAllActivePrograms();
  }),
  getAllPrograms: publicProcedure.query(async () => {
    return await getAllPrograms();
  }),
  getAllScholarshipType: publicProcedure.query(async () => {
    return await getAllScholarshipType();
  }),
  getScholarshipProgramById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await getProgramById(input.id);
    }),
});
