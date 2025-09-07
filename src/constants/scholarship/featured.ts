import type { submissionType } from "./submittion-type";

export interface FeaturedCardProps {
  programId: string;
  name: string;
  imageUrl: string | null;
  slots: number;
  deadline: Date;
  description: string;
  submissionType: submissionType;
}
