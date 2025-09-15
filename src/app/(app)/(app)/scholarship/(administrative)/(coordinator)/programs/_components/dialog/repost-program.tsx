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
import { LoaderCircle, RotateCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn, formatText } from "@/lib/utils";
import {
  SUBMISSION_TYPE,
  type submissionType,
} from "@/constants/scholarship/submittion-type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { api } from "@/trpc/react";
import type { QueryObserverResult } from "@tanstack/react-query";
import {
  type ActivationSchema,
  activationSchema,
} from "./schema/activation-schema";
import type { Requirement } from "@/interfaces/scholarship/requirements";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditRequirements from "./form/edit-requirements";
import {
  ELIGIBILITY_TYPE,
  type eligibilityType,
} from "@/constants/scholarship/eligiblity-type";

const RepostProgram = ({
  data,
  refetch,
}: {
  data: {
    programId: string;
    deadline: Date;
    submissionType: submissionType;
    eligibilityType: eligibilityType;
    slots: number;
    requirements: Requirement[];
  };
  refetch: () => Promise<QueryObserverResult<unknown[] | undefined, unknown>>;
}) => {
  const [open, setOpen] = useState(false);
  const form = useForm<ActivationSchema>({
    resolver: zodResolver(activationSchema),
    defaultValues: {
      deadline: data.deadline,
      eligibilityType: data.eligibilityType,
      submissionType: data.submissionType,
      slots: data.slots,
      requirements:
        data.requirements?.map((req) => ({
          ...req,
          isRequired: Boolean(req.isRequired),
        })) ?? [],
    },
  });
  const { mutateAsync: activateProgram, isPending } =
    api.scholarshipCoordinator.updateProgramAvailability.useMutation();

  async function onSubmit(values: ActivationSchema) {
    try {
      await activateProgram({
        programId: data.programId,
        ...values,
      });

      setOpen(false);
      toast.success("Scholarship program status activated successfully!");
      await refetch();
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="flex w-full cursor-pointer items-center justify-center space-x-2 bg-transparent text-green-600 transition-colors hover:bg-green-50 hover:text-green-700"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Repost Program</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Repost Program</DialogTitle>
          <DialogDescription>
            Configure and activate your program.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs defaultValue="information">
              <TabsList>
                <TabsTrigger value="information">Program Details</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
              </TabsList>
              <TabsContent value="information" className="my-2 space-y-6">
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Program Deadline</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription className="text-xs">
                        Set the deadline for program submissions.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="submissionType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Submission Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select submission type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SUBMISSION_TYPE.map((type) => (
                              <SelectItem key={type} value={type}>
                                {formatText(type)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                        <FormDescription className="text-xs">
                          Set the submission type of the program.
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="eligibilityType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Eligibility Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select submission type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ELIGIBILITY_TYPE.map((type) => (
                              <SelectItem key={type} value={type}>
                                {formatText(type)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                        <FormDescription className="text-xs">
                          Set the eligibility type of the program.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="slots"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Slots</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter number of slots"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Maximum number of participants allowed in this program.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="requirements">
                <EditRequirements />
              </TabsContent>
            </Tabs>
            <DialogFooter className="mt-2">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending} className="w-40">
                {isPending ? (
                  <LoaderCircle className="text-primary-foreground h-6 w-6 animate-spin" />
                ) : (
                  "Repost Program"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RepostProgram;
