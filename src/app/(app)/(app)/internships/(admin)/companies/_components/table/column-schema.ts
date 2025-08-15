import z from "zod";

export const companySchema = z.object({
  companyName: z.string().nullish(),
  address: z.string().nullish(),
  contactPerson: z.string().nullish(),
  contactPersonEmail: z.string().nullish(),
  contactPersonNo: z.string().nullish(),
  internCount: z.number().nullish(),
});

export type CompanySchema = z.infer<typeof companySchema>;
