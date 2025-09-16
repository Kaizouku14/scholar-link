import type { ScholarshipType } from "@/constants/scholarship/scholarship-types";
import type { submissionType } from "@/constants/scholarship/submittion-type";
import type { Requirement } from "./requirements";
import type { eligibilityType } from "@/constants/scholarship/eligiblity-type";

interface BaseProgram {
  programId: string;
  name: string;
  slots: number;
  deadline: Date;
  type: ScholarshipType;
  description: string;
  section: string;
  eligibilityType: eligibilityType;
  submissionType: submissionType;
  announcement: string;
}

export interface Program extends BaseProgram {
  imageUrl: string | null;
  isActive: boolean;
  requirements: Requirement[];
}

export interface UpdateProgram extends BaseProgram {
  imageUrl?: string;
  imageKey?: string;
  requirements: Requirement[];
}
