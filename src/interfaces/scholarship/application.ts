import type { courseType } from "@/constants/users/courses";
import type { departmentType } from "@/constants/users/departments";
import type { GenderType } from "@/constants/users/genders";
import type { SectionType } from "@/constants/users/sections";
import type { YearLevelType } from "@/constants/users/year-level";
import type { ScholarDocument } from "./documents";
import type { statusType } from "@/constants/users/status";

interface BaseApplication {
  name: string;
  email: string;
  contact: string;
  address: string;
  course: courseType;
  yearLevel: YearLevelType;
  section: SectionType[];
}

export interface NewApplication extends BaseApplication {
  programId: string;
  sex: GenderType;
  dateOfBirth: Date;
  department: departmentType;
  studentNo: string;
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
  applicationId: string;
  appliedAt: Date;
  status: statusType;
  profile?: string;
  documents: ScholarDocument[];
}
