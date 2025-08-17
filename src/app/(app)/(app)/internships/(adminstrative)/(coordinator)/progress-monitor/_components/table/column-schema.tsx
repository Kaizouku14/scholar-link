import z from "zod";
import { INTERNSHIP_STATUS } from "@/constants/status";
import { YEAR_LEVEL } from "@/constants/year-level";
import { COURSES } from "@/constants/courses";
import { SECTIONS } from "@/constants/sections";

export const columnSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  surname: z.string().nullish(),
  profile: z.string().nullish(),
  section: z.enum(SECTIONS).nullish(),
  course: z.enum(COURSES).nullish(),
  yearLevel: z.enum(YEAR_LEVEL).nullish(),
  companyName: z.string(),

  status: z.enum(INTERNSHIP_STATUS).nullish(),
  progress: z.string().nullish(),
  totalRequiredHours: z.number().nullish(),
});

export type ColumnSchema = z.infer<typeof columnSchema>;
