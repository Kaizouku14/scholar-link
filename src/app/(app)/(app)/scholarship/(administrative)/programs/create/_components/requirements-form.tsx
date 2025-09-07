"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { REQUIREMENT_TYPES } from "@/constants/scholarship/requirements";

export const RequirementsForm = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "requirements",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Requirements</h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ name: "", type: "document" })}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Requirement
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No requirements added yet.
        </p>
      )}

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-3">
            <FormField
              control={control}
              name={`requirements.${index}.name`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Requirement {index + 1}</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Copy of Transcript" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`requirements.${index}.type`}
              render={({ field }) => (
                <FormItem className="w-40">
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value as string}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {REQUIREMENT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              size="icon"
              onClick={() => remove(index)}
              className="mt-5.5"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
