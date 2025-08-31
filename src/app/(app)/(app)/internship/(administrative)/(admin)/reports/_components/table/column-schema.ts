import { COURSES } from "@/constants/users/courses";
import { DEPARTMENTS } from "@/constants/users/departments";
import { GENDERS } from "@/constants/users/genders";
import { SECTIONS } from "@/constants/users/sections";
import z from "zod";

export const reportsSchema = z.object({
  profile: z.string().nullish(),
  studentName: z.string(),
  sex: z.enum(GENDERS).nullish(),
  section: z.array(z.enum(SECTIONS)).nullish(),
  department: z.enum(DEPARTMENTS).nullish(),
  course: z.enum(COURSES).nullish(),
  duration: z.string().nullish(),
  company: z.string().nullish(),
  companyAddress: z.string().nullish(),
  supervisorName: z.string().nullish(),
  supervisorEmail: z.string().nullish(),
  supervisorContactNo: z.string().nullish(),

  coordinatorName: z.string().nullish(),
  coordinatorCourse: z.string().nullish(),
});

export type ReportSchema = z.infer<typeof reportsSchema>;
