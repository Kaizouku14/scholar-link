"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define types for form configuration
export type FormSection = {
  id: string;
  title: string;
  description?: string;
  fields: Field[];
  show?: boolean;
};

export type Field = {
  id: string;
  label: string;
  type: "text" | "tel" | "number" | "file" | "select" | "textarea";
  placeholder?: string;
  description?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: (schema: z.ZodSchema) => z.ZodSchema;
  show?: boolean;
  colSpan?: 1 | 2;
};

export type FormConfig = {
  title?: string;
  description?: string;
  sections: FormSection[];
  submitButtonText?: string;
};

export type FormValues = Record<string, unknown>;

interface FlexibleApplicationFormProps {
  config: FormConfig;
  onSubmit: (data: FormValues) => Promise<void>;
  defaultValues?: FormValues;
  className?: string;
}

export function FlexibleApplicationForm({
  config,
  onSubmit,
  defaultValues = {},
  className = "",
}: FlexibleApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Build the form schema dynamically based on config
  const formSchema = buildFormSchema(config);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Handle form submission
  const handleSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={`space-y-8 ${className}`}
      >
        {config.title && <h2 className="text-2xl font-bold">{config.title}</h2>}
        {config.description && (
          <p className="text-muted-foreground">{config.description}</p>
        )}

        {config.sections
          .filter((section) => section.show !== false)
          .map((section) => (
            <div key={section.id} className="space-y-4">
              <h3 className="text-lg font-bold">{section.title}</h3>
              {section.description && (
                <p className="text-muted-foreground text-sm">
                  {section.description}
                </p>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                {section.fields
                  .filter((field) => field.show !== false)
                  .map((field) => (
                    <div
                      key={field.id}
                      className={`grid gap-2 ${field.colSpan === 2 ? "sm:col-span-2" : ""}`}
                    >
                      {renderFormField(form, field)}
                    </div>
                  ))}
              </div>

              <Separator className="my-4" />
            </div>
          ))}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            (config.submitButtonText ?? "Submit")
          )}
        </Button>
      </form>
    </Form>
  );
}

// Helper function to build the Zod schema based on the form configuration
function buildFormSchema(
  config: FormConfig,
): z.ZodObject<Record<string, z.ZodSchema>> {
  const schemaMap: Record<string, z.ZodSchema> = {};

  // Process all fields from all sections
  config.sections.forEach((section) => {
    if (section.show !== false) {
      section.fields.forEach((field) => {
        if (field.show !== false) {
          schemaMap[field.id] = buildFieldSchema(field);
        }
      });
    }
  });

  return z.object(schemaMap);
}

// Helper function to build schema for a single field
function buildFieldSchema(field: Field) {
  let schema: z.ZodSchema;

  switch (field.type) {
    case "tel":
      schema = z.string().min(5, { message: "Phone number is too short" });
      break;
    case "number":
      schema = z.coerce.number();
      break;
    case "file":
      schema = z.any(); // File validation is complex and often handled separately
      break;
    default:
      schema = z.string();
  }

  if (field.required) {
    if (field.type !== "file") {
      if (schema instanceof z.ZodString || schema instanceof z.ZodNumber) {
        schema = schema.min(1, { message: "This field is required" });
      } else {
        // Handle the case where schema is not a string or number
        // For example, you can throw an error or return a default value
      }
    }
  }
  // Add custom validation if provided
  if (field.validation instanceof Function) {
    schema = field.validation(schema);
  }

  return schema;
}

// Helper function to render the appropriate form field based on type
function renderFormField(form: UseFormReturn<FormValues>, field: Field) {
  return (
    <FormField
      control={form.control}
      name={field.id}
      render={({ field: formField }) => (
        <FormItem>
          <FormLabel>
            {field.label} {field.required && "*"}
          </FormLabel>
          <FormControl>{renderFormControl(field, formField)}</FormControl>
          {field.description && (
            <FormDescription>{field.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Helper function to render the appropriate form control based on field type
function renderFormControl(
  field: Field,
  formField: {
    onChange: (value: unknown) => void;
    value: unknown;
  },
) {
  switch (field.type) {
    case "select":
      return (
        <Select
          onValueChange={formField?.onChange}
          defaultValue={formField?.value as string}
        >
          <SelectTrigger>
            <SelectValue placeholder={field.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case "textarea":
      return (
        <Textarea
          {...formField}
          placeholder={field.placeholder}
          value={formField.value as string}
          className="min-h-[150px]"
        />
      );
    case "file":
      return (
        <Input
          type="file"
          onChange={(e) => {
            const files = e.target.files;
            formField.onChange(files);
          }}
          accept={field.placeholder} // Using placeholder for accept attribute
        />
      );
    default:
      return (
        <Input
          {...formField}
          type={field.type}
          value={formField.value as string}
          placeholder={field.placeholder}
        />
      );
  }
}

export default FlexibleApplicationForm;
