"use client";

import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/forms/submit-button";
import PasswordInput from "@/components/forms/password-input";
import { useForm } from "react-hook-form";
import { signUpSchema, type SignUpSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { PageRoutes } from "@/constants/page-routes";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      studentNo: "",
      name: "",
      surname: "",
      middleName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignUpSchema) => {
    const { studentNo, name, surname, middleName, email, password } = values;
    const toastId = toast.loading("Signing up...", {
      position: "top-center",
    });

    try {
      const response = await authClient.signUp.email({
        studentNo,
        name,
        surname,
        middleName,
        email,
        password,
        callbackURL: PageRoutes.LOGIN,
      });

      if (response.error) {
        throw new Error(response.error.message);
      } else {
        toast.success(
          () => {
            return (
              <div className="flex flex-col">
                <p>Pleas wait for the admin to verify your account!</p>
                <p className="text-muted-foreground m-0 text-sm">
                  Always check your email
                </p>
              </div>
            );
          },
          { id: toastId, duration: 5000, position: "top-center" },
        );
      }

      router.push(PageRoutes.LOGIN);
      form.reset();
    } catch (error) {
      toast.error((error as Error).message, {
        id: toastId,
        position: "top-center",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Welcome Future Professional!</h1>
          <p className="text-muted-foreground text-sm">
            Manage your internship journey — all in one place.
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid grid-cols-3 items-center gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Denzel" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Surname</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="studentNo"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Student No.</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="e.g 2022123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <div className="flex flex-col gap-2">
            <SubmitButton className="w-full" formState={form.formState}>
              Sign Up
            </SubmitButton>
            <div className="item-center flex justify-center gap-2">
              <div className="text-xs">Already have an account?</div>
              <Link
                href={PageRoutes.LOGIN}
                className="text-primary text-xs underline"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
