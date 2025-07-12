import z from "zod";

export const formSchema = z.object({
  to: z
    .string()
    .min(1, "At least one recipient is required")
    .email("Please enter a valid email address"),
  subject: z.string().min(1, "Subject is required"),
  content: z.string().min(1, "Message content is required"),
});

export type FormSchema = z.infer<typeof formSchema>;
