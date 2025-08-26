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
import { YEAR_LEVEL } from "@/constants/users/year-level";
import SubmitButton from "@/components/forms/submit-button";
import type { CombinedSetupSchema } from "./schema";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/input";

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
      <FormField
        control={control}
        name="studentNo"
        render={({ field }) => (
          <FormItem className="grid gap-2">
            <FormLabel>Student No.</FormLabel>
            <FormControl>
              <Input placeholder="e.g 2022123456" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="yearLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Year Level
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value} disabled>
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
