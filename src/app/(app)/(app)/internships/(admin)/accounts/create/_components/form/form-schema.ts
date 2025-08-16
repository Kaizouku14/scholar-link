import z from "zod";

export const accountFormSchema = z.object({});

export type Accounts = z.infer<typeof accountFormSchema>;
