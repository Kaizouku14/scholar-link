import type { submissionType } from "@/constants/scholarship/submittion-type";

export interface ScholarshipCardProps {
  programId: string;
  name: string;
  imageUrl: string | null;
  slots: number;
  deadline: Date;
  isActive: boolean;
  location: string;
  type: string;
  description: string;
  submissionType: submissionType;
}
