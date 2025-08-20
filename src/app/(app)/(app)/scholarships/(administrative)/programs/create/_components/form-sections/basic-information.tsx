"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import type { Control } from "react-hook-form";
import { SCHOLARSHIP_TYPES } from "@/constants/scholarship/scholarship-types";
import { SUBMISSION_TYPE } from "@/constants/scholarship/submittion-type";
import { Textarea } from "@/components/ui/textarea";

interface BasicInformationProps {
  control: Control<any>;
  fileName: string | null;
  setFileName: (name: string | null) => void;
  setSubmissionType: (type: string) => void;
}

/**
 * Basic Information section component
 * Handles program name, type, submission type, deadline, and image upload
 */
export function BasicInformation({
  control,
  fileName,
  setFileName,
  setSubmissionType,
}: BasicInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Basic Information</CardTitle>
        <CardDescription>
          General details about the scholarship program
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Program name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter program name" {...field} />
                </FormControl>
                <FormDescription className="ml-1 text-xs">
                  {field.value?.length || 0}/100 characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Program Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select scholarship type" />
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="submissionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Submission Type</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSubmissionType(value);
                  }}
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="deadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deadline</FormLabel>
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
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={control}
            name="slots"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>No. of Slots</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter number of slots"
                    {...field}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val === "" ? undefined : Number(val)); // send number
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter location" {...field} />
                </FormControl>
                <FormDescription className="ml-1 text-xs">
                  {field.value?.length || 0}/100 characters
                </FormDescription>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter number of slots"
                  {...field}
                  rows={4}
                  maxLength={255}
                />
              </FormControl>
              <FormDescription className="ml-1 text-xs">
                {field.value?.length || 0}/255 characters
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program Image (Optional)</FormLabel>
              <FormControl>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif"
                    onChange={async (e) => {
                      const file = e.target.files?.[0] ?? null;
                      if (file) {
                        setFileName(file.name);
                        field.onChange(file); // <-- store base64 string, not File
                      } else {
                        setFileName(null);
                        field.onChange(""); // <-- or undefined
                      }
                    }}
                  />
                  {fileName && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setFileName(null);
                        field.onChange(null);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </FormControl>
              {fileName && (
                <p className="text-primary ml-1.5 truncate text-xs">
                  {fileName}
                </p>
              )}
              <FormMessage />
              <FormDescription className="ml-1.5 text-xs">
                PNG, JPG, GIF up to 5MB
              </FormDescription>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
