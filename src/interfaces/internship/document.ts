import type { SectionType } from "@/constants/users/sections";

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
  yearLevel: string;
  documents: {
    id: string;
    type: string;
    url: string | null;
    reviewStatus: string | null;
  }[];
  requiredDocuments: {
    documentType: string;
  }[];
}
