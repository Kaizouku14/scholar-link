"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";
import type { Accounts } from "../form-schema";
import { ProfilePictureField } from "./profile";
import { Input } from "@/components/ui/input";

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
          <FormItem className="md:mt-5.5">
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
    </div>

    <FormField
      control={form.control}
      name="surname"
      render={({ field }) => (
        <FormItem className="mt-3.5 w-full md:mt-0 md:w-94">
          <FormLabel>Surname *</FormLabel>
          <FormControl>
            <Input placeholder="Doe" {...field} />
          </FormControl>
          <FormDescription>Enter your family or last name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  </section>
);
