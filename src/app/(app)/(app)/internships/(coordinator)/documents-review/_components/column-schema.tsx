import z from "zod";
import { DOCUMENTS } from "@/constants/documents";
import { STATUS } from "@/constants/status";
import { YEAR_LEVEL } from "@/constants/year-level";
import { COURSES } from "@/constants/courses";
import { SECTIONS } from "@/constants/sections";

export const columnSchema = z.object({
  id: z.string(),
  documentType: z.enum(DOCUMENTS),
  documentUrl: z.string().nullish(),
  reviewStatus: z.enum(STATUS).nullish(),
  submittedAt: z.date().nullish(),

  name: z.string().nullish(),
  surname: z.string().nullish(),
  profile: z.string().nullish(),
  section: z.enum(SECTIONS).nullish(),
  course: z.enum(COURSES).nullish(),
  yearLevel: z.enum(YEAR_LEVEL).nullish(),
  companyName: z.string(),
});

export type ColumnSchema = z.infer<typeof columnSchema>;
