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
import { ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
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
} from "../ui/select";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import type { QueryObserverResult } from "@tanstack/react-query";

const formSchema = z.object({
  deadline: z.date({
    required_error: "A deadline date is required.",
  }),
  submissionType: z.enum(SUBMISSION_TYPE),
  slots: z.coerce
    .number()
    .min(1, {
      message: "Number of slots must be at least 1.",
    })
    .max(1000, {
      message: "Number of slots cannot exceed 1000.",
    }),
});

const ActivateProgram = ({
  data,
  refetch,
}: {
  data: {
    programId: string;
    deadline: Date;
    submissionType: submissionType;
    slots: number;
  };
  refetch: () => Promise<QueryObserverResult<unknown[] | undefined, unknown>>;
}) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deadline: data.deadline,
      submissionType: data.submissionType,
      slots: data.slots,
    },
  });
  const { mutateAsync: activateProgram } =
    api.scholarships.updateProgramAvailability.useMutation();

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.promise(
      activateProgram({
        programId: data.programId,
        ...values,
      }),
      {
        loading: "activating scholarship program status...",
        success: () => {
          refetch();
          return "Scholarship program status activated successfully!";
        },
        error: (error: unknown) => {
          return (error as Error).message;
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="flex w-full cursor-pointer items-center justify-center space-x-2 bg-transparent text-green-600 transition-colors hover:bg-green-50 hover:text-green-700"
        >
          <ShieldCheck className="h-4 w-4" />
          <span>Activate</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Activate Program</DialogTitle>
          <DialogDescription>
            Configure and activate your program.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="mt-4 space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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
                          {type}
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

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Activate Program</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ActivateProgram;
