import type { statusType } from "@/constants/users/status";

export interface ScholarDocument {
  id: string;
  url: string | null;
  reviewStatus: statusType;
  submittedAt: Date;
}
