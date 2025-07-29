import { strongPasswordSchema } from "@/lib/utils";
import z from "zod";

export const signUpSchema = z.object({
  studentNo: z.string({
    message: "Student number is required",
  }),
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  middleName: z.string().min(1, "Middle name is required"),
  email: z.string().email(),
  password: strongPasswordSchema,
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
