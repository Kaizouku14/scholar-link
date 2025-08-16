import type { courseType } from "@/constants/courses";
import type { departmentType } from "@/constants/departments";
import type { GenderType } from "@/constants/genders";
import type { roleType } from "@/constants/roles";
import type { SectionType } from "@/constants/sections";
import type { YearLevelType } from "@/constants/year-level";

export interface UserAccount {
  name: string;
  middleName: string;
  surname: string;
  email: string;
  profile?: string;
  profileKey?: string;
  contact: string;
  address: string;
  dateOfBirth: Date;
  gender: GenderType;
  department: departmentType;
  role: roleType;
  studentNo?: string;
  course?: courseType;
  section?: SectionType;
  yearLevel?: YearLevelType;
}
