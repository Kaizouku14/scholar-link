import { ELIGIBILITY_TYPE } from "@/constants/scholarship/eligiblity-type";
import { SUBMISSION_TYPE } from "@/constants/scholarship/submittion-type";
import z from "zod";

export const activationSchema = z.object({
  deadline: z.date({
    required_error: "A deadline date is required.",
  }),
  eligibilityType: z.enum(ELIGIBILITY_TYPE),
  submissionType: z.enum(SUBMISSION_TYPE),
  slots: z.coerce
    .number()
    .min(1, {
      message: "Number of slots must be at least 1.",
    })
    .max(1000, {
      message: "Number of slots cannot exceed 1000.",
    }),
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
});

export type ActivationSchema = z.infer<typeof activationSchema>;
