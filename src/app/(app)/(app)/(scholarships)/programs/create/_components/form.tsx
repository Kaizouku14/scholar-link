"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { toast } from "sonner";
import { ScholarshipFormSchema, type ScholarshipFormData } from "./schema";
import { useFormState } from "@/hooks/use-form-state";
import SubmitButton from "@/components/forms/submit-button";
import { FormBuilderSection } from "./form-sections/form-builder-section";
import { ApplicationProcess } from "./form-sections/application-process";
import { BasicInformation } from "./form-sections/basic-information";
import { EligibilitySection } from "./form-sections/eligibility-section";
import { ProgramDetails } from "./form-sections/program-details";
import { RequirementsSection } from "./form-sections/requirements-section";
import { api } from "@/trpc/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { uploadImage } from "@/lib/utils";

export default function ScholarshipForm() {
  const form = useForm<ScholarshipFormData>({
    resolver: zodResolver(ScholarshipFormSchema),
    defaultValues: {
      name: "",
      type: "Student assistantship",
      description: "",
      slots: 0,
      location: "",
      submissionType: "online",
      image: undefined,
      deadline: undefined,
    },
  });

  const {
    additionalInfo,
    formFields,
    setFormFields,
    updateDetails,
    updateArray,
    addToArray,
    removeFromArray,
  } = useFormState();

  const [fileName, setFileName] = useState<string | null>("");
  const [submissionType, setSubmissionType] = useState<string>("on-site");
  const { mutateAsync: createProgramMutation } =
    api.scholarships.createScholarshipProgram.useMutation();

  const onSubmit = async (basicInfo: ScholarshipFormData) => {
    try {
      let uploadedImage = null;
      if (basicInfo.image) {
        try {
          uploadedImage = await uploadImage(basicInfo.image);
        } catch (uploadError) {
          toast.error("Failed to upload image. Please try again.");
          return;
        }
      }

      toast.info("Processing data, please wait...");

      toast.promise(
        createProgramMutation({
          basicInfo: {
            ...basicInfo,
            imageUrl: uploadedImage?.url,
            imageKey: uploadedImage?.key,
          },
          formFields,
          additionalInfo: JSON.stringify(additionalInfo),
        }),
        {
          loading: "Creating scholarship program...",
          success: "Scholarship program created successfully!",
          error: (error: unknown) => {
            return (error as Error).message;
          },
        },
      );

      form.reset();
      setFileName(null);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to create scholarship program.");
    }
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="basic">
            <TabsList
              className={`grid w-full ${submissionType === "on-site" ? "grid-cols-5" : "grid-cols-6"}`}
            >
              <TabsTrigger value="basic" className="text-xs">
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="details" className="text-xs">
                Program Details
              </TabsTrigger>
              <TabsTrigger value="eligibility" className="text-xs">
                Eligibility
              </TabsTrigger>
              <TabsTrigger value="requirements" className="text-xs">
                Requirements
              </TabsTrigger>
              <TabsTrigger value="process" className="text-xs">
                Application Process
              </TabsTrigger>
              {submissionType !== "on-site" && (
                <TabsTrigger value="form-builder" className="text-xs">
                  Custom Fields
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="basic" className="mt-6">
              <BasicInformation
                control={form.control}
                fileName={fileName}
                setFileName={setFileName}
                setSubmissionType={setSubmissionType}
              />
            </TabsContent>

            <TabsContent value="details" className="mt-6">
              <ProgramDetails
                additionalInfo={additionalInfo}
                updateDetails={updateDetails}
                updateArray={updateArray}
                addToArray={addToArray}
                removeFromArray={removeFromArray}
              />
            </TabsContent>

            <TabsContent value="eligibility" className="mt-6">
              <EligibilitySection
                additionalInfo={additionalInfo}
                updateDetails={updateDetails}
                updateArray={updateArray}
                addToArray={addToArray}
                removeFromArray={removeFromArray}
              />
            </TabsContent>

            <TabsContent value="requirements" className="mt-6">
              <RequirementsSection
                additionalInfo={additionalInfo}
                updateArray={updateArray}
                addToArray={addToArray}
                removeFromArray={removeFromArray}
              />
            </TabsContent>

            <TabsContent value="process" className="mt-6">
              <ApplicationProcess
                additionalInfo={additionalInfo}
                updateArray={updateArray}
                addToArray={addToArray}
                removeFromArray={removeFromArray}
              />
            </TabsContent>

            <TabsContent value="form-builder" className="mt-6">
              <FormBuilderSection
                formFields={formFields}
                setFormFields={setFormFields}
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end">
            <SubmitButton formState={form.formState}>
              Create Scholarship Program
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
