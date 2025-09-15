import type { courseType } from "@/constants/users/courses";
import type { departmentType } from "@/constants/users/departments";
import type { GenderType } from "@/constants/users/genders";
import type { SectionType } from "@/constants/users/sections";

export interface Reports {
  profile: string | null;
  studentName: string;
  sex: GenderType;
  section: SectionType[];
  department: departmentType;
  course: courseType;
  duration: string;
  company: string;
  supervisorContactNo: string;
  coordinatorName: string;
  coordinatorCourse: string;
}
