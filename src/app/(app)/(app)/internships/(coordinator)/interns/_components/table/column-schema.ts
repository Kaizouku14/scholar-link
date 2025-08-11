import z from "zod";

export const InternColumnSchema = z.object({
  companyName: z.string(),
  supervisor: z.string(),
  supervisorEmail: z.string(),
  studentCount: z.number(),
  totalProgressHours: z.number(),
  department: z.string().nullish(),
});

export type InternColumn = z.infer<typeof InternColumnSchema>;
