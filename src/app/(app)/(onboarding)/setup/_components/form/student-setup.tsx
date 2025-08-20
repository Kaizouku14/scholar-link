"use client";

import type { Control, FormState } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SECTIONS } from "@/constants/users/sections";
import { YEAR_LEVEL } from "@/constants/users/year-level";
import SubmitButton from "@/components/forms/submit-button";
import type { CombinedSetupSchema } from "./schema";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GraduationCap, Users } from "lucide-react";

interface StudentSetupFormProps {
  control: Control<CombinedSetupSchema>;
  formState: FormState<CombinedSetupSchema>;
  onBack: () => void;
}

const StudentSetupForm = ({
  control,
  formState,
  onBack,
}: StudentSetupFormProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="yearLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Year Level
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your year level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {YEAR_LEVEL.map((yearLevel) => (
                    <SelectItem key={yearLevel} value={yearLevel}>
                      {yearLevel}
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
          name="section"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Section
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your section" />
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
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="mt-4 flex justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="h-10 flex-1 bg-transparent text-sm font-semibold"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <SubmitButton
          formState={formState}
          className="h-10 flex-1 text-sm font-semibold"
        >
          Complete Setup
        </SubmitButton>
      </div>
    </div>
  );
};

export default StudentSetupForm;
