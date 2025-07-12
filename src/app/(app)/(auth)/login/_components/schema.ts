import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email too long" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(255, { message: "Password too long" }),
  rememberMe: z.boolean().default(false).optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
