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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SquarePen } from "lucide-react";
import {
  scholarshipFormSchema,
  type ScholarshipFormData,
} from "@/components/forms/schema/program-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Program } from "@/interfaces/scholarship/scholarship-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import { ReusableProgramForm } from "@/components/forms/reusable-program-form";
import EditRequirements from "./edit-requirements";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import React from "react";
import { uploadFile } from "@/lib/uploadthing";
import SubmitButton from "@/components/forms/submit-button";

export const EditProgram = ({ data }: { data: Program }) => {
  const [open, setOpen] = React.useState(false);
  const form = useForm<ScholarshipFormData>({
    resolver: zodResolver(scholarshipFormSchema),
    defaultValues: {
      ...data,
      requirements:
        data.requirements?.map((req) => ({
          ...req,
          isRequired: Boolean(req.isRequired),
        })) ?? [],
    },
  });
  const { mutateAsync: updateProgram } =
    api.scholarshipCoordinator.updateProgramDetails.useMutation();

  const handleEditProgram = async (values: ScholarshipFormData) => {
    try {
      let profile;
      if (values.image) {
        profile = await uploadFile(values.image);
      }

      await updateProgram({
        programId: data.programId,
        imageUrl: profile?.url,
        imageKey: profile?.key,
        announcement: data.announcement ?? "",
        ...values,
      });
      setOpen(false);
      toast.success("Program updated successfully!");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  console.log(form.formState.errors);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              size={"icon"}
              variant={"outline"}
              className="cursor-pointer"
            >
              <SquarePen className="h-5 w-5" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit Program</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="h-[35rem] sm:max-w-[620px]">
        <DialogHeader>
          <DialogTitle>Edit Scholarship Program</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Edit and review program information before saving your updates.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEditProgram)}
            className="mt-2 space-y-4"
          >
            <Tabs defaultValue="information">
              <TabsList>
                <TabsTrigger value="information">Program Details</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
              </TabsList>
              <TabsContent value="information" className="space-y-4">
                <ReusableProgramForm form={form} viewDescription={false} />
              </TabsContent>
              <TabsContent value="requirements" className="space-y-4">
                <EditRequirements />
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <SubmitButton formState={form.formState} className="w-40">
                Save Changes
              </SubmitButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
