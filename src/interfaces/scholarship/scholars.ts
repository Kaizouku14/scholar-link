import type { ScholarDocument } from "@/interfaces/scholarship/documents";
import type { YearLevelType } from "@/constants/users/year-level";
import type { courseType } from "@/constants/users/courses";
import type { SectionType } from "@/constants/users/sections";
import type { scholarshipStatusType } from "@/constants/users/status";
import type { Requirement } from "./requirements";

export interface ProgramScholars {
  programName: string;
  applicationId: string;
  appliedAt: Date;
  updatedAt: Date;
  status: scholarshipStatusType;
  studentNo: string;
  name: string;
  profile: string;
  yearLevel: YearLevelType;
  course: courseType;
  section: SectionType[];
  email: string;
  contact: string;
  address: string;
  documents: ScholarDocument[];
}

export interface ScholarApplications {
  programName: string;
  image: string | null;
  description: string;
  deadline: Date;
  applicationId: string;
  appliedAt: Date;
  updatedAt: Date;
  status: scholarshipStatusType;
  announcement: string;
  requirements: Requirement[];
}
