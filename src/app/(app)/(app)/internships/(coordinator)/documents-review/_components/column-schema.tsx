import z from "zod";
import { DOCUMENTS } from "@/constants/documents";
import { STATUS } from "@/constants/status";

export const columnSchema = z.object({
  id: z.string(),
  documentType: z.enum(DOCUMENTS),
  documentUrl: z.string().nullish(),
  reviewStatus: z.enum(STATUS).nullish(),
  submittedAt: z.date().nullish(),

  name: z.string().nullish(),
  profileKey: z.string().nullish(),
  section: z.string().nullish(),
  course: z.string().nullish(),
  companyName: z.string(),
});

export type ColumnSchema = z.infer<typeof columnSchema>;
