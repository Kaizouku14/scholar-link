import z from "zod";

export const formSchema = z.object({
  to: z.string().min(1, "Email is required"),
  subject: z.string().min(1, "Subject is required"),
  content: z.string().min(1, "Message content is required"),
});

export type FormSchema = z.infer<typeof formSchema>;
