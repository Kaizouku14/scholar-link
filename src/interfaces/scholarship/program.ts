import type { ScholarshipType } from "@/constants/scholarship/scholarship-types";
import type { submissionType } from "@/constants/scholarship/submittion-type";

export interface ProgramHeader {
  name: string;
  description: string;
  type: ScholarshipType;
  submissionType: submissionType;
  deadline: Date;
  slots: number;
  imageUrl?: string | null;
}

export interface ScholarshipPrograms extends ProgramHeader {
  imageKey?: string | null;
  section: string;
  requirements?: {
    label: string;
    description?: string | null;
    isRequired: boolean;
  }[];
}
