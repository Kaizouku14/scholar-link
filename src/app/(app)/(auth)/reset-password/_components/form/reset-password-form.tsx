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
import { useRouter } from "next/navigation";
import { PageRoutes } from "@/constants/page-routes";

export const ResetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouter();
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordSchema) => {
    const { newPassword } = values;
    try {
      const { error } = await authClient.resetPassword({
        newPassword,
        token,
      });

      if (error?.message) {
        throw new Error(error.message);
      }

      toast.success("Password reset successfully. You can now log in.", {
        position: "top-center",
      });
      router.push(PageRoutes.LOGIN);
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
