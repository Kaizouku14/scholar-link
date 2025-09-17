import type { Requirement } from "@/interfaces/scholarship/requirements";
import * as z from "zod";

export const createFormSchema = (requirements: Requirement[]) => {
  const schemaFields: Record<string, z.ZodTypeAny> = {};
  requirements.forEach((req) => {
    const baseFileSchema = z
      .instanceof(FileList)
      .refine((files) => files[0] && files?.[0]?.size <= 5_000_000, {
        message: "File size should be less than 5MB",
      });

    schemaFields[req.requirementId!] = req.isRequired
      ? baseFileSchema.refine((files) => files?.length > 0, {
          message: `${req.label} is required`,
        })
      : baseFileSchema.optional();
  });

  return z.object(schemaFields);
};
