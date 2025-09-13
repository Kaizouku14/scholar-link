import type { ScholarshipType } from "@/constants/scholarship/scholarship-types";
import type { submissionType } from "@/constants/scholarship/submittion-type";
import type { Requirement } from "./requirements";

export interface Program {
  programId: string;
  name: string;
  imageUrl: string | null;
  slots: number;
  deadline: Date;
  isActive: boolean;
  type: ScholarshipType;
  description: string;
  section: string;
  submissionType: submissionType;
  requirements: Requirement[];
}
