"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { FileText, ImageIcon, Type, User, CalendarIcon } from "lucide-react";
import type { Requirement } from "@/interfaces/scholarship/requirements";
import { createFormSchema } from "./flexible-form-schema";
import type z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GENDERS } from "@/constants/users/genders";
import { COURSES } from "@/constants/users/courses";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export const ApplicationForm = ({
  requirements,
}: {
  requirements: Requirement[];
}) => {
  const formSchema = createFormSchema(requirements);
  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      sex: "",
      dateOfBirth: undefined,
      email: "",
      contact: "",
      address: "",
      course: "",
      requirements: [
        {
          name: "",
          type: "document",
          description: "",
          isRequired: true,
        },
      ],
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
  };

  const renderPersonalInfoFields = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b pb-2">
        <User className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Personal Information</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Juan Dela Cruz" {...field} />
              </FormControl>
              <FormDescription>Enter your complete legal name.</FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>

              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormDescription>
                We&apos;ll use this to send updates about your application.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sex</FormLabel>

              <Select
                onValueChange={field.onChange}
                defaultValue={field.value as string}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your sex" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {GENDERS.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the gender listed on your official documents.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Date of Birth
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                    >
                      {field.value ? (
                        format(field.value as Date, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="z-100 w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value as Date}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Select your date of birth.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>

              <FormControl>
                <Input placeholder="+63 912 345 6789" {...field} />
              </FormControl>
              <FormDescription>Provide a valid mobile.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value as string}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your Course" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {COURSES.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Enter your current course or program.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Complete Address</FormLabel>

            <FormControl>
              <Textarea
                placeholder="123 Main St, Barangay Example, Quezon City, Metro Manila"
                className="min-h-[80px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Include house number, street, barangay, city, and province.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  const renderField = (requirement: Requirement) => {
    switch (requirement.type) {
      case "document":
        return (
          <FormField
            key={requirement.requirementId}
            control={form.control}
            name={requirement.requirementId}
            render={({ field: { onChange, ref } }) => (
              <FormItem className="space-y-1">
                <FormLabel className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="text-muted-foreground h-4 w-4" />
                  {requirement.label}
                </FormLabel>
                {requirement.description && (
                  <FormDescription className="text-muted-foreground text-xs">
                    {requirement.description}
                  </FormDescription>
                )}
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx,.xlsx,.csv"
                    onChange={(e) => onChange(e.target.files)}
                    ref={ref}
                    className="cursor-pointer text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "image":
        return (
          <FormField
            key={requirement.requirementId}
            control={form.control}
            name={requirement.requirementId}
            render={({ field: { onChange, ref } }) => (
              <FormItem className="space-y-1">
                <FormLabel className="flex items-center gap-2 text-sm font-medium">
                  <ImageIcon className="text-muted-foreground h-4 w-4" />
                  {requirement.label}
                </FormLabel>
                {requirement.description && (
                  <FormDescription className="text-muted-foreground text-xs">
                    {requirement.description}
                  </FormDescription>
                )}
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onChange(e.target.files)}
                    className="cursor-pointer text-sm"
                    ref={ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "text":
        return (
          <FormField
            key={requirement.requirementId}
            control={form.control}
            name={requirement.requirementId}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="flex items-center gap-2 text-sm font-medium">
                  <Type className="text-muted-foreground h-4 w-4" />
                  {requirement.label}
                </FormLabel>
                {requirement.description && (
                  <FormDescription className="text-muted-foreground text-xs">
                    {requirement.description}
                  </FormDescription>
                )}
                <FormControl>
                  <Input
                    placeholder="Enter your answer..."
                    className="text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Card className="mt-0 pt-0 shadow-none">
      <CardHeader className="bg-primary/10 mt-0 rounded-t-lg border-b py-4">
        <CardTitle>
          <h2 className="text-2xl font-bold">Apply Now</h2>
        </CardTitle>
        <CardDescription>
          Complete the application form below and upload all required documents
          to apply for the scholarship.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {renderPersonalInfoFields()}

            {requirements.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b pb-2">
                  <FileText className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Requirements</h3>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {requirements.map(renderField)}
                </div>
              </div>
            )}
            <div className="flex justify-end pt-4">
              <Button type="submit" size="lg">
                Submit Requirements
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
