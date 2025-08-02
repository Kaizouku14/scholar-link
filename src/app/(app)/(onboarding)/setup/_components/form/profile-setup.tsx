"use client";

import { FormControl } from "@/components/ui/form";

import type { Control, FormState } from "react-hook-form";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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
import { GENDERS } from "@/constants/genders";
import SubmitButton from "@/components/forms/submit-button";
import { CalendarIcon, MapPin, Phone, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FileUpload } from "../file-upload/file-upload";
import type { CombinedSetupSchema } from "./schema";

interface ProfileSetupFormProps {
  control: Control<CombinedSetupSchema>;
  onFileSelect: (file: File) => void;
  profilePreview: string;
  onNext: () => void;
}

const ProfileSetupForm = ({
  control,
  onFileSelect,
  profilePreview,
  onNext,
}: ProfileSetupFormProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="profile"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">
              Profile Picture
            </FormLabel>
            <FormControl>
              <FileUpload
                onFileSelect={onFileSelect}
                preview={profilePreview}
                className="w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Gender
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your gender" />
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
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
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact Number
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., 09123456789" type="tel" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g., 123 Main Street, City, Province"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Button
        type="button"
        onClick={onNext}
        className="h-10 w-full text-sm font-semibold"
      >
        Continue to Next Step
      </Button>
    </div>
  );
};

export default ProfileSetupForm;
