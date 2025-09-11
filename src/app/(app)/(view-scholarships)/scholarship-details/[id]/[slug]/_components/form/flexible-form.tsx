"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FileText, ImageIcon, Type } from "lucide-react";
import type { Requirement } from "@/interfaces/scholarship/requirements";
import { createFormSchema } from "./flexible-form-schema";
import type z from "zod";
import { uploadFile } from "@/lib/uploadthing";
import { renderPersonalInfoFields } from "./personal-field";
import toast from "react-hot-toast";
import { api } from "@/trpc/react";
import type { newApplication } from "@/interfaces/scholarship/application";
import SubmitButton from "@/components/forms/submit-button";

export const ApplicationForm = ({
  requirements,
  programId,
}: {
  requirements: Requirement[];
  programId: string;
}) => {
  const formSchema = createFormSchema(requirements);
  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      sex: undefined,
      dateOfBirth: undefined,
      email: "",
      contact: "",
      address: "",
      course: undefined,
      yearLevel: undefined,
      department: "",
      section: undefined,
      studentNo: "",
      requirements: [
        {
          name: "",
          type: "document",
          description: "",
          isRequired: true,
        },
      ],
    },
  });

  const handleSubmittedRequirements = async (data: FormData) => {
    const uploadedRequirements: Record<string, { key: string; url: string }> =
      {};

    for (const [requirementId, value] of Object.entries(data)) {
      if (value instanceof FileList) {
        const file = value[0];
        if (!file) continue;

        const uploaded = await uploadFile(file);
        if (uploaded?.key && uploaded?.url) {
          uploadedRequirements[requirementId] = {
            key: uploaded.key,
            url: uploaded.url,
          };
        }
      }
    }

    return uploadedRequirements;
  };

  const { mutateAsync: sendApplication } =
    api.scholarships.sendApplication.useMutation();
  const { mutateAsync: isEmailExist } =
    api.auth.checkEmailIfExists.useMutation();
  const onSubmit = async (data: FormData) => {
    const toastId = toast.loading(
      "Hang tight! We’re processing your application...",
    );

    try {
      const emailExists = await isEmailExist({ email: data.email as string });
      if (emailExists) throw new Error("This email is already in use.");

      const uploadedRequirements = await handleSubmittedRequirements(data);
      const formData = {
        programId,
        ...data,
        requirements: uploadedRequirements,
      } as newApplication;

      await sendApplication(formData);
      toast.success("Application submitted successfully!");
      form.reset();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const renderField = (requirement: Requirement) => {
    switch (requirement.type) {
      case "document":
        return (
          <FormField
            key={requirement.requirementId}
            control={form.control}
            name={requirement.requirementId}
            render={({ field: { onChange, ref } }) => (
              <FormItem className="space-y-1">
                <FormLabel className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="text-muted-foreground h-4 w-4" />
                  {requirement.label}
                </FormLabel>
                {requirement.description && (
                  <FormDescription className="text-muted-foreground text-xs">
                    {requirement.description}
                  </FormDescription>
                )}
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx,.xlsx,.csv"
                    onChange={(e) => onChange(e.target.files)}
                    ref={ref}
                    className="cursor-pointer text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "image":
        return (
          <FormField
            key={requirement.requirementId}
            control={form.control}
            name={requirement.requirementId}
            render={({ field: { onChange, ref } }) => (
              <FormItem className="space-y-1">
                <FormLabel className="flex items-center gap-2 text-sm font-medium">
                  <ImageIcon className="text-muted-foreground h-4 w-4" />
                  {requirement.label}
                </FormLabel>
                {requirement.description && (
                  <FormDescription className="text-muted-foreground text-xs">
                    {requirement.description}
                  </FormDescription>
                )}
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onChange(e.target.files)}
                    className="cursor-pointer text-sm"
                    ref={ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "text":
        return (
          <FormField
            key={requirement.requirementId}
            control={form.control}
            name={requirement.requirementId}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="flex items-center gap-2 text-sm font-medium">
                  <Type className="text-muted-foreground h-4 w-4" />
                  {requirement.label}
                </FormLabel>
                {requirement.description && (
                  <FormDescription className="text-muted-foreground text-xs">
                    {requirement.description}
                  </FormDescription>
                )}
                <FormControl>
                  <Input
                    placeholder="Enter your answer..."
                    className="text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Card className="mt-0 pt-0 shadow-none">
      <CardHeader className="bg-primary/10 mt-0 rounded-t-lg border-b py-4">
        <CardTitle>
          <h2 className="text-2xl font-bold">Apply Now</h2>
        </CardTitle>
        <CardDescription>
          Complete the application form below and upload all required documents
          to apply for the scholarship.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {renderPersonalInfoFields({ form })}

            {requirements.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b pb-2">
                  <FileText className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Requirements</h3>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {requirements.map(renderField)}
                </div>
              </div>
            )}
            <div className="flex justify-end pt-4">
              <SubmitButton formState={form.formState} className="w-52 px-2">
                Submit Requirements
              </SubmitButton>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
