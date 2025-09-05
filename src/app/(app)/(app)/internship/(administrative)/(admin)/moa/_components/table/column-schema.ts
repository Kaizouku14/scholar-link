import { COURSES } from "@/constants/users/courses";
import { DEPARTMENTS } from "@/constants/users/departments";
import { SECTIONS } from "@/constants/users/sections";
import z from "zod";

export const columnSchema = z.object({
  profile: z.string().nullish(),
  name: z.string(),
  email: z.string(),
  contactNo: z.string().nullish(),
  course: z.enum(COURSES).nullish(),
  section: z.array(z.enum(SECTIONS)).nullish(),
  deparment: z.enum(DEPARTMENTS).nullish(),
  documentUrl: z.string().nullish(),
});

export type ColumnSchema = z.infer<typeof columnSchema>;
