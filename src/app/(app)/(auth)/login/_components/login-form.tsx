"use client";

import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/forms/submit-button";
import PasswordInput from "@/components/forms/password-input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { PageRoutes } from "@/constants/page-routes";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { Hand } from "lucide-react";

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { mutateAsync: onBoardedMutation } =
    api.auth.checkStudendIsOnBoarded.useMutation();
  const onSubmit = async (values: LoginSchema) => {
    const { email, password, rememberMe } = values;
    const toastId = toast.loading("Processing sign-in request...", {
      position: "top-center",
    });

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success("You're signed in! Redirecting shortly...", {
        id: toastId,
        position: "top-center",
      });

      const onboarded = await onBoardedMutation({ id: data.user.id });
      if (onboarded) router.push(PageRoutes.DASHBOARD);
      else router.push(PageRoutes.SETUP);
    } catch (error) {
      toast.error((error as Error).message, {
        position: "top-center",
      });
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground text-sm">
            Login to your ScholarLink account.
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="m@example.com"
                    className="shadow-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      id="password"
                      type="password"
                      className="shadow-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="mt-2 flex flex-row items-center">
                    <FormControl>
                      <Checkbox
                        id="rememberMe"
                        className="flex items-center"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor="rememberMe"
                      className="text-xs select-none"
                    >
                      Remember me
                    </FormLabel>
                  </FormItem>
                )}
              />

              <Link
                href={PageRoutes.FORGOT_PASSWORD}
                className="text-primary flex h-6 items-end text-xs underline"
              >
                <div>Forgot Password?</div>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <SubmitButton className="w-full" formState={form.formState}>
              Login
            </SubmitButton>
            <div className="item-center flex justify-center gap-2">
              <div className="text-xs">New intern? Sign up here!</div>
              <Link
                href={PageRoutes.SIGN_UP}
                className="text-primary text-xs underline"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
