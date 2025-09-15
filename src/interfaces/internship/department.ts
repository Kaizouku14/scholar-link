import type { courseType } from "@/constants/users/courses";
import type { departmentType } from "@/constants/users/departments";
import { type roleType } from "@/constants/users/roles";
import type { SectionType } from "@/constants/users/sections";
import type { internshipStatusType } from "@/constants/users/status";

export interface DeparmentUsers {
  name: string;
  profile: string;
  section: SectionType[];
  role: roleType;
  email: string;
  course: courseType;
  status: internshipStatusType;
}

export interface Deparments {
  department: departmentType;
  coordinators: number;
  interns: number;
  requiredHours: number | null;
  totalProgressHours: string | null;
  users: DeparmentUsers[];
}
