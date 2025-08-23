import { DOCUMENTS } from "@/constants/internship/documents";
import z from "zod";

export const formSchema = z.object({
  documentType: z.enum(DOCUMENTS),
  deadline: z.date(),
});

export type FormSchema = z.infer<typeof formSchema>;
