import { COURSES } from "@/constants/users/courses";
import { DEPARTMENTS } from "@/constants/users/departments";
import { ROLES } from "@/constants/users/roles";
import { SECTIONS } from "@/constants/users/sections";
import { INTERNSHIP_STATUS } from "@/constants/users/status";
import { YEAR_LEVEL } from "@/constants/users/year-level";
import z from "zod";

export const deparmentColumnSchema = z.object({
  deparment: z.enum(DEPARTMENTS).nullish(),
  coordinators: z.number(),
  interns: z.number(),
  requiredHours: z.number().nullish(),
  totalProgressHours: z.string().nullish(),
  users: z.array(
    z.object({
      name: z.string(),
      middleName: z.string(),
      surname: z.string(),
      profile: z.string(),
      email: z.string(),
      role: z.enum(ROLES),

      //Student info
      studentNo: z.string().nullish(),
      course: z.enum(COURSES).nullish(),
      section: z.enum(SECTIONS).nullish(),
      yearLevel: z.enum(YEAR_LEVEL).nullish(),
      status: z.enum(INTERNSHIP_STATUS).nullish(),
    }),
  ),
});

export type DepartmentColumn = z.infer<typeof deparmentColumnSchema>;
