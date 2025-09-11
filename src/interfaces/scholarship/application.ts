import type { courseType } from "@/constants/users/courses";
import type { departmentType } from "@/constants/users/departments";
import type { GenderType } from "@/constants/users/genders";
import type { SectionType } from "@/constants/users/sections";
import type { YearLevelType } from "@/constants/users/year-level";
import type { ScholarDocument } from "./documents";

export interface newApplication {
  programId: string;
  name: string;
  sex: GenderType;
  dateOfBirth: Date;
  email: string;
  contact: string;
  address: string;
  course: courseType;
  yearLevel: YearLevelType;
  department: departmentType;
  section: SectionType;
  studentNo: string;
  requirements: Record<
    string,
    {
      key: string;
      url: string;
    }
  >;
}

export interface Applications {
  programName: string;
  applicationId: string;
  appliedAt: Date;
  status: string;
  name: string;
  email: string;
  contactNo: string;
  address: string;
  sex: GenderType;
  dateOfBirth: Date;
  profile?: string;
  yearlevel: YearLevelType;
  course: courseType;
  department: departmentType;
  section: SectionType[];
  studentNo: string;
  documents: ScholarDocument[];
}
