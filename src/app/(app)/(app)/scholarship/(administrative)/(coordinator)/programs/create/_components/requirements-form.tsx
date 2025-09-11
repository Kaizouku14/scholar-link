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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

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
          onClick={() =>
            append({
              name: "",
              description: "",
              isRequired: true,
            })
          }
        >
          <Plus className="mr-2 h-4 w-4" /> Add Requirement
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No requirements added yet.
        </p>
      )}

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col gap-4 rounded-lg border p-4 md:flex-row md:items-start md:gap-6"
          >
            <div className="flex-1 space-y-3">
              <FormField
                control={control}
                name={`requirements.${index}.label`}
                render={({ field }) => (
                  <FormItem>
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
                name={`requirements.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide extra instructions (e.g., must be signed and stamped)..."
                        rows={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-evenly gap-4">
              <FormField
                control={control}
                name={`requirements.${index}.isRequired`}
                render={({ field }) => (
                  <FormItem className="mt-8 flex flex-row items-start space-y-0 space-x-3">
                    <FormControl>
                      <Switch
                        checked={field.value as boolean}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Required</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="button"
                size="icon"
                onClick={() => remove(index)}
                variant="destructive"
                className="self-start md:mt-5.5"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
