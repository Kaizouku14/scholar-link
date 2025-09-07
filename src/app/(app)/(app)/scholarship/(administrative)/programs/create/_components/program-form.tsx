"use client";

import { useForm } from "react-hook-form";
import { type ScholarshipFormData, scholarshipFormSchema } from "./schema";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Upload } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { SCHOLARSHIP_TYPES } from "@/constants/scholarship/scholarship-types";
import { SUBMISSION_TYPE } from "@/constants/scholarship/submittion-type";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TiptapEditor from "./titap/editor";
import { RequirementsForm } from "./requirements-form";

const ProgramForm = () => {
  const form = useForm<ScholarshipFormData>({
    resolver: zodResolver(scholarshipFormSchema),
  });

  const onSubmit = (values: ScholarshipFormData) => {
    console.log("Form Submitted ✅", values);
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
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
              </TabsList>

              <TabsContent value="program">
                <CardContent className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. CHED Tulong Dunong"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter the official title of the scholarship program.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program Type *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SCHOLARSHIP_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose the type of scholarship
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slots"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Available Slots *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 50"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Specify the number of students who can avail of this
                          scholarship.
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
                        <FormLabel>Submission Type *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
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
                        <FormDescription>
                          Define how students should submit their applications
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deadline *</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={`w-full pl-3 text-left font-normal ${
                                  !field.value ? "text-muted-foreground" : ""
                                }`}
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
                          <PopoverContent
                            className="z-100 w-auto p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date("2023-01-01")}
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Set the last date when applications will be accepted.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program Image (Optional)</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-3">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={field.onChange}
                            />
                            <Upload className="text-muted-foreground h-5 w-5" />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Upload an image banner or logo for the program.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </TabsContent>

              <TabsContent value="description">
                <CardContent className="mt-4">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Program Description *</FormLabel>
                        <FormControl>
                          <TiptapEditor {...field} />
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
                <CardContent className="mt-4">
                  <RequirementsForm />
                </CardContent>
              </TabsContent>
            </Tabs>
          </CardHeader>

          <CardFooter className="flex w-full justify-end gap-2">
            <Button
              type="button"
              className="w-40"
              variant="outline"
              onClick={() => form.reset()}
            >
              Discard
            </Button>
            <Button type="submit" className="w-40">
              Create Program
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default ProgramForm;
