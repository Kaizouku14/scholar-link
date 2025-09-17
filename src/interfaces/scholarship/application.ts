import type { courseType } from "@/constants/users/courses";
import type { GenderType } from "@/constants/users/genders";
import type { SectionType } from "@/constants/users/sections";
import type { YearLevelType } from "@/constants/users/year-level";
import type { ScholarDocument } from "./documents";
import type { scholarshipStatusType } from "@/constants/users/status";
import type { eligibilityType } from "@/constants/scholarship/eligiblity-type";

interface BaseApplication {
  name: string;
  email: string;
  contact: string;
  address: string;
  course: courseType;
}

export interface NewApplication extends BaseApplication {
  programId: string;
  sex: GenderType;
  dateOfBirth: Date;
  requirements: Record<
    string,
    {
      label: string;
      key: string;
      url: string;
    }
  >;
}

export interface Applications extends BaseApplication {
  programName: string;
  eligibilityType: eligibilityType;
  applicationId: string;
  appliedAt: Date;
  status: scholarshipStatusType;
  profile?: string;
  yearLevel: YearLevelType;
  section: SectionType[];
  documents: ScholarDocument[];
}
