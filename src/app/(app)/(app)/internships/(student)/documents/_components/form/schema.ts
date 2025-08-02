import { DOCUMENTS } from "@/constants/documents";
import { z } from "zod";

export const documentSchema = z.object({
  documentType: z.enum(DOCUMENTS),
  documentFile: z.instanceof(File, { message: "File is required" }),
});

export type DocumentSchema = z.infer<typeof documentSchema>;
