import { strongPasswordSchema } from "@/lib/utils";
import z from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  middleName: z.string().min(1, "Middle name is required"),
  course: z.string(),
  department: z.string(),
  email: z.string().email(),
  password: strongPasswordSchema,
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
