import z from "zod";

export const InternColumnSchema = z.object({
  companyName: z.string().nullish(),
  supervisor: z.string().nullish(),
  supervisorEmail: z.string().nullish(),
  studentCount: z.number().nullish(),
  totalProgressHours: z.string().nullish(),
});

export type InternColumn = z.infer<typeof InternColumnSchema>;
