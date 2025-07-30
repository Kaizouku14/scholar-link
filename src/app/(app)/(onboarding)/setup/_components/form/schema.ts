import { COURSES } from "@/constants/courses";
import { DEPARTMENTS } from "@/constants/departments";
import { GENDERS } from "@/constants/genders";
import { YEAR_LEVEL } from "@/constants/year-level";
import z from "zod";

export const profileSetupSchema = z.object({
  gender: z.enum(GENDERS),
  address: z.string().min(1, { message: "Address is required" }),
  contactNo: z
    .string()
    .min(1, { message: "Contact number is required" })
    .regex(/^09\d{9}$/, { message: "Invalid phone number format" }),
  profilePicture: z.instanceof(File).optional(),
});

export const studentSetupSchema = z.object({
  course: z.enum(COURSES),
  department: z.enum(DEPARTMENTS),
  yearLevel: z.enum(YEAR_LEVEL),
});

export type ProfileSetupSchema = z.infer<typeof profileSetupSchema>;
export type StudentSetupSchema = z.infer<typeof studentSetupSchema>;
