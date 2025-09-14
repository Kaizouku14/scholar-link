import type { ScholarDocument } from "@/interfaces/scholarship/documents";
import type { YearLevelType } from "@/constants/users/year-level";
import type { courseType } from "@/constants/users/courses";
import type { SectionType } from "@/constants/users/sections";
import type { scholarshipStatusType } from "@/constants/users/status";

export interface ProgramScholars {
  programName: string;
  applicationId: string;
  appliedAt: Date;
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
