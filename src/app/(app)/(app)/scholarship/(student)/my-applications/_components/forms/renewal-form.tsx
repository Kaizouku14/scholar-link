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
import { RefreshCw } from "lucide-react";
import { createFormSchema } from "./schema/renewal-schema";
import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { RenderRequirementItem } from "@/components/forms/flexible-form-item";
import SubmitButton from "@/components/forms/submit-button";
import { api } from "@/trpc/react";
import { handleSubmittedRequirements } from "@/lib/utils";
import toast from "react-hot-toast";
import { useState } from "react";

export const RenewalForm = ({
  requirements,
  programId,
}: {
  requirements: Requirement[];
  programId: string;
}) => {
  const formSchema = createFormSchema(requirements);
  type FormData = z.infer<typeof formSchema>;
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requirements: [
        {
          label: "",
          description: "",
          isRequired: true,
        },
      ],
    },
  });

  const { mutateAsync: SubmitRenewal } =
    api.scholarshipStudent.submitRenewal.useMutation();
  const onSubmit = async (data: FormData) => {
    try {
      const uploadedRequirements = await handleSubmittedRequirements(
        data,
        requirements,
      );

      await SubmitRenewal({ programId, requirements: uploadedRequirements });
      setOpen(false);
      toast.success("Scholarship renewal submitted!");
      form.reset();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {requirements.map((req) => (
                <RenderRequirementItem<typeof formSchema>
                  key={req.requirementId}
                  requirement={req}
                  control={form.control}
                />
              ))}
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
