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

  const onSubmit = async (values: LoginSchema) => {
    const { email, password, rememberMe } = values;
    const toastId = toast.loading("Signing in...", {
      position: "top-center",
    });
    try {
      const response = await authClient.signIn.email({
        email,
        password,
        rememberMe,
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      toast.success("Signed in successfully!", {
        id: toastId,
        position: "top-center",
      });

      router.push(PageRoutes.DASHBOARD);
    } catch (error) {
      toast.error((error as Error).message, {
        position: "top-center",
      });
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
                  <Input type="email" placeholder="m@example.com" {...field} />
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
                    <PasswordInput id="password" type="password" {...field} />
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
                href=""
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
