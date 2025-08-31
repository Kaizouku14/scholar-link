"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import type { UseFormReturn } from "react-hook-form";
import type { Accounts } from "../form-schema";
import { ProfilePictureField } from "./profile";
import { Input } from "@/components/ui/input";
import { GENDERS } from "@/constants/users/genders";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export const PersonalInfoSection = ({
  form,
  profilePreview,
  onProfileChange,
}: {
  form: UseFormReturn<Accounts>;
  profilePreview: string;
  onProfileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <section>
    <h2 className="mb-2 text-xl font-semibold">Personal Information</h2>
    <p className="text-muted-foreground mb-6 text-sm">
      Provide basic personal details below.
    </p>

    <div className="grid items-center gap-6 md:grid-cols-3">
      <ProfilePictureField
        form={form}
        profilePreview={profilePreview}
        onProfileChange={onProfileChange}
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
            <FormDescription>Enter your family or last name.</FormDescription>
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
            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <PopoverContent className="z-50 w-auto p-0" align="start">
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
            <FormDescription>Select your date of birth.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  </section>
);
