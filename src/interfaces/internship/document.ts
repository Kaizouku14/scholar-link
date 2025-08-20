import type { documentsType } from "@/constants/internship/documents";

export interface DocumentCardProps {
  documentId: string;
  documentType: documentsType;
  documentUrl: string;
  submittedAt: Date;
  status: string;
}
