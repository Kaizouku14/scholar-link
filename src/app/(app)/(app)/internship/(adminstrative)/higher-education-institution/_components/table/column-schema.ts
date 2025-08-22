import z from "zod";
import { INTERNSHIP_STATUS } from "@/constants/users/status";
import { SECTIONS } from "@/constants/users/sections";

export const InternColumnSchema = z.object({
  companyName: z.string().nullish(),
  address: z.string().nullish(),
  supervisor: z.string().nullish(),
  supervisorEmail: z.string().nullish(),
  studentCount: z.number(),
  totalProgressHours: z.string().nullish(),
  status: z.string().nullish(),
  department: z.string().nullish(),
  interns: z.array(
    z.object({
      name: z.string(),
      middleName: z.string(),
      surname: z.string(),
      profile: z.string(),
      email: z.string(),
      status: z.enum(INTERNSHIP_STATUS),
      section: z.enum(SECTIONS),
    }),
  ),
});

export type InternColumn = z.infer<typeof InternColumnSchema>;
