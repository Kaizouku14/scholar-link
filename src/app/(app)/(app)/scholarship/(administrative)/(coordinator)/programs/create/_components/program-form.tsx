"use client";

import { useForm } from "react-hook-form";
import {
  type ScholarshipFormData,
  scholarshipFormSchema,
} from "@/components/forms/schema/program-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequirementsForm } from "./requirements-form";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import SubmitButton from "@/components/forms/submit-button";
import { uploadFile } from "@/lib/uploadthing";
import TipTapEditor from "@/components/titap/editor";
import { ReusableProgramForm } from "@/components/forms/reusable-program-form";

const ProgramForm = () => {
  const form = useForm<ScholarshipFormData>({
    resolver: zodResolver(scholarshipFormSchema),
    defaultValues: {
      name: "",
      type: "Government",
      eligibilityType: "document-only",
      description: "",
      section:
        "🎓 Welcome to ScholarLink! Start typing your scholarship details here. Use the toolbar to format text, add links, or highlight key info.",
      slots: 0,
      submissionType: "online",
      deadline: undefined,
      requirements: [],
    },
  });
  const { mutateAsync: createProgram } =
    api.scholarshipCoordinator.createProgram.useMutation();

  const onSubmit = async (values: ScholarshipFormData) => {
    const toastId = toast.loading("Creating scholarship program...");
    try {
      let profile;
      if (values.image) {
        profile = await uploadFile(values.image);
      }

      await createProgram({
        ...values,
        imageUrl: profile?.url,
        imageKey: profile?.key,
      });
      toast.success("Scholarship program created successfully!");
      form.reset();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full space-y-4"
      >
        <Card className="shadow-none">
          <CardHeader className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold">Create Scholarship Program</h1>
              <p className="text-muted-foreground">
                Fill out all the required fields to create a new scholarship
                program. Provide clear details so applicants can understand the
                requirements.
              </p>
            </div>

            <Tabs defaultValue="program" className="w-full">
              <TabsList>
                <TabsTrigger value="program">Program</TabsTrigger>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
              </TabsList>

              <TabsContent value="program">
                <CardContent className="mt-4 space-y-8">
                  <ReusableProgramForm form={form} />
                </CardContent>
              </TabsContent>

              <TabsContent value="overview">
                <CardContent className="mt-4">
                  <FormField
                    control={form.control}
                    name="section"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Program Overview *</FormLabel>
                        <FormControl>
                          <TipTapEditor
                            {...field}
                            className="max-h-[25rem] min-h-[25rem]"
                            editable={true}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide details about eligibility, application
                          process, and benefits. Use headings and lists for
                          clarity.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </TabsContent>

              <TabsContent value="requirements">
                <CardContent className="mt-6">
                  <RequirementsForm />
                </CardContent>
                <CardFooter className="mt-4 flex w-full justify-end gap-2">
                  <Button
                    type="button"
                    className="w-40"
                    variant="outline"
                    onClick={() => form.reset()}
                  >
                    Discard
                  </Button>
                  <SubmitButton formState={form.formState} className="w-40">
                    Create Program
                  </SubmitButton>
                </CardFooter>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </form>
    </Form>
  );
};

export default ProgramForm;
