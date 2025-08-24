"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { accountFormSchema, type Accounts } from "./form-schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { COURSES } from "@/constants/users/courses";
import { DEPARTMENTS } from "@/constants/users/departments";
import { GENDERS } from "@/constants/users/genders";
import { ROLE, ROLES } from "@/constants/users/roles";
import { SECTIONS } from "@/constants/users/sections";
import { YEAR_LEVEL } from "@/constants/users/year-level";
import { useState } from "react";
import { CalendarIcon, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatText } from "@/lib/utils";
import { uploadFile } from "@/lib/uploadthing";
import toast from "react-hot-toast";
import { api } from "@/trpc/react";
import SubmitButton from "@/components/forms/submit-button";
import { Checkbox } from "@/components/ui/checkbox";

const CreateAccountForm = () => {
  const [profilePreview, setProfilePreview] = useState<string>("");

  const form = useForm<Accounts>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: "",
      surname: "",
      middleName: "",
      email: "",
      profile: undefined,
      contact: "",
      address: "",
      role: "internshipAdmin",
      studentNo: "",
    },
  });

  const watchedRole = form.watch("role");
  const isStudent = watchedRole === ROLE.INTERNSHIP_STUDENT;
  const isCoordinator = watchedRole === ROLE.INTERNSHIP_COORDINATOR;

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("profile", file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const { mutateAsync: createUser } = api.auth.register.useMutation();
  const onSubmit = async (values: Accounts) => {
    const toastId = toast.loading("Creating user...");
    try {
      const uploadedImage = await uploadFile(values.profile);
      if (!uploadedImage?.url || !uploadedImage?.key) {
        toast.error("Failed to upload image. Please try again.");
        return;
      }

      const fullName = `${values.name} ${values.middleName} ${values.surname}`;
      await createUser({
        ...values,
        name: formatText(fullName),
        profile: uploadedImage.url,
      });
      toast.success("User created successfully!");
      form.reset();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <Card className="mx-auto w-full shadow-none">
      <CardHeader className="">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Create an Account
        </CardTitle>
        <p className="text-muted-foreground mt-1 text-sm">
          Fill in the details below to register a new user.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <section>
              <h2 className="mb-2 text-xl font-semibold">
                Personal Information
              </h2>
              <p className="text-muted-foreground mb-6 text-sm">
                Provide your basic personal details below.
              </p>

              <div className="grid items-center gap-6 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="profile"
                  render={() => (
                    <FormItem className="flex flex-col">
                      <div className="flex items-center gap-4">
                        {profilePreview ? (
                          <Avatar className="h-16 w-30">
                            <AvatarImage
                              src={profilePreview}
                              alt="Profile"
                              className="h-16 w-30 rounded-lg object-cover"
                            />
                            <AvatarFallback className="h-16 w-16 rounded-lg">
                              N/A
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="bg-muted text-muted-foreground border-foreground flex h-16 w-30 items-center justify-center rounded-lg border-2 border-dashed text-center text-xs">
                            No Image
                          </div>
                        )}
                        <div className="flex flex-col gap-2">
                          <FormLabel>Profile Picture</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleProfilePictureChange}
                              className="cursor-pointer"
                            />
                          </FormControl>
                        </div>
                      </div>
                      <FormDescription>
                        Upload a clear, recent photo for easy identification.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your given name as it appears on official records.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem className="md:mb-6">
                      <FormLabel>Surname *</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your family or last name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Alexander" {...field} />
                      </FormControl>
                      <FormDescription>
                        Provide your middle name or initial.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {GENDERS.map((gender) => (
                            <SelectItem key={gender} value={gender}>
                              {gender.charAt(0).toUpperCase() + gender.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the gender you identify with.
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
                      <FormLabel>Date of Birth *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
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
                          className="z-50 w-auto p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Select your date of birth.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>
            <section>
              <h2 className="mb-2 text-xl font-semibold">
                Account Information
              </h2>
              <p className="text-muted-foreground mb-6 text-sm">
                Define how the user will be identified in the system.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This will be used as your login credential.
                      </FormDescription>
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
                      <FormDescription>
                        Include country code (e.g. +63 for Philippines).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 Main St, City, Country"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter your full current residential address.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[ROLES[0], ROLES[3], ROLES[5]].map((role) => (
                            <SelectItem key={role} value={role}>
                              {formatText(role)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the user’s role in the system.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {DEPARTMENTS.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept.charAt(0).toUpperCase() + dept.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Assign the user to a department if applicable.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {isCoordinator && (
                  <FormField
                    control={form.control}
                    name="section"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assigned Section *</FormLabel>

                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-full justify-between"
                            >
                              {field.value?.length > 0
                                ? field.value.join(", ")
                                : "Select sections"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[220px] space-y-2 p-2">
                            <div className="text-muted-foreground text-xs">
                              Select sections
                            </div>
                            {SECTIONS.map((section) => {
                              const checked = field.value?.includes(section);
                              return (
                                <div
                                  key={section}
                                  className="hover:bg-muted flex cursor-pointer items-center space-x-2 rounded-md px-2 py-1"
                                  onClick={() => {
                                    if (checked) {
                                      field.onChange(
                                        field.value.filter(
                                          (s: string) => s !== section,
                                        ),
                                      );
                                    } else {
                                      field.onChange([
                                        ...(field.value || []),
                                        section,
                                      ]);
                                    }
                                  }}
                                >
                                  <Checkbox checked={checked} />
                                  <span>Section: {section}</span>
                                </div>
                              );
                            })}
                          </PopoverContent>
                        </Popover>

                        <FormDescription>
                          Assign the coordinator to one or more sections.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </section>

            {isStudent && (
              <section>
                <h2 className="mb-2 text-lg font-semibold">
                  Student Information
                </h2>
                <p className="text-muted-foreground mb-6 text-sm">
                  Fill out these fields if the user is a student.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="studentNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="2022500330" {...field} />
                        </FormControl>
                        <FormDescription>
                          Use the official format (e.g. 202500330).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select course" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {COURSES.map((course) => (
                              <SelectItem key={course} value={course}>
                                {course
                                  .replace(/_/g, " ")
                                  .replace(/\b\w/g, (l) => l.toUpperCase())}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select the degree program of the student.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="section"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value[0]}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select section" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SECTIONS.map((section) => (
                              <SelectItem key={section} value={section}>
                                {section}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Assign the student’s class section.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="yearLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year Level *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select year level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {YEAR_LEVEL.map((year) => (
                              <SelectItem key={year} value={year}>
                                {year} Year
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Indicate the student’s current year level.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>
            )}

            <div className="flex w-full justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Discard
              </Button>
              <SubmitButton
                formState={form.formState}
                className="w-40 font-medium"
              >
                Register User
              </SubmitButton>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateAccountForm;
