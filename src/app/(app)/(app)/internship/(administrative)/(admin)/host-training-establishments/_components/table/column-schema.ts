import { COURSES } from "@/constants/users/courses";
import { SECTIONS } from "@/constants/users/sections";
import { INTERNSHIP_STATUS } from "@/constants/users/status";
import z from "zod";

export const companySchema = z.object({
  companyName: z.string().nullish(),
  address: z.string().nullish(),
  supervisor: z.string().nullish(),
  supervisorEmail: z.string().nullish(),
  supervisorNo: z.string().nullish(),
  studentCount: z.number(),
  status: z.string().nullish(),
  interns: z.array(
    z.object({
      name: z.string(),
      profile: z.string(),
      email: z.string(),
      course: z.enum(COURSES),
      status: z.enum(INTERNSHIP_STATUS),
      section: z.array(z.enum(SECTIONS)).nullish(),
    }),
  ),
});

export type CompanySchema = z.infer<typeof companySchema>;
