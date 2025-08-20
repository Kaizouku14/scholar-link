import { SCHOLARSHIP_TYPES } from "@/constants/scholarship/scholarship-types";
import { SUBMISSION_TYPE } from "@/constants/scholarship/submittion-type";
import z from "zod";

export const ScholarshipFormSchema = z.object({
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
  location: z.string().min(1, "Location is required"),
  submissionType: z.enum(SUBMISSION_TYPE),
  image: z.instanceof(File).optional(),
  deadline: z.date({
    required_error: "Deadline is required",
  }),
});

export type ScholarshipFormData = z.infer<typeof ScholarshipFormSchema>;
