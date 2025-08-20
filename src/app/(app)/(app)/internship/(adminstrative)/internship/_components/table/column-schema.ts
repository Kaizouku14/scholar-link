import z from "zod";

export const InternColumnSchema = z.object({
  companyName: z.string().nullish(),
  address: z.string().nullish(),
  supervisor: z.string().nullish(),
  supervisorEmail: z.string().nullish(),
  studentCount: z.number(),
  totalProgressHours: z.string().nullish(),
  status: z.string().nullish(),
  department: z.string().nullish(),
  interns: z
    .array(
      z.object({
        name: z.string(),
        middleName: z.string(),
        surname: z.string(),
        profile: z.string(),
        email: z.string(),
        course: z.string(),
        yearLevel: z.string(),
        section: z.string(),
        studentNo: z.string(),
        status: z.string(),
      }),
    )
    .nullish(),
});

export type InternColumn = z.infer<typeof InternColumnSchema>;
