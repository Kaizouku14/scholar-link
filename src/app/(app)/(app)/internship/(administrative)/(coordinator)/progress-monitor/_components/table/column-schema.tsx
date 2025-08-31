import z from "zod";
import { INTERNSHIP_STATUS } from "@/constants/users/status";
import { COURSES } from "@/constants/users/courses";
import { SECTIONS } from "@/constants/users/sections";

export const columnSchema = z.object({
  id: z.string(),
  name: z.string(),
  profile: z.string().nullish(),
  section: z.array(z.enum(SECTIONS)).nullish(),
  course: z.enum(COURSES).nullish(),
  companyName: z.string().nullish(),

  status: z.enum(INTERNSHIP_STATUS).nullish(),
  totalRequiredHours: z.number().nullish(),
  logs: z.array(
    z.object({
      date: z.number(),
      hours: z.number(),
      activity: z.string(),
    }),
  ),
});

export type ColumnSchema = z.infer<typeof columnSchema>;
