import z from "zod";
import { DOCUMENTS } from "@/constants/internship/documents";
import { STATUS } from "@/constants/users/status";
import { YEAR_LEVEL } from "@/constants/users/year-level";
import { COURSES } from "@/constants/users/courses";
import { SECTIONS } from "@/constants/users/sections";

export const columnSchema = z.object({
  id: z.string(),
  documentType: z.enum(DOCUMENTS),
  documentUrl: z.string().nullish(),
  reviewStatus: z.enum(STATUS).nullish(),
  submittedAt: z.date().nullish(),

  name: z.string().nullish(),
  surname: z.string().nullish(),
  profile: z.string().nullish(),
  section: z.array(z.enum(SECTIONS)).nullish(),
  course: z.enum(COURSES).nullish(),
  yearLevel: z.enum(YEAR_LEVEL).nullish(),
  companyName: z.string(),
});

export type ColumnSchema = z.infer<typeof columnSchema>;
