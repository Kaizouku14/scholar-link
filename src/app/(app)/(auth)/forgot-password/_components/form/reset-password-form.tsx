"use client";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { resetPasswordSchema, type ResetPasswordSchema } from "./schema";
import SubmitButton from "@/components/forms/submit-button";

interface ResetPasswordFormProps {
  email: string;
  otp: string;
}

export const ResetPasswordForm = ({ email, otp }: ResetPasswordFormProps) => {
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordSchema) => {
    try {
      const { error } = await authClient.emailOtp.resetPassword({
        email,
        otp,
        password: values.newPassword,
      });
      if (error) throw new Error(error.message);
      toast.success("Password reset successfully. You can now log in.");
      // Optionally, redirect the user to the login page
      // router.push('/login');
    } catch (err) {
      toast.error("Failed to reset password: " + (err as Error).message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="new-password">New Password</FormLabel>
              <FormControl>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter your new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Re-enter your new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton className="w-full" formState={form.formState}>
          Reset Password
        </SubmitButton>
      </form>
    </Form>
  );
};
