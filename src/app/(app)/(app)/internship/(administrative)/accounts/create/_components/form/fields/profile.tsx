"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { Accounts } from "../form-schema";

export const ProfilePictureField = ({
  form,
  profilePreview,
  onProfileChange,
}: {
  form: UseFormReturn<Accounts>;
  profilePreview: string;
  onProfileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <FormField
    control={form.control}
    name="profile"
    render={() => (
      <FormItem className="flex flex-col">
        <div className="flex items-center gap-4">
          {profilePreview ? (
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={profilePreview || "/placeholder.svg"}
                alt="Profile"
                className="h-16 w-16 rounded-lg object-cover"
              />
              <AvatarFallback className="h-16 w-16 rounded-lg">
                N/A
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="bg-muted text-muted-foreground border-foreground flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed text-center text-xs">
              No Image
            </div>
          )}
          <div className="flex flex-col gap-2">
            <FormLabel>Profile Picture</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                onChange={onProfileChange}
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
);
