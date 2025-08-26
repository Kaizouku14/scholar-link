import { GENDERS } from "@/constants/users/genders";
import { YEAR_LEVEL } from "@/constants/users/year-level";
import z from "zod";

export const profileSetupSchema = z.object({
  profile: z.instanceof(File),
  gender: z.enum(GENDERS),
  address: z.string().min(1, { message: "Address is required" }),
  contact: z
    .string()
    .min(1, { message: "Contact number is required" })
    .regex(/^09\d{9}$/, { message: "Invalid phone number format" }),
  dateOfBirth: z.date({ message: "Date of birth is required" }),
});

export const studentSetupSchema = z.object({
  studentNo: z.string().min(1, { message: "Student number is required" }),
  yearLevel: z.enum(YEAR_LEVEL),
});

export const combinedSetupSchema = profileSetupSchema.and(studentSetupSchema);

export type ProfileSetupSchema = z.infer<typeof profileSetupSchema>;
export type StudentSetupSchema = z.infer<typeof studentSetupSchema>;
export type CombinedSetupSchema = z.infer<typeof combinedSetupSchema>;
