import z from "zod";
import { INTERNSHIP_STATUS } from "@/constants/users/status";
import { YEAR_LEVEL } from "@/constants/users/year-level";
import { COURSES } from "@/constants/users/courses";
import { SECTIONS } from "@/constants/users/sections";

export const columnSchema = z.object({
  id: z.string(),
  name: z.string(),
  middleName: z.string(),
  surname: z.string(),
  profile: z.string().nullish(),
  section: z.array(z.enum(SECTIONS)).nullish(),
  course: z.enum(COURSES).nullish(),
  yearLevel: z.enum(YEAR_LEVEL).nullish(),
  companyName: z.string(),

  status: z.enum(INTERNSHIP_STATUS).nullish(),
  progress: z.string().nullish(),
  totalRequiredHours: z.number().nullish(),
});

export type ColumnSchema = z.infer<typeof columnSchema>;
