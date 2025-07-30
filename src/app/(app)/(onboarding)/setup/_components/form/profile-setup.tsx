"use client";

import { useForm } from "react-hook-form";
import { type ProfileSetupSchema, profileSetupSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
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
import { toast } from "sonner";
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

interface ProfileSetupFormProps {
  onNext?: () => void;
}

const ProfileSetupForm = ({ onNext }: ProfileSetupFormProps) => {
  const [profilePreview, setProfilePreview] = useState<string>("");

  const form = useForm<ProfileSetupSchema>({
    resolver: zodResolver(profileSetupSchema),
    defaultValues: {
      profilePicture: undefined,
      gender: undefined,
      address: "",
      contactNo: "",
      dateOfBirth: undefined,
    },
  });

  const handleFileSelect = (file: File) => {
    if (file.name === "") {
      form.setValue("profilePicture", undefined);
      setProfilePreview("");
      return;
    }

    form.setValue("profilePicture", file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (values: ProfileSetupSchema) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Profile data:", values);
      toast.success("Profile saved successfully!");
      onNext?.();
    } catch (error) {
      toast.error("Failed to save profile. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="z-100 space-y-4"
        >
          <FormField
            control={form.control}
            name="profilePicture"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  Profile Picture
                </FormLabel>
                <FormControl>
                  <FileUpload
                    onFileSelect={handleFileSelect}
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
              control={form.control}
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
              control={form.control}
              name="contactNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Contact Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., +1 (555) 123-4567"
                      type="tel"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
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
                      placeholder="e.g., 123 Main Street, City, State"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <SubmitButton
            formState={form.formState}
            className="h-10 w-full text-sm font-semibold"
          >
            Continue to Next Step
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default ProfileSetupForm;
