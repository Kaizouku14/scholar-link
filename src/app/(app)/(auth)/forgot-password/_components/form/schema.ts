import { strongPasswordSchema } from "@/lib/utils";
import z from "zod";

export const resetPasswordSchema = z
  .object({
    newPassword: strongPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // Path to the field that will show the error
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
