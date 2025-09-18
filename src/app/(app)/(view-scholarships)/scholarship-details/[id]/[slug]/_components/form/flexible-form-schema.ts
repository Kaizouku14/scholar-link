import { COURSES } from "@/constants/users/courses";
import { GENDERS } from "@/constants/users/genders";
import type { Requirement } from "@/interfaces/scholarship/requirements";
import * as z from "zod";

export const createFormSchema = (requirements: Requirement[]) => {
  const schemaFields: Record<string, z.ZodTypeAny> = {
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters"),
    sex: z.enum(GENDERS, { message: "sex is required" }),
    dateOfBirth: z.date({ message: "Date of birth is required" }),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    contact: z
      .string()
      .min(1, "Contact number is required")
      .min(10, "Contact number must be at least 10 digits"),
    address: z
      .string()
      .min(1, "Address is required")
      .min(10, "Please provide a complete address"),
    course: z.enum(COURSES, { message: "Course is required" }),
  };

  requirements.forEach((req) => {
    const baseFileSchema = z
      .instanceof(FileList, { message: `${req.label} is required` })
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
