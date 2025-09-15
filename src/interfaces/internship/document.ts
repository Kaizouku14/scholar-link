import type { courseType } from "@/constants/users/courses";
import type { SectionType } from "@/constants/users/sections";
import type { statusType } from "@/constants/users/status";

export interface DocumentCardProps {
  documentId: string;
  documentType: string;
  documentUrl: string;
  submittedAt: Date;
  status: string;
}

export interface StudentDocuments {
  studentId: string;
  name: string;
  email: string | null;
  contactNo: string | null;
  profile: string;
  section: SectionType[];
  course: string;
  documents: {
    id: string;
    type: string | null;
    url: string | null;
    reviewStatus: string | null;
  }[];
  requiredDocuments: {
    documentType: string;
  }[];
}

export interface DocumentReview {
  id: string;
  documentType: string;
  documentUrl: string;
  reviewStatus: statusType;
  submittedAt: Date;
  studentId: string;
  name: string;
  profile: string | null;
  section: SectionType[];
  course: courseType;
  companyName: string;
}
