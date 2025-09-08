import type { Requirement } from "@/interfaces/scholarship/requirements";
import * as z from "zod";

export const createFormSchema = (requirements: Requirement[]) => {
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  requirements.forEach((req) => {
    switch (req.type) {
      case "document":
      case "image":
        schemaFields[req.requirementId] = z
          .instanceof(FileList)
          .refine((files) => files?.length > 0, "File is required")
          .refine(
            (files) => files?.[0] && files[0].size <= 5000000,
            "File size should be less than 5MB",
          );
        break;
      case "essay":
        schemaFields[req.requirementId] = z
          .string()
          .min(1, "Essay is required")
          .min(50, "Essay should be at least 50 characters");
        break;
      case "text":
        schemaFields[req.requirementId] = z
          .string()
          .min(1, "This field is required");
        break;
    }
  });

  return z.object(schemaFields);
};
