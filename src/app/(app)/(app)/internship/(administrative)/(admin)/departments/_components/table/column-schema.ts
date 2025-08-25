import { COURSES } from "@/constants/users/courses";
import { DEPARTMENTS } from "@/constants/users/departments";
import { ROLES } from "@/constants/users/roles";
import { SECTIONS } from "@/constants/users/sections";
import { INTERNSHIP_STATUS } from "@/constants/users/status";
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
      profile: z.string(),
      email: z.string(),
      section: z.array(z.enum(SECTIONS)).nullish(),
      role: z.enum(ROLES),

      //Student info
      course: z.enum(COURSES).nullish(),
      status: z.enum(INTERNSHIP_STATUS).nullish(),
    }),
  ),
});

export type DepartmentColumn = z.infer<typeof deparmentColumnSchema>;
