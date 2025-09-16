import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Upload } from "lucide-react";
import { SCHOLARSHIP_TYPES } from "@/constants/scholarship/scholarship-types";
import { SUBMISSION_TYPE } from "@/constants/scholarship/submittion-type";
import { ELIGIBILITY_TYPE } from "@/constants/scholarship/eligiblity-type";
import { format } from "date-fns";
import { Textarea } from "../ui/textarea";
import { cn, formatText } from "@/lib/utils";

export const ReusableProgramForm = <T extends FieldValues>({
  form,
  viewDescription = true,
}: {
  form: UseFormReturn<T>;
  viewDescription?: boolean;
}) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name={"name" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program Name *</FormLabel>
              <FormControl>
                <Input placeholder="e.g. CHED Tulong Dunong" {...field} />
              </FormControl>
              {viewDescription && (
                <FormDescription>
                  Enter the official title of the scholarship program.
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"type" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program Type *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              {viewDescription && (
                <FormDescription>
                  Choose the type of scholarship
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormField
          control={form.control}
          name={"slots" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available Slots *</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 50" {...field} />
              </FormControl>
              {viewDescription && (
                <FormDescription>
                  Specify the number of students who can avail of this
                  scholarship.
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"submissionType" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Submission Type *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              {viewDescription && (
                <FormDescription>
                  Define how students should submit their applications
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"eligibilityType" as Path<T>}
          render={({ field }) => (
            <FormItem className={cn(viewDescription && "mb-5")}>
              <FormLabel>Eligibility Type *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select eligibility type" />
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
              {viewDescription && (
                <FormDescription>
                  Define the application process
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name={"description" as Path<T>}
        render={({ field }) => (
          <FormItem className="mt-4 md:col-span-2">
            <FormLabel>Program Description *</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                className="max-h-[120px]"
                placeholder="brief description for this program"
              />
            </FormControl>
            {viewDescription && (
              <FormDescription>
                Provide details about this program
              </FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name={"deadline" as Path<T>}
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
                <PopoverContent className="z-100 w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date("2023-01-01")}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              {viewDescription && (
                <FormDescription>
                  Set the last date when applications will be accepted.
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"profile" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program Image (Optional)</FormLabel>
              <FormControl>
                <div className="flex items-center gap-3">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]; // get first file
                      field.onChange(file); // pass File object to RHF
                    }}
                  />
                  <Upload className="text-muted-foreground h-5 w-5" />
                </div>
              </FormControl>
              {viewDescription && (
                <FormDescription>
                  Upload an image banner or logo for the program.
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
