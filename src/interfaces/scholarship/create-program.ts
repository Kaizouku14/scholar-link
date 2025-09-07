import type { RequirementType } from "@/constants/scholarship/requirements";
import type { ScholarshipType } from "@/constants/scholarship/scholarship-types";
import type { submissionType } from "@/constants/scholarship/submittion-type";

export interface ScholarshipPrograms {
  name: string;
  description: string;
  section: string;
  slots: number;
  type: ScholarshipType;
  submissionType: submissionType;
  deadline: Date;
  imageUrl?: string | null;
  imageKey?: string | null;
  requirements?: { label: string; type: RequirementType }[];
}
