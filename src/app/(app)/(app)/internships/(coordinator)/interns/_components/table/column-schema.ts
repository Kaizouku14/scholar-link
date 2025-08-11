import z from "zod";

export const InternColumnSchema = z.object({
  companyName: z.string().nullish(),
  supervisor: z.string().nullish(),
  supervisorEmail: z.string().nullish(),
  studentCount: z.number(),
  totalProgressHours: z.string().nullish(),
  department: z.string().nullish(),
});

export type InternColumn = z.infer<typeof InternColumnSchema>;
