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
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Clock, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const ProgressForm = () => {
  const form = useForm<ProgressFormSchema>({
    resolver: zodResolver(progressFormSchema),
    defaultValues: {
      date: undefined,
      hoursCompleted: 0,
    },
  });

  const onSubmit = (data: ProgressFormSchema) => {
    console.log(data);
    // Add success feedback here
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Card className="border-border mx-auto w-full max-w-md border">
      <CardHeader className="pb-4">
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
              {/* Date Field */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <CalendarIcon className="text-primary h-4 w-4" />
                      Deadline
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "h-11 w-full justify-start border-gray-200 bg-white text-left font-normal transition-all duration-200 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:bg-gray-700/50",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <div className="flex flex-1 items-center gap-2">
                              {field.value ? (
                                <>
                                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                  <span className="font-medium">
                                    {format(field.value, "PPP")}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                                  <span>Pick a deadline date</span>
                                </>
                              )}
                            </div>
                            <CalendarIcon className="h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          className="rounded-md border shadow-md"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hoursCompleted"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <Clock className="h-4 w-4 text-green-500" />
                      Hours Completed
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          min="0"
                          max="24"
                          step="0.5"
                          placeholder="Enter hours worked"
                          className="h-11 border-gray-200 bg-white pr-12 transition-all duration-200 focus:border-green-500 focus:ring-green-500/20 dark:border-gray-700 dark:bg-gray-800/50"
                          {...field}
                        />
                        <div className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 text-xs font-medium">
                          hrs
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full cursor-pointer font-semibold text-white hover:shadow-xl disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Log Progress</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProgressForm;
