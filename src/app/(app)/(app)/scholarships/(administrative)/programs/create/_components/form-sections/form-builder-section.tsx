"use client";

import { lazy, Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { FormFieldProps } from "@/interfaces/scholarship/scholarship-form";
import { Skeleton } from "@/components/ui/skeleton";

const FieldEditor = lazy(() => import("../form-builder/field-editor"));

interface FormBuilderSectionProps {
  formFields: FormFieldProps[];
  setFormFields: (fields: FormFieldProps[]) => void;
}

/**
 * Form Builder section component with lazy loading
 * Handles custom form field creation and management
 */
export function FormBuilderSection({
  formFields,
  setFormFields,
}: FormBuilderSectionProps) {
  const updateField = (id: string, updates: Partial<FormFieldProps>) => {
    setFormFields(
      formFields.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    );
  };

  const removeField = (id: string) => {
    if (formFields.length > 1) {
      setFormFields(formFields.filter((f) => f.id !== id));
    }
  };

  const duplicateField = (index: number) => {
    const fieldToDuplicate = formFields[index];
    const duplicatedField = {
      ...(fieldToDuplicate as FormFieldProps),
      id: "field-" + Date.now(),
      label: `${fieldToDuplicate?.label} ${fieldToDuplicate?.label.trim() ? "-" + (index + 1) : ""}`,
    };
    const newFields = [...formFields];
    newFields.splice(index + 1, 0, duplicatedField);
    setFormFields(newFields);
  };

  const addNewField = () => {
    setFormFields([
      ...formFields,
      {
        id: "field-" + Date.now(),
        type: "text",
        label: "",
        description: "",
        placeholder: "",
        required: false,
      },
    ]);
  };

  return (
    <Card>
      <CardContent className="space-y-6">
        <Suspense fallback={<Skeleton className="h-96" />}>
          {formFields.map((field, index) => (
            <FieldEditor
              key={field.id}
              field={field}
              index={index}
              onUpdate={updateField}
              onRemove={removeField}
              onDuplicate={duplicateField}
            />
          ))}
        </Suspense>

        <div className="flex justify-center">
          <Button
            onClick={addNewField}
            className="flex items-center gap-2"
            type="button"
          >
            <Plus className="h-4 w-4" />
            Add Requirement
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
