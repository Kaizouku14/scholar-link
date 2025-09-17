import type { ScholarDocument } from "@/interfaces/scholarship/documents";
import type { YearLevelType } from "@/constants/users/year-level";
import type { courseType } from "@/constants/users/courses";
import type { SectionType } from "@/constants/users/sections";
import type { scholarshipStatusType } from "@/constants/users/status";
import type { Requirement } from "./requirements";

interface BaseApplication {
  programName: string;
  applicationId: string;
  appliedAt: Date;
  updatedAt: Date;
  status: scholarshipStatusType;
  documents: ScholarDocument[];
}

export interface ProgramScholars extends BaseApplication {
  studentNo: string;
  name: string;
  profile: string;
  yearLevel: YearLevelType;
  course: courseType;
  section: SectionType[];
  email: string;
  contact: string;
  address: string;
}

export interface ScholarApplications extends BaseApplication {
  programId: string;
  image: string | null;
  description: string;
  deadline: Date;
  announcement: string;
  requirements: Requirement[];
}
