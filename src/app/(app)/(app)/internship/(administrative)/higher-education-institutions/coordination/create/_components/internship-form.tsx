"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
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
import { Textarea } from "@/components/ui/textarea";
import { companyformSchema, type CompanyFormSchema } from "./schema";
import SubmitButton from "@/components/forms/submit-button";
import { api } from "@/trpc/react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InternsComboBox } from "./interns-cb";
import { CompanyCombobox } from "./company-cb";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { ROLE } from "@/constants/users/roles";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DEPARTMENTS,
  type departmentType,
} from "@/constants/users/departments";
import { MonthYearPicker } from "./month-picker";

const InternshipForm = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { data } = authClient.useSession();
  const role = data?.user.role;

  const form = useForm<CompanyFormSchema>({
    resolver: zodResolver(companyformSchema),
    defaultValues: {
      userId: "",
      name: "",
      address: "",
      contactPerson: "",
      contactEmail: "",
      contactNo: "",
      startDate: undefined,
      endDate: undefined,
      department: undefined,
    },
  });

  const { mutateAsync: createInternship } =
    api.internshipCoordinator.createStudentInternship.useMutation();
  const onSubmit = async (values: CompanyFormSchema) => {
    const coordinatoDepartment = data?.user.department;

    const toastId = toast.loading("Saving internship company details...");
    if (role === ROLE.INTERNSHIP_COORDINATOR) {
      values.department = coordinatoDepartment as departmentType;
    }
    try {
      const formattedDuration = `${format(values.startDate, "LLLL yyyy")} - ${format(values.endDate, "LLLL yyyy")}`;
      const data = {
        userId: values.userId,
        name: values.name,
        address: values.address,
        contactPerson: values.contactPerson,
        contactEmail: values.contactEmail,
        contactNo: values.contactNo,
        department: values.department!,
        duration: formattedDuration,
      };

      await createInternship({
        ...data,
      });

      toast.success("Internship company linked successfully!");
      form.reset();
    } catch {
      toast.error("An error Occured, Please Try Again!");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="border-border mx-auto w-full space-y-6 rounded-xl border p-8">
      <div className="space-y-1 text-start md:space-y-2">
        <h1 className="text-center text-2xl font-bold md:text-start md:text-3xl">
          Manage Internship Details
        </h1>
        <p className="text-muted-foreground text-center md:text-start">
          Enter the details of the internship.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid-col-1 grid items-start gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem className="w-full md:mt-5.5">
                  <FormLabel>Student No.</FormLabel>
                  <FormControl>
                    <InternsComboBox
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Select the student’s assigned ID number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormItem className="w-full">
                    <div className="flex h-full flex-col">
                      <Tabs defaultValue="list" className="flex-1">
                        <TabsList>
                          <TabsTrigger
                            value="list"
                            className="text-xs"
                            onClick={() => setIsDisabled(false)}
                          >
                            Company Records
                          </TabsTrigger>
                          <TabsTrigger
                            value="new"
                            className="text-xs"
                            onClick={() => {
                              form.setValue("name", "");
                              form.setValue("address", "");
                              setIsDisabled(true);
                            }}
                          >
                            Register Company
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent
                          value="list"
                          className="flex h-full items-center"
                        >
                          <CompanyCombobox
                            value={field.value}
                            onChange={field.onChange}
                            setAddress={(address) =>
                              form.setValue("address", address)
                            }
                          />
                        </TabsContent>
                        <TabsContent
                          value="new"
                          className="flex h-full items-center"
                        >
                          <FormControl>
                            {isDisabled && (
                              <Input placeholder="Company Name" {...field} />
                            )}
                          </FormControl>
                        </TabsContent>
                      </Tabs>
                    </div>
                    <FormMessage />
                  </FormItem>
                  <FormDescription className="text-xs">
                    Enter the company’s name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {role === ROLE.INTERNSHIP_ADMIN ? (
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem className="flex flex-col md:mt-5.5">
                    <FormLabel>Department</FormLabel>
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
                        {DEPARTMENTS.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="contactPerson"
                render={({ field }) => (
                  <FormItem className="w-full md:mt-5.5">
                    <FormLabel>Contact Person</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Enter the company’s supervisor name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="123 Main St, Anytown, USA"
                    className="min-h-[80px]"
                    disabled={!isDisabled}
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Enter the company’s address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div
            className={`grid gap-4 ${role === ROLE.INTERNSHIP_ADMIN ? "md:grid-cols-3" : "md:grid-cols-2"}`}
          >
            {role === ROLE.INTERNSHIP_ADMIN && (
              <FormField
                control={form.control}
                name="contactPerson"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Contact Person</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Enter the company’s supervisor name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Enter the company’s supervisor email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 09123456789" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Enter the company’s supervisor contanct no.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    Start Month
                  </FormLabel>

                  <FormControl>
                    <MonthYearPicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>

                  <FormDescription className="text-xs">
                    Enter the internship start date.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    End Month
                  </FormLabel>
                  <FormControl>
                    <MonthYearPicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Enter the internship end date.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <SubmitButton formState={form.formState} className="mt-4 w-40">
              Submit
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InternshipForm;
