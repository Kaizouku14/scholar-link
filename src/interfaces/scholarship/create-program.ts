import type { RequirementType } from "@/constants/scholarship/requirements";
import type { ScholarshipType } from "@/constants/scholarship/scholarship-types";
import type { submissionType } from "@/constants/scholarship/submittion-type";
import type { courseType } from "@/constants/users/courses";
import type { departmentType } from "@/constants/users/departments";
import type { GenderType } from "@/constants/users/genders";
import type { SectionType } from "@/constants/users/sections";
import type { YearLevelType } from "@/constants/users/year-level";

export interface ScholarshipPrograms {
  name: string;
  description: string;
  section: string;
  slots: number;
  type: ScholarshipType;
  submissionType: submissionType;
  deadline: Date;
  imageUrl?: string | null;
  imageKey?: string | null;
  requirements?: {
    label: string;
    type: RequirementType;
    description?: string;
    isRequired: boolean;
  }[];
}

export interface Application {
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
