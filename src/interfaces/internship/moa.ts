import type { courseType } from "@/constants/users/courses";
import type { departmentType } from "@/constants/users/departments";
import type { SectionType } from "@/constants/users/sections";

export interface MOA {
  profile: string | null;
  name: string;
  email: string;
  contactNo: string;
  course: courseType;
  section: SectionType[];
  deparment: departmentType;
  documentUrl: string;
}
