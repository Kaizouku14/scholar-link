"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { companyformSchema, type CompanyFormSchema } from "./schema";
import SubmitButton from "@/components/forms/submit-button";
import { api } from "@/trpc/react";

const CompanyForm = () => {
  const form = useForm<CompanyFormSchema>({
    resolver: zodResolver(companyformSchema),
    defaultValues: {
      name: "",
      address: "",
      contactPerson: "",
      contactEmail: "",
      contactNo: "",
    },
  });

  const { mutateAsync: createInternship } =
    api.internships.createStudentInternship.useMutation();
  function onSubmit(values: CompanyFormSchema) {
    const { name, address, contactPerson, contactEmail, contactNo } = values;
    toast.promise(
      createInternship({
        name,
        address,
        contactPerson,
        contactEmail,
        contactNo,
      }),
      {
        loading: "Saving internship company details...",
        success: () => {
          form.reset();
          return "Internship company linked successfully!";
        },
        error: (error: unknown) => ({
          message: (error as Error).message,
          duration: 5000,
        }),
      },
    );
  }

  return (
    <div className="border-border mx-auto w-full space-y-6 rounded-xl border p-8">
      <div className="space-y-2 text-start">
        <h1 className="text-3xl font-bold">Manage Company Details</h1>
        <p className="text-muted-foreground">
          Enter the details of your company.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Corp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="123 Main St, Anytown, USA"
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 09123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <SubmitButton formState={form.formState} className="mt-4 w-40">
              Add Company
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CompanyForm;
