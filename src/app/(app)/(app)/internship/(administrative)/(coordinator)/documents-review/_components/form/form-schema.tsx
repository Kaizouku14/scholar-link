import z from "zod";

export const formSchema = z.object({
  documentType: z.string(),
  deadline: z.date(),
});

export type FormSchema = z.infer<typeof formSchema>;
