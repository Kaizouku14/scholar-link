import { REQUIREMENT_TYPES } from "@/constants/scholarship/requirements";
import { SCHOLARSHIP_TYPES } from "@/constants/scholarship/scholarship-types";
import { SUBMISSION_TYPE } from "@/constants/scholarship/submittion-type";
import z from "zod";

export const scholarshipFormSchema = z.object({
  name: z.string().min(1, "Program name is required"),
  type: z.enum(SCHOLARSHIP_TYPES),
  description: z.string().min(1, "Program description is required"),
  slots: z.coerce
    .number({
      required_error: "slots is required",
      invalid_type_error: "slots must be a number",
    })
    .int()
    .positive(),
  submissionType: z.enum(SUBMISSION_TYPE),
  image: z.instanceof(File).optional(),
  deadline: z.date({
    required_error: "Deadline is required",
  }),
  requirements: z
    .array(
      z.object({
        label: z.string().min(1, "Requirement label is required"),
        type: z.enum(REQUIREMENT_TYPES),
      }),
    )
    .optional(),
});

export type ScholarshipFormData = z.infer<typeof scholarshipFormSchema>;
