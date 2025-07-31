import type { FieldType } from "@/constants/field-type";
import type { submissionType } from "@/constants/submittion-type";
import type { ScholarshipType } from "@/constants/scholarship-types";
export interface ScholarshipFormData {
  name: string;
  description: string;
  slots: number;
  location: string;
  type: ScholarshipType;
  submissionType: submissionType;
  image?: string;
  deadline: Date;
}
export interface FormFieldProps {
  id: string;
  type: FieldType;
  label: string;
  description: string;
  placeholder: string;
  required: boolean;
}

export interface BenefitItem {
  title: string;
  description: string;
}

export interface ImportantDate {
  label: string;
  date: string;
}

export interface EvaluationCriteria {
  name: string;
  weight: string;
  description: string;
}

export interface DocumentCategory {
  name: string;
  items: string[];
}

export interface AdditionalInfo {
  overview: string;
  note: string;
  history: string;
  benefits: BenefitItem[];
  eligibilityCriteria: string[];
  priority: string;
  maintenanceRequirements: string[];
  processSteps: string[];
  importantDates: ImportantDate[];
  evaluationCriteria: EvaluationCriteria[];
  documentCategories: DocumentCategory[];
  submissionGuidelines: string[];
}
