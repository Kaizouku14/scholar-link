"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Requirement } from "@/interfaces/scholarship/requirements";
import { Check, Edit2, FileText, RefreshCw, X } from "lucide-react";
import { Controller, useForm, type Path } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import SubmitButton from "@/components/forms/submit-button";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useState } from "react";
import type { ScholarDocument } from "@/interfaces/scholarship/documents";
import { Input } from "@/components/ui/input";
import { uploadFile } from "@/lib/uploadthing";
import type { RenewalSchema } from "./schema/renewal-schema";

export const RenewalForm = ({
  requirements,
  documents,
  applicationId,
}: {
  requirements: Requirement[];
  documents: ScholarDocument[];
  applicationId: string;
}) => {
  const form = useForm<RenewalSchema>({
    defaultValues: {
      requirements: requirements.map((req) => ({
        label: req.label,
        file: undefined,
      })),
    },
  });

  const { control, setValue, handleSubmit } = form;
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const sumbitFileToRenew = async ({ data }: { data: RenewalSchema }) => {
    const uploadedRequirements: Record<
      string,
      { label: string; key: string; url: string }
    > = {};

    for (const requirement of data.requirements) {
      const { label, file } = requirement;
      if (!file) continue;

      const renewedDocuments = await uploadFile(file);
      if (renewedDocuments?.key && renewedDocuments?.url) {
        uploadedRequirements[label] = {
          label,
          key: renewedDocuments.key,
          url: renewedDocuments.url,
        };
      }
    }

    return uploadedRequirements;
  };

  const { mutateAsync: SubmitRenewal } =
    api.scholarshipStudent.submitRenewal.useMutation();
  const { refetch } = api.scholarshipStudent.fetchAllApplications.useQuery(
    undefined,
    {
      enabled: false,
    },
  );
  const onSubmit = async (data: RenewalSchema) => {
    try {
      const uploadedRequirements = await sumbitFileToRenew({ data });
      await SubmitRenewal({
        applicationId,
        requirements: uploadedRequirements,
      });

      form.reset();
      setOpen(false);
      toast.success("Scholarship renewal submitted!");
      await refetch();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const startEditing = (index: number) => setEditingIndex(index);
  const cancelEditing = () => setEditingIndex(null);
  const saveEditing = () => setEditingIndex(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          variant={"outline"}
          className="w-full cursor-pointer border-blue-200 font-medium text-blue-500 hover:text-blue-600"
        >
          <RefreshCw className="h-4 w-4" />
          Renew Application
        </Button>
      </DialogTrigger>
      <DialogContent className="h-auto overflow-y-auto sm:max-w-[40rem]">
        <DialogHeader>
          <DialogTitle>Scholarship Program Renewal</DialogTitle>
          <DialogDescription>
            Submit the required documents below to renew your scholarship
            application. Make sure all files are complete and up-to-date before
            submitting.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col-reverse space-y-1.5 p-2">
              {requirements.map((req, index) => {
                const submittedDoc = documents.find(
                  (doc) => doc.label === req.label,
                );
                const isEditing = editingIndex === index;

                return (
                  <div
                    key={req.requirementId}
                    className={cn(
                      "border-border flex flex-col gap-2.5 rounded-md border px-2.5 py-2",
                      index === requirements.length - 1 && "mb-1.5",
                      !submittedDoc && "border-primary border",
                    )}
                  >
                    {!isEditing ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-1.5">
                          <FileText className="h-4 w-4" />
                          <span className="max-w-[15rem] truncate text-sm font-medium">
                            {req.label}
                          </span>
                          {form.getValues(`requirements.${index}.file`) ? (
                            <span className="ml-2 text-xs text-green-600">
                              {
                                form.getValues(`requirements.${index}.file`)
                                  ?.name
                              }
                            </span>
                          ) : submittedDoc ? (
                            <a
                              href={submittedDoc.url ?? undefined}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-2 text-xs text-blue-600 hover:underline"
                            >
                              View file
                            </a>
                          ) : (
                            <span className="text-primary ml-2 text-xs">
                              New Requirement
                            </span>
                          )}
                        </div>

                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => startEditing(index)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <FormItem>
                          <FormLabel>{req.label}</FormLabel>
                          <FormControl>
                            <Controller
                              control={control}
                              name={
                                `requirements.${index}.file` as Path<RenewalSchema>
                              }
                              render={({ field }) => (
                                <Input
                                  type="file"
                                  onChange={(e) => {
                                    field.onChange(e.target.files?.[0]);
                                    setValue(
                                      `requirements.${index}.label`,
                                      req.label,
                                    );
                                  }}
                                />
                              )}
                            />
                          </FormControl>
                        </FormItem>

                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={cancelEditing}
                          >
                            <X className="h-4 w-4" /> Cancel
                          </Button>
                          <Button
                            type="button"
                            variant="default"
                            size="sm"
                            onClick={saveEditing}
                          >
                            <Check className="h-4 w-4" /> Save
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <SubmitButton formState={form.formState} className="w-40">
                Submit Renewal
              </SubmitButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
