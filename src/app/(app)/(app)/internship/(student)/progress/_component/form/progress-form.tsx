"use client";

import { useForm } from "react-hook-form";
import { type ProgressFormSchema, progressFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Clock, FileText, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { toast } from "react-hot-toast";
import TimePicker from "./time-picker";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/forms/submit-button";
import { validateAndCalculateHours } from "./validate-progress";

const ProgressForm = ({ refetch }: { refetch: () => Promise<unknown> }) => {
  const form = useForm<ProgressFormSchema>({
    resolver: zodResolver(progressFormSchema),
    defaultValues: {
      date: new Date(),
      timeIn: undefined,
      timeOut: undefined,
      description: "",
    },
  });

  const { mutateAsync: logProgress } =
    api.internshipStudent.insertStudentProgress.useMutation();
  const onSubmit = async (data: ProgressFormSchema) => {
    const toastId = toast.loading("Logging progress...");
    try {
      const hoursLogged = validateAndCalculateHours(data.timeIn, data.timeOut);

      await logProgress({
        logDate: data.date,
        hours: hoursLogged,
        description: data.description,
      });

      toast.success("Progress logged successfully.");
      form.reset();
      await refetch();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-lg shadow-none md:w-[480px]">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 p-2 dark:from-blue-900/30 dark:to-purple-900/30">
            <Plus className="text-primary h-5 w-5" />
          </div>
          <div>
            <CardTitle className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-lg font-bold text-transparent dark:from-white dark:to-gray-300">
              Log Progress
            </CardTitle>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Add your daily work hours
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <CalendarIcon className="text-primary h-4 w-4" />
                      Current Date
                    </FormLabel>

                    <FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "h-11 w-full justify-start border-gray-200 bg-white text-left font-normal transition-all duration-200 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:bg-gray-700/50",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <div className="flex flex-1 items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          <span className="font-medium">
                            {format(field.value, "PPP")}
                          </span>
                        </div>
                        <CalendarIcon className="h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="timeIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <Clock className="h-4 w-4 text-green-500" />
                        Time In
                      </FormLabel>
                      <FormControl>
                        <TimePicker
                          date={field.value}
                          setDate={field.onChange}
                          placeholder="Select time in"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeOut"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <Clock className="h-4 w-4 text-green-500" />
                        Time Out
                      </FormLabel>
                      <FormControl>
                        <TimePicker
                          date={field.value}
                          setDate={field.onChange}
                          placeholder="Select time out"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <FileText className="h-4 w-4 text-green-500" />
                      Desciption of Activities
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="h-12 max-h-12"
                        placeholder="Describe what you worked on during this day"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <SubmitButton
              formState={form.formState}
              className="flex h-11 w-full cursor-pointer items-center gap-2 font-semibold text-white hover:shadow-xl disabled:opacity-50"
            >
              <Clock className="h-4 w-4" />
              <span>Log Progress</span>
            </SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProgressForm;
