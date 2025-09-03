import type { courseType } from "@/constants/users/courses";
import type { departmentType } from "@/constants/users/departments";
import type { roleType } from "@/constants/users/roles";
import type { SectionType } from "@/constants/users/sections";

export interface UserAccount {
  name: string;
  section?: SectionType[];
  email: string;
  profile?: string;
  profileKey?: string;
  contact: string;
  address: string;
  course?: courseType;
  department: departmentType;
  role: roleType;
  studentNo?: string;
}
