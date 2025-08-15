import z from "zod";

export const supervisorSchema = z.object({
  supervisorName: z.string().nullish(),
  supervisorEmail: z.string().nullish(),
  supervisorContactNo: z.string().nullish(),
  companyName: z.string().nullish(),
  companyAddress: z.string().nullish(),
  internCount: z.number().nullish(),
});

export type SupervisorSchema = z.infer<typeof supervisorSchema>;
