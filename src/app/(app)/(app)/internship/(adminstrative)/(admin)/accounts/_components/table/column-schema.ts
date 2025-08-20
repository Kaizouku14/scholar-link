import z from "zod";

export const accountSchema = z.object({
  name: z.string().nullish(),
  middleName: z.string().nullish(),
  surname: z.string().nullish(),
  email: z.string().email().nullish(),
  role: z.string().nullish(),
  section: z.string().nullish(),
  course: z.string().nullish(),
  yearLevel: z.string().nullish(),
  profile: z.string().nullish(),
  studentNo: z.string().nullish(),
  status: z.string().nullish(),
});

export type AccountSchema = z.infer<typeof accountSchema>;
