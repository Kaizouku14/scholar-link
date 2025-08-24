import { SECTIONS } from "@/constants/users/sections";
import z from "zod";

export const accountSchema = z.object({
  name: z.string().nullish(),
  email: z.string().email().nullish(),
  role: z.string().nullish(),
  section: z.array(z.enum(SECTIONS)).nullish(),
  course: z.string().nullish(),
  yearLevel: z.string().nullish(),
  profile: z.string().nullish(),
  status: z.string().nullish(),
});

export type AccountSchema = z.infer<typeof accountSchema>;
