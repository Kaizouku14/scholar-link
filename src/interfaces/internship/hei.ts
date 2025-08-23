import type { courseType } from "@/constants/users/courses";
import type { departmentType } from "@/constants/users/departments";
import type { SectionType } from "@/constants/users/sections";
import type { statusType } from "@/constants/users/status";

export interface CoordinatorIntern {
  name: string;
  middleName: string;
  surname: string;
  profile: string;
  email: string;
  section: SectionType[] | null;
  status: statusType;
  companyName: string | null;
  companyAddress: string | null;
  supervisorName: string | null;
  supervisorEmail: string | null;
}

export interface CoordinatorSectionData {
  section: SectionType[] | null;
  department: departmentType | null;
  studentCount: number;
  totalProgressHours: string | null;
  interns: CoordinatorIntern[];
}

export interface AdminIntern extends CoordinatorIntern {
  course: courseType;
}

export interface AdminSectionData {
  section: SectionType[] | null;
  course: courseType | null;
  department: departmentType | null;
  studentCount: number;
  totalProgressHours: string | null;
  interns: AdminIntern[];
}
