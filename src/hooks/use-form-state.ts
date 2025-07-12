"use client";

import { useState } from "react";
import type { AdditionalInfo, FormFieldProps } from "@/types/scholarship-form";

/**
 * Custom hook to manage form state and operations
 * Centralizes state management for the scholarship form
 */
export function useFormState() {
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfo>({
    overview: "",
    note: "",
    history: "",
    benefits: [{ title: "", description: "" }],
    eligibilityCriteria: [""],
    priority: "",
    maintenanceRequirements: [""],
    processSteps: [""],
    importantDates: [{ label: "", date: "" }],
    evaluationCriteria: [{ name: "", weight: "", description: "" }],
    documentCategories: [{ name: "", items: [""] }],
    submissionGuidelines: [""],
  });
  const [formFields, setFormFields] = useState<FormFieldProps[]>([]);

  /**
   * Updates additional details with partial updates
   */
  const updateDetails = (updates: Partial<AdditionalInfo>) =>
    setAdditionalInfo((prev) => ({ ...prev, ...updates }));

  /**
   * Updates an item in an array field
   */
  const updateArray = (
    key: keyof AdditionalInfo,
    index: number,
    value: any,
  ) => {
    const newArray = [...(additionalInfo[key] as any[])];
    newArray[index] = value;
    updateDetails({ [key]: newArray });
  };

  /**
   * Adds an item to an array field
   */
  const addToArray = (key: keyof AdditionalInfo, value: any) => {
    const newArray = [...(additionalInfo[key] as any[]), value];
    updateDetails({ [key]: newArray });
  };

  /**
   * Removes an item from an array field
   */
  const removeFromArray = (key: keyof AdditionalInfo, index: number) => {
    const currentArray = additionalInfo[key] as any[];
    if (currentArray.length > 1) {
      const newArray = currentArray.filter((_, i) => i !== index);
      updateDetails({ [key]: newArray });
    }
  };

  return {
    additionalInfo,
    formFields,
    setFormFields,
    updateDetails,
    updateArray,
    addToArray,
    removeFromArray,
  };
}
