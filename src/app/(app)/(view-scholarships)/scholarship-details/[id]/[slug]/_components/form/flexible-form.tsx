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
import { Form } from "@/components/ui/form";
import { FileText } from "lucide-react";
import type { Requirement } from "@/interfaces/scholarship/requirements";
import { createFormSchema } from "./flexible-form-schema";
import type z from "zod";
import { renderPersonalInfoFields } from "./personal-field";
import toast from "react-hot-toast";
import { api } from "@/trpc/react";
import type { NewApplication } from "@/interfaces/scholarship/application";
import SubmitButton from "@/components/forms/submit-button";
import { handleSubmittedRequirements } from "@/lib/utils";
import { RenderRequirementItem } from "@/components/forms/flexible-form-item";

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
      requirements: [
        {
          label: "",
          description: "",
          isRequired: true,
        },
      ],
    },
  });

  const { mutateAsync: sendApplication } =
    api.scholarships.sendApplication.useMutation();
  const onSubmit = async (data: FormData) => {
    const toastId = toast.loading(
      "Hang tight! We’re processing your application...",
    );

    try {
      const uploadedRequirements = await handleSubmittedRequirements(
        data,
        requirements,
      );

      const formData = {
        programId,
        ...data,
        requirements: uploadedRequirements,
      } as NewApplication;

      await sendApplication(formData);
      toast.success("Application submitted successfully!");
      form.reset();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      toast.dismiss(toastId);
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

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {requirements.map((req) => (
                    <RenderRequirementItem<typeof formSchema>
                      key={req.requirementId}
                      requirement={req}
                      control={form.control}
                    />
                  ))}
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
