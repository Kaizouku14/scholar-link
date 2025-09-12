import type { submissionType } from "@/constants/scholarship/submittion-type";

export interface ProgramCardProps {
  programId: string;
  name: string;
  imageUrl: string | null;
  slots: number;
  deadline: Date;
  isActive: boolean;
  type: string;
  description: string;
  submissionType: submissionType;
}
