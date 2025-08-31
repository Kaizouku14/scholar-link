"use client";

import type React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { accountFormSchema, type Accounts } from "./form-schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ROLE } from "@/constants/users/roles";
import { useMemo, useState } from "react";
import { formatText } from "@/lib/utils";
import { uploadFile } from "@/lib/uploadthing";
import toast from "react-hot-toast";
import { api } from "@/trpc/react";
import SubmitButton from "@/components/forms/submit-button";
import { authClient } from "@/lib/auth-client";
import { CoordinatorFields } from "./fields/coordinator-fields";
import { PersonalInfoSection } from "./fields/personal";
import { StudentFields } from "./fields/student-fields";

const CreateAccountForm = () => {
  const [profilePreview, setProfilePreview] = useState<string>("");
  const { data: user } = authClient.useSession();

  const userRole = user?.user.role;
  const targetRole =
    userRole === ROLE.INTERNSHIP_ADMIN
      ? ROLE.INTERNSHIP_COORDINATOR
      : ROLE.INTERNSHIP_STUDENT;

  const defaultValues = useMemo(() => {
    const baseValues = {
      name: "",
      surname: "",
      middleName: "",
      email: "",
      profile: undefined,
      contact: "",
      address: "",
      role: targetRole,
      studentNo: "",
      section: [],
      course: undefined,
      department: undefined,
      gender: undefined,
      dateOfBirth: undefined,
    };

    return baseValues;
  }, [targetRole]);

  const form = useForm<Accounts>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  const isCreatingStudent = targetRole === ROLE.INTERNSHIP_STUDENT;
  const isCreatingCoordinator = targetRole === ROLE.INTERNSHIP_COORDINATOR;

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("profile", file);
      const reader = new FileReader();
      reader.onloadend = () => setProfilePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const { mutateAsync: createUser } = api.auth.register.useMutation();

  const onSubmit = async (values: Accounts) => {
    const toastId = toast.loading("Creating user...");

    try {
      let uploadedImage;
      if (values.profile) {
        uploadedImage = await uploadFile(values.profile);
        if (!uploadedImage?.url || !uploadedImage?.key) {
          throw new Error("Failed to upload image. Please try again.");
        }
      }

      const finalValues = {
        ...values,
        name: formatText(
          `${values.name} ${values.middleName} ${values.surname}`,
        ),
        profile: uploadedImage?.url,
        role: targetRole,
      };

      await createUser({ ...finalValues, department: finalValues.department! });
      toast.success("User created successfully!");
      form.reset();
      setProfilePreview("");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error((error as Error).message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <Card className="mx-auto w-full shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight">
          Create {isCreatingStudent ? "Student" : "Coordinator"} Account
        </CardTitle>
        <p className="text-muted-foreground mt-1 text-sm">
          Fill in the details below to register a new{" "}
          {isCreatingStudent ? "student" : "coordinator"}.
        </p>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <PersonalInfoSection
              form={form}
              profilePreview={profilePreview}
              onProfileChange={handleProfilePictureChange}
            />

            <section>
              <h2 className="mb-2 text-xl font-semibold">
                Account Information
              </h2>
              <p className="text-muted-foreground mb-6 text-sm">
                Define how the user will be identified in the system.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This will be used as the login credential.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+63 912 345 6789" {...field} />
                      </FormControl>
                      <FormDescription>
                        Include country code (e.g. +63 for Philippines).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 Main St, City, Country"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter your full current residential address.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {isCreatingCoordinator && (
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <CoordinatorFields form={form} />
                </div>
              )}
            </section>

            {isCreatingStudent && <StudentFields form={form} />}

            <div className="flex w-full justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  setProfilePreview("");
                }}
              >
                Discard
              </Button>
              <SubmitButton
                formState={form.formState}
                className="w-40 font-medium"
              >
                Register User
              </SubmitButton>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateAccountForm;
